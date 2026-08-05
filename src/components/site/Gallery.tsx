import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";

import g1 from "@/assets/gal-1.jpg";
import g2 from "@/assets/gal-2.jpg";
import g3 from "@/assets/gal-3.jpg";
import g4 from "@/assets/gal-4.jpg";
import g5 from "@/assets/gal-5.jpg";
import g6 from "@/assets/gal-6.jpg";
import g7 from "@/assets/gal-7.jpg";
import g8 from "@/assets/gal-8.jpg";
import srvBrow from "@/assets/srv-brow.jpg";
import srvCachos from "@/assets/srv-cachos.jpg";
import srvCilios from "@/assets/srv-cilios.jpg";
import srvMake from "@/assets/srv-make.jpg";
import srvMorena from "@/assets/srv-morena.jpg";
import srvUnhas from "@/assets/srv-unhas.jpg";
import srvUnhas2 from "@/assets/srv-unhas2.jpg";
import srvVermelho from "@/assets/srv-vermelho.jpg";
import { Reveal, SectionLabel } from "@/components/site/Reveal";

// Alternando serviços para que cada página do carrossel mostre
// variedade, e não quatro fotos do mesmo tipo em sequência.
const IMAGES = [
  { src: g1, alt: "Morena iluminada com brilho natural", tag: "Morena iluminada" },
  { src: srvUnhas, alt: "Manicure em tom nude", tag: "Unhas" },
  { src: g2, alt: "Ruivo acobreado com ondas longas", tag: "Coloração" },
  { src: srvCilios, alt: "Alongamento de cílios fio a fio", tag: "Cílios" },

  { src: g3, alt: "Loiro iluminado com acabamento natural", tag: "Loiro" },
  { src: srvBrow, alt: "Design de sobrancelha", tag: "Sobrancelha" },
  { src: g4, alt: "Ruivo com ondas volumosas", tag: "Coloração" },
  { src: srvMake, alt: "Maquiagem com acabamento natural", tag: "Maquiagem" },

  { src: g7, alt: "Morena iluminada com ondas longas", tag: "Morena iluminada" },
  { src: srvUnhas2, alt: "Alongamento de unhas em gel", tag: "Unhas" },
  { src: g5, alt: "Loiro com mechas iluminadas", tag: "Loiro" },
  { src: srvCachos, alt: "Cachos definidos com iluminação", tag: "Cachos" },

  { src: g8, alt: "Loiro premium com caimento leve", tag: "Loiro" },
  { src: srvVermelho, alt: "Vermelho intenso com fio alinhado", tag: "Coloração" },
  { src: g6, alt: "Ruivo com brilho e movimento", tag: "Coloração" },
  { src: srvMorena, alt: "Morena iluminada com ondas suaves", tag: "Morena iluminada" },
];

const POR_PAGINA = 4;
const INTERVALO = 4000;

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const [pagina, setPagina] = useState(0);
  const [pausado, setPausado] = useState(false);

  const totalPaginas = Math.ceil(IMAGES.length / POR_PAGINA);

  // Pausa enquanto o visitante interage: passar o mouse ou abrir a foto.
  useEffect(() => {
    if (pausado || active !== null) return;
    const t = setInterval(() => setPagina((p) => (p + 1) % totalPaginas), INTERVALO);
    return () => clearInterval(t);
  }, [pausado, active, totalPaginas]);

  const girar = (dir: number) => setPagina((p) => (p + dir + totalPaginas) % totalPaginas);
  const visiveis = IMAGES.slice(pagina * POR_PAGINA, pagina * POR_PAGINA + POR_PAGINA);

  return (
    <section className="bg-offwhite py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <SectionLabel>Galeria</SectionLabel>
            <h2 className="mt-6 font-display text-3xl font-light leading-tight sm:text-5xl">
              Detalhes que definem o alto padrão.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => girar(-1)}
                aria-label="Fotos anteriores"
                className="flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:border-gold hover:text-gold"
              >
                <ArrowLeft className="size-4" />
              </button>
              <span className="text-xs tabular-nums text-muted-foreground">
                {pagina + 1} / {totalPaginas}
              </span>
              <button
                onClick={() => girar(1)}
                aria-label="Próximas fotos"
                className="flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:border-gold hover:text-gold"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </Reveal>
        </div>

        <div
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
          className="mt-14"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pagina}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4 lg:grid-cols-4"
            >
              {visiveis.map((img) => {
                const index = IMAGES.indexOf(img);
                return (
                  <button
                    key={img.alt}
                    onClick={() => setActive(index)}
                    className="group relative block w-full overflow-hidden"
                    aria-label={`Ampliar imagem: ${img.alt}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                      {img.tag}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPagina(i)}
              aria-label={`Ir para o grupo ${i + 1}`}
              className={`h-1 rounded-full transition-all ${
                i === pagina ? "w-8 bg-gold" : "w-4 bg-border hover:bg-gold/50"
              }`}
            />
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
