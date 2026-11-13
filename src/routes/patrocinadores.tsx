import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { Abertura } from "@/components/site/Abertura";
import { Foto, FotoMoldurada } from "@/components/site/Foto";
import {
  fetchActiveSponsors,
  rotuloPublico,
  siteAssetUrl,
  SPONSOR_TYPE_ORDER,
} from "@/lib/site-content";
import type { NomeImagem } from "@/lib/imagens";
import type { Sponsor } from "@/lib/database.types";

export const Route = createFileRoute("/patrocinadores")({
  head: () => ({
    meta: [
      { title: "Patrocinadores — Instituto Cultural Saba" },
      {
        name: "description",
        content: "Conheça as empresas e pessoas que apoiam o Instituto Cultural Saba.",
      },
    ],
  }),
  loader: async () => ({ sponsors: await fetchActiveSponsors() }),
  component: Patrocinadores,
});

const atraso = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

function Patrocinadores() {
  const { sponsors } = Route.useLoaderData();
  const masters = sponsors.filter((s) => s.sponsor_type === "master");
  const demais = SPONSOR_TYPE_ORDER.filter((t) => t !== "master")
    .map((tipo) => ({ tipo, lista: sponsors.filter((s) => s.sponsor_type === tipo) }))
    .filter((g) => g.lista.length > 0);

  return (
    <>
      <Abertura
        eyebrow="Patrocinadores"
        linhas={[
          "Quem faz",
          <span key="g" className="gesto gesto--luz">
            acontecer.
          </span>,
        ]}
        lide="Empresas e pessoas que escolhem investir na dança, na cultura e nas oportunidades para jovens artistas."
      />

      {/* Os créditos, como no verso de um programa. */}
      <section data-surface="papel" className="papel py-[var(--cena)]">
        <div className="container-x">
          {masters.map((s) => (
            <CreditoMaster key={s.id} patrocinador={s} />
          ))}

          {demais.map((grupo) => (
            <div key={grupo.tipo} className="mt-[var(--cena-curta)]">
              <p className="eyebrow suave">{rotuloPublico(grupo.tipo)}</p>
              <ul className="mt-4 grid gap-x-[var(--calha)] sm:grid-cols-2 lg:grid-cols-3">
                {grupo.lista.map((s, i) => (
                  <li
                    key={s.id}
                    className="fio border-t py-7"
                    data-reveal="rise"
                    style={atraso(i * 60)}
                  >
                    <Logo patrocinador={s} altura="h-10" />
                    <p className="mt-4 text-2xl font-semibold leading-tight">{s.name}</p>
                    {s.description && (
                      <p className="suave mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed">
                        {s.description}
                      </p>
                    )}
                    {s.website_url && (
                      <a
                        href={s.website_url}
                        target="_blank"
                        rel="noreferrer"
                        className="link-traco font-semibold mt-4 inline-block"
                      >
                        Visitar site ↗
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {sponsors.length === 0 && (
            <p className="t-lide suave max-w-[30ch]">
              Os patrocinadores da temporada serão apresentados aqui.
            </p>
          )}
        </div>
      </section>

      <section data-surface="papel" className="cena-laranja py-[var(--cena)]">
        <div className="container-x grid gap-y-10 md:grid-cols-12 md:items-end md:gap-x-[var(--calha)]">
          <h2 className="t-titulo md:col-span-7" data-reveal="rise">
            Sua marca <span className="gesto">pode estar aqui.</span>
          </h2>
          <div className="md:col-span-5" data-reveal="rise" style={atraso(100)}>
            <p className="text-[1.0625rem] leading-relaxed">
              Associe a sua empresa a uma produção de grande porte e à valorização da cultura
              nacional, a partir da destinação de imposto de renda.
            </p>
            <Link
              to="/patrocinio"
              className="chamada mt-8"
              style={
                {
                  "--chamada-fundo": "var(--saba-tinta)",
                  "--chamada-texto": "var(--saba-papel)",
                } as CSSProperties
              }
            >
              Seja patrocinador <span className="seta">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Texto e fotos de apresentação de um patrocinador em destaque, escritos
 * pelo Instituto. Ficam no código, e não no painel, porque cada um é uma
 * página editorial própria; logo, descrição e site continuam vindo do
 * painel. A chave é o identificador (slug) do patrocinador.
 */
interface Homenagem {
  titulo: ReactNode;
  /** Primeiro parágrafo, ao lado do título. */
  abertura: string;
  paragrafos: string[];
  /** Parágrafo em destaque: a primeira frase em letra grande. */
  destaque: [string, string];
  fecho: string;
  /** Última frase, em letra maior. */
  agradecimento: string;
  /** Foto larga, logo abaixo do título. */
  panorama: NomeImagem;
  retrato: NomeImagem;
  galeria: NomeImagem[];
}

const HOMENAGENS: Record<string, Homenagem> = {
  // Texto enviado pela Marina em 13/11/2026.
  "maquinas-bolbi-ltda": {
    titulo: (
      <>
        Elevando a dança, <span className="gesto">transformando talentos.</span>
      </>
    ),
    abertura:
      "É com imensa satisfação e orgulho que apresentamos a Bolbi como nossa primeira parceira e patrocinadora, uma empresa que acreditou no potencial deste projeto e na força transformadora da cultura desde o início de sua trajetória.",
    paragrafos: [
      "Mais do que apoiar um espetáculo, a Bolbi acredita na dança como instrumento de expressão, formação e transformação. Sua parceria representa um passo fundamental para a realização deste projeto, contribuindo para que a arte alcance novos públicos, inspire talentos e fortaleça a produção cultural.",
    ],
    destaque: [
      "Acreditar na cultura é acreditar nas pessoas, nas oportunidades e na capacidade da arte de transformar realidades.",
      "Por isso, ter a Bolbi ao nosso lado neste primeiro momento é motivo de enorme gratidão e entusiasmo.",
    ],
    fecho:
      "Esta parceria marca o início de uma jornada construída a partir de um propósito comum: valorizar a dança, impulsionar talentos e ampliar o acesso à cultura.",
    agradecimento:
      "Nosso agradecimento à Bolbi por acreditar na arte e fazer parte desta história desde o começo.",
    panorama: "bolbiGuindaste",
    retrato: "bolbiEncontro",
    galeria: ["bolbiGancho", "bolbiConteineres", "bolbiCaminhao"],
  },
};

function CreditoMaster({ patrocinador: s }: { patrocinador: Sponsor }) {
  const homenagem = HOMENAGENS[s.slug];
  if (homenagem) return <Apresentacao patrocinador={s} homenagem={homenagem} />;

  return (
    <article className="max-w-4xl">
      <p className="eyebrow suave" data-reveal="rise">
        {rotuloPublico(s.sponsor_type)}
      </p>
      <div className="mt-5">
        <Logo patrocinador={s} altura="h-20 md:h-24" />
        <h2 className="t-titulo mt-6" data-reveal="rise">
          {s.name}
        </h2>
        {s.description && (
          <p className="t-lide suave mt-8 max-w-[40ch]" data-reveal="rise" style={atraso(80)}>
            {s.description}
          </p>
        )}
        {s.website_url && (
          <a
            href={s.website_url}
            target="_blank"
            rel="noreferrer"
            className="link-traco font-semibold mt-8 inline-block"
          >
            Visitar site ↗
          </a>
        )}
      </div>
    </article>
  );
}

function Apresentacao({
  patrocinador: s,
  homenagem: h,
}: {
  patrocinador: Sponsor;
  homenagem: Homenagem;
}) {
  return (
    <article>
      <div className="grid gap-y-8 md:grid-cols-12 md:items-end md:gap-x-[var(--calha)]">
        <div className="md:col-span-7">
          <p className="eyebrow suave" data-reveal="rise">
            {rotuloPublico(s.sponsor_type)}
          </p>
          <div className="mt-5" data-reveal="rise" style={atraso(40)}>
            <Logo patrocinador={s} altura="h-16 md:h-20" />
          </div>
          <h2 className="t-titulo mt-7" data-reveal="rise" style={atraso(80)}>
            <span className="sr-only">{s.name}: </span>
            {h.titulo}
          </h2>
        </div>
        <p
          className="t-lide suave md:col-span-5 md:col-start-8"
          data-reveal="rise"
          style={atraso(140)}
        >
          {h.abertura}
        </p>
      </div>

      <Foto
        nome={h.panorama}
        enquadramento="16 / 9"
        foco="40% 45%"
        sizes="(min-width: 1280px) 1200px, 100vw"
        className="mt-[var(--cena-curta)] rounded-foto"
        cortina
      />

      <div className="mt-[var(--cena-curta)] grid gap-y-14 md:grid-cols-12 md:gap-x-[var(--calha)]">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <FotoMoldurada
              nome={h.retrato}
              enquadramento="3 / 4"
              foco="50% 35%"
              sizes="(min-width: 768px) 40vw, 100vw"
              cortina
            />
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {h.paragrafos.map((texto, i) => (
            <p
              key={i}
              className={`max-w-[62ch] text-[1.0625rem] leading-relaxed ${i > 0 ? "mt-5" : ""}`}
              data-reveal="rise"
            >
              {texto}
            </p>
          ))}

          <figure
            className="palco mt-10 rounded-cartao p-7 md:p-9"
            data-surface="palco"
            data-reveal="rise"
          >
            <blockquote>
              <p className="font-display text-[clamp(1.4rem,1.1rem+1vw,1.9rem)] font-semibold leading-snug">
                <span aria-hidden="true" className="text-laranja">
                  “
                </span>
                {h.destaque[0]}
                <span aria-hidden="true" className="text-laranja">
                  ”
                </span>
              </p>
              <p className="suave mt-5 leading-relaxed">{h.destaque[1]}</p>
            </blockquote>
          </figure>

          <p className="mt-10 max-w-[62ch] text-[1.0625rem] leading-relaxed" data-reveal="rise">
            {h.fecho}
          </p>
          <p
            className="mt-5 max-w-[40ch] font-display text-xl font-semibold leading-snug"
            data-reveal="rise"
          >
            {h.agradecimento}
          </p>

          {(s.description || s.website_url) && (
            <div
              className="fio mt-12 rounded-cartao border bg-[#efe7d8] p-6 md:p-7"
              data-reveal="rise"
            >
              <p className="eyebrow suave">Sobre a empresa</p>
              {s.description && <p className="mt-3 leading-relaxed">{s.description}</p>}
              {s.website_url && (
                <a
                  href={s.website_url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-traco font-semibold mt-5 inline-block"
                >
                  Visitar site ↗
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <ul className="mt-[var(--cena-curta)] grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {h.galeria.map((foto, i) => (
          <li key={foto} className={i === 0 ? "col-span-2 md:col-span-1" : undefined}>
            <Foto
              nome={foto}
              enquadramento="4 / 5"
              sizes="(min-width: 768px) 33vw, 50vw"
              className="rounded-foto"
              cortina
              atraso={i * 90}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}

function Logo({ patrocinador: s, altura }: { patrocinador: Sponsor; altura: string }) {
  const url = siteAssetUrl(s.logo_path);
  if (!url) return null;
  return (
    <img
      src={url}
      alt={s.logo_alt || s.name}
      loading="lazy"
      className={`${altura} w-auto max-w-[18rem] object-contain object-left`}
    />
  );
}
