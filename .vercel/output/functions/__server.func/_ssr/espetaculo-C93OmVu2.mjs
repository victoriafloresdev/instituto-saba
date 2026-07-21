import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { O as Calendar, S as Clock, b as ExternalLink, l as MapPin } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Section } from "./Section-CKYAUsRZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/espetaculo-C93OmVu2.js
var import_jsx_runtime = require_jsx_runtime();
function Espetaculo() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			eyebrow: "Temporada 2026",
			title: "Ballet Dom Quixote.",
			subtitle: "Remontagem do clássico do ballet de repertório em Belo Horizonte, com bailarinos selecionados por audição pública e convidados de renome internacional.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-3",
				children: [
					{
						icon: Calendar,
						label: "Data",
						value: "Setembro de 2026"
					},
					{
						icon: Clock,
						label: "Horário",
						value: "Em breve"
					},
					{
						icon: MapPin,
						label: "Local",
						value: "Em breve · Belo Horizonte, MG"
					}
				].map(({ icon: Icon, label, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "rounded-[1.25rem] border-foreground/20 bg-muted/50 p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-xs font-bold uppercase tracking-[0.14em] text-foreground/60",
							children: label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xl font-bold leading-tight",
							children: value
						})
					]
				}, label))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			tone: "muted",
			eyebrow: "Sobre o espetáculo",
			title: "Uma grande produção em movimento.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5 leading-relaxed text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "O projeto preserva e celebra uma obra-prima do repertório clássico, ao mesmo tempo em que busca democratizar o acesso à arte e gerar oportunidades de trabalho para jovens talentos." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A produção prevê orquestra convidada, noite de abertura, exposição multicultural, envolvimento da comunidade acadêmica e uma contrapartida social para crianças de escolas públicas." })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-foreground/20 bg-saba-pink p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow text-primary",
							children: "Ingressos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-2xl font-bold leading-tight",
							children: "Informações sobre vendas serão divulgadas em breve."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-foreground/75",
							children: "O botão abaixo leva temporariamente à plataforma parceira."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-6 bg-foreground text-saba-pink hover:bg-foreground/85",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://www.sympla.com.br",
								target: "_blank",
								rel: "noreferrer",
								children: ["Ir para Sympla ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "ml-1 h-4 w-4" })]
							})
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/programacao",
				children: "Voltar para programação"
			})
		}) })
	] });
}
//#endregion
export { Espetaculo as component };
