import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Section } from "./Section-CKYAUsRZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/espetaculo.index-DV6MgCOW.js
var import_jsx_runtime = require_jsx_runtime();
function EspetaculoIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		eyebrow: "Temporada",
		title: "Espetáculos.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "flex min-h-56 items-center justify-center border-dashed p-10 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl",
					children: "Detalhes em breve."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-md text-sm leading-relaxed text-muted-foreground",
					children: "As informações do espetáculo serão publicadas assim que a temporada for confirmada."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/programacao",
						children: "Ver programação"
					})
				})
			] })
		})
	});
}
//#endregion
export { EspetaculoIndex as component };
