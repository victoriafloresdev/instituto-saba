import { t as cn } from "./utils-C_uf36nf.mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { h as formatSpectacleTime, m as formatSpectacleLocation, p as formatSpectacleDate, v as siteAssetUrl } from "./site-content-owwry4dq.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { R as Calendar, j as Clock, k as ExternalLink, m as MapPin, r as Users } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Section } from "./Section-CKYAUsRZ.mjs";
import { t as ImagePlaceholder } from "./ImagePlaceholder-BCLwpPOg.mjs";
import { t as Route } from "./espetaculo._slug-BeJ-rV4M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/espetaculo._slug-njzOohwL.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Imagem vinda do painel administrativo. Enquanto o registro não tem arquivo,
* cai no placeholder já usado no restante do site.
*/
function StorageImage({ path, alt, label = "Imagem", aspect = "4/3", className }) {
	const url = siteAssetUrl(path);
	if (!url) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlaceholder, {
		label,
		aspect,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: url,
		alt: alt || label,
		loading: "lazy",
		className: cn("w-full rounded-xl border border-border object-cover", className),
		style: { aspectRatio: aspect }
	});
}
function EspetaculoDetalhe() {
	const { spectacle } = Route.useLoaderData();
	if (!spectacle) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		eyebrow: "Espetáculo",
		title: "Espetáculo não encontrado.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-xl leading-relaxed text-muted-foreground",
			children: "Este espetáculo não está disponível ou ainda não foi publicado."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/programacao",
				children: "Ver programação"
			})
		})]
	});
	const infos = [
		{
			icon: Calendar,
			label: "Data",
			value: formatSpectacleDate(spectacle)
		},
		{
			icon: Clock,
			label: "Horário",
			value: formatSpectacleTime(spectacle)
		},
		{
			icon: MapPin,
			label: "Local",
			value: formatSpectacleLocation(spectacle)
		}
	];
	if (spectacle.classification) infos.push({
		icon: Users,
		label: "Classificação",
		value: spectacle.classification
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			eyebrow: spectacle.subtitle || "Temporada",
			title: `${spectacle.title}.`,
			subtitle: spectacle.description || void 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: infos.map(({ icon: Icon, label, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
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
			}), spectacle.address && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm leading-relaxed text-muted-foreground",
				children: spectacle.address
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			tone: "muted",
			eyebrow: "Sobre o espetáculo",
			title: "Uma grande produção em movimento.",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-5 leading-relaxed text-muted-foreground",
					children: (spectacle.synopsis || spectacle.description).split(/\n{2,}/).filter(Boolean).map((paragraph, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: paragraph }, index))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-foreground/20 bg-saba-pink p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow text-primary",
						children: "Ingressos"
					}), spectacle.ticket_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-2xl font-bold leading-tight",
						children: "Ingressos disponíveis na plataforma oficial."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-6 bg-foreground text-saba-pink hover:bg-foreground/85",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: spectacle.ticket_url,
							target: "_blank",
							rel: "noreferrer",
							children: ["Comprar ingressos ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "ml-1 h-4 w-4" })]
						})
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-2xl font-bold leading-tight",
							children: "Informações sobre vendas serão divulgadas em breve."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-foreground/75",
							children: "Entre em contato com o Instituto para acompanhar a abertura da bilheteria."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-6 bg-foreground text-saba-pink hover:bg-foreground/85",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contato",
								children: "Falar com o Instituto"
							})
						})
					] })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StorageImage, {
					path: spectacle.image_path,
					alt: spectacle.image_alt,
					label: spectacle.title,
					aspect: "16/9"
				})
			})]
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
export { EspetaculoDetalhe as component };
