import { motion } from "framer-motion";
import {
  Award,
  CalendarCheck,
  Gem,
  Heart,
  MapPin,
  Sparkles,
  Target,
  UserRoundCheck,
} from "lucide-react";

import { Reveal, SectionLabel } from "@/components/site/Reveal";

const ITEMS = [
  { icon: Sparkles, title: "Atendimento Exclusivo" },
  { icon: Target, title: "Precisão Técnica" },
  { icon: UserRoundCheck, title: "Profissionais Especializados" },
  { icon: Gem, title: "Produtos Premium" },
  { icon: Award, title: "Alta Avaliação" },
  { icon: Heart, title: "Ambiente Sofisticado" },
  { icon: CalendarCheck, title: "Agendamento Fácil" },
  { icon: MapPin, title: "Localização Privilegiada" },
];

export function Differentials() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-40 top-10 size-[420px] rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <SectionLabel>Diferenciais</SectionLabel>
          <h2 className="mt-6 font-display text-3xl font-light leading-tight text-white sm:text-5xl">
            O que torna a experiência SÜ única.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={(i % 4) * 0.07}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35 }}
                className="h-full rounded-sm border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-colors hover:border-gold/50"
              >
                <item.icon className="size-6 text-gold" strokeWidth={1.2} />
                <h3 className="mt-6 font-display text-lg leading-snug text-white">{item.title}</h3>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
