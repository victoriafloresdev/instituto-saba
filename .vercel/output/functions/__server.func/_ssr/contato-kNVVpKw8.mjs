import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { l as MapPin, m as Instagram, s as MessageCircle, u as Mail, w as CircleCheck } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./supabase-BsWcV1lP.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Label, t as Input } from "./label-B7oQAA24.mjs";
import { t as Section } from "./Section-CKYAUsRZ.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contato-kNVVpKw8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Contato() {
	const [sent, setSent] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		const form = e.currentTarget;
		const fd = new FormData(form);
		const data = Object.fromEntries(fd.entries());
		const { error } = await supabase.from("contact_messages").insert({
			nome: String(data.nome),
			email: String(data.email),
			assunto: String(data.assunto),
			mensagem: String(data.mensagem)
		});
		if (error) {
			toast.error("Não foi possível enviar a mensagem. Tente novamente.");
			return;
		}
		form.reset();
		setSent(true);
		toast.success("Mensagem enviada com sucesso.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		eyebrow: "Contato",
		title: "Fale com o Instituto.",
		subtitle: "Estamos abertos a parcerias, convites, imprensa, audições e patrocínio cultural.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-10 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
						icon: Mail,
						title: "E-mail",
						text: "institutoculturalsaba@gmail.com"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
						icon: MessageCircle,
						title: "WhatsApp",
						text: "(31) 98430-4111"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
						icon: MapPin,
						title: "Sede",
						text: "Belo Horizonte — Minas Gerais"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
						icon: Instagram,
						title: "Redes sociais",
						text: "Instagram, Twitter, Facebook e LinkedIn"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "lg:col-span-3 p-8",
				children: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10 text-primary mx-auto" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 text-2xl",
							children: "Mensagem recebida"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted-foreground",
							children: "Retornaremos assim que possível."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "grid gap-5 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nome",
							name: "nome",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "E-mail",
							name: "email",
							type: "email",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Assunto",
							name: "assunto",
							required: true,
							className: "sm:col-span-2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "mb-2 block text-sm",
								children: "Mensagem"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								name: "mensagem",
								rows: 5,
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "lg",
								children: "Enviar mensagem"
							})
						})
					]
				})
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		tone: "ink",
		title: "Vamos caminhar juntos.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTABox, {
					title: "Patrocinadores",
					text: "Conheça quem já apoia o Instituto ou veja como patrocinar via Lei Rouanet.",
					to: "/patrocinadores",
					cta: "Ver patrocinadores"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTABox, {
					title: "Artistas",
					text: "Inscreva-se para audições e integre o processo criativo.",
					to: "/audicoes",
					cta: "Fazer inscrição"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTABox, {
					title: "Escolas públicas",
					text: "Traga as ações culturais do Instituto para sua escola.",
					to: "/escolas",
					cta: "Cadastrar escola"
				})
			]
		})
	})] });
}
function InfoRow({ icon: Icon, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.16em] text-muted-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 text-foreground",
			children: text
		})] })]
	});
}
function CTABox({ title, text, to, cta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[1.25rem] border border-foreground/20 bg-background p-7 shadow-[5px_5px_0_rgb(32_33_31_/_18%)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl leading-none text-primary",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-foreground/85 text-sm font-medium leading-relaxed",
				children: text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "sm",
				className: "mt-6 bg-primary text-foreground hover:bg-primary/85",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to,
					children: cta
				})
			})
		]
	});
}
function Field({ label, name, type = "text", required, className }) {
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
			required
		})]
	});
}
//#endregion
export { Contato as component };
