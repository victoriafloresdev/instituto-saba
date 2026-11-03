-- Equipe e elenco fechados ao público até a contratante liberar (pedido de
-- 03/11/2026: "trancar informações para o público sobre pessoas, quem está
-- trabalhando etc., por enquanto").
--
-- Cada espetáculo ganha o interruptor show_people, desligado por padrão.
-- Desligado, a página do espetáculo não mostra a ficha técnica nem o
-- elenco, e o público também não consegue ler as pessoas direto pela API:
-- a política de leitura passa a exigir o interruptor ligado. O painel
-- continua vendo e editando tudo.
--
-- Idempotente. Aplicar pelo painel: SQL Editor → New query → colar → Run.

alter table public.spectacles
  add column if not exists show_people boolean not null default false;

comment on column public.spectacles.show_people is
  'Mostra a ficha técnica e o elenco na página pública do espetáculo.';

drop policy if exists "Public can view visible people" on public.spectacle_people;
create policy "Public can view visible people"
on public.spectacle_people
for select
to anon, authenticated
using (
  visible
  and exists (
    select 1 from public.spectacles s
    where s.id = spectacle_id and s.status = 'published' and s.show_people
  )
);
