import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { Foto } from "@/components/site/Foto";
import { fichaDoEspetaculo, type Pessoa } from "@/data/ficha-tecnica";
import { Contagem } from "@/components/site/Contagem";
import type { SpectaclePerson } from "@/lib/database.types";
import {
  fetchPublishedSpectacleBySlug,
  fetchSpectaclePeople,
  siteAssetUrl,
  formatSessao,
  formatSpectacleDate,
  formatSpectacleTime,
  sessoesOrdenadas,
} from "@/lib/site-content";

export const Route = createFileRoute("/espetaculo/$slug")({
  loader: async ({ params }) => {
    const spectacle = await fetchPublishedSpectacleBySlug(params.slug);
    // null = tabela de equipe indisponível; a página usa a ficha do código.
    const pessoas = spectacle ? await fetchSpectaclePeople(spectacle.id) : null;
    return { spectacle, pessoas };
  },
  head: ({ loaderData }) => {
    const spectacle = loaderData?.spectacle;
    const title = spectacle
      ? `${spectacle.title} — Instituto Cultural Saba`
      : "Espetáculo — Instituto Cultural Saba";
    return {
      meta: [
        { title },
        {
          name: "description",
          content:
            spectacle?.description?.slice(0, 180) ||
            "Informações sobre os espetáculos do Instituto Cultural Saba.",
        },
        { property: "og:title", content: title },
      ],
    };
  },
  component: EspetaculoDetalhe,
});

const atraso = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

