import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as supabase } from "./supabase-BsWcV1lP.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { _ as Lock } from "../_libs/lucide-react.mjs";
import { n as Label, t as Input } from "./input-DoulQRPp.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-MCpzqgqk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLogin() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		setLoading(true);
		const data = new FormData(e.currentTarget);
		const { error } = await supabase.auth.signInWithPassword({
			email: String(data.get("email")),
			password: String(data.get("password"))
		});
		if (error) {
			toast.error("E-mail ou senha inválidos.");
			setLoading(false);
			return;
		}
		const { data: { user } } = await supabase.auth.getUser();
		const { data: profile } = user ? await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle() : { data: null };
		if (profile?.role !== "admin") {
			await supabase.auth.signOut();
			toast.error("Este usuário não possui acesso administrativo.");
			setLoading(false);
			return;
		}
		toast.success("Login efetuado.");
		navigate({ to: "/admin/dashboard" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-ink text-cream grid place-items-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2 mb-8 justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-10 w-10 place-items-center rounded-full bg-accent text-ink font-display text-lg",
					children: "S"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-xl",
					children: "Instituto Cultural Sabá"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-8 bg-cream/[0.03] border-cream/15 text-cream backdrop-blur",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-9 w-9 place-items-center rounded-full bg-accent/20 text-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl text-cream",
							children: "Área administrativa"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-cream/60",
							children: "Acesso restrito à equipe do Instituto."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "mt-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "mb-2 block text-sm text-cream/80",
								children: "E-mail"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								name: "email",
								type: "email",
								autoComplete: "email",
								className: "bg-cream/5 border-cream/15 text-cream"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "mb-2 block text-sm text-cream/80",
								children: "Senha"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								name: "password",
								type: "password",
								autoComplete: "current-password",
								className: "bg-cream/5 border-cream/15 text-cream"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: loading,
								className: "w-full",
								size: "lg",
								children: loading ? "Entrando..." : "Entrar"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/recuperar-senha",
						className: "mt-5 block text-center text-xs text-cream/60 transition-colors hover:text-accent",
						children: "Esqueci minha senha"
					})
				]
			})]
		})
	});
}
//#endregion
export { AdminLogin as component };
