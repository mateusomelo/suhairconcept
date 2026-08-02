import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Brush,
  Crown,
  Droplets,
  Flower2,
  Palette,
  Scissors,
  Sparkles,
  Waves,
} from "lucide-react";

import { Reveal, SectionLabel } from "@/components/site/Reveal";
import { SITE } from "@/lib/site-data";

const SERVICES = [
  { icon: Scissors, title: "Corte Feminino", text: "Cortes desenhados para o seu rosto, textura e rotina." },
  { icon: Palette, title: "Coloração", text: "Cores precisas, uniformes e com brilho de salão." },
  { icon: Sparkles, title: "Morena Iluminada", text: "Luz natural no tom certo, preservando a raiz." },
  { icon: Waves, title: "Luzes", text: "Mechas milimétricas com transição suave e elegante." },
  { icon: Crown, title: "Mega Hair", text: "Volume e comprimento com aplicação imperceptível." },
  { icon: Droplets, title: "Tratamentos Capilares", text: "Protocolos de reconstrução e nutrição profunda." },
  { icon: Flower2, title: "Hidratação", text: "Maciez, movimento e saúde fio a fio." },
  { icon: Brush, title: "Penteados", text: "Noivas, madrinhas e eventos com acabamento impecável." },
];

export function Services() {
  return (
    <section id="servicos" className="bg-offwhite py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <SectionLabel>Serviços</SectionLabel>
          <h2 className="mt-6 font-display text-3xl font-light leading-tight sm:text-5xl">
            Um portfólio completo, executado com precisão.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 0.06}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35 }}
                className="group flex h-full flex-col justify-between bg-background p-8"
              >
                <div>
                  <s.icon className="size-6 text-gold" strokeWidth={1.2} />
                  <h3 className="mt-6 font-display text-xl">{s.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors group-hover:text-gold"
                >
                  Saiba mais
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
