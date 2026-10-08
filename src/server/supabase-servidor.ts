import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Clientes do Supabase para as rotas de servidor. Este arquivo nunca vai
 * para o navegador (pasta server/, protegida em vite.config.ts): é aqui que
 * a chave de serviço pode ser lida.
 */

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const chavePublica = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

const semSessao = { auth: { persistSession: false, autoRefreshToken: false } };

/** Resposta JSON com o status dado. */
export function json(corpo: unknown, status = 200): Response {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

/**
 * Confere se o pedido vem de um administrador logado no painel. O painel
 * manda o token da sessão no cabeçalho Authorization; o cliente devolvido
 * age em nome desse usuário, então as políticas de acesso (RLS) continuam
 * valendo para tudo o que ele fizer.
 */
export async function administradorDoPedido(
  request: Request,
): Promise<{ supabase: SupabaseClient; userId: string } | null> {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token || !url || !chavePublica) return null;

  const supabase = createClient(url, chavePublica, {
    ...semSessao,
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const {
    data: { user },
  } = await supabase.auth.getUser(token);
  if (!user) return null;

  const { data: perfil } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (perfil?.role !== "admin") return null;

  return { supabase, userId: user.id };
}

/**
 * Cliente com a chave de serviço, que ignora as políticas de acesso. Usado
 * só pela limpeza automática, que não tem um usuário por trás.
 */
export function clienteDeServico(): SupabaseClient | null {
  const chaveDeServico = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !chaveDeServico) return null;
  return createClient(url, chaveDeServico, semSessao);
}
