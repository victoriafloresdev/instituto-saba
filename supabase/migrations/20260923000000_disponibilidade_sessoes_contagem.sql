-- Pedidos da contratante (plano de alterações, seções 5 e 6):
--   1. disponibilidade do bailarino na inscrição de audição (manhã/tarde/noite,
--      podendo marcar mais de uma);
--   2. várias sessões por espetáculo ("vão ser 2 ou 3 datas");
--   3. datas de abertura das audições e da venda de ingressos, que alimentam a
--      contagem regressiva do site.
--
-- Idempotente: pode ser executada mais de uma vez sem efeito colateral.
-- Aplicar pelo painel do Supabase: SQL Editor → New query → colar → Run.

-- 1. Disponibilidade na inscrição de audição -------------------------------

alter table public.auditions
  add column if not exists disponibilidade text[] not null default '{}';

alter table public.auditions
  drop constraint if exists auditions_disponibilidade_valida;
alter table public.auditions
  add constraint auditions_disponibilidade_valida
  check (disponibilidade <@ array['Manhã', 'Tarde', 'Noite']::text[]);

-- 2. Sessões de cada espetáculo ------------------------------------------
-- Lista de objetos { "data": "AAAA-MM-DD", "hora": "HH:MM" }. Fica na própria
-- linha do espetáculo, então herda as políticas de leitura e escrita que já
-- existem (público lê só o publicado; só admin altera).

alter table public.spectacles
  add column if not exists sessions jsonb not null default '[]'::jsonb;

alter table public.spectacles
  drop constraint if exists spectacles_sessions_lista;
alter table public.spectacles
  add constraint spectacles_sessions_lista
  check (jsonb_typeof(sessions) = 'array' and jsonb_array_length(sessions) <= 20);

-- 3. Datas de abertura para a contagem regressiva --------------------------

alter table public.spectacles
  add column if not exists audition_opens_at timestamptz,
  add column if not exists ticket_sales_open_at timestamptz;

-- A API do Supabase guarda o formato das tabelas em cache; isto a faz
-- enxergar as colunas novas na hora.
notify pgrst, 'reload schema';
