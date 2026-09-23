import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { siteAssetUrl } from "@/lib/site-content";

interface Props {
  /** Caminho do arquivo no bucket site-assets. */
  path: string | null | undefined;
  alt?: string | null;
  /** Texto exibido no placeholder enquanto a imagem oficial não é cadastrada. */
  label?: string;
  aspect?: string;
  className?: string;
}

/**
 * Imagem vinda do painel administrativo. Enquanto o registro não tem arquivo,
 * cai no placeholder já usado no restante do site.
 */
export function StorageImage({ path, alt, label = "Imagem", aspect = "4/3", className }: Props) {
  const url = siteAssetUrl(path);
  if (!url) return <ImagePlaceholder label={label} aspect={aspect} className={className} />;
  return (
    <img
      src={url}
      alt={alt || label}
      loading="lazy"
      className={cn("w-full rounded-xl border border-border object-cover", className)}
      style={{ aspectRatio: aspect }}
    />
  );
}
