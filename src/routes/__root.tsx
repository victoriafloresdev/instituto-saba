import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-5xl">Página não encontrada</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          O conteúdo que você procura não existe ou foi movido.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Voltar para o início
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl">Algo deu errado</h1>
        <p className="mt-2 text-sm text-muted-foreground">Tente novamente em instantes.</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Instituto Cultural Saba — Dança, cultura e impacto social" },
      {
        name: "description",
        content:
          "Instituto Cultural Saba — projeto de dança contemplado pela Lei Rouanet em Belo Horizonte. Programação, audições, patrocínio e ações com escolas públicas.",
      },
      { property: "og:title", content: "Instituto Cultural Saba" },
      { property: "og:description", content: "Dança, cultura e impacto social em movimento." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: `${__SITE_URL__}/og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Instituto Cultural Saba — O futuro da dança começa aqui.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${__SITE_URL__}/og-image.jpg` },
      { name: "theme-color", content: "#121212" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", href: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      // As duas fontes do manual são servidas pelo próprio site (styles.css).
      // Pré-carregadas para o título da primeira dobra não trocar de fonte.
      {
        rel: "preload",
        href: "/fonts/montserrat-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/open-sans-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
    // Marca o documento como capaz de animar antes da primeira pintura.
    // Sem isso, os estados escondidos das revelações nunca são aplicados
    // e o conteúdo aparece direto — nada fica invisível se o JS falhar.
    scripts: [{ children: "document.documentElement.classList.add('js')" }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    // A classe "js" é aplicada por um script antes da hidratação, de propósito.
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutSwitch />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}

function LayoutSwitch() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");
  useReveal(!isAdmin);
  if (isAdmin) return <Outlet />;
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-laranja focus:px-4 focus:py-2 focus:text-tinta"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
