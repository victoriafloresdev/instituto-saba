import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { Foto } from "@/components/site/Foto";
import { FOTOS_DE_RESERVA } from "@/lib/imagens";
import { formatSpectacleDate, formatSpectacleLocation } from "@/lib/site-content";
import type { Spectacle } from "@/lib/database.types";

/**
 * A programação como num programa de teatro impresso: uma entrada por
 * linha, separadas por fios. No celular, a fotografia do espetáculo fica
 * acima do título; no desktop a linha fica só com o texto.
 */
export function ProgramaLista({ espetaculos }: { espetaculos: Spectacle[] }) {
  return (
    <ol className="relative">
      {espetaculos.map((e, i) => {
        const reserva = FOTOS_DE_RESERVA[i % FOTOS_DE_RESERVA.length];
        return (
          <li key={e.id} className="relative">
            <span
              aria-hidden="true"
              className="fio absolute inset-x-0 top-0 block border-t"
              data-reveal="line"
              style={{ "--delay": `${i * 90}ms` } as CSSProperties}
            />
            <Link
              to="/espetaculo/$slug"
              params={{ slug: e.slug }}
              className="group grid gap-x-[var(--calha)] gap-y-4 py-9 md:grid-cols-12 md:items-baseline md:py-12"
            >
              <Foto
                caminho={e.image_path}
                nome={e.image_path ? undefined : reserva}
                alt={e.image_alt ?? undefined}
                enquadramento="4 / 3"
                sizes="100vw"
                className="md:hidden"
              />

              <p
                className="numeral text-[clamp(1.05rem,0.9rem+0.7vw,1.45rem)] md:col-span-3"
                data-reveal="rise"
              >
                {formatSpectacleDate(e)}
              </p>

              <div
                className="md:col-span-6"
                data-reveal="rise"
                style={{ "--delay": "70ms" } as CSSProperties}
              >
                <h3 className="font-display text-[clamp(1.6rem,1.1rem+1.9vw,2.7rem)] font-extrabold leading-[1.08] tracking-[-0.02em] transition-transform duration-500 ease-[var(--ease-releve)] group-hover:translate-x-2">
                  {e.title}
                </h3>
                {(e.subtitle || (e.sessions?.length ?? 0) > 1) && (
                  <p className="eyebrow suave mt-4">
                    {[
                      e.subtitle,
                      (e.sessions?.length ?? 0) > 1 ? `${e.sessions.length} sessões` : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
              </div>

              <div className="flex items-end justify-between gap-6 md:col-span-3 md:block md:text-right">
                <p className="suave text-[0.9375rem]">{formatSpectacleLocation(e)}</p>
                <span className="mt-2 inline-flex shrink-0 items-center gap-2 whitespace-nowrap font-semibold md:justify-end">
                  Ver espetáculo
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </li>
        );
      })}
      <li aria-hidden="true" className="fio border-t" />
    </ol>
  );
}
