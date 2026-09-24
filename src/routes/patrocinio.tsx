import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { Abertura } from "@/components/site/Abertura";
import { Section } from "@/components/site/Section";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Opcao } from "@/components/site/Opcao";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured, SUPABASE_UNAVAILABLE_MESSAGE } from "@/lib/supabase";
import {
  FORM_LIMITS,
  formString,
  isMoney,
  isValidEmail,
  isValidPhone,
  isWithinLength,
} from "@/lib/form-validation";

export const Route = createFileRoute("/patrocinio")({
  head: () => ({
    meta: [
      { title: "Seja patrocinador — Instituto Cultural Saba" },
      {
        name: "description",
        content: "Apoie o Ballet Dom Quixote por meio da Lei Federal de Incentivo à Cultura.",
      },
    ],
  }),
  component: Patrocinio,
});

// Centavos só quando existem: "R$ 4.000" em vez de "R$ 4.000,00".
const fmtBRL = (v: number) =>
  v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: Number.isInteger(v) ? 0 : 2,
    maximumFractionDigits: 2,
  });
const MAX_MONEY = 1_000_000_000;

function Patrocinio() {
  const [tipo, setTipo] = useState<"PF" | "PJ">("PJ");
  const [momentoPF, setMomentoPF] = useState<"ano-base" | "declaracao">("ano-base");
  const [imposto, setImposto] = useState(100000);
  const [interesse, setInteresse] = useState(4000);
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
    if (!consent) return toast.error("É necessário aceitar o consentimento de dados.");
    const form = e.currentTarget;
    const data = new FormData(form);
    if (formString(data, "website")) return;

    const nome = formString(data, "nome");
    const empresa = formString(data, "empresa");
    const documento = formString(data, "documento");
    const email = formString(data, "email");
    const whatsapp = formString(data, "whatsapp");
    const valor = formString(data, "valor");
    const mensagem = formString(data, "mensagem");
    if (
      !isWithinLength(nome, FORM_LIMITS.name) ||
      !isValidEmail(email) ||
      !isValidPhone(whatsapp)
    ) {
      toast.error("Confira nome, e-mail e WhatsApp antes de enviar.");
      return;
    }
    if (
      !isWithinLength(empresa, FORM_LIMITS.school, 0) ||
      !isWithinLength(documento, FORM_LIMITS.document, 0) ||
      !isWithinLength(mensagem, FORM_LIMITS.message, 0) ||
      !isMoney(valor)
    ) {
      toast.error("Revise os dados do patrocínio e os limites dos campos.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("sponsorship_leads").insert({
        nome,
        empresa: empresa || null,
        documento: documento || null,
        email,
        whatsapp,
        valor: valor ? Number(valor) : null,
        mensagem: mensagem || null,
        tipo,
      });
      if (error) {
        toast.error("Não foi possível registrar seu interesse. Tente novamente.");
        return;
      }
      form.reset();
      setConsent(false);
      setSent(true);
      toast.success("Recebemos seu interesse. Retornaremos em breve.");
    } catch {
      toast.error("Não foi possível registrar seu interesse. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Abertura
        eyebrow="Seja patrocinador"
        linhas={[
          "Invista na",
          <span key="g" className="gesto gesto--luz">
            dança brasileira.
          </span>,
        ]}
        lide="O Ballet Dom Quixote é aprovado pela Lei Federal de Incentivo à Cultura, sob PRONAC 255925. Seu apoio ajuda a realizar uma grande produção, gerar trabalho e levar crianças de escolas públicas ao teatro."
        foto="pointe"
        foco="50% 30%"
      >
        <a href="#fale-conosco" className="chamada chamada--cheia">
          Quero conversar <span className="seta">↓</span>
        </a>
      </Abertura>

      <Section
        numero="01"
        eyebrow="O que você recebe"
        title={
          <>
            Bom para a cultura. <span className="gesto">Melhor ainda para a sua marca.</span>
          </>
        }
        subtitle="Patrocinar o Ballet Dom Quixote é direcionar um imposto que já seria pago para uma grande produção de dança — e receber de volta visibilidade, relacionamento e impacto social."
      >
        <ul className="grid gap-5 md:grid-cols-3">
          {BENEFICIOS.map((b, i) => (
            <li
              key={b.titulo}
              className={`flex flex-col rounded-lg p-7 md:p-8 ${
                i === 0 ? "palco" : "fio border bg-[#efe7d8]"
              }`}
              data-reveal="rise"
              style={atraso(i * 90)}
            >
              <p className={`eyebrow ${i === 0 ? "text-laranja" : "suave"}`}>{b.selo}</p>
              <h3 className="t-sub mt-4">{b.titulo}</h3>
              <p className="suave mt-4 leading-relaxed">{b.texto}</p>
              <ul className="fio mt-7 space-y-3 border-t pt-6">
                {b.itens.map((item) => (
                  <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-2 leading-snug">
                    <span aria-hidden="true" className="font-bold text-laranja">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <a href="#fale-conosco" className="chamada chamada--cheia mt-12" data-reveal="rise">
          Quero patrocinar <span className="seta">↓</span>
        </a>
      </Section>

      <Section
        numero="02"
        eyebrow="Impacto social"
        tone="palco"
        title={
          <>
            Um patrocínio que vai <span className="gesto gesto--luz">além do palco.</span>
          </>
        }
        subtitle="O valor destinado ao projeto movimenta trabalho, formação e acesso à cultura em Belo Horizonte."
      >
        <dl className="grid grid-cols-3 gap-4 md:max-w-3xl">
          {IMPACTO_NUMEROS.map((n, i) => (
            <div
              key={n.rotulo}
              className="fio border-t pt-5"
              data-reveal="rise"
              style={atraso(i * 80)}
            >
              <dt className="numeral text-[clamp(2.4rem,1.6rem+3vw,4.5rem)] leading-none text-laranja">
                {n.valor}
              </dt>
              <dd className="suave mt-2 text-sm leading-snug md:text-base">{n.rotulo}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {IMPACTO_PILARES.map((p, i) => (
            <li key={p.titulo} data-reveal="rise" style={atraso(i * 90)}>
              <h3 className="t-sub">{p.titulo}</h3>
              <p className="suave mt-3 leading-relaxed">{p.texto}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        numero="03"
        eyebrow="Quem pode patrocinar"
        title={
          <>
            Quem paga imposto de renda <span className="gesto">pode patrocinar.</span>
          </>
        }
        subtitle="Pela Lei Rouanet, pessoas e empresas podem destinar parte do imposto de renda devido a projetos culturais aprovados. O percentual e as regras mudam conforme o perfil."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {PERFIS.map((perfil, i) => (
            <article
              key={perfil.quem}
              className="fio flex flex-col rounded-lg border bg-[#efe7d8] p-7 md:p-9"
              data-reveal="rise"
              style={atraso(i * 100)}
            >
              <p className="eyebrow suave">{perfil.publico}</p>
              <h3 className="t-sub mt-2">{perfil.quem}</h3>
              <p className="mt-7 flex items-baseline gap-3">
                <span className="suave text-lg">até</span>
                <span className="numeral text-[clamp(3.4rem,2.2rem+4vw,5.5rem)] leading-none text-laranja">
                  {perfil.teto}
                </span>
              </p>
              <p className="suave mt-2">{perfil.base}</p>
              <dl className="mt-8">
                {perfil.regras.map((regra) => (
                  <div
                    key={regra.rotulo}
                    className="fio grid gap-1 border-t py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4"
                  >
                    <dt className="eyebrow suave sm:pt-1">{regra.rotulo}</dt>
                    <dd className="leading-relaxed">{regra.texto}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <div
          className="fio mt-5 grid gap-3 rounded-lg border p-7 md:grid-cols-[1fr_2fr] md:gap-10 md:p-9"
          data-reveal="rise"
        >
          <h3 className="t-sub">Não se encaixa em nenhum dos dois?</h3>
          <p className="suave leading-relaxed">
            Empresas do Simples Nacional ou do lucro presumido e pessoas que declaram pelo modelo
            simplificado também podem apoiar o projeto, só que sem o abatimento no imposto.{" "}
            <a href="#fale-conosco" className="link-traco font-semibold">
              Fale com a equipe
            </a>{" "}
            para encontrar o melhor formato.
          </p>
        </div>
        <p className="suave mt-8 max-w-[60ch] text-sm">
          A aplicação dos incentivos deve ser validada com a equipe contábil ou fiscal responsável.
        </p>
      </Section>

      <Section
        numero="04"
        eyebrow="Passo a passo"
        tone="palco"
        title={
          <>
            Como patrocinar, <span className="gesto gesto--luz">em sete passos.</span>
          </>
        }
        subtitle="Do primeiro contato ao abatimento no imposto. A equipe do Instituto acompanha você em cada etapa."
      >
        <ol className="grid gap-x-[var(--calha)] md:grid-cols-2">
          {PASSOS.map((passo, i) => (
            <li
              key={i}
              className="fio grid grid-cols-[3.5rem_1fr] gap-4 border-t py-6"
              data-reveal="rise"
              style={atraso((i % 2) * 80)}
            >
              <span className="numeral text-3xl leading-none text-laranja">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="leading-relaxed">{passo}</p>
            </li>
          ))}
        </ol>
        <p className="suave mt-8 max-w-[60ch] text-sm">
          O passo 6 vale para empresas. Pessoas físicas informam o patrocínio na declaração anual do
          imposto de renda.
        </p>
      </Section>

      <Section
        numero="05"
        eyebrow="Simulador"
        title={
          <>
            Quanto do seu imposto <span className="gesto">pode virar arte?</span>
          </>
        }
        subtitle="Responda três perguntas e veja quanto você pode destinar ao Ballet Dom Quixote com abatimento no imposto de renda."
      >
        <Simulador
          tipo={tipo}
          setTipo={setTipo}
          momentoPF={momentoPF}
          setMomentoPF={setMomentoPF}
          imposto={imposto}
          setImposto={setImposto}
          interesse={interesse}
          setInteresse={setInteresse}
        />
      </Section>

      <section
        id="fale-conosco"
        data-surface="papel"
        className="papel scroll-mt-20 pb-[var(--cena)]"
      >
        <div className="container-x">
          <header className="mb-12 max-w-3xl md:mb-16">
            <p className="eyebrow suave flex gap-2.5" data-reveal="rise">
              <span className="numeral">06</span>
              <span aria-hidden="true">·</span>
              <span>Fale conosco</span>
            </p>
            <h2 className="t-titulo mt-4" data-reveal="rise" style={atraso(60)}>
              Vamos <span className="gesto">conversar.</span>
            </h2>
            <p className="t-lide suave mt-5" data-reveal="rise" style={atraso(120)}>
              Deixe seus dados e a equipe do Instituto entra em contato para apresentar o projeto,
              tirar dúvidas e formalizar o apoio. Enviar o formulário não gera nenhum compromisso.
            </p>
          </header>

          <div className="grid md:grid-cols-[1fr_1.55fr]">
            <aside
              className="palco rounded-t-lg p-7 md:rounded-l-lg md:rounded-tr-none md:p-10"
              data-surface="palco"
            >
              {/* Acompanha a rolagem do formulário, que é mais alto. */}
              <div className="md:sticky md:top-28">
                <p className="eyebrow text-laranja">Depois que você envia</p>
                <ol className="mt-7 space-y-7">
                  {DEPOIS_DO_ENVIO.map((etapa, i) => (
                    <li key={etapa.titulo} className="grid grid-cols-[2.25rem_1fr] gap-3">
                      <span className="numeral text-2xl leading-none text-laranja">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-semibold leading-snug">{etapa.titulo}</p>
                        <p className="suave mt-1.5 text-[0.9375rem] leading-relaxed">
                          {etapa.texto}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="fio mt-10 border-t pt-7">
                  <p className="font-semibold">Prefere falar direto?</p>
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
                  <p className="t-sub mt-6">Recebemos seu interesse.</p>
                  <p className="suave mt-4 max-w-[44ch] leading-relaxed">
                    Obrigado por apoiar o Ballet Dom Quixote. A equipe do Instituto vai entrar em
                    contato pelo e-mail ou WhatsApp que você informou.
                  </p>
                  <button
                    type="button"
                    className="link-traco mt-8 self-start font-semibold"
                    onClick={() => setSent(false)}
                  >
                    Enviar outra mensagem
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
                      <span>1</span> Quem vai patrocinar?
                    </legend>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <Opcao
                        nome="form-tipo"
                        marcada={tipo === "PJ"}
                        aoMarcar={() => setTipo("PJ")}
                        titulo="Uma empresa"
                        detalhe="Patrocínio com CNPJ"
                      />
                      <Opcao
                        nome="form-tipo"
                        marcada={tipo === "PF"}
                        aoMarcar={() => setTipo("PF")}
                        titulo="Uma pessoa"
                        detalhe="Patrocínio com CPF"
                      />
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="etapa-simulador">
                      <span>2</span> Seus dados
                    </legend>
                    <div className="mt-5 grid gap-x-6 gap-y-6 sm:grid-cols-2">
                      <Field
                        label="Nome"
                        name="nome"
                        required
                        maxLength={FORM_LIMITS.name}
                        autoComplete="name"
                      />
                      {tipo === "PJ" && (
                        <Field
                          label="Empresa"
                          name="empresa"
                          opcional
                          maxLength={FORM_LIMITS.school}
                          autoComplete="organization"
                        />
                      )}
                      <Field
                        label={tipo === "PJ" ? "CNPJ" : "CPF"}
                        name="documento"
                        opcional
                        maxLength={FORM_LIMITS.document}
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
                      <span>3</span> Sobre o patrocínio
                    </legend>
                    <div className="mt-5 space-y-6">
                      <Field
                        label="Valor que pensa em destinar (R$)"
                        name="valor"
                        type="number"
                        opcional
                        min={0}
                        max={1000000000}
                        step={0.01}
                        dica="Se ainda não sabe, deixe em branco. Se usou o simulador, o valor já aparece aqui."
                      />
                      <div>
                        <Label htmlFor="mensagem">
                          Mensagem <span className="suave font-normal">(opcional)</span>
                        </Label>
                        <Textarea
                          id="mensagem"
                          name="mensagem"
                          rows={4}
                          maxLength={FORM_LIMITS.message}
                          placeholder="Conte um pouco sobre você ou a sua empresa, ou deixe suas dúvidas."
                        />
                      </div>
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
                        Autorizo o uso dos meus dados para que a equipe do Instituto entre em
                        contato sobre o patrocínio, conforme a{" "}
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
                        {submitting ? "Enviando…" : "Enviar interesse"}
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

const DEPOIS_DO_ENVIO = [
  {
    titulo: "Recebemos seu interesse",
    texto: "Seus dados chegam direto à equipe do Instituto.",
  },
  {
    titulo: "Entramos em contato",
    texto: "Por e-mail ou WhatsApp, para apresentar o projeto e tirar suas dúvidas.",
  },
  {
    titulo: "Formalizamos o patrocínio",
    texto: "Combinamos os detalhes do apoio e enviamos os dados da conta do projeto.",
  },
];

// Dados do material oficial do projeto. Os "músicos da orquestra" da lista
// original ficam de fora: a contratante pediu para não falar da orquestra ainda.
const IMPACTO_NUMEROS = [
  { valor: "30+", rotulo: "bailarinos no elenco" },
  { valor: "10+", rotulo: "pessoas na equipe artística" },
  { valor: "40+", rotulo: "pessoas na equipe técnica" },
];

const IMPACTO_PILARES = [
  {
    titulo: "Trabalho",
    texto:
      "Além do elenco, a produção envolve preparadores físicos, ensaiadores, fisioterapeutas, técnicos de teatro, figurinistas, costureiras e profissionais de marketing, advocacia e contabilidade.",
  },
  {
    titulo: "Formação",
    texto:
      "O elenco é selecionado por audição pública e divide o palco com convidados de renome internacional: oportunidade de trabalho e intercâmbio para jovens bailarinos brasileiros.",
  },
  {
    titulo: "Acesso à cultura",
    texto:
      "Um espetáculo exclusivo para crianças de escolas públicas, com transporte e lanche garantidos.",
  },
];

const BENEFICIOS = [
  {
    selo: "Retorno fiscal",
    titulo: "Seu imposto vira espetáculo.",
    texto:
      "O valor do patrocínio pode ser abatido do imposto de renda devido, dentro dos limites da Lei Rouanet. Você apoia a cultura com um recurso que já iria para o imposto.",
    itens: [
      "Incentivo previsto na Lei Federal de Incentivo à Cultura",
      "Recibo de mecenato emitido pela proponente do projeto",
      "Simulador nesta página para estimar o valor",
    ],
  },
  {
    selo: "Visibilidade",
    titulo: "Sua marca no palco e fora dele.",
    texto:
      "Seu nome ligado a uma grande produção de ballet clássico, vista pelo público do teatro e por quem acompanha o Instituto.",
    itens: [
      "Divulgação no site do Instituto",
      "Presença no programa do espetáculo",
      "Divulgação nas redes sociais",
      "Materiais impressos e digitais",
    ],
  },
  {
    selo: "Relacionamento e propósito",
    titulo: "Experiências que ficam.",
    texto:
      "Um patrocínio que aproxima a sua marca de clientes, equipe e comunidade — e leva crianças de escolas públicas ao teatro.",
    itens: [
      "Ingressos exclusivos para convidados",
      "Novidades do projeto em primeira mão",
      "Associação a um projeto com contrapartida social",
    ],
  },
];

const PERFIS = [
  {
    publico: "Para empresas",
    quem: "Pessoa jurídica",
    teto: "4%",
    base: "do imposto de renda devido",
    regras: [
      { rotulo: "Quem pode", texto: "Empresas tributadas pelo regime de lucro real." },
      { rotulo: "Quando", texto: "Aporte durante o período de captação do projeto." },
      {
        rotulo: "Comprovante",
        texto: "Recibo de mecenato, registrado para fins contábeis e fiscais.",
      },
    ],
  },
  {
    publico: "Para pessoas",
    quem: "Pessoa física",
    teto: "6%",
    base: "do imposto de renda devido, no ano-base",
    regras: [
      {
        rotulo: "Quem pode",
        texto: "Quem declara o imposto de renda pelo modelo completo.",
      },
      {
        rotulo: "Quando",
        texto: "Aporte dentro do período de captação — ou até 3% diretamente na declaração.",
      },
      { rotulo: "Comprovante", texto: "Recibo de mecenato, guardado para usar na declaração." },
    ],
  },
];

// Do interesse à dedução. Do passo 3 em diante, o fluxo do material oficial.
const PASSOS: ReactNode[] = [
  <>
    Preencha o{" "}
    <a href="#fale-conosco" className="link-traco font-semibold">
      formulário de interesse
    </a>{" "}
    no fim desta página.
  </>,
  "A equipe do Instituto entra em contato para formalizar o patrocínio, alinhar os detalhes do apoio e enviar os dados da conta do projeto.",
  "Faça o depósito na conta do projeto até o último dia do ano ou do período fiscal.",
  "Comunique a proponente para a emissão do recibo de mecenato.",
  "Declare o patrocínio no imposto de renda pela Lei Rouanet.",
  "Abata o valor destinado na DARF do imposto de renda.",
  "Guarde o recibo de patrocínio por seis anos.",
];

type Tipo = "PF" | "PJ";
type Momento = "ano-base" | "declaracao";

function Simulador({
  tipo,
  setTipo,
  momentoPF,
  setMomentoPF,
  imposto,
  setImposto,
  interesse,
  setInteresse,
}: {
  tipo: Tipo;
  setTipo: (v: Tipo) => void;
  momentoPF: Momento;
  setMomentoPF: (v: Momento) => void;
  imposto: number;
  setImposto: (v: number) => void;
  interesse: number;
  setInteresse: (v: number) => void;
}) {
  const limitePct = tipo === "PJ" ? 0.04 : momentoPF === "ano-base" ? 0.06 : 0.03;
  const teto = Math.round(imposto * limitePct * 100) / 100;
  const abatido = Math.min(interesse, teto);
  const excedente = Math.max(0, interesse - teto);
  const disponivel = Math.max(0, teto - interesse);

  // A barra representa o maior entre o limite e o valor escolhido.
  const escala = Math.max(teto, interesse, 1);
  const pctAbatido = (abatido / escala) * 100;
  const pctExcedente = (excedente / escala) * 100;

  let recado: string;
  if (teto === 0) recado = "Informe o imposto de renda devido para calcular o limite.";
  else if (interesse === 0) recado = `Você pode destinar até ${fmtBRL(teto)} com abatimento.`;
  else if (excedente > 0)
    recado = `${fmtBRL(excedente)} passam do limite e não seriam abatidos do imposto.`;
  else if (disponivel > 0) recado = `Ainda cabem mais ${fmtBRL(disponivel)} dentro do limite.`;
  else recado = "Você está usando todo o limite de abatimento.";

  function levarAoFormulario() {
    const campo = document.getElementById("valor") as HTMLInputElement | null;
    if (campo && interesse > 0) campo.value = String(interesse);
    document.getElementById("fale-conosco")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="grid overflow-hidden rounded-lg md:grid-cols-[1.15fr_1fr]">
      <div className="form-editorial fio space-y-10 border bg-[#efe7d8] p-7 md:rounded-l-lg md:border-r-0 md:p-10">
        <fieldset>
          <legend className="etapa-simulador">
            <span>1</span> Quem vai patrocinar?
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Opcao
              nome="sim-tipo"
              marcada={tipo === "PJ"}
              aoMarcar={() => setTipo("PJ")}
              titulo="Uma empresa"
              detalhe="Tributada pelo lucro real"
              selo="até 4%"
            />
            <Opcao
              nome="sim-tipo"
              marcada={tipo === "PF"}
              aoMarcar={() => setTipo("PF")}
              titulo="Uma pessoa"
              detalhe="Declaração completa do IR"
              selo="até 6%"
            />
          </div>
          {tipo === "PF" && (
            <div className="mt-5">
              <p className="mb-2 text-[0.9375rem] font-semibold">Quando vai destinar?</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Opcao
                  nome="sim-momento"
                  marcada={momentoPF === "ano-base"}
                  aoMarcar={() => setMomentoPF("ano-base")}
                  titulo="Durante o ano"
                  detalhe="No período de captação"
                  selo="até 6%"
                  compacta
                />
                <Opcao
                  nome="sim-momento"
                  marcada={momentoPF === "declaracao"}
                  aoMarcar={() => setMomentoPF("declaracao")}
                  titulo="Na declaração"
                  detalhe="Ao declarar o IR"
                  selo="até 3%"
                  compacta
                />
              </div>
            </div>
          )}
        </fieldset>

        <div>
          <Label htmlFor="sim-imposto" className="etapa-simulador">
            <span>2</span> Quanto é o imposto de renda devido no ano?
          </Label>
          <CampoMoeda id="sim-imposto" valor={imposto} aoMudar={setImposto} />
          <p className="suave mt-2 text-sm">
            {tipo === "PJ"
              ? "Uma estimativa basta — o contador da empresa tem esse número."
              : "Está na sua última declaração, no campo “imposto devido”."}
          </p>
        </div>

        <div>
          <Label htmlFor="sim-valor" className="etapa-simulador">
            <span>3</span> Quanto você quer destinar?
          </Label>
          <CampoMoeda id="sim-valor" valor={interesse} aoMudar={setInteresse} />
          {teto > 0 && interesse !== teto && (
            <button
              type="button"
              onClick={() => setInteresse(teto)}
              className="link-traco mt-3 text-sm font-semibold"
            >
              Usar o limite máximo ({fmtBRL(teto)})
            </button>
          )}
        </div>
      </div>

      <div
        className="palco flex flex-col p-7 md:rounded-r-lg md:p-10"
        data-surface="palco"
        aria-live="polite"
      >
        <p className="eyebrow text-laranja">Resultado</p>
        <p className="suave mt-5">Pode ser abatido do imposto</p>
        <p className="numeral mt-2 text-[clamp(2.8rem,1.8rem+3.5vw,4.6rem)] leading-none">
          {fmtBRL(abatido)}
        </p>

        <div className="mt-8">
          <div
            className="flex h-3 overflow-hidden rounded-full bg-[rgb(227_217_199/0.14)]"
            aria-hidden="true"
          >
            <span
              className="h-full bg-laranja transition-[width] duration-500"
              style={{ width: `${pctAbatido}%` }}
            />
            <span
              className="h-full bg-[repeating-linear-gradient(135deg,rgb(227_217_199/0.55)_0_4px,transparent_4px_8px)] transition-[width] duration-500"
              style={{ width: `${pctExcedente}%` }}
            />
          </div>
          <p className="mt-3 text-[0.9375rem] leading-snug">{recado}</p>
        </div>

        <dl className="mt-8">
          <Row
            label={`Seu limite (${Math.round(limitePct * 100)}% do imposto)`}
            value={fmtBRL(teto)}
          />
          <Row label="Valor que você quer destinar" value={fmtBRL(interesse)} />
          {excedente > 0 && <Row label="Acima do limite" value={fmtBRL(excedente)} />}
        </dl>

        <button
          type="button"
          onClick={levarAoFormulario}
          className="chamada chamada--cheia mt-10 self-start"
        >
          Quero patrocinar <span className="seta">↓</span>
        </button>
        <p className="suave mt-6 text-xs leading-relaxed">
          Simulação informativa, com os percentuais do material do projeto. Confirme a elegibilidade
          e a dedução com a sua assessoria contábil.
        </p>
      </div>
    </div>
  );
}

/** Valor em reais inteiros, com separador de milhar enquanto digita. */
function CampoMoeda({
  id,
  valor,
  aoMudar,
}: {
  id: string;
  valor: number;
  aoMudar: (v: number) => void;
}) {
  return (
    <div className="relative mt-3">
      <span
        aria-hidden="true"
        className="suave pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-semibold"
      >
        R$
      </span>
      <Input
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        className="pl-12! text-lg font-semibold tabular-nums"
        value={valor ? Math.round(valor).toLocaleString("pt-BR") : ""}
        placeholder="0"
        onChange={(e) => {
          const digitos = e.target.value.replace(/\D/g, "").slice(0, 10);
          aoMudar(Math.min(Number(digitos || 0), MAX_MONEY));
        }}
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="fio flex items-baseline justify-between gap-4 border-t py-3.5">
      <dt className="suave text-sm">{label}</dt>
      <dd className="numeral text-lg">{value}</dd>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  opcional,
  dica,
  placeholder,
  maxLength,
  min,
  max,
  step,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  opcional?: boolean;
  dica?: string;
  placeholder?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  autoComplete?: string;
}) {
  return (
    <div>
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
        maxLength={maxLength}
        min={min}
        max={max}
        step={step}
        autoComplete={autoComplete}
        placeholder={placeholder}
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
