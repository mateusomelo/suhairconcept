import { motion } from "framer-motion";
import { ArrowUpRight, HeartHandshake, Layers, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";

import { Reveal, SectionLabel } from "@/components/site/Reveal";
import { SITE, WHATSAPP } from "@/lib/site-data";

const TECHNIQUES = [
  { n: "01", title: "Mega Hair Fita Adesiva", text: "Aplicação rápida, plana e confortável — ideal para volume imediato." },
  { n: "02", title: "Mega Hair Ponto Americano", text: "Costura discreta e resistente, com ótima durabilidade e movimento." },
  { n: "03", title: "Mega Hair Invisível", text: "Acabamento imperceptível, perfeito para cabelos finos." },
  { n: "04", title: "Mega Hair Queratina", text: "Fio a fio com queratina, naturalidade máxima e caimento leve." },
];

const REASONS = [
  {
    icon: Sparkles,
    title: "Fios 100% humanos e selecionados",
    text: "Cabelos naturais de altíssima qualidade, escolhidos fio a fio para garantir movimento, brilho e aparência real.",
  },
  {
    icon: ShieldCheck,
    title: "Aplicação segura e sem dor",
    text: "Técnica moderna, sem tração e sem agredir os fios — alongue sem comprometer a saúde do cabelo.",
  },
  {
    icon: Layers,
    title: "Resultado natural e duradouro",
    text: "Caimento natural, cheio de movimento e brilho, com fios saudáveis por muito mais tempo.",
  },
  {
    icon: HeartHandshake,
    title: "Mais de 10 anos de experiência",
    text: "Especialistas em alongamento e tratamento capilar que dominam as melhores técnicas do mercado.",
  },
  {
    icon: Stethoscope,
    title: "Diagnóstico gratuito",
    text: "Atendimento individual e humanizado, com avaliação completa antes de qualquer aplicação.",
  },
];

export function MegaHair() {
  return (
    <section id="megahair" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <SectionLabel>Mega Hair Premium</SectionLabel>
          <h2 className="mt-6 font-display text-3xl font-light leading-tight sm:text-5xl">
            O luxo que transforma o seu cabelo e a sua <span className="italic text-gold">confiança.</span>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Referência em Mega Hair Premium, com técnicas exclusivas, fios 100% naturais e resultados que
            surpreendem antes mesmo de você se olhar no espelho. Vagas limitadas por semana — cada atendimento é
            individual e feito por especialistas certificados.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {TECHNIQUES.map((t, i) => (
            <Reveal key={t.title} delay={(i % 4) * 0.06}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35 }}
                className="flex h-full flex-col bg-background p-8"
              >
                <span className="font-display text-3xl text-gold/60">{t.n}</span>
                <h3 className="mt-6 font-display text-xl leading-snug">{t.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{t.text}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 0.06}>
              <div className="h-full border border-border p-7 transition-colors hover:border-gold/60 hover:bg-offwhite">
                <r.icon className="size-5 text-gold" strokeWidth={1.3} />
                <h3 className="mt-5 font-display text-lg leading-snug">{r.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <a
            href={WHATSAPP.geral}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-shadow hover:shadow-[0_18px_40px_-18px_var(--gold)]"
          >
            Quero agendar uma avaliação
            <ArrowUpRight className="size-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
