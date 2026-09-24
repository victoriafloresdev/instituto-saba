import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { Foto } from "@/components/site/Foto";
import { ProgramaLista } from "@/components/site/ProgramaLista";
import { IMAGENS, srcset } from "@/lib/imagens";
import { fetchActiveSponsors, fetchPublishedSpectacles, siteAssetUrl } from "@/lib/site-content";
import type { Spectacle, Sponsor } from "@/lib/database.types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Instituto Cultural Saba — O futuro da dança começa aqui" },
      {
        name: "description",
        content:
          "Instituto Cultural Saba: formação, visibilidade e oportunidades para jovens talentos da dança brasileira. Temporada 2027 em Belo Horizonte.",
      },
    ],
  }),
  loader: async () => {
    const [espetaculos, patrocinadores] = await Promise.all([
      fetchPublishedSpectacles(),
      fetchActiveSponsors(),
    ]);
    return { espetaculos, patrocinadores };
  },
  component: Home,
});

const atraso = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

function Home() {
  const { espetaculos, patrocinadores } = Route.useLoaderData();

  return (
    <>
      <AberturaHome espetaculos={espetaculos} />
      <FaixaPatrocinio patrocinadores={patrocinadores} />

      {/* 01 — O Instituto */}
      <section data-surface="papel" className="papel py-[var(--cena)]">
        <div className="container-x">
          <p className="eyebrow suave flex gap-2.5" data-reveal="rise">
            <span className="numeral">01</span>
            <span aria-hidden="true">·</span>
            <span>O Instituto</span>
          </p>
          <h2 className="t-titulo mt-4 max-w-[22ch]" data-reveal="rise" style={atraso(60)}>
            Um palco para o <span className="gesto">talento brasileiro.</span>
          </h2>
          <p className="t-lide suave mt-5 max-w-[60ch]" data-reveal="rise" style={atraso(120)}>
            Idealizado pela bailarina Marina Saba, o Instituto nasceu para fortalecer a dança no
            Brasil e revelar jovens talentos do país para o mundo.
          </p>

          <h3 className="eyebrow suave mt-[var(--cena-curta)]" data-reveal="rise">
            O que fazemos
          </h3>
          <ul className="mt-5 grid gap-5 md:grid-cols-3">
            {FAZEMOS.map((item, i) => (
              <li
                key={item.titulo}
                className={`flex flex-col rounded-lg p-7 md:p-8 ${
                  i === 0 ? "palco" : "fio border bg-[#efe7d8]"
                }`}
                data-reveal="rise"
                style={atraso(i * 90)}
              >
                <span className={`numeral text-3xl leading-none ${i === 0 ? "text-laranja" : ""}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="t-sub mt-5">{item.titulo}</h4>
                <p className="suave mt-3 leading-relaxed">{item.texto}</p>
              </li>
            ))}
          </ul>

          {/* A idealizadora: retrato e a frase dela, no mesmo cartão. */}
          <figure
            className="palco mt-5 grid overflow-hidden rounded-lg md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
            data-surface="palco"
            data-reveal="rise"
          >
            <Foto
              nome="marinaSentada"
              enquadramento="4 / 5"
              foco="50% 30%"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="max-md:aspect-[4/3]!"
            />
            <div className="flex flex-col justify-center p-7 md:p-12">
              <blockquote className="font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.4rem)] font-medium italic leading-[1.2]">
                <span aria-hidden="true" className="text-laranja">
                  “
                </span>
                É preciso dar visibilidade e coragem aos jovens para a dança continuar transformando
                vidas.
                <span aria-hidden="true" className="text-laranja">
                  ”
                </span>
              </blockquote>
              <figcaption className="mt-8">
                <span className="eyebrow suave block">Marina Saba · idealizadora</span>
                <Link to="/sobre" className="link-traco mt-5 inline-block font-semibold">
                  Conheça o Instituto →
                </Link>
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      {/* 02 — Temporada */}
      <section data-surface="palco" className="palco">
        {/* Pausa: só a imagem, como o respiro entre dois movimentos. */}
        <Foto
          nome="tutus"
          enquadramento="21 / 9"
          sizes="100vw"
          cortina
          className="min-h-[46vh] w-full"
        />

        <div className="container-x py-[var(--cena)]">
          <header className="mb-10 md:mb-14">
            <p className="eyebrow suave flex gap-2.5" data-reveal="rise">
              <span className="numeral">02</span>
              <span aria-hidden="true">·</span>
              <span>Temporada</span>
            </p>
            <h2 className="t-titulo mt-4" data-reveal="rise" style={atraso(80)}>
              Próximos <span className="gesto gesto--luz">espetáculos.</span>
            </h2>
          </header>

          {espetaculos.length > 0 ? (
            <ProgramaLista espetaculos={espetaculos} />
          ) : (
            <p className="suave t-lide">A programação da temporada será divulgada em breve.</p>
          )}

          <Link to="/programacao" className="link-traco mt-10 inline-block font-semibold">
            Programação completa →
          </Link>
        </div>
      </section>

      {/* 03 — Participe */}
      <section data-surface="papel" className="papel py-[var(--cena)]">
        <div className="container-x">
          <p className="eyebrow suave flex gap-2.5" data-reveal="rise">
            <span className="numeral">03</span>
            <span aria-hidden="true">·</span>
            <span>Participe</span>
          </p>
          <h2 className="t-titulo mt-4" data-reveal="rise" style={atraso(60)}>
            Há um lugar <span className="gesto">em cena</span> para você.
          </h2>
          <p className="t-lide suave mt-5 max-w-[60ch]" data-reveal="rise" style={atraso(120)}>
            Bailarinos, escolas, empresas e pessoas: cada um tem um jeito de fazer parte da
            temporada.
          </p>

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {PARTICIPE.map((item, i) => (
              <li
                key={item.to}
                className="fio flex flex-col rounded-lg border bg-[#efe7d8] p-7 md:p-8"
                data-reveal="rise"
                style={atraso(i * 90)}
              >
                <p className="eyebrow suave">{item.publico}</p>
                <h3 className="t-sub mt-3">{item.titulo}</h3>
                <p className="suave mt-3 leading-relaxed">{item.texto}</p>
                <div className="mt-auto pt-8">
                  <Link to={item.to} className="chamada chamada--cheia">
                    {item.acao} <span className="seta">→</span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* A única cena laranja: ecoa a capa do material do Instituto. */}
      <section data-surface="papel" className="cena-laranja py-[var(--cena)]">
        <div className="container-x grid gap-y-12 md:grid-cols-12 md:gap-x-[var(--calha)]">
          <h2 className="t-cartaz md:col-span-8" data-reveal="rise">
            A arte <br />
            agradece <br />
            <span className="gesto">o seu patrocínio.</span>
          </h2>
          <div className="flex flex-col justify-end md:col-span-4">
            <p className="text-[1.0625rem] leading-relaxed" data-reveal="rise" style={atraso(120)}>
              O Ballet Dom Quixote é aprovado pela Lei Federal de Incentivo à Cultura (PRONAC
              255925). Empresas no lucro real podem destinar até 4% do imposto de renda devido;
              pessoas físicas, até 6%.
            </p>
            <div className="mt-9" data-reveal="rise" style={atraso(200)}>
              <Link
                to="/patrocinio"
                className="chamada"
                style={
                  {
                    "--chamada-fundo": "var(--saba-tinta)",
                    "--chamada-texto": "var(--saba-papel)",
                  } as CSSProperties
                }
              >
                Quero patrocinar <span className="seta">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const FAZEMOS = [
  {
    titulo: "Grandes produções",
    texto:
      "Montagens de balés de repertório em Belo Horizonte, viabilizadas pelas leis de incentivo à cultura.",
  },
  {
    titulo: "Oportunidade para jovens",
    texto:
      "Elenco selecionado por audição pública, dividindo o palco com convidados de renome internacional.",
  },
  {
    titulo: "Acesso à cultura",
    texto: "Um espetáculo exclusivo para crianças de escolas públicas, com transporte e lanche.",
  },
];

/**
 * Faixa logo abaixo da abertura: quem torna a temporada possível aparece
 * antes de qualquer outro conteúdo. Lê os patrocinadores ativos do painel.
 */
function FaixaPatrocinio({ patrocinadores }: { patrocinadores: Sponsor[] }) {
  if (patrocinadores.length === 0) return null;
  const soMaster = patrocinadores.every((p) => p.sponsor_type === "master");

  return (
    <section data-surface="papel" aria-label="Patrocinadores" className="papel fio border-b">
      <div className="container-x flex flex-col gap-6 py-8 md:flex-row md:items-center md:gap-12 md:py-10">
        <p className="eyebrow suave shrink-0">
          {soMaster ? "Patrocínio master" : "Patrocinadores"}
        </p>
        <ul className="flex flex-wrap items-center gap-x-12 gap-y-6">
          {patrocinadores.map((p) => {
            const logo = siteAssetUrl(p.logo_path);
            return (
              <li key={p.id}>
                <Link to="/patrocinadores" className="block transition-opacity hover:opacity-75">
                  {logo ? (
                    <img
                      src={logo}
                      alt={p.logo_alt || p.name}
                      className="h-12 w-auto max-w-[12rem] object-contain md:h-14"
                    />
                  ) : (
                    <span className="text-xl font-semibold">{p.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link to="/patrocinio" className="link-traco font-semibold md:ml-auto">
          Seja um patrocinador →
        </Link>
      </div>
    </section>
  );
}

const PARTICIPE = [
  {
    to: "/audicoes",
    publico: "Para bailarinos",
    titulo: "Audições",
    texto:
      "O elenco do Ballet Dom Quixote será formado por bailarinos profissionais selecionados por audição pública.",
    acao: "Ver audições",
  },
  {
    to: "/escolas",
    publico: "Para escolas públicas",
    titulo: "Contrapartida social",
    texto: "Um espetáculo exclusivo para crianças de escolas públicas, com transporte e lanche.",
    acao: "Cadastrar escola",
  },
  {
    to: "/patrocinio",
    publico: "Para empresas e pessoas",
    titulo: "Patrocínio",
    texto:
      "Pela Lei Rouanet, parte do imposto de renda devido vira apoio direto à dança brasileira.",
    acao: "Como patrocinar",
  },
] as const;

/**
 * Primeira dobra. A foto acende como luz de palco; o traço da marca é
 * desenhado por uma varredura circular. No celular, a composição troca
 * de foto — uma bailarina na vertical — em vez de espremer a horizontal.
 */
function AberturaHome({ espetaculos }: { espetaculos: Spectacle[] }) {
  const destaques = espetaculos.slice(0, 2);
  const horizontal = IMAGENS.arabesque;
  const vertical = IMAGENS.pointe;

  return (
    <section
      data-surface="palco"
      className="palco relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <picture className="absolute inset-0 -z-10">
        <source media="(max-width: 767px)" srcSet={srcset(vertical)} sizes="100vw" />
        <img
          src={`/images/${horizontal.nome}-1400.webp`}
          srcSet={srcset(horizontal)}
          sizes="100vw"
          alt={horizontal.alt}
          fetchPriority="high"
          decoding="sync"
          className="acende h-full w-full object-cover object-[50%_35%]"
        />
      </picture>

      {/* No celular o título cai sobre o corpo da bailarina: a base escurece
          para o texto continuar legível. No desktop a foto já é escura ali. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[62%] bg-gradient-to-t from-palco via-palco/80 to-transparent md:hidden"
      />
      <span
        aria-hidden="true"
        className="traco traco--desenho pointer-events-none absolute mix-blend-lighten -right-[46vw] top-[3vh] -z-10 w-[96vw] text-laranja md:-right-[27vw] md:top-1/2 md:w-[min(84vw,104vh)] md:-translate-y-1/2"
      />

      <div className="container-x mt-auto pb-10 pt-32 md:pb-14">
        <p className="eyebrow suave abre">
          <span>Instituto Cultural Saba — Belo Horizonte</span>
        </p>
        <h1 className="t-cartaz abre mt-5 max-w-[12ch]">
          <span style={{ "--i": 1 } as CSSProperties}>O futuro</span>
          <span style={{ "--i": 2 } as CSSProperties}>da dança</span>
          <span style={{ "--i": 3 } as CSSProperties} className="gesto gesto--luz">
            começa aqui.
          </span>
        </h1>

        {destaques.length > 0 && (
          <div className="abre mt-12">
            <Link
              to="/programacao"
              style={{ "--i": 5 } as CSSProperties}
              className="fio group flex flex-col gap-2 border-t pt-5 text-[0.9375rem] sm:flex-row sm:items-baseline sm:gap-6"
            >
              <span className="eyebrow">Em breve</span>
              <span className="suave">
                {destaques.map((e, i) => (
                  <span key={e.id}>
                    {i > 0 && " · "}
                    {e.title}
                    {e.date_label && <span className="italic"> — {e.date_label}</span>}
                  </span>
                ))}
              </span>
              <span className="eyebrow sm:ml-auto">
                Ver programação{" "}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
