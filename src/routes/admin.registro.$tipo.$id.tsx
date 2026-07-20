import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

const sources = {
  audicoes: { table: "auditions", title: "Inscrição de audição", fields: [["nome", "Nome"], ["email", "E-mail"], ["whatsapp", "WhatsApp"], ["idade", "Idade"], ["cidade", "Cidade"], ["modalidade", "Modalidade"], ["experiencia", "Experiência e formação"], ["portfolio", "Portfólio"], ["mensagem", "Mensagem"], ["status", "Status"], ["created_at", "Recebido em"]] },
  patrocinadores: { table: "sponsorship_leads", title: "Interesse de patrocínio", fields: [["nome", "Nome"], ["empresa", "Empresa"], ["documento", "CNPJ ou CPF"], ["email", "E-mail"], ["whatsapp", "WhatsApp"], ["valor", "Valor de interesse"], ["tipo", "Tipo"], ["mensagem", "Mensagem"], ["status", "Status"], ["created_at", "Recebido em"]] },
  escolas: { table: "school_registrations", title: "Cadastro de escola", fields: [["escola", "Escola"], ["responsavel", "Responsável"], ["cargo", "Cargo"], ["email", "E-mail"], ["whatsapp", "WhatsApp"], ["cidade", "Cidade"], ["alunos", "Número de alunos"], ["faixa", "Faixa etária"], ["mensagem", "Mensagem"], ["status", "Status"], ["created_at", "Recebido em"]] },
  mensagens: { table: "contact_messages", title: "Mensagem de contato", fields: [["nome", "Nome"], ["email", "E-mail"], ["assunto", "Assunto"], ["mensagem", "Mensagem"], ["status", "Status"], ["created_at", "Recebido em"]] },
} as const;

type Tipo = keyof typeof sources;

export const Route = createFileRoute("/admin/registro/$tipo/$id")({ component: RegistroDetalhe });

function RegistroDetalhe() {
  const navigate = useNavigate();
  const { tipo, id } = Route.useParams();
  const [record, setRecord] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const config = sources[tipo as Tipo];

  useEffect(() => {
    async function load() {
      if (!config) { navigate({ to: "/admin/dashboard" }); return; }
      const { data: { user } } = await supabase.auth.getUser();
      const { data: profile } = user ? await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle() : { data: null };
      if (profile?.role !== "admin") { navigate({ to: "/admin" }); return; }
      const { data, error } = await supabase.from(config.table).select("*").eq("id", id).maybeSingle();
      if (!error && data) setRecord(data as Record<string, unknown>);
      setLoading(false);
    }
    void load();
  }, [config, id, navigate]);

  if (loading) return <div className="min-h-screen grid place-items-center bg-muted/40 text-muted-foreground">Carregando registro...</div>;
  if (!record || !config) return <div className="min-h-screen grid place-items-center bg-muted/40"><div className="text-center"><p className="font-display text-2xl">Registro não encontrado.</p><Button asChild className="mt-5"><Link to="/admin/dashboard">Voltar ao painel</Link></Button></div></div>;
  return <div className="min-h-screen bg-muted/40"><header className="border-b border-border bg-background"><div className="container-x flex h-16 items-center"><Button asChild variant="ghost" size="sm"><Link to="/admin/dashboard"><ArrowLeft className="mr-1 h-4 w-4" />Voltar ao painel</Link></Button></div></header><main className="container-x py-10"><div className="mb-8 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary"><FileText className="h-5 w-5" /></span><div><p className="eyebrow">Detalhes completos</p><h1 className="mt-1 text-3xl">{config.title}</h1></div></div><Card className="max-w-4xl overflow-hidden p-0">{config.fields.map(([key, label]) => <DetailRow key={key} label={label} value={record[key]} />)}</Card></main></div>;
}

function DetailRow({ label, value }: { label: string; value: unknown }) {
  const displayed = value === null || value === undefined || value === "" ? "Não informado" : label === "Recebido em" ? new Date(String(value)).toLocaleString("pt-BR") : label === "Valor de interesse" ? Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : String(value);
  return <div className="grid gap-2 border-b border-border px-6 py-5 last:border-0 md:grid-cols-[11rem_1fr]"><p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</p><p className="whitespace-pre-wrap break-words leading-relaxed text-foreground">{displayed}</p></div>;
}
