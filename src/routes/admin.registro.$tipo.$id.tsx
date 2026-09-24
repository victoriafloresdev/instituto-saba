import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { SupabaseConfigNotice } from "@/components/admin/SupabaseConfigNotice";
import { Marca } from "@/components/site/Marca";
import { StatusBadge } from "@/components/admin/StatusBadge";
import type { Status } from "@/lib/database.types";

const sources = {
  audicoes: {
    table: "auditions",
    title: "Inscrição de audição",
    fields: [
      ["nome", "Nome"],
      ["audicao_nome", "Audição"],
      ["email", "E-mail"],
      ["whatsapp", "WhatsApp"],
      ["idade", "Idade"],
      ["responsavel_nome", "Responsável (menor de idade)"],
      ["responsavel_contato", "Contato do responsável"],
      ["cidade", "Cidade"],
      ["modalidade", "Modalidade"],
      ["disponibilidade", "Disponibilidade"],
      ["experiencia", "Experiência e formação"],
      ["portfolio", "Portfólio"],
      ["mensagem", "Mensagem"],
      ["status", "Status"],
      ["created_at", "Recebido em"],
    ],
  },
  patrocinadores: {
    table: "sponsorship_leads",
    title: "Interesse de patrocínio",
    fields: [
      ["nome", "Nome"],
      ["empresa", "Empresa"],
      ["documento", "CNPJ ou CPF"],
      ["email", "E-mail"],
      ["whatsapp", "WhatsApp"],
      ["valor", "Valor de interesse"],
      ["tipo", "Tipo"],
      ["mensagem", "Mensagem"],
      ["status", "Status"],
      ["created_at", "Recebido em"],
    ],
  },
  escolas: {
    table: "school_registrations",
    title: "Cadastro de escola",
    fields: [
      ["escola", "Escola"],
      ["responsavel", "Responsável"],
      ["cargo", "Cargo"],
      ["email", "E-mail"],
      ["whatsapp", "WhatsApp"],
      ["cidade", "Cidade"],
      ["alunos", "Número de alunos"],
      ["faixa", "Faixa etária"],
      ["mensagem", "Mensagem"],
      ["status", "Status"],
      ["created_at", "Recebido em"],
    ],
  },
  mensagens: {
    table: "contact_messages",
    title: "Mensagem de contato",
    fields: [
      ["nome", "Nome"],
      ["email", "E-mail"],
      ["assunto", "Assunto"],
      ["mensagem", "Mensagem"],
      ["status", "Status"],
      ["created_at", "Recebido em"],
    ],
  },
} as const;

type Tipo = keyof typeof sources;

export const Route = createFileRoute("/admin/registro/$tipo/$id")({
  component: () => (isSupabaseConfigured ? <RegistroDetalhe /> : <SupabaseConfigNotice />),
});

