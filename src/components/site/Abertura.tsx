import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FotoMoldurada } from "@/components/site/Foto";
import { IMAGENS, srcPadrao, srcset, type NomeImagem } from "@/lib/imagens";
import { siteAssetUrl } from "@/lib/site-content";

interface Props {
  eyebrow: string;
  /** Cada item é uma linha do título; as linhas sobem em sequência. */
  linhas: ReactNode[];
  lide?: ReactNode;
  /** Foto de abertura, à direita, com a moldura laranja e o traço. */
  foto?: NomeImagem;
  /** Ou a imagem enviada pelo painel, para os espetáculos. */
  fotoCaminho?: string | null;
  fotoAlt?: string;
  foco?: string;
  /**
   * Foto inteira de fundo, com a luz baixa (pedido do designer): a imagem
   * vira cenário e o título fica por cima. Exclui a foto ao lado.
   */
  fundo?: NomeImagem;
  /** Foco da foto de fundo (object-position). */
  fundoFoco?: string;
  /** O traço da logo saindo pela lateral, como assinatura institucional. */
  traco?: "laranja" | "grafite";
  children?: ReactNode;
}

/**
 * Toda página começa no palco, com a luz baixa: legenda, título em
 * linhas e, quando houver, uma fotografia — de fundo, como cenário, ou
 * ao lado, emoldurada. É a primeira dobra de todas as páginas internas.
 */
export function Abertura({
  eyebrow,
  linhas,
  lide,
  foto,
  fotoCaminho,
  fotoAlt,
  foco,
  fundo,
  fundoFoco = "center",
  traco,
  children,
}: Props) {
  const temFoto = !fundo && Boolean(foto || fotoCaminho);

  return (
    <section
      data-surface="palco"
      className={cn(
        "palco relative isolate overflow-hidden pt-[4.5rem]",
        fundo && "flex min-h-[min(88svh,56rem)] flex-col justify-end",
      )}
    >
      {fundo && <FotoDeFundo nome={fundo} foco={fundoFoco} />}
      {traco && (
        <span
          aria-hidden="true"
          className={cn(
            "traco pointer-events-none absolute -z-10",
            "-right-[42vw] top-[10%] w-[78vw]",
            "md:-right-[16vw] md:top-[56%] md:w-[min(52vw,40rem)] md:-translate-y-1/2",
            traco === "laranja" ? "text-laranja" : "text-grafite",
          )}
        />
      )}

      <div
        className={cn(
          "container-x grid gap-y-12 pb-[var(--cena-curta)] pt-[clamp(3rem,2rem+6vw,8rem)]",
          temFoto && "lg:grid-cols-12 lg:gap-x-[var(--calha)]",
        )}
      >
        <div className={cn("flex flex-col justify-end", temFoto ? "lg:col-span-7" : "max-w-6xl")}>
          <p className="eyebrow suave abre">
            <span>{eyebrow}</span>
          </p>
          <h1 className="t-cartaz abre mt-6">
            {linhas.map((linha, i) => (
              <span key={i} style={{ "--i": i + 1 } as CSSProperties}>
                {linha}
              </span>
            ))}
          </h1>
          {lide && (
            <div className="abre mt-10 max-w-[46ch]">
              <p className="t-lide suave" style={{ "--i": linhas.length + 2 } as CSSProperties}>
                {lide}
              </p>
            </div>
          )}
          {children && (
            <div className="abre mt-10">
              <div style={{ "--i": linhas.length + 3 } as CSSProperties}>{children}</div>
            </div>
          )}
        </div>

        {temFoto && (
          <div className="relative lg:col-span-5 lg:mt-6">
            <FotoMoldurada
              nome={foto}
              caminho={fotoCaminho}
              alt={fotoAlt}
              enquadramento="4 / 5"
              foco={foco}
              sizes="(min-width: 1024px) 38vw, 100vw"
              prioridade
              imgClassName="acende"
            />
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * A foto de cenário: ocupa a dobra inteira, apagada por um véu preto mais
 * denso do lado do texto e na base, onde a cena emenda com a próxima. O
 * texto passa em contraste com qualquer foto, inclusive no celular.
 */
export function FotoDeFundo({
  nome,
  caminho,
  foco = "center",
}: {
  nome?: NomeImagem;
  caminho?: string | null;
  foco?: string;
}) {
  const doPainel = siteAssetUrl(caminho);
  const img = nome ? IMAGENS[nome] : null;
  if (!doPainel && !img) return null;

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      {/* A luz acende no invólucro: a animação termina em opacidade cheia
          e anularia a luz baixa se fosse aplicada na própria foto.
          No desktop a foto começa depois da coluna do título, para o
          assunto da imagem (quase sempre ao centro) não ficar sob o texto. */}
      <div className="acende absolute inset-0 lg:left-[26%]">
        <img
          src={doPainel ?? srcPadrao(img!)}
          srcSet={doPainel ? undefined : srcset(img!)}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="foto-pb h-full w-full object-cover opacity-60"
          style={{ objectPosition: foco }}
        />
      </div>
      <span className="absolute inset-0 bg-[linear-gradient(90deg,var(--saba-preto)_26%,rgb(0_0_0/0.6)_48%,rgb(0_0_0/0.1)_100%)] max-lg:bg-[rgb(0_0_0/0.55)]" />
      {/* Passa 1px da borda: em alturas fracionadas a foto vazava numa linha clara. */}
      <span className="absolute inset-x-0 -bottom-px h-[45%] bg-gradient-to-t from-palco via-palco/70 to-transparent" />
    </div>
  );
}
