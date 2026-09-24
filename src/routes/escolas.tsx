import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Abertura } from "@/components/site/Abertura";
import { Section } from "@/components/site/Section";
import type { CSSProperties } from "react";
import { toast } from "sonner";
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
      { title: "Contrapartida social — Instituto Cultural Saba" },
      {
        name: "description",
        content:
          "Espetáculo exclusivo do Ballet Dom Quixote para crianças de escolas públicas, com transporte e lanche. Cadastre sua escola.",
      },
      { property: "og:title", content: "Contrapartida social — Instituto Cultural Saba" },
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
      <Abertura
        eyebrow="Contrapartida social"
        linhas={[
          "A primeira vez",
          <span key="g" className="gesto gesto--luz">
            no teatro.
          </span>,
        ]}
        lide="O Ballet Dom Quixote prevê um espetáculo exclusivo para crianças de escolas públicas, com transporte e lanche para os estudantes convidados."
        foto="bastidores"
        foco="60% 50%"
      >
        <a href="#cadastro" className="chamada chamada--cheia">
          Cadastrar escola <span className="seta">↓</span>
        </a>
      </Abertura>

      <Section
        numero="01"
        eyebrow="O que a escola recebe"
        title={
          <>
            Um dia de teatro, <span className="gesto">do começo ao fim.</span>
          </>
        }
        subtitle="Para muitas crianças, é a primeira vez numa plateia. O projeto cuida de tudo para que a escola só precise trazer a turma."
      >
        <ul className="grid gap-5 md:grid-cols-3">
          {GARANTIAS.map((g, i) => (
            <li
              key={g.titulo}
              className={`flex flex-col rounded-lg p-7 md:p-8 ${
                i === 0 ? "palco" : "fio border bg-[#efe7d8]"
              }`}
              data-reveal="rise"
              style={atraso(i * 90)}
            >
              <span className={`numeral text-3xl leading-none ${i === 0 ? "text-laranja" : ""}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="t-sub mt-5">{g.titulo}</h3>
              <p className="suave mt-3 leading-relaxed">{g.texto}</p>
            </li>
          ))}
        </ul>
        <p className="suave mt-8 max-w-[60ch] text-sm">
          A participação é gratuita para as escolas e os alunos.
        </p>
      </Section>

      <Section
        numero="02"
        eyebrow="Como funciona"
        tone="palco"
        title={
          <>
            Do cadastro <span className="gesto gesto--luz">à plateia.</span>
          </>
        }
        subtitle="A equipe do Instituto acompanha a escola em cada etapa."
      >
        <ol className="grid gap-x-[var(--calha)] md:grid-cols-2">
          {COMO_FUNCIONA.map((passo, i) => (
            <li
              key={passo.titulo}
              className="fio grid grid-cols-[3.5rem_1fr] gap-4 border-t py-6"
              data-reveal="rise"
              style={atraso((i % 2) * 80)}
            >
              <span className="numeral text-3xl leading-none text-laranja">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-semibold leading-snug">{passo.titulo}</p>
                <p className="suave mt-1.5 leading-relaxed">{passo.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <section id="cadastro" data-surface="papel" className="papel scroll-mt-20 py-[var(--cena)]">
        <div className="container-x">
          <header className="mb-12 max-w-3xl md:mb-16">
            <p className="eyebrow suave flex gap-2.5" data-reveal="rise">
              <span className="numeral">03</span>
              <span aria-hidden="true">·</span>
              <span>Cadastro</span>
            </p>
            <h2 className="t-titulo mt-4" data-reveal="rise" style={atraso(60)}>
              Inscreva sua <span className="gesto">escola.</span>
            </h2>
            <p className="t-lide suave mt-5" data-reveal="rise" style={atraso(120)}>
              O cadastro é o primeiro passo. Depois dele, a equipe do Instituto entra em contato
              para organizar a participação dos alunos.
            </p>
          </header>

          <div className="grid md:grid-cols-[1fr_1.55fr]">
            <aside
              className="palco rounded-t-lg p-7 md:rounded-l-lg md:rounded-tr-none md:p-10"
              data-surface="palco"
            >
              {/* Acompanha a rolagem do formulário, que é mais alto. */}
              <div className="md:sticky md:top-28">
                <p className="eyebrow text-laranja">Antes de começar</p>
                <p className="mt-5 font-semibold">Tenha em mãos:</p>
                <ul className="mt-4 space-y-4">
                  {TENHA_EM_MAOS.map((item) => (
                    <li key={item.titulo} className="grid grid-cols-[1.25rem_1fr] gap-2">
                      <span aria-hidden="true" className="font-bold text-laranja">
                        ✓
                      </span>
                      <div>
                        <p className="font-semibold leading-snug">{item.titulo}</p>
                        <p className="suave mt-1 text-[0.9375rem] leading-relaxed">{item.texto}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="fio mt-10 border-t pt-7">
                  <p className="font-semibold">Ficou com alguma dúvida?</p>
                  <ul className="mt-4 space-y-3 text-[0.9375rem]">
                    <li>
                      <span className="eyebrow suave block">E-mail</span>
                      <a
                        href="mailto:institutoculturalsaba@gmail.com"
                        className="link-traco mt-1 inline-block break-all"
                      >
                        institutoculturalsaba@gmail.com
                      </a>
                    </li>
                    <li>
                      <span className="eyebrow suave block">WhatsApp</span>
                      <a
                        href="https://wa.me/5531984304111"
                        target="_blank"
                        rel="noreferrer"
                        className="link-traco mt-1 inline-block"
                      >
                        (31) 98430-4111
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>

            <div className="fio rounded-b-lg border border-t-0 bg-[#efe7d8] p-7 md:rounded-r-lg md:rounded-bl-none md:border-l-0 md:border-t md:p-10">
              {sent ? (
                <div className="flex h-full flex-col justify-center py-6" role="status">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-laranja text-xl font-bold text-tinta"
                  >
                    ✓
                  </span>
                  <p className="t-sub mt-6">Cadastro recebido.</p>
                  <p className="suave mt-4 max-w-[44ch] leading-relaxed">
                    Obrigado. A equipe do Instituto vai entrar em contato pelo e-mail ou WhatsApp
                    informado para organizar a participação da escola.
                  </p>
                  <button
                    type="button"
                    className="link-traco mt-8 self-start font-semibold"
                    onClick={() => setSent(false)}
                  >
                    Cadastrar outra escola
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="form-editorial space-y-10">
                  <input
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  <fieldset>
                    <legend className="etapa-simulador">
                      <span>1</span> A escola
                    </legend>
                    <div className="mt-5 grid gap-x-6 gap-y-6 sm:grid-cols-2">
                      <Field
                        label="Nome da escola"
                        name="escola"
                        required
                        maxLength={FORM_LIMITS.school}
                        className="sm:col-span-2"
                        autoComplete="organization"
                        placeholder="Ex.: Escola Municipal …"
                      />
                      <Field
                        label="Cidade"
                        name="cidade"
                        required
                        maxLength={FORM_LIMITS.city}
                        autoComplete="address-level2"
                        placeholder="Ex.: Belo Horizonte"
                      />
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="etapa-simulador">
                      <span>2</span> Quem vai organizar
                    </legend>
                    <p className="suave mt-2 text-sm">
                      A pessoa com quem a equipe vai combinar a participação.
                    </p>
                    <div className="mt-5 grid gap-x-6 gap-y-6 sm:grid-cols-2">
                      <Field
                        label="Nome"
                        name="responsavel"
                        required
                        maxLength={FORM_LIMITS.name}
                        autoComplete="name"
                      />
                      <Field
                        label="Cargo"
                        name="cargo"
                        required
                        maxLength={FORM_LIMITS.role}
                        autoComplete="organization-title"
                        placeholder="Ex.: diretora, coordenador"
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
                        label="WhatsApp"
                        name="whatsapp"
                        type="tel"
                        required
                        maxLength={FORM_LIMITS.phone}
                        autoComplete="tel"
                        placeholder="(31) 90000-0000"
                      />
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="etapa-simulador">
                      <span>3</span> Os alunos
                    </legend>
                    <div className="mt-5 grid gap-x-6 gap-y-6 sm:grid-cols-2">
                      <Field
                        label="Quantos alunos, mais ou menos?"
                        name="alunos"
                        type="number"
                        required
                        min={1}
                        max={100000}
                        dica="Uma estimativa basta."
                      />
                      <Field
                        label="Faixa etária"
                        name="faixa"
                        required
                        maxLength={FORM_LIMITS.ageRange}
                        placeholder="Ex.: 8 a 14 anos"
                        dica="Ou as séries, como “4º ao 6º ano”."
                      />
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="etapa-simulador">
                      <span>4</span> Algo mais?
                    </legend>
                    <div className="mt-5">
                      <Label htmlFor="mensagem">
                        Mensagem <span className="suave font-normal">(opcional)</span>
                      </Label>
                      <Textarea
                        id="mensagem"
                        name="mensagem"
                        rows={4}
                        maxLength={FORM_LIMITS.message}
                        placeholder="Alunos com necessidades de acessibilidade, melhores dias e horários, ou uma dúvida."
                      />
                    </div>
                  </fieldset>

                  <div className="fio space-y-6 border-t pt-8">
                    <label className="consentimento flex items-start gap-3">
                      <Checkbox
                        checked={consent}
                        onCheckedChange={(v) => setConsent(!!v)}
                        className="mt-0.5"
                      />
                      <span className="suave">
                        Autorizo o uso dos dados da escola para a organização da ação cultural,
                        conforme a{" "}
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
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="chamada chamada--cheia"
                      >
                        {submitting ? "Enviando…" : "Enviar cadastro"}
                        {!submitting && <span className="seta">→</span>}
                      </button>
                      <span className="suave text-sm">* campos obrigatórios</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const atraso = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

const GARANTIAS = [
  {
    titulo: "Espetáculo exclusivo",
    texto: "Uma sessão do Ballet Dom Quixote só para crianças de escolas públicas.",
  },
  {
    titulo: "Transporte",
    texto: "O projeto prevê o deslocamento dos estudantes até o teatro.",
  },
  {
    titulo: "Lanche",
    texto: "As crianças participantes recebem lanche no dia do espetáculo.",
  },
];

const COMO_FUNCIONA = [
  {
    titulo: "Cadastre a escola",
    texto: "Preencha o formulário desta página com os dados da escola e de quem vai organizar.",
  },
  {
    titulo: "A equipe entra em contato",
    texto: "Por e-mail ou WhatsApp, com as informações da sessão exclusiva.",
  },
  {
    titulo: "Organizamos juntos",
    texto: "Número de alunos, turmas e transporte são combinados com a escola.",
  },
  {
    titulo: "Dia do espetáculo",
    texto: "Os alunos vão ao teatro, recebem lanche e assistem ao Ballet Dom Quixote.",
  },
];

const TENHA_EM_MAOS = [
  {
    titulo: "Quem vai organizar",
    texto: "Nome, cargo e contato da pessoa responsável pela participação da escola.",
  },
  {
    titulo: "Quantos alunos",
    texto: "Um número aproximado já ajuda a planejar lugares e transporte.",
  },
  {
    titulo: "A idade das turmas",
    texto: "A faixa etária ou as séries dos alunos que devem ir.",
  },
];

function Field({
  label,
  name,
  type = "text",
  required,
  opcional,
  dica,
  className,
  placeholder,
  maxLength,
  min,
  max,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  opcional?: boolean;
  dica?: string;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  autoComplete?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={name}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
        {opcional && <span className="suave font-normal"> (opcional)</span>}
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
        autoComplete={autoComplete}
        aria-describedby={dica ? `${name}-dica` : undefined}
      />
      {dica && (
        <p id={`${name}-dica`} className="suave mt-2 text-sm">
          {dica}
        </p>
      )}
    </div>
  );
}
