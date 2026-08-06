import { motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { SITE, WHATSAPP } from "@/lib/site-data";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-[400px] rounded-full bg-gold/10 blur-3xl" />
      <Reveal className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl font-light leading-tight text-white sm:text-5xl">
          Sua melhor versão <span className="italic text-gold">começa aqui.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
          Agende sua experiência e descubra um novo padrão de beleza.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <motion.a
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            href={WHATSAPP.geral}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-black"
          >
            <Sparkles className="size-4" /> Agendar Agora
          </motion.a>
          <motion.a
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            href={WHATSAPP.geral}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-gold hover:text-gold"
          >
            <MessageCircle className="size-4" /> Falar no WhatsApp
          </motion.a>
        </div>
      </Reveal>
    </section>
  );
}
