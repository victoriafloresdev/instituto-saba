import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
  tone?: "default" | "muted" | "ink";
}

export function Section({ eyebrow, title, subtitle, children, align = "left", className, id, tone = "default" }: SectionProps) {
  const toneCls =
    tone === "muted" ? "bg-muted/50" : tone === "ink" ? "bg-secondary text-foreground" : "";
  return (
    <section id={id} className={cn("py-20 md:py-28", toneCls, className)}>
      <div className="container-x">
        {(eyebrow || title || subtitle) && (
          <div className={cn("mb-12 md:mb-16 max-w-3xl", align === "center" && "mx-auto text-center")}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2 className="mt-4 text-4xl md:text-5xl leading-[1.05] text-foreground">{title}</h2>}
            {subtitle && <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
