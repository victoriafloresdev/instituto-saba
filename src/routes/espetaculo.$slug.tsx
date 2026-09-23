import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, MapPin, ExternalLink, Users } from "lucide-react";
import { Section } from "@/components/site/Section";
import { StorageImage } from "@/components/site/StorageImage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  fetchPublishedSpectacleBySlug,
  formatSpectacleDate,
  formatSpectacleLocation,
  formatSpectacleTime,
} from "@/lib/site-content";

export const Route = createFileRoute("/espetaculo/$slug")({
  loader: async ({ params }) => ({ spectacle: await fetchPublishedSpectacleBySlug(params.slug) }),
  head: ({ loaderData }) => {
    const spectacle = loaderData?.spectacle;
    const title = spectacle
      ? `${spectacle.title} — Instituto Cultural Sabá`
      : "Espetáculo — Instituto Cultural Sabá";
    return {
      meta: [
        { title },
        {
          name: "description",
          content:
            spectacle?.description?.slice(0, 180) ||
            "Informações sobre os espetáculos do Instituto Cultural Sabá.",
        },
        { property: "og:title", content: title },
      ],
    };
  },
  component: EspetaculoDetalhe,
});

function EspetaculoDetalhe() {
  const { spectacle } = Route.useLoaderData();

  if (!spectacle) {
    return (
      <Section eyebrow="Espetáculo" title="Espetáculo não encontrado.">
        <p className="max-w-xl leading-relaxed text-muted-foreground">
          Este espetáculo não está disponível ou ainda não foi publicado.
        </p>
        <Button asChild className="mt-6">
          <Link to="/programacao">Ver programação</Link>
        </Button>
      </Section>
    );
  }

  const infos = [
    { icon: Calendar, label: "Data", value: formatSpectacleDate(spectacle) },
    { icon: Clock, label: "Horário", value: formatSpectacleTime(spectacle) },
    { icon: MapPin, label: "Local", value: formatSpectacleLocation(spectacle) },
  ];
  if (spectacle.classification) {
    infos.push({ icon: Users, label: "Classificação", value: spectacle.classification });
  }

  return (
    <>
      <Section
        eyebrow={spectacle.subtitle || "Temporada"}
        title={`${spectacle.title}.`}
        subtitle={spectacle.description || undefined}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {infos.map(({ icon: Icon, label, value }) => (
            <Card key={label} className="rounded-[1.25rem] border-foreground/20 bg-muted/50 p-7">
              <Icon className="h-6 w-6 text-primary" />
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-foreground/60">
                {label}
              </p>
              <p className="mt-2 text-xl font-bold leading-tight">{value}</p>
            </Card>
          ))}
        </div>
        {spectacle.address && (
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{spectacle.address}</p>
        )}
      </Section>

      <Section tone="muted" eyebrow="Sobre o espetáculo" title="Uma grande produção em movimento.">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-5 leading-relaxed text-muted-foreground">
            {(spectacle.synopsis || spectacle.description)
              .split(/\n{2,}/)
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
          <Card className="border-foreground/20 bg-saba-pink p-8">
            <p className="eyebrow text-primary">Ingressos</p>
            {spectacle.ticket_url ? (
              <>
                <p className="mt-4 text-2xl font-bold leading-tight">
                  Ingressos disponíveis na plataforma oficial.
                </p>
                <Button
                  asChild
                  className="mt-6 bg-foreground text-saba-pink hover:bg-foreground/85"
                >
                  <a href={spectacle.ticket_url} target="_blank" rel="noreferrer">
                    Comprar ingressos <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </>
            ) : (
              <>
                <p className="mt-4 text-2xl font-bold leading-tight">
                  Informações sobre vendas serão divulgadas em breve.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                  Entre em contato com o Instituto para acompanhar a abertura da bilheteria.
                </p>
                <Button
                  asChild
                  className="mt-6 bg-foreground text-saba-pink hover:bg-foreground/85"
                >
                  <Link to="/contato">Falar com o Instituto</Link>
                </Button>
              </>
            )}
          </Card>
        </div>
        <div className="mt-10">
          <StorageImage
            path={spectacle.image_path}
            alt={spectacle.image_alt}
            label={spectacle.title}
            aspect="16/9"
          />
        </div>
      </Section>

      <Section>
        <Button asChild variant="outline">
          <Link to="/programacao">Voltar para programação</Link>
        </Button>
      </Section>
    </>
  );
}
