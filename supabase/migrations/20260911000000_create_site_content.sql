-- Conteúdo administrável do Instituto Cultural Saba
--
-- Esta migração cria as entidades de conteúdo (espetáculos e patrocinadores)
-- separadas dos formulários de interesse. O conteúdo público é somente leitura;
-- apenas usuários cujo perfil tenha role = 'admin' podem alterá-lo.

create extension if not exists pgcrypto;

-- Função usada pelas políticas RLS. SECURITY DEFINER evita depender das
-- políticas de leitura da tabela profiles para verificar o papel do usuário.
create or replace function public.is_instituto_admin()
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

revoke all on function public.is_instituto_admin() from public;
grant execute on function public.is_instituto_admin() to authenticated;

create or replace function public.set_site_content_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.spectacles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null
    check (char_length(btrim(title)) between 1 and 180),
  subtitle text,
  description text not null default ''
    check (char_length(description) <= 10000),
  synopsis text
    check (synopsis is null or char_length(synopsis) <= 10000),
  date_label text
    check (date_label is null or char_length(date_label) <= 120),
  event_date date,
  start_time time,
  end_time time,
  venue text
    check (venue is null or char_length(venue) <= 240),
  address text
    check (address is null or char_length(address) <= 500),
  city text
    check (city is null or char_length(city) <= 160),
  classification text
    check (classification is null or char_length(classification) <= 120),
  ticket_url text,
  image_path text,
  image_alt text
    check (image_alt is null or char_length(image_alt) <= 240),
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0
    check (sort_order >= 0),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null
    check (char_length(btrim(name)) between 1 and 180),
  sponsor_type text not null default 'sponsor'
    check (sponsor_type in ('master', 'sponsor', 'supporter', 'partner')),
  description text
    check (description is null or char_length(description) <= 5000),
  website_url text,
  logo_path text,
  logo_alt text
    check (logo_alt is null or char_length(logo_alt) <= 240),
  status text not null default 'inactive'
    check (status in ('active', 'inactive')),
  sort_order integer not null default 0
    check (sort_order >= 0),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists spectacles_public_order_idx
  on public.spectacles (status, sort_order, event_date, created_at desc);

create index if not exists sponsors_public_order_idx
  on public.sponsors (status, sort_order, created_at);

drop trigger if exists set_spectacles_updated_at on public.spectacles;
create trigger set_spectacles_updated_at
before update on public.spectacles
for each row execute function public.set_site_content_updated_at();

drop trigger if exists set_sponsors_updated_at on public.sponsors;
create trigger set_sponsors_updated_at
before update on public.sponsors
for each row execute function public.set_site_content_updated_at();

alter table public.spectacles enable row level security;
alter table public.sponsors enable row level security;

grant select on table public.spectacles to anon, authenticated;
grant insert, update, delete on table public.spectacles to authenticated;
grant select on table public.sponsors to anon, authenticated;
grant insert, update, delete on table public.sponsors to authenticated;

drop policy if exists "Public can view published spectacles" on public.spectacles;
create policy "Public can view published spectacles"
on public.spectacles
for select
to anon
using (status = 'published');

drop policy if exists "Authenticated can view spectacles" on public.spectacles;
create policy "Authenticated can view spectacles"
on public.spectacles
for select
to authenticated
using (status = 'published' or public.is_instituto_admin());

drop policy if exists "Admins can manage spectacles" on public.spectacles;
create policy "Admins can manage spectacles"
on public.spectacles
for all
to authenticated
using (public.is_instituto_admin())
with check (public.is_instituto_admin());

drop policy if exists "Public can view active sponsors" on public.sponsors;
create policy "Public can view active sponsors"
on public.sponsors
for select
to anon
using (status = 'active');

drop policy if exists "Authenticated can view sponsors" on public.sponsors;
create policy "Authenticated can view sponsors"
on public.sponsors
for select
to authenticated
using (status = 'active' or public.is_instituto_admin());

drop policy if exists "Admins can manage sponsors" on public.sponsors;
create policy "Admins can manage sponsors"
on public.sponsors
for all
to authenticated
using (public.is_instituto_admin())
with check (public.is_instituto_admin());

-- Bucket público para imagens que serão exibidas no site. A escrita continua
-- restrita a administradores pelas políticas abaixo.
insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'site-assets',
  'site-assets',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view site assets" on storage.objects;
create policy "Public can view site assets"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'site-assets');

drop policy if exists "Admins can upload site assets" on storage.objects;
create policy "Admins can upload site assets"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'site-assets'
  and name ~ '^(spectacles|sponsors|general)/'
  and public.is_instituto_admin()
);

drop policy if exists "Admins can update site assets" on storage.objects;
create policy "Admins can update site assets"
on storage.objects
for update
to authenticated
using (bucket_id = 'site-assets' and public.is_instituto_admin())
with check (
  bucket_id = 'site-assets'
  and name ~ '^(spectacles|sponsors|general)/'
  and public.is_instituto_admin()
);

drop policy if exists "Admins can delete site assets" on storage.objects;
create policy "Admins can delete site assets"
on storage.objects
for delete
to authenticated
using (bucket_id = 'site-assets' and public.is_instituto_admin());

-- Dados iniciais preservam o conteúdo que já aparece no site hoje. DO NOTHING
-- evita sobrescrever alterações futuras feitas pela equipe no painel.
insert into public.spectacles (
  slug,
  title,
  subtitle,
  description,
  date_label,
  city,
  status,
  sort_order
)
values
(
  'ballet-dom-quixote',
  'Ballet Dom Quixote',
  'Espetáculo',
  'Remontagem do clássico do ballet de repertório, com seleção pública de elenco e convidados de renome internacional.',
  'Setembro · 2026',
  'Belo Horizonte · MG',
  'published',
  10
),
(
  'sessao-escolas-publicas',
  'Sessão para escolas públicas',
  'Ação social',
  'Contrapartida social com espetáculo exclusivo para crianças de escolas públicas, incluindo transporte e lanche.',
  'Setembro · 2026',
  'Belo Horizonte · MG',
  'published',
  20
)
on conflict (slug) do nothing;

insert into public.sponsors (
  slug,
  name,
  sponsor_type,
  description,
  status,
  sort_order
)
values (
  'maquinas-bolbi-ltda',
  'Máquinas Bolbi Ltda.',
  'master',
  'Citada no material do Instituto Cultural Saba como patrocinadora master. Empresa fundada em Belo Horizonte em 1954, atualmente administrada pela terceira geração da família Biskupski.',
  'active',
  10
)
on conflict (slug) do nothing;
