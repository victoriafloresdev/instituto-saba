import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Foto } from "@/components/site/Foto";
import type { NomeImagem } from "@/lib/imagens";

interface Props {
  eyebrow: string;
  /** Cada item é uma linha do título; as linhas sobem em sequência. */
  linhas: ReactNode[];
  lide?: ReactNode;
  /** Foto de abertura, à direita, sangrando até a borda da tela. */
  foto?: NomeImagem;
  /** Ou a imagem enviada pelo painel, para os espetáculos. */
  fotoCaminho?: string | null;
  fotoAlt?: string;
  foco?: string;
  children?: ReactNode;
}

/**
 * Toda página começa no palco, com a luz baixa: legenda, título em
 * linhas e, quando houver, uma fotografia que ultrapassa o grid pela
 * direita. É a primeira dobra de todas as páginas internas.
 */
export function Abertura({
  eyebrow,
  linhas,
  lide,
  foto,
  fotoCaminho,
  fotoAlt,
  foco,
  children,
}: Props) {
  const temFoto = Boolean(foto || fotoCaminho);

  return (
    <section data-surface="palco" className="palco relative overflow-hidden pt-[4.5rem]">
      <div
        className={cn(
          "container-x grid gap-y-12 pb-[var(--cena-curta)] pt-[clamp(3rem,2rem+6vw,8rem)]",
          temFoto && "lg:grid-cols-12 lg:gap-x-[var(--calha)]",
        )}
      >
        <div className={cn("flex flex-col justify-end", temFoto ? "lg:col-span-7" : "max-w-6xl")}>
          <p className="eyebrow suave abre">
            <span>{eyebrow}</span>
          </p>
          <h1 className="t-cartaz abre mt-6">
            {linhas.map((linha, i) => (
              <span key={i} style={{ "--i": i + 1 } as CSSProperties}>
                {linha}
              </span>
            ))}
          </h1>
          {lide && (
            <div className="abre mt-10 max-w-[46ch]">
              <p className="t-lide suave" style={{ "--i": linhas.length + 2 } as CSSProperties}>
                {lide}
              </p>
            </div>
          )}
          {children && (
            <div className="abre mt-10">
              <div style={{ "--i": linhas.length + 3 } as CSSProperties}>{children}</div>
            </div>
          )}
        </div>

        {temFoto && (
          <div className="relative lg:col-span-5 lg:-mr-[var(--margem)]">
            <Foto
              nome={foto}
              caminho={fotoCaminho}
              alt={fotoAlt}
              enquadramento="4 / 5"
              foco={foco}
              sizes="(min-width: 1024px) 42vw, 100vw"
              prioridade
              imgClassName="acende"
            />
          </div>
        )}
      </div>
    </section>
  );
}
