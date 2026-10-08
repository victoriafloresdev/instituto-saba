/**
 * Recursos que existem no código mas ficam desligados até serem configurados.
 *
 * EMAIL_AOS_APROVADOS — envio de e-mail aos aprovados na audição, pelo painel.
 * Desligado até o domínio do Instituto ser verificado no Resend e as
 * variáveis RESEND_API_KEY e EMAIL_REMETENTE existirem na Vercel (ver
 * GUIA_DOMINIO_E_EMAIL.md, passo 3). Desligado, o painel esconde a seleção
 * e o botão, a página da inscrição esconde o histórico de envios, a
 * política de privacidade não cita o Resend e a rota /api/audicoes/email
 * recusa qualquer pedido. Para ligar, basta trocar para true.
 */
export const EMAIL_AOS_APROVADOS = false;
