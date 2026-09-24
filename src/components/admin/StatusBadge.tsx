import { cn } from "@/lib/utils";
import type { Status } from "@/lib/database.types";

// Cores ajustadas à paleta do site; cada status também tem um ponto, para
// a informação não depender só da cor.
const ESTILO: Record<Status, string> = {
  Novo: "bg-laranja/15 text-[#8f3412]",
  "Em análise": "bg-amber-100 text-amber-900",
  Aprovado: "bg-emerald-100 text-emerald-900",
  Recusado: "bg-rose-100 text-rose-900",
  Contatado: "bg-sky-100 text-sky-900",
};

export function StatusBadge({ value }: { value: Status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold",
        ESTILO[value] ?? "bg-secondary text-tinta",
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {value}
    </span>
  );
}
