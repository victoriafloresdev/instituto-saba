import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin — Instituto Cultural Sabá" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLogin,
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
    <div className="min-h-screen bg-ink text-cream grid place-items-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 mb-8 justify-center">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-ink font-display text-lg">
            S
          </span>
          <span className="font-display text-xl">Instituto Cultural Sabá</span>
        </Link>
        <Card className="p-8 bg-cream/[0.03] border-cream/15 text-cream backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/20 text-accent">
              <Lock className="h-4 w-4" />
            </span>
            <div>
              <h1 className="text-xl text-cream">Área administrativa</h1>
              <p className="text-xs text-cream/60">Acesso restrito à equipe do Instituto.</p>
            </div>
          </div>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <Label className="mb-2 block text-sm text-cream/80">E-mail</Label>
              <Input
                required
                name="email"
                type="email"
                autoComplete="email"
                className="bg-cream/5 border-cream/15 text-cream"
              />
            </div>
            <div>
              <Label className="mb-2 block text-sm text-cream/80">Senha</Label>
              <Input
                required
                name="password"
                type="password"
                autoComplete="current-password"
                className="bg-cream/5 border-cream/15 text-cream"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          <Link
            to="/admin/recuperar-senha"
            className="mt-5 block text-center text-xs text-cream/60 transition-colors hover:text-accent"
          >
            Esqueci minha senha
          </Link>
        </Card>
      </div>
    </div>
  );
}
