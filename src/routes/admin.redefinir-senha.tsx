import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, KeyRound, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { SupabaseConfigNotice } from "@/components/admin/SupabaseConfigNotice";

export const Route = createFileRoute("/admin/redefinir-senha")({
  head: () => ({
    meta: [
      { title: "Definir nova senha — Instituto Cultural Sabá" },
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

  return (
    <div className="grid min-h-screen place-items-center bg-ink px-4 text-cream">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-accent font-display text-lg text-ink">
            S
          </span>
          <span className="font-display text-xl">Instituto Cultural Sabá</span>
        </Link>

        <Card className="border-cream/15 bg-cream/[0.03] p-8 text-cream backdrop-blur">
          {checkingSession ? (
            <div className="py-6 text-center text-sm text-cream/70">Validando seu link...</div>
          ) : !recoverySession ? (
            <div className="text-center">
              <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-destructive/15 text-destructive">
                <AlertCircle className="h-5 w-5" />
              </span>
              <h1 className="mt-5 text-2xl text-cream">Link expirado ou inválido</h1>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">
                Solicite um novo link de recuperação para definir sua senha.
              </p>
              <Button asChild className="mt-6">
                <Link to="/admin/recuperar-senha">Solicitar novo link</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/20 text-accent">
                  <LockKeyhole className="h-4 w-4" />
                </span>
                <div>
                  <h1 className="text-xl text-cream">Defina sua nova senha</h1>
                  <p className="text-xs text-cream/60">Use pelo menos 8 caracteres.</p>
                </div>
              </div>

              <form onSubmit={submit} className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="new-password" className="mb-2 block text-sm text-cream/80">
                    Nova senha
                  </Label>
                  <div className="relative">
                    <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/45" />
                    <Input
                      id="new-password"
                      required
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      minLength={8}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="border-cream/15 bg-cream/5 pl-9 text-cream placeholder:text-cream/35"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirm-password" className="mb-2 block text-sm text-cream/80">
                    Confirmar nova senha
                  </Label>
                  <Input
                    id="confirm-password"
                    required
                    name="confirmation"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    value={confirmation}
                    onChange={(event) => setConfirmation(event.target.value)}
                    className="border-cream/15 bg-cream/5 text-cream placeholder:text-cream/35"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full" size="lg">
                  {loading ? "Salvando..." : "Salvar nova senha"}
                </Button>
              </form>
            </>
          )}
        </Card>

        {!checkingSession && recoverySession && (
          <p className="mt-5 flex items-center justify-center gap-1 text-center text-xs text-cream/45">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Link de recuperação validado com sucesso
          </p>
        )}
      </div>
    </div>
  );
}
