import type { ModeloEmail } from "@/lib/database.types";

/**
 * E-mails aos aprovados na audição: modelos, variáveis e a montagem do
 * HTML. Usado pelo painel (prévia) e pelo servidor (envio), para que o que
 * se vê na prévia seja exatamente o que sai.
 */

export interface ModeloDeEmail {
  rotulo: string;
  /** Status que o modelo pressupõe; o painel avisa quem estiver em outro. */
  status: string | null;
  assunto: string;
  mensagem: string;
}

export const MODELOS_EMAIL: Record<ModeloEmail, ModeloDeEmail> = {
  fase1: {
    rotulo: "Aprovação na 1ª fase",
    status: "Aprovado na 1ª fase",
    assunto: "Audição {espetaculo}: você segue para a 2ª fase",
    mensagem: [
      "Olá, {nome}!",
      "Sua inscrição na audição de {espetaculo} foi aprovada na 1ª fase. Parabéns!",
      "A 2ª fase será em [data], às [horário], em [local]. Leve [o que levar].",
      "Por favor, confirme sua presença respondendo a este e-mail.",
      "Até lá,\nEquipe do Instituto Cultural Saba",
    ].join("\n\n"),
  },
  fase2: {
    rotulo: "Aprovação na 2ª fase",
    status: "Aprovado na 2ª fase",
    assunto: "Audição {espetaculo}: você faz parte do elenco",
    mensagem: [
      "Olá, {nome}!",
      "É uma alegria contar: sua inscrição foi aprovada na 2ª fase e você faz parte do elenco de {espetaculo}.",
      "Os próximos passos são [contrato, primeiro ensaio, documentos].",
      "Qualquer dúvida, é só responder a este e-mail.",
      "Boas-vindas ao elenco!\nEquipe do Instituto Cultural Saba",
    ].join("\n\n"),
  },
  livre: {
    rotulo: "Mensagem livre",
    status: null,
    assunto: "",
    mensagem: "Olá, {nome}!\n\n\n\nEquipe do Instituto Cultural Saba",
  },
};

export interface DadosDoCandidato {
  nome: string;
  /** Título do espetáculo da audição, ou null no banco de talentos. */
  espetaculo: string | null;
}

/** Troca {nome} (o primeiro nome) e {espetaculo} pelos dados do candidato. */
export function preencher(texto: string, dados: DadosDoCandidato): string {
  const primeiroNome = dados.nome.trim().split(/\s+/)[0] ?? dados.nome;
  return texto
    .replaceAll("{nome}", primeiroNome)
    .replaceAll("{espetaculo}", dados.espetaculo ?? "banco de talentos do Instituto");
}

/**
 * Trechos entre colchetes ainda não preenchidos, como "[data]". O envio é
 * bloqueado enquanto houver algum: os modelos trazem lacunas de propósito.
 */
export function lacunasPendentes(...textos: string[]): string[] {
  return [...new Set(textos.flatMap((t) => t.match(/\[[^\]\n]{1,60}\]/g) ?? []))];
}

const escapar = (texto: string) =>
  texto
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/**
 * HTML do e-mail: uma coluna, faixa escura com a assinatura no topo e o
 * texto em parágrafos. Estilos em linha, porque clientes de e-mail ignoram
 * folhas de estilo. Parágrafos separados por linha em branco.
 */
export function montarHtml(mensagem: string): string {
  const paragrafos = mensagem
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(
      (p) =>
        `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#1f1e1c">${escapar(p).replaceAll("\n", "<br>")}</p>`,
    )
    .join("");
  return `<!doctype html>
<html lang="pt-BR"><body style="margin:0;padding:0;background:#e3d9c7">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e3d9c7;padding:24px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden">
<tr><td style="background:#121212;padding:20px 28px;border-bottom:3px solid #f26522">
<span style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;letter-spacing:2px;color:#e3d9c7;text-transform:uppercase">Instituto Cultural Saba</span>
</td></tr>
<tr><td style="padding:28px 28px 12px;font-family:Arial,Helvetica,sans-serif">${paragrafos}</td></tr>
</table>
<p style="max-width:560px;margin:16px auto 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#47433d">
Você recebeu este e-mail porque se inscreveu numa audição do Instituto Cultural Saba.
</p>
</td></tr></table></body></html>`;
}
