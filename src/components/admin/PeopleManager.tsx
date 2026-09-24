import { useEffect, useState } from "react";
import { EyeOff, Pencil, Plus, Star, Trash2, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContentImageField } from "@/components/admin/ContentImageField";
import { SelectField, TextAreaField, TextField } from "@/components/admin/ContentFields";
import { DeleteContentDialog } from "@/components/admin/DeleteContentDialog";
import {
  createPerson,
  deletePerson,
  fetchAllSpectacles,
  fetchPeopleForAdmin,
  PERSON_CATEGORY_LABELS,
  PERSON_CATEGORY_ORDER,
  removeSiteAsset,
  siteAssetUrl,
  updatePerson,
} from "@/lib/site-content";
import type {
  PersonCategory,
  Spectacle,
  SpectaclePerson,
  SpectaclePersonInsert,
} from "@/lib/database.types";

const CATEGORY_HINTS: Record<PersonCategory, string> = {
  direcao: "Remontagem, direção, coreografia. Aparecem em cartões com foto.",
  equipe: "Produção, ensaiadores, figurino, técnica. Aparecem em lista.",
  elenco: "Bailarinos selecionados. Aparecem em grade com foto.",
  convidado: "Bailarinos convidados. Aparecem junto do elenco, em destaque.",
};

const CATEGORY_OPTIONS = PERSON_CATEGORY_ORDER.map((value) => ({
  value,
  label: PERSON_CATEGORY_LABELS[value],
}));

interface FormValues {
  name: string;
  role: string;
  category: PersonCategory;
  featured: boolean;
  summary: string;
  bio: string;
  photo_path: string | null;
  photo_alt: string;
  visible: boolean;
  sort_order: string;
}

function emptyValues(category: PersonCategory = "equipe"): FormValues {
  return {
    name: "",
    role: "",
    category,
    featured: false,
    summary: "",
    bio: "",
    photo_path: null,
    photo_alt: "",
    visible: true,
    sort_order: "0",
  };
}

function toFormValues(person: SpectaclePerson): FormValues {
  return {
    name: person.name,
    role: person.role,
    category: person.category,
    featured: person.featured,
    summary: person.summary ?? "",
    bio: person.bio ?? "",
    photo_path: person.photo_path,
    photo_alt: person.photo_alt ?? "",
    visible: person.visible,
    sort_order: String(person.sort_order),
  };
}

