import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { w as CircleCheck } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./supabase-BsWcV1lP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Label, t as Input } from "./label-B7oQAA24.mjs";
import { t as Section } from "./Section-CKYAUsRZ.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { t as Checkbox } from "./checkbox-kt6FvQcE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/escolas-C5AwvTRd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Escolas() {
	const [sent, setSent] = (0, import_react.useState)(false);
	const [consent, setConsent] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		if (!consent) {
			toast.error("É necessário aceitar o consentimento de dados.");
			return;
		}
		const form = e.currentTarget;
		const fd = new FormData(form);
		const data = Object.fromEntries(fd.entries());
		const { error } = await supabase.from("school_registrations").insert({
			escola: String(data.escola),
			responsavel: String(data.responsavel),
			cargo: String(data.cargo),
			email: String(data.email),
			whatsapp: String(data.whatsapp),
			cidade: String(data.cidade),
			alunos: Number(data.alunos),
			faixa: String(data.faixa),
			mensagem: String(data.mensagem || "") || null
		});
		if (error) {
			toast.error("Não foi possível enviar o cadastro. Tente novamente.");
			return;
		}
		form.reset();
		setSent(true);
		toast.success("Cadastro enviado com sucesso.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		eyebrow: "Escolas públicas",
		title: "Cultura viva dentro da sala de aula.",
		subtitle: "O projeto prevê uma sessão exclusiva do Ballet Dom Quixote para crianças de escolas públicas, com transporte e lanche para os estudantes convidados.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-3 md:items-start",
			children: [
				{
					n: "01",
					t: "Espetáculo exclusivo",
					d: "Uma sessão destinada a crianças de escolas públicas.",
					c: "bg-primary border-primary md:-translate-y-5"
				},
				{
					n: "02",
					t: "Transporte",
					d: "O projeto prevê transporte para os estudantes convidados.",
					c: "bg-saba-pink border-saba-pink md:translate-y-5"
				},
				{
					n: "03",
					t: "Lanche",
					d: "O projeto prevê lanche para as crianças participantes.",
					c: "bg-background border-foreground/25"
				}
			].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: `relative min-h-80 overflow-hidden rounded-[1.75rem] border p-8 shadow-[9px_9px_0_var(--foreground)] ${b.c}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-7xl leading-none tracking-[-0.08em] text-foreground sm:text-8xl",
					children: b.n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-0 left-0 right-0 border-t border-foreground/15 bg-background/25 p-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-[0.14em] text-foreground/70",
						children: b.t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-base font-medium leading-relaxed text-foreground/90",
						children: b.d
					})]
				})]
			}, b.t))
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		tone: "muted",
		eyebrow: "Cadastro",
		title: "Inscreva sua escola.",
		children: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-xl mx-auto text-center p-10 rounded-xl border border-border bg-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10 text-primary mx-auto" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-4 text-2xl",
					children: "Cadastro recebido"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: "Nossa equipe entrará em contato pelos dados informados para articular a ação cultural."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "p-8 max-w-3xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "grid gap-5 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nome da escola",
						name: "escola",
						required: true,
						className: "sm:col-span-2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nome do responsável",
						name: "responsavel",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Cargo",
						name: "cargo",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "E-mail",
						name: "email",
						type: "email",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "WhatsApp",
						name: "whatsapp",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Cidade",
						name: "cidade",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nº estimado de alunos",
						name: "alunos",
						type: "number",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Faixa etária dos alunos",
						name: "faixa",
						required: true,
						className: "sm:col-span-2",
						placeholder: "Ex: 8 a 14 anos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "mb-2 block text-sm",
							children: "Mensagem"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							name: "mensagem",
							rows: 4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "sm:col-span-2 flex gap-3 items-start text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							checked: consent,
							onCheckedChange: (v) => setConsent(!!v),
							className: "mt-0.5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Autorizo o uso dos dados da escola para articulação da ação cultural, conforme LGPD." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "lg",
							children: "Enviar cadastro"
						})
					})
				]
			})
		})
	})] });
}
function Field({ label, name, type = "text", required, className, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
			htmlFor: name,
			className: "mb-2 block text-sm",
			children: [label, required && " *"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: name,
			name,
			type,
			required,
			placeholder
		})]
	});
}
//#endregion
export { Escolas as component };
