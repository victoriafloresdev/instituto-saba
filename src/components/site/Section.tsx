import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

type Tom = "papel" | "palco" | "laranja";

interface SectionProps {
  /** Número da seção: "01", "02"... */
  numero?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
  id?: string;
  /** Superfície da cena. "default"/"muted" e "ink" mantidos por compatibilidade. */
  tone?: Tom | "default" | "muted" | "ink";
  /** Espaçamento vertical: "cena" é o respiro cheio, "curta" o intermediário. */
  ritmo?: "cena" | "curta";
}

const SUPERFICIE: Record<Tom, string> = {
  papel: "papel",
  palco: "palco",
  laranja: "cena-laranja",
};

function normalizar(tone: SectionProps["tone"]): Tom {
  if (tone === "ink") return "palco";
  if (tone === "palco" || tone === "laranja") return tone;
  return "papel";
}

/**
 * Uma seção do site. Etiqueta, título e texto de apoio ficam empilhados e
 * alinhados na mesma margem do conteúdo — uma leitura só, de cima para
 * baixo, sem colunas vazias à esquerda.
 */
export function Section({
  numero,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  id,
  tone = "papel",
  ritmo = "cena",
}: SectionProps) {
  const t = normalizar(tone);
  const temCabecalho = Boolean(eyebrow || numero || title || subtitle);

  return (
    <section
      id={id}
      data-surface={t === "palco" ? "palco" : "papel"}
      className={cn(
        SUPERFICIE[t],
        "scroll-mt-20",
        ritmo === "cena" ? "py-[var(--cena)]" : "py-[var(--cena-curta)]",
        className,
      )}
    >
      <div className="container-x">
        {temCabecalho && (
          <header className={cn("max-w-3xl", title || subtitle ? "mb-12 md:mb-16" : "mb-6")}>
            {(eyebrow || numero) && (
              <p className="eyebrow suave flex gap-2.5" data-reveal="rise">
                {numero && <span className="numeral">{numero}</span>}
                {numero && eyebrow && <span aria-hidden="true">·</span>}
                {eyebrow && <span>{eyebrow}</span>}
              </p>
            )}
            {title && (
              <h2 className="t-titulo mt-4" data-reveal="rise" style={atraso(60)}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="t-lide suave mt-5" data-reveal="rise" style={atraso(120)}>
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

const atraso = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;
