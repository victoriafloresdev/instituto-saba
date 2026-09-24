import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { AuthLayout } from "@/components/admin/AuthLayout";
import { SupabaseConfigNotice } from "@/components/admin/SupabaseConfigNotice";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin — Instituto Cultural Saba" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: () => (isSupabaseConfigured ? <AdminLogin /> : <SupabaseConfigNotice />),
});

function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(data.get("email")),
      password: String(data.get("password")),
    });
    if (error) {
      toast.error("E-mail ou senha inválidos.");
      setLoading(false);
      return;
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: profile } = user
      ? await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()
      : { data: null };
    if (profile?.role !== "admin") {
      await supabase.auth.signOut();
      toast.error("Este usuário não possui acesso administrativo.");
      setLoading(false);
      return;
    }
    toast.success("Login efetuado.");
    navigate({ to: "/admin/dashboard" });
  }
  return (
    <AuthLayout
      titulo="Entrar no painel"
      descricao="Acesso restrito à equipe do Instituto."
      rodape={
        <Link to="/admin/recuperar-senha" className="link-traco font-semibold">
          Esqueci minha senha
        </Link>
      }
    >
      <form onSubmit={submit} className="space-y-5">
        <div>
          <Label htmlFor="login-email">E-mail</Label>
          <Input id="login-email" required name="email" type="email" autoComplete="email" />
        </div>
        <div>
          <Label htmlFor="login-senha">Senha</Label>
          <Input
            id="login-senha"
            required
            name="password"
            type="password"
            autoComplete="current-password"
          />
        </div>
        <button type="submit" disabled={loading} className="chamada chamada--cheia w-full">
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </AuthLayout>
  );
}
