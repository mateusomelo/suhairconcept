import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

import ba1 from "@/assets/ba-1.jpg";
import ba2 from "@/assets/ba-2.jpg";
import ba3 from "@/assets/ba-3.jpg";
import { Reveal, SectionLabel } from "@/components/site/Reveal";
import { SITE } from "@/lib/site-data";

// Fotos reais de clientes do salão — cada arquivo já traz o antes e o
// depois lado a lado, com as etiquetas aplicadas na própria imagem.
const SLIDES = [
  {
    img: ba1,
    title: "Mega Hair + Loiro",
    text: "Do corte curto ao comprimento longo com iluminação natural.",
  },
  {
    img: ba2,
    title: "Loiro Premium",
    text: "Clareamento seguro, fio saudável e caimento leve.",
  },
  {
    img: ba3,
    title: "Mega Hair",
    text: "Volume e comprimento com naturalidade total.",
  },
];

export function BeforeAfter() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index]!;

  const go = (dir: number) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  return (
    <section id="resultados" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <SectionLabel>Antes e depois</SectionLabel>
            <h2 className="mt-6 font-display text-3xl font-light leading-tight sm:text-5xl">
              Transformações que falam por si.
            </h2>
          </Reveal>
          <div className="flex gap-2">
            <button
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Próximo"
              className="flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <figure className="mx-auto max-w-3xl overflow-hidden border border-border bg-offwhite">
              <img
                src={slide.img}
                alt={`Antes e depois — ${slide.title}`}
                loading="lazy"
                className="mx-auto max-h-[62svh] w-full object-contain"
              />
            </figure>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl">{slide.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{slide.text}</p>
          </div>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border-b border-gold pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-gold"
          >
            Ver mais resultados <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
