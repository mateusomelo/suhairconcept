import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

import about from "@/assets/about-salon.jpg";
import g1 from "@/assets/gal-1.jpg";
import g2 from "@/assets/gal-2.jpg";
import g3 from "@/assets/gal-3.jpg";
import g4 from "@/assets/gal-4.jpg";
import g5 from "@/assets/gal-5.jpg";
import g6 from "@/assets/gal-6.jpg";
import hero from "@/assets/hero-salon.jpg";
import { Reveal, SectionLabel } from "@/components/site/Reveal";

const IMAGES = [
  { src: g1, alt: "Morena iluminada com brilho natural" },
  { src: g5, alt: "Estação de trabalho do salão com detalhes dourados" },
  { src: g2, alt: "Loiro com mechas iluminadas" },
  { src: g4, alt: "Mega hair com ondas volumosas" },
  { src: about, alt: "Profissional em atendimento no salão" },
  { src: g3, alt: "Corte feminino bob preciso" },
  { src: hero, alt: "Ambiente sofisticado do salão" },
  { src: g6, alt: "Penteado de noiva elegante" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="bg-offwhite py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <SectionLabel>Galeria</SectionLabel>
          <h2 className="mt-6 font-display text-3xl font-light leading-tight sm:text-5xl">
            Detalhes que definem o alto padrão.
          </h2>
        </Reveal>

        <div className="mt-14 columns-2 gap-4 lg:columns-4 [&>*]:mb-4">
          {IMAGES.map((img, i) => (
            <Reveal key={i} delay={(i % 4) * 0.05}>
              <button
                onClick={() => setActive(i)}
                className="group block w-full overflow-hidden"
                aria-label={`Ampliar imagem: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-6"
            role="dialog"
            aria-modal="true"
          >
            <button
              aria-label="Fechar"
              className="absolute right-6 top-6 text-white/70 hover:text-gold"
              onClick={() => setActive(null)}
            >
              <X className="size-7" />
            </button>
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              src={IMAGES[active]!.src}
              alt={IMAGES[active]!.alt}
              className="max-h-[85vh] max-w-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
