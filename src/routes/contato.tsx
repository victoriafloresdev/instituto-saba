import { createFileRoute, Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Abertura } from "@/components/site/Abertura";
import { Enviado, FormularioCena } from "@/components/site/FormularioCena";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured, SUPABASE_UNAVAILABLE_MESSAGE } from "@/lib/supabase";
import { FORM_LIMITS, formString, isValidEmail, isWithinLength } from "@/lib/form-validation";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Instituto Cultural Saba" },
      { name: "description", content: "Fale com o Instituto Cultural Saba." },
      { property: "og:title", content: "Contato — Instituto Cultural Saba" },
    ],
  }),
  component: Contato,
});

function Contato() {
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

    const nome = formString(data, "nome");
    const email = formString(data, "email");
    const assunto = formString(data, "assunto");
    const mensagem = formString(data, "mensagem");
    if (
      !isWithinLength(nome, FORM_LIMITS.name) ||
      !isValidEmail(email) ||
      !isWithinLength(assunto, FORM_LIMITS.subject) ||
      !isWithinLength(mensagem, FORM_LIMITS.message)
    ) {
      toast.error("Confira os campos da mensagem e tente novamente.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert({ nome, email, assunto, mensagem });
      if (error) {
        toast.error("Não foi possível enviar a mensagem. Tente novamente.");
        return;
      }
      form.reset();
      setConsent(false);
      setSent(true);
      toast.success("Mensagem enviada com sucesso.");
    } catch {
      toast.error("Não foi possível enviar a mensagem. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Abertura
        eyebrow="Contato"
        linhas={[
          "Fale com",
          <span key="g" className="gesto gesto--luz">
            o Instituto.
          </span>,
        ]}
        lide="Parcerias, convites, imprensa, audições e patrocínio cultural."
      >
        <dl className="grid gap-8 sm:grid-cols-2">
          <div>
            <dt className="eyebrow suave">E-mail</dt>
            <dd className="mt-2">
              <a
                href="mailto:institutoculturalsaba@gmail.com"
                className="link-traco break-all text-lg"
              >
                institutoculturalsaba@gmail.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow suave">WhatsApp</dt>
            <dd className="mt-2">
              <a
                href="https://wa.me/5531984304111"
                target="_blank"
                rel="noreferrer"
                className="link-traco text-lg"
              >
                (31) 98430-4111
              </a>
            </dd>
          </div>
        </dl>
      </Abertura>

      <FormularioCena
        numero="01"
        eyebrow="Mensagem"
        titulo={
          <>
            Escreva <span className="gesto">para nós.</span>
          </>
        }
        apoio={
          <>
            <p>Belo Horizonte — Minas Gerais.</p>
            <p>
              Para patrocínio, audições ou escolas públicas, os formulários específicos agilizam o
              retorno:
            </p>
            <ul className="space-y-2">
              <li>
                <Link to="/patrocinio" className="link-traco text-tinta">
                  Seja patrocinador →
                </Link>
              </li>
              <li>
                <Link to="/audicoes" className="link-traco text-tinta">
                  Audições →
                </Link>
              </li>
              <li>
                <Link to="/escolas" className="link-traco text-tinta">
                  Contrapartida social →
                </Link>
              </li>
            </ul>
          </>
        }
      >
        {sent ? (
          <Enviado
            titulo="Mensagem recebida."
            texto="Obrigado pelo contato. Retornaremos assim que possível."
            onNovo={() => setSent(false)}
            novoRotulo="Enviar outra mensagem"
          />
        ) : (
          <form
            onSubmit={submit}
            className="form-editorial grid gap-x-[var(--calha)] gap-y-9 sm:grid-cols-2"
          >
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <Field
              label="Nome"
              name="nome"
              required
              maxLength={FORM_LIMITS.name}
              autoComplete="name"
            />
            <Field
              label="E-mail"
              name="email"
              type="email"
              required
              maxLength={FORM_LIMITS.email}
              autoComplete="email"
            />
            <Field
              label="Assunto"
              name="assunto"
              required
              maxLength={FORM_LIMITS.subject}
              className="sm:col-span-2"
            />
            <div className="sm:col-span-2">
              <Label htmlFor="mensagem">
                Mensagem<span aria-hidden="true"> *</span>
              </Label>
              <Textarea
                id="mensagem"
                name="mensagem"
                rows={5}
                maxLength={FORM_LIMITS.message}
                required
              />
            </div>
            <label className="consentimento flex items-start gap-3 sm:col-span-2">
              <Checkbox
                checked={consent}
                onCheckedChange={(v) => setConsent(!!v)}
                className="mt-0.5"
              />
              <span className="suave">
                Autorizo o uso dos meus dados para retorno desta mensagem, conforme a{" "}
                <a
                  href="/privacidade"
                  target="_blank"
                  rel="noreferrer"
                  className="link-traco font-semibold"
                >
                  Política de Privacidade
                </a>
                .
              </span>
            </label>
            <div className="sm:col-span-2">
              <button type="submit" disabled={submitting} className="chamada chamada--cheia">
                {submitting ? "Enviando…" : "Enviar mensagem"}
                {!submitting && <span className="seta">→</span>}
              </button>
            </div>
          </form>
        )}
      </FormularioCena>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className,
  maxLength,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
  maxLength?: number;
  autoComplete?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={name}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
      />
    </div>
  );
}
