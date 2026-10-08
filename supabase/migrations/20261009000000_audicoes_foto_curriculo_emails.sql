-- Audições: foto de rosto, altura, peso, currículo em PDF e e-mail aos
-- aprovados (aba de observações da contratante).
--
--   1. Colunas novas na inscrição. A foto é obrigatória nas inscrições novas;
--      altura, peso e currículo são opcionais.
--   2. Bucket PRIVADO "audicoes" para fotos e currículos. Qualquer visitante
--      pode enviar um arquivo (é assim que a inscrição funciona), mas só
--      administradores conseguem ver, baixar ou apagar.
--   3. Registro dos e-mails enviados aos aprovados, pelo painel.
--   4. Retenção (LGPD): fotos, medidas e currículos de quem não entrou no
--      elenco são apagados 6 meses depois do fim da temporada do espetáculo.
--      No banco de talentos, que não tem temporada, 12 meses depois da
--      inscrição. Quem foi aprovado na 2ª fase mantém os dados. A exclusão é
--      feita todo dia pela rota /api/limpeza-audicoes do site.
--
-- Idempotente. Aplicar pelo painel: SQL Editor → New query → colar → Run.
-- Depende das migrações anteriores (audições por espetáculo e duas fases).

-- 1. Colunas novas -----------------------------------------------------------

alter table public.auditions
  add column if not exists altura_cm smallint
    check (altura_cm is null or altura_cm between 80 and 230),
  add column if not exists peso_kg numeric(4, 1)
    check (peso_kg is null or peso_kg between 20 and 200),
  add column if not exists foto_path text
    check (foto_path is null or foto_path ~ '^fotos/[0-9a-f-]{36}\.jpg$'),
  add column if not exists curriculo_path text
    check (curriculo_path is null or curriculo_path ~ '^curriculos/[0-9a-f-]{36}\.pdf$'),
  -- Quando a retenção apagou foto, medidas e currículo.
  add column if not exists dados_apagados_em timestamptz;

-- Foto obrigatória nas inscrições novas (NOT VALID: as antigas ficam como
-- estão). Depois da exclusão por prazo, a foto some sem violar a regra.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'auditions_foto_obrigatoria'
  ) then
    alter table public.auditions
      add constraint auditions_foto_obrigatoria
      check (foto_path is not null or dados_apagados_em is not null) not valid;
  end if;
end;
$$;

-- 2. Bucket privado ----------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('audicoes', 'audicoes', false, 5242880, array['image/jpeg', 'application/pdf']::text[])
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Envio: só nomes aleatórios, nas duas pastas, sem sobrescrever (o site
-- envia com upsert desligado, que exige apenas INSERT).
drop policy if exists "Candidatos enviam arquivos de audicao" on storage.objects;
create policy "Candidatos enviam arquivos de audicao"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'audicoes'
  and name ~ '^(fotos/[0-9a-f-]{36}\.jpg|curriculos/[0-9a-f-]{36}\.pdf)$'
);

drop policy if exists "Admins veem arquivos de audicao" on storage.objects;
create policy "Admins veem arquivos de audicao"
on storage.objects
for select
to authenticated
using (bucket_id = 'audicoes' and public.is_instituto_admin());

drop policy if exists "Admins apagam arquivos de audicao" on storage.objects;
create policy "Admins apagam arquivos de audicao"
on storage.objects
for delete
to authenticated
using (bucket_id = 'audicoes' and public.is_instituto_admin());

-- 3. E-mails enviados --------------------------------------------------------

create table if not exists public.audition_emails (
  id uuid primary key default gen_random_uuid(),
  audition_id uuid not null references public.auditions (id) on delete cascade,
  modelo text not null check (modelo in ('fase1', 'fase2', 'livre')),
  assunto text not null check (char_length(assunto) between 1 and 200),
  destinatarios text[] not null,
  sucesso boolean not null,
  erro text check (erro is null or char_length(erro) <= 1000),
  enviado_por uuid references auth.users (id) on delete set null,
  enviado_em timestamptz not null default now()
);

create index if not exists audition_emails_audition_idx
  on public.audition_emails (audition_id, enviado_em desc);

alter table public.audition_emails enable row level security;
grant select, insert on table public.audition_emails to authenticated;

drop policy if exists "Admins gerenciam e-mails de audicao" on public.audition_emails;
create policy "Admins gerenciam e-mails de audicao"
on public.audition_emails
for all
to authenticated
using (public.is_instituto_admin())
with check (public.is_instituto_admin());

-- 4. Retenção ----------------------------------------------------------------

-- Inscrições cujos dados sensíveis já passaram do prazo. O fim da temporada é
-- a última data entre event_date e as sessões; sem nenhuma data, não vence.
create or replace function public.audicoes_dados_vencidos()
returns table (id uuid, foto_path text, curriculo_path text)
language sql
stable
set search_path = public
as $$
  select a.id, a.foto_path, a.curriculo_path
  from public.auditions a
  left join public.spectacles s on s.id = a.spectacle_id
  where a.dados_apagados_em is null
    and (
      a.foto_path is not null or a.curriculo_path is not null
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
