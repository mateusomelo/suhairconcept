import { Instagram } from "lucide-react";

import i6 from "@/assets/insta-6.jpg";
import i1 from "@/assets/insta-1.jpg";
import i2 from "@/assets/insta-2.jpg";
import i3 from "@/assets/insta-3.jpg";
import i4 from "@/assets/insta-4.jpg";
import i5 from "@/assets/insta-5.jpg";
import { Reveal, SectionLabel } from "@/components/site/Reveal";
import { SITE } from "@/lib/site-data";

const FEED = [i1, i2, i3, i4, i5, i6];

export function InstagramSection() {
  return (
    <section className="bg-offwhite py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionLabel>Instagram</SectionLabel>
            <h2 className="mt-6 font-display text-3xl font-light leading-tight sm:text-5xl">
              @suhairconcept
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-gold hover:text-black"
            >
              <Instagram className="size-4" /> Seguir no Instagram
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {FEED.map((src, i) => (
            <Reveal key={i} delay={(i % 6) * 0.05}>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square overflow-hidden"
              >
                <img
                  src={src}
                  alt="Publicação do feed do SÜ Hair Concept"
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <Instagram className="size-6 text-white" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