function optional(value: string): string | null {
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

/**
 * Equipe e elenco de cada espetáculo: quem aparece na ficha técnica da página
 * do espetáculo, com cargo, foto, resumo e biografia.
 */
export function PeopleManager() {
  const [spectacles, setSpectacles] = useState<Spectacle[]>([]);
  const [spectacleId, setSpectacleId] = useState("");
  const [people, setPeople] = useState<SpectaclePerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [missingTable, setMissingTable] = useState(false);
  const [editing, setEditing] = useState<SpectaclePerson | null>(null);
  const [creating, setCreating] = useState<PersonCategory | null>(null);
  const [removing, setRemoving] = useState<SpectaclePerson | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const list = await fetchAllSpectacles();
        setSpectacles(list);
        setSpectacleId((current) => current || list[0]?.id || "");
        if (list.length === 0) setLoading(false);
      } catch {
        toast.error("Não foi possível carregar os espetáculos.");
        setLoading(false);
      }
    })();
  }, []);

  async function load(id = spectacleId) {
    if (!id) return;
    setLoading(true);
    try {
      setPeople(await fetchPeopleForAdmin(id));
      setMissingTable(false);
    } catch {
      setMissingTable(true);
      setPeople([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load(spectacleId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spectacleId]);

  async function confirmRemove() {
    if (!removing) return;
    try {
      await deletePerson(removing.id);
      await removeSiteAsset(removing.photo_path);
      toast.success("Pessoa removida.");
      setRemoving(null);
      await load();
    } catch {
      toast.error("Não foi possível remover a pessoa.");
    }
  }

  const spectacle = spectacles.find((s) => s.id === spectacleId);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-[62ch]">
          <p className="text-muted-foreground">
            Quem aparece na <strong className="text-foreground">ficha técnica</strong> da página do
            espetáculo: direção, equipe, elenco e convidados, com cargo, foto e biografia.
          </p>
        </div>
        <div className="w-full sm:w-72">
          <p className="mb-1.5 text-sm font-semibold">Espetáculo</p>
          <Select value={spectacleId} onValueChange={setSpectacleId}>
            <SelectTrigger aria-label="Espetáculo">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {spectacles.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {missingTable ? (
        <Card className="p-6">
          <p className="font-semibold">A tabela de equipe ainda não existe no banco.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Aplique a migração <code>20260925000000_equipe_dos_espetaculos.sql</code> no SQL Editor
            do Supabase e atualize esta página. Até lá, o site mostra a ficha técnica que está no
            código.
          </p>
        </Card>
      ) : loading ? (
        <p className="text-sm text-muted-foreground">Carregando equipe...</p>
      ) : !spectacle ? (
        <p className="text-sm text-muted-foreground">Cadastre um espetáculo primeiro.</p>
      ) : (
        PERSON_CATEGORY_ORDER.map((category) => {
          const grupo = people.filter((p) => p.category === category);
          return (
            <Card key={category} className="overflow-hidden p-0">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
                <div>
                  <h2 className="font-semibold">{PERSON_CATEGORY_LABELS[category]}</h2>
                  <p className="text-sm text-muted-foreground">{CATEGORY_HINTS[category]}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => setCreating(category)}>
                  <Plus className="mr-1 h-4 w-4" />
                  Adicionar
                </Button>
              </div>
              {grupo.length === 0 ? (
                <p className="px-5 py-4 text-sm text-muted-foreground">Ninguém cadastrado.</p>
              ) : (
                <ul className="divide-y divide-border">
                  {grupo.map((person) => {
                    const foto = siteAssetUrl(person.photo_path);
                    return (
                      <li key={person.id} className="flex items-center gap-4 px-5 py-3">
                        {foto ? (
                          <img
                            src={foto}
                            alt=""
                            className="h-12 w-12 shrink-0 rounded-full object-cover grayscale"
                          />
                        ) : (
                          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-muted">
                            <UserRound className="h-5 w-5 text-muted-foreground" />
                          </span>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="flex flex-wrap items-center gap-2 font-medium">
                            {person.name}
                            {person.featured && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-laranja px-2 py-0.5 text-xs font-bold text-tinta">
                                <Star className="h-3 w-3" /> Destaque
                              </span>
                            )}
                            {!person.visible && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-tinta-suave">
                                <EyeOff className="h-3 w-3" /> Oculto
                              </span>
                            )}
                          </p>
                          <p className="truncate text-sm text-muted-foreground">
                            {person.role}
                            {person.summary ? ` · ${person.summary}` : ""}
                          </p>
                        </div>
                        <span className="hidden text-sm text-muted-foreground sm:inline">
                          Ordem {person.sort_order}
                        </span>
                        <div className="flex shrink-0 gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Editar"
                            onClick={() => setEditing(person)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Remover"
                            onClick={() => setRemoving(person)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Card>
          );
        })
      )}

      <PersonDialog
        open={creating !== null || editing !== null}
        person={editing}
        spectacleId={spectacleId}
        defaultCategory={creating ?? "equipe"}
        nextOrder={people.filter((p) => p.category === (creating ?? "equipe")).length}
        onClose={() => {
          setCreating(null);
          setEditing(null);
        }}
        onSaved={() => {
          setCreating(null);
          setEditing(null);
          void load();
        }}
      />

      <DeleteContentDialog
        open={removing !== null}
        title="Remover pessoa"
        description={`"${removing?.name ?? ""}" sai da ficha técnica deste espetáculo.`}
        onCancel={() => setRemoving(null)}
        onConfirm={() => void confirmRemove()}
      />
    </div>
  );
}

function PersonDialog({
  open,
  person,
  spectacleId,
  defaultCategory,
  nextOrder,
  onClose,
  onSaved,
}: {
  open: boolean;
  person: SpectaclePerson | null;
  spectacleId: string;
  defaultCategory: PersonCategory;
  nextOrder: number;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [values, setValues] = useState<FormValues>(emptyValues());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setValues(
      person
        ? toFormValues(person)
        : { ...emptyValues(defaultCategory), sort_order: String(nextOrder) },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, person]);

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function save() {
    const name = values.name.trim();
    const role = values.role.trim();
    if (!name || name.length > 180) {
      toast.error("Informe o nome, com até 180 caracteres.");
      return;
    }
    if (!role || role.length > 120) {
      toast.error("Informe o cargo ou função, com até 120 caracteres.");
      return;
    }
    const sortOrder = Number(values.sort_order);
    if (!Number.isInteger(sortOrder) || sortOrder < 0) {
      toast.error("A ordem deve ser um número inteiro maior ou igual a zero.");
      return;
    }
    const payload: SpectaclePersonInsert = {
      spectacle_id: spectacleId,
      name,
      role,
      category: values.category,
      featured: values.featured,
      summary: optional(values.summary),
      // Normaliza as quebras: parágrafos separados por uma linha em branco.
      bio: optional(values.bio.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n")),
      photo_path: values.photo_path,
      photo_alt: optional(values.photo_alt),
      visible: values.visible,
      sort_order: sortOrder,
    };

    setSaving(true);
    try {
      if (person) {
        await updatePerson(person.id, payload);
        toast.success("Pessoa atualizada.");
      } else {
        await createPerson(payload);
        toast.success("Pessoa adicionada.");
      }
      onSaved();
    } catch {
      toast.error("Não foi possível salvar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="form-editorial max-h-[92vh] overflow-y-auto bg-papel sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{person ? "Editar pessoa" : "Adicionar pessoa"}</DialogTitle>
          <DialogDescription>
            Os dados aparecem na ficha técnica da página do espetáculo.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Nome"
            required
            value={values.name}
            maxLength={180}
            onChange={(value) => set("name", value)}
          />
          <TextField
            label="Cargo ou função"
            required
            value={values.role}
            maxLength={120}
            placeholder="Ex.: Direção geral, Kitri, Figurino"
            onChange={(value) => set("role", value)}
          />
          <SelectField
            label="Categoria"
            value={values.category}
            options={CATEGORY_OPTIONS}
            hint={CATEGORY_HINTS[values.category]}
            onChange={(value) => set("category", value)}
          />
          <TextField
            label="Ordem de exibição"
            type="number"
            min={0}
            value={values.sort_order}
            hint="Números menores aparecem primeiro, dentro da categoria."
            onChange={(value) => set("sort_order", value)}
          />
          <TextAreaField
            label="Resumo"
            className="sm:col-span-2"
            value={values.summary}
            rows={2}
            maxLength={400}
            hint="Uma ou duas frases. Aparece sempre, abaixo do nome."
            onChange={(value) => set("summary", value)}
          />
          <TextAreaField
            label="Biografia completa"
            className="sm:col-span-2"
            value={values.bio}
            rows={7}
            maxLength={8000}
            hint="Aparece ao clicar em “Saiba mais”. Separe os parágrafos com uma linha em branco. Pode deixar vazio."
            onChange={(value) => set("bio", value)}
          />
          <ContentImageField
            label="Foto"
            folder="spectacles"
            value={values.photo_path}
            hint="Retrato, de preferência vertical e com pelo menos 600 px de largura. O site exibe em preto e branco."
            onChange={(path) => set("photo_path", path)}
          />
          <TextField
            label="Descrição da foto"
            value={values.photo_alt}
            maxLength={240}
            hint="Texto para leitores de tela. Se ficar vazio, usamos “Retrato de” + nome."
            onChange={(value) => set("photo_alt", value)}
          />
          <div className="space-y-4 sm:col-span-2">
            <label className="consentimento flex items-start gap-3">
              <Checkbox
                checked={values.featured}
                onCheckedChange={(v) => set("featured", v === true)}
                className="mt-0.5"
              />
              <span>
                <strong className="font-semibold">Destaque</strong>
                <span className="block text-sm text-muted-foreground">
                  Mostra a pessoa no cartão grande do topo da ficha técnica.
                </span>
              </span>
            </label>
            <label className="consentimento flex items-start gap-3">
              <Checkbox
                checked={values.visible}
                onCheckedChange={(v) => set("visible", v === true)}
                className="mt-0.5"
              />
              <span>
                <strong className="font-semibold">Visível no site</strong>
                <span className="block text-sm text-muted-foreground">
                  Desmarque para esconder sem apagar.
                </span>
              </span>
            </label>
          </div>
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
