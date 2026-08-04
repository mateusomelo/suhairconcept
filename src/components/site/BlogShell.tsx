import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";

import { SITE } from "@/lib/site-data";

export function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function BlogShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <a href="/" className="font-display text-xl tracking-[0.2em]">
            SÜ<span className="text-gold">.</span>
          </a>
          <nav className="flex items-center gap-7 text-xs uppercase tracking-[0.14em]">
            <Link to="/blog" className="hover:text-gold">
              Blog
            </Link>
            <a href="/" className="hidden hover:text-gold sm:block">
              O salão
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-10 items-center gap-2 rounded-full bg-gold px-5 text-[11px] font-semibold text-ink"
            >
              <MessageCircle className="size-3.5" /> Agendar
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">{children}</main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-4 px-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} SÜ Hair Concept</p>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-gold"
          >
            <Instagram className="size-4" /> @suhairconcept
          </a>
        </div>
      </footer>
    </div>
  );
}
