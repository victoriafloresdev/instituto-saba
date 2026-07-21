import { t as cn } from "./utils-C_uf36nf.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Section-CKYAUsRZ.js
var import_jsx_runtime = require_jsx_runtime();
function Section({ eyebrow, title, subtitle, children, align = "left", className, id, tone = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id,
		className: cn("py-20 md:py-28", tone === "muted" ? "bg-muted/50" : tone === "ink" ? "bg-secondary text-foreground" : "", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x",
			children: [(eyebrow || title || subtitle) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mb-12 md:mb-16 max-w-3xl", align === "center" && "mx-auto text-center"),
				children: [
					eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: eyebrow
					}),
					title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-4xl md:text-5xl leading-[1.05] text-foreground",
						children: title
					}),
					subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-base md:text-lg leading-relaxed text-muted-foreground",
						children: subtitle
					})
				]
			}), children]
		})
	});
}
//#endregion
export { Section as t };
