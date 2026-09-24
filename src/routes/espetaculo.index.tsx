import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { fetchPublishedSpectacles } from "@/lib/site-content";

export const Route = createFileRoute("/espetaculo/")({
  head: () => ({
    meta: [
      { title: "Espetáculos — Instituto Cultural Saba" },
      {
        name: "description",
        content: "Informações sobre os espetáculos do Instituto Cultural Saba.",
      },
    ],
  }),
  // Sem um espetáculo específico na URL, abre o primeiro da ordem de exibição.
  loader: async () => {
    const spectacles = await fetchPublishedSpectacles();
    if (spectacles.length > 0) {
      throw redirect({ to: "/espetaculo/$slug", params: { slug: spectacles[0].slug } });
    }
    return null;
  },
  component: EspetaculoIndex,
});

function EspetaculoIndex() {
  return (
    <section data-surface="palco" className="palco flex min-h-[80svh] items-end pt-[4.5rem]">
      <div className="container-x pb-[var(--cena-curta)]">
        <p className="eyebrow suave">Espetáculos</p>
        <h1 className="t-titulo mt-5 max-w-[14ch]">
          Os detalhes <span className="gesto gesto--luz">chegam em breve.</span>
        </h1>
        <p className="t-lide suave mt-8 max-w-[40ch]">
          As informações do espetáculo serão publicadas assim que a temporada for confirmada.
        </p>
        <Link to="/programacao" className="chamada mt-10">
          Ver programação <span className="seta">→</span>
        </Link>
      </div>
    </section>
  );
}
