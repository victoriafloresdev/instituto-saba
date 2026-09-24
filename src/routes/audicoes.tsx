import { createFileRoute, Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState, type CSSProperties } from "react";
import { Abertura } from "@/components/site/Abertura";
import { Section } from "@/components/site/Section";
import { Opcao } from "@/components/site/Opcao";
import { Contagem } from "@/components/site/Contagem";
import { fetchPublishedSpectacles } from "@/lib/site-content";
import type { Disponibilidade } from "@/lib/database.types";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured, SUPABASE_UNAVAILABLE_MESSAGE } from "@/lib/supabase";
import {
  FORM_LIMITS,
  formString,
  isIntegerBetween,
  isValidEmail,
  isValidHttpUrl,
  isValidPhone,
  isWithinLength,
} from "@/lib/form-validation";

export const Route = createFileRoute("/audicoes")({
  head: () => ({
    meta: [
      { title: "Audições — Instituto Cultural Saba" },
      { name: "description", content: "Inscreva-se para as audições do Instituto Cultural Saba." },
      { property: "og:title", content: "Audições — Instituto Cultural Saba" },
    ],
  }),
  // ?espetaculo=<slug> (ou "banco") já deixa o destino da inscrição escolhido.
  validateSearch: (search: Record<string, unknown>): { espetaculo?: string } => ({
    espetaculo: typeof search.espetaculo === "string" ? search.espetaculo : undefined,
  }),
  // Espetáculos marcados no painel como "terá audição", na ordem da temporada.
  loader: async () => {
    const espetaculos = await fetchPublishedSpectacles();
    return {
      audicoes: espetaculos
        .filter((e) => e.audition_enabled)
        .map((e) => ({
          id: e.id,
          slug: e.slug,
          titulo: e.title,
          quando: e.date_label,
          abertura: e.audition_opens_at,
        })),
    };
  },
  component: Audicoes,
});

const BANCO = "banco";

type Audicao = {
  id: string;
  slug: string;
  titulo: string;
  quando: string | null;
  abertura: string | null;
};

function estaAberta(a: Pick<Audicao, "abertura">, agora = Date.now()) {
  return a.abertura ? new Date(a.abertura).getTime() <= agora : false;
}

const PERIODOS: Disponibilidade[] = ["Manhã", "Tarde", "Noite"];

