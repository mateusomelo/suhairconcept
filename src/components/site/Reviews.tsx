import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { Reveal, SectionLabel } from "@/components/site/Reveal";

const REVIEWS = [
  { text: "Ambiente perfeito e diversos serviços no mesmo lugar.", name: "Camila R." },
  { text: "Equipe extremamente simpática e profissionais excelentes.", name: "Fernanda L." },
  { text: "Meu cabelo ficou lindo e saudável. Atendimento impecável.", name: "Juliana M." },
  { text: "O melhor Hair Studio de São Paulo.", name: "Patrícia S." },
];

function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-gold text-gold" />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section id="avaliacoes" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <Reveal className="max-w-2xl">
            <SectionLabel>Avaliações</SectionLabel>
            <h2 className="mt-6 font-display text-3xl font-light leading-tight sm:text-5xl">
              Quem vive a experiência, recomenda.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-5 border border-border px-8 py-6">
              <p className="font-display text-5xl leading-none">4,9</p>
              <div>
                <Stars />
                <p className="mt-2 text-xs text-muted-foreground">
                  Baseado em <strong className="font-semibold text-foreground">742 avaliações</strong>
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <motion.blockquote
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35 }}
                className="flex h-full flex-col justify-between border border-border bg-offwhite p-7 transition-colors hover:border-gold/60"
              >
                <div>
                  <Stars />
                  <p className="mt-5 font-display text-lg leading-snug">“{r.text}”</p>
                </div>
                <footer className="mt-8 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {r.name}
                </footer>
              </motion.blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
