import { d as fetchPublishedSpectacleBySlug } from "./site-content-owwry4dq.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/espetaculo._slug-BeJ-rV4M.js
var $$splitComponentImporter = () => import("./espetaculo._slug-njzOohwL.mjs");
var Route = createFileRoute("/espetaculo/$slug")({
	loader: async ({ params }) => ({ spectacle: await fetchPublishedSpectacleBySlug(params.slug) }),
	head: ({ loaderData }) => {
		const spectacle = loaderData?.spectacle;
		const title = spectacle ? `${spectacle.title} — Instituto Cultural Sabá` : "Espetáculo — Instituto Cultural Sabá";
		return { meta: [
			{ title },
			{
				name: "description",
				content: spectacle?.description?.slice(0, 180) || "Informações sobre os espetáculos do Instituto Cultural Sabá."
			},
			{
				property: "og:title",
				content: title
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
