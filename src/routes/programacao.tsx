import { createFileRoute, Link } from "@tanstack/react-router";
import { Abertura } from "@/components/site/Abertura";
import { ProgramaLista } from "@/components/site/ProgramaLista";
import { fetchPublishedSpectacles } from "@/lib/site-content";

export const Route = createFileRoute("/programacao")({
  head: () => ({
    meta: [
      { title: "Programação — Instituto Cultural Saba" },
      {
        name: "description",
        content: "Datas, horários e locais dos espetáculos do Instituto Cultural Saba.",
      },
      { property: "og:title", content: "Programação — Instituto Cultural Saba" },
    ],
  }),
  loader: async () => ({ spectacles: await fetchPublishedSpectacles() }),
  component: Programacao,
});

function Programacao() {
  const { spectacles } = Route.useLoaderData();

  return (
    <>
      <Abertura
        eyebrow="Programação"
        linhas={[
          "A temporada",
          <span key="g" className="gesto gesto--luz">
            em cena.
          </span>,
        ]}
        lide="Espetáculos do repertório clássico em Belo Horizonte. Datas, horários e ingressos são publicados aqui assim que confirmados."
      />

      <section data-surface="palco" className="palco pb-[var(--cena)]">
        <div className="container-x">
          {spectacles.length === 0 ? (
            <div className="fio border-t py-16">
              <p className="t-sub max-w-[20ch]">A programação será divulgada em breve.</p>
              <Link to="/contato" className="link-traco font-semibold mt-8 inline-block">
                Fale com o Instituto →
              </Link>
            </div>
          ) : (
            <ProgramaLista espetaculos={spectacles} />
          )}
        </div>
      </section>
    </>
  );
}
