import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { SupabaseConfigNotice } from "@/components/admin/SupabaseConfigNotice";
import { AuthLayout } from "@/components/admin/AuthLayout";

export const Route = createFileRoute("/admin/recuperar-senha")({
  head: () => ({
    meta: [
      { title: "Recuperar senha — Instituto Cultural Saba" },
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
    <AuthLayout
      titulo={sent ? "Confira seu e-mail" : "Recuperar senha"}
      descricao={
        sent ? (
          <>
            Enviamos um link para redefinir a senha de{" "}
            <strong className="text-tinta">{email}</strong>. Se ele não aparecer, confira a pasta de
            spam.
          </>
        ) : (
          "Informe o e-mail cadastrado e enviaremos um link seguro para criar uma nova senha."
        )
      }
      rodape={
        <Link to="/admin" className="link-traco font-semibold">
          ← Voltar para o login
        </Link>
      }
    >
      {!sent && (
        <form onSubmit={submit} className="space-y-5">
          <div>
            <Label htmlFor="recovery-email">E-mail cadastrado</Label>
            <Input
              id="recovery-email"
              required
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="voce@exemplo.com"
            />
          </div>
          <button type="submit" disabled={loading} className="chamada chamada--cheia w-full">
            {loading ? "Enviando…" : "Enviar link de recuperação"}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
