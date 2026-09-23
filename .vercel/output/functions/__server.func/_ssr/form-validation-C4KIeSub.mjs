import { r as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/form-validation-C4KIeSub.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var FORM_LIMITS = {
	name: 120,
	email: 254,
	phone: 30,
	city: 100,
	subject: 160,
	role: 120,
	document: 32,
	school: 180,
	ageRange: 120,
	portfolio: 500,
	shortText: 255,
	message: 2e3
};
function formString(data, name) {
	const value = data.get(name);
	return typeof value === "string" ? value.trim() : "";
}
function isValidEmail(value) {
	return value.length <= FORM_LIMITS.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
function isValidPhone(value) {
	const digits = value.replace(/\D/g, "");
	return value.length <= FORM_LIMITS.phone && digits.length >= 8 && digits.length <= 15;
}
function isValidHttpUrl(value) {
	if (!value) return true;
	try {
		const url = new URL(value);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
}
function isIntegerBetween(value, min, max) {
	if (!/^\d+$/.test(value)) return false;
	const number = Number(value);
	return Number.isSafeInteger(number) && number >= min && number <= max;
}
function isMoney(value, max = 1e9) {
	if (!value) return true;
	const number = Number(value);
	return Number.isFinite(number) && number >= 0 && number <= max;
}
function isWithinLength(value, max, min = 1) {
	return value.length >= min && value.length <= max;
}
//#endregion
export { isMoney as a, isValidPhone as c, isIntegerBetween as i, isWithinLength as l, Textarea as n, isValidEmail as o, formString as r, isValidHttpUrl as s, FORM_LIMITS as t };
