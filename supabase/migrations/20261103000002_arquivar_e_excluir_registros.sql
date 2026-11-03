-- Arquivar e excluir respostas de formulário pelo painel (pedido da Victoria
-- de 03/11/2026): inscrições de audição, interesses de patrocínio, cadastros
-- de escola e mensagens de contato.
--
--   1. Coluna arquivado_em em cada tabela. Arquivar tira o registro da
--      lista principal do painel sem apagá-lo; desarquivar volta a nulo.
--      É uma alteração comum (UPDATE), coberta pela mesma permissão que o
--      painel já usa para trocar o status.
--   2. Permissão de exclusão para administradores. As políticas destas
--      tabelas foram criadas direto no painel do Supabase, então não se sabe
--      se a exclusão já era permitida; esta política garante que sim, e só
--      para administradores. Os e-mails enviados de uma inscrição de audição
--      saem junto (on delete cascade, migração 20261009).
--
-- Idempotente. Aplicar pelo painel: SQL Editor → New query → colar → Run.

do $$
declare
  tabela text;
begin
  foreach tabela in array array[
    'auditions', 'sponsorship_leads', 'school_registrations', 'contact_messages'
  ]
  loop
    execute format(
      'alter table public.%I add column if not exists arquivado_em timestamptz',
      tabela
    );
    execute format('grant delete on table public.%I to authenticated', tabela);
    execute format('drop policy if exists "Admins excluem registros" on public.%I', tabela);
    execute format(
      'create policy "Admins excluem registros" on public.%I '
      'for delete to authenticated using (public.is_instituto_admin())',
      tabela
    );
  end loop;
end;
$$;

notify pgrst, 'reload schema';
