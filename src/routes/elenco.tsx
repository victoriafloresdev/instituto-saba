import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { elenco } from "@/data/mock";

export const Route = createFileRoute("/elenco")({
  head: () => ({ meta: [
    { title: "Elenco & Equipe — Instituto Cultural Sabá" },
    { name: "description", content: "Conheça o elenco, direção, produção e equipe técnica do Instituto Cultural Sabá." },
    { property: "og:title", content: "Elenco & Equipe — Instituto Cultural Sabá" },
  ]}),
  component: Elenco,
});

function Elenco() {
  return (
    <Section eyebrow="Elenco & Equipe" title="A equipe de Ballet Dom Quixote." subtitle="Profissionais reunidos para a remontagem do clássico do ballet de repertório, com seleção pública de bailarinos e convidados internacionais.">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {elenco.map((p) => (
          <figure key={p.nome} className="group">
            <ImagePlaceholder label={p.nome.split(" ")[0]} aspect="3/4" />
            <figcaption className="mt-4">
              <p className="font-display text-xl leading-tight">{p.nome}</p>
              <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-primary">{p.funcao}</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.bio}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
