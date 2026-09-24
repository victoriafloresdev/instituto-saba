import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type {
  PersonCategory,
  Sessao,
  Spectacle,
  SpectaclePerson,
  SpectaclePersonInsert,
  SpectacleInsert,
  Sponsor,
  SponsorInsert,
  SponsorType,
} from "@/lib/database.types";

export const SITE_ASSETS_BUCKET = "site-assets";

/** Pastas aceitas pelas políticas de escrita do bucket site-assets. */
export type AssetFolder = "spectacles" | "sponsors" | "general";

export const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function isValidSlug(value: string): boolean {
  return SLUG_PATTERN.test(value);
}

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * URL pública de um arquivo do bucket. Retorna null quando não há imagem.
 * Caminhos que começam com "/" (ou http) já são endereços prontos — as fotos
 * que vieram do código e ficam em public/images.
 */
export function siteAssetUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("/") || /^https?:\/\//.test(path)) return path;
  return supabase.storage.from(SITE_ASSETS_BUCKET).getPublicUrl(path).data.publicUrl;
}

export const SPONSOR_TYPE_LABELS: Record<SponsorType, string> = {
  master: "Patrocínio master",
  sponsor: "Patrocinador",
  supporter: "Apoiador",
  partner: "Parceiro",
};

/** Ordem de exibição dos blocos de patrocinadores no site. */
export const SPONSOR_TYPE_ORDER: SponsorType[] = ["master", "sponsor", "supporter", "partner"];

/**
 * Data legível do espetáculo. O campo livre date_label tem prioridade porque
 * permite textos como "Setembro · 2026" enquanto a data exata não é fechada.
 */
export function formatSpectacleDate(spectacle: Spectacle): string {
  if (spectacle.date_label) return spectacle.date_label;
  if (!spectacle.event_date) return "Data a confirmar";
  const [year, month, day] = spectacle.event_date.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/** Sessões em ordem cronológica, ignorando entradas sem data. */
export function sessoesOrdenadas(spectacle: Pick<Spectacle, "sessions">): Sessao[] {
  return [...(spectacle.sessions ?? [])]
    .filter((s) => /^\d{4}-\d{2}-\d{2}$/.test(s.data))
    .sort((a, b) => `${a.data} ${a.hora ?? ""}`.localeCompare(`${b.data} ${b.hora ?? ""}`));
}

/** "sábado, 12 de junho · 20h" — a hora aparece só quando existe. */
export function formatSessao(sessao: Sessao): string {
  const [ano, mes, dia] = sessao.data.split("-").map(Number);
  const data = new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  if (!sessao.hora) return data;
  const [h, m] = sessao.hora.split(":");
  return `${data} · ${Number(h)}h${m && m !== "00" ? m : ""}`;
}

export function formatSpectacleTime(spectacle: Spectacle): string {
  const trim = (value: string | null) => (value ? value.slice(0, 5) : null);
  const start = trim(spectacle.start_time);
  const end = trim(spectacle.end_time);
  if (start && end) return `${start} às ${end}`;
  if (start) return start;
  return "Em breve";
}

export function formatSpectacleLocation(spectacle: Spectacle): string {
  return [spectacle.venue, spectacle.city].filter(Boolean).join(" · ") || "Local a confirmar";
}

// --- Leitura pública -------------------------------------------------------
// Os fetchers públicos rodam no loader das rotas (SSR e navegação no cliente).
// Erros nunca são propagados: uma falha de rede não pode derrubar a página,
// ela apenas cai no estado vazio de cada seção.

export async function fetchPublishedSpectacles(): Promise<Spectacle[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const { data, error } = await supabase
      .from("spectacles")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("event_date", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

export async function fetchPublishedSpectacleBySlug(slug: string): Promise<Spectacle | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from("spectacles")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (error) return null;
    return data ?? null;
  } catch {
    return null;
  }
}

export async function fetchActiveSponsors(): Promise<Sponsor[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const { data, error } = await supabase
      .from("sponsors")
      .select("*")
      .eq("status", "active")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

/**
 * Equipe e elenco publicados de um espetáculo. Devolve null quando a tabela
 * ainda não existe (migração não aplicada) ou a consulta falha — a página
 * então usa a ficha que está no código.
 */
export async function fetchSpectaclePeople(spectacleId: string): Promise<SpectaclePerson[] | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from("spectacle_people")
      .select("*")
      .eq("spectacle_id", spectacleId)
      .eq("visible", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) return null;
    return data ?? [];
  } catch {
    return null;
  }
}

