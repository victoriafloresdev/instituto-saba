import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  /** Data e hora de abertura (ISO). Sem data, nada é exibido. */
  alvo: string | null | undefined;
  /** Frase antes do relógio: "As inscrições abrem em". */
  rotulo: string;
  /** O que mostrar quando a data já passou. */
  depois?: ReactNode;
  className?: string;
}

const UNIDADES = [
  { rotulo: "dias", ms: 86_400_000 },
  { rotulo: "horas", ms: 3_600_000 },
  { rotulo: "min", ms: 60_000 },
  { rotulo: "seg", ms: 1_000 },
] as const;

/**
 * Contagem regressiva até uma abertura (audições, venda de ingressos).
 *
 * No servidor e no primeiro render mostra só a data por extenso; o relógio
 * começa depois de montar no navegador. Assim o HTML do servidor e o do
 * navegador são iguais e nada "pula" na hidratação. Para leitores de tela,
 * os dígitos que mudam a cada segundo ficam ocultos e vale a frase fixa.
 */
export function Contagem({ alvo, rotulo, depois = null, className }: Props) {
  const [agora, setAgora] = useState<number | null>(null);

  useEffect(() => {
    setAgora(Date.now());
    const id = window.setInterval(() => setAgora(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!alvo) return null;
  const fim = new Date(alvo).getTime();
  if (Number.isNaN(fim)) return null;
  // Já no primeiro render (inclusive no servidor) uma data passada mostra o
  // estado "depois" — senão o rótulo antigo piscaria até a hidratação.
  if ((agora ?? Date.now()) >= fim) return <>{depois}</>;

  // Fuso fixo: o servidor (UTC na Vercel) e o navegador precisam escrever a
  // mesma hora, e a hora que vale é a de Belo Horizonte.
  const porExtenso = new Date(alvo).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  let resto = agora === null ? 0 : fim - agora;
  const partes = UNIDADES.map((u) => {
    const valor = Math.floor(resto / u.ms);
    resto -= valor * u.ms;
    return { ...u, valor };
  });

  return (
    <div className={cn("inline-block", className)}>
      <p className="eyebrow suave">{rotulo}</p>
      <p className="sr-only">{porExtenso}</p>
      {agora === null ? (
        <p className="mt-2 text-lg font-semibold" aria-hidden="true">
          {porExtenso}
        </p>
      ) : (
        <div className="mt-3 flex gap-2" aria-hidden="true">
          {partes.map((p) => (
            <div
              key={p.rotulo}
              className="fio min-w-[4.25rem] rounded-lg border px-3 py-2.5 text-center"
            >
              <span className="numeral block text-3xl leading-none">
                {String(p.valor).padStart(2, "0")}
              </span>
              <span className="suave mt-1.5 block text-xs">{p.rotulo}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
