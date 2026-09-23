import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetchPublishedSpectacles } from "@/lib/site-content";

export const Route = createFileRoute("/espetaculo/")({
  head: () => ({
    meta: [
      { title: "Espetáculos — Instituto Cultural Sabá" },
      {
        name: "description",
        content: "Informações sobre os espetáculos do Instituto Cultural Sabá.",
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
    <Section eyebrow="Temporada" title="Espetáculos.">
      <Card className="flex min-h-56 items-center justify-center border-dashed p-10 text-center">
        <div>
          <p className="font-display text-3xl">Detalhes em breve.</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            As informações do espetáculo serão publicadas assim que a temporada for confirmada.
          </p>
          <Button asChild className="mt-6">
            <Link to="/programacao">Ver programação</Link>
          </Button>
        </div>
      </Card>
    </Section>
  );
}
