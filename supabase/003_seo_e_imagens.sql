-- Blog: campos de SEO + envio de imagem pelo painel
-- Rode uma vez no Supabase: SQL Editor > New query > cole > Run.

-- 1) Campos que o Google usa no resultado da busca.
--    Ficam separados do título e do resumo porque o texto que converte
--    na busca nem sempre é o melhor texto dentro da página.
alter table public.posts
  add column if not exists meta_title text check (char_length(meta_title) <= 70),
  add column if not exists meta_description text check (char_length(meta_description) <= 170);

-- 2) Bucket público para as imagens das matérias.
insert into storage.buckets (id, name, public)
values ('blog', 'blog', true)
on conflict (id) do update set public = true;

-- 3) Quem está logado envia e gerencia; o público só lê.
drop policy if exists "blog imagens leitura publica" on storage.objects;
create policy "blog imagens leitura publica"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'blog');

drop policy if exists "blog imagens envio logado" on storage.objects;
create policy "blog imagens envio logado"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog');

drop policy if exists "blog imagens atualiza logado" on storage.objects;
create policy "blog imagens atualiza logado"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'blog');

drop policy if exists "blog imagens apaga logado" on storage.objects;
create policy "blog imagens apaga logado"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog');