function Audicoes() {
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);
  const [modalidade, setModalidade] = useState("");
  const [disponibilidade, setDisponibilidade] = useState<Disponibilidade[]>([]);
  const [submitting, setSubmitting] = useState(false);
  // Menores de 18 anos precisam do responsável (LGPD, art. 14).
  const [idadeDigitada, setIdadeDigitada] = useState("");
  const [autorizaResponsavel, setAutorizaResponsavel] = useState(false);
  const menor = Number(idadeDigitada) >= 1 && Number(idadeDigitada) < 18;
  const { audicoes } = Route.useLoaderData();
  const { espetaculo } = Route.useSearch();
  const [agora, setAgora] = useState(() => Date.now());

  // Só dá para se inscrever na audição de um espetáculo depois que ela abre.
  // Antes disso, o caminho é o banco de talentos.
  const abertas = audicoes.filter((a) => estaAberta(a, agora));
  const destinoDaUrl = (slug?: string) =>
    slug === BANCO ? BANCO : (abertas.find((a) => a.slug === slug)?.id ?? "");
  // Sem audição aberta, o banco de talentos é a única opção: já vem marcado.
  const [destino, setDestino] = useState(
    () => destinoDaUrl(espetaculo) || (abertas.length === 0 ? BANCO : ""),
  );

  // Clicar em "Inscrever-se" numa audição da lista troca o destino do formulário.
  useEffect(() => {
    if (espetaculo) setDestino(destinoDaUrl(espetaculo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [espetaculo]);

  // Quem está com a página aberta no momento da abertura vê a inscrição
  // liberar sem recarregar: agenda um novo render para a próxima abertura.
  useEffect(() => {
    const proxima = audicoes
      .map((a) => (a.abertura ? new Date(a.abertura).getTime() : NaN))
      .filter((t) => t > agora)
      .sort((x, y) => x - y)[0];
    if (!proxima) return;
    const espera = proxima - agora + 500;
    if (espera > 2_147_000_000) return; // além do limite do setTimeout (~24 dias)
    const id = window.setTimeout(() => setAgora(Date.now()), espera);
    return () => window.clearTimeout(id);
  }, [audicoes, agora]);

  const escolhida = abertas.find((a) => a.id === destino);

  function alternarPeriodo(periodo: Disponibilidade, marcado: boolean) {
    setDisponibilidade((atual) =>
      marcado
        ? PERIODOS.filter((p) => p === periodo || atual.includes(p))
        : atual.filter((p) => p !== periodo),
    );
  }

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
    const whatsapp = formString(data, "whatsapp");
    const idade = formString(data, "idade");
    const cidade = formString(data, "cidade");
    const experiencia = formString(data, "experiencia");
    const portfolio = formString(data, "portfolio");
    const mensagem = formString(data, "mensagem");

    if (
      !isWithinLength(nome, FORM_LIMITS.name) ||
      !isValidEmail(email) ||
      !isValidPhone(whatsapp)
    ) {
      toast.error("Confira nome, e-mail e WhatsApp antes de enviar.");
      return;
    }
    if (!isIntegerBetween(idade, 1, 120)) {
      toast.error("Informe uma idade válida entre 1 e 120 anos.");
      return;
    }
    const ehMenor = Number(idade) < 18;
    const responsavelNome = formString(data, "responsavel_nome");
    const responsavelContato = formString(data, "responsavel_contato");
    if (ehMenor) {
      if (
        !isWithinLength(responsavelNome, FORM_LIMITS.name) ||
        !isWithinLength(responsavelContato, FORM_LIMITS.name)
      ) {
        toast.error("Para menores de 18 anos, informe o nome e o contato do responsável.");
        return;
      }
      if (!autorizaResponsavel) {
        toast.error("Para menores de 18 anos, é preciso a autorização do responsável.");
        return;
      }
    }
    if (
      !isWithinLength(cidade, FORM_LIMITS.city) ||
      !isWithinLength(experiencia, FORM_LIMITS.message, 0) ||
      !isWithinLength(mensagem, FORM_LIMITS.message, 0)
    ) {
      toast.error("Revise os campos de texto: há um limite de caracteres excedido.");
      return;
    }
    if (!isValidHttpUrl(portfolio) || portfolio.length > FORM_LIMITS.portfolio) {
      toast.error("Informe um link de portfólio válido (http:// ou https://).");
      return;
    }
    if (!destino) {
      toast.error("Escolha para qual audição é a sua inscrição.");
      return;
    }
    if (destino !== BANCO && !abertas.some((a) => a.id === destino)) {
      toast.error("As inscrições para essa audição ainda não abriram.");
      setDestino("");
      return;
    }
    if (disponibilidade.length === 0) {
      toast.error("Marque pelo menos um período de disponibilidade para os ensaios.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("auditions").insert({
        nome,
        email,
        whatsapp,
        idade: Number(idade),
        cidade,
        modalidade: modalidade || null,
        experiencia: experiencia || null,
        portfolio: portfolio || null,
        mensagem: mensagem || null,
        disponibilidade,
        spectacle_id: destino === BANCO ? null : destino,
        // Só vai quando é menor: inscrições de adultos não dependem destas colunas.
        ...(ehMenor
          ? {
              responsavel_nome: responsavelNome,
              responsavel_contato: responsavelContato,
              responsavel_autorizou: true,
            }
          : {}),
      });
      if (error) {
        toast.error("Não foi possível enviar sua inscrição. Tente novamente.");
        return;
      }
      form.reset();
      setModalidade("");
      setDisponibilidade([]);
      setIdadeDigitada("");
      setAutorizaResponsavel(false);
      setConsent(false);
      setSent(true);
      toast.success("Inscrição enviada com sucesso.");
    } catch {
      toast.error("Não foi possível enviar sua inscrição. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Abertura
        eyebrow="Audições"
        linhas={[
          "Há um lugar",
          <span key="g" className="gesto gesto--luz">
            em cena.
          </span>,
        ]}
        lide="O elenco de cada espetáculo do Instituto é formado por bailarinos selecionados em audição pública, ao lado de convidados de renome internacional."
        foto="estudio"
        foco="46% 50%"
      >
        <a href="#audicoes" className="chamada chamada--cheia">
          Ver audições <span className="seta">↓</span>
        </a>
      </Abertura>

      <Section
        id="audicoes"
        numero="01"
        eyebrow="Audições da temporada"
        title={
          <>
            Escolha a <span className="gesto">sua audição.</span>
          </>
        }
        subtitle="Cada espetáculo tem o seu elenco e a sua audição. As inscrições abrem numa data própria para cada uma — e o banco de talentos fica aberto o ano todo."
      >
        <ul className="grid gap-5 md:grid-cols-2">
          {audicoes.map((a, i) => (
            <CartaoAudicao
              key={a.id}
              audicao={a}
              aberta={estaAberta(a, agora)}
              style={atraso(i * 90)}
            />
          ))}
          <li
            className="palco flex flex-col rounded-lg p-7 md:p-9"
            data-surface="palco"
            data-reveal="rise"
            style={atraso(audicoes.length * 90)}
          >
            <p className="eyebrow text-laranja">Aberto o ano todo</p>
            <h3 className="t-sub mt-3">Banco de talentos</h3>
            <p className="suave mt-4 max-w-[48ch] leading-relaxed">
              Não encontrou uma audição aberta para o seu perfil? Deixe seu cadastro: a equipe
              consulta o banco ao montar o elenco de cada espetáculo.
            </p>
            <div className="mt-auto pt-8">
              <Link
                to="/audicoes"
                search={{ espetaculo: BANCO }}
                hash="inscricao"
                className="chamada chamada--cheia"
              >
                Cadastrar no banco <span className="seta">→</span>
              </Link>
            </div>
          </li>
        </ul>
      </Section>

      <Section
        numero="02"
        eyebrow="Como funciona"
        tone="palco"
        title={
          <>
            Da inscrição <span className="gesto gesto--luz">ao palco.</span>
          </>
        }
        subtitle="O caminho é o mesmo para todas as audições. A equipe do Instituto acompanha você em cada etapa."
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

      <section id="inscricao" data-surface="papel" className="papel scroll-mt-20 py-[var(--cena)]">
        <div className="container-x">
          <header className="mb-12 max-w-3xl md:mb-16">
            <p className="eyebrow suave flex gap-2.5" data-reveal="rise">
              <span className="numeral">03</span>
              <span aria-hidden="true">·</span>
              <span>Inscrição</span>
            </p>
            <h2 className="t-titulo mt-4" data-reveal="rise" style={atraso(60)}>
              Faça sua <span className="gesto">inscrição.</span>
            </h2>
            <p className="t-lide suave mt-5" data-reveal="rise" style={atraso(120)}>
              {textoDeApoio(destino, escolhida, abertas.length > 0)}
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
                  <p className="suave mt-6 text-xs leading-relaxed">
                    A inscrição não substitui um edital ou convocação oficial.
                  </p>
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
                  <p className="t-sub mt-6">Inscrição recebida.</p>
                  <p className="suave mt-4 max-w-[44ch] leading-relaxed">
                    Obrigado por se inscrever. A equipe do Instituto vai entrar em contato pelo
                    e-mail ou WhatsApp que você informou, com as datas e os critérios da seleção.
                  </p>
                  <button
                    type="button"
                    className="link-traco mt-8 self-start font-semibold"
                    onClick={() => setSent(false)}
                  >
                    Fazer nova inscrição
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={submit}
                  onChange={(e) => {
                    const campo = e.target as unknown as HTMLInputElement;
                    if (campo.name === "idade") setIdadeDigitada(campo.value);
                  }}
                  className="form-editorial space-y-10"
                >
                  <input
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  <fieldset>
                    <legend className="etapa-simulador">
                      <span>1</span> Para qual audição?
                    </legend>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {abertas.map((a) => (
                        <Opcao
                          key={a.id}
                          nome="destino"
                          marcada={destino === a.id}
                          aoMarcar={() => setDestino(a.id)}
                          titulo={a.titulo}
                          detalhe={a.quando ?? "Inscrições abertas"}
                          selo="aberta"
                        />
                      ))}
                      <Opcao
                        nome="destino"
                        marcada={destino === BANCO}
                        aoMarcar={() => setDestino(BANCO)}
                        titulo="Banco de talentos"
                        detalhe="Cadastro geral, aberto o ano todo"
                      />
                    </div>
                    {abertas.length === 0 && (
                      <p className="suave mt-3 text-sm">
                        Nenhuma audição de espetáculo está com inscrições abertas agora. Elas
                        aparecem aqui assim que abrirem.
                      </p>
                    )}
                  </fieldset>

                  <fieldset>
                    <legend className="etapa-simulador">
                      <span>2</span> Seus dados
                    </legend>
                    <div className="mt-5 grid gap-x-6 gap-y-6 sm:grid-cols-2">
                      <Field
                        label="Nome completo"
                        name="nome"
                        required
                        maxLength={FORM_LIMITS.name}
                        autoComplete="name"
                        className="sm:col-span-2"
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
                      <Field label="Idade" name="idade" type="number" required min={1} max={120} />
                      <Field
                        label="Cidade"
                        name="cidade"
                        required
                        maxLength={FORM_LIMITS.city}
                        autoComplete="address-level2"
                        placeholder="Ex.: Belo Horizonte"
                      />
                      {menor && (
                        <div className="fio rounded-md border-2 border-laranja bg-[#f6f1e8] p-5 sm:col-span-2">
                          <p className="font-semibold">Menor de 18 anos</p>
                          <p className="suave mt-1 text-sm leading-relaxed">
                            A inscrição precisa dos dados e da autorização de um responsável legal
                            (mãe, pai ou tutor).
                          </p>
                          <div className="mt-5 grid gap-x-6 gap-y-6 sm:grid-cols-2">
                            <Field
                              label="Nome do responsável"
                              name="responsavel_nome"
                              required
                              maxLength={FORM_LIMITS.name}
                            />
                            <Field
                              label="WhatsApp ou e-mail do responsável"
                              name="responsavel_contato"
                              required
                              maxLength={FORM_LIMITS.name}
                            />
                          </div>
                          <label className="consentimento mt-5 flex items-start gap-3">
                            <Checkbox
                              checked={autorizaResponsavel}
                              onCheckedChange={(v) => setAutorizaResponsavel(v === true)}
                              className="mt-0.5"
                            />
                            <span className="suave">
                              O responsável legal leu a{" "}
                              <a
                                href="/privacidade"
                                target="_blank"
                                rel="noreferrer"
                                className="link-traco font-semibold"
                              >
                                Política de Privacidade
                              </a>{" "}
                              e autoriza esta inscrição e o uso dos dados do candidato para o
                              processo seletivo.
                            </span>
                          </label>
                        </div>
                      )}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="etapa-simulador">
                      <span>3</span> A sua dança
                    </legend>
                    <div className="mt-5 space-y-6">
                      <div>
                        <Label htmlFor="modalidade">
                          Modalidade principal <span className="suave font-normal">(opcional)</span>
                        </Label>
                        <Select value={modalidade} onValueChange={setModalidade}>
                          <SelectTrigger id="modalidade">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {MODALIDADES.map((m) => (
                              <SelectItem key={m} value={m}>
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="experiencia">
                          Experiência <span className="suave font-normal">(opcional)</span>
                        </Label>
                        <Textarea
                          id="experiencia"
                          name="experiencia"
                          rows={4}
                          maxLength={FORM_LIMITS.message}
                          placeholder="Onde estudou, companhias e grupos de que participou, espetáculos e prêmios."
                        />
                      </div>
                      <Field
                        label="Link de vídeo ou portfólio"
                        name="portfolio"
                        type="url"
                        opcional
                        maxLength={FORM_LIMITS.portfolio}
                        placeholder="https://"
                        dica="YouTube, Vimeo, Instagram ou Google Drive — confira se o link está aberto para qualquer pessoa ver."
                      />
                      <fieldset>
                        <legend>
                          Disponibilidade para ensaios<span aria-hidden="true"> *</span>
                        </legend>
                        <p className="suave mt-1 text-sm">Pode marcar mais de um período.</p>
                        <div className="mt-3 grid grid-cols-3 gap-3">
                          {PERIODOS.map((periodo) => {
                            const marcado = disponibilidade.includes(periodo);
                            return (
                              <label
                                key={periodo}
                                className={`flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-md border-2 bg-[#f6f1e8] px-3 font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-laranja ${
                                  marcado
                                    ? "border-tinta"
                                    : "border-transparent hover:border-[rgb(31_30_28/0.3)]"
                                }`}
                              >
                                <Checkbox
                                  checked={marcado}
                                  onCheckedChange={(v) => alternarPeriodo(periodo, v === true)}
                                />
                                {periodo}
                              </label>
                            );
                          })}
                        </div>
                      </fieldset>
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
                        rows={3}
                        maxLength={FORM_LIMITS.message}
                        placeholder="Algo que a equipe deva saber, ou uma dúvida sobre a audição."
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
                        Autorizo o uso dos meus dados para contato e para o processo seletivo,
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
                        {submitting ? "Enviando…" : "Enviar inscrição"}
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

const MODALIDADES = [
  "Balé clássico",
  "Dança contemporânea",
  "Jazz",
  "Dança urbana",
  "Afro-brasileira",
  "Dança-teatro",
  "Outra",
];

const COMO_FUNCIONA = [
  {
    titulo: "Escolha a audição",
    texto:
      "Inscreva-se na audição de um espetáculo quando as inscrições abrirem, ou entre no banco de talentos a qualquer momento.",
  },
  {
    titulo: "Envie sua inscrição",
    texto: "Preencha o formulário com seus dados, sua experiência e, se tiver, um vídeo.",
  },
  {
    titulo: "Aguarde o contato",
    texto:
      "A equipe do Instituto analisa as inscrições e entra em contato com as datas e os critérios da seleção.",
  },
  {
    titulo: "Audição",
    texto:
      "O elenco de cada espetáculo é selecionado em audição pública, e divide o palco com convidados de renome internacional.",
  },
];

const TENHA_EM_MAOS = [
  {
    titulo: "Um vídeo dançando",
    texto: "Ou um portfólio. Não é obrigatório, mas ajuda muito a equipe a conhecer você.",
  },
  {
    titulo: "Sua trajetória",
    texto: "Onde estudou, grupos e companhias de que participou.",
  },
  {
    titulo: "Seus horários",
    texto: "Os períodos em que você pode ensaiar: manhã, tarde ou noite.",
  },
];

function textoDeApoio(destino: string, escolhida: Audicao | undefined, algumaAberta: boolean) {
  if (destino === BANCO)
    return "O banco de talentos é um cadastro geral: a equipe entra em contato quando houver uma oportunidade compatível com o seu perfil.";
  if (escolhida)
    return `As inscrições para a audição de ${escolhida.titulo} estão abertas. A equipe entrará em contato com as datas e os critérios da seleção.`;
  return algumaAberta
    ? "Escolha a audição no formulário. A equipe entrará em contato com as datas e os critérios da seleção."
    : "Nenhuma audição está com inscrições abertas agora. Enquanto isso, você pode entrar no banco de talentos.";
}

/** Uma audição da temporada, com o estado da abertura das inscrições. */
function CartaoAudicao({
  audicao: a,
  aberta,
  style,
}: {
  audicao: Audicao;
  aberta: boolean;
  style?: CSSProperties;
}) {
  return (
    <li
      className="fio flex flex-col rounded-lg border bg-[#efe7d8] p-7 md:p-9"
      data-reveal="rise"
      style={style}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="eyebrow suave">Audição</p>
        {aberta ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-laranja px-3 py-1 text-xs font-bold text-tinta">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
            Inscrições abertas
          </span>
        ) : (
          <span className="rounded-full bg-[rgb(31_30_28/0.08)] px-3 py-1 text-xs font-bold">
            Em breve
          </span>
        )}
      </div>
      <h3 className="t-sub mt-3">{a.titulo}</h3>
      {a.quando && <p className="suave mt-1">Espetáculo: {a.quando}</p>}

      <div className="fio mt-6 border-t pt-6">
        {aberta ? (
          <p className="leading-relaxed">
            As inscrições estão abertas. Inscreva-se e a equipe entra em contato com as datas da
            seleção.
          </p>
        ) : a.abertura ? (
          <Contagem alvo={a.abertura} rotulo="As inscrições abrem em" />
        ) : (
          <p className="suave">A data de abertura das inscrições ainda será divulgada.</p>
        )}
      </div>

      <div className="mt-auto pt-8">
        {aberta ? (
          <Link
            to="/audicoes"
            search={{ espetaculo: a.slug }}
            hash="inscricao"
            className="chamada chamada--cheia"
          >
            Inscrever-se <span className="seta">→</span>
          </Link>
        ) : (
          <p className="suave text-sm">
            Enquanto isso, você pode{" "}
            <Link
              to="/audicoes"
              search={{ espetaculo: BANCO }}
              hash="inscricao"
              className="link-traco font-semibold"
            >
              entrar no banco de talentos
            </Link>
            .
          </p>
        )}
      </div>
    </li>
  );
}

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
