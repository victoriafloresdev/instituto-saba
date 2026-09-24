import { useEffect, useRef, useState } from "react";
import { Pencil, Plus, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
  createSpectacle,
  deleteSpectacle,
  fetchAllSpectacles,
  formatSpectacleDate,
  formatSpectacleLocation,
  isValidSlug,
  removeSiteAsset,
  slugify,
  updateSpectacle,
} from "@/lib/site-content";
import type { Spectacle, SpectacleInsert, SpectacleStatus } from "@/lib/database.types";

type LinhaSessao = { data: string; hora: string };
/** Data e hora em campos separados; a hora é opcional (vale o início do dia). */
type DataHora = { data: string; hora: string };

const STATUS_OPTIONS: { value: SpectacleStatus; label: string }[] = [
  { value: "draft", label: "Rascunho" },
  { value: "published", label: "Publicado" },
  { value: "archived", label: "Arquivado" },
];

const STATUS_STYLES: Record<SpectacleStatus, string> = {
  draft: "bg-amber-100 text-amber-900",
  published: "bg-emerald-100 text-emerald-900",
  archived: "bg-secondary text-tinta-suave",
};

interface FormValues {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  synopsis: string;
  date_label: string;
  event_date: string;
  start_time: string;
  end_time: string;
  venue: string;
  address: string;
  city: string;
  classification: string;
  ticket_url: string;
  image_path: string | null;
  image_alt: string;
  sessions: LinhaSessao[];
  audition_enabled: boolean;
  audition_opens_at: DataHora;
  ticket_sales_open_at: DataHora;
  status: SpectacleStatus;
  sort_order: string;
}

const EMPTY: FormValues = {
  slug: "",
  title: "",
  subtitle: "",
  description: "",
  synopsis: "",
  date_label: "",
  event_date: "",
  start_time: "",
  end_time: "",
  venue: "",
  address: "",
  city: "",
  classification: "",
  ticket_url: "",
  image_path: null,
  image_alt: "",
  sessions: [],
  audition_enabled: false,
  audition_opens_at: { data: "", hora: "" },
  ticket_sales_open_at: { data: "", hora: "" },
  status: "draft",
  sort_order: "0",
};

function toFormValues(spectacle: Spectacle): FormValues {
  return {
    slug: spectacle.slug,
    title: spectacle.title,
    subtitle: spectacle.subtitle ?? "",
    description: spectacle.description ?? "",
    synopsis: spectacle.synopsis ?? "",
    date_label: spectacle.date_label ?? "",
    event_date: spectacle.event_date ?? "",
    start_time: spectacle.start_time?.slice(0, 5) ?? "",
    end_time: spectacle.end_time?.slice(0, 5) ?? "",
    venue: spectacle.venue ?? "",
    address: spectacle.address ?? "",
    city: spectacle.city ?? "",
    classification: spectacle.classification ?? "",
    ticket_url: spectacle.ticket_url ?? "",
    image_path: spectacle.image_path,
    image_alt: spectacle.image_alt ?? "",
    sessions: (spectacle.sessions ?? []).map((sessao) => ({
      data: sessao.data,
      hora: sessao.hora?.slice(0, 5) ?? "",
    })),
    audition_enabled: spectacle.audition_enabled ?? false,
    audition_opens_at: paraCampoLocal(spectacle.audition_opens_at),
    ticket_sales_open_at: paraCampoLocal(spectacle.ticket_sales_open_at),
    status: spectacle.status,
    sort_order: String(spectacle.sort_order),
  };
}

