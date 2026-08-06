import { motion } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import logoSu from "@/assets/logo-su-marca.png";
import { NAV_LINKS, SITE, WHATSAPP } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "glass border-b border-border/60 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.5)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
        <Link to="/" aria-label="SÜ Hair Concept — início" className="flex items-center">
          <img
            src={logoSu}
            alt="SÜ Hair Concept"
            width={112}
            height={112}
            className="h-9 w-auto object-contain sm:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href.startsWith("/") ? link.href : "/"}
              {...(link.href.startsWith("#") ? { hash: link.href.slice(1) } : {})}
              className={cn(
                "relative text-[13px] tracking-wide transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100",
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-white/80 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* No celular o menu fica atrás do ícone de três riscos, o que
              escondia as duas ações que mais importam. Ficam visíveis
              aqui e somem no desktop, onde o menu já as mostra. */}
          <a
            href="/blog"
            className={cn(
              "text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors lg:hidden",
              scrolled ? "text-foreground hover:text-gold" : "text-white/90 hover:text-gold",
            )}
          >
            Blog
          </a>
          <a
            href="/avaliar"
            className="flex min-h-9 items-center rounded-full border border-gold px-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold lg:hidden"
          >
            Avaliar
          </a>

          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            href={WHATSAPP.geral}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-black transition-shadow hover:shadow-[0_12px_30px_-12px_var(--gold)] sm:inline-flex"
          >
            <Sparkles className="size-3.5" />
            Agendar Experiência
          </motion.a>

          <button
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className={cn("lg:hidden", scrolled ? "text-foreground" : "text-white")}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="glass overflow-hidden border-t border-border/60 lg:hidden"
        >
          <div className="flex flex-col px-6 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href.startsWith("/") ? link.href : "/"}
                {...(link.href.startsWith("#") ? { hash: link.href.slice(1) } : {})}
                onClick={() => setOpen(false)}
                className="border-b border-border/40 py-3 text-sm text-foreground last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WHATSAPP.geral}
              target="_blank"
              rel="noreferrer"
              className="mt-4 rounded-full bg-gold py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-black"
            >
              ✨ Agendar Experiência
            </a>
          </div>
        </motion.nav>
      )}
    </header>
  );
}
