import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as supabase } from "./supabase-BsWcV1lP.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { N as CircleCheck } from "../_libs/lucide-react.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { n as Label, t as Input } from "./input-DoulQRPp.mjs";
import { c as isValidPhone, i as isIntegerBetween, l as isWithinLength, n as Textarea, o as isValidEmail, r as formString, s as isValidHttpUrl, t as FORM_LIMITS } from "./form-validation-C4KIeSub.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Section } from "./Section-CKYAUsRZ.mjs";
import { t as Checkbox } from "./checkbox-kt6FvQcE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audicoes-Crc8_OQ7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Audicoes() {
	const [sent, setSent] = (0, import_react.useState)(false);
	const [consent, setConsent] = (0, import_react.useState)(false);
	const [modalidade, setModalidade] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		if (submitting) return;
		if (!consent) {
			toast.error("É necessário aceitar o consentimento de dados.");
			return;
		}
		const form = e.currentTarget;
		const data = new FormData(form);
		if (formString(data, "website")) return;
		const nome = formString(data, "nome");
		const email = formString(data, "email");
		const whatsapp = formString(data, "whatsapp");
		const idade = formString(data, "idade");
		const cidade = formString(data, "cidade");
		const experiencia = formString(data, "experiencia");
		const portfolio = formString(data, "portfolio");
		const mensagem = formString(data, "mensagem");
		if (!isWithinLength(nome, FORM_LIMITS.name) || !isValidEmail(email) || !isValidPhone(whatsapp)) {
			toast.error("Confira nome, e-mail e WhatsApp antes de enviar.");
			return;
		}
		if (!isIntegerBetween(idade, 1, 120)) {
			toast.error("Informe uma idade válida entre 1 e 120 anos.");
			return;
		}
		if (!isWithinLength(cidade, FORM_LIMITS.city) || !isWithinLength(experiencia, FORM_LIMITS.message, 0) || !isWithinLength(mensagem, FORM_LIMITS.message, 0)) {
			toast.error("Revise os campos de texto: há um limite de caracteres excedido.");
			return;
		}
		if (!isValidHttpUrl(portfolio) || portfolio.length > FORM_LIMITS.portfolio) {
			toast.error("Informe um link de portfólio válido (http:// ou https://).");
			return;
		}
		setSubmitting(true);
		try {
			const { error } = await supabase.from("auditions").insert({
				nome,
				email,
				whatsapp,
				idade: Number(idade),
				cidade,
				modalidade: modalidade || null,
				experiencia: experiencia || null,
				portfolio: portfolio || null,
				mensagem: mensagem || null
			});
			if (error) {
				toast.error("Não foi possível enviar sua inscrição. Tente novamente.");
				return;
			}
			form.reset();
			setModalidade("");
			setConsent(false);
			setSent(true);
			toast.success("Inscrição enviada com sucesso.");
		} catch {
			toast.error("Não foi possível enviar sua inscrição. Tente novamente.");
		} finally {
			setSubmitting(false);
		}
	}
	if (sent) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-xl mx-auto text-center p-10 rounded-xl border border-border bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10 text-primary mx-auto" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 text-3xl",
				children: "Inscrição recebida!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: "Obrigado por se inscrever. A equipe do Instituto Cultural Sabá entrará em contato pelo e-mail informado."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6",
				onClick: () => setSent(false),
				children: "Fazer nova inscrição"
			})
		]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		eyebrow: "Audições",
		title: "Faça sua inscrição.",
		subtitle: "O elenco do Ballet Dom Quixote será formado por bailarinos profissionais selecionados por audição pública e convidados de renome internacional.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-10 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 space-y-5 text-muted-foreground leading-relaxed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Este formulário registra seu interesse em participar das próximas audições do Instituto Cultural Sabá." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Seleção de elenco por audição pública" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Produção prevista para Belo Horizonte" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Informações de data e critérios serão comunicadas pela equipe" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: "A inscrição não substitui um edital ou convocação oficial; a equipe entrará em contato caso haja uma etapa compatível com o seu perfil."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "lg:col-span-3 p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "grid gap-5 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "website",
							tabIndex: -1,
							autoComplete: "off",
							"aria-hidden": "true",
							className: "hidden"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nome completo",
							name: "nome",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "E-mail",
							name: "email",
							type: "email",
							required: true,
							maxLength: FORM_LIMITS.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "WhatsApp",
							name: "whatsapp",
							required: true,
							maxLength: FORM_LIMITS.phone
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Idade",
							name: "idade",
							type: "number",
							required: true,
							min: 1,
							max: 120
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Cidade",
							name: "cidade",
							required: true,
							maxLength: FORM_LIMITS.city
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "mb-2 block text-sm",
							children: "Modalidade artística"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: modalidade,
							onValueChange: setModalidade,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
								"Dança contemporânea",
								"Dança urbana",
								"Balé clássico",
								"Jazz",
								"Afro-brasileira",
								"Dança-teatro",
								"Outra"
							].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: m,
								children: m
							}, m)) })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "mb-2 block text-sm",
								children: "Experiência"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								name: "experiencia",
								rows: 3,
								maxLength: FORM_LIMITS.message,
								placeholder: "Formação, cias, projetos anteriores..."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Link de vídeo ou portfólio",
							name: "portfolio",
							className: "sm:col-span-2",
							maxLength: FORM_LIMITS.portfolio,
							placeholder: "https://..."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "mb-2 block text-sm",
								children: "Mensagem / observações"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								name: "mensagem",
								rows: 3,
								maxLength: FORM_LIMITS.message
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "sm:col-span-2 flex gap-3 items-start text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								checked: consent,
								onCheckedChange: (v) => setConsent(!!v),
								className: "mt-0.5"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Autorizo o uso dos meus dados para fins de contato e processo seletivo, conforme LGPD." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "lg",
								disabled: submitting,
								className: "w-full sm:w-auto",
								children: submitting ? "Enviando…" : "Enviar inscrição"
							})
						})
					]
				})
			})]
		})
	});
}
function Field({ label, name, type = "text", required, className, placeholder, maxLength, min, max }) {
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
			placeholder,
			maxLength,
			min,
			max
		})]
	});
}
//#endregion
export { Audicoes as component };