function optional(value: string): string | null {
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

/** Data do banco (ISO) para os campos de data e hora, no fuso de quem edita. */
function paraCampoLocal(iso: string | null | undefined): DataHora {
  if (!iso) return { data: "", hora: "" };
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return {
    data: `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`,
    hora: `${p(d.getHours())}:${p(d.getMinutes())}`,
  };
}

/**
 * Campos de data e hora (hora local) para ISO com fuso, como o banco guarda.
 * Sem hora, vale o início do dia — antes, um campo único de data e hora
 * ficava vazio se a hora não fosse preenchida, e a data se perdia em silêncio.
 */
function paraIso({ data, hora }: DataHora): string | null {
  return data ? new Date(`${data}T${hora || "00:00"}`).toISOString() : null;
}

function toPayload(values: FormValues): SpectacleInsert {
  return {
    slug: values.slug.trim(),
    title: values.title.trim(),
    subtitle: optional(values.subtitle),
    description: values.description.trim(),
    synopsis: optional(values.synopsis),
    date_label: optional(values.date_label),
    event_date: optional(values.event_date),
    start_time: optional(values.start_time),
    end_time: optional(values.end_time),
    venue: optional(values.venue),
    address: optional(values.address),
    city: optional(values.city),
    classification: optional(values.classification),
    ticket_url: optional(values.ticket_url),
    image_path: values.image_path,
    image_alt: optional(values.image_alt),
    sessions: values.sessions
      .filter((linha) => linha.data)
      .map((linha) => ({ data: linha.data, hora: linha.hora || null })),
    audition_enabled: values.audition_enabled,
    audition_opens_at: paraIso(values.audition_opens_at),
    ticket_sales_open_at: paraIso(values.ticket_sales_open_at),
    status: values.status,
    sort_order: Number(values.sort_order),
  };
}

export function SpectacleManager() {
  const [items, setItems] = useState<Spectacle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Spectacle | null>(null);
  const [creating, setCreating] = useState(false);
  const [removing, setRemoving] = useState<Spectacle | null>(null);

  async function load() {
    setLoading(true);
    try {
      setItems(await fetchAllSpectacles());
    } catch {
      toast.error(
        "Não foi possível carregar os espetáculos. Confira se a migração de conteúdo foi aplicada no Supabase.",
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
      await deleteSpectacle(removing.id);
      await removeSiteAsset(removing.image_path);
      toast.success("Espetáculo excluído.");
      setRemoving(null);
      await load();
    } catch {
      toast.error("Não foi possível excluir o espetáculo.");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-[60ch] text-muted-foreground">
          Espetáculos e sessões exibidos em <strong className="text-foreground">Programação</strong>
          . Apenas os publicados aparecem no site.
        </p>
        <Button size="sm" onClick={() => setCreating(true)}>
          <Plus className="mr-1 h-4 w-4" />
          Novo espetáculo
        </Button>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-semibold">Espetáculos</h2>
          <p className="text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "registro" : "registros"}
          </p>
        </div>
        {loading ? (
          <p className="p-6 text-sm text-muted-foreground">Carregando espetáculos...</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">Nenhum espetáculo cadastrado ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Local</TableHead>
                  <TableHead>Ordem</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">/{item.slug}</p>
                    </TableCell>
                    <TableCell>{formatSpectacleDate(item)}</TableCell>
                    <TableCell>{formatSpectacleLocation(item)}</TableCell>
                    <TableCell>{item.sort_order}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[item.status]}`}
                      >
                        {STATUS_OPTIONS.find((option) => option.value === item.status)?.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {item.status === "published" && (
                          <Button asChild variant="ghost" size="sm" title="Ver no site">
                            <a href={`/espetaculo/${item.slug}`} target="_blank" rel="noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
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
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <SpectacleDialog
        open={creating || editing !== null}
        spectacle={editing}
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
        title="Excluir espetáculo"
        description={`O espetáculo "${removing?.title ?? ""}" e sua imagem serão removidos.`}
        onCancel={() => setRemoving(null)}
        onConfirm={() => void confirmRemove()}
      />
    </div>
  );
}

function SpectacleDialog({
  open,
  spectacle,
  existingSlugs,
  onClose,
  onSaved,
}: {
  open: boolean;
  spectacle: Spectacle | null;
  existingSlugs: string[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [saving, setSaving] = useState(false);
  const campos = useRef<HTMLDivElement>(null);
  // Enquanto o identificador não for editado à mão, ele acompanha o título.
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (!open) return;
    setValues(spectacle ? toFormValues(spectacle) : EMPTY);
    setSlugTouched(spectacle !== null);
  }, [open, spectacle]);

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function setTitle(title: string) {
    setValues((current) => ({
      ...current,
      title,
      slug: slugTouched ? current.slug : slugify(title),
    }));
  }

  async function save() {
    // Data digitada pela metade: o navegador devolve valor vazio e a
    // informação sumiria sem aviso. Melhor barrar e mostrar onde está.
    const incompleto = Array.from(campos.current?.querySelectorAll("input") ?? []).find(
      (campo) => campo.validity.badInput,
    );
    if (incompleto) {
      toast.error("Há uma data ou um horário incompleto. Complete ou apague antes de salvar.");
      incompleto.focus();
      return;
    }
    const payload = toPayload(values);
    if (payload.title.length === 0 || payload.title.length > 180) {
      toast.error("Informe um título com até 180 caracteres.");
      return;
    }
    if (!isValidSlug(payload.slug)) {
      toast.error("O identificador deve conter apenas letras minúsculas, números e hífens.");
      return;
    }
    if (existingSlugs.includes(payload.slug)) {
      toast.error("Já existe outro espetáculo com este identificador.");
      return;
    }
    if (payload.ticket_url && !isValidHttpUrl(payload.ticket_url)) {
      toast.error("O link de ingressos deve começar com http:// ou https://.");
      return;
    }
    const sortOrder = payload.sort_order ?? 0;
    if (!Number.isInteger(sortOrder) || sortOrder < 0) {
      toast.error("A ordem de exibição deve ser um número inteiro maior ou igual a zero.");
      return;
    }

    setSaving(true);
    try {
      if (spectacle) {
        await updateSpectacle(spectacle.id, payload);
        toast.success("Espetáculo atualizado.");
      } else {
        await createSpectacle(payload);
        toast.success("Espetáculo criado.");
      }
      onSaved();
    } catch {
      toast.error("Não foi possível salvar o espetáculo.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="form-editorial max-h-[92vh] overflow-y-auto sm:max-w-3xl bg-papel">
        <DialogHeader>
          <DialogTitle>{spectacle ? "Editar espetáculo" : "Novo espetáculo"}</DialogTitle>
          <DialogDescription>
            Campos em branco não aparecem no site. Publique apenas quando o conteúdo estiver
            aprovado.
          </DialogDescription>
        </DialogHeader>

        <div ref={campos} className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Título"
            required
            value={values.title}
            onChange={setTitle}
            maxLength={180}
          />
          <TextField
            label="Identificador na URL"
            required
            value={values.slug}
            hint={`/espetaculo/${values.slug || "identificador"}`}
            onChange={(value) => {
              setSlugTouched(true);
              set("slug", value);
            }}
          />
          <TextField
            label="Etiqueta"
            value={values.subtitle}
            hint="Selo exibido no card da programação. Ex.: Espetáculo, Ação social."
            onChange={(value) => set("subtitle", value)}
          />
          <TextField
            label="Data por extenso"
            value={values.date_label}
            hint="Tem prioridade sobre a data exata. Ex.: Setembro · 2026."
            maxLength={120}
            onChange={(value) => set("date_label", value)}
          />
          <TextField
            label="Data do evento"
            type="date"
            value={values.event_date}
            onChange={(value) => set("event_date", value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Início"
              type="time"
              value={values.start_time}
              onChange={(value) => set("start_time", value)}
            />
            <TextField
              label="Término"
              type="time"
              value={values.end_time}
              onChange={(value) => set("end_time", value)}
            />
          </div>
          <Sessoes linhas={values.sessions} onChange={(linhas) => set("sessions", linhas)} />
          <TextField
            label="Teatro / local"
            value={values.venue}
            maxLength={240}
            onChange={(value) => set("venue", value)}
          />
          <TextField
            label="Cidade"
            value={values.city}
            maxLength={160}
            onChange={(value) => set("city", value)}
          />
          <TextField
            label="Endereço"
            className="sm:col-span-2"
            value={values.address}
            maxLength={500}
            onChange={(value) => set("address", value)}
          />
          <TextField
            label="Classificação indicativa"
            value={values.classification}
            maxLength={120}
            onChange={(value) => set("classification", value)}
          />
          <TextField
            label="Link de ingressos"
            value={values.ticket_url}
            placeholder="https://..."
            hint="O botão de compra só aparece depois da abertura da venda (se houver data)."
            onChange={(value) => set("ticket_url", value)}
          />
          <label className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 sm:col-span-2">
            <Checkbox
              checked={values.audition_enabled}
              onCheckedChange={(v) => set("audition_enabled", v === true)}
              className="mt-0.5"
            />
            <span>
              <span className="block font-semibold">Este espetáculo terá audição</span>
              <span className="mt-0.5 block text-sm font-normal text-muted-foreground">
                Aparece na página de Audições. As inscrições para ele só abrem na data de abertura
                abaixo.
              </span>
            </span>
          </label>
          <CampoAbertura
            rotulo="Abertura das audições"
            dica="É esta data que libera as inscrições; antes dela, o site mostra a contagem regressiva. Sem data, fica “a definir” e ninguém consegue se inscrever."
            valor={values.audition_opens_at}
            onChange={(valor) => set("audition_opens_at", valor)}
          />
          <CampoAbertura
            rotulo="Abertura da venda de ingressos"
            dica="Até esta data, a página do espetáculo mostra a contagem regressiva; depois dela, o botão de compra com o link de ingressos."
            valor={values.ticket_sales_open_at}
            onChange={(valor) => set("ticket_sales_open_at", valor)}
          />
          <TextAreaField
            label="Descrição"
            className="sm:col-span-2"
            value={values.description}
            rows={3}
            maxLength={10000}
            hint="Resumo exibido no card da programação e no topo da página do espetáculo."
            onChange={(value) => set("description", value)}
          />
          <TextAreaField
            label="Sinopse"
            className="sm:col-span-2"
            value={values.synopsis}
            rows={6}
            maxLength={10000}
            hint="Texto completo da página. Separe parágrafos com uma linha em branco."
            onChange={(value) => set("synopsis", value)}
          />
          <ContentImageField
            label="Imagem"
            folder="spectacles"
            value={values.image_path}
            onChange={(path) => set("image_path", path)}
          />
          <TextField
            label="Descrição da imagem"
            value={values.image_alt}
            maxLength={240}
            hint="Texto alternativo para leitores de tela."
            onChange={(value) => set("image_alt", value)}
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

/** Sessões do espetáculo: linhas de data e hora que se adicionam e removem. */
function Sessoes({
  linhas,
  onChange,
}: {
  linhas: LinhaSessao[];
  onChange: (linhas: LinhaSessao[]) => void;
}) {
  const alterar = (i: number, campo: keyof LinhaSessao, valor: string) =>
    onChange(linhas.map((linha, j) => (j === i ? { ...linha, [campo]: valor } : linha)));

  return (
    <fieldset className="sm:col-span-2">
      <legend>Sessões</legend>
      <p className="mt-1 text-sm text-muted-foreground">
        Cada data de apresentação. Com sessões cadastradas, o site lista todas na página do
        espetáculo.
      </p>
      <div className="mt-3 space-y-3">
        {linhas.map((linha, i) => (
          <div key={i} className="flex items-end gap-3">
            <label className="flex-1">
              <span className="sr-only">Data da sessão {i + 1}</span>
              <input
                type="date"
                value={linha.data}
                onChange={(e) => alterar(i, "data", e.target.value)}
                className="w-full"
              />
            </label>
            <label className="w-36">
              <span className="sr-only">Horário da sessão {i + 1}</span>
              <input
                type="time"
                value={linha.hora}
                onChange={(e) => alterar(i, "hora", e.target.value)}
                className="w-full"
              />
            </label>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              title="Remover sessão"
              onClick={() => onChange(linhas.filter((_, j) => j !== i))}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-3"
        onClick={() => onChange([...linhas, { data: "", hora: "" }])}
      >
        <Plus className="h-4 w-4" /> Adicionar sessão
      </Button>
    </fieldset>
  );
}

/** Data de abertura com hora opcional, em dois campos independentes. */
function CampoAbertura({
  rotulo,
  dica,
  valor,
  onChange,
}: {
  rotulo: string;
  dica: string;
  valor: DataHora;
  onChange: (valor: DataHora) => void;
}) {
  const id = rotulo.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <fieldset>
      <legend>{rotulo}</legend>
      <div className="flex items-end gap-3">
        <label className="flex-1">
          <span className="sr-only">Data</span>
          <input
            id={`${id}-data`}
            type="date"
            value={valor.data}
            onChange={(e) => onChange({ ...valor, data: e.target.value })}
            className="w-full"
          />
        </label>
        <label className="w-32">
          <span className="sr-only">Horário (opcional)</span>
          <input
            type="time"
            value={valor.hora}
            onChange={(e) => onChange({ ...valor, hora: e.target.value })}
            className="w-full"
          />
        </label>
      </div>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {dica} Sem horário, vale o início do dia.
        {valor.data && (
          <>
            {" "}
            <button
              type="button"
              className="font-semibold text-tinta underline-offset-2 hover:underline"
              onClick={() => onChange({ data: "", hora: "" })}
            >
              Limpar
            </button>
          </>
        )}
      </p>
    </fieldset>
  );
}
