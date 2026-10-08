import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

// Endereço público do site, para as imagens de compartilhamento (og:image),
// que precisam de URL absoluta. SITE_URL vale quando houver domínio próprio;
// sem ele, usa o domínio de produção que a Vercel informa na build.
const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "");

export default defineConfig(({ command }) => ({
  define: { __SITE_URL__: JSON.stringify(siteUrl.replace(/\/$/, "")) },
  server: { host: "::", port: 8080 },
  resolve: {
    alias: { "@": `${process.cwd()}/src` },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Redireciona a entrada de servidor do TanStack Start para src/server.ts
      // (o wrapper de erros de SSR).
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
    }),
    // Saída de produção no formato da Vercel.
    // A limpeza das audições (LGPD) roda todo dia às 6h UTC (3h em Brasília).
    ...(command === "build"
      ? [
          nitro({
            preset: "vercel",
            vercel: {
              config: {
                version: 3,
                crons: [{ path: "/api/limpeza-audicoes", schedule: "0 6 * * *" }],
              },
            },
          }),
        ]
      : []),
    viteReact(),
  ],
}));
