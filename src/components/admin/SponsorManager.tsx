import { useEffect, useState } from "react";
import { Building2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ContentImageField } from "@/components/admin/ContentImageField";
import { SelectField, TextAreaField, TextField } from "@/components/admin/ContentFields";
import { DeleteContentDialog } from "@/components/admin/DeleteContentDialog";
import { isValidHttpUrl } from "@/lib/form-validation";
import {
  createSponsor,
  deleteSponsor,
  fetchAllSponsors,
  isValidSlug,
  removeSiteAsset,
  siteAssetUrl,
  slugify,
  SPONSOR_TYPE_LABELS,
  SPONSOR_TYPE_ORDER,
  updateSponsor,
} from "@/lib/site-content";
import type { Sponsor, SponsorInsert, SponsorStatus, SponsorType } from "@/lib/database.types";

const TYPE_OPTIONS = SPONSOR_TYPE_ORDER.map((value) => ({
  value,
  label: SPONSOR_TYPE_LABELS[value],
}));

const STATUS_OPTIONS: { value: SponsorStatus; label: string }[] = [
  { value: "active", label: "Ativo" },
  { value: "inactive", label: "Inativo" },
];

interface FormValues {
  slug: string;
  name: string;
  sponsor_type: SponsorType;
  description: string;
  website_url: string;
  logo_path: string | null;
  logo_alt: string;
  status: SponsorStatus;
  sort_order: string;
}

const EMPTY: FormValues = {
  slug: "",
  name: "",
  sponsor_type: "sponsor",
  description: "",
  website_url: "",
  logo_path: null,
  logo_alt: "",
  status: "inactive",
  sort_order: "0",
};

function toFormValues(sponsor: Sponsor): FormValues {
  return {
    slug: sponsor.slug,
    name: sponsor.name,
    sponsor_type: sponsor.sponsor_type,
    description: sponsor.description ?? "",
    website_url: sponsor.website_url ?? "",
    logo_path: sponsor.logo_path,
    logo_alt: sponsor.logo_alt ?? "",
    status: sponsor.status,
    sort_order: String(sponsor.sort_order),
  };
}

function optional(value: string): string | null {
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

function toPayload(values: FormValues): SponsorInsert {
  return {
    slug: values.slug.trim(),
    name: values.name.trim(),
    sponsor_type: values.sponsor_type,
    description: optional(values.description),
    website_url: optional(values.website_url),
    logo_path: values.logo_path,
    logo_alt: optional(values.logo_alt),
    status: values.status,
    sort_order: Number(values.sort_order),
  };
}

export function SponsorManager() {
  const [items, setItems] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Sponsor | null>(null);
  const [creating, setCreating] = useState(false);
  const [removing, setRemoving] = useState<Sponsor | null>(null);

  async function load() {
    setLoading(true);
    try {
      setItems(await fetchAllSponsors());
    } catch {
      toast.error(
        "Não foi possível carregar os patrocinadores. Confira se a migração de conteúdo foi aplicada no Supabase.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
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

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-[60ch] text-muted-foreground">
          Marcas exibidas na página <strong className="text-foreground">Patrocinadores</strong>.
          Apenas as ativas aparecem no site.
        </p>
        <Button size="sm" onClick={() => setCreating(true)}>
          <Plus className="mr-1 h-4 w-4" />
          Novo patrocinador
        </Button>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-semibold">Patrocinadores e parceiros</h2>
          <p className="text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "registro" : "registros"}
          </p>
        </div>
        {loading ? (
          <p className="p-6 text-sm text-muted-foreground">Carregando patrocinadores...</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">Nenhum patrocinador cadastrado ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Ordem</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => {
                  const logoUrl = siteAssetUrl(item.logo_path);
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        {logoUrl ? (
                          <img
                            src={logoUrl}
                            alt=""
                            className="h-8 w-20 object-contain object-left"
                          />
                        ) : (
                          <Building2 className="h-5 w-5 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.slug}</p>
                      </TableCell>
                      <TableCell>{SPONSOR_TYPE_LABELS[item.sponsor_type]}</TableCell>
                      <TableCell>{item.sort_order}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            item.status === "active"
                              ? "bg-emerald-100 text-emerald-900"
                              : "bg-secondary text-tinta-suave"
                          }`}
                        >
                          {item.status === "active" ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Editar"
                            onClick={() => setEditing(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Excluir"
                            onClick={() => setRemoving(item)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <SponsorDialog
        open={creating || editing !== null}
        sponsor={editing}
        existingSlugs={items.filter((item) => item.id !== editing?.id).map((item) => item.slug)}
        onClose={() => {
          setCreating(false);
          setEditing(null);
        }}
        onSaved={() => {
          setCreating(false);
          setEditing(null);
          void load();
        }}
      />

      <DeleteContentDialog
        open={removing !== null}
        title="Excluir patrocinador"
        description={`O patrocinador "${removing?.name ?? ""}" e seu logo serão removidos.`}
        onCancel={() => setRemoving(null)}
        onConfirm={() => void confirmRemove()}
      />
    </div>
  );
}

function SponsorDialog({
  open,
  sponsor,
  existingSlugs,
  onClose,
  onSaved,
}: {
  open: boolean;
  sponsor: Sponsor | null;
  existingSlugs: string[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (!open) return;
    setValues(sponsor ? toFormValues(sponsor) : EMPTY);
    setSlugTouched(sponsor !== null);
  }, [open, sponsor]);

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function setName(name: string) {
    setValues((current) => ({
      ...current,
      name,
      slug: slugTouched ? current.slug : slugify(name),
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

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="form-editorial max-h-[92vh] overflow-y-auto sm:max-w-2xl bg-papel">
        <DialogHeader>
          <DialogTitle>{sponsor ? "Editar patrocinador" : "Novo patrocinador"}</DialogTitle>
          <DialogDescription>
            Publique apenas marcas com autorização de uso do logo confirmada.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Nome" required value={values.name} onChange={setName} maxLength={180} />
          <TextField
            label="Identificador"
            required
            value={values.slug}
            hint="Uso interno, não aparece no site."
            onChange={(value) => {
              setSlugTouched(true);
              set("slug", value);
            }}
          />
          <SelectField
            label="Categoria"
            value={values.sponsor_type}
            options={TYPE_OPTIONS}
            hint="Patrocínio master aparece em destaque no topo da página."
            onChange={(value) => set("sponsor_type", value)}
          />
          <TextField
            label="Site"
            value={values.website_url}
            placeholder="https://..."
            onChange={(value) => set("website_url", value)}
          />
          <TextAreaField
            label="Descrição"
            className="sm:col-span-2"
            value={values.description}
            rows={4}
            maxLength={5000}
            onChange={(value) => set("description", value)}
          />
          <ContentImageField
            label="Logo"
            folder="sponsors"
            value={values.logo_path}
            hint="Prefira PNG com fundo transparente ou SVG."
            onChange={(path) => set("logo_path", path)}
          />
          <TextField
            label="Descrição do logo"
            value={values.logo_alt}
            maxLength={240}
            hint="Texto alternativo para leitores de tela."
            onChange={(value) => set("logo_alt", value)}
          />
          <SelectField
            label="Status"
            value={values.status}
            options={STATUS_OPTIONS}
            onChange={(value) => set("status", value)}
          />
          <TextField
            label="Ordem de exibição"
            type="number"
            min={0}
            value={values.sort_order}
            hint="Números menores aparecem primeiro."
            onChange={(value) => set("sort_order", value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={() => void save()} disabled={saving}>
            {saving ? "Salvando…" : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
