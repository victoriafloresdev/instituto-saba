import { AlertTriangle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * Exibido no lugar do painel quando faltam as credenciais do Supabase. É uma
 * falha de configuração do deploy, não algo que a equipe do Instituto resolva
 * pela interface — por isso o texto aponta o caminho técnico.
 */
export function SupabaseConfigNotice() {
  return (
    <div className="grid min-h-screen place-items-center bg-ink px-4 text-cream">
      <Card className="w-full max-w-lg border-cream/15 bg-cream/[0.03] p-8 text-cream backdrop-blur">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-amber-400/20 text-amber-300">
          <AlertTriangle className="h-5 w-5" />
        </span>
        <h1 className="mt-5 text-xl text-cream">Painel indisponível</h1>
        <p className="mt-3 text-sm leading-relaxed text-cream/70">
          O painel não conseguiu se conectar ao banco de dados porque as credenciais do Supabase não
          estão configuradas neste ambiente.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-cream/70">
          Quem cuida do site precisa cadastrar as variáveis{" "}
          <code className="rounded bg-cream/10 px-1.5 py-0.5 text-xs">VITE_SUPABASE_URL</code> e{" "}
          <code className="rounded bg-cream/10 px-1.5 py-0.5 text-xs">
            VITE_SUPABASE_PUBLISHABLE_KEY
          </code>{" "}
          no ambiente de deploy e publicar uma build nova. Republicar a build anterior não resolve,
          porque as variáveis são lidas durante a construção do site.
        </p>
        <Button
          asChild
          variant="outline"
          className="mt-6 border-cream/20 bg-transparent text-cream"
        >
          <Link to="/">Voltar para o site</Link>
        </Button>
      </Card>
    </div>
  );
}
