import { Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/admin/AuthLayout";

/**
 * Exibido no lugar do painel quando faltam as credenciais do Supabase. É uma
 * falha de configuração do deploy, não algo que a equipe do Instituto resolva
 * pela interface — por isso o texto aponta o caminho técnico.
 */
export function SupabaseConfigNotice() {
  return (
    <AuthLayout
      titulo="Painel indisponível"
      descricao="O painel não conseguiu se conectar ao banco de dados porque as credenciais do Supabase não estão configuradas neste ambiente."
      rodape={
        <Link to="/" className="link-traco font-semibold">
          ← Voltar para o site
        </Link>
      }
    >
      <div className="rounded-xl border border-border bg-card p-5 text-[0.9375rem] leading-relaxed">
        Quem cuida do site precisa cadastrar as variáveis{" "}
        <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">VITE_SUPABASE_URL</code> e{" "}
        <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">
          VITE_SUPABASE_PUBLISHABLE_KEY
        </code>{" "}
        no ambiente de deploy e publicar uma build nova. Republicar a build anterior não resolve,
        porque as variáveis são lidas durante a construção do site.
      </div>
    </AuthLayout>
  );
}
