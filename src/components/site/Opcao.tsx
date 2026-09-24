import { cn } from "@/lib/utils";

/**
 * Uma opção de escolha única em forma de cartão (radio por baixo). Usada nos
 * formulários e no simulador. O selo, opcional, fica à direita (ex.: "até 4%").
 */
export function Opcao({
  nome,
  marcada,
  aoMarcar,
  titulo,
  detalhe,
  selo,
  compacta,
}: {
  nome: string;
  marcada: boolean;
  aoMarcar: () => void;
  titulo: string;
  detalhe: string;
  selo?: string;
  compacta?: boolean;
}) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer items-start justify-between gap-3 rounded-md border-2 bg-[#f6f1e8] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-laranja",
        compacta ? "px-4 py-3" : "px-4 py-4",
        marcada ? "border-tinta" : "border-transparent hover:border-[rgb(31_30_28/0.3)]",
      )}
    >
      <input type="radio" name={nome} checked={marcada} onChange={aoMarcar} className="sr-only" />
      <span>
        <span className="block font-semibold leading-tight">{titulo}</span>
        <span className="suave mt-1 block text-sm leading-snug">{detalhe}</span>
      </span>
      {selo && (
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold",
            marcada ? "bg-laranja text-tinta" : "bg-[rgb(31_30_28/0.08)]",
          )}
        >
          {selo}
        </span>
      )}
    </label>
  );
}
