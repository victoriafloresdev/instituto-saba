import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { c as Menu, m as Instagram, n as X, s as MessageCircle, t as Youtube, u as Mail } from "../_libs/lucide-react.mjs";
import { A as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$14 } from "./admin.registro._tipo._id-BGhAJVeQ.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CKUVtu-C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BevEgQ0F.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
var nav = [
	{
		to: "/",
		label: "Início"
	},
	{
		to: "/sobre",
		label: "Sobre"
	},
	{
		to: "/programacao",
		label: "Programação"
	},
	{
		to: "/patrocinadores",
		label: "Patrocinadores"
	},
	{
		to: "/elenco",
		label: "Elenco"
	},
	{
		to: "/audicoes",
		label: "Audições"
	},
	{
		to: "/escolas",
		label: "Escolas"
	},
	{
		to: "/contato",
		label: "Contato"
	}
];
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x flex h-16 items-center justify-between gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2 group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg",
						children: "S"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "hidden sm:flex flex-col leading-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg text-foreground",
							children: "Instituto Sabá"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] tracking-[0.2em] uppercase text-muted-foreground",
							children: "Cultural · Dança"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden lg:flex items-center gap-6",
					children: nav.map((n) => {
						const active = pathname === n.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: n.to,
							className: `text-sm transition-colors hover:text-primary ${active ? "text-primary" : "text-foreground/80"}`,
							children: n.label
						}, n.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden lg:flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/audicoes",
							children: "Audições"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/patrocinio",
							children: "Seja patrocinador"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border",
					onClick: () => setOpen(!open),
					"aria-label": "Menu",
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:hidden border-t border-border bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x py-4 flex flex-col gap-1",
				children: [nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: n.to,
					onClick: () => setOpen(false),
					className: "py-2 text-sm text-foreground/85 hover:text-primary",
					children: n.label
				}, n.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "flex-1",
						onClick: () => setOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/audicoes",
							children: "Audições"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "flex-1",
						onClick: () => setOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/patrocinio",
							children: "Patrocinar"
						})
					})]
				})]
			})
		})]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-foreground/20 bg-saba-pink text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x py-16 grid gap-10 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-9 w-9 place-items-center rounded-full bg-accent text-ink font-display text-lg",
								children: "S"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl",
								children: "Instituto Cultural Sabá"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-sm text-foreground/70 leading-relaxed",
							children: "O Instituto Cultural Sabá fortalece a dança brasileira e revela os talentos jovens do país para o mundo."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#",
									className: "grid h-9 w-9 place-items-center rounded-full border border-foreground/25 hover:bg-foreground hover:text-saba-pink",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#",
									className: "grid h-9 w-9 place-items-center rounded-full border border-foreground/25 hover:bg-foreground hover:text-saba-pink",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#",
									className: "grid h-9 w-9 place-items-center rounded-full border border-foreground/25 hover:bg-foreground hover:text-saba-pink",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#",
									className: "grid h-9 w-9 place-items-center rounded-full border border-foreground/25 hover:bg-foreground hover:text-saba-pink",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" })
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.18em] text-foreground/55",
					children: "Navegação"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/sobre",
							className: "hover:text-primary",
							children: "Sobre"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/programacao",
							className: "hover:text-primary",
							children: "Programação"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/elenco",
							className: "hover:text-primary",
							children: "Elenco & Equipe"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.18em] text-foreground/55",
					children: "Participe"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/audicoes",
							className: "hover:text-primary",
							children: "Audições"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/patrocinadores",
							className: "hover:text-primary",
							children: "Patrocinadores"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/patrocinio",
							className: "hover:text-primary",
							children: "Seja patrocinador"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/escolas",
							className: "hover:text-primary",
							children: "Escolas públicas"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contato",
							className: "hover:text-primary",
							children: "Contato"
						}) })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-foreground/15",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-foreground/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Instituto Cultural Sabá. Todos os direitos reservados."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Belo Horizonte · Minas Gerais · Brasil" })]
			})
		})]
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-5xl",
					children: "Página não encontrada"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "O conteúdo que você procura não existe ou foi movido."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90",
					children: "Voltar para o início"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl",
					children: "Algo deu errado"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Tente novamente em instantes."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						router.invalidate();
						reset();
					},
					className: "mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90",
					children: "Tentar novamente"
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Instituto Cultural Sabá — Dança, cultura e impacto social" },
			{
				name: "description",
				content: "Instituto Cultural Sabá — projeto de dança contemplado pela Lei Rouanet em Belo Horizonte. Programação, audições, patrocínio e ações com escolas públicas."
			},
			{
				property: "og:title",
				content: "Instituto Cultural Sabá"
			},
			{
				property: "og:description",
				content: "Dança, cultura e impacto social em movimento."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutSwitch, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-center",
			richColors: true
		})]
	});
}
function LayoutSwitch() {
	if (useRouterState({ select: (s) => s.location.pathname }).startsWith("/admin")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
var $$splitComponentImporter$12 = () => import("./sobre-BcEJly49.mjs");
var Route$12 = createFileRoute("/sobre")({
	head: () => ({ meta: [{ title: "Instituto e projeto — Instituto Cultural Sabá" }, {
		name: "description",
		content: "Conheça o Instituto Cultural Sabá, Marina Sabá e o projeto Ballet Dom Quixote."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./projeto-HZqFL24M.mjs");
var Route$11 = createFileRoute("/projeto")({
	beforeLoad: () => {
		throw redirect({ to: "/sobre" });
	},
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./programacao-fhpLHGBi.mjs");
var Route$10 = createFileRoute("/programacao")({
	head: () => ({ meta: [
		{ title: "Programação — Instituto Cultural Sabá" },
		{
			name: "description",
			content: "Datas, horários e locais das apresentações do Instituto Cultural Sabá."
		},
		{
			property: "og:title",
			content: "Programação — Instituto Cultural Sabá"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./patrocinio-iA_fI9mX.mjs");
var Route$9 = createFileRoute("/patrocinio")({
	head: () => ({ meta: [{ title: "Seja patrocinador — Instituto Cultural Sabá" }, {
		name: "description",
		content: "Apoie o Ballet Dom Quixote por meio da Lei Federal de Incentivo à Cultura."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./patrocinadores-mrDjcvPY.mjs");
var Route$8 = createFileRoute("/patrocinadores")({
	head: () => ({ meta: [{ title: "Patrocinadores — Instituto Cultural Sabá" }, {
		name: "description",
		content: "Conheça quem apoia o Instituto Cultural Sabá e o Ballet Dom Quixote."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./espetaculo-C93OmVu2.mjs");
var Route$7 = createFileRoute("/espetaculo")({
	head: () => ({ meta: [{ title: "Ballet Dom Quixote — Instituto Cultural Sabá" }, {
		name: "description",
		content: "Informações sobre o espetáculo Ballet Dom Quixote."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./escolas-C5AwvTRd.mjs");
var Route$6 = createFileRoute("/escolas")({
	head: () => ({ meta: [
		{ title: "Escolas públicas — Instituto Cultural Sabá" },
		{
			name: "description",
			content: "Cadastre sua escola pública para participar de oficinas, ensaios e apresentações."
		},
		{
			property: "og:title",
			content: "Escolas públicas — Instituto Cultural Sabá"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./elenco-LyLmqCZX.mjs");
var Route$5 = createFileRoute("/elenco")({
	head: () => ({ meta: [
		{ title: "Elenco & Equipe — Instituto Cultural Sabá" },
		{
			name: "description",
			content: "Conheça o elenco, direção, produção e equipe técnica do Instituto Cultural Sabá."
		},
		{
			property: "og:title",
			content: "Elenco & Equipe — Instituto Cultural Sabá"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./contato-kNVVpKw8.mjs");
var Route$4 = createFileRoute("/contato")({
	head: () => ({ meta: [
		{ title: "Contato — Instituto Cultural Sabá" },
		{
			name: "description",
			content: "Fale com o Instituto Cultural Sabá."
		},
		{
			property: "og:title",
			content: "Contato — Instituto Cultural Sabá"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./audicoes-FZhhJcFa.mjs");
var Route$3 = createFileRoute("/audicoes")({
	head: () => ({ meta: [
		{ title: "Audições — Instituto Cultural Sabá" },
		{
			name: "description",
			content: "Inscreva-se para as audições do Instituto Cultural Sabá."
		},
		{
			property: "og:title",
			content: "Audições — Instituto Cultural Sabá"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./routes-CkuysJjZ.mjs");
var Route$2 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Instituto Cultural Sabá — Dança, cultura e impacto social" }, {
		name: "description",
		content: "Instituto Cultural Sabá: formação, visibilidade e oportunidades para jovens talentos da dança brasileira."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./admin.index-gxOQPpWQ.mjs");
var Route$1 = createFileRoute("/admin/")({
	head: () => ({ meta: [{ title: "Admin — Instituto Cultural Sabá" }, {
		name: "robots",
		content: "noindex,nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin.dashboard-BGsM7ifK.mjs");
var Route = createFileRoute("/admin/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — Admin Instituto Sabá" }, {
		name: "robots",
		content: "noindex,nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var SobreRoute = Route$12.update({
	id: "/sobre",
	path: "/sobre",
	getParentRoute: () => Route$13
});
var ProjetoRoute = Route$11.update({
	id: "/projeto",
	path: "/projeto",
	getParentRoute: () => Route$13
});
var ProgramacaoRoute = Route$10.update({
	id: "/programacao",
	path: "/programacao",
	getParentRoute: () => Route$13
});
var PatrocinioRoute = Route$9.update({
	id: "/patrocinio",
	path: "/patrocinio",
	getParentRoute: () => Route$13
});
var PatrocinadoresRoute = Route$8.update({
	id: "/patrocinadores",
	path: "/patrocinadores",
	getParentRoute: () => Route$13
});
var EspetaculoRoute = Route$7.update({
	id: "/espetaculo",
	path: "/espetaculo",
	getParentRoute: () => Route$13
});
var EscolasRoute = Route$6.update({
	id: "/escolas",
	path: "/escolas",
	getParentRoute: () => Route$13
});
var ElencoRoute = Route$5.update({
	id: "/elenco",
	path: "/elenco",
	getParentRoute: () => Route$13
});
var ContatoRoute = Route$4.update({
	id: "/contato",
	path: "/contato",
	getParentRoute: () => Route$13
});
var AudicoesRoute = Route$3.update({
	id: "/audicoes",
	path: "/audicoes",
	getParentRoute: () => Route$13
});
var IndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var AdminIndexRoute = Route$1.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => Route$13
});
var rootRouteChildren = {
	IndexRoute,
	AudicoesRoute,
	ContatoRoute,
	ElencoRoute,
	EscolasRoute,
	EspetaculoRoute,
	PatrocinadoresRoute,
	PatrocinioRoute,
	ProgramacaoRoute,
	ProjetoRoute,
	SobreRoute,
	AdminDashboardRoute: Route.update({
		id: "/admin/dashboard",
		path: "/admin/dashboard",
		getParentRoute: () => Route$13
	}),
	AdminIndexRoute,
	AdminRegistroTipoIdRoute: Route$14.update({
		id: "/admin/registro/$tipo/$id",
		path: "/admin/registro/$tipo/$id",
		getParentRoute: () => Route$13
	})
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
