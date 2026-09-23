import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { SpectacleManager } from "@/components/admin/SpectacleManager";
import { SponsorManager } from "@/components/admin/SponsorManager";
import type { Status } from "@/lib/database.types";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Admin Instituto Sabá" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Dashboard,
});

// Formulários recebidos do site.
type Kind = "audicoes" | "patrocinadores" | "escolas" | "mensagens";
// Conteúdo editável que alimenta as páginas públicas.
type ContentView = "conteudo-espetaculos" | "conteudo-patrocinadores";
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
};
const statuses: Status[] = ["Novo", "Em análise", "Aprovado", "Recusado", "Contatado"];

function Dashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("dashboard");
  const [openNav, setOpenNav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<AdminRow[]>([]);

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
    const [auditions, sponsorships, schools, messages] = await Promise.all([
      supabase.from("auditions").select("*").order("created_at", { ascending: false }),
      supabase.from("sponsorship_leads").select("*").order("created_at", { ascending: false }),
      supabase.from("school_registrations").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]);
    const error = auditions.error || sponsorships.error || schools.error || messages.error;
    if (error) toast.error("Não foi possível carregar os dados do painel.");
    setRows([
      ...(auditions.data ?? []).map((r) => ({
        id: r.id,
        kind: "audicoes" as const,
        title: r.nome,
        subtitle: r.modalidade || "Modalidade não informada",
        detail: `${r.cidade} · ${r.email}`,
        status: r.status,
        createdAt: r.created_at,
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
    const [auditions, sponsorships, schools, messages] = await Promise.all([
      supabase.from("auditions").select("*").order("created_at", { ascending: false }),
      supabase.from("sponsorship_leads").select("*").order("created_at", { ascending: false }),
      supabase.from("school_registrations").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]);
    const error = auditions.error || sponsorships.error || schools.error || messages.error;
    if (error) {
      toast.error("Não foi possível preparar o CSV completo.");
      return;
    }
    const completeRows = [
      ...(auditions.data ?? []).map((record) => ({ tipo_registro: "Audição", ...record })),
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
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "audicoes", label: "Audições", icon: Users },
    { key: "patrocinadores", label: "Patrocínios", icon: Building2 },
    { key: "escolas", label: "Escolas", icon: GraduationCap },
    { key: "mensagens", label: "Mensagens", icon: MessageSquare },
  ];
  const contentItems: NavItem[] = [
    { key: "conteudo-espetaculos", label: "Espetáculos", icon: Theater },
    { key: "conteudo-patrocinadores", label: "Patrocinadores", icon: Handshake },
  ];
  const items = [...leadItems, ...contentItems];
  const isContentView = view === "conteudo-espetaculos" || view === "conteudo-patrocinadores";
  const currentRows = view === "dashboard" || isContentView ? [] : byKind(view);

  return (
    <div className="min-h-screen bg-muted/40 flex">
      <aside
        className={`${openNav ? "flex" : "hidden"} md:flex w-64 bg-ink text-cream fixed md:sticky top-0 h-screen z-40 flex-col`}
      >
        <div className="p-6 border-b border-cream/10">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-ink font-display text-lg">
              S
            </span>
            <div>
              <p className="font-display text-lg">Instituto Sabá</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-cream/50">Painel admin</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {leadItems.map((item) => (
            <NavButton
              key={item.key}
              item={item}
              active={view === item.key}
              onSelect={() => {
                setView(item.key);
                setOpenNav(false);
              }}
            />
          ))}
          <p className="px-3 pb-1 pt-5 text-[10px] uppercase tracking-[0.18em] text-cream/40">
            Conteúdo do site
          </p>
          {contentItems.map((item) => (
            <NavButton
              key={item.key}
              item={item}
              active={view === item.key}
              onSelect={() => {
                setView(item.key);
                setOpenNav(false);
              }}
            />
          ))}
        </nav>
        <div className="p-3 border-t border-cream/10">
          <button
            onClick={() => void logout()}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-cream/75 hover:bg-cream/5"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </aside>
      <div className="flex-1 min-w-0">
        <header className="h-16 border-b border-border bg-background flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
              onClick={() => setOpenNav(!openNav)}
            >
              <Menu className="h-4 w-4" />
            </button>
            <h1 className="text-xl capitalize">{items.find((item) => item.key === view)?.label}</h1>
          </div>
          {!isContentView && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => void load()}>
                <RefreshCw className="mr-1 h-4 w-4" />
                Atualizar
              </Button>
              <Button variant="outline" size="sm" onClick={() => void exportCsv()}>
                <Download className="mr-1 h-4 w-4" />
                CSV
              </Button>
            </div>
          )}
        </header>
        <main className="p-4 md:p-8">
          {view === "conteudo-espetaculos" ? (
            <SpectacleManager />
          ) : view === "conteudo-patrocinadores" ? (
            <SponsorManager />
          ) : loading ? (
            <p className="text-muted-foreground">Carregando dados...</p>
          ) : view === "dashboard" ? (
            <Overview rows={rows} onOpen={setView} />
          ) : (
            <DataTable
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
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <button key={card.kind} onClick={() => onOpen(card.kind)} className="text-left">
            <Card className="p-6 hover:border-primary/40 transition-colors">
              <div className="flex justify-between">
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {card.label}
                </p>
                <card.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-4 font-display text-4xl">
                {rows.filter((row) => row.kind === card.kind).length}
              </p>
            </Card>
          </button>
        ))}
      </div>
      <DataTable
        title="Registros recentes"
        rows={[...rows].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8)}
        onStatus={() => undefined}
        readonly
      />
    </div>
  );
}

