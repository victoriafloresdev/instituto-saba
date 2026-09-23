import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/** Falso quando o ambiente não tem as credenciais do Supabase. */
export const isSupabaseConfigured = Boolean(url && publishableKey);

/** Mensagem exibida ao público quando o banco não está acessível. */
export const SUPABASE_UNAVAILABLE_MESSAGE =
  "O envio está indisponível no momento por um problema técnico. Tente novamente mais tarde ou fale com o Instituto por outro canal.";

const CONFIG_ERROR =
  "As variáveis VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY são obrigatórias. " +
  "Cadastre-as no ambiente de deploy (na Vercel: Settings → Environment Variables, " +
  "marcando Production) e refaça a build — republicar a build anterior não relê as variáveis.";

if (!isSupabaseConfigured) {
  // Isto já foi um throw no carregamento do módulo, e derrubava o site inteiro
  // com erro 500 — inclusive páginas que não tocam no banco, como /sobre. Agora
  // só o que depende do Supabase fica indisponível; o resto do site continua no ar.
  console.error(`[supabase] ${CONFIG_ERROR}`);
}

const isBrowser = typeof window !== "undefined";

/**
 * Substituto usado quando faltam credenciais. Qualquer uso lança o erro de
 * configuração, que as rotas e formulários já tratam — em vez de quebrar na
 * importação, antes de qualquer página conseguir renderizar.
 */
function createUnconfiguredClient(): SupabaseClient<Database> {
  return new Proxy({} as SupabaseClient<Database>, {
    get() {
      throw new Error(CONFIG_ERROR);
    },
    apply() {
      throw new Error(CONFIG_ERROR);
    },
  });
}

export const supabase = isSupabaseConfigured
  ? createClient<Database>(url, publishableKey, {
      auth: {
        persistSession: isBrowser,
        autoRefreshToken: isBrowser,
        detectSessionInUrl: isBrowser,
      },
    })
  : createUnconfiguredClient();
