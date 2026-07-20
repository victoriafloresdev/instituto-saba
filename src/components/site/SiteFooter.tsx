import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Mail, MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/20 bg-saba-pink text-foreground">
      <div className="container-x py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-ink font-display text-lg">S</span><span className="font-display text-xl">Instituto Cultural Sabá</span></div>
          <p className="mt-4 max-w-md text-sm text-foreground/70 leading-relaxed">O Instituto Cultural Sabá fortalece a dança brasileira e revela os talentos jovens do país para o mundo.</p>
          <div className="mt-5 flex gap-3"><a href="#" className="grid h-9 w-9 place-items-center rounded-full border border-foreground/25 hover:bg-foreground hover:text-saba-pink"><Instagram className="h-4 w-4" /></a><a href="#" className="grid h-9 w-9 place-items-center rounded-full border border-foreground/25 hover:bg-foreground hover:text-saba-pink"><Youtube className="h-4 w-4" /></a><a href="#" className="grid h-9 w-9 place-items-center rounded-full border border-foreground/25 hover:bg-foreground hover:text-saba-pink"><MessageCircle className="h-4 w-4" /></a><a href="#" className="grid h-9 w-9 place-items-center rounded-full border border-foreground/25 hover:bg-foreground hover:text-saba-pink"><Mail className="h-4 w-4" /></a></div>
        </div>
        <div><p className="text-xs uppercase tracking-[0.18em] text-foreground/55">Navegação</p><ul className="mt-4 space-y-2 text-sm"><li><Link to="/sobre" className="hover:text-primary">Sobre</Link></li><li><Link to="/programacao" className="hover:text-primary">Programação</Link></li><li><Link to="/elenco" className="hover:text-primary">Elenco & Equipe</Link></li></ul></div>
        <div><p className="text-xs uppercase tracking-[0.18em] text-foreground/55">Participe</p><ul className="mt-4 space-y-2 text-sm"><li><Link to="/audicoes" className="hover:text-primary">Audições</Link></li><li><Link to="/patrocinadores" className="hover:text-primary">Patrocinadores</Link></li><li><Link to="/patrocinio" className="hover:text-primary">Seja patrocinador</Link></li><li><Link to="/escolas" className="hover:text-primary">Escolas públicas</Link></li><li><Link to="/contato" className="hover:text-primary">Contato</Link></li></ul></div>
      </div>
      <div className="border-t border-foreground/15"><div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-foreground/60"><p>© {new Date().getFullYear()} Instituto Cultural Sabá. Todos os direitos reservados.</p><p>Belo Horizonte · Minas Gerais · Brasil</p></div></div>
    </footer>
  );
}
