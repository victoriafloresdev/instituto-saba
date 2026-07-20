import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/programacao", label: "Programação" },
  { to: "/patrocinadores", label: "Patrocinadores" },
  { to: "/elenco", label: "Elenco" },
  { to: "/audicoes", label: "Audições" },
  { to: "/escolas", label: "Escolas" },
  { to: "/contato", label: "Contato" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg">S</span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-lg text-foreground">Instituto Sabá</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Cultural · Dança</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {nav.map((n) => {
            const active = pathname === n.to;
            return <Link key={n.to} to={n.to} className={`text-sm transition-colors hover:text-primary ${active ? "text-primary" : "text-foreground/80"}`}>{n.label}</Link>;
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Button asChild variant="outline" size="sm"><Link to="/audicoes">Audições</Link></Button>
          <Button asChild size="sm"><Link to="/patrocinio">Seja patrocinador</Link></Button>
        </div>

        <button className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && <div className="lg:hidden border-t border-border bg-background"><div className="container-x py-4 flex flex-col gap-1">
        {nav.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2 text-sm text-foreground/85 hover:text-primary">{n.label}</Link>)}
        <div className="flex gap-2 pt-3"><Button asChild variant="outline" className="flex-1" onClick={() => setOpen(false)}><Link to="/audicoes">Audições</Link></Button><Button asChild className="flex-1" onClick={() => setOpen(false)}><Link to="/patrocinio">Patrocinar</Link></Button></div>
      </div></div>}
    </header>
  );
}
