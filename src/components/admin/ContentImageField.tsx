import { useRef, useState } from "react";
import { ImageIcon, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  ASSET_MIME_TYPES,
  siteAssetUrl,
  uploadSiteAsset,
  type AssetFolder,
} from "@/lib/site-content";

interface Props {
  label: string;
  folder: AssetFolder;
  /** Caminho atual no bucket, ou null quando o registro ainda não tem imagem. */
  value: string | null;
  onChange: (path: string | null) => void;
  hint?: string;
  /**
   * Formato esperado. Depois do envio, a imagem é medida e, se fugir do
   * recomendado, o painel avisa — sem bloquear, porque às vezes é a única
   * foto disponível.
   */
  recomendado?: { larguraMinima: number; horizontal?: boolean };
}

/** Largura e altura da imagem, lidas no navegador antes do envio. */
function medir(file: File): Promise<{ largura: number; altura: number } | null> {
  if (file.type === "image/svg+xml") return Promise.resolve(null);
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ largura: img.naturalWidth, altura: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      resolve(null);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

function avisoDeFormato(
  medida: { largura: number; altura: number } | null,
  recomendado: NonNullable<Props["recomendado"]>,
): string | null {
  if (!medida) return null;
  if (recomendado.horizontal && medida.altura >= medida.largura) {
    return "Esta imagem é vertical ou quadrada. No site ela ocupa a largura da tela, então vai aparecer bem recortada — prefira uma foto horizontal.";
  }
  if (medida.largura < recomendado.larguraMinima) {
    return `Esta imagem tem ${medida.largura} px de largura; o recomendado é pelo menos ${recomendado.larguraMinima} px. Em telas grandes ela pode aparecer sem nitidez.`;
  }
  return null;
}

/**
 * Envia a imagem para o bucket site-assets e guarda apenas o caminho. O arquivo
 * anterior não é apagado na troca: a exclusão definitiva acontece junto com o
 * registro, para não quebrar uma versão já publicada por engano.
 */
export function ContentImageField({ label, folder, value, onChange, hint, recomendado }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const previewUrl = siteAssetUrl(value);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      const [path, medida] = await Promise.all([
        uploadSiteAsset(folder, file),
        recomendado ? medir(file) : Promise.resolve(null),
      ]);
      onChange(path);
      const aviso = recomendado ? avisoDeFormato(medida, recomendado) : null;
      if (aviso) toast.warning(`Imagem enviada, mas atenção: ${aviso}`, { duration: 12000 });
      else toast.success("Imagem enviada.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível enviar a imagem.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <Label className="mb-2 block text-sm">{label}</Label>
      <div className="flex items-center gap-4">
        <div className="grid h-24 w-32 shrink-0 place-items-center overflow-hidden rounded-md border border-border bg-muted/50">
          {previewUrl ? (
            <img src={previewUrl} alt="" className="h-full w-full object-contain" />
          ) : (
            <ImageIcon className="h-5 w-5 text-muted-foreground" strokeWidth={1.4} />
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            ref={inputRef}
            type="file"
            accept={ASSET_MIME_TYPES.join(",")}
            className="hidden"
            onChange={(event) => void handleFile(event.target.files?.[0])}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-1 h-4 w-4" />
            )}
            {value ? "Trocar imagem" : "Enviar imagem"}
          </Button>
          {value && (
            <Button type="button" variant="ghost" size="sm" onClick={() => onChange(null)}>
              <Trash2 className="mr-1 h-4 w-4" />
              Remover
            </Button>
          )}
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {hint ?? "JPG, PNG, WEBP, AVIF ou SVG, até 10 MB."}
      </p>
    </div>
  );
}
