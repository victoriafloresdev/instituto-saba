import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  id?: string;
  numero: string;
  eyebrow: string;
  titulo: ReactNode;
  /** Contexto ao lado do formulário: o que acontece depois do envio, prazos. */
  apoio?: ReactNode;
  /** Superfície da cena. O palco segue a referência "Fale conosco" do designer. */
  tom?: "papel" | "palco";
  /**
   * Fotografia ao lado do formulário (referência "Fale conosco"). Com ela, o
   * texto de apoio sobe para junto do título e a foto ocupa a coluna direita.
   */
  foto?: ReactNode;
  children: ReactNode;
}

/**
 * Seção de formulário, igual em todas as páginas que recebem inscrições:
 * etiqueta e título no alto; embaixo, o contexto numa coluna estreita e o
 * formulário na larga. Primeiro se entende o que é, depois se preenche.
 */
export function FormularioCena({
  id,
  numero,
  eyebrow,
  titulo,
  apoio,
  tom = "papel",
  foto,
  children,
}: Props) {
  if (foto) {
    return (
      <section id={id} data-surface={tom} className={cn(tom, "scroll-mt-20 py-[var(--cena)]")}>
        <div className="container-x grid gap-y-16 lg:grid-cols-12 lg:gap-x-[var(--calha)]">
          <div className="lg:col-span-6">
            <Cabecalho numero={numero} eyebrow={eyebrow} titulo={titulo} />
            {apoio && (
              <div className="suave mt-6 max-w-[52ch] space-y-4 leading-relaxed">{apoio}</div>
            )}
            <div className="mt-10 md:mt-12">{children}</div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="lg:sticky lg:top-28">{foto}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} data-surface={tom} className={cn(tom, "scroll-mt-20 py-[var(--cena)]")}>
      <div className="container-x">
        <Cabecalho numero={numero} eyebrow={eyebrow} titulo={titulo} />

        <div className="mt-10 grid gap-x-12 gap-y-10 md:mt-14 lg:grid-cols-12">
          {apoio && <div className="suave space-y-4 leading-relaxed lg:col-span-4">{apoio}</div>}
          <div className={apoio ? "lg:col-span-8" : "lg:col-span-9"}>{children}</div>
        </div>
      </div>
    </section>
  );
}

function Cabecalho({ numero, eyebrow, titulo }: Pick<Props, "numero" | "eyebrow" | "titulo">) {
  return (
    <header className="max-w-3xl">
      <p className="eyebrow suave flex gap-2.5">
        <span className="numeral">{numero}</span>
        <span aria-hidden="true">·</span>
        <span>{eyebrow}</span>
      </p>
      <h2 className="t-titulo mt-4">{titulo}</h2>
    </header>
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
    <div
      className="rounded-cartao border border-[var(--fio)] bg-card p-8 in-[.palco]:bg-[rgb(227_217_199/0.06)]"
      role="status"
    >
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
