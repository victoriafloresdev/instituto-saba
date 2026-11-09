-- Tabelas dos formulários do site e perfis do painel
--
-- Estas tabelas foram criadas direto no painel do Supabase, antes de o
-- repositório ter migrações. Esta migração as reproduz a partir da estrutura
-- lida no banco em 09/11/2026, para que um banco novo possa ser montado só
-- com os arquivos desta pasta, na ordem dos nomes.
--
-- Ela traz a estrutura ORIGINAL de cada tabela: as colunas, restrições,
-- políticas e gatilhos acrescentados depois já estão nas migrações seguintes
-- (disponibilidade, espetáculo, menores, duas fases, fotos e currículo,
-- arquivamento). Por isso a data é anterior a todas: a função
-- is_instituto_admin(), da migração 20260911, já lê a tabela profiles.
--
--   profiles              — papel de cada usuário do painel ('member' ou 'admin').
--                           Não há gatilho em auth.users: o perfil de quem usa o
--                           painel é criado à mão (guia de entrega, etapa 6).
--   auditions             — inscrições de audição.
--   sponsorship_leads     — interesse em patrocínio (pessoa física ou jurídica).
--   school_registrations  — escolas públicas que querem levar alunos.
--   contact_messages      — mensagens da página Contato.
--
-- Os visitantes só podem inserir, e sempre com status 'Novo'. Ler, alterar e
-- excluir é só para administradores (is_admin()).
--
-- Idempotente: num banco que já tem as tabelas, nada muda. Aplicar pelo
-- painel: SQL Editor → New query → colar → Run.

-- 1. Perfis e funções de apoio ----------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'member' check (role in ('member', 'admin')),
  created_at timestamptz not null default now()
);

-- Equivalente a is_instituto_admin() (migração 20260911). As duas existem
-- porque as políticas dos formulários foram criadas antes, com este nome.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 2. Tabelas dos formulários ------------------------------------------------

create table if not exists public.auditions (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  whatsapp text not null,
  idade integer not null check (idade > 0),
  cidade text not null,
  modalidade text,
  experiencia text,
  portfolio text,
  mensagem text,
  -- A migração 20261008 troca esta restrição por auditions_status_valido,
  -- com os status das duas fases.
  status text not null default 'Novo'
    constraint auditions_status_check
    check (status in ('Novo', 'Em análise', 'Aprovado', 'Recusado', 'Contatado')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sponsorship_leads (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  empresa text,
  documento text,
  email text not null,
  whatsapp text not null,
  valor numeric(12, 2),
  mensagem text,
  tipo text not null check (tipo in ('PF', 'PJ')),
  status text not null default 'Novo'
    check (status in ('Novo', 'Em análise', 'Aprovado', 'Recusado', 'Contatado')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.school_registrations (
  id uuid primary key default gen_random_uuid(),
  escola text not null,
  responsavel text not null,
  cargo text not null,
  email text not null,
  whatsapp text not null,
  cidade text not null,
  alunos integer not null check (alunos > 0),
  faixa text not null,
  mensagem text,
  status text not null default 'Novo'
    check (status in ('Novo', 'Em análise', 'Aprovado', 'Recusado', 'Contatado')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  assunto text not null,
  mensagem text not null,
  status text not null default 'Novo'
    check (status in ('Novo', 'Em análise', 'Aprovado', 'Recusado', 'Contatado')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- O painel lista cada formulário do mais novo para o mais antigo.
create index if not exists auditions_created_at_idx
  on public.auditions (created_at desc);
create index if not exists sponsorship_leads_created_at_idx
  on public.sponsorship_leads (created_at desc);
create index if not exists school_registrations_created_at_idx
  on public.school_registrations (created_at desc);
create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

-- 3. updated_at automático --------------------------------------------------

do $$
declare
  tabela text;
begin
  foreach tabela in array array[
    'auditions', 'sponsorship_leads', 'school_registrations', 'contact_messages'
  ]
  loop
    execute format('drop trigger if exists %I on public.%I', tabela || '_updated_at', tabela);
    execute format(
      'create trigger %I before update on public.%I '
      'for each row execute function public.set_updated_at()',
      tabela || '_updated_at',
      tabela
    );
  end loop;
end;
$$;

-- 4. Acesso (RLS) -----------------------------------------------------------
-- As permissões de tabela seguem o padrão do Supabase (anon e authenticated
-- com acesso total); quem restringe de fato são as políticas abaixo.

grant all on table
  public.profiles,
  public.auditions,
  public.sponsorship_leads,
  public.school_registrations,
  public.contact_messages
to anon, authenticated, service_role;

alter table public.profiles enable row level security;
alter table public.auditions enable row level security;
alter table public.sponsorship_leads enable row level security;
alter table public.school_registrations enable row level security;
alter table public.contact_messages enable row level security;

-- Cada usuário só lê o próprio perfil. Ninguém altera o papel pelo site:
-- isso é feito no painel do Supabase.
drop policy if exists "Usuário lê o próprio perfil" on public.profiles;
create policy "Usuário lê o próprio perfil"
on public.profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "Visitante envia audição" on public.auditions;
create policy "Visitante envia audição"
on public.auditions
for insert
to anon, authenticated
with check (status = 'Novo');

drop policy if exists "Admin gerencia audições" on public.auditions;
create policy "Admin gerencia audições"
on public.auditions
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Visitante envia interesse de patrocínio" on public.sponsorship_leads;
create policy "Visitante envia interesse de patrocínio"
on public.sponsorship_leads
for insert
to anon, authenticated
with check (status = 'Novo');

drop policy if exists "Admin gerencia patrocínios" on public.sponsorship_leads;
create policy "Admin gerencia patrocínios"
on public.sponsorship_leads
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Visitante cadastra escola" on public.school_registrations;
create policy "Visitante cadastra escola"
on public.school_registrations
for insert
to anon, authenticated
with check (status = 'Novo');

drop policy if exists "Admin gerencia escolas" on public.school_registrations;
create policy "Admin gerencia escolas"
on public.school_registrations
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Visitante envia mensagem" on public.contact_messages;
create policy "Visitante envia mensagem"
on public.contact_messages
for insert
to anon, authenticated
with check (status = 'Novo');

drop policy if exists "Admin gerencia mensagens" on public.contact_messages;
create policy "Admin gerencia mensagens"
on public.contact_messages
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());
