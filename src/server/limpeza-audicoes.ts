import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Retenção dos dados sensíveis das audições (LGPD), rodada uma vez por dia
 * pela Vercel (cron em vite.config.ts → /api/limpeza-audicoes).
 *
 *   1. Inscrições vencidas — a regra de prazo está no banco, na função
 *      audicoes_dados_vencidos(): 6 meses após a temporada, ou 12 meses após
 *      a inscrição no banco de talentos; aprovados na 2ª fase ficam de fora.
 *      As três fotos e o currículo são apagados; altura e peso, zerados.
 *   2. Arquivos órfãos — enviados por alguém que desistiu ou teve erro antes
 *      de gravar a inscrição. Saem depois de 2 dias sem dono.
 */

const BUCKET = "audicoes";
const ORFAO_APOS_MS = 2 * 24 * 60 * 60 * 1000;

/** Colunas que guardam caminhos de cada pasta do bucket. */
const COLUNAS_DA_PASTA = {
  fotos: ["foto_path", "foto_passe_path", "foto_corpo_path"],
  curriculos: ["curriculo_path"],
} as const;

export interface ResultadoDaLimpeza {
  inscricoesLimpas: number;
  orfaosApagados: number;
}

export async function limparAudicoes(supabase: SupabaseClient): Promise<ResultadoDaLimpeza> {
  const { data: vencidas, error } = await supabase.rpc("audicoes_dados_vencidos");
  if (error) throw new Error(`Falha ao consultar inscrições vencidas: ${error.message}`);

  const lista = (vencidas ?? []) as {
    id: string;
    foto_path: string | null;
    foto_passe_path: string | null;
    foto_corpo_path: string | null;
    curriculo_path: string | null;
  }[];
  const arquivos = lista
    .flatMap((v) => [v.foto_path, v.foto_passe_path, v.foto_corpo_path, v.curriculo_path])
    .filter(Boolean);
  if (arquivos.length) {
    const { error: erroArquivos } = await supabase.storage
      .from(BUCKET)
      .remove(arquivos as string[]);
    if (erroArquivos) throw new Error(`Falha ao apagar arquivos: ${erroArquivos.message}`);
  }
  if (lista.length) {
    const { error: erroDados } = await supabase
      .from("auditions")
      .update({
        foto_path: null,
        foto_passe_path: null,
        foto_corpo_path: null,
        curriculo_path: null,
        altura_cm: null,
        peso_kg: null,
        dados_apagados_em: new Date().toISOString(),
      })
      .in(
        "id",
        lista.map((v) => v.id),
      );
    if (erroDados) throw new Error(`Falha ao limpar inscrições: ${erroDados.message}`);
  }

  let orfaosApagados = 0;
  for (const [pasta, colunas] of Object.entries(COLUNAS_DA_PASTA)) {
    const { data: objetos } = await supabase.storage
      .from(BUCKET)
      .list(pasta, { limit: 1000, sortBy: { column: "created_at", order: "asc" } });
    const antigos = (objetos ?? [])
      .filter((o) => o.created_at && Date.now() - Date.parse(o.created_at) > ORFAO_APOS_MS)
      .map((o) => `${pasta}/${o.name}`);
    if (!antigos.length) continue;

    // Uma foto da pasta pode ser de rosto, no passé ou de corpo inteiro:
    // só é órfã se nenhuma das colunas a usa.
    const emUso = new Set<string>();
    for (const coluna of colunas) {
      const { data: usados, error: erroUso } = await supabase
        .from("auditions")
        .select(coluna)
        .in(coluna, antigos);
      // Na dúvida, não apaga nada desta pasta.
      if (erroUso) throw new Error(`Falha ao conferir arquivos em uso: ${erroUso.message}`);
      for (const u of usados ?? []) emUso.add((u as Record<string, string>)[coluna]);
    }
    const orfaos = antigos.filter((caminho) => !emUso.has(caminho));
    if (orfaos.length) {
      await supabase.storage.from(BUCKET).remove(orfaos);
      orfaosApagados += orfaos.length;
    }
  }

  return { inscricoesLimpas: lista.length, orfaosApagados };
}
