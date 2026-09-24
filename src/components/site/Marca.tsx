import { cn } from "@/lib/utils";

/**
 * Assinatura do Instituto, recomposta a partir do material da contratante:
 * o círculo do traço, "saba" em caixa baixa e "Instituto Cultural"
 * empilhado ao lado. Herda a cor do texto ao redor.
 */
export function Marca({ className, compacta = false }: { className?: string; compacta?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span aria-hidden="true" className="contents">
        <span className="traco h-8 w-8 shrink-0 transition-transform duration-700 ease-[var(--ease-releve)] group-hover:rotate-[-24deg]" />
        <span className="text-[1.45rem] font-medium leading-none tracking-[-0.04em]">saba</span>
        {!compacta && (
          <span className="hidden flex-col text-[0.5rem] font-semibold uppercase leading-[1.25] tracking-[0.2em] sm:flex">
            <span>Instituto</span>
            <span>Cultural</span>
          </span>
        )}
      </span>
      <span className="sr-only">Instituto Cultural Saba</span>
    </span>
  );
}
