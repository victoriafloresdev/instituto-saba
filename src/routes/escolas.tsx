import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/escolas")({
  head: () => ({ meta: [
    { title: "Escolas públicas — Instituto Cultural Sabá" },
    { name: "description", content: "Cadastre sua escola pública para participar de oficinas, ensaios e apresentações." },
    { property: "og:title", content: "Escolas públicas — Instituto Cultural Sabá" },
  ]}),
  component: Escolas,
});

function Escolas() {
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) { toast.error("É necessário aceitar o consentimento de dados."); return; }
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    const { error } = await supabase.from("school_registrations").insert({
      escola: String(data.escola), responsavel: String(data.responsavel), cargo: String(data.cargo),
      email: String(data.email), whatsapp: String(data.whatsapp), cidade: String(data.cidade),
      alunos: Number(data.alunos), faixa: String(data.faixa), mensagem: String(data.mensagem || "") || null,
    });
    if (error) { toast.error("Não foi possível enviar o cadastro. Tente novamente."); return; }
    form.reset();
    setSent(true);
    toast.success("Cadastro enviado com sucesso.");
  }

  return (
    <>
      <Section eyebrow="Escolas públicas" title="Cultura viva dentro da sala de aula." subtitle="O projeto prevê uma sessão exclusiva do Ballet Dom Quixote para crianças de escolas públicas, com transporte e lanche para os estudantes convidados.">
        <div className="grid gap-6 md:grid-cols-3 md:items-start">
          {[
            { n: "01", t: "Espetáculo exclusivo", d: "Uma sessão destinada a crianças de escolas públicas.", c: "bg-primary border-primary md:-translate-y-5" },
            { n: "02", t: "Transporte", d: "O projeto prevê transporte para os estudantes convidados.", c: "bg-saba-pink border-saba-pink md:translate-y-5" },
            { n: "03", t: "Lanche", d: "O projeto prevê lanche para as crianças participantes.", c: "bg-background border-foreground/25" },
          ].map((b) => (
            <Card key={b.t} className={`relative min-h-80 overflow-hidden rounded-[1.75rem] border p-8 shadow-[9px_9px_0_var(--foreground)] ${b.c}`}>
              <p className="font-display text-7xl leading-none tracking-[-0.08em] text-foreground sm:text-8xl">{b.n}</p>
              <div className="absolute bottom-0 left-0 right-0 border-t border-foreground/15 bg-background/25 p-7">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground/70">{b.t}</p>
                <p className="mt-3 text-base font-medium leading-relaxed text-foreground/90">{b.d}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow="Cadastro" title="Inscreva sua escola.">
        {sent ? (
          <div className="max-w-xl mx-auto text-center p-10 rounded-xl border border-border bg-card">
            <CheckCircle2 className="h-10 w-10 text-primary mx-auto" />
            <h3 className="mt-4 text-2xl">Cadastro recebido</h3>
            <p className="mt-3 text-muted-foreground">Nossa equipe entrará em contato pelos dados informados para articular a ação cultural.</p>
          </div>
        ) : (
          <Card className="p-8 max-w-3xl">
            <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <Field label="Nome da escola" name="escola" required className="sm:col-span-2" />
              <Field label="Nome do responsável" name="responsavel" required />
              <Field label="Cargo" name="cargo" required />
              <Field label="E-mail" name="email" type="email" required />
              <Field label="WhatsApp" name="whatsapp" required />
              <Field label="Cidade" name="cidade" required />
              <Field label="Nº estimado de alunos" name="alunos" type="number" required />
              <Field label="Faixa etária dos alunos" name="faixa" required className="sm:col-span-2" placeholder="Ex: 8 a 14 anos" />
              <div className="sm:col-span-2">
                <Label className="mb-2 block text-sm">Mensagem</Label>
                <Textarea name="mensagem" rows={4} />
              </div>
              <label className="sm:col-span-2 flex gap-3 items-start text-sm text-muted-foreground">
                <Checkbox checked={consent} onCheckedChange={(v) => setConsent(!!v)} className="mt-0.5" />
                <span>Autorizo o uso dos dados da escola para articulação da ação cultural, conforme LGPD.</span>
              </label>
              <div className="sm:col-span-2">
                <Button type="submit" size="lg">Enviar cadastro</Button>
              </div>
            </form>
          </Card>
        )}
      </Section>
    </>
  );
}

function Field({ label, name, type = "text", required, className, placeholder }: { label: string; name: string; type?: string; required?: boolean; className?: string; placeholder?: string }) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="mb-2 block text-sm">{label}{required && " *"}</Label>
      <Input id={name} name={name} type={type} required={required} placeholder={placeholder} />
    </div>
  );
}