function RegistroDetalhe() {
  const navigate = useNavigate();
  const { tipo, id } = Route.useParams();
  const [record, setRecord] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const config = sources[tipo as Tipo];

  useEffect(() => {
    async function load() {
      if (!config) {
        navigate({ to: "/admin/dashboard" });
        return;
      }
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: profile } = user
        ? await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()
        : { data: null };
      if (profile?.role !== "admin") {
        navigate({ to: "/admin" });
        return;
      }
      const { data, error } = await supabase
        .from(config.table)
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (!error && data) {
        const registro = data as Record<string, unknown>;
        // Inscrição de audição: troca o identificador do espetáculo pelo nome.
        if (tipo === "audicoes") {
          const espetaculoId = registro.spectacle_id as string | null;
          if (espetaculoId) {
            const { data: espetaculo } = await supabase
              .from("spectacles")
              .select("title")
              .eq("id", espetaculoId)
              .maybeSingle();
            registro.audicao_nome = espetaculo?.title ?? "Espetáculo removido";
          } else {
            registro.audicao_nome = "Banco de talentos";
          }
        }
        setRecord(registro);
      }
      setLoading(false);
    }
    void load();
  }, [config, id, navigate, tipo]);

  if (loading)
    return (
      <PaginaRegistro>
        <div className="flex items-center gap-3 py-16 text-muted-foreground" role="status">
          <span aria-hidden="true" className="traco traco--desenho block w-8 text-laranja" />
          Carregando registro…
        </div>
      </PaginaRegistro>
    );
  if (!record || !config)
    return (
      <PaginaRegistro>
        <div className="py-16">
          <p className="t-sub">Registro não encontrado.</p>
          <Link to="/admin/dashboard" className="chamada mt-6">
            Voltar ao painel
          </Link>
        </div>
      </PaginaRegistro>
    );

  const nome = String(record[config.fields[0][0]] ?? config.title);
  const email = typeof record.email === "string" ? record.email : null;
  const whatsapp = typeof record.whatsapp === "string" ? record.whatsapp.replace(/\D/g, "") : null;
  const recebido = record.created_at
    ? new Date(String(record.created_at)).toLocaleString("pt-BR")
    : null;

  return (
    <PaginaRegistro>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-muted-foreground">{config.title}</p>
          <h1 className="t-titulo mt-3">{nome}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {typeof record.status === "string" && <StatusBadge value={record.status as Status} />}
            {recebido && <span>Recebido em {recebido}</span>}
          </div>
        </div>
        {(email || whatsapp) && (
          <div className="flex flex-wrap gap-2">
            {email && (
              <a href={`mailto:${email}`} className="chamada chamada--cheia">
                Responder por e-mail
              </a>
            )}
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp.startsWith("55") ? whatsapp : `55${whatsapp}`}`}
                target="_blank"
                rel="noreferrer"
                className="chamada"
              >
                Abrir WhatsApp ↗
              </a>
            )}
          </div>
        )}
      </div>

      <Card className="mt-10 max-w-4xl overflow-hidden p-0">
        <dl>
          {config.fields
            .filter(([key]) => key !== "status" && key !== "created_at")
            .map(([key, label]) => (
              <DetailRow key={key} label={label} value={record[key]} />
            ))}
        </dl>
      </Card>
    </PaginaRegistro>
  );
}

/** Moldura da página de detalhe: barra com volta ao painel e a assinatura. */
function PaginaRegistro({ children }: { children: React.ReactNode }) {
  return (
    <div className="papel min-h-screen">
      <header className="palco sticky top-0 z-20">
        <div className="container-x flex h-16 items-center justify-between">
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-papel-suave transition-colors hover:text-papel"
          >
            ← Voltar ao painel
          </Link>
          <Link to="/" className="group" aria-label="Ver o site">
            <Marca compacta />
          </Link>
        </div>
      </header>
      <main className="container-x py-10 md:py-14">{children}</main>
    </div>
  );
}

function DetailRow({ label, value: bruto }: { label: string; value: unknown }) {
  let value = bruto;
  const vazio =
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0);
  // Listas (como a disponibilidade da audição) viram "Manhã, Noite".
  if (Array.isArray(value)) value = value.join(", ");
  const displayed = vazio
    ? "Não informado"
    : label === "Valor de interesse"
      ? Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
      : String(value);
  const link =
    !vazio && label === "Portfólio" && /^https?:\/\//.test(String(value)) ? String(value) : null;
  return (
    <div className="grid gap-1.5 border-b border-border px-6 py-4 last:border-0 md:grid-cols-[12rem_1fr] md:gap-6">
      <dt className="text-sm font-semibold text-muted-foreground">{label}</dt>
      <dd
        className={
          vazio ? "italic text-muted-foreground" : "whitespace-pre-wrap break-words leading-relaxed"
        }
      >
        {link ? (
          <a href={link} target="_blank" rel="noreferrer" className="link-traco font-semibold">
            {displayed} ↗
          </a>
        ) : (
          displayed
        )}
      </dd>
    </div>
  );
}
