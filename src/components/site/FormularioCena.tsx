import type { ReactNode } from "react";

interface Props {
  id?: string;
  numero: string;
  eyebrow: string;
  titulo: ReactNode;
  /** Contexto ao lado do formulário: o que acontece depois do envio, prazos. */
  apoio?: ReactNode;
  children: ReactNode;
}

/**
 * Seção de formulário, igual em todas as páginas que recebem inscrições:
 * etiqueta e título no alto; embaixo, o contexto numa coluna estreita e o
 * formulário na larga. Primeiro se entende o que é, depois se preenche.
 */
export function FormularioCena({ id, numero, eyebrow, titulo, apoio, children }: Props) {
  return (
    <section id={id} data-surface="papel" className="papel scroll-mt-20 py-[var(--cena)]">
      <div className="container-x">
        <header className="max-w-3xl">
          <p className="eyebrow suave flex gap-2.5">
            <span className="numeral">{numero}</span>
            <span aria-hidden="true">·</span>
            <span>{eyebrow}</span>
          </p>
          <h2 className="t-titulo mt-4">{titulo}</h2>
        </header>

        <div className="mt-10 grid gap-x-12 gap-y-10 md:mt-14 lg:grid-cols-12">
          {apoio && <div className="suave space-y-4 leading-relaxed lg:col-span-4">{apoio}</div>}
          <div className={apoio ? "lg:col-span-8" : "lg:col-span-9"}>{children}</div>
        </div>
      </div>
    </section>
  );
}

/** Confirmação de envio, no lugar do formulário. */
export function Enviado({
  titulo,
  texto,
  onNovo,
  novoRotulo = "Enviar outra",
}: {
  titulo: string;
  texto: string;
  onNovo?: () => void;
  novoRotulo?: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--fio)] bg-card p-8" role="status">
      <span aria-hidden="true" className="traco traco--desenho block w-12 text-laranja" />
      <p className="t-sub mt-5">{titulo}</p>
      <p className="suave mt-3 max-w-[48ch] leading-relaxed">{texto}</p>
      {onNovo && (
        <button type="button" className="link-traco mt-6 font-semibold" onClick={onNovo}>
          {novoRotulo}
        </button>
      )}
    </div>
  );
}
