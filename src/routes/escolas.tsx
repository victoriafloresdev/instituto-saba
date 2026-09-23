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
import { supabase, isSupabaseConfigured, SUPABASE_UNAVAILABLE_MESSAGE } from "@/lib/supabase";
import {
  FORM_LIMITS,
  formString,
  isIntegerBetween,
  isValidEmail,
  isValidPhone,
  isWithinLength,
} from "@/lib/form-validation";

export const Route = createFileRoute("/escolas")({
  head: () => ({
    meta: [
      { title: "Escolas públicas — Instituto Cultural Sabá" },
      {
        name: "description",
        content:
          "Cadastre sua escola pública para participar de oficinas, ensaios e apresentações.",
      },
      { property: "og:title", content: "Escolas públicas — Instituto Cultural Sabá" },
    ],
  }),
  component: Escolas,
});

function Escolas() {
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    if (!isSupabaseConfigured) {
      toast.error(SUPABASE_UNAVAILABLE_MESSAGE);
      return;
    }
    if (!consent) {
      toast.error("É necessário aceitar o consentimento de dados.");
      return;
    }
    const form = e.currentTarget;
    const data = new FormData(form);
    if (formString(data, "website")) return;

    const escola = formString(data, "escola");
    const responsavel = formString(data, "responsavel");
    const cargo = formString(data, "cargo");
    const email = formString(data, "email");
    const whatsapp = formString(data, "whatsapp");
    const cidade = formString(data, "cidade");
    const alunos = formString(data, "alunos");
    const faixa = formString(data, "faixa");
    const mensagem = formString(data, "mensagem");

    if (
      !isWithinLength(escola, FORM_LIMITS.school) ||
      !isWithinLength(responsavel, FORM_LIMITS.name) ||
      !isWithinLength(cargo, FORM_LIMITS.role) ||
      !isValidEmail(email) ||
      !isValidPhone(whatsapp)
    ) {
      toast.error("Confira os dados da escola, responsável, e-mail e WhatsApp.");
      return;
    }
    if (
      !isWithinLength(cidade, FORM_LIMITS.city) ||
      !isIntegerBetween(alunos, 1, 100000) ||
      !isWithinLength(faixa, FORM_LIMITS.ageRange) ||
      !isWithinLength(mensagem, FORM_LIMITS.message, 0)
    ) {
      toast.error(
        "Revise os campos do cadastro: há um valor inválido ou limite de caracteres excedido.",
      );
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("school_registrations").insert({
        escola,
        responsavel,
        cargo,
        email,
        whatsapp,
        cidade,
        alunos: Number(alunos),
        faixa,
        mensagem: mensagem || null,
      });
      if (error) {
        toast.error("Não foi possível enviar o cadastro. Tente novamente.");
        return;
      }
      form.reset();
      setConsent(false);
      setSent(true);
      toast.success("Cadastro enviado com sucesso.");
    } catch {
      toast.error("Não foi possível enviar o cadastro. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Section
        eyebrow="Escolas públicas"
        title="Cultura viva dentro da sala de aula."
        subtitle="O projeto prevê uma sessão exclusiva do Ballet Dom Quixote para crianças de escolas públicas, com transporte e lanche para os estudantes convidados."
      >
        <div className="grid gap-6 md:grid-cols-3 md:items-start">
          {[
            {
              n: "01",
              t: "Espetáculo exclusivo",
              d: "Uma sessão destinada a crianças de escolas públicas.",
              c: "bg-primary border-primary md:-translate-y-5",
            },
            {
              n: "02",
              t: "Transporte",
              d: "O projeto prevê transporte para os estudantes convidados.",
              c: "bg-saba-pink border-saba-pink md:translate-y-5",
            },
            {
              n: "03",
              t: "Lanche",
              d: "O projeto prevê lanche para as crianças participantes.",
              c: "bg-background border-foreground/25",
            },
          ].map((b) => (
            <Card
              key={b.t}
              className={`relative min-h-80 overflow-hidden rounded-[1.75rem] border p-8 shadow-[9px_9px_0_var(--foreground)] ${b.c}`}
            >
              <p className="font-display text-7xl leading-none tracking-[-0.08em] text-foreground sm:text-8xl">
                {b.n}
              </p>
              <div className="absolute bottom-0 left-0 right-0 border-t border-foreground/15 bg-background/25 p-7">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground/70">
                  {b.t}
                </p>
                <p className="mt-3 text-base font-medium leading-relaxed text-foreground/90">
                  {b.d}
                </p>
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
            <p className="mt-3 text-muted-foreground">
              Nossa equipe entrará em contato pelos dados informados para articular a ação cultural.
            </p>
          </div>
        ) : (
          <Card className="p-8 max-w-3xl">
            <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <input
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <Field
                label="Nome da escola"
                name="escola"
                required
                maxLength={FORM_LIMITS.school}
                className="sm:col-span-2"
              />
              <Field
                label="Nome do responsável"
                name="responsavel"
                required
                maxLength={FORM_LIMITS.name}
              />
              <Field label="Cargo" name="cargo" required maxLength={FORM_LIMITS.role} />
              <Field
                label="E-mail"
                name="email"
                type="email"
                required
                maxLength={FORM_LIMITS.email}
              />
              <Field label="WhatsApp" name="whatsapp" required maxLength={FORM_LIMITS.phone} />
              <Field label="Cidade" name="cidade" required maxLength={FORM_LIMITS.city} />
              <Field
                label="Nº estimado de alunos"
                name="alunos"
                type="number"
                required
                min={1}
                max={100000}
              />
              <Field
                label="Faixa etária dos alunos"
                name="faixa"
                required
                maxLength={FORM_LIMITS.ageRange}
                className="sm:col-span-2"
                placeholder="Ex: 8 a 14 anos"
              />
              <div className="sm:col-span-2">
                <Label className="mb-2 block text-sm">Mensagem</Label>
                <Textarea name="mensagem" rows={4} maxLength={FORM_LIMITS.message} />
              </div>
              <label className="sm:col-span-2 flex gap-3 items-start text-sm text-muted-foreground">
                <Checkbox
                  checked={consent}
                  onCheckedChange={(v) => setConsent(!!v)}
                  className="mt-0.5"
                />
                <span>
                  Autorizo o uso dos dados da escola para articulação da ação cultural, conforme
                  LGPD.
                </span>
              </label>
              <div className="sm:col-span-2">
                <Button type="submit" size="lg" disabled={submitting}>
                  {submitting ? "Enviando…" : "Enviar cadastro"}
                </Button>
              </div>
            </form>
          </Card>
        )}
      </Section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className,
  placeholder,
  maxLength,
  min,
  max,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  min?: number;
  max?: number;
}) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="mb-2 block text-sm">
        {label}
        {required && " *"}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        min={min}
        max={max}
      />
    </div>
  );
}
