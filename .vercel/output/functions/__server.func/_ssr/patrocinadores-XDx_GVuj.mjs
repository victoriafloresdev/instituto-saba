import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { n as SPONSOR_TYPE_LABELS, r as SPONSOR_TYPE_ORDER, v as siteAssetUrl } from "./site-content-owwry4dq.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { B as ArrowRight, k as ExternalLink, z as Building2 } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Section } from "./Section-CKYAUsRZ.mjs";
import { t as Route } from "./patrocinadores-CTHPHLsP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/patrocinadores-XDx_GVuj.js
var import_jsx_runtime = require_jsx_runtime();
function Patrocinadores() {
	const { sponsors } = Route.useLoaderData();
	const masters = sponsors.filter((s) => s.sponsor_type === "master");
	const others = SPONSOR_TYPE_ORDER.filter((type) => type !== "master").flatMap((type) => sponsors.filter((s) => s.sponsor_type === type));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		eyebrow: "Quem faz acontecer",
		title: "Nossos patrocinadores.",
		subtitle: "Empresas e pessoas que escolhem investir na cultura, na dança e nas oportunidades para jovens artistas.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 md:grid-cols-2",
			children: [masters.map((sponsor) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MasterCard, { sponsor }, sponsor.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-56 items-center justify-center border border-dashed border-foreground/35 bg-muted/65 p-8 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl",
						children: "Sua marca pode estar aqui."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-sm text-sm leading-relaxed text-foreground/75",
						children: "Associe sua empresa a uma produção cultural de grande porte e à formação de novos talentos."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-6 bg-foreground text-saba-pink hover:bg-foreground/85",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/patrocinio",
							children: "Seja um patrocinador"
						})
					})
				] })
			})]
		}), others.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
			children: others.map((sponsor) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SponsorCard, { sponsor }, sponsor.id))
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		tone: "ink",
		title: "A arte agradece o seu patrocínio.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-start justify-between gap-6 md:flex-row md:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-foreground/75",
				children: "O apoio ao Ballet Dom Quixote gera visibilidade de marca, benefícios fiscais e impacto social por meio da Lei Rouanet."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "lg",
				className: "bg-foreground text-saba-pink hover:bg-foreground/85",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/patrocinio",
					children: ["Seja um patrocinador ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })]
				})
			})]
		})
	})] });
}
function SponsorLogo({ sponsor, imgClassName = "h-12 w-auto max-w-40" }) {
	const url = siteAssetUrl(sponsor.logo_path);
	if (!url) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-6 w-6" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: url,
		alt: sponsor.logo_alt || sponsor.name,
		loading: "lazy",
		className: `object-contain object-left ${imgClassName}`
	});
}
function MasterCard({ sponsor }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-8 md:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SponsorLogo, { sponsor }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: SPONSOR_TYPE_LABELS[sponsor.sponsor_type]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-3xl",
					children: sponsor.name
				})] })]
			}),
			sponsor.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 leading-relaxed text-muted-foreground",
				children: sponsor.description
			}),
			sponsor.website_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				size: "sm",
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: sponsor.website_url,
					target: "_blank",
					rel: "noreferrer",
					children: ["Visitar site ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "ml-1 h-3.5 w-3.5" })]
				})
			})
		]
	});
}
function SponsorCard({ sponsor }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "flex flex-col p-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SponsorLogo, {
				sponsor,
				imgClassName: "h-14 w-auto max-w-44"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-xs uppercase tracking-[0.14em] text-primary",
				children: SPONSOR_TYPE_LABELS[sponsor.sponsor_type]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 text-2xl leading-tight",
				children: sponsor.name
			}),
			sponsor.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted-foreground",
				children: sponsor.description
			}),
			sponsor.website_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: sponsor.website_url,
				target: "_blank",
				rel: "noreferrer",
				className: "mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline",
				children: ["Visitar site ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" })]
			})
		]
	});
}
//#endregion
export { Patrocinadores as component };
