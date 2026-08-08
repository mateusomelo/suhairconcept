import { Instagram, MapPin, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { NAV_LINKS, SITE } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-ink py-16 text-white/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl tracking-[0.2em] text-white">SÜ Hair Concept</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-gold">Beauty Experience</p>
          </div>

          <address className="not-italic">
            <p className="flex items-start gap-2 text-sm leading-relaxed">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>
                {SITE.address.street}
                <br />
                {SITE.address.district}
                <br />
                {SITE.address.city}
              </span>
            </p>
            <a
              href={SITE.phoneHref}
              className="mt-4 inline-flex items-center gap-2 text-sm transition-colors hover:text-gold"
            >
              <Phone className="size-4 text-gold" /> {SITE.phone}
            </a>
          </address>

          <div>
            <nav className="flex flex-wrap gap-x-5 gap-y-2">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  to={l.href.startsWith("/") ? l.href : "/"}
                  {...(l.href.startsWith("#") ? { hash: l.href.slice(1) } : {})}
                  className="text-xs transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm transition-colors hover:text-gold"
            >
              <Instagram className="size-4 text-gold" /> @suhairconcept
            </a>
          </div>
        </div>

        {/* /60 e não /40: a 40% o contraste era 3,8:1, abaixo do mínimo
            de 4,5:1 que a WCAG pede para texto pequeno. */}
        <p className="pt-6 text-center text-[11px] tracking-wide text-white/60">
          © {new Date().getFullYear()} SÜ Hair Concept · Beauty Experience — Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
