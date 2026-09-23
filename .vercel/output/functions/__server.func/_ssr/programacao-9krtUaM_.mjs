import { f as fetchPublishedSpectacles } from "./site-content-owwry4dq.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/programacao-9krtUaM_.js
var $$splitComponentImporter = () => import("./programacao-DVhePuYL.mjs");
var Route = createFileRoute("/programacao")({
	head: () => ({ meta: [
		{ title: "Programação — Instituto Cultural Sabá" },
		{
			name: "description",
			content: "Datas, horários e locais das apresentações do Instituto Cultural Sabá."
		},
		{
			property: "og:title",
			content: "Programação — Instituto Cultural Sabá"
		}
	] }),
	loader: async () => ({ spectacles: await fetchPublishedSpectacles() }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
