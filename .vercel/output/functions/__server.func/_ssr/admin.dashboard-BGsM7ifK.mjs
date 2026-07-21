import { r as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { a as RefreshCw, c as Menu, d as LogOut, k as Building2, o as MessageSquare, p as LayoutDashboard, r as Users, v as GraduationCap, x as Download } from "../_libs/lucide-react.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as supabase } from "./supabase-BsWcV1lP.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.dashboard-BGsM7ifK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Table = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table.displayName = "Table";
var TableHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
	ref,
	className: cn("[&_tr]:border-b", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
	ref,
	className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
	...props
}));
TableFooter.displayName = "TableFooter";
var TableRow = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
	ref,
	className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
	ref,
	className: cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	ref,
	className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableCell.displayName = "TableCell";
var TableCaption = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}));
TableCaption.displayName = "TableCaption";
var statuses = [
	"Novo",
	"Em análise",
	"Aprovado",
	"Recusado",
	"Contatado"
];
function Dashboard() {
	const navigate = useNavigate();
	const [view, setView] = (0, import_react.useState)("dashboard");
	const [openNav, setOpenNav] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [rows, setRows] = (0, import_react.useState)([]);
	async function load() {
		setLoading(true);
		const { data: { user } } = await supabase.auth.getUser();
		if (!user) {
			navigate({ to: "/admin" });
			return;
		}
		const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
		if (profile?.role !== "admin") {
			await supabase.auth.signOut();
			navigate({ to: "/admin" });
			return;
		}
		const [auditions, sponsorships, schools, messages] = await Promise.all([
			supabase.from("auditions").select("*").order("created_at", { ascending: false }),
			supabase.from("sponsorship_leads").select("*").order("created_at", { ascending: false }),
			supabase.from("school_registrations").select("*").order("created_at", { ascending: false }),
			supabase.from("contact_messages").select("*").order("created_at", { ascending: false })
		]);
		if (auditions.error || sponsorships.error || schools.error || messages.error) toast.error("Não foi possível carregar os dados do painel.");
		setRows([
			...(auditions.data ?? []).map((r) => ({
				id: r.id,
				kind: "audicoes",
				title: r.nome,
				subtitle: r.modalidade || "Modalidade não informada",
				detail: `${r.cidade} · ${r.email}`,
				status: r.status,
				createdAt: r.created_at
			})),
			...(sponsorships.data ?? []).map((r) => ({
				id: r.id,
				kind: "patrocinadores",
				title: r.nome,
				subtitle: r.empresa || r.tipo,
				detail: `${r.email} · ${r.valor ? Number(r.valor).toLocaleString("pt-BR", {
					style: "currency",
					currency: "BRL"
				}) : "Valor não informado"}`,
				status: r.status,
				createdAt: r.created_at
			})),
			...(schools.data ?? []).map((r) => ({
				id: r.id,
				kind: "escolas",
				title: r.escola,
				subtitle: r.responsavel,
				detail: `${r.cidade} · ${r.alunos} alunos`,
				status: r.status,
				createdAt: r.created_at
			})),
			...(messages.data ?? []).map((r) => ({
				id: r.id,
				kind: "mensagens",
				title: r.nome,
				subtitle: r.assunto,
				detail: r.email,
				status: r.status,
				createdAt: r.created_at
			}))
		]);
		setLoading(false);
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const byKind = (kind) => rows.filter((row) => row.kind === kind);
	async function updateStatus(row, status) {
		const table = row.kind === "audicoes" ? "auditions" : row.kind === "patrocinadores" ? "sponsorship_leads" : row.kind === "escolas" ? "school_registrations" : "contact_messages";
		const { error } = await supabase.from(table).update({ status }).eq("id", row.id);
		if (error) {
			toast.error("Não foi possível atualizar o status.");
			return;
		}
		setRows((current) => current.map((item) => item.id === row.id && item.kind === row.kind ? {
			...item,
			status
		} : item));
		toast.success("Status atualizado.");
	}
	async function logout() {
		await supabase.auth.signOut();
		toast.success("Sessão encerrada.");
		navigate({ to: "/admin" });
	}
	async function exportCsv() {
		const [auditions, sponsorships, schools, messages] = await Promise.all([
			supabase.from("auditions").select("*").order("created_at", { ascending: false }),
			supabase.from("sponsorship_leads").select("*").order("created_at", { ascending: false }),
			supabase.from("school_registrations").select("*").order("created_at", { ascending: false }),
			supabase.from("contact_messages").select("*").order("created_at", { ascending: false })
		]);
		if (auditions.error || sponsorships.error || schools.error || messages.error) {
			toast.error("Não foi possível preparar o CSV completo.");
			return;
		}
		const completeRows = [
			...(auditions.data ?? []).map((record) => ({
				tipo_registro: "Audição",
				...record
			})),
			...(sponsorships.data ?? []).map((record) => ({
				tipo_registro: "Patrocínio",
				...record
			})),
			...(schools.data ?? []).map((record) => ({
				tipo_registro: "Escola",
				...record
			})),
			...(messages.data ?? []).map((record) => ({
				tipo_registro: "Contato",
				...record
			}))
		];
		const headers = Array.from(new Set(completeRows.flatMap((record) => Object.keys(record))));
		const lines = completeRows.map((record) => headers.map((header) => {
			const value = record[header] ?? "";
			return `"${String(value).replaceAll("\"", "\"\"")}"`;
		}).join(","));
		const blob = new Blob([[headers.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "instituto-saba-registros-completos.csv";
		a.click();
		URL.revokeObjectURL(url);
		toast.success("CSV completo gerado.");
	}
	const items = [
		{
			key: "dashboard",
			label: "Dashboard",
			icon: LayoutDashboard
		},
		{
			key: "audicoes",
			label: "Audições",
			icon: Users
		},
		{
			key: "patrocinadores",
			label: "Patrocínios",
			icon: Building2
		},
		{
			key: "escolas",
			label: "Escolas",
			icon: GraduationCap
		},
		{
			key: "mensagens",
			label: "Mensagens",
			icon: MessageSquare
		}
	];
	const currentRows = view === "dashboard" ? [] : byKind(view);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-muted/40 flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: `${openNav ? "flex" : "hidden"} md:flex w-64 bg-ink text-cream fixed md:sticky top-0 h-screen z-40 flex-col`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6 border-b border-cream/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-9 w-9 place-items-center rounded-full bg-accent text-ink font-display text-lg",
							children: "S"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg",
							children: "Instituto Sabá"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-[0.18em] text-cream/50",
							children: "Painel admin"
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 p-3 space-y-0.5",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setView(item.key);
							setOpenNav(false);
						},
						className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${view === item.key ? "bg-accent text-ink font-medium" : "text-cream/75 hover:bg-cream/5"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4" }), item.label]
					}, item.key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-3 border-t border-cream/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => void logout(),
						className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-cream/75 hover:bg-cream/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sair"]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "h-16 border-b border-border bg-background flex items-center justify-between px-4 md:px-8 sticky top-0 z-30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border",
						onClick: () => setOpenNav(!openNav),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl capitalize",
						children: items.find((item) => item.key === view)?.label
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => void load(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "mr-1 h-4 w-4" }), "Atualizar"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => void exportCsv(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1 h-4 w-4" }), "CSV"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "p-4 md:p-8",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Carregando dados..."
				}) : view === "dashboard" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, {
					rows,
					onOpen: setView
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
					title: items.find((item) => item.key === view)?.label || "",
					rows: currentRows,
					onStatus: updateStatus
				})
			})]
		})]
	});
}
function Overview({ rows, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: (0, import_react.useMemo)(() => [
				{
					label: "Audições",
					kind: "audicoes",
					icon: Users
				},
				{
					label: "Patrocínios",
					kind: "patrocinadores",
					icon: Building2
				},
				{
					label: "Escolas",
					kind: "escolas",
					icon: GraduationCap
				},
				{
					label: "Mensagens",
					kind: "mensagens",
					icon: MessageSquare
				}
			], []).map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => onOpen(card.kind),
				className: "text-left",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6 hover:border-primary/40 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.14em] text-muted-foreground",
							children: card.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(card.icon, { className: "h-4 w-4 text-primary" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-4xl",
						children: rows.filter((row) => row.kind === card.kind).length
					})]
				})
			}, card.kind))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			title: "Registros recentes",
			rows: [...rows].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8),
			onStatus: () => void 0,
			readonly: true
		})]
	});
}
function DataTable({ title, rows, onStatus, readonly = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "overflow-hidden p-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-border p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [rows.length, " registros"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Nome" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Detalhe" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Informação" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Recebido" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				!readonly && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Alterar"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
				className: "cursor-pointer transition-colors hover:bg-primary/5",
				onClick: () => {
					window.location.assign(`/admin/registro/${row.kind}/${row.id}`);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-medium",
						children: row.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.subtitle }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.detail }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: new Date(row.createdAt).toLocaleDateString("pt-BR") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: row.status }) }),
					!readonly && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						onClick: (event) => event.stopPropagation(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: row.status,
							onValueChange: (value) => onStatus(row, value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "ml-auto h-8 w-[140px] text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: statuses.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: status,
								children: status
							}, status)) })]
						})
					})
				]
			}, `${row.kind}-${row.id}`)) })] })
		})]
	});
}
function StatusBadge({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "secondary",
		className: `rounded-full font-normal ${{
			"Novo": "bg-blue-100 text-blue-700",
			"Em análise": "bg-amber-100 text-amber-700",
			"Aprovado": "bg-emerald-100 text-emerald-700",
			"Recusado": "bg-rose-100 text-rose-700",
			"Contatado": "bg-violet-100 text-violet-700"
		}[value]}`,
		children: value
	});
}
//#endregion
export { Dashboard as component };