export const PERSON_CATEGORY_LABELS: Record<PersonCategory, string> = {
  direcao: "Direção e criação",
  equipe: "Produção e equipe",
  elenco: "Elenco (bailarinos)",
  convidado: "Bailarinos convidados",
};

export const PERSON_CATEGORY_ORDER: PersonCategory[] = ["direcao", "equipe", "elenco", "convidado"];

// --- Leitura e escrita no painel ------------------------------------------
// Aqui os erros sobem para a interface, que exibe a mensagem ao administrador.

export async function fetchAllSpectacles(): Promise<Spectacle[]> {
  const { data, error } = await supabase
    .from("spectacles")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchAllSponsors(): Promise<Sponsor[]> {
  const { data, error } = await supabase
    .from("sponsors")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

async function currentUserId(): Promise<string | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}

export async function createSpectacle(values: SpectacleInsert): Promise<void> {
  const userId = await currentUserId();
  const { error } = await supabase
    .from("spectacles")
    .insert({ ...values, created_by: userId, updated_by: userId });
  if (error) throw error;
}

export async function updateSpectacle(id: string, values: SpectacleInsert): Promise<void> {
  const userId = await currentUserId();
  const { error } = await supabase
    .from("spectacles")
    .update({ ...values, updated_by: userId })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteSpectacle(id: string): Promise<void> {
  const { error } = await supabase.from("spectacles").delete().eq("id", id);
  if (error) throw error;
}

export async function createSponsor(values: SponsorInsert): Promise<void> {
  const userId = await currentUserId();
  const { error } = await supabase
    .from("sponsors")
    .insert({ ...values, created_by: userId, updated_by: userId });
  if (error) throw error;
}

export async function updateSponsor(id: string, values: SponsorInsert): Promise<void> {
  const userId = await currentUserId();
  const { error } = await supabase
    .from("sponsors")
    .update({ ...values, updated_by: userId })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteSponsor(id: string): Promise<void> {
  const { error } = await supabase.from("sponsors").delete().eq("id", id);
  if (error) throw error;
}

export async function fetchPeopleForAdmin(spectacleId: string): Promise<SpectaclePerson[]> {
  const { data, error } = await supabase
    .from("spectacle_people")
    .select("*")
    .eq("spectacle_id", spectacleId)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createPerson(values: SpectaclePersonInsert): Promise<void> {
  const { error } = await supabase.from("spectacle_people").insert(values);
  if (error) throw error;
}

export async function updatePerson(id: string, values: SpectaclePersonInsert): Promise<void> {
  const { error } = await supabase.from("spectacle_people").update(values).eq("id", id);
  if (error) throw error;
}

export async function deletePerson(id: string): Promise<void> {
  const { error } = await supabase.from("spectacle_people").delete().eq("id", id);
  if (error) throw error;
}

// --- Arquivos --------------------------------------------------------------

export const ASSET_MAX_BYTES = 10 * 1024 * 1024;
export const ASSET_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/svg+xml",
];

/** Envia a imagem e devolve o caminho salvo em image_path / logo_path. */
export async function uploadSiteAsset(folder: AssetFolder, file: File): Promise<string> {
  if (file.size > ASSET_MAX_BYTES) {
    throw new Error("A imagem precisa ter no máximo 10 MB.");
  }
  if (!ASSET_MIME_TYPES.includes(file.type)) {
    throw new Error("Formatos aceitos: JPG, PNG, WEBP, AVIF ou SVG.");
  }
  const extension =
    file.name
      .split(".")
      .pop()
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `${folder}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${extension}`;
  const { error } = await supabase.storage
    .from(SITE_ASSETS_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  return path;
}

export async function removeSiteAsset(path: string | null | undefined): Promise<void> {
  // Fotos estáticas (public/images) não estão no bucket.
  if (!path || path.startsWith("/") || /^https?:\/\//.test(path)) return;
  await supabase.storage.from(SITE_ASSETS_BUCKET).remove([path]);
}
