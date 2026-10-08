-- Audições em duas fases (aba de observações da contratante: "2 fases de
-- audição").
--
-- As inscrições de audição ganham dois status novos:
--   "Aprovado na 1ª fase" — chamado para a segunda fase;
--   "Aprovado na 2ª fase" — aprovado em definitivo.
-- Os outros formulários continuam usando "Aprovado".
--
-- A tabela auditions foi criada direto no painel, então não se sabe ao certo
-- como a coluna status foi definida. Esta migração cobre os três casos:
--   1. texto livre: nada a fazer;
--   2. texto com restrição (CHECK) listando os status: a restrição é trocada
--      por uma que inclui os novos;
--   3. tipo enumerado: os valores novos são acrescentados ao tipo.
--
-- Idempotente. Aplicar pelo painel: SQL Editor → New query → colar → Run.

do $$
declare
  tipo text;
  restricao record;
begin
  select c.udt_name into tipo
  from information_schema.columns c
  where c.table_schema = 'public'
    and c.table_name = 'auditions'
    and c.column_name = 'status';

  if tipo is null then
    raise exception 'A coluna public.auditions.status não foi encontrada.';
  end if;

  -- Caso 3: tipo enumerado.
  if exists (select 1 from pg_type where typname = tipo and typtype = 'e') then
    execute format('alter type public.%I add value if not exists %L', tipo, 'Aprovado na 1ª fase');
    execute format('alter type public.%I add value if not exists %L', tipo, 'Aprovado na 2ª fase');
    return;
  end if;

  -- Caso 2: restrições CHECK que mencionam a coluna status.
  for restricao in
    select con.conname
    from pg_constraint con
    where con.conrelid = 'public.auditions'::regclass
      and con.contype = 'c'
      and pg_get_constraintdef(con.oid) ilike '%status%'
  loop
    execute format('alter table public.auditions drop constraint %I', restricao.conname);
  end loop;

  alter table public.auditions
    add constraint auditions_status_valido check (
      status in (
        'Novo',
        'Em análise',
        'Aprovado',
        'Aprovado na 1ª fase',
        'Aprovado na 2ª fase',
        'Recusado',
        'Contatado'
      )
    );
end;
$$;

notify pgrst, 'reload schema';
