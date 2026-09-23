import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as supabase } from "./supabase-BsWcV1lP.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { N as CircleCheck, V as ArrowLeft, h as Mail, v as LockKeyhole } from "../_libs/lucide-react.mjs";
import { n as Label, t as Input } from "./input-DoulQRPp.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.recuperar-senha-CHA_-mLi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RecoverPassword() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(false);
	async function submit(event) {
		event.preventDefault();
		setLoading(true);
		const redirectTo = `${window.location.origin}/admin/redefinir-senha`;
		const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });
		if (error) {
			toast.error("Envio de e-mail indisponível no momento. Tente novamente em 1 hora.");
			setLoading(false);
			return;
		}
		setSent(true);
		setLoading(false);
		toast.success("E-mail de recuperação enviado.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-ink px-4 text-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "mb-8 flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-10 w-10 place-items-center rounded-full bg-accent font-display text-lg text-ink",
					children: "S"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-xl",
					children: "Instituto Cultural Sabá"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-cream/15 bg-cream/[0.03] p-8 text-cream backdrop-blur",
				children: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-auto grid h-11 w-11 place-items-center rounded-full bg-accent/20 text-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-5 text-2xl text-cream",
							children: "Confira seu e-mail"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm leading-relaxed text-cream/70",
							children: [
								"Enviamos um link para redefinir a senha de",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-cream",
									children: email
								}),
								". Se ele não aparecer, confira a pasta de spam."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							className: "mt-6 border-cream/20 bg-transparent text-cream hover:bg-cream/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								children: "Voltar para o login"
							})
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-9 w-9 place-items-center rounded-full bg-accent/20 text-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl text-cream",
							children: "Recuperar senha"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-cream/60",
							children: "Enviaremos um link seguro para seu e-mail."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "mt-6 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "recovery-email",
							className: "mb-2 block text-sm text-cream/80",
							children: "E-mail cadastrado"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/45" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "recovery-email",
								required: true,
								name: "email",
								type: "email",
								autoComplete: "email",
								value: email,
								onChange: (event) => setEmail(event.target.value),
								className: "border-cream/15 bg-cream/5 pl-9 text-cream placeholder:text-cream/35",
								placeholder: "voce@exemplo.com"
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: loading,
							className: "w-full",
							size: "lg",
							children: loading ? "Enviando..." : "Enviar link de recuperação"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin",
						className: "mt-6 flex items-center justify-center gap-1 text-xs text-cream/60 transition-colors hover:text-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), "Voltar para o login"]
					})
				] })
			})]
		})
	});
}
//#endregion
export { RecoverPassword as component };
