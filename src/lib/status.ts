import type { Status } from "@/lib/database.types";

/** Status dos formulários de patrocínio, escolas e mensagens. */
export const STATUS_GERAL: Status[] = ["Novo", "Em análise", "Aprovado", "Recusado", "Contatado"];

/**
 * Status das inscrições de audição, que acontece em duas fases (pedido da
 * contratante): quem passa na primeira é chamado para a segunda, e quem
 * passa na segunda entra no elenco.
 */
export const STATUS_AUDICAO: Status[] = [
  "Novo",
  "Em análise",
  "Aprovado na 1ª fase",
  "Aprovado na 2ª fase",
  "Recusado",
  "Contatado",
];

/**
 * Opções do seletor de status de um registro. Um status que não pertence
 * mais à lista (ex.: "Aprovado" numa inscrição feita antes das duas fases)
 * continua aparecendo para aquele registro, em vez de o seletor ficar vazio.
 */
export function opcoesDeStatus(audicao: boolean, atual?: Status): Status[] {
  const lista = audicao ? STATUS_AUDICAO : STATUS_GERAL;
  return atual && !lista.includes(atual) ? [...lista, atual] : lista;
}
