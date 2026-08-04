-- Pesquisa de satisfação — tabela de avaliações
-- Rode este arquivo uma vez no Supabase: SQL Editor > New query > cole > Run.

create table if not exists public.avaliacoes (
  id uuid primary key default gen_random_uuid(),
  nota smallint not null check (nota between 1 and 5),
  comentario text check (char_length(comentario) <= 600),
  nome text check (char_length(nome) <= 80),
  aprovado boolean not null default false,
  criado_em timestamptz not null default now()
);

alter table public.avaliacoes enable row level security;

-- Qualquer visitante pode ENVIAR uma avaliação...
drop policy if exists "qualquer um envia avaliacao" on public.avaliacoes;
create policy "qualquer um envia avaliacao"
  on public.avaliacoes for insert
  to anon, authenticated
  with check (aprovado = false);

-- ...mas o site só consegue LER as que você aprovou.
drop policy if exists "site le apenas aprovadas" on public.avaliacoes;
create policy "site le apenas aprovadas"
  on public.avaliacoes for select
  to anon, authenticated
  using (aprovado = true);

-- Sem policy de update/delete: ninguém com a chave pública consegue
-- alterar nota, aprovar depoimento ou apagar registro. Isso só acontece
-- por você, pelo painel do Supabase.

create index if not exists avaliacoes_aprovado_criado_em_idx
  on public.avaliacoes (aprovado, criado_em desc);
