import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, MapPin, Instagram } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/contato")({
  head: () => ({ meta: [
    { title: "Contato — Instituto Cultural Sabá" },
    { name: "description", content: "Fale com o Instituto Cultural Sabá." },
    { property: "og:title", content: "Contato — Instituto Cultural Sabá" },
  ]}),
  component: Contato,
});

function Contato() {
  const [sent, setSent] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    const { error } = await supabase.from("contact_messages").insert({
      nome: String(data.nome), email: String(data.email), assunto: String(data.assunto), mensagem: String(data.mensagem),
    });
    if (error) { toast.error("Não foi possível enviar a mensagem. Tente novamente."); return; }
    form.reset();
    setSent(true);
    toast.success("Mensagem enviada com sucesso.");
  }

  return (
    <>
      <Section eyebrow="Contato" title="Fale com o Instituto." subtitle="Estamos abertos a parcerias, convites, imprensa, audições e patrocínio cultural.">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-5">
            <InfoRow icon={Mail} title="E-mail" text="institutoculturalsaba@gmail.com" />
            <InfoRow icon={MessageCircle} title="WhatsApp" text="(31) 98430-4111" />
            <InfoRow icon={MapPin} title="Sede" text="Belo Horizonte — Minas Gerais" />
            <InfoRow icon={Instagram} title="Redes sociais" text="Instagram, Twitter, Facebook e LinkedIn" />
          </div>

          <Card className="lg:col-span-3 p-8">
            {sent ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-10 w-10 text-primary mx-auto" />
                <h3 className="mt-4 text-2xl">Mensagem recebida</h3>
                <p className="mt-3 text-muted-foreground">Retornaremos assim que possível.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
                <Field label="Nome" name="nome" required />
                <Field label="E-mail" name="email" type="email" required />
                <Field label="Assunto" name="assunto" required className="sm:col-span-2" />
                <div className="sm:col-span-2">
                  <Label className="mb-2 block text-sm">Mensagem</Label>
                  <Textarea name="mensagem" rows={5} required />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" size="lg">Enviar mensagem</Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </Section>

      <Section tone="ink" title="Vamos caminhar juntos.">
        <div className="grid gap-4 md:grid-cols-3">
          <CTABox title="Patrocinadores" text="Conheça quem já apoia o Instituto ou veja como patrocinar via Lei Rouanet." to="/patrocinadores" cta="Ver patrocinadores" />
          <CTABox title="Artistas" text="Inscreva-se para audições e integre o processo criativo." to="/audicoes" cta="Fazer inscrição" />
          <CTABox title="Escolas públicas" text="Traga as ações culturais do Instituto para sua escola." to="/escolas" cta="Cadastrar escola" />
        </div>
      </Section>
    </>
  );
}

function InfoRow({ icon: Icon, title, text }: { icon: React.ComponentType<{ className?: string }>; title: string; text: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Icon className="h-4 w-4" /></span>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{title}</p>
        <p className="mt-0.5 text-foreground">{text}</p>
      </div>
    </div>
  );
}

function CTABox({ title, text, to, cta }: { title: string; text: string; to: string; cta: string }) {
  return (
    <div className="rounded-[1.25rem] border border-foreground/20 bg-background p-7 shadow-[5px_5px_0_rgb(32_33_31_/_18%)]">
      <p className="font-display text-2xl leading-none text-primary">{title}</p>
      <p className="mt-4 text-foreground/85 text-sm font-medium leading-relaxed">{text}</p>
      <Button asChild size="sm" className="mt-6 bg-primary text-foreground hover:bg-primary/85"><Link to={to}>{cta}</Link></Button>
    </div>
  );
}

function Field({ label, name, type = "text", required, className }: { label: string; name: string; type?: string; required?: boolean; className?: string }) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="mb-2 block text-sm">{label}{required && " *"}</Label>
      <Input id={name} name={name} type={type} required={required} />
    </div>
  );
}
