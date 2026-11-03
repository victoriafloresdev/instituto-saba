import { supabase } from "@/lib/supabase";
import { AUDICOES_BUCKET } from "@/lib/arquivos-audicao";

/**
 * Respostas dos formulários do site, como o painel as trata: arquivar
 * (sai da lista principal, mas fica guardada) e excluir de vez.
 *
 * No Supabase, uma operação barrada pela segurança do banco não dá erro:
 * ela só não afeta nenhuma linha. Por isso as duas funções pedem de volta o
 * registro alterado e falham se ele não vier.
 */
export type TipoRegistro = "audicoes" | "patrocinadores" | "escolas" | "mensagens";

export const TABELA_DO_TIPO = {
  audicoes: "auditions",
  patrocinadores: "sponsorship_leads",
  escolas: "school_registrations",
  mensagens: "contact_messages",
} as const satisfies Record<TipoRegistro, string>;

/** Para a pergunta de confirmação: "Excluir esta inscrição?". */
export const ESTE_REGISTRO: Record<TipoRegistro, string> = {
  audicoes: "esta inscrição",
  patrocinadores: "este interesse de patrocínio",
  escolas: "este cadastro de escola",
  mensagens: "esta mensagem",
};

/** Arquiva ou desarquiva. Devolve a data gravada (nula ao desarquivar). */
export async function arquivarRegistro(
  tipo: TipoRegistro,
  id: string,
  arquivar: boolean,
): Promise<string | null> {
  const arquivadoEm = arquivar ? new Date().toISOString() : null;
  const { data, error } = await supabase
    .from(TABELA_DO_TIPO[tipo])
    .update({ arquivado_em: arquivadoEm })
    .eq("id", id)
    .select("id");
  if (error || !data?.length) throw new Error(error?.message ?? "Nenhum registro alterado.");
  return arquivadoEm;
}

export interface ResultadoDaExclusao {
  /** Falso quando o registro saiu, mas algum arquivo da audição ficou no armazenamento. */
  arquivosApagados: boolean;
}

/**
 * Exclui o registro. Na audição, apaga também as fotos e o currículo: o
 * registro sai primeiro e devolve os caminhos dos arquivos, para nunca
 * sobrar uma inscrição sem os arquivos dela se a exclusão for recusada.
 */
export async function excluirRegistro(
  tipo: TipoRegistro,
  id: string,
): Promise<ResultadoDaExclusao> {
  if (tipo !== "audicoes") {
    const { data, error } = await supabase
      .from(TABELA_DO_TIPO[tipo])
      .delete()
      .eq("id", id)
      .select("id");
    if (error || !data?.length) throw new Error(error?.message ?? "Nenhum registro excluído.");
    return { arquivosApagados: true };
  }

  const { data, error } = await supabase
    .from("auditions")
    .delete()
    .eq("id", id)
    .select("foto_path, foto_passe_path, foto_corpo_path, curriculo_path");
  if (error || !data?.length) throw new Error(error?.message ?? "Nenhum registro excluído.");

  const arquivos = data
    .flatMap((r) => [r.foto_path, r.foto_passe_path, r.foto_corpo_path, r.curriculo_path])
    .filter((caminho): caminho is string => Boolean(caminho));
  if (arquivos.length === 0) return { arquivosApagados: true };
  const { error: erroArquivos } = await supabase.storage.from(AUDICOES_BUCKET).remove(arquivos);
  return { arquivosApagados: !erroArquivos };
}
