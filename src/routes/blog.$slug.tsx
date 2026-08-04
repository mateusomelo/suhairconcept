import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Markdown from "react-markdown";

import { BlogShell, formatarData } from "@/components/site/BlogShell";
import { SITE } from "@/lib/site-data";
import { supabase } from "@/lib/supabase";

const BASE_URL = "https://suhairconcept.lovable.app";

type PostPublico = {
  slug: string;
  titulo: string;
  resumo: string | null;
  conteudo: string;
  imagem_url: string | null;
  criado_em: string;
  atualizado_em: string;
};

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }): Promise<PostPublico> => {
    const { data } = await supabase
      .from("posts")
      .select("slug, titulo, resumo, conteudo, imagem_url, criado_em, atualizado_em")
      .eq("slug", params.slug)
      .eq("publicado", true)
      .maybeSingle();

    if (!data) throw notFound();
    return data as PostPublico;
  },
  component: PostPage,
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const url = `${BASE_URL}/blog/${loaderData.slug}`;
    const descricao = loaderData.resumo ?? `${loaderData.conteudo.slice(0, 155)}…`;

    return {
      meta: [
        { title: `${loaderData.titulo} | SÜ Hair Concept` },
        { name: "description", content: descricao },
        { property: "og:title", content: loaderData.titulo },
        { property: "og:description", content: descricao },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(loaderData.imagem_url
          ? [{ property: "og:image", content: loaderData.imagem_url }]
          : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: loaderData.titulo,
            description: descricao,
            datePublished: loaderData.criado_em,
            dateModified: loaderData.atualizado_em,
            image: loaderData.imagem_url ?? undefined,
            mainEntityOfPage: url,
            author: { "@type": "Organization", name: "SÜ Hair Concept" },
            publisher: { "@type": "Organization", name: "SÜ Hair Concept" },
          }),
        },
      ],
    };
  },
});

function PostPage() {
  const post = Route.useLoaderData();

  return (
    <BlogShell>
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-gold"
      >
        <ArrowLeft className="size-4" /> Todas as matérias
      </Link>

      <article className="mx-auto mt-10 max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {formatarData(post.criado_em)}
        </p>
        <h1 className="mt-4 text-balance-pretty font-display text-4xl font-light leading-tight sm:text-5xl">
          {post.titulo}
        </h1>
        {post.resumo && (
          <p className="mt-6 text-base leading-8 text-muted-foreground">{post.resumo}</p>
        )}

        {post.imagem_url && (
          <img src={post.imagem_url} alt="" className="mt-10 aspect-[16/9] w-full object-cover" />
        )}

        {/* react-markdown não usa innerHTML: HTML escrito no texto vira
            texto puro, então não há risco de injeção pelo editor. */}
        <div className="post-conteudo mt-10">
          <Markdown>{post.conteudo}</Markdown>
        </div>

        <aside className="mt-16 border-t border-border pt-10 text-center">
          <p className="font-display text-2xl leading-snug">Quer esse cuidado no seu cabelo?</p>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-8 text-xs font-semibold uppercase tracking-[0.16em] text-ink"
          >
            <MessageCircle className="size-4" /> Agendar avaliação
          </a>
        </aside>
      </article>
    </BlogShell>
  );
}
