import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { Foto } from "@/components/site/Foto";
import { FOTOS_DE_RESERVA } from "@/lib/imagens";
import { formatSpectacleDate, formatSpectacleLocation } from "@/lib/site-content";
import type { Spectacle } from "@/lib/database.types";

/**
 * A programação como num programa de teatro impresso: uma entrada por
 * linha, separadas por fios. No desktop, a fotografia do espetáculo surge
 * à direita da linha sob o cursor; no celular ela fica sempre visível,
 * acima do título, porque não existe hover no toque.
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
                className="numeral text-[clamp(1.1rem,0.9rem+0.8vw,1.6rem)] italic md:col-span-3"
                data-reveal="rise"
              >
                {formatSpectacleDate(e)}
              </p>

              <div
                className="md:col-span-6"
                data-reveal="rise"
                style={{ "--delay": "70ms" } as CSSProperties}
              >
                <h3 className="font-display text-[clamp(1.8rem,1.2rem+2.2vw,3.1rem)] font-bold leading-[1.05] [font-stretch:84%] transition-transform duration-500 ease-[var(--ease-releve)] group-hover:translate-x-2">
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

              {/* Foto que aparece sob o cursor, só no desktop. */}
              <Foto
                caminho={e.image_path}
                nome={e.image_path ? undefined : reserva}
                alt=""
                enquadramento="4 / 5"
                sizes="18vw"
                className="pointer-events-none absolute right-[22%] top-1/2 z-10 hidden w-[15vw] max-w-[15rem] -translate-y-1/2 opacity-0 transition-[opacity,clip-path] duration-500 ease-[var(--ease-releve)] [clip-path:inset(12%_0_12%_0)] group-hover:opacity-100 group-hover:[clip-path:inset(0_0_0_0)] md:block"
              />
            </Link>
          </li>
        );
      })}
      <li aria-hidden="true" className="fio border-t" />
    </ol>
  );
}
