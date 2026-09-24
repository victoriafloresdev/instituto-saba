import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Marca } from "@/components/site/Marca";

// Estrutura definida pela contratante (plano de alterações, seção 2):
// o elenco vive dentro de cada espetáculo e "Escolas" virou "Contrapartida social".
const NAV = [
  { to: "/sobre", label: "Sobre" },
  { to: "/programacao", label: "Programação" },
  { to: "/patrocinadores", label: "Patrocinadores" },
  { to: "/escolas", label: "Contrapartida social" },
  { to: "/audicoes", label: "Audições" },
  { to: "/contato", label: "Contato" },
] as const;

type Superficie = "palco" | "papel";

/**
 * Descobre qual superfície está sob o cabeçalho procurando a seção marcada
 * com data-surface logo abaixo dele. Assim o cabeçalho acompanha a cena em
 * vez de impor um fundo próprio.
 */
function superficieSob(altura: number): Superficie {
  const pilha = document.elementsFromPoint(24, altura + 4);
  for (const el of pilha) {
    const cena = el.closest<HTMLElement>("[data-surface]");
    if (cena && !cena.closest("header")) return cena.dataset.surface as Superficie;
  }
  return "papel";
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [aberto, setAberto] = useState(false);
  const [superficie, setSuperficie] = useState<Superficie>("palco");
  const [escondido, setEscondido] = useState(false);
  const [rolou, setRolou] = useState(false);
  const header = useRef<HTMLElement>(null);
  const botao = useRef<HTMLButtonElement>(null);
  const primeiroLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let ultimo = window.scrollY;
    let quadro = 0;
    const atualizar = () => {
      quadro = 0;
      const y = window.scrollY;
      const altura = header.current?.offsetHeight ?? 72;
      setSuperficie(superficieSob(altura));
      setRolou(y > 8);
      // Só esconde depois de sair do topo e quando o gesto é para baixo.
      setEscondido(y > altura * 3 && y > ultimo + 4 ? true : y < ultimo - 4 ? false : (v) => v);
      ultimo = y;
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(atualizar);
    };
    atualizar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };
  }, [pathname]);

  // Fecha o menu ao trocar de página.
  useEffect(() => setAberto(false), [pathname]);

  // Menu aberto: trava a rolagem, fecha com Esc e devolve o foco ao botão.
  useEffect(() => {
    if (!aberto) return;
    const gatilho = botao.current;
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    primeiroLink.current?.focus();
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = antes;
      window.removeEventListener("keydown", aoTeclar);
      gatilho?.focus();
    };
  }, [aberto]);

  const escuro = aberto || superficie === "palco";

  return (
    <header
      ref={header}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color] duration-500 ease-[var(--ease-releve)]",
        escuro ? "text-papel" : "text-tinta",
        rolou && !aberto && (escuro ? "bg-palco" : "bg-papel"),
        escondido && !aberto && "-translate-y-full",
      )}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
        <Link to="/" className="group" aria-label="Instituto Cultural Saba — início">
          <Marca />
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="link-traco text-[0.8125rem] font-medium tracking-[0.01em]"
                  activeProps={{ "aria-current": "page" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <Link to="/patrocinio" className="chamada hidden min-h-10 px-5 sm:inline-flex">
            Patrocine
          </Link>
          <button
            ref={botao}
            type="button"
            className="eyebrow relative z-10 flex min-h-11 items-center gap-2.5 xl:hidden"
            aria-expanded={aberto}
            aria-controls="menu-principal"
            onClick={() => setAberto((v) => !v)}
          >
            <span className="relative block h-2.5 w-5" aria-hidden="true">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-releve)]",
                  aberto && "translate-y-[5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-releve)]",
                  aberto && "-translate-y-[4px] -rotate-45",
                )}
              />
            </span>
            {aberto ? "Fechar" : "Menu"}
          </button>
        </div>
      </div>

      <MenuCheio id="menu-principal" aberto={aberto} primeiroLink={primeiroLink} />
    </header>
  );
}

function MenuCheio({
  id,
  aberto,
  primeiroLink,
}: {
  id: string;
  aberto: boolean;
  primeiroLink: React.RefObject<HTMLAnchorElement | null>;
}) {
  return (
    <div
      id={id}
      className={cn(
        "palco fixed inset-0 -z-10 flex flex-col overflow-y-auto pt-[4.5rem] transition-[clip-path,visibility] duration-700 ease-[var(--ease-releve)] xl:hidden",
        aberto ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]",
      )}
      aria-hidden={!aberto}
    >
      <nav aria-label="Menu" className="container-x flex flex-1 flex-col justify-center py-10">
        <ol className="flex flex-col">
          {NAV.map((item, i) => (
            <li
              key={item.to}
              className="fio border-t last:border-b"
              style={{ transitionDelay: aberto ? `${120 + i * 55}ms` : "0ms" }}
            >
              <Link
                ref={i === 0 ? primeiroLink : undefined}
                to={item.to}
                tabIndex={aberto ? 0 : -1}
                className={cn(
                  "group flex items-baseline gap-5 py-4 transition-[opacity,transform] duration-700 ease-[var(--ease-releve)]",
                  aberto ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
                style={{ transitionDelay: aberto ? `${140 + i * 55}ms` : "0ms" }}
                activeProps={{ "aria-current": "page", className: "text-laranja" }}
              >
                <span className="numeral w-7 shrink-0 text-sm text-papel-suave">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[clamp(1.9rem,7vw,3rem)] font-bold leading-none [font-stretch:84%] transition-[color,transform] duration-300 group-hover:translate-x-2 group-hover:text-laranja">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <Link
          to="/patrocinio"
          tabIndex={aberto ? 0 : -1}
          className={cn(
            "chamada chamada--cheia mt-10 self-start transition-opacity duration-700",
            aberto ? "opacity-100 delay-500" : "opacity-0",
          )}
        >
          Seja patrocinador <span className="seta">→</span>
        </Link>
      </nav>
    </div>
  );
}
