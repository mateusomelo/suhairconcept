import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";

import heroPoster from "@/assets/hero-video-poster.jpg";
import { SITE, WHATSAPP } from "@/lib/site-data";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 160]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="inicio"
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-black"
    >
      {/* Vídeo da fachada em loop, mudo e sem controles — é cenário, não
          conteúdo. O poster cobre o intervalo até o vídeo carregar e serve
          de fallback onde o autoplay é bloqueado (iOS em economia de
          bateria, por exemplo). */}
      <motion.video
        style={{ y }}
        src="/videos/fachada.mp4"
        poster={heroPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 size-full scale-110 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85" />

      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.45em] text-gold sm:text-xs"
        >
          <span className="h-px w-10 bg-gold" />
          Beauty Experience
          <span className="h-px w-10 bg-gold" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl font-light leading-[1.1] text-white sm:text-6xl lg:text-7xl"
        >
          Elevando o padrão da
          <br className="hidden sm:block" /> beleza com{" "}
          <span className="italic text-gold">intenção.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-7 max-w-2xl text-sm font-light leading-relaxed text-white/75 sm:text-base"
        >
          Exclusividade, precisão e atendimento personalizado para transformar sua experiência em
          beleza.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <motion.a
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            href={WHATSAPP.geral}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-black shadow-[0_18px_40px_-18px_var(--gold)]"
          >
            <Sparkles className="size-4" /> Agendar Agora
          </motion.a>
          <motion.a
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            href={SITE.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
          >
            <MapPin className="size-4" /> Como Chegar
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <span className="mb-3 block text-[9px] uppercase tracking-[0.4em] text-white/50">
          Explore
        </span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mx-auto block h-10 w-px bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
