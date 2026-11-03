-- Audições: fotos no passé e de corpo inteiro, e tudo obrigatório (pedido da
-- contratante de 03/11/2026: "tamanho, peso, foto de rosto, foto no passé e
-- uma foto de corpo inteiro, currículo, tudo obrigatório").
--
--   1. Duas colunas novas na inscrição, para as fotos no passé e de corpo
--      inteiro. Vão para a mesma pasta "fotos" do bucket privado "audicoes",
--      então a política de envio da migração 20261009 já as cobre.
--   2. Altura, peso, currículo e as três fotos passam a ser obrigatórios nas
--      inscrições novas (NOT VALID: as antigas ficam como estão). Depois da
--      exclusão por prazo, os dados somem sem violar a regra.
--   3. A retenção (LGPD) passa a apagar também as duas fotos novas.
--
-- Idempotente. Aplicar pelo painel: SQL Editor → New query → colar → Run.
-- Depende da migração 20261009000000_audicoes_foto_curriculo_emails.sql.

-- 1. Colunas novas -----------------------------------------------------------

alter table public.auditions
  add column if not exists foto_passe_path text
    check (foto_passe_path is null or foto_passe_path ~ '^fotos/[0-9a-f-]{36}\.jpg$'),
  add column if not exists foto_corpo_path text
    check (foto_corpo_path is null or foto_corpo_path ~ '^fotos/[0-9a-f-]{36}\.jpg$');

-- 2. Tudo obrigatório nas inscrições novas ------------------------------------

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'auditions_dados_obrigatorios'
  ) then
    alter table public.auditions
      add constraint auditions_dados_obrigatorios
      check (
        dados_apagados_em is not null
        or (
          altura_cm is not null
          and peso_kg is not null
          and curriculo_path is not null
          and foto_passe_path is not null
          and foto_corpo_path is not null
        )
      ) not valid;
  end if;
end;
$$;

-- 3. Retenção ----------------------------------------------------------------

-- O tipo de retorno muda (duas colunas a mais), e isso exige recriar a função.
drop function if exists public.audicoes_dados_vencidos();

create function public.audicoes_dados_vencidos()
returns table (
  id uuid,
  foto_path text,
  foto_passe_path text,
  foto_corpo_path text,
  curriculo_path text
)
language sql
stable
set search_path = public
as $$
  select a.id, a.foto_path, a.foto_passe_path, a.foto_corpo_path, a.curriculo_path
  from public.auditions a
  left join public.spectacles s on s.id = a.spectacle_id
  where a.dados_apagados_em is null
    and (
      a.foto_path is not null or a.foto_passe_path is not null
      or a.foto_corpo_path is not null or a.curriculo_path is not null
      or a.altura_cm is not null or a.peso_kg is not null
    )
    and a.status::text is distinct from 'Aprovado na 2ª fase'
    and (
      (a.spectacle_id is null and a.created_at < now() - interval '12 months')
      or (
        s.id is not null
        and greatest(
          s.event_date,
          (
            select max((sessao ->> 'data')::date)
            from jsonb_array_elements(s.sessions) sessao
            where sessao ->> 'data' ~ '^\d{4}-\d{2}-\d{2}$'
          )
        ) < (now() - interval '6 months')::date
      )
    );
$$;

-- Só o servidor do site (chave de serviço) consulta e executa a limpeza.
revoke all on function public.audicoes_dados_vencidos() from public, anon, authenticated;
grant execute on function public.audicoes_dados_vencidos() to service_role;

notify pgrst, 'reload schema';
