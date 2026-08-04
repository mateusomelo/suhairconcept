-- Blog — tabela de matérias
-- Rode uma vez no Supabase: SQL Editor > New query > cole > Run.

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  titulo text not null,
  resumo text,
  conteudo text not null,
  imagem_url text,
  publicado boolean not null default false,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

alter table public.posts enable row level security;

-- Visitante do site: só enxerga o que já foi publicado.
drop policy if exists "publico le publicados" on public.posts;
create policy "publico le publicados"
  on public.posts for select
  to anon, authenticated
  using (publicado = true);

-- Proprietária logada: enxerga tudo, inclusive rascunhos.
drop policy if exists "logado le tudo" on public.posts;
create policy "logado le tudo"
  on public.posts for select
  to authenticated
  using (true);

-- Só quem está logado escreve, edita e apaga.
drop policy if exists "logado escreve" on public.posts;
create policy "logado escreve"
  on public.posts for insert to authenticated with check (true);

drop policy if exists "logado atualiza" on public.posts;
create policy "logado atualiza"
  on public.posts for update to authenticated using (true);

drop policy if exists "logado apaga" on public.posts;
create policy "logado apaga"
  on public.posts for delete to authenticated using (true);

create index if not exists posts_publicado_criado_em_idx
  on public.posts (publicado, criado_em desc);

-- Mantém atualizado_em correto sem depender do front-end.
create or replace function public.toca_atualizado_em()
returns trigger language plpgsql as $$
begin
  new.atualizado_em = now();
  return new;
end $$;

drop trigger if exists posts_atualizado_em on public.posts;
create trigger posts_atualizado_em
  before update on public.posts
  for each row execute function public.toca_atualizado_em();
