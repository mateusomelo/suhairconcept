-- Pesquisa de satisfação — serviços recebidos e campos obrigatórios
-- Rode este arquivo uma vez no Supabase: SQL Editor > New query > cole > Run.
--
-- Depende de 001_avaliacoes.sql.

-- 1) Quais serviços a cliente recebeu, como no formulário do Google.
--    Continua opcional: só as estrelas, o nome e o comentário são
--    exigidos, e um campo a mais obrigatório derrubaria a taxa de
--    resposta de quem está saindo do salão com pressa.
alter table public.avaliacoes
  add column if not exists servicos text[];

-- 2) Nome e comentário passam a ser obrigatórios.
--
--    As linhas antigas podem ter nulo nesses campos, e o Postgres
--    recusa o NOT NULL enquanto existir nulo. Por isso preenchemos
--    antes: as avaliações já enviadas continuam válidas, apenas com o
--    autor identificado como anônimo.
update public.avaliacoes set nome = 'Cliente SÜ' where nome is null or btrim(nome) = '';
update public.avaliacoes set comentario = '(sem comentário)'
  where comentario is null or btrim(comentario) = '';

alter table public.avaliacoes alter column nome set not null;
alter table public.avaliacoes alter column comentario set not null;

-- 3) Impede envio com campo só de espaços — o not null sozinho aceita
--    uma string vazia, e o site ficaria com depoimento em branco.
alter table public.avaliacoes drop constraint if exists avaliacoes_nome_preenchido;
alter table public.avaliacoes add constraint avaliacoes_nome_preenchido
  check (btrim(nome) <> '');

alter table public.avaliacoes drop constraint if exists avaliacoes_comentario_preenchido;
alter table public.avaliacoes add constraint avaliacoes_comentario_preenchido
  check (btrim(comentario) <> '');
