import { c as fetchActiveSponsors } from "./site-content-owwry4dq.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/patrocinadores-CTHPHLsP.js
var $$splitComponentImporter = () => import("./patrocinadores-XDx_GVuj.mjs");
var Route = createFileRoute("/patrocinadores")({
	head: () => ({ meta: [{ title: "Patrocinadores — Instituto Cultural Sabá" }, {
		name: "description",
		content: "Conheça quem apoia o Instituto Cultural Sabá e o Ballet Dom Quixote."
	}] }),
	loader: async () => ({ sponsors: await fetchActiveSponsors() }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