function EspetaculoDetalhe() {
  const { spectacle, pessoas } = Route.useLoaderData();

  if (!spectacle) {
    return (
      <section data-surface="palco" className="palco flex min-h-[70svh] items-end pt-[4.5rem]">
        <div className="container-x pb-[var(--cena-curta)]">
          <p className="eyebrow suave">Espetáculo</p>
          <h1 className="t-titulo mt-4 max-w-[18ch]">Este espetáculo não está em cartaz.</h1>
          <Link to="/programacao" className="chamada mt-8">
            Ver programação <span className="seta">→</span>
          </Link>
        </div>
      </section>
    );
  }

  const ficha = fichaDoEspetaculo(spectacle.slug);
  const sinopse = ficha?.sinopse ?? (spectacle.synopsis || "").split(/\n{2,}/).filter(Boolean);
  // Equipe e elenco vêm do painel; sem a tabela, da ficha que está no código.
  const time = pessoas
    ? agruparPessoas(pessoas)
    : {
        destaques: ficha?.remontagem ? [ficha.remontagem] : [],
        direcao: ficha?.direcao ?? [],
        equipe: ficha?.equipe ?? [],
        elenco: [],
        convidados: [],
      };
  const temElenco = time.elenco.length + time.convidados.length > 0;
  const temFicha =
    time.destaques.length + time.direcao.length + time.equipe.length > 0 || temElenco;
  const local = [spectacle.venue, spectacle.city].filter(Boolean).join(", ");
  const sessoes = sessoesOrdenadas(spectacle);
  const audicaoAberta =
    spectacle.audition_enabled &&
    Boolean(spectacle.audition_opens_at) &&
    new Date(spectacle.audition_opens_at ?? "").getTime() <= Date.now();

  const vendaFutura =
    Boolean(spectacle.ticket_sales_open_at) &&
    new Date(spectacle.ticket_sales_open_at ?? "").getTime() > Date.now();

  const fatos = [
    { rotulo: "Quando", valor: formatSpectacleDate(spectacle) },
    {
      rotulo: "Onde",
      valor: spectacle.venue || spectacle.city || "A confirmar",
      apoio: [spectacle.venue ? spectacle.city : null, spectacle.address]
        .filter(Boolean)
        .join(" — "),
    },
    ...(sessoes.length > 0
      ? []
      : [
          {
            rotulo: "Horário",
            valor: spectacle.start_time ? formatSpectacleTime(spectacle) : "A confirmar",
          },
        ]),
    { rotulo: "Duração", valor: ficha?.duracao ?? "A confirmar" },
    { rotulo: "Classificação", valor: spectacle.classification ?? "A confirmar" },
  ];

  return (
    <>
      {/* Cartaz: caminho de volta, título, imagem e a faixa com o essencial. */}
      <section data-surface="palco" className="palco pt-[4.5rem]">
        <div className="container-x pb-10 pt-10 md:pt-14">
          <nav aria-label="Caminho" className="eyebrow suave">
            <Link to="/programacao" className="link-traco">
              Programação
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span aria-current="page">{spectacle.title}</span>
          </nav>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {spectacle.subtitle && (
              <span className="eyebrow inline-flex items-center rounded-full bg-laranja px-3 py-1 text-tinta">
                {spectacle.subtitle}
              </span>
            )}
            {spectacle.date_label && <span className="eyebrow suave">{spectacle.date_label}</span>}
          </div>
          <h1 className="t-cartaz mt-5 max-w-[16ch]">{spectacle.title}</h1>
          {(ficha?.genero || local) && (
            <p className="t-lide suave mt-5">
              {[ficha?.genero, local].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>

        <div className="container-x">
          <Foto
            caminho={spectacle.image_path}
            nome={spectacle.image_path ? undefined : "romantico"}
            alt={spectacle.image_alt ?? undefined}
            enquadramento="21 / 9"
            sizes="(min-width: 1480px) 1400px, 100vw"
            prioridade
            imgClassName="acende"
            className="max-sm:aspect-[4/3]!"
          />
        </div>

        {/* O que a pessoa precisa para ir ao teatro, logo abaixo da imagem. */}
        <div className="container-x pb-[var(--cena-curta)]">
          <div className="grid gap-y-8 pt-10 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:gap-x-12">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
              {fatos.map((f) => {
                const pendente = f.valor === "A confirmar";
                return (
                  <div key={f.rotulo} className="fio border-t pt-4">
                    <dt className="eyebrow suave">{f.rotulo}</dt>
                    <dd
                      className={
                        pendente
                          ? "suave mt-2 italic"
                          : "mt-2 text-[1.0625rem] font-semibold leading-snug"
                      }
                    >
                      {f.valor}
                      {f.apoio && (
                        <span className="suave mt-0.5 block text-sm font-normal">{f.apoio}</span>
                      )}
                    </dd>
                  </div>
                );
              })}
              {sessoes.length > 0 && (
                <div className="fio col-span-2 border-t pt-4 sm:col-span-3 lg:col-span-5">
                  <dt className="eyebrow suave">
                    {sessoes.length === 1 ? "Sessão" : `${sessoes.length} sessões`}
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {sessoes.map(formatSessao).map((sessao) => (
                      <span
                        key={sessao}
                        className="fio rounded-md border px-3 py-1.5 text-[0.9375rem] font-semibold first-letter:uppercase"
                      >
                        {sessao}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>

            <div className="rounded-lg bg-[rgb(227_217_199/0.07)] p-6">
              <p className="eyebrow text-laranja">Ingressos</p>
              {/* A data de abertura da venda manda: antes dela, contagem — mesmo
                  que o link já esteja cadastrado. Depois, o botão. */}
              <div className="mt-4">
                {vendaFutura ? (
                  <Contagem
                    alvo={spectacle.ticket_sales_open_at}
                    rotulo="A venda abre em"
                    depois={<BotaoIngressos url={spectacle.ticket_url} />}
                  />
                ) : (
                  <BotaoIngressos url={spectacle.ticket_url} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A obra: sinopse e os créditos do balé original. */}
      {sinopse.length > 0 && (
        <section data-surface="papel" className="papel py-[var(--cena)]">
          <div className="container-x grid gap-y-10 md:grid-cols-12 md:gap-x-[var(--calha)]">
            <div className="md:col-span-4">
              <p className="eyebrow suave" data-reveal="rise">
                A obra
              </p>
              <h2 className="t-titulo mt-4" data-reveal="rise" style={atraso(60)}>
                Sinopse
              </h2>
              {(ficha?.obra || ficha?.genero) && (
                <dl className="mt-10 space-y-5" data-reveal="rise" style={atraso(120)}>
                  {[
                    ...(ficha?.genero ? [{ rotulo: "Gênero", valor: ficha.genero }] : []),
                    ...(ficha?.obra ?? []),
                  ].map((o) => (
                    <div key={o.rotulo} className="fio border-t pt-4">
                      <dt className="eyebrow suave">{o.rotulo}</dt>
                      <dd className="mt-1.5 text-lg font-semibold">{o.valor}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
            <div className="max-w-[62ch] space-y-6 md:col-span-8 md:pt-1">
              {sinopse.map((p, i) =>
                i === 0 ? (
                  <p
                    key={i}
                    className="font-display text-[clamp(1.4rem,1.1rem+1.1vw,2rem)] font-medium leading-[1.3]"
                    data-reveal="rise"
                  >
                    {p}
                  </p>
                ) : (
                  <p key={i} className="suave text-[1.0625rem] leading-relaxed" data-reveal="rise">
                    {p}
                  </p>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* A montagem: o texto do projeto e os números da produção. */}
      {spectacle.description && (
        <section data-surface="palco" className="palco py-[var(--cena)]">
          <div className="container-x grid gap-y-12 md:grid-cols-12 md:gap-x-[var(--calha)]">
            <div className="md:col-span-5">
              <p className="eyebrow suave" data-reveal="rise">
                A montagem
              </p>
              <p className="t-sub mt-5 leading-snug" data-reveal="rise" style={atraso(60)}>
                {spectacle.description}
              </p>
            </div>
            {ficha?.numeros && (
              <dl className="grid grid-cols-3 gap-5 self-end md:col-span-7">
                {ficha.numeros.map((n, i) => (
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
            )}
          </div>
        </section>
      )}

      {/* Ficha técnica: a remontadora em destaque, depois direção e equipe. */}
      {temFicha && (
        <section data-surface="papel" className="papel py-[var(--cena)]">
          <div className="container-x">
            <p className="eyebrow suave" data-reveal="rise">
              Ficha técnica
            </p>
            <h2 className="t-titulo mt-4" data-reveal="rise" style={atraso(60)}>
              Quem faz <span className="gesto">o espetáculo.</span>
            </h2>

            {time.destaques.map((p) => (
              <Destaque key={p.nome} pessoa={p} />
            ))}

            {time.direcao.length > 0 && (
              <ul className="mt-5 grid items-start gap-5 md:grid-cols-2">
                {time.direcao.map((p, i) => (
                  <li key={p.nome} data-reveal="rise" style={atraso(i * 80)}>
                    <CartaoPessoa pessoa={p} />
                  </li>
                ))}
              </ul>
            )}

            {time.equipe.length > 0 && (
              <>
                <h3 className="eyebrow suave mt-16">Produção e equipe</h3>
                <ul className="mt-4 grid gap-x-10 md:grid-cols-2">
                  {time.equipe.map((p) => (
                    <li key={p.nome} className="fio border-t py-6">
                      <div className="flex items-start gap-4">
                        {p.foto ? (
                          <img
                            src={p.foto}
                            alt=""
                            loading="lazy"
                            className="h-16 w-16 shrink-0 rounded-full object-cover grayscale"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[rgb(31_30_28/0.08)] font-display text-lg"
                          >
                            {iniciais(p.nome)}
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="eyebrow text-[#8f3412]">{p.funcao}</p>
                          <p className="mt-1 text-lg font-semibold leading-tight">{p.nome}</p>
                          {p.resumo && (
                            <p className="suave mt-2 text-[0.9375rem] leading-relaxed">
                              {p.resumo}
                            </p>
                          )}
                          <Curriculo pessoa={p} />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {temElenco && (
              <>
                <h3 className="eyebrow suave mt-16">Elenco</h3>
                <ul className="mt-5 grid grid-cols-2 items-start gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
                  {[
                    ...time.convidados.map((pessoa) => ({ pessoa, convidado: true })),
                    ...time.elenco.map((pessoa) => ({ pessoa, convidado: false })),
                  ].map(({ pessoa, convidado }, i) => (
                    <li key={pessoa.nome} data-reveal="rise" style={atraso((i % 5) * 60)}>
                      <Bailarino pessoa={pessoa} convidado={convidado} />
                    </li>
                  ))}
                </ul>
              </>
            )}

            {!temElenco && (
              <div className="fio mt-12 flex flex-col gap-4 rounded-lg border border-dashed p-7 md:flex-row md:items-center md:justify-between md:p-8">
                <div>
                  <p className="font-semibold">Elenco em formação</p>
                  <p className="suave mt-1.5 max-w-[60ch] leading-relaxed">
                    O elenco será formado por bailarinos profissionais selecionados por audição
                    pública e por convidados de renome internacional. Os nomes serão publicados aqui
                    após a seleção.
                  </p>
                </div>
                {spectacle.audition_enabled && (
                  <a href="#audicao" className="link-traco shrink-0 font-semibold">
                    Sobre a audição ↓
                  </a>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Contrapartida social: a única cena laranja da página. */}
      {ficha?.projetos?.map((projeto) => (
        <section
          key={projeto.titulo}
          data-surface="papel"
          className="cena-laranja py-[var(--cena-curta)]"
        >
          <div className="container-x grid gap-y-8 md:grid-cols-12 md:items-end md:gap-x-[var(--calha)]">
            <div className="md:col-span-8">
              <p className="eyebrow suave">{projeto.titulo}</p>
              <p className="t-titulo mt-4 max-w-[20ch]">{projeto.texto}</p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                to="/escolas"
                className="chamada"
                style={
                  {
                    "--chamada-fundo": "var(--saba-tinta)",
                    "--chamada-texto": "var(--saba-papel)",
                  } as CSSProperties
                }
              >
                Cadastrar uma escola <span className="seta">→</span>
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* Audição (só quando o espetáculo tem) e os selos da Lei Rouanet. */}
      {(spectacle.audition_enabled || ficha?.pronac) && (
        <section
          id="audicao"
          data-surface="palco"
          className="palco scroll-mt-20 py-[var(--cena-curta)]"
        >
          <div className="container-x">
            {spectacle.audition_enabled && (
              <div className="grid gap-8 rounded-lg bg-[rgb(227_217_199/0.07)] p-7 md:grid-cols-[1.3fr_1fr] md:items-center md:p-10">
                <div>
                  <p className="eyebrow text-laranja">Audição</p>
                  <p className="t-sub mt-3">Quer fazer parte do elenco?</p>
                  <p className="suave mt-2 max-w-[48ch] leading-relaxed">
                    A seleção será feita por audição pública. As inscrições só abrem na data
                    divulgada — até lá, você pode entrar no banco de talentos.
                  </p>
                </div>
                <div className="md:justify-self-end">
                  {spectacle.audition_opens_at ? (
                    <Contagem
                      alvo={spectacle.audition_opens_at}
                      rotulo="As inscrições abrem em"
                      depois={<p className="eyebrow text-laranja">Inscrições abertas</p>}
                    />
                  ) : (
                    <p className="suave">Data de abertura das inscrições a definir.</p>
                  )}
                  <div className="mt-6">
                    {/* Inscrição só com a audição aberta; antes, o banco de talentos. */}
                    {audicaoAberta ? (
                      <Link
                        to="/audicoes"
                        search={{ espetaculo: spectacle.slug }}
                        hash="inscricao"
                        className="chamada chamada--cheia"
                      >
                        Inscrever-se na audição <span className="seta">→</span>
                      </Link>
                    ) : (
                      <Link
                        to="/audicoes"
                        search={{ espetaculo: "banco" }}
                        hash="inscricao"
                        className="link-traco font-semibold"
                      >
                        Entrar no banco de talentos →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            {ficha?.pronac && (
              <div
                className={
                  spectacle.audition_enabled
                    ? "fio mt-12 flex flex-col gap-6 border-t pt-8 md:flex-row md:items-center md:justify-between"
                    : "flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
                }
              >
                <p className="suave text-sm">
                  Projeto aprovado pela Lei Federal de Incentivo à Cultura — PRONAC {ficha.pronac}.
                </p>
                <div className="flex items-center gap-8">
                  <img
                    src="/images/minc.webp"
                    alt="Ministério da Cultura — Governo Federal"
                    className="h-9 w-auto md:h-10"
                    loading="lazy"
                  />
                  <img
                    src="/images/lei-rouanet.webp"
                    alt="Lei Rouanet — Incentivo a Projetos Culturais"
                    className="h-9 w-auto md:h-10"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

function BotaoIngressos({ url }: { url: string | null }) {
  if (!url) {
    return (
      <p className="rounded-lg bg-[rgb(227_217_199/0.1)] px-4 py-3 text-center text-[0.9375rem] font-medium">
        Venda de ingressos em breve
      </p>
    );
  }
  return (
    <a href={url} target="_blank" rel="noreferrer" className="chamada chamada--cheia w-full">
      Comprar ingressos <span className="seta">↗</span>
    </a>
  );
}

/** A pessoa em destaque na ficha (a remontadora, por decisão da contratante). */
function Destaque({ pessoa: p }: { pessoa: Pessoa }) {
  return (
    <article
      className="palco mt-12 grid gap-8 rounded-lg p-7 sm:grid-cols-[11rem_1fr] md:grid-cols-[13rem_1fr] md:gap-12 md:p-10"
      data-surface="palco"
      data-reveal="rise"
    >
      <div className="aspect-[4/5] w-40 self-start overflow-hidden rounded-md bg-[rgb(227_217_199/0.08)] sm:w-full">
        {p.foto && (
          <img
            src={p.foto}
            alt={p.alt ?? `Retrato de ${p.nome}`}
            loading="lazy"
            className="h-full w-full object-cover grayscale"
          />
        )}
      </div>
      <div className="min-w-0 self-center">
        <p className="eyebrow text-laranja">{p.funcao}</p>
        <h3 className="t-titulo mt-3">{p.nome}</h3>
        {p.resumo && <p className="t-lide suave mt-4 max-w-[52ch]">{p.resumo}</p>}
        <Curriculo pessoa={p} />
      </div>
    </article>
  );
}

function CartaoPessoa({ pessoa: p }: { pessoa: Pessoa }) {
  return (
    <article className="fio flex items-start gap-5 rounded-lg border bg-[#efe7d8] p-6 md:p-7">
      <div className="aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-md bg-[rgb(31_30_28/0.08)] md:w-28">
        {p.foto && (
          <img
            src={p.foto}
            alt={p.alt ?? `Retrato de ${p.nome}`}
            loading="lazy"
            className="h-full w-full object-cover grayscale"
          />
        )}
      </div>
      <div className="min-w-0">
        {/* Laranja escurecido para passar em contraste sobre o papel. */}
        <p className="eyebrow text-[#8f3412]">{p.funcao}</p>
        <h3 className="mt-1.5 text-xl font-semibold leading-tight">{p.nome}</h3>
        {p.resumo && <p className="suave mt-2 text-[0.9375rem] leading-relaxed">{p.resumo}</p>}
        <Curriculo pessoa={p} />
      </div>
    </article>
  );
}

/** Bailarino do elenco: retrato, nome e personagem. */
function Bailarino({ pessoa: p, convidado }: { pessoa: Pessoa; convidado: boolean }) {
  return (
    <article>
      <div className="aspect-[4/5] overflow-hidden rounded-md bg-[rgb(31_30_28/0.08)]">
        {p.foto ? (
          <img
            src={p.foto}
            alt={p.alt ?? `Retrato de ${p.nome}`}
            loading="lazy"
            className="h-full w-full object-cover grayscale"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid h-full w-full place-items-center font-display text-3xl text-tinta-suave"
          >
            {iniciais(p.nome)}
          </span>
        )}
      </div>
      {convidado && (
        <span className="mt-3 inline-block rounded-full bg-laranja px-2.5 py-0.5 text-xs font-bold text-tinta">
          Convidado
        </span>
      )}
      <h4 className={`${convidado ? "mt-2" : "mt-3"} font-semibold leading-tight`}>{p.nome}</h4>
      <p className="suave mt-0.5 text-sm">{p.funcao}</p>
      {p.resumo && <p className="suave mt-2 text-sm leading-relaxed">{p.resumo}</p>}
      <Curriculo pessoa={p} />
    </article>
  );
}

/** Converte as pessoas do painel no formato usado pela ficha técnica. */
function agruparPessoas(lista: SpectaclePerson[]) {
  const paraPessoa = (p: SpectaclePerson): Pessoa => ({
    nome: p.name,
    funcao: p.role,
    resumo: p.summary ?? "",
    curriculo: p.bio
      ? p.bio
          .split(/\n\s*\n/)
          .map((t) => t.trim())
          .filter(Boolean)
      : undefined,
    foto: siteAssetUrl(p.photo_path) ?? undefined,
    alt: p.photo_alt ?? undefined,
  });
  const da = (categoria: SpectaclePerson["category"]) =>
    lista.filter((p) => !p.featured && p.category === categoria).map(paraPessoa);
  return {
    destaques: lista.filter((p) => p.featured).map(paraPessoa),
    direcao: da("direcao"),
    equipe: da("equipe"),
    elenco: da("elenco"),
    convidados: da("convidado"),
  };
}

function Curriculo({ pessoa }: { pessoa: Pessoa }) {
  if (!pessoa.curriculo?.length) return null;
  return (
    <details className="curriculo mt-2">
      <summary className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold">
        Saiba mais{" "}
        <span className="sinal text-lg leading-none" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="space-y-3 pb-2">
        {pessoa.curriculo.map((p, i) => (
          <p key={i} className="suave text-[0.9375rem] leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </details>
  );
}

function iniciais(nome: string) {
  return nome
    .split(" ")
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}
