import type { Session } from "@supabase/supabase-js";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Eye, Loader2, LogOut, Plus, Trash2 } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { gerarSlug, supabase, type Post } from "@/lib/supabase";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Painel | SÜ Hair Concept" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCarregando(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (carregando) {
    return (
      <Centro>
        <Loader2 className="size-6 animate-spin text-gold" />
      </Centro>
    );
  }

  return session ? <Painel /> : <Login />;
}

function Centro({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-offwhite px-6">{children}</div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setErro(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) setErro("E-mail ou senha incorretos.");
    setEnviando(false);
  }

  return (
    <Centro>
      <form
        onSubmit={entrar}
        className="w-full max-w-sm rounded-2xl border border-border bg-background p-8"
      >
        <p className="font-display text-2xl tracking-[0.2em]">
          SÜ<span className="text-gold">.</span>
        </p>
        <h1 className="mt-6 font-display text-2xl font-light">Painel de matérias</h1>

        <label className="mt-8 block">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            E-mail
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-3 w-full rounded-lg border border-border bg-offwhite p-3.5 text-sm outline-none focus:border-gold"
          />
        </label>

        <label className="mt-5 block">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Senha
          </span>
          <input
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="mt-3 w-full rounded-lg border border-border bg-offwhite p-3.5 text-sm outline-none focus:border-gold"
          />
        </label>

        {erro && <p className="mt-5 text-sm text-red-600">{erro}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold text-xs font-semibold uppercase tracking-[0.16em] text-ink disabled:opacity-60"
        >
          {enviando ? <Loader2 className="size-4 animate-spin" /> : "Entrar"}
        </button>
      </form>
    </Centro>
  );
}

const VAZIO = {
  titulo: "",
  slug: "",
  resumo: "",
  conteudo: "",
  imagem_url: "",
  publicado: false,
};

function Painel() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editando, setEditando] = useState<Partial<Post> | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);

  async function carregar() {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("criado_em", { ascending: false });
    setPosts((data as Post[] | null) ?? []);
  }

  useEffect(() => {
    void carregar();
  }, []);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    if (!editando) return;

    const slug = editando.slug?.trim() || gerarSlug(editando.titulo ?? "");
    if (!slug) {
      setAviso("Escreva um título antes de salvar.");
      return;
    }

    setSalvando(true);
    setAviso(null);

    const payload = {
      titulo: editando.titulo ?? "",
      slug,
      resumo: editando.resumo?.trim() || null,
      conteudo: editando.conteudo ?? "",
      imagem_url: editando.imagem_url?.trim() || null,
      publicado: editando.publicado ?? false,
    };

    const { error } = editando.id
      ? await supabase.from("posts").update(payload).eq("id", editando.id)
      : await supabase.from("posts").insert(payload);

    setSalvando(false);

    if (error) {
      setAviso(
        error.code === "23505"
          ? "Já existe uma matéria com esse endereço (slug). Mude o título ou o slug."
          : `Não foi possível salvar: ${error.message}`,
      );
      return;
    }

    setEditando(null);
    void carregar();
  }

  async function apagar(post: Post) {
    if (!confirm(`Apagar "${post.titulo}"? Isso não pode ser desfeito.`)) return;
    await supabase.from("posts").delete().eq("id", post.id);
    void carregar();
  }

  if (editando) {
    return (
      <div className="min-h-svh bg-offwhite">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <button
            onClick={() => setEditando(null)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-gold"
          >
            <ArrowLeft className="size-4" /> Voltar
          </button>

          <form
            onSubmit={salvar}
            className="mt-8 rounded-2xl border border-border bg-background p-8"
          >
            <Campo
              rotulo="Título"
              valor={editando.titulo ?? ""}
              onChange={(v) =>
                setEditando((p) => ({
                  ...p,
                  titulo: v,
                  // Só sugere o slug enquanto a matéria é nova.
                  slug: p?.id ? p.slug : gerarSlug(v),
                }))
              }
              placeholder="Como cuidar do mega hair no verão"
            />

            <Campo
              rotulo="Endereço da página (slug)"
              valor={editando.slug ?? ""}
              onChange={(v) => setEditando((p) => ({ ...p, slug: gerarSlug(v) }))}
              ajuda={`Vai ficar: /blog/${editando.slug || "..."}`}
            />

            <Campo
              rotulo="Resumo (aparece no Google e na listagem)"
              valor={editando.resumo ?? ""}
              onChange={(v) => setEditando((p) => ({ ...p, resumo: v }))}
              multilinha
              linhas={3}
              placeholder="Duas ou três linhas que resumem a matéria."
            />

            <Campo
              rotulo="Imagem de capa (link)"
              valor={editando.imagem_url ?? ""}
              onChange={(v) => setEditando((p) => ({ ...p, imagem_url: v }))}
              ajuda="Cole o link de uma imagem já publicada na internet ou no Storage do Supabase."
            />

            <Campo
              rotulo="Texto da matéria"
              valor={editando.conteudo ?? ""}
              onChange={(v) => setEditando((p) => ({ ...p, conteudo: v }))}
              multilinha
              linhas={18}
              ajuda="Formatação: ## para subtítulo, **negrito**, - para lista, [texto](link) para link."
            />

            <label className="mt-8 flex items-center gap-3">
              <input
                type="checkbox"
                checked={editando.publicado ?? false}
                onChange={(e) => setEditando((p) => ({ ...p, publicado: e.target.checked }))}
                className="size-5 accent-[#cfae70]"
              />
              <span className="text-sm">
                Publicar no site
                <span className="block text-xs text-muted-foreground">
                  Desmarcado, fica salvo como rascunho e ninguém vê.
                </span>
              </span>
            </label>

            {aviso && <p className="mt-5 text-sm text-red-600">{aviso}</p>}

            <button
              type="submit"
              disabled={salvando}
              className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold text-xs font-semibold uppercase tracking-[0.16em] text-ink disabled:opacity-60"
            >
              {salvando ? <Loader2 className="size-4 animate-spin" /> : "Salvar matéria"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-offwhite">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl tracking-[0.2em]">
              SÜ<span className="text-gold">.</span>
            </p>
            <h1 className="mt-2 font-display text-3xl font-light">Matérias do blog</h1>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-gold"
          >
            <LogOut className="size-4" /> Sair
          </button>
        </header>

        <button
          onClick={() => setEditando({ ...VAZIO })}
          className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-xs font-semibold uppercase tracking-[0.16em] text-background"
        >
          <Plus className="size-4" /> Nova matéria
        </button>

        <div className="mt-10 space-y-3">
          {posts.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Nenhuma matéria ainda. Clique em "Nova matéria" para começar.
            </p>
          )}

          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-background p-5"
            >
              <button onClick={() => setEditando(post)} className="min-w-0 flex-1 text-left">
                <p className="truncate font-display text-lg">{post.titulo}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {post.publicado ? <span className="text-gold">Publicada</span> : "Rascunho"} ·
                  /blog/{post.slug}
                </p>
              </button>

              <div className="flex items-center gap-1">
                {post.publicado && (
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Ver no site"
                    className="flex size-10 items-center justify-center rounded-full border border-border hover:border-gold hover:text-gold"
                  >
                    <Eye className="size-4" />
                  </a>
                )}
                <button
                  onClick={() => apagar(post)}
                  aria-label="Apagar matéria"
                  className="flex size-10 items-center justify-center rounded-full border border-border hover:border-red-400 hover:text-red-600"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function Campo({
  rotulo,
  valor,
  onChange,
  ajuda,
  placeholder,
  multilinha = false,
  linhas = 3,
}: {
  rotulo: string;
  valor: string;
  onChange: (v: string) => void;
  ajuda?: string;
  placeholder?: string;
  multilinha?: boolean;
  linhas?: number;
}) {
  const classe =
    "mt-3 w-full rounded-lg border border-border bg-offwhite p-3.5 text-sm outline-none focus:border-gold";

  return (
    <label className="mt-6 block first:mt-0">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {rotulo}
      </span>
      {multilinha ? (
        <textarea
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          rows={linhas}
          placeholder={placeholder}
          className={`${classe} resize-y`}
        />
      ) : (
        <input
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={classe}
        />
      )}
      {ajuda && <span className="mt-2 block text-xs text-muted-foreground">{ajuda}</span>}
    </label>
  );
}
