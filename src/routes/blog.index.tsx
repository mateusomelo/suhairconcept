import { createFileRoute, Link } from "@tanstack/react-router";

import { BlogShell, formatarData } from "@/components/site/BlogShell";
import { supabase } from "@/lib/supabase";

const TITLE = "Blog | SÜ Hair Concept";
const DESCRIPTION =
  "Cuidados capilares, tendências e bastidores do SÜ Hair Concept, salão premium em Moema, São Paulo.";

type Resumo = {
  slug: string;
  titulo: string;
  resumo: string | null;
  imagem_url: string | null;
  criado_em: string;
};

export const Route = createFileRoute("/blog/")({
  // Roda no servidor: o HTML já sai com as matérias dentro, que é o que
  // o Google precisa para indexar.
  loader: async (): Promise<Resumo[]> => {
    const { data } = await supabase
      .from("posts")
      .select("slug, titulo, resumo, imagem_url, criado_em")
      .eq("publicado", true)
      .order("criado_em", { ascending: false })
      .limit(60);
    return (data as Resumo[] | null) ?? [];
  },
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
});

function BlogIndex() {
  const posts = Route.useLoaderData();

  return (
    <BlogShell>
      <header className="border-b border-border pb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Blog</p>
        <h1 className="mt-5 font-display text-4xl font-light leading-tight sm:text-6xl">
          Beleza, cuidado e bastidores.
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">{DESCRIPTION}</p>
      </header>

      {posts.length === 0 ? (
        <p className="py-20 text-sm text-muted-foreground">
          Ainda não publicamos nenhuma matéria. Volte em breve.
        </p>
      ) : (
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group flex flex-col"
            >
              {post.imagem_url ? (
                <img
                  src={post.imagem_url}
                  alt=""
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div className="aspect-[4/3] w-full bg-offwhite" />
              )}
              <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {formatarData(post.criado_em)}
              </p>
              <h2 className="mt-3 font-display text-2xl leading-snug transition-colors group-hover:text-gold">
                {post.titulo}
              </h2>
              {post.resumo && (
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {post.resumo}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </BlogShell>
  );
}
