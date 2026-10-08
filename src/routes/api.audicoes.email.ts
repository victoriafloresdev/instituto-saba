import { createFileRoute } from "@tanstack/react-router";

/**
 * POST /api/audicoes/email — envia o e-mail aos aprovados, a pedido do
 * painel. Só administradores; o painel manda o token da sessão.
 * Os módulos de servidor são importados dentro do handler, para nunca
 * entrarem no código que vai ao navegador.
 */
export const Route = createFileRoute("/api/audicoes/email")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { administradorDoPedido, json } = await import("@/server/supabase-servidor");
        const { enviarEmailsDeAudicao, validarPedido } = await import("@/server/emails-audicao");

        const { EMAIL_AOS_APROVADOS } = await import("@/lib/recursos");
        if (!EMAIL_AOS_APROVADOS) {
          return json({ erro: "O envio de e-mails aos aprovados está desativado." }, 503);
        }

        const admin = await administradorDoPedido(request);
        if (!admin) return json({ erro: "Acesso restrito a administradores." }, 401);

        const validado = validarPedido(await request.json().catch(() => null));
        if ("erro" in validado) return json({ erro: validado.erro }, 400);

        const resultado = await enviarEmailsDeAudicao(
          admin.supabase,
          admin.userId,
          validado.pedido,
        );
        if ("erro" in resultado) return json({ erro: resultado.erro }, resultado.status);
        return json(resultado);
      },
    },
  },
});
