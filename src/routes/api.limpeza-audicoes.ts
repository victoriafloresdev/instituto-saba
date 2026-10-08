import { createFileRoute } from "@tanstack/react-router";

/**
 * GET /api/limpeza-audicoes — retenção dos dados das audições (LGPD).
 * Chamada todo dia pela Vercel (cron em vite.config.ts), que envia
 * "Authorization: Bearer <CRON_SECRET>". Sem o segredo certo, nada roda.
 */
export const Route = createFileRoute("/api/limpeza-audicoes")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { clienteDeServico, json } = await import("@/server/supabase-servidor");
        const { limparAudicoes } = await import("@/server/limpeza-audicoes");

        const segredo = process.env.CRON_SECRET;
        if (!segredo || request.headers.get("authorization") !== `Bearer ${segredo}`) {
          return json({ erro: "Não autorizado." }, 401);
        }
        const supabase = clienteDeServico();
        if (!supabase) return json({ erro: "SUPABASE_SERVICE_ROLE_KEY não configurada." }, 503);

        try {
          return json(await limparAudicoes(supabase));
        } catch (erro) {
          console.error(erro);
          return json({ erro: erro instanceof Error ? erro.message : "Falha na limpeza." }, 500);
        }
      },
    },
  },
});
