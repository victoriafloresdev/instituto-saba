import { createFileRoute } from "@tanstack/react-router";
import { fetchPublishedSpectacles } from "@/lib/site-content";

/**
 * GET /sitemap.xml — lista das páginas públicas, para os buscadores.
 * As páginas de cada espetáculo vêm do banco, então um espetáculo novo
 * entra sozinho quando é publicado. Ficam de fora o painel e os endereços
 * que só redirecionam (/elenco e /espetaculo).
 */
const PAGINAS = [
  "/",
  "/sobre",
  "/projeto",
  "/programacao",
  "/audicoes",
  "/escolas",
  "/patrocinio",
  "/patrocinadores",
  "/contato",
  "/privacidade",
];

const escapar = (texto: string) =>
  texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // O domínio vem da build (SITE_URL ou o domínio de produção da Vercel).
        // Sem ele, como no ambiente local, usa o endereço do próprio pedido.
        const site = __SITE_URL__ || new URL(request.url).origin;
        const espetaculos = await fetchPublishedSpectacles();

        const urls = [
          ...PAGINAS.map((caminho) => ({ caminho, atualizado: null as string | null })),
          ...espetaculos.map((e) => ({
            caminho: `/espetaculo/${e.slug}`,
            atualizado: e.updated_at,
          })),
        ];

        const corpo = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls.map(({ caminho, atualizado }) =>
            [
              "  <url>",
              `    <loc>${escapar(site + caminho)}</loc>`,
              atualizado ? `    <lastmod>${atualizado.slice(0, 10)}</lastmod>` : null,
              "  </url>",
            ]
              .filter(Boolean)
              .join("\n"),
          ),
          "</urlset>",
          "",
        ].join("\n");

        return new Response(corpo, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            // Uma hora no cache da Vercel: o banco não é consultado a cada visita.
            "cache-control": "public, max-age=0, s-maxage=3600",
          },
        });
      },
    },
  },
});
