import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/espetaculo")({
  head: () => ({ meta: [{ title: "Ballet Dom Quixote — Instituto Cultural Sabá" }, { name: "description", content: "Informações sobre o espetáculo Ballet Dom Quixote." }] }),
  component: Espetaculo,
});

function Espetaculo() {
  return <>
    <Section eyebrow="Temporada 2026" title="Ballet Dom Quixote." subtitle="Remontagem do clássico do ballet de repertório em Belo Horizonte, com bailarinos selecionados por audição pública e convidados de renome internacional.">
      <div className="grid gap-6 md:grid-cols-3">{[{ icon: Calendar, label: "Data", value: "Setembro de 2026" }, { icon: Clock, label: "Horário", value: "Em breve" }, { icon: MapPin, label: "Local", value: "Em breve · Belo Horizonte, MG" }].map(({icon: Icon,label,value}) => <Card key={label} className="rounded-[1.25rem] border-foreground/20 bg-muted/50 p-7"><Icon className="h-6 w-6 text-primary" /><p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-foreground/60">{label}</p><p className="mt-2 text-xl font-bold leading-tight">{value}</p></Card>)}</div>
    </Section>
    <Section tone="muted" eyebrow="Sobre o espetáculo" title="Uma grande produção em movimento."><div className="grid gap-10 lg:grid-cols-2"><div className="space-y-5 leading-relaxed text-muted-foreground"><p>O projeto preserva e celebra uma obra-prima do repertório clássico, ao mesmo tempo em que busca democratizar o acesso à arte e gerar oportunidades de trabalho para jovens talentos.</p><p>A produção prevê orquestra convidada, noite de abertura, exposição multicultural, envolvimento da comunidade acadêmica e uma contrapartida social para crianças de escolas públicas.</p></div><Card className="border-foreground/20 bg-saba-pink p-8"><p className="eyebrow text-primary">Ingressos</p><p className="mt-4 text-2xl font-bold leading-tight">Informações sobre vendas serão divulgadas em breve.</p><p className="mt-3 text-sm leading-relaxed text-foreground/75">O botão abaixo leva temporariamente à plataforma parceira.</p><Button asChild className="mt-6 bg-foreground text-saba-pink hover:bg-foreground/85"><a href="https://www.sympla.com.br" target="_blank" rel="noreferrer">Ir para Sympla <ExternalLink className="ml-1 h-4 w-4" /></a></Button></Card></div>
    </Section>
    <Section><Button asChild variant="outline"><Link to="/programacao">Voltar para programação</Link></Button></Section>
  </>;
}
