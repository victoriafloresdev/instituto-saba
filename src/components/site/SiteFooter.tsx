import { Link } from "@tanstack/react-router";
import { Marca } from "@/components/site/Marca";

const COLUNAS = [
  {
    titulo: "Instituto",
    links: [
      { to: "/sobre", label: "Sobre" },
      { to: "/programacao", label: "Programação" },
      { to: "/patrocinadores", label: "Patrocinadores" },
    ],
  },
  {
    titulo: "Participe",
    links: [
      { to: "/audicoes", label: "Audições" },
      { to: "/escolas", label: "Contrapartida social" },
      { to: "/patrocinio", label: "Seja patrocinador" },
      { to: "/contato", label: "Contato" },
    ],
  },
] as const;

/**
 * O fim da noite. A frase de encerramento é a do material do Instituto.
 * As redes sociais entram quando houver URLs oficiais — antes disso eram
 * ícones apontando para "#".
 */
export function SiteFooter() {
  return (
    <footer className="palco relative overflow-hidden" data-surface="palco">
      <span
        aria-hidden="true"
        className="traco pointer-events-none absolute -bottom-[38%] -right-[16%] w-[min(95vw,68rem)] text-grafite"
      />

      <div className="container-x relative pb-10 pt-[var(--cena)]">
        <p className="font-display t-titulo max-w-[12ch]" data-reveal="rise">
          Nos vemos <span className="gesto gesto--luz">no teatro.</span>
        </p>

        <div className="mt-[var(--cena-curta)] grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              to="/"
              className="group inline-flex"
              aria-label="Instituto Cultural Saba — início"
            >
              <Marca />
            </Link>
            <p className="suave mt-5 max-w-sm text-[0.9375rem] leading-relaxed">
              Fortalecer a dança no Brasil e revelar jovens talentos do país para o mundo.
            </p>
          </div>

          {COLUNAS.map((coluna) => (
            <nav key={coluna.titulo} aria-label={coluna.titulo} className="md:col-span-3">
              <p className="eyebrow suave">{coluna.titulo}</p>
              <ul className="mt-5 space-y-3">
                {coluna.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="link-traco text-[0.9375rem]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="fio mt-[var(--cena-curta)] flex flex-col gap-3 border-t pt-6 text-xs md:flex-row md:justify-between">
          <p className="suave">
            © {new Date().getFullYear()} Instituto Cultural Saba · Belo Horizonte, Minas Gerais
          </p>
          <p className="suave">
            Projetos viabilizados por meio das leis de incentivo à cultura ·{" "}
            <Link to="/privacidade" className="link-traco">
              Política de privacidade
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
