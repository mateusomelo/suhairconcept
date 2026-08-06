import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { BASE_URL } from "@/lib/site-data";
import { supabase } from "@/lib/supabase";



export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // Matérias publicadas entram no sitemap automaticamente — a
        // proprietária publica pelo /admin e o Google descobre sozinho.
        const { data: posts } = await supabase
          .from("posts")
          .select("slug, atualizado_em")
          .eq("publicado", true)
          .order("criado_em", { ascending: false })
          .limit(500);

        const paginasDoBlog = (posts ?? []).map((p) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}/blog/${p.slug}</loc>`,
            `    <lastmod>${new Date(p.atualizado_em as string).toISOString().slice(0, 10)}</lastmod>`,
            `    <changefreq>monthly</changefreq>`,
            `    <priority>0.7</priority>`,
            `  </url>`,
          ].join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          `  <url>`,
          `    <loc>${BASE_URL}/</loc>`,
          `    <changefreq>weekly</changefreq>`,
          `    <priority>1.0</priority>`,
          `  </url>`,
          `  <url>`,
          `    <loc>${BASE_URL}/mega-hair-aplicacao-rapida-moema</loc>`,
          `    <changefreq>monthly</changefreq>`,
          `    <priority>0.9</priority>`,
          `  </url>`,
          `  <url>`,
          `    <loc>${BASE_URL}/alongamento-de-unha-moema</loc>`,
          `    <changefreq>monthly</changefreq>`,
          `    <priority>0.9</priority>`,
          `  </url>`,
          `  <url>`,
          `    <loc>${BASE_URL}/blog</loc>`,
          `    <changefreq>weekly</changefreq>`,
          `    <priority>0.8</priority>`,
          `  </url>`,
          ...paginasDoBlog,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
