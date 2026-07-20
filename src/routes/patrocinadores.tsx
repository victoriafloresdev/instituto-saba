import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, ArrowRight } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/patrocinadores")({
  head: () => ({ meta: [{ title: "Patrocinadores — Instituto Cultural Sabá" }, { name: "description", content: "Conheça quem apoia o Instituto Cultural Sabá e o Ballet Dom Quixote." }] }),
  component: Patrocinadores,
});

function Patrocinadores() {
  return <>
    <Section eyebrow="Quem faz acontecer" title="Nossos patrocinadores." subtitle="Empresas e pessoas que escolhem investir na cultura, na dança e nas oportunidades para jovens artistas.">
      <div className="grid gap-6 md:grid-cols-2"><Card className="p-8 md:p-10"><div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary"><Building2 className="h-6 w-6" /></span><div><p className="eyebrow">Patrocínio master</p><h2 className="mt-1 text-3xl">Máquinas Bolbi Ltda.</h2></div></div><p className="mt-6 leading-relaxed text-muted-foreground">Citada no material do Instituto Cultural Sabá como patrocinadora master. Empresa fundada em Belo Horizonte em 1954, atualmente administrada pela terceira geração da família Biskupski.</p></Card><div className="flex min-h-56 items-center justify-center border border-dashed border-foreground/35 bg-muted/65 p-8 text-center"><div><p className="font-display text-3xl">Sua marca pode estar aqui.</p><p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/75">Associe sua empresa a uma produção cultural de grande porte e à formação de novos talentos.</p><Button asChild className="mt-6 bg-foreground text-saba-pink hover:bg-foreground/85"><Link to="/patrocinio">Seja um patrocinador</Link></Button></div></div></div>
    </Section>
    <Section tone="ink" title="A arte agradece o seu patrocínio."><div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"><p className="max-w-2xl text-foreground/75">O apoio ao Ballet Dom Quixote gera visibilidade de marca, benefícios fiscais e impacto social por meio da Lei Rouanet.</p><Button asChild size="lg" className="bg-foreground text-saba-pink hover:bg-foreground/85"><Link to="/patrocinio">Seja um patrocinador <ArrowRight className="ml-1 h-4 w-4" /></Link></Button></div></Section>
  </>;
}
