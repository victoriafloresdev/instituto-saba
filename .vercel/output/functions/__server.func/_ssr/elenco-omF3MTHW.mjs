import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Section } from "./Section-CKYAUsRZ.mjs";
import { t as ImagePlaceholder } from "./ImagePlaceholder-BCLwpPOg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/elenco-omF3MTHW.js
var import_jsx_runtime = require_jsx_runtime();
var elenco = [
	{
		nome: "Marina Sabá",
		funcao: "Produção",
		bio: "Bailarina, empresária, advogada e idealizadora do Instituto Cultural Sabá."
	},
	{
		nome: "Daphne Chequer",
		funcao: "Produção",
		bio: "Profissional da cena cultural, produtora e diretora artística da Marilu Dias Escola de Dança."
	},
	{
		nome: "Tíndaro Silvano",
		funcao: "Direção geral",
		bio: "Coreógrafo com trajetória no Ballet Guaíra, Ballet Gulbenkian e Ballet do Theatro Municipal."
	},
	{
		nome: "Everson Botelho (Beka)",
		funcao: "Direção artística",
		bio: "Bailarino, professor e diretor artístico com apresentações em mais de 35 países."
	},
	{
		nome: "Maria Vakhrusheva",
		funcao: "Remontagem",
		bio: "Formada pela Academia Vaganova, com atuação internacional como bailarina, professora e ensaiadora."
	},
	{
		nome: "Renata Araujo",
		funcao: "Equipe artística",
		bio: "Professora, ensaiadora e coreógrafa, dedicada à formação de novos bailarinos."
	},
	{
		nome: "Natalia Samarino",
		funcao: "Historiadora da dança",
		bio: "Bailarina, diretora artística do Pas de Quatre Centro de Dança e autora de Histórias do Ballet."
	}
];
function Elenco() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		eyebrow: "Elenco & Equipe",
		title: "A equipe de Ballet Dom Quixote.",
		subtitle: "Profissionais reunidos para a remontagem do clássico do ballet de repertório, com seleção pública de bailarinos e convidados internacionais.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-4",
			children: elenco.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "group",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlaceholder, {
					label: p.nome.split(" ")[0],
					aspect: "3/4"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
					className: "mt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl leading-tight",
							children: p.nome
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs uppercase tracking-[0.14em] text-primary",
							children: p.funcao
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground leading-relaxed",
							children: p.bio
						})
					]
				})]
			}, p.nome))
		})
	});
}
//#endregion
export { Elenco as component };
