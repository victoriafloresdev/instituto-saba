import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import { programacao } from "@/data/mock";

export const Route = createFileRoute("/programacao")({
  head: () => ({ meta: [
    { title: "Programação — Instituto Cultural Sabá" },
    { name: "description", content: "Datas, horários e locais das apresentações do Instituto Cultural Sabá." },
    { property: "og:title", content: "Programação — Instituto Cultural Sabá" },
  ]}),
  component: Programacao,
});

function Programacao() {
  return (
    <Section eyebrow="Programação" title="Temporada 2026." subtitle="Espetáculos, ensaios abertos e ações culturais em Belo Horizonte e região.">
      <div className="grid gap-6 md:grid-cols-2">
        {programacao.map((p) => (
          <Card key={p.id} className="p-8 flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <Badge variant="secondary" className="rounded-full">{p.tipo}</Badge>
              <span className="text-xs text-muted-foreground">{p.data}</span>
            </div>
            <h3 className="mt-4 text-3xl leading-tight">{p.titulo}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.descricao}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-foreground/80">
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> {p.hora}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> {p.local}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-6"><Button asChild size="sm"><a href="https://www.sympla.com.br" target="_blank" rel="noreferrer">Ingressos <ExternalLink className="ml-1 h-3.5 w-3.5" /></a></Button><Button asChild size="sm" variant="outline"><Link to="/espetaculo">Mais informações</Link></Button></div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
