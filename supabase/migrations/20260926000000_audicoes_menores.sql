-- Inscrição de menores de 18 anos nas audições.
--
-- A LGPD (art. 14) pede o consentimento de um responsável para tratar dados
-- de crianças e adolescentes. Para quem tem menos de 18 anos, a inscrição
-- passa a exigir nome e contato do responsável e a autorização dele —
-- regra garantida aqui no banco, e não só na tela.
--
-- A regra vale para as inscrições novas (NOT VALID): as antigas continuam
-- como estão.
--
-- Idempotente. Aplicar pelo painel: SQL Editor → New query → colar → Run.

alter table public.auditions
  add column if not exists responsavel_nome text
    check (responsavel_nome is null or char_length(responsavel_nome) <= 180),
  add column if not exists responsavel_contato text
    check (responsavel_contato is null or char_length(responsavel_contato) <= 180),
  add column if not exists responsavel_autorizou boolean not null default false;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'auditions_menor_com_responsavel'
  ) then
    alter table public.auditions
      add constraint auditions_menor_com_responsavel check (
        idade >= 18
        or (
          responsavel_nome is not null
          and responsavel_contato is not null
          and responsavel_autorizou
        )
      ) not valid;
  end if;
end;
$$;

notify pgrst, 'reload schema';
