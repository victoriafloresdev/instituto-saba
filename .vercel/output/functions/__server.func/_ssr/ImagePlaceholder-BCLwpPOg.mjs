import { t as cn } from "./utils-C_uf36nf.mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { w as Image } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ImagePlaceholder-BCLwpPOg.js
var import_jsx_runtime = require_jsx_runtime();
function ImagePlaceholder({ label = "Imagem", aspect = "4/5", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-secondary via-muted to-accent/30 flex items-center justify-center", className),
		style: { aspectRatio: aspect },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 opacity-[0.06] mix-blend-multiply",
			style: {
				backgroundImage: "radial-gradient(circle at 20% 20%, #000 1px, transparent 1px)",
				backgroundSize: "8px 8px"
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex flex-col items-center gap-2 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
				className: "h-6 w-6",
				strokeWidth: 1.4
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs uppercase tracking-[0.18em]",
				children: label
			})]
		})]
	});
}
//#endregion
export { ImagePlaceholder as t };
