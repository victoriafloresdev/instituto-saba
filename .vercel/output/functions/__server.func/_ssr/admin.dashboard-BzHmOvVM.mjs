import { r as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime, a as Overlay2, c as Title2, d as DialogContent$1, f as DialogDescription$1, h as DialogTitle$1, i as Description2, l as Dialog$1, m as DialogPortal$1, n as Cancel, o as Portal2, p as DialogOverlay$1, r as Content2, s as Root2, t as Action, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as buttonVariants, t as Button } from "./button-BkEeRci-.mjs";
import { t as supabase } from "./supabase-BsWcV1lP.mjs";
import { S as uploadSiteAsset, _ as removeSiteAsset, a as createSponsor, b as updateSpectacle, g as isValidSlug, i as createSpectacle, l as fetchAllSpectacles, m as formatSpectacleLocation, n as SPONSOR_TYPE_LABELS, o as deleteSpectacle, p as formatSpectacleDate, r as SPONSOR_TYPE_ORDER, s as deleteSponsor, t as ASSET_MIME_TYPES, u as fetchAllSponsors, v as siteAssetUrl, x as updateSponsor, y as slugify } from "./site-content-owwry4dq.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { A as Download, D as GraduationCap, E as Handshake, a as Trash2, b as LayoutDashboard, c as RefreshCw, d as MessageSquare, g as LogOut, i as Upload, k as ExternalLink, l as Plus, n as X, o as Theater, p as Menu, r as Users, u as Pencil, w as Image, y as LoaderCircle, z as Building2 } from "../_libs/lucide-react.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { n as Label, t as Input } from "./input-DoulQRPp.mjs";
import { n as Textarea, s as isValidHttpUrl } from "./form-validation-C4KIeSub.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.dashboard-BzHmOvVM.js
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
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
/**
* Envia a imagem para o bucket site-assets e guarda apenas o caminho. O arquivo
* anterior não é apagado na troca: a exclusão definitiva acontece junto com o
* registro, para não quebrar uma versão já publicada por engano.
*/
function ContentImageField({ label, folder, value, onChange, hint }) {
	const inputRef = (0, import_react.useRef)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const previewUrl = siteAssetUrl(value);
	async function handleFile(file) {
		if (!file) return;
		setUploading(true);
		try {
			onChange(await uploadSiteAsset(folder, file));
			toast.success("Imagem enviada.");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Não foi possível enviar a imagem.");
		} finally {
			setUploading(false);
			if (inputRef.current) inputRef.current.value = "";
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "mb-2 block text-sm",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-24 w-32 shrink-0 place-items-center overflow-hidden rounded-md border border-border bg-muted/50",
				children: previewUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: previewUrl,
					alt: "",
					className: "h-full w-full object-contain"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
					className: "h-5 w-5 text-muted-foreground",
					strokeWidth: 1.4
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "file",
						accept: ASSET_MIME_TYPES.join(","),
						className: "hidden",
						onChange: (event) => void handleFile(event.target.files?.[0])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						disabled: uploading,
						onClick: () => inputRef.current?.click(),
						children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mr-1 h-4 w-4" }), value ? "Trocar imagem" : "Enviar imagem"]
					}),
					value && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: () => onChange(null),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1 h-4 w-4" }), "Remover"]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs text-muted-foreground",
			children: hint ?? "JPG, PNG, WEBP, AVIF ou SVG, até 10 MB."
		})
	] });
}
function FieldShell({ label, className, hint, required, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
				className: "mb-2 block text-sm",
				children: [label, required && " *"]
			}),
			children,
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
function TextField({ value, onChange, type = "text", placeholder, maxLength, min, ...shell }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldShell, {
		...shell,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value,
			type,
			placeholder,
			maxLength,
			min,
			onChange: (event) => onChange(event.target.value)
		})
	});
}
function TextAreaField({ value, onChange, rows = 4, maxLength, placeholder, ...shell }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldShell, {
		...shell,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
			value,
			rows,
			maxLength,
			placeholder,
			onChange: (event) => onChange(event.target.value)
		})
	});
}
function SelectField({ value, onChange, options, ...shell }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldShell, {
		...shell,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
			value,
			onValueChange: (next) => onChange(next),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
				className: "w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
				value: option.value,
				children: option.label
			}, option.value)) })]
		})
	});
}
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
function DeleteContentDialog({ open, title, description, onCancel, onConfirm }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open,
		onOpenChange: (next) => !next && onCancel(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [description, " Esta ação não pode ser desfeita."] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
			onClick: onConfirm,
			children: "Excluir"
		})] })] })
	});
}
var STATUS_OPTIONS$1 = [
	{
		value: "draft",
		label: "Rascunho"
	},
	{
		value: "published",
		label: "Publicado"
	},
	{
		value: "archived",
		label: "Arquivado"
	}
];
var STATUS_STYLES = {
	draft: "bg-amber-100 text-amber-700",
	published: "bg-emerald-100 text-emerald-700",
	archived: "bg-slate-200 text-slate-700"
};
var EMPTY$1 = {
	slug: "",
	title: "",
	subtitle: "",
	description: "",
	synopsis: "",
	date_label: "",
	event_date: "",
	start_time: "",
	end_time: "",
	venue: "",
	address: "",
	city: "",
	classification: "",
	ticket_url: "",
	image_path: null,
	image_alt: "",
	status: "draft",
	sort_order: "0"
};
function toFormValues$1(spectacle) {
	return {
		slug: spectacle.slug,
		title: spectacle.title,
		subtitle: spectacle.subtitle ?? "",
		description: spectacle.description ?? "",
		synopsis: spectacle.synopsis ?? "",
		date_label: spectacle.date_label ?? "",
		event_date: spectacle.event_date ?? "",
		start_time: spectacle.start_time?.slice(0, 5) ?? "",
		end_time: spectacle.end_time?.slice(0, 5) ?? "",
		venue: spectacle.venue ?? "",
		address: spectacle.address ?? "",
		city: spectacle.city ?? "",
		classification: spectacle.classification ?? "",
		ticket_url: spectacle.ticket_url ?? "",
		image_path: spectacle.image_path,
		image_alt: spectacle.image_alt ?? "",
		status: spectacle.status,
		sort_order: String(spectacle.sort_order)
	};
}
function optional$1(value) {
	const trimmed = value.trim();
	return trimmed === "" ? null : trimmed;
}
function toPayload$1(values) {
	return {
		slug: values.slug.trim(),
		title: values.title.trim(),
		subtitle: optional$1(values.subtitle),
		description: values.description.trim(),
		synopsis: optional$1(values.synopsis),
		date_label: optional$1(values.date_label),
		event_date: optional$1(values.event_date),
		start_time: optional$1(values.start_time),
		end_time: optional$1(values.end_time),
		venue: optional$1(values.venue),
		address: optional$1(values.address),
		city: optional$1(values.city),
		classification: optional$1(values.classification),
		ticket_url: optional$1(values.ticket_url),
		image_path: values.image_path,
		image_alt: optional$1(values.image_alt),
		status: values.status,
		sort_order: Number(values.sort_order)
	};
}
function SpectacleManager() {
	const [items, setItems] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [removing, setRemoving] = (0, import_react.useState)(null);
	async function load() {
		setLoading(true);
		try {
			setItems(await fetchAllSpectacles());
		} catch {
			toast.error("Não foi possível carregar os espetáculos. Confira se a migração de conteúdo foi aplicada no Supabase.");
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	async function confirmRemove() {
		if (!removing) return;
		try {
			await deleteSpectacle(removing.id);
			await removeSiteAsset(removing.image_path);
			toast.success("Espetáculo excluído.");
			setRemoving(null);
			await load();
		} catch {
			toast.error("Não foi possível excluir o espetáculo.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"Espetáculos e sessões exibidos em ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: "Programação"
						}),
						". Apenas os publicados aparecem no site."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => setCreating(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), "Novo espetáculo"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-hidden p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Espetáculos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [items.length, " registros"]
					})]
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-6 text-sm text-muted-foreground",
					children: "Carregando espetáculos..."
				}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-6 text-sm text-muted-foreground",
					children: "Nenhum espetáculo cadastrado ainda."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Título" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Data" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Local" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Ordem" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Ações"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: ["/", item.slug]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatSpectacleDate(item) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatSpectacleLocation(item) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: item.sort_order }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: `rounded-full font-normal ${STATUS_STYLES[item.status]}`,
							children: STATUS_OPTIONS$1.find((option) => option.value === item.status)?.label
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-1",
								children: [
									item.status === "published" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "ghost",
										size: "sm",
										title: "Ver no site",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: `/espetaculo/${item.slug}`,
											target: "_blank",
											rel: "noreferrer",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										title: "Editar",
										onClick: () => setEditing(item),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										title: "Excluir",
										onClick: () => setRemoving(item),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
									})
								]
							})
						})
					] }, item.id)) })] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpectacleDialog, {
				open: creating || editing !== null,
				spectacle: editing,
				existingSlugs: items.filter((item) => item.id !== editing?.id).map((item) => item.slug),
				onClose: () => {
					setCreating(false);
					setEditing(null);
				},
				onSaved: () => {
					setCreating(false);
					setEditing(null);
					load();
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteContentDialog, {
				open: removing !== null,
				title: "Excluir espetáculo",
				description: `O espetáculo "${removing?.title ?? ""}" e sua imagem serão removidos.`,
				onCancel: () => setRemoving(null),
				onConfirm: () => void confirmRemove()
			})
		]
	});
}
function SpectacleDialog({ open, spectacle, existingSlugs, onClose, onSaved }) {
	const [values, setValues] = (0, import_react.useState)(EMPTY$1);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [slugTouched, setSlugTouched] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setValues(spectacle ? toFormValues$1(spectacle) : EMPTY$1);
		setSlugTouched(spectacle !== null);
	}, [open, spectacle]);
	function set(key, value) {
		setValues((current) => ({
			...current,
			[key]: value
		}));
	}
	function setTitle(title) {
		setValues((current) => ({
			...current,
			title,
			slug: slugTouched ? current.slug : slugify(title)
		}));
	}
	async function save() {
		const payload = toPayload$1(values);
		if (payload.title.length === 0 || payload.title.length > 180) {
			toast.error("Informe um título com até 180 caracteres.");
			return;
		}
		if (!isValidSlug(payload.slug)) {
			toast.error("O identificador deve conter apenas letras minúsculas, números e hífens.");
			return;
		}
		if (existingSlugs.includes(payload.slug)) {
			toast.error("Já existe outro espetáculo com este identificador.");
			return;
		}
		if (payload.ticket_url && !isValidHttpUrl(payload.ticket_url)) {
			toast.error("O link de ingressos deve começar com http:// ou https://.");
			return;
		}
		const sortOrder = payload.sort_order ?? 0;
		if (!Number.isInteger(sortOrder) || sortOrder < 0) {
			toast.error("A ordem de exibição deve ser um número inteiro maior ou igual a zero.");
			return;
		}
		setSaving(true);
		try {
			if (spectacle) {
				await updateSpectacle(spectacle.id, payload);
				toast.success("Espetáculo atualizado.");
			} else {
				await createSpectacle(payload);
				toast.success("Espetáculo criado.");
			}
			onSaved();
		} catch {
			toast.error("Não foi possível salvar o espetáculo.");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !next && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[92vh] overflow-y-auto sm:max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: spectacle ? "Editar espetáculo" : "Novo espetáculo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Campos em branco não aparecem no site. Publique apenas quando o conteúdo estiver aprovado." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Título",
							required: true,
							value: values.title,
							onChange: setTitle,
							maxLength: 180
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Identificador na URL",
							required: true,
							value: values.slug,
							hint: `/espetaculo/${values.slug || "identificador"}`,
							onChange: (value) => {
								setSlugTouched(true);
								set("slug", value);
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Etiqueta",
							value: values.subtitle,
							hint: "Selo exibido no card da programação. Ex.: Espetáculo, Ação social.",
							onChange: (value) => set("subtitle", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Data por extenso",
							value: values.date_label,
							hint: "Tem prioridade sobre a data exata. Ex.: Setembro · 2026.",
							maxLength: 120,
							onChange: (value) => set("date_label", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Data do evento",
							type: "date",
							value: values.event_date,
							onChange: (value) => set("event_date", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								label: "Início",
								type: "time",
								value: values.start_time,
								onChange: (value) => set("start_time", value)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								label: "Término",
								type: "time",
								value: values.end_time,
								onChange: (value) => set("end_time", value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Teatro / local",
							value: values.venue,
							maxLength: 240,
							onChange: (value) => set("venue", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Cidade",
							value: values.city,
							maxLength: 160,
							onChange: (value) => set("city", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Endereço",
							className: "sm:col-span-2",
							value: values.address,
							maxLength: 500,
							onChange: (value) => set("address", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Classificação indicativa",
							value: values.classification,
							maxLength: 120,
							onChange: (value) => set("classification", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Link de ingressos",
							value: values.ticket_url,
							placeholder: "https://...",
							hint: "Sem link, o site exibe o aviso de vendas em breve.",
							onChange: (value) => set("ticket_url", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextAreaField, {
							label: "Descrição",
							className: "sm:col-span-2",
							value: values.description,
							rows: 3,
							maxLength: 1e4,
							hint: "Resumo exibido no card da programação e no topo da página do espetáculo.",
							onChange: (value) => set("description", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextAreaField, {
							label: "Sinopse",
							className: "sm:col-span-2",
							value: values.synopsis,
							rows: 6,
							maxLength: 1e4,
							hint: "Texto completo da página. Separe parágrafos com uma linha em branco.",
							onChange: (value) => set("synopsis", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentImageField, {
							label: "Imagem",
							folder: "spectacles",
							value: values.image_path,
							onChange: (path) => set("image_path", path)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Descrição da imagem",
							value: values.image_alt,
							maxLength: 240,
							hint: "Texto alternativo para leitores de tela.",
							onChange: (value) => set("image_alt", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							label: "Status",
							value: values.status,
							options: STATUS_OPTIONS$1,
							onChange: (value) => set("status", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Ordem de exibição",
							type: "number",
							min: 0,
							value: values.sort_order,
							hint: "Números menores aparecem primeiro.",
							onChange: (value) => set("sort_order", value)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: onClose,
					disabled: saving,
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => void save(),
					disabled: saving,
					children: saving ? "Salvando…" : "Salvar"
				})] })
			]
		})
	});
}
var TYPE_OPTIONS = SPONSOR_TYPE_ORDER.map((value) => ({
	value,
	label: SPONSOR_TYPE_LABELS[value]
}));
var STATUS_OPTIONS = [{
	value: "active",
	label: "Ativo"
}, {
	value: "inactive",
	label: "Inativo"
}];
var EMPTY = {
	slug: "",
	name: "",
	sponsor_type: "sponsor",
	description: "",
	website_url: "",
	logo_path: null,
	logo_alt: "",
	status: "inactive",
	sort_order: "0"
};
function toFormValues(sponsor) {
	return {
		slug: sponsor.slug,
		name: sponsor.name,
		sponsor_type: sponsor.sponsor_type,
		description: sponsor.description ?? "",
		website_url: sponsor.website_url ?? "",
		logo_path: sponsor.logo_path,
		logo_alt: sponsor.logo_alt ?? "",
		status: sponsor.status,
		sort_order: String(sponsor.sort_order)
	};
}
function optional(value) {
	const trimmed = value.trim();
	return trimmed === "" ? null : trimmed;
}
function toPayload(values) {
	return {
		slug: values.slug.trim(),
		name: values.name.trim(),
		sponsor_type: values.sponsor_type,
		description: optional(values.description),
		website_url: optional(values.website_url),
		logo_path: values.logo_path,
		logo_alt: optional(values.logo_alt),
		status: values.status,
		sort_order: Number(values.sort_order)
	};
}
function SponsorManager() {
	const [items, setItems] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [removing, setRemoving] = (0, import_react.useState)(null);
	async function load() {
		setLoading(true);
		try {
			setItems(await fetchAllSponsors());
		} catch {
			toast.error("Não foi possível carregar os patrocinadores. Confira se a migração de conteúdo foi aplicada no Supabase.");
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	async function confirmRemove() {
		if (!removing) return;
		try {
			await deleteSponsor(removing.id);
			await removeSiteAsset(removing.logo_path);
			toast.success("Patrocinador excluído.");
			setRemoving(null);
			await load();
		} catch {
			toast.error("Não foi possível excluir o patrocinador.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"Marcas exibidas na página ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: "Patrocinadores"
						}),
						". Apenas as ativas aparecem no site."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => setCreating(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), "Novo patrocinador"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-hidden p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Patrocinadores e parceiros"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [items.length, " registros"]
					})]
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-6 text-sm text-muted-foreground",
					children: "Carregando patrocinadores..."
				}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-6 text-sm text-muted-foreground",
					children: "Nenhum patrocinador cadastrado ainda."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Logo" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Nome" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Categoria" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Ordem" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Ações"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: items.map((item) => {
						const logoUrl = siteAssetUrl(item.logo_path);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: logoUrl,
								alt: "",
								className: "h-8 w-20 object-contain object-left"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-5 w-5 text-muted-foreground" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: item.slug
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: SPONSOR_TYPE_LABELS[item.sponsor_type] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: item.sort_order }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: `rounded-full font-normal ${item.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"}`,
								children: item.status === "active" ? "Ativo" : "Inativo"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										title: "Editar",
										onClick: () => setEditing(item),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										title: "Excluir",
										onClick: () => setRemoving(item),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
									})]
								})
							})
						] }, item.id);
					}) })] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SponsorDialog, {
				open: creating || editing !== null,
				sponsor: editing,
				existingSlugs: items.filter((item) => item.id !== editing?.id).map((item) => item.slug),
				onClose: () => {
					setCreating(false);
					setEditing(null);
				},
				onSaved: () => {
					setCreating(false);
					setEditing(null);
					load();
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteContentDialog, {
				open: removing !== null,
				title: "Excluir patrocinador",
				description: `O patrocinador "${removing?.name ?? ""}" e seu logo serão removidos.`,
				onCancel: () => setRemoving(null),
				onConfirm: () => void confirmRemove()
			})
		]
	});
}
function SponsorDialog({ open, sponsor, existingSlugs, onClose, onSaved }) {
	const [values, setValues] = (0, import_react.useState)(EMPTY);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [slugTouched, setSlugTouched] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setValues(sponsor ? toFormValues(sponsor) : EMPTY);
		setSlugTouched(sponsor !== null);
	}, [open, sponsor]);
	function set(key, value) {
		setValues((current) => ({
			...current,
			[key]: value
		}));
	}
	function setName(name) {
		setValues((current) => ({
			...current,
			name,
			slug: slugTouched ? current.slug : slugify(name)
		}));
	}
	async function save() {
		const payload = toPayload(values);
		if (payload.name.length === 0 || payload.name.length > 180) {
			toast.error("Informe um nome com até 180 caracteres.");
			return;
		}
		if (!isValidSlug(payload.slug)) {
			toast.error("O identificador deve conter apenas letras minúsculas, números e hífens.");
			return;
		}
		if (existingSlugs.includes(payload.slug)) {
			toast.error("Já existe outro patrocinador com este identificador.");
			return;
		}
		if (payload.website_url && !isValidHttpUrl(payload.website_url)) {
			toast.error("O site deve começar com http:// ou https://.");
			return;
		}
		const sortOrder = payload.sort_order ?? 0;
		if (!Number.isInteger(sortOrder) || sortOrder < 0) {
			toast.error("A ordem de exibição deve ser um número inteiro maior ou igual a zero.");
			return;
		}
		setSaving(true);
		try {
			if (sponsor) {
				await updateSponsor(sponsor.id, payload);
				toast.success("Patrocinador atualizado.");
			} else {
				await createSponsor(payload);
				toast.success("Patrocinador criado.");
			}
			onSaved();
		} catch {
			toast.error("Não foi possível salvar o patrocinador.");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !next && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[92vh] overflow-y-auto sm:max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: sponsor ? "Editar patrocinador" : "Novo patrocinador" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Publique apenas marcas com autorização de uso do logo confirmada." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Nome",
							required: true,
							value: values.name,
							onChange: setName,
							maxLength: 180
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Identificador",
							required: true,
							value: values.slug,
							hint: "Uso interno, não aparece no site.",
							onChange: (value) => {
								setSlugTouched(true);
								set("slug", value);
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							label: "Categoria",
							value: values.sponsor_type,
							options: TYPE_OPTIONS,
							hint: "Patrocínio master aparece em destaque no topo da página.",
							onChange: (value) => set("sponsor_type", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Site",
							value: values.website_url,
							placeholder: "https://...",
							onChange: (value) => set("website_url", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextAreaField, {
							label: "Descrição",
							className: "sm:col-span-2",
							value: values.description,
							rows: 4,
							maxLength: 5e3,
							onChange: (value) => set("description", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentImageField, {
							label: "Logo",
							folder: "sponsors",
							value: values.logo_path,
							hint: "Prefira PNG com fundo transparente ou SVG.",
							onChange: (path) => set("logo_path", path)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Descrição do logo",
							value: values.logo_alt,
							maxLength: 240,
							hint: "Texto alternativo para leitores de tela.",
							onChange: (value) => set("logo_alt", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							label: "Status",
							value: values.status,
							options: STATUS_OPTIONS,
							onChange: (value) => set("status", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Ordem de exibição",
							type: "number",
							min: 0,
							value: values.sort_order,
							hint: "Números menores aparecem primeiro.",
							onChange: (value) => set("sort_order", value)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: onClose,
					disabled: saving,
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => void save(),
					disabled: saving,
					children: saving ? "Salvando…" : "Salvar"
				})] })
			]
		})
	});
}
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
	const leadItems = [
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
	const contentItems = [{
		key: "conteudo-espetaculos",
		label: "Espetáculos",
		icon: Theater
	}, {
		key: "conteudo-patrocinadores",
		label: "Patrocinadores",
		icon: Handshake
	}];
	const items = [...leadItems, ...contentItems];
	const isContentView = view === "conteudo-espetaculos" || view === "conteudo-patrocinadores";
	const currentRows = view === "dashboard" || isContentView ? [] : byKind(view);
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex-1 overflow-y-auto p-3 space-y-0.5",
					children: [
						leadItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
							item,
							active: view === item.key,
							onSelect: () => {
								setView(item.key);
								setOpenNav(false);
							}
						}, item.key)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-3 pb-1 pt-5 text-[10px] uppercase tracking-[0.18em] text-cream/40",
							children: "Conteúdo do site"
						}),
						contentItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
							item,
							active: view === item.key,
							onSelect: () => {
								setView(item.key);
								setOpenNav(false);
							}
						}, item.key))
					]
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
				}), !isContentView && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
				children: view === "conteudo-espetaculos" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpectacleManager, {}) : view === "conteudo-patrocinadores" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SponsorManager, {}) : loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
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
			Novo: "bg-blue-100 text-blue-700",
			"Em análise": "bg-amber-100 text-amber-700",
			Aprovado: "bg-emerald-100 text-emerald-700",
			Recusado: "bg-rose-100 text-rose-700",
			Contatado: "bg-violet-100 text-violet-700"
		}[value]}`,
		children: value
	});
}
function NavButton({ item, active, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: onSelect,
		className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${active ? "bg-accent text-ink font-medium" : "text-cream/75 hover:bg-cream/5"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4" }), item.label]
	});
}
//#endregion
export { Dashboard as component };
