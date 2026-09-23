import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { SupabaseConfigNotice } from "@/components/admin/SupabaseConfigNotice";

export const Route = createFileRoute("/admin/recuperar-senha")({
  head: () => ({
    meta: [
      { title: "Recuperar senha — Instituto Cultural Sabá" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: () => (isSupabaseConfigured ? <RecoverPassword /> : <SupabaseConfigNotice />),
});

function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const redirectTo = `${window.location.origin}/admin/redefinir-senha`;
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });

    if (error) {
      toast.error("Envio de e-mail indisponível no momento. Tente novamente em 1 hora.");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
    toast.success("E-mail de recuperação enviado.");
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
          {sent ? (
            <div className="text-center">
              <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-accent/20 text-accent">
                <CheckCircle2 className="h-5 w-5" />
              </span>
              <h1 className="mt-5 text-2xl text-cream">Confira seu e-mail</h1>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">
                Enviamos um link para redefinir a senha de{" "}
                <strong className="text-cream">{email}</strong>. Se ele não aparecer, confira a
                pasta de spam.
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-6 border-cream/20 bg-transparent text-cream hover:bg-cream/10"
              >
                <Link to="/admin">Voltar para o login</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/20 text-accent">
                  <LockKeyhole className="h-4 w-4" />
                </span>
                <div>
                  <h1 className="text-xl text-cream">Recuperar senha</h1>
                  <p className="text-xs text-cream/60">
                    Enviaremos um link seguro para seu e-mail.
                  </p>
                </div>
              </div>

              <form onSubmit={submit} className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="recovery-email" className="mb-2 block text-sm text-cream/80">
                    E-mail cadastrado
                  </Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/45" />
                    <Input
                      id="recovery-email"
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="border-cream/15 bg-cream/5 pl-9 text-cream placeholder:text-cream/35"
                      placeholder="voce@exemplo.com"
                    />
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full" size="lg">
                  {loading ? "Enviando..." : "Enviar link de recuperação"}
                </Button>
              </form>

              <Link
                to="/admin"
                className="mt-6 flex items-center justify-center gap-1 text-xs text-cream/60 transition-colors hover:text-accent"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Voltar para o login
              </Link>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
