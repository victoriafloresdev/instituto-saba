import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { j as ArrowLeft, y as FileText } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./supabase-BsWcV1lP.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./admin.registro._tipo._id-BGhAJVeQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.registro._tipo._id-C6phsiF_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sources = {
	audicoes: {
		table: "auditions",
		title: "Inscrição de audição",
		fields: [
			["nome", "Nome"],
			["email", "E-mail"],
			["whatsapp", "WhatsApp"],
			["idade", "Idade"],
			["cidade", "Cidade"],
			["modalidade", "Modalidade"],
			["experiencia", "Experiência e formação"],
			["portfolio", "Portfólio"],
			["mensagem", "Mensagem"],
			["status", "Status"],
			["created_at", "Recebido em"]
		]
	},
	patrocinadores: {
		table: "sponsorship_leads",
		title: "Interesse de patrocínio",
		fields: [
			["nome", "Nome"],
			["empresa", "Empresa"],
			["documento", "CNPJ ou CPF"],
			["email", "E-mail"],
			["whatsapp", "WhatsApp"],
			["valor", "Valor de interesse"],
			["tipo", "Tipo"],
			["mensagem", "Mensagem"],
			["status", "Status"],
			["created_at", "Recebido em"]
		]
	},
	escolas: {
		table: "school_registrations",
		title: "Cadastro de escola",
		fields: [
			["escola", "Escola"],
			["responsavel", "Responsável"],
			["cargo", "Cargo"],
			["email", "E-mail"],
			["whatsapp", "WhatsApp"],
			["cidade", "Cidade"],
			["alunos", "Número de alunos"],
			["faixa", "Faixa etária"],
			["mensagem", "Mensagem"],
			["status", "Status"],
			["created_at", "Recebido em"]
		]
	},
	mensagens: {
		table: "contact_messages",
		title: "Mensagem de contato",
		fields: [
			["nome", "Nome"],
			["email", "E-mail"],
			["assunto", "Assunto"],
			["mensagem", "Mensagem"],
			["status", "Status"],
			["created_at", "Recebido em"]
		]
	}
};
function RegistroDetalhe() {
	const navigate = useNavigate();
	const { tipo, id } = Route.useParams();
	const [record, setRecord] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const config = sources[tipo];
	(0, import_react.useEffect)(() => {
		async function load() {
			if (!config) {
				navigate({ to: "/admin/dashboard" });
				return;
			}
			const { data: { user } } = await supabase.auth.getUser();
			const { data: profile } = user ? await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle() : { data: null };
			if (profile?.role !== "admin") {
				navigate({ to: "/admin" });
				return;
			}
			const { data, error } = await supabase.from(config.table).select("*").eq("id", id).maybeSingle();
			if (!error && data) setRecord(data);
			setLoading(false);
		}
		load();
	}, [
		config,
		id,
		navigate
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen grid place-items-center bg-muted/40 text-muted-foreground",
		children: "Carregando registro..."
	});
	if (!record || !config) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen grid place-items-center bg-muted/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl",
				children: "Registro não encontrado."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/dashboard",
					children: "Voltar ao painel"
				})
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-muted/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-x flex h-16 items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/dashboard",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-1 h-4 w-4" }), "Voltar ao painel"]
					})
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "container-x py-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Detalhes completos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-3xl",
					children: config.title
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "max-w-4xl overflow-hidden p-0",
				children: config.fields.map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
					label,
					value: record[key]
				}, key))
			})]
		})]
	});
}
function DetailRow({ label, value }) {
	const displayed = value === null || value === void 0 || value === "" ? "Não informado" : label === "Recebido em" ? new Date(String(value)).toLocaleString("pt-BR") : label === "Valor de interesse" ? Number(value).toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL"
	}) : String(value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2 border-b border-border px-6 py-5 last:border-0 md:grid-cols-[11rem_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "whitespace-pre-wrap break-words leading-relaxed text-foreground",
			children: displayed
		})]
	});
}
//#endregion
export { RegistroDetalhe as component };
