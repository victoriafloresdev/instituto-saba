-- Equipe e elenco de cada espetáculo, editáveis pelo painel.
--
-- Cada linha é uma pessoa ligada a um espetáculo: direção e criação,
-- produção e equipe, elenco (bailarinos) ou bailarinos convidados. A página
-- do espetáculo lê esta tabela; "destaque" põe a pessoa no cartão grande do
-- topo da ficha técnica (hoje, a remontadora).
--
-- As fotos vão para o bucket site-assets, na pasta spectacles/. As pessoas
-- já cadastradas no código usam fotos de /images (caminho começando com "/").
--
-- Idempotente. Aplicar pelo painel: SQL Editor → New query → colar → Run.

create table if not exists public.spectacle_people (
  id uuid primary key default gen_random_uuid(),
  spectacle_id uuid not null references public.spectacles (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 180),
  role text not null check (char_length(role) between 1 and 120),
  category text not null default 'equipe'
    check (category in ('direcao', 'equipe', 'elenco', 'convidado')),
  featured boolean not null default false,
  summary text check (summary is null or char_length(summary) <= 400),
  bio text check (bio is null or char_length(bio) <= 8000),
  photo_path text check (photo_path is null or char_length(photo_path) <= 500),
  photo_alt text check (photo_alt is null or char_length(photo_alt) <= 240),
  visible boolean not null default true,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists spectacle_people_spectacle_idx
  on public.spectacle_people (spectacle_id, category, sort_order);

drop trigger if exists set_spectacle_people_updated_at on public.spectacle_people;
create trigger set_spectacle_people_updated_at
before update on public.spectacle_people
for each row execute function public.set_site_content_updated_at();

alter table public.spectacle_people enable row level security;

grant select on table public.spectacle_people to anon, authenticated;
grant insert, update, delete on table public.spectacle_people to authenticated;

-- O público vê as pessoas visíveis de espetáculos publicados.
drop policy if exists "Public can view visible people" on public.spectacle_people;
create policy "Public can view visible people"
on public.spectacle_people
for select
to anon, authenticated
using (
  visible
  and exists (
    select 1 from public.spectacles s
    where s.id = spectacle_id and s.status = 'published'
  )
);

drop policy if exists "Admins can manage people" on public.spectacle_people;
create policy "Admins can manage people"
on public.spectacle_people
for all
to authenticated
using (public.is_instituto_admin())
with check (public.is_instituto_admin());

-- Carga inicial: a ficha técnica do Ballet Dom Quixote que estava no código.
-- Só roda se o espetáculo ainda não tiver ninguém cadastrado.
do $$
declare
  dq uuid;
begin
  select id into dq from public.spectacles where slug = 'ballet-dom-quixote';
  if dq is null or exists (select 1 from public.spectacle_people where spectacle_id = dq) then
    return;
  end if;

  insert into public.spectacle_people
    (spectacle_id, name, role, category, featured, summary, bio, photo_path, sort_order)
  values
    (dq, 'Maria Vakhrusheva', 'Remontagem', 'direcao', true,
     'Formada em Ballet Clássico e Repertório pela Academia Vaganova, foi bailarina do Kirov Ballet, no Mariinsky.',
     'Nascida na Rússia, é formada em Ballet Clássico e Repertório pela Academia Vaganova, onde concluiu o bacharelado e o curso de formação para professores e coreógrafos, atuando nessas disciplinas na própria Academia.'
       || E'\n\n' || 'Foi bailarina do Kirov Ballet, no Mariinsky; professora e ensaiadora do Ballet Nacional de Israel; e trabalhou na Escola Internacional de Ballet, em Tóquio.'
       || E'\n\n' || 'É jurada e professora em festivais de dança no Brasil e no exterior.',
     '/images/equipe-maria-183.webp', 0),

    (dq, 'Tíndaro Silvano', 'Direção geral', 'direcao', false,
     'Coreógrafo com passagem pelo Ballet Guaíra, Ballet Gulbenkian e Ballet do Theatro Municipal.',
     'Nascido em Belo Horizonte, em 1956, iniciou os estudos de dança aos 18 anos no Palácio das Artes. Atuou no Ballet Guaíra, no Ballet Gulbenkian e no Ballet do Theatro Municipal.'
       || E'\n\n' || 'Como coreógrafo, colaborou com companhias internacionais e criou 15 espetáculos premiados para a Companhia de Dança de Minas Gerais entre 1988 e 1996.'
       || E'\n\n' || 'Teve residências artísticas em Paris, dirigiu a Cia de Dança do Palácio das Artes e atua como coreógrafo em instituições de diversos países.',
     '/images/equipe-tindaro-276.webp', 1),

    (dq, 'Everson Botelho (Beka)', 'Direção artística', 'direcao', false,
     'Bailarino, professor e diretor, com apresentações em mais de 35 países e passagem pelo Grupo Corpo.',
     'Natural de São Paulo, formou-se pela Especial Academia de Ballet. Atuou na Companhia de Dança do Palácio das Artes, na São Paulo Companhia de Dança e no Grupo Corpo.'
       || E'\n\n' || 'Apresentou-se em mais de 35 países e participou de eventos como o Festival de Dança de Joinville e o Prix de Lausanne, além de competições em Cuba, Argentina, Japão, Hungria e Bulgária.'
       || E'\n\n' || 'Foi diretor artístico do Núcleo de Dança de Barueri. Aperfeiçoa-se na metodologia russa da Escola do Teatro Bolshoi no Brasil, e é jurado e professor convidado em festivais e companhias.',
     '/images/equipe-everson-600.webp', 2),

    (dq, 'Marina Saba', 'Produção e idealização', 'equipe', false,
     'Bailarina, empresária e advogada, idealizadora do Instituto Cultural Saba.',
     null,
     '/images/marina-sentada-760.webp', 0),

    (dq, 'Daphne Chequer', 'Produção', 'equipe', false,
     'Há mais de 15 anos na cena cultural de Belo Horizonte, Rio de Janeiro e São Paulo.',
     'Tem formação técnica em dança pelo Cefart/Palácio das Artes, graduação em Educação Física e pós-graduação em Gestão de Empreendimentos Culturais pela PUC.'
       || E'\n\n' || 'É produtora e diretora artística da Marilu Dias Escola de Dança. Foi assistente de direção nas cerimônias dos Jogos Paralímpicos Rio 2016 e professora e ensaiadora da Sesc Companhia de Dança e da São Paulo Companhia de Dança.'
       || E'\n\n' || 'Foi bailarina do Ballet Jovem do Palácio das Artes e da Companhia Mário Nascimento.',
     '/images/equipe-daphne-600.webp', 1),

    (dq, 'Renata Araujo', 'Equipe artística', 'equipe', false,
     'Professora, ensaiadora e coreógrafa, dedicada à formação de novos bailarinos.',
     'Iniciou os estudos de ballet em Belo Horizonte e formou-se pela Royal Ballet em 2001. Estudou com Tércia Cançado e Ramon Moreno.'
       || E'\n\n' || 'Trabalhou em escolas como Primeiro Ato e Ballet Jovem do Palácio das Artes, como professora, ensaiadora e coreógrafa. Participou do Festival de Dança de Joinville, do Tanzolymp, em Berlim, e do Prix de Lausanne 2020.',
     '/images/equipe-renata-600.webp', 2),

    (dq, 'Natalia Samarino', 'Historiadora da dança', 'equipe', false,
     'Bailarina, diretora artística do Pas de Quatre Centro de Dança e autora de Histórias do Ballet.',
     null, null, 3);
end;
$$;

notify pgrst, 'reload schema';
