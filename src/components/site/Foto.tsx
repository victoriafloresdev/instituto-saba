import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { IMAGENS, srcPadrao, srcset, type NomeImagem } from "@/lib/imagens";
import { siteAssetUrl } from "@/lib/site-content";

interface Props {
  /** Foto do catálogo local. */
  nome?: NomeImagem;
  /** Ou um arquivo enviado pelo painel (bucket site-assets). */
  caminho?: string | null;
  alt?: string;
  /** Atributo sizes do <img>: quanto da tela a foto ocupa. */
  sizes?: string;
  /** Proporção do enquadramento; a foto é recortada para caber. */
  enquadramento?: string;
  /** object-position, para escolher o que fica no recorte. */
  foco?: string;
  /** Revela como cortina ao entrar na tela. */
  cortina?: boolean;
  /** Atraso da revelação, para encadear com outros elementos. */
  atraso?: number;
  /** Primeira dobra: carrega com prioridade e sem lazy loading. */
  prioridade?: boolean;
  className?: string;
  imgClassName?: string;
}

/**
 * Fotografia do site. Sempre ocupa um enquadramento definido, para o layout
 * não pular quando a imagem carrega, e aceita tanto as fotos do catálogo
 * quanto as enviadas pelo painel administrativo.
 */
export function Foto({
  nome,
  caminho,
  alt,
  sizes = "100vw",
  enquadramento,
  foco = "center",
  cortina = false,
  atraso = 0,
  prioridade = false,
  className,
  imgClassName,
}: Props) {
  const doPainel = siteAssetUrl(caminho);
  const img = nome ? IMAGENS[nome] : null;
  if (!doPainel && !img) return null;

  const style: CSSProperties = {
    aspectRatio: enquadramento ?? (img ? String(img.proporcao) : "3 / 2"),
    ...(atraso ? ({ "--delay": `${atraso}ms` } as CSSProperties) : {}),
  };

  return (
    <div
      className={cn("relative overflow-hidden bg-palco", className)}
      style={style}
      data-reveal={cortina ? "curtain" : undefined}
    >
      <img
        src={doPainel ?? srcPadrao(img!)}
        srcSet={doPainel ? undefined : srcset(img!)}
        sizes={doPainel ? undefined : sizes}
        alt={alt ?? img?.alt ?? ""}
        loading={prioridade ? "eager" : "lazy"}
        fetchPriority={prioridade ? "high" : undefined}
        decoding={prioridade ? "sync" : "async"}
        className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
        style={{ objectPosition: foco }}
      />
    </div>
  );
}