function DataTable({
  title,
  rows,
  onStatus,
  readonly = false,
}: {
  title: string;
  rows: AdminRow[];
  onStatus: (row: AdminRow, status: Status) => void;
  readonly?: boolean;
}) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-border p-6">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{rows.length} registros</p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Detalhe</TableHead>
              <TableHead>Informação</TableHead>
              <TableHead>Recebido</TableHead>
              <TableHead>Status</TableHead>
              {!readonly && <TableHead className="text-right">Alterar</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={`${row.kind}-${row.id}`}
                className="cursor-pointer transition-colors hover:bg-primary/5"
                onClick={() => {
                  window.location.assign(`/admin/registro/${row.kind}/${row.id}`);
                }}
              >
                <TableCell className="font-medium">{row.title}</TableCell>
                <TableCell>{row.subtitle}</TableCell>
                <TableCell>{row.detail}</TableCell>
                <TableCell>{new Date(row.createdAt).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell>
                  <StatusBadge value={row.status} />
                </TableCell>
                {!readonly && (
                  <TableCell className="text-right" onClick={(event) => event.stopPropagation()}>
                    <Select
                      value={row.status}
                      onValueChange={(value) => onStatus(row, value as Status)}
                    >
                      <SelectTrigger className="ml-auto h-8 w-[140px] text-xs">
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
    </Card>
  );
}

function StatusBadge({ value }: { value: Status }) {
  const colors: Record<Status, string> = {
    Novo: "bg-blue-100 text-blue-700",
    "Em análise": "bg-amber-100 text-amber-700",
    Aprovado: "bg-emerald-100 text-emerald-700",
    Recusado: "bg-rose-100 text-rose-700",
    Contatado: "bg-violet-100 text-violet-700",
  };
  return (
    <Badge variant="secondary" className={`rounded-full font-normal ${colors[value]}`}>
      {value}
    </Badge>
  );
}

function NavButton({
  item,
  active,
  onSelect,
}: {
  item: NavItem;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${active ? "bg-accent text-ink font-medium" : "text-cream/75 hover:bg-cream/5"}`}
    >
      <item.icon className="h-4 w-4" />
      {item.label}
    </button>
  );
}
