import type { SupabaseClient } from "@supabase/supabase-js";
import type { ModeloEmail } from "@/lib/database.types";
import { lacunasPendentes, montarHtml, preencher } from "@/lib/email-audicao";
import { isValidEmail } from "@/lib/form-validation";

/**
 * Envio dos e-mails aos aprovados na audição, pelo Resend
 * (https://resend.com/docs/api-reference/emails/send-batch-emails).
 *
 * Variáveis de ambiente (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY    chave da API do Resend;
 *   EMAIL_REMETENTE   ex.: "Instituto Cultural Saba <audicoes@dominio.com.br>"
 *                     — o domínio precisa estar verificado no Resend;
 *   EMAIL_RESPOSTA    opcional: para onde vão as respostas dos candidatos.
 */

export interface PedidoDeEnvio {
  ids: string[];
  modelo: ModeloEmail;
  assunto: string;
  mensagem: string;
}

export interface ResultadoDoEnvio {
  enviados: number;
  falhas: { id: string; nome: string; erro: string }[];
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MODELOS: ModeloEmail[] = ["fase1", "fase2", "livre"];
/** Limite do envio em lote do Resend. */
const POR_LOTE = 100;

/** Valida o corpo do pedido; devolve a mensagem de erro, ou null. */
export function validarPedido(corpo: unknown): { pedido: PedidoDeEnvio } | { erro: string } {
  const c = corpo as Partial<PedidoDeEnvio> | null;
  if (!c || !Array.isArray(c.ids) || c.ids.length === 0 || c.ids.length > 300)
    return { erro: "Selecione de 1 a 300 inscrições." };
  if (!c.ids.every((id) => typeof id === "string" && UUID.test(id)))
    return { erro: "Inscrições inválidas." };
  if (!c.modelo || !MODELOS.includes(c.modelo)) return { erro: "Modelo de e-mail inválido." };
  const assunto = typeof c.assunto === "string" ? c.assunto.trim() : "";
  const mensagem = typeof c.mensagem === "string" ? c.mensagem.trim() : "";
  if (assunto.length < 1 || assunto.length > 200) return { erro: "Escreva um assunto." };
  if (mensagem.length < 1 || mensagem.length > 5000) return { erro: "Escreva a mensagem." };
  const lacunas = lacunasPendentes(assunto, mensagem);
  if (lacunas.length > 0) return { erro: `Preencha antes de enviar: ${lacunas.join(", ")}.` };
  return { pedido: { ids: [...new Set(c.ids)], modelo: c.modelo, assunto, mensagem } };
}

interface Inscricao {
  id: string;
  nome: string;
  email: string;
  idade: number;
  spectacle_id: string | null;
  responsavel_contato: string | null;
}

/**
 * Monta e envia um e-mail por inscrição. Menores de 18 anos: o responsável
 * vai em cópia quando o contato informado for um e-mail. Cada envio fica
 * registrado em audition_emails, com sucesso ou o erro.
 */
export async function enviarEmailsDeAudicao(
  supabase: SupabaseClient,
  userId: string,
  pedido: PedidoDeEnvio,
): Promise<ResultadoDoEnvio | { erro: string; status: number }> {
  const chave = process.env.RESEND_API_KEY;
  const remetente = process.env.EMAIL_REMETENTE;
  if (!chave || !remetente) {
    return {
      erro: "O envio de e-mails ainda não está configurado (RESEND_API_KEY e EMAIL_REMETENTE).",
      status: 503,
    };
  }

  const { data: inscricoes, error } = await supabase
    .from("auditions")
    .select("id, nome, email, idade, spectacle_id, responsavel_contato")
    .in("id", pedido.ids);
  if (error || !inscricoes) return { erro: "Não foi possível ler as inscrições.", status: 500 };

  const idsEspetaculos = [
    ...new Set(inscricoes.map((i) => i.spectacle_id).filter((id): id is string => Boolean(id))),
  ];
  const { data: espetaculos } = idsEspetaculos.length
    ? await supabase.from("spectacles").select("id, title").in("id", idsEspetaculos)
    : { data: [] as { id: string; title: string }[] };
  const titulos = new Map((espetaculos ?? []).map((e) => [e.id, e.title as string]));

  const mensagens = (inscricoes as Inscricao[]).map((i) => {
    const dados = {
      nome: i.nome,
      espetaculo: i.spectacle_id ? (titulos.get(i.spectacle_id) ?? null) : null,
    };
    const texto = preencher(pedido.mensagem, dados);
    const responsavel =
      i.idade < 18 && i.responsavel_contato && isValidEmail(i.responsavel_contato.trim())
        ? i.responsavel_contato.trim()
        : null;
    return {
      inscricao: i,
      destinatarios: [i.email, ...(responsavel ? [responsavel] : [])],
      corpo: {
        from: remetente,
        to: [i.email],
        ...(responsavel ? { cc: [responsavel] } : {}),
        ...(process.env.EMAIL_RESPOSTA ? { reply_to: process.env.EMAIL_RESPOSTA } : {}),
        subject: preencher(pedido.assunto, dados),
        text: texto,
        html: montarHtml(texto),
      },
    };
  });

  const resultado: ResultadoDoEnvio = { enviados: 0, falhas: [] };
  const registros: {
    audition_id: string;
    modelo: ModeloEmail;
    assunto: string;
    destinatarios: string[];
    sucesso: boolean;
    erro: string | null;
    enviado_por: string;
  }[] = [];

  for (let i = 0; i < mensagens.length; i += POR_LOTE) {
    const lote = mensagens.slice(i, i + POR_LOTE);
    let erroDoLote: string | null = null;
    try {
      const resposta = await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: { Authorization: `Bearer ${chave}`, "Content-Type": "application/json" },
        body: JSON.stringify(lote.map((m) => m.corpo)),
      });
      if (!resposta.ok) {
        const detalhe = (await resposta.json().catch(() => null)) as { message?: string } | null;
        erroDoLote = detalhe?.message ?? `Resend respondeu ${resposta.status}.`;
      }
    } catch {
      erroDoLote = "Falha de conexão com o serviço de e-mail.";
    }

    for (const m of lote) {
      if (erroDoLote) {
        resultado.falhas.push({ id: m.inscricao.id, nome: m.inscricao.nome, erro: erroDoLote });
      } else {
        resultado.enviados += 1;
      }
      registros.push({
        audition_id: m.inscricao.id,
        modelo: pedido.modelo,
        assunto: m.corpo.subject.slice(0, 200),
        destinatarios: m.destinatarios,
        sucesso: !erroDoLote,
        erro: erroDoLote?.slice(0, 1000) ?? null,
        enviado_por: userId,
      });
    }
  }

  // O registro não impede o envio: se falhar, o e-mail já saiu.
  if (registros.length) await supabase.from("audition_emails").insert(registros);
  return resultado;
}
