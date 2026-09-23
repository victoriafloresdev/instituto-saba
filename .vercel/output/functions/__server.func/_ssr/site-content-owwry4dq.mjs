import { t as supabase } from "./supabase-BsWcV1lP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-content-owwry4dq.js
var SITE_ASSETS_BUCKET = "site-assets";
var SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
function isValidSlug(value) {
	return SLUG_PATTERN.test(value);
}
function slugify(value) {
	return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}
/** URL pública de um arquivo do bucket. Retorna null quando não há imagem. */
function siteAssetUrl(path) {
	if (!path) return null;
	return supabase.storage.from(SITE_ASSETS_BUCKET).getPublicUrl(path).data.publicUrl;
}
var SPONSOR_TYPE_LABELS = {
	master: "Patrocínio master",
	sponsor: "Patrocinador",
	supporter: "Apoiador",
	partner: "Parceiro"
};
/** Ordem de exibição dos blocos de patrocinadores no site. */
var SPONSOR_TYPE_ORDER = [
	"master",
	"sponsor",
	"supporter",
	"partner"
];
/**
* Data legível do espetáculo. O campo livre date_label tem prioridade porque
* permite textos como "Setembro · 2026" enquanto a data exata não é fechada.
*/
function formatSpectacleDate(spectacle) {
	if (spectacle.date_label) return spectacle.date_label;
	if (!spectacle.event_date) return "Data a confirmar";
	const [year, month, day] = spectacle.event_date.split("-").map(Number);
	return new Date(year, month - 1, day).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "long",
		year: "numeric"
	});
}
function formatSpectacleTime(spectacle) {
	const trim = (value) => value ? value.slice(0, 5) : null;
	const start = trim(spectacle.start_time);
	const end = trim(spectacle.end_time);
	if (start && end) return `${start} às ${end}`;
	if (start) return start;
	return "Em breve";
}
function formatSpectacleLocation(spectacle) {
	return [spectacle.venue, spectacle.city].filter(Boolean).join(" · ") || "Local a confirmar";
}
async function fetchPublishedSpectacles() {
	try {
		const { data, error } = await supabase.from("spectacles").select("*").eq("status", "published").order("sort_order", { ascending: true }).order("event_date", {
			ascending: true,
			nullsFirst: false
		}).order("created_at", { ascending: false });
		if (error) return [];
		return data ?? [];
	} catch {
		return [];
	}
}
async function fetchPublishedSpectacleBySlug(slug) {
	try {
		const { data, error } = await supabase.from("spectacles").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
		if (error) return null;
		return data ?? null;
	} catch {
		return null;
	}
}
async function fetchActiveSponsors() {
	try {
		const { data, error } = await supabase.from("sponsors").select("*").eq("status", "active").order("sort_order", { ascending: true }).order("created_at", { ascending: true });
		if (error) return [];
		return data ?? [];
	} catch {
		return [];
	}
}
async function fetchAllSpectacles() {
	const { data, error } = await supabase.from("spectacles").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
}
async function fetchAllSponsors() {
	const { data, error } = await supabase.from("sponsors").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: true });
	if (error) throw error;
	return data ?? [];
}
async function currentUserId() {
	const { data: { user } } = await supabase.auth.getUser();
	return user?.id ?? null;
}
async function createSpectacle(values) {
	const userId = await currentUserId();
	const { error } = await supabase.from("spectacles").insert({
		...values,
		created_by: userId,
		updated_by: userId
	});
	if (error) throw error;
}
async function updateSpectacle(id, values) {
	const userId = await currentUserId();
	const { error } = await supabase.from("spectacles").update({
		...values,
		updated_by: userId
	}).eq("id", id);
	if (error) throw error;
}
async function deleteSpectacle(id) {
	const { error } = await supabase.from("spectacles").delete().eq("id", id);
	if (error) throw error;
}
async function createSponsor(values) {
	const userId = await currentUserId();
	const { error } = await supabase.from("sponsors").insert({
		...values,
		created_by: userId,
		updated_by: userId
	});
	if (error) throw error;
}
async function updateSponsor(id, values) {
	const userId = await currentUserId();
	const { error } = await supabase.from("sponsors").update({
		...values,
		updated_by: userId
	}).eq("id", id);
	if (error) throw error;
}
async function deleteSponsor(id) {
	const { error } = await supabase.from("sponsors").delete().eq("id", id);
	if (error) throw error;
}
var ASSET_MIME_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/avif",
	"image/svg+xml"
];
/** Envia a imagem e devolve o caminho salvo em image_path / logo_path. */
async function uploadSiteAsset(folder, file) {
	if (file.size > 10485760) throw new Error("A imagem precisa ter no máximo 10 MB.");
	if (!ASSET_MIME_TYPES.includes(file.type)) throw new Error("Formatos aceitos: JPG, PNG, WEBP, AVIF ou SVG.");
	const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
	const path = `${folder}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${extension}`;
	const { error } = await supabase.storage.from(SITE_ASSETS_BUCKET).upload(path, file, {
		contentType: file.type,
		upsert: false
	});
	if (error) throw error;
	return path;
}
async function removeSiteAsset(path) {
	if (!path) return;
	await supabase.storage.from(SITE_ASSETS_BUCKET).remove([path]);
}
//#endregion
export { uploadSiteAsset as S, removeSiteAsset as _, createSponsor as a, updateSpectacle as b, fetchActiveSponsors as c, fetchPublishedSpectacleBySlug as d, fetchPublishedSpectacles as f, isValidSlug as g, formatSpectacleTime as h, createSpectacle as i, fetchAllSpectacles as l, formatSpectacleLocation as m, SPONSOR_TYPE_LABELS as n, deleteSpectacle as o, formatSpectacleDate as p, SPONSOR_TYPE_ORDER as r, deleteSponsor as s, ASSET_MIME_TYPES as t, fetchAllSponsors as u, siteAssetUrl as v, updateSponsor as x, slugify as y };
