import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, ArrowRight, ExternalLink } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  siteAssetUrl,
  fetchActiveSponsors,
  SPONSOR_TYPE_LABELS,
  SPONSOR_TYPE_ORDER,
} from "@/lib/site-content";
import type { Sponsor } from "@/lib/database.types";

export const Route = createFileRoute("/patrocinadores")({
  head: () => ({
    meta: [
      { title: "Patrocinadores — Instituto Cultural Sabá" },
      {
        name: "description",
        content: "Conheça quem apoia o Instituto Cultural Sabá e o Ballet Dom Quixote.",
      },
    ],
  }),
  loader: async () => ({ sponsors: await fetchActiveSponsors() }),
  component: Patrocinadores,
});

function Patrocinadores() {
  const { sponsors } = Route.useLoaderData();
  const masters = sponsors.filter((s) => s.sponsor_type === "master");
  const others = SPONSOR_TYPE_ORDER.filter((type) => type !== "master").flatMap((type) =>
    sponsors.filter((s) => s.sponsor_type === type),
  );

  return (
    <>
      <Section
        eyebrow="Quem faz acontecer"
        title="Nossos patrocinadores."
        subtitle="Empresas e pessoas que escolhem investir na cultura, na dança e nas oportunidades para jovens artistas."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {masters.map((sponsor) => (
            <MasterCard key={sponsor.id} sponsor={sponsor} />
          ))}
          <div className="flex min-h-56 items-center justify-center border border-dashed border-foreground/35 bg-muted/65 p-8 text-center">
            <div>
              <p className="font-display text-3xl">Sua marca pode estar aqui.</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/75">
                Associe sua empresa a uma produção cultural de grande porte e à formação de novos
                talentos.
              </p>
              <Button asChild className="mt-6 bg-foreground text-saba-pink hover:bg-foreground/85">
                <Link to="/patrocinio">Seja um patrocinador</Link>
              </Button>
            </div>
          </div>
        </div>

        {others.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        )}
      </Section>

      <Section tone="ink" title="A arte agradece o seu patrocínio.">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="max-w-2xl text-foreground/75">
            O apoio ao Ballet Dom Quixote gera visibilidade de marca, benefícios fiscais e impacto
            social por meio da Lei Rouanet.
          </p>
          <Button asChild size="lg" className="bg-foreground text-saba-pink hover:bg-foreground/85">
            <Link to="/patrocinio">
              Seja um patrocinador <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

function SponsorLogo({
  sponsor,
  imgClassName = "h-12 w-auto max-w-40",
}: {
  sponsor: Sponsor;
  imgClassName?: string;
}) {
  const url = siteAssetUrl(sponsor.logo_path);
  if (!url) {
    return (
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        <Building2 className="h-6 w-6" />
      </span>
    );
  }
  return (
    <img
      src={url}
      alt={sponsor.logo_alt || sponsor.name}
      loading="lazy"
      className={`object-contain object-left ${imgClassName}`}
    />
  );
}

function MasterCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <Card className="p-8 md:p-10">
      <div className="flex items-center gap-4">
        <SponsorLogo sponsor={sponsor} />
        <div>
          <p className="eyebrow">{SPONSOR_TYPE_LABELS[sponsor.sponsor_type]}</p>
          <h2 className="mt-1 text-3xl">{sponsor.name}</h2>
        </div>
      </div>
      {sponsor.description && (
        <p className="mt-6 leading-relaxed text-muted-foreground">{sponsor.description}</p>
      )}
      {sponsor.website_url && (
        <Button asChild variant="outline" size="sm" className="mt-6">
          <a href={sponsor.website_url} target="_blank" rel="noreferrer">
            Visitar site <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </a>
        </Button>
      )}
    </Card>
  );
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <Card className="flex flex-col p-7">
      <SponsorLogo sponsor={sponsor} imgClassName="h-14 w-auto max-w-44" />
      <p className="mt-5 text-xs uppercase tracking-[0.14em] text-primary">
        {SPONSOR_TYPE_LABELS[sponsor.sponsor_type]}
      </p>
      <h3 className="mt-1 text-2xl leading-tight">{sponsor.name}</h3>
      {sponsor.description && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{sponsor.description}</p>
      )}
      {sponsor.website_url && (
        <a
          href={sponsor.website_url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          Visitar site <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </Card>
  );
}
