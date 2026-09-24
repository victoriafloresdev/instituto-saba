import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LayoutDashboard,
  Users,
  Building2,
  GraduationCap,
  MessageSquare,
  LogOut,
  Download,
  Menu,
  RefreshCw,
  Theater,
  Handshake,
  Contact,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Marca } from "@/components/site/Marca";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { SupabaseConfigNotice } from "@/components/admin/SupabaseConfigNotice";
import { SpectacleManager } from "@/components/admin/SpectacleManager";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SponsorManager } from "@/components/admin/SponsorManager";
import { PeopleManager } from "@/components/admin/PeopleManager";
import type { Status } from "@/lib/database.types";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Painel — Instituto Cultural Saba" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: () => (isSupabaseConfigured ? <Dashboard /> : <SupabaseConfigNotice />),
});

// Formulários recebidos do site.
type Kind = "audicoes" | "patrocinadores" | "escolas" | "mensagens";
// Conteúdo editável que alimenta as páginas públicas.
type ContentView = "conteudo-espetaculos" | "conteudo-equipe" | "conteudo-patrocinadores";
type View = "dashboard" | Kind | ContentView;
type NavItem = { key: View; label: string; icon: React.ComponentType<{ className?: string }> };
type AdminRow = {
  id: string;
  kind: Kind;
  title: string;
  subtitle: string;
  detail: string;
  status: Status;
  createdAt: string;
  /** Só nas audições: espetáculo da inscrição (nulo = banco de talentos). */
  espetaculoId?: string | null;
};

const BANCO = "banco";
const TODAS = "todas";
const statuses: Status[] = ["Novo", "Em análise", "Aprovado", "Recusado", "Contatado"];

function Dashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("dashboard");
  const [openNav, setOpenNav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<AdminRow[]>([]);
  const [espetaculos, setEspetaculos] = useState<{ id: string; title: string }[]>([]);
  const [filtroAudicao, setFiltroAudicao] = useState(TODAS);

  async function load() {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      navigate({ to: "/admin" });
      return;
    }
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();
    if (profile?.role !== "admin") {
      await supabase.auth.signOut();
      navigate({ to: "/admin" });
      return;
    }
    const [auditions, sponsorships, schools, messages, lista] = await Promise.all([
      supabase.from("auditions").select("*").order("created_at", { ascending: false }),
      supabase.from("sponsorship_leads").select("*").order("created_at", { ascending: false }),
      supabase.from("school_registrations").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
      supabase.from("spectacles").select("id, title").order("sort_order"),
    ]);
    const error = auditions.error || sponsorships.error || schools.error || messages.error;
    if (error) toast.error("Não foi possível carregar os dados do painel.");
    const titulos = new Map((lista.data ?? []).map((e) => [e.id, e.title]));
    setEspetaculos(lista.data ?? []);
    setRows([
      ...(auditions.data ?? []).map((r) => ({
        id: r.id,
        kind: "audicoes" as const,
        title: r.nome,
        subtitle: r.spectacle_id
          ? (titulos.get(r.spectacle_id) ?? "Espetáculo removido")
          : "Banco de talentos",
        detail: [r.modalidade, r.cidade, r.email].filter(Boolean).join(" · "),
        status: r.status,
        createdAt: r.created_at,
        espetaculoId: r.spectacle_id,
      })),
      ...(sponsorships.data ?? []).map((r) => ({
        id: r.id,
        kind: "patrocinadores" as const,
        title: r.nome,
        subtitle: r.empresa || r.tipo,
        detail: `${r.email} · ${r.valor ? Number(r.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "Valor não informado"}`,
        status: r.status,
        createdAt: r.created_at,
      })),
      ...(schools.data ?? []).map((r) => ({
        id: r.id,
        kind: "escolas" as const,
        title: r.escola,
        subtitle: r.responsavel,
        detail: `${r.cidade} · ${r.alunos} alunos`,
        status: r.status,
        createdAt: r.created_at,
      })),
      ...(messages.data ?? []).map((r) => ({
        id: r.id,
        kind: "mensagens" as const,
        title: r.nome,
        subtitle: r.assunto,
        detail: r.email,
        status: r.status,
        createdAt: r.created_at,
      })),
    ]);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);
  const byKind = (kind: Kind) => rows.filter((row) => row.kind === kind);

  async function updateStatus(row: AdminRow, status: Status) {
    const table =
      row.kind === "audicoes"
        ? "auditions"
        : row.kind === "patrocinadores"
          ? "sponsorship_leads"
          : row.kind === "escolas"
            ? "school_registrations"
            : "contact_messages";
    const { error } = await supabase.from(table).update({ status }).eq("id", row.id);
    if (error) {
      toast.error("Não foi possível atualizar o status.");
      return;
    }
    setRows((current) =>
      current.map((item) =>
        item.id === row.id && item.kind === row.kind ? { ...item, status } : item,
      ),
    );
    toast.success("Status atualizado.");
  }

  async function logout() {
    await supabase.auth.signOut();
    toast.success("Sessão encerrada.");
    navigate({ to: "/admin" });
  }
  async function exportCsv() {
    const [auditions, sponsorships, schools, messages, lista] = await Promise.all([
      supabase.from("auditions").select("*").order("created_at", { ascending: false }),
      supabase.from("sponsorship_leads").select("*").order("created_at", { ascending: false }),
      supabase.from("school_registrations").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
      supabase.from("spectacles").select("id, title"),
    ]);
    const error = auditions.error || sponsorships.error || schools.error || messages.error;
    const nomes = new Map((lista.data ?? []).map((e) => [e.id, e.title]));
    if (error) {
      toast.error("Não foi possível preparar o CSV completo.");
      return;
    }
    const completeRows = [
      ...(auditions.data ?? []).map((record) => ({
        tipo_registro: "Audição",
        audicao: record.spectacle_id
          ? (nomes.get(record.spectacle_id) ?? "Espetáculo removido")
          : "Banco de talentos",
        ...record,
      })),
      ...(sponsorships.data ?? []).map((record) => ({ tipo_registro: "Patrocínio", ...record })),
      ...(schools.data ?? []).map((record) => ({ tipo_registro: "Escola", ...record })),
      ...(messages.data ?? []).map((record) => ({ tipo_registro: "Contato", ...record })),
    ];
    const headers = Array.from(new Set(completeRows.flatMap((record) => Object.keys(record))));
    const lines = completeRows.map((record) =>
      headers
        .map((header) => {
          const value = record[header as keyof typeof record] ?? "";
          return `"${String(value).replaceAll('"', '""')}"`;
        })
        .join(","),
    );
    const blob = new Blob([[headers.join(","), ...lines].join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "instituto-saba-registros-completos.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV completo gerado.");
  }

  const leadItems: NavItem[] = [
    { key: "dashboard", label: "Visão geral", icon: LayoutDashboard },
    { key: "audicoes", label: "Audições", icon: Users },
    { key: "patrocinadores", label: "Patrocínios", icon: Building2 },
    { key: "escolas", label: "Escolas", icon: GraduationCap },
    { key: "mensagens", label: "Mensagens", icon: MessageSquare },
  ];
  const contentItems: NavItem[] = [
    { key: "conteudo-espetaculos", label: "Espetáculos", icon: Theater },
    { key: "conteudo-equipe", label: "Equipe e elenco", icon: Contact },
    { key: "conteudo-patrocinadores", label: "Patrocinadores", icon: Handshake },
  ];
  const items = [...leadItems, ...contentItems];
  const isContentView =
    view === "conteudo-espetaculos" ||
    view === "conteudo-equipe" ||
    view === "conteudo-patrocinadores";
  const currentRows = (view === "dashboard" || isContentView ? [] : byKind(view)).filter(
    (row) =>
      view !== "audicoes" ||
      filtroAudicao === TODAS ||
      (filtroAudicao === BANCO ? !row.espetaculoId : row.espetaculoId === filtroAudicao),
  );
  const novos = (kind: View) =>
    rows.filter((row) => row.kind === kind && row.status === "Novo").length;

  function selecionar(key: View) {
    setView(key);
    setOpenNav(false);
  }

  return (
    <div className="papel flex min-h-screen">
      {openNav && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-30 bg-tinta/50 md:hidden"
          onClick={() => setOpenNav(false)}
        />
      )}

      <aside
        className={cn(
          "palco fixed inset-y-0 left-0 z-40 flex w-64 flex-col transition-transform duration-300 ease-[var(--ease-releve)] md:sticky md:top-0 md:h-screen md:translate-x-0",
          openNav ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="fio flex h-16 shrink-0 items-center border-b px-5">
          <Link to="/" className="group" aria-label="Ver o site">
            <Marca />
          </Link>
        </div>

        <nav aria-label="Painel" className="flex-1 overflow-y-auto px-3 py-6">
          <p className="eyebrow suave px-3 pb-2">Recebidos</p>
          {leadItems.map((item) => (
            <NavButton
              key={item.key}
              item={item}
              active={view === item.key}
              contagem={item.key === "dashboard" ? 0 : novos(item.key)}
              onSelect={() => selecionar(item.key)}
            />
          ))}
          <p className="eyebrow suave px-3 pb-2 pt-7">Conteúdo do site</p>
          {contentItems.map((item) => (
            <NavButton
              key={item.key}
              item={item}
              active={view === item.key}
              onSelect={() => selecionar(item.key)}
            />
          ))}
        </nav>

        <div className="fio space-y-0.5 border-t p-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-[0.9375rem] text-papel-suave transition-colors hover:bg-white/5 hover:text-papel"
          >
            <ExternalLink className="h-4 w-4" /> Ver o site
          </a>
          <button
            type="button"
            onClick={() => void logout()}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-[0.9375rem] text-papel-suave transition-colors hover:bg-white/5 hover:text-papel"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-border bg-papel/95 px-4 backdrop-blur md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              aria-label="Abrir menu"
              aria-expanded={openNav}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden"
              onClick={() => setOpenNav(true)}
            >
              <Menu className="h-4 w-4" />
            </button>
            <h1 className="truncate font-display text-2xl font-semibold [font-stretch:88%]">
              {items.find((item) => item.key === view)?.label}
            </h1>
          </div>
          {!isContentView && (
            <div className="flex shrink-0 gap-2">
              <Button variant="outline" size="sm" onClick={() => void load()}>
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">Atualizar</span>
              </Button>
              <Button size="sm" onClick={() => void exportCsv()}>
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Exportar CSV</span>
              </Button>
            </div>
          )}
        </header>

        <main className="mx-auto max-w-[1400px] p-4 md:p-8">
          {view === "conteudo-espetaculos" ? (
            <SpectacleManager />
          ) : view === "conteudo-equipe" ? (
            <PeopleManager />
          ) : view === "conteudo-patrocinadores" ? (
            <SponsorManager />
          ) : loading ? (
            <Carregando />
          ) : view === "dashboard" ? (
            <Overview rows={rows} onOpen={setView} />
          ) : (
            <DataTable
              filtro={
                view === "audicoes" ? (
                  <Select value={filtroAudicao} onValueChange={setFiltroAudicao}>
                    <SelectTrigger className="h-9 w-[220px]" aria-label="Filtrar por audição">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={TODAS}>Todas as audições</SelectItem>
                      {espetaculos.map((e) => (
                        <SelectItem key={e.id} value={e.id}>
                          {e.title}
                        </SelectItem>
                      ))}
                      <SelectItem value={BANCO}>Banco de talentos</SelectItem>
                    </SelectContent>
                  </Select>
                ) : undefined
              }
              title={items.find((item) => item.key === view)?.label || ""}
              rows={currentRows}
              onStatus={updateStatus}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function Carregando() {
  return (
    <div className="flex items-center gap-3 py-16 text-muted-foreground" role="status">
      <span aria-hidden="true" className="traco traco--desenho block w-8 text-laranja" />
      Carregando registros…
    </div>
  );
}

function Overview({ rows, onOpen }: { rows: AdminRow[]; onOpen: (view: View) => void }) {
  const cards = useMemo(
    () => [
      { label: "Audições", kind: "audicoes" as const, icon: Users },
      { label: "Patrocínios", kind: "patrocinadores" as const, icon: Building2 },
      { label: "Escolas", kind: "escolas" as const, icon: GraduationCap },
      { label: "Mensagens", kind: "mensagens" as const, icon: MessageSquare },
    ],
    [],
  );
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
        {cards.map((card) => {
          const doTipo = rows.filter((row) => row.kind === card.kind);
          const novos = doTipo.filter((row) => row.status === "Novo").length;
          return (
            <button
              key={card.kind}
              type="button"
              onClick={() => onOpen(card.kind)}
              className="group rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-tinta/40 md:p-6"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold">{card.label}</p>
                <card.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="numeral mt-4 text-4xl leading-none md:mt-5 md:text-5xl">
                {doTipo.length}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-x-2 text-sm md:mt-4">
                <span
                  className={novos > 0 ? "font-semibold text-[#8f3412]" : "text-muted-foreground"}
                >
                  {novos > 0 ? `${novos} ${novos === 1 ? "novo" : "novos"}` : "Nenhum novo"}
                </span>
                <span className="font-semibold transition-transform group-hover:translate-x-0.5">
                  Ver →
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <DataTable
        title="Recebidos recentemente"
        rows={[...rows].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8)}
        onStatus={() => undefined}
        readonly
        mostrarTipo
      />
    </div>
  );
}

const TIPO_ROTULO: Record<Kind, string> = {
  audicoes: "Audição",
  patrocinadores: "Patrocínio",
  escolas: "Escola",
  mensagens: "Mensagem",
};

function DataTable({
  title,
  rows,
  onStatus,
  readonly = false,
  mostrarTipo = false,
  filtro,
}: {
  filtro?: React.ReactNode;
  title: string;
  rows: AdminRow[];
  onStatus: (row: AdminRow, status: Status) => void;
  readonly?: boolean;
  mostrarTipo?: boolean;
}) {
  const navigate = useNavigate();
  const abrir = (row: AdminRow) =>
    navigate({ to: "/admin/registro/$tipo/$id", params: { tipo: row.kind, id: row.id } });

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-semibold">{title}</h2>
          {filtro}
        </div>
        <p className="text-sm text-muted-foreground">
          {rows.length} {rows.length === 1 ? "registro" : "registros"}
        </p>
      </div>
      {rows.length === 0 ? (
        <p className="px-5 py-12 text-center text-muted-foreground">Nenhum registro ainda.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Nome</TableHead>
                {mostrarTipo && <TableHead>Tipo</TableHead>}
                <TableHead>Detalhe</TableHead>
                <TableHead className="hidden lg:table-cell">Informação</TableHead>
                <TableHead>Recebido</TableHead>
                <TableHead>Status</TableHead>
                {!readonly && <TableHead className="text-right">Alterar</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={`${row.kind}-${row.id}`}
                  className="cursor-pointer"
                  onClick={() => abrir(row)}
                >
                  <TableCell className="font-semibold">
                    {/* Link de verdade: a linha inteira abre com o mouse, e o nome
                        também pelo teclado. */}
                    <Link
                      to="/admin/registro/$tipo/$id"
                      params={{ tipo: row.kind, id: row.id }}
                      className="hover:underline"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {row.title}
                    </Link>
                  </TableCell>
                  {mostrarTipo && <TableCell>{TIPO_ROTULO[row.kind]}</TableCell>}
                  <TableCell>{row.subtitle}</TableCell>
                  <TableCell className="hidden text-muted-foreground lg:table-cell">
                    {row.detail}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {new Date(row.createdAt).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <StatusBadge value={row.status} />
                  </TableCell>
                  {!readonly && (
                    <TableCell className="text-right" onClick={(event) => event.stopPropagation()}>
                      <Select
                        value={row.status}
                        onValueChange={(value) => onStatus(row, value as Status)}
                      >
                        <SelectTrigger
                          className="ml-auto h-9 w-[150px]"
                          aria-label={`Alterar status de ${row.title}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}

function NavButton({
  item,
  active,
  contagem = 0,
  onSelect,
}: {
  item: NavItem;
  active: boolean;
  contagem?: number;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-[0.9375rem] transition-colors",
        active
          ? "bg-white/[0.08] font-semibold text-papel before:absolute before:inset-y-2 before:left-0 before:w-[3px] before:rounded-full before:bg-laranja"
          : "text-papel-suave hover:bg-white/5 hover:text-papel",
      )}
    >
      <item.icon className="h-4 w-4" />
      <span className="flex-1 text-left">{item.label}</span>
      {contagem > 0 && (
        <span className="rounded-full bg-laranja px-2 py-0.5 text-xs font-bold text-tinta">
          {contagem}
        </span>
      )}
    </button>
  );
}
