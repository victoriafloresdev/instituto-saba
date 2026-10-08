import { supabase } from "@/lib/supabase";

/**
 * Arquivos da inscrição de audição: foto de rosto e currículo em PDF.
 *
 * Vão para o bucket PRIVADO "audicoes" (migração 20261009): qualquer pessoa
 * envia, mas só administradores veem. Os nomes são aleatórios e seguem o
 * formato exigido pela política de envio do bucket.
 */
export const AUDICOES_BUCKET = "audicoes";

export const FOTO_TIPOS = ["image/jpeg", "image/png", "image/webp"];
/** Limite do arquivo original escolhido pelo candidato. */
export const FOTO_MAX_BYTES = 15 * 1024 * 1024;
export const CURRICULO_MAX_BYTES = 5 * 1024 * 1024;

/** Lado maior da foto depois de preparada, em pixels. */
const FOTO_LADO_MAX = 1600;

/**
 * Redimensiona a foto e a regrava em JPEG. Além de deixar o envio leve no
 * celular, a regravação descarta os metadados do arquivo original — entre
 * eles, a localização GPS de onde a foto foi tirada.
 */
export async function prepararFoto(arquivo: File): Promise<Blob> {
  const bitmap = await createImageBitmap(arquivo);
  const escala = Math.min(1, FOTO_LADO_MAX / Math.max(bitmap.width, bitmap.height));
  const largura = Math.round(bitmap.width * escala);
  const altura = Math.round(bitmap.height * escala);
  const canvas = document.createElement("canvas");
  canvas.width = largura;
  canvas.height = altura;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Não foi possível processar a foto.");
  // Fundo branco: PNG com transparência não fica preto no JPEG.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, largura, altura);
  ctx.drawImage(bitmap, 0, 0, largura, altura);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Não foi possível processar a foto."))),
      "image/jpeg",
      0.86,
    ),
  );
}

/** Envia o arquivo e devolve o caminho gravado na inscrição. */
export async function enviarArquivoAudicao(
  tipo: "foto" | "curriculo",
  conteudo: Blob,
): Promise<string> {
  const path =
    tipo === "foto" ? `fotos/${crypto.randomUUID()}.jpg` : `curriculos/${crypto.randomUUID()}.pdf`;
  const { error } = await supabase.storage.from(AUDICOES_BUCKET).upload(path, conteudo, {
    contentType: tipo === "foto" ? "image/jpeg" : "application/pdf",
    upsert: false,
  });
  if (error) throw error;
  return path;
}

/** Link temporário para o painel abrir um arquivo privado (10 minutos). */
export async function linkTemporario(path: string): Promise<string | null> {
  const { data, error } = await supabase.storage.from(AUDICOES_BUCKET).createSignedUrl(path, 600);
  if (error) return null;
  return data.signedUrl;
}
