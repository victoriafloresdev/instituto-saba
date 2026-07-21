import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { A as ArrowRight, k as Building2 } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Section } from "./Section-CKYAUsRZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/patrocinadores-mrDjcvPY.js
var import_jsx_runtime = require_jsx_runtime();
function Patrocinadores() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		eyebrow: "Quem faz acontecer",
		title: "Nossos patrocinadores.",
		subtitle: "Empresas e pessoas que escolhem investir na cultura, na dança e nas oportunidades para jovens artistas.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-8 md:p-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-6 w-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Patrocínio master"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-3xl",
						children: "Máquinas Bolbi Ltda."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 leading-relaxed text-muted-foreground",
					children: "Citada no material do Instituto Cultural Sabá como patrocinadora master. Empresa fundada em Belo Horizonte em 1954, atualmente administrada pela terceira geração da família Biskupski."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
		})
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
//#endregion
export { Patrocinadores as component };
