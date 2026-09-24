import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { SupabaseConfigNotice } from "@/components/admin/SupabaseConfigNotice";
import { AuthLayout } from "@/components/admin/AuthLayout";

export const Route = createFileRoute("/admin/redefinir-senha")({
  head: () => ({
    meta: [
      { title: "Definir nova senha — Instituto Cultural Saba" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: () => (isSupabaseConfigured ? <ResetPassword /> : <SupabaseConfigNotice />),
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [recoverySession, setRecoverySession] = useState(false);

  useEffect(() => {
    let mounted = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === "PASSWORD_RECOVERY") {
        setRecoverySession(Boolean(session));
        setCheckingSession(false);
      }
    });

    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setRecoverySession(Boolean(session));
      setCheckingSession(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.length < 8) {
      toast.error("A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    if (password !== confirmation) {
      toast.error("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error("Não foi possível atualizar a senha. Solicite um novo link.");
      setLoading(false);
      return;
    }

    await supabase.auth.signOut();
    toast.success("Senha atualizada. Você já pode entrar no painel.");
    navigate({ to: "/admin" });
  }

  if (checkingSession) {
    return (
      <AuthLayout titulo="Validando seu link…" descricao="Só um instante.">
        <span aria-hidden="true" className="traco traco--desenho block w-12 text-laranja" />
      </AuthLayout>
    );
  }

  if (!recoverySession) {
    return (
      <AuthLayout
        titulo="Link expirado ou inválido"
        descricao="Solicite um novo link de recuperação para definir sua senha."
      >
        <Link to="/admin/recuperar-senha" className="chamada chamada--cheia w-full">
          Solicitar novo link
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      titulo="Defina sua nova senha"
      descricao="Link validado. Use pelo menos 8 caracteres."
    >
      <form onSubmit={submit} className="space-y-5">
        <div>
          <Label htmlFor="new-password">Nova senha</Label>
          <Input
            id="new-password"
            required
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="confirm-password">Confirmar nova senha</Label>
          <Input
            id="confirm-password"
            required
            name="confirmation"
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
          />
        </div>
        <button type="submit" disabled={loading} className="chamada chamada--cheia w-full">
          {loading ? "Salvando…" : "Salvar nova senha"}
        </button>
      </form>
    </AuthLayout>
  );
}
