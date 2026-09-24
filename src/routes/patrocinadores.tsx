import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { Abertura } from "@/components/site/Abertura";
import {
  fetchActiveSponsors,
  siteAssetUrl,
  SPONSOR_TYPE_LABELS,
  SPONSOR_TYPE_ORDER,
} from "@/lib/site-content";
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
              <p className="eyebrow suave">{SPONSOR_TYPE_LABELS[grupo.tipo]}</p>
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
              Associe sua empresa a uma produção de grande porte e à formação de novos talentos —
              com dedução no imposto de renda pela Lei Rouanet.
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

function CreditoMaster({ patrocinador: s }: { patrocinador: Sponsor }) {
  return (
    <article className="max-w-4xl">
      <p className="eyebrow suave" data-reveal="rise">
        {SPONSOR_TYPE_LABELS[s.sponsor_type]}
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
