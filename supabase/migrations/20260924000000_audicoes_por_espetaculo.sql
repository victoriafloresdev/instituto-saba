-- Audições por espetáculo.
--
-- Cada espetáculo tem seu elenco ("cada evento muda o elenco"), então:
--   1. o espetáculo diz se terá audição (audition_enabled);
--   2. cada inscrição registra para qual espetáculo é (spectacle_id).
--      Inscrição sem espetáculo = banco de talentos, o cadastro geral de
--      interessados, que fica sempre aberto;
--   3. só é possível se inscrever na audição de um espetáculo depois que
--      ela abre (audition_opens_at) — regra garantida aqui no banco, e não
--      só na tela, para valer também para quem chamar a API diretamente.
--
-- Idempotente. Aplicar pelo painel: SQL Editor → New query → colar → Run.

alter table public.spectacles
  add column if not exists audition_enabled boolean not null default false;

alter table public.auditions
  add column if not exists spectacle_id uuid
  references public.spectacles (id) on delete set null;

create index if not exists auditions_spectacle_idx
  on public.auditions (spectacle_id, created_at desc);

-- Recusa inscrições em audição que não está aberta. SECURITY DEFINER para
-- conseguir ler o espetáculo mesmo quando quem insere é um visitante anônimo.
create or replace function public.verificar_audicao_aberta()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.spectacle_id is null then
    return new;  -- banco de talentos: sempre aceito
  end if;

  if not exists (
    select 1
    from public.spectacles
    where id = new.spectacle_id
      and status = 'published'
      and audition_enabled
      and audition_opens_at is not null
      and audition_opens_at <= now()
  ) then
    raise exception 'As inscrições para esta audição ainda não estão abertas.'
      using errcode = 'check_violation';
  end if;

  return new;
end;
$$;

drop trigger if exists auditions_audicao_aberta on public.auditions;
create trigger auditions_audicao_aberta
before insert on public.auditions
for each row execute function public.verificar_audicao_aberta();

notify pgrst, 'reload schema';
