import { r as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as supabase } from "./supabase-BsWcV1lP.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { C as Info, M as Circle, N as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as Label, t as Input } from "./input-DoulQRPp.mjs";
import { a as isMoney, c as isValidPhone, l as isWithinLength, n as Textarea, o as isValidEmail, r as formString, t as FORM_LIMITS } from "./form-validation-C4KIeSub.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Section } from "./Section-CKYAUsRZ.mjs";
import { t as Checkbox } from "./checkbox-kt6FvQcE.mjs";
import { n as RadioGroupIndicator, r as RadioGroupItem$1, t as RadioGroup$1 } from "../_libs/@radix-ui/react-radio-group+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/patrocinio-aou1dvX-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup$1, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroup$1.displayName;
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem$1, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupIndicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupItem$1.displayName;
var fmtBRL = (v) => v.toLocaleString("pt-BR", {
	style: "currency",
	currency: "BRL",
	maximumFractionDigits: 2
});
var MAX_MONEY = 1e9;
function Patrocinio() {
	const [tipo, setTipo] = (0, import_react.useState)("PJ");
	const [momentoPF, setMomentoPF] = (0, import_react.useState)("ano-base");
	const [imposto, setImposto] = (0, import_react.useState)(1e5);
	const [interesse, setInteresse] = (0, import_react.useState)(2e4);
	const [sent, setSent] = (0, import_react.useState)(false);
	const [consent, setConsent] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const limitePct = tipo === "PJ" ? .04 : momentoPF === "ano-base" ? .06 : .03;
	const tetoIncentivo = (0, import_react.useMemo)(() => Math.max(0, imposto) * limitePct, [imposto, limitePct]);
	const incentivoEstimado = Math.min(Math.max(0, interesse), tetoIncentivo);
	async function submit(e) {
		e.preventDefault();
		if (submitting) return;
		if (!consent) return toast.error("É necessário aceitar o consentimento de dados.");
		const form = e.currentTarget;
		const data = new FormData(form);
		if (formString(data, "website")) return;
		const nome = formString(data, "nome");
		const empresa = formString(data, "empresa");
		const documento = formString(data, "documento");
		const email = formString(data, "email");
		const whatsapp = formString(data, "whatsapp");
		const valor = formString(data, "valor");
		const mensagem = formString(data, "mensagem");
		if (!isWithinLength(nome, FORM_LIMITS.name) || !isValidEmail(email) || !isValidPhone(whatsapp)) {
			toast.error("Confira nome, e-mail e WhatsApp antes de enviar.");
			return;
		}
		if (!isWithinLength(empresa, FORM_LIMITS.school, 0) || !isWithinLength(documento, FORM_LIMITS.document, 0) || !isWithinLength(mensagem, FORM_LIMITS.message, 0) || !isMoney(valor)) {
			toast.error("Revise os dados do patrocínio e os limites dos campos.");
			return;
		}
		setSubmitting(true);
		try {
			const { error } = await supabase.from("sponsorship_leads").insert({
				nome,
				empresa: empresa || null,
				documento: documento || null,
				email,
				whatsapp,
				valor: valor ? Number(valor) : null,
				mensagem: mensagem || null,
				tipo
			});
			if (error) {
				toast.error("Não foi possível registrar seu interesse. Tente novamente.");
				return;
			}
			form.reset();
			setConsent(false);
			setSent(true);
			toast.success("Recebemos seu interesse. Retornaremos em breve.");
		} catch {
			toast.error("Não foi possível registrar seu interesse. Tente novamente.");
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			eyebrow: "Seja patrocinador",
			title: "Invista em cultura. Amplie oportunidades.",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-3xl text-lg leading-relaxed text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"O projeto",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-foreground",
						children: "Espetáculo de Dança: Ballet Dom Quixote"
					}),
					" ",
					"está aprovado e publicado pela Lei Federal de Incentivo à Cultura, sob PRONAC 255925. Seu apoio ajuda a realizar uma grande produção, gerar trabalho e oferecer uma sessão exclusiva para crianças de escolas públicas."
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-6 md:grid-cols-3 md:items-start",
				children: [
					{
						t: "Benefício fiscal",
						d: "Destine parte do Imposto de Renda devido dentro dos limites previstos em lei.",
						c: "bg-saba-pink border-saba-pink md:-translate-y-4"
					},
					{
						t: "Visibilidade de marca",
						d: "Divulgação no site, programa, redes sociais e materiais impressos e digitais.",
						c: "bg-primary border-primary md:translate-y-4"
					},
					{
						t: "Experiência e impacto",
						d: "Ingressos exclusivos, novidades e associação a uma produção cultural com contrapartida social.",
						c: "bg-background border-foreground/20"
					}
				].map((b, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: `relative overflow-hidden rounded-[1.5rem] p-8 shadow-[8px_8px_0_var(--foreground)] ${b.c}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "absolute right-5 top-3 font-display text-6xl leading-none text-foreground/15",
							children: ["0", index + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "relative eyebrow text-foreground",
							children: b.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "relative mt-8 text-lg leading-snug text-foreground/80",
							children: b.d
						})
					]
				}, b.t))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			tone: "muted",
			eyebrow: "Como participar",
			title: "Pessoa física ou pessoa jurídica.",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Pessoa física"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 text-3xl",
							children: "Apoie pelo seu Imposto de Renda."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Declaração pelo modelo completo." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Até 6% do IR devido no ano-base ou até 3% diretamente na declaração, conforme o material do projeto." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Aporte dentro do período de captação e guarda do recibo de mecenato." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Incentivo direto à cultura com dedução fiscal prevista em legislação." })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Pessoa jurídica"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 text-3xl",
							children: "Fortaleça sua marca e a cultura."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Empresas tributadas pelo lucro real podem destinar até 4% do IR devido." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Aporte dentro do período de captação e registro do recibo de mecenato." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Exposição de marca e fortalecimento da imagem institucional." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Participação em uma iniciativa cultural com impacto social positivo." })
							]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted-foreground",
				children: "A aplicação dos incentivos deve ser validada com a equipe contábil ou fiscal responsável."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			eyebrow: "Simulador informativo",
			title: "Calcule uma estimativa do incentivo.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-8 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "mb-3 block",
							children: "Tipo de patrocinador"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
							value: tipo,
							onValueChange: (v) => setTipo(v),
							className: "flex gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, { value: "PF" }), " Pessoa física"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, { value: "PJ" }), " Pessoa jurídica"]
							})]
						})] }),
						tipo === "PF" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "mb-3 block",
							children: "Momento da destinação"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
							value: momentoPF,
							onValueChange: (v) => setMomentoPF(v),
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, { value: "ano-base" }), " Durante o ano-base (até 6%)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, { value: "declaracao" }), " Na declaração (até 3%)"]
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "mb-2 block",
							children: "Imposto de Renda devido estimado (R$)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: "0",
							max: MAX_MONEY,
							step: "0.01",
							value: imposto,
							onChange: (e) => {
								const value = Number(e.target.value);
								setImposto(Number.isFinite(value) ? Math.min(Math.max(0, value), MAX_MONEY) : 0);
							}
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "mb-2 block",
								children: "Valor que deseja destinar (R$)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: "0",
								max: MAX_MONEY,
								step: "0.01",
								value: interesse,
								onChange: (e) => {
									const value = Number(e.target.value);
									setInteresse(Number.isFinite(value) ? Math.min(Math.max(0, value), MAX_MONEY) : 0);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: [
									"Limite usado nesta estimativa: ",
									(limitePct * 100).toFixed(0),
									"% do IR devido."
								]
							})
						] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-foreground/20 bg-saba-pink p-8 text-foreground shadow-[8px_8px_0_var(--foreground)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow text-primary",
							children: "Resultado estimado"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Teto permitido",
									value: fmtBRL(tetoIncentivo)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Valor informado",
									value: fmtBRL(interesse)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Incentivo estimado",
									value: fmtBRL(incentivoEstimado),
									highlight: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Valor acima do limite",
									value: fmtBRL(Math.max(0, interesse - incentivoEstimado))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex gap-2 text-xs leading-relaxed text-foreground/70",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4 shrink-0 text-primary" }), "Esta é uma simulação informativa, baseada nos percentuais descritos no material. Confirme a elegibilidade e a dedução com sua assessoria contábil."]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			tone: "muted",
			eyebrow: "Reconhecimento",
			title: "A arte agradece o seu patrocínio.",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-muted-foreground",
				children: "Conheça a empresa já citada como patrocinadora master e veja como sua marca pode participar deste movimento."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/patrocinadores",
					children: "Ver patrocinadores"
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			eyebrow: "Fale conosco",
			title: "Vamos conversar sobre patrocínio.",
			children: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-xl rounded-xl border border-border bg-card p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-10 w-10 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 text-2xl",
						children: "Interesse registrado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground",
						children: "Nossa equipe entrará em contato para dar continuidade à conversa."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "max-w-3xl p-8",
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
							label: "Nome",
							name: "nome",
							required: true,
							maxLength: FORM_LIMITS.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Empresa",
							name: "empresa",
							maxLength: FORM_LIMITS.school
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "CNPJ ou CPF",
							name: "documento",
							maxLength: FORM_LIMITS.document
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
							label: "Valor de interesse (R$)",
							name: "valor",
							type: "number",
							min: 0,
							max: 1e9,
							step: .01
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "mb-2 block",
								children: "Mensagem"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								name: "mensagem",
								rows: 4,
								maxLength: FORM_LIMITS.message
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "sm:col-span-2 flex gap-3 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								checked: consent,
								onCheckedChange: (v) => setConsent(!!v)
							}), "Autorizo o uso dos meus dados para contato institucional, conforme LGPD."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "lg",
								disabled: submitting,
								children: submitting ? "Enviando…" : "Quero conversar sobre patrocínio"
							})
						})
					]
				})
			})
		})
	] });
}
function Row({ label, value, highlight }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-4 border-b border-foreground/15 pb-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-foreground/70",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: highlight ? "font-display text-3xl text-primary" : "text-lg text-foreground",
			children: value
		})]
	});
}
function Field({ label, name, type = "text", required, maxLength, min, max, step }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
		htmlFor: name,
		className: "mb-2 block",
		children: [label, required && " *"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		id: name,
		name,
		type,
		required,
		maxLength,
		min,
		max,
		step
	})] });
}
//#endregion
export { Patrocinio as component };
