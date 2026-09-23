import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as supabase } from "./supabase-BsWcV1lP.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { N as CircleCheck, P as CircleAlert, v as LockKeyhole, x as KeyRound } from "../_libs/lucide-react.mjs";
import { n as Label, t as Input } from "./input-DoulQRPp.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.redefinir-senha-CauQl6w3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPassword() {
	const navigate = useNavigate();
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmation, setConfirmation] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [checkingSession, setCheckingSession] = (0, import_react.useState)(true);
	const [recoverySession, setRecoverySession] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
			if (!mounted) return;
			if (event === "PASSWORD_RECOVERY") {
				setRecoverySession(Boolean(session));
				setCheckingSession(false);
			}
		});
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (!mounted) return;
			setRecoverySession(Boolean(session));
			setCheckingSession(false);
		});
		return () => {
			mounted = false;
			subscription.unsubscribe();
		};
	}, []);
	async function submit(event) {
		event.preventDefault();
		if (password.length < 8) {
			toast.error("A senha deve ter pelo menos 8 caracteres.");
			return;
		}
		if (password !== confirmation) {
			toast.error("As senhas não coincidem.");
			return;
		}
		setLoading(true);
		const { error } = await supabase.auth.updateUser({ password });
		if (error) {
			toast.error("Não foi possível atualizar a senha. Solicite um novo link.");
			setLoading(false);
			return;
		}
		await supabase.auth.signOut();
		toast.success("Senha atualizada. Você já pode entrar no painel.");
		navigate({ to: "/admin" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-ink px-4 text-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mb-8 flex items-center justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-10 w-10 place-items-center rounded-full bg-accent font-display text-lg text-ink",
						children: "S"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl",
						children: "Instituto Cultural Sabá"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-cream/15 bg-cream/[0.03] p-8 text-cream backdrop-blur",
					children: checkingSession ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-6 text-center text-sm text-cream/70",
						children: "Validando seu link..."
					}) : !recoverySession ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-auto grid h-11 w-11 place-items-center rounded-full bg-destructive/15 text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-5 text-2xl text-cream",
								children: "Link expirado ou inválido"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-cream/70",
								children: "Solicite um novo link de recuperação para definir sua senha."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin/recuperar-senha",
									children: "Solicitar novo link"
								})
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-9 w-9 place-items-center rounded-full bg-accent/20 text-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl text-cream",
							children: "Defina sua nova senha"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-cream/60",
							children: "Use pelo menos 8 caracteres."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "mt-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "new-password",
								className: "mb-2 block text-sm text-cream/80",
								children: "Nova senha"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/45" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "new-password",
									required: true,
									name: "password",
									type: "password",
									autoComplete: "new-password",
									minLength: 8,
									value: password,
									onChange: (event) => setPassword(event.target.value),
									className: "border-cream/15 bg-cream/5 pl-9 text-cream placeholder:text-cream/35"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "confirm-password",
								className: "mb-2 block text-sm text-cream/80",
								children: "Confirmar nova senha"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "confirm-password",
								required: true,
								name: "confirmation",
								type: "password",
								autoComplete: "new-password",
								minLength: 8,
								value: confirmation,
								onChange: (event) => setConfirmation(event.target.value),
								className: "border-cream/15 bg-cream/5 text-cream placeholder:text-cream/35"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: loading,
								className: "w-full",
								size: "lg",
								children: loading ? "Salvando..." : "Salvar nova senha"
							})
						]
					})] })
				}),
				!checkingSession && recoverySession && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-5 flex items-center justify-center gap-1 text-center text-xs text-cream/45",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), "Link de recuperação validado com sucesso"]
				})
			]
		})
	});
}
//#endregion
export { ResetPassword as component };
