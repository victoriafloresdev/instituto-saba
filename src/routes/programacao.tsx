import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import {
  fetchPublishedSpectacles,
  formatSpectacleDate,
  formatSpectacleLocation,
  formatSpectacleTime,
} from "@/lib/site-content";

export const Route = createFileRoute("/programacao")({
  head: () => ({
    meta: [
      { title: "Programação — Instituto Cultural Sabá" },
      {
        name: "description",
        content: "Datas, horários e locais das apresentações do Instituto Cultural Sabá.",
      },
      { property: "og:title", content: "Programação — Instituto Cultural Sabá" },
    ],
  }),
  loader: async () => ({ spectacles: await fetchPublishedSpectacles() }),
  component: Programacao,
});

function Programacao() {
  const { spectacles } = Route.useLoaderData();

  return (
    <Section
      eyebrow="Programação"
      title="Temporada 2026."
      subtitle="Espetáculos, ensaios abertos e ações culturais em Belo Horizonte e região."
    >
      {spectacles.length === 0 ? (
        <Card className="flex min-h-56 items-center justify-center border-dashed p-10 text-center">
          <div>
            <p className="font-display text-3xl">Programação em breve.</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              As datas da temporada serão divulgadas aqui assim que confirmadas. Entre em contato
              para receber as informações em primeira mão.
            </p>
            <Button asChild className="mt-6">
              <Link to="/contato">Falar com o Instituto</Link>
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {spectacles.map((p) => (
            <Card key={p.id} className="p-8 flex flex-col">
              <div className="flex items-start justify-between gap-4">
                {p.subtitle && (
                  <Badge variant="secondary" className="rounded-full">
                    {p.subtitle}
                  </Badge>
                )}
                <span className="ml-auto text-xs text-muted-foreground">
                  {formatSpectacleDate(p)}
                </span>
              </div>
              <h3 className="mt-4 text-3xl leading-tight">{p.title}</h3>
              {p.description && (
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
              )}
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-foreground/80">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-primary" /> {formatSpectacleTime(p)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" /> {formatSpectacleLocation(p)}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-6">
                {p.ticket_url && (
                  <Button asChild size="sm">
                    <a href={p.ticket_url} target="_blank" rel="noreferrer">
                      Ingressos <ExternalLink className="ml-1 h-3.5 w-3.5" />
                    </a>
                  </Button>
                )}
                <Button asChild size="sm" variant="outline">
                  <Link to="/espetaculo/$slug" params={{ slug: p.slug }}>
                    Mais informações
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
}
