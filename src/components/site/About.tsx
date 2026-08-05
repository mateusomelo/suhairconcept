import { motion } from "framer-motion";

import aboutImage from "@/assets/sobre-salao.jpg";
import { Reveal, SectionLabel } from "@/components/site/Reveal";

const PILLARS = [
  { title: "Atendimento personalizado", text: "Consultoria individual antes de cada procedimento." },
  { title: "Técnicas modernas", text: "Métodos atualizados e resultados naturais." },
  { title: "Profissionais especializados", text: "Equipe formada e em constante aperfeiçoamento." },
  { title: "Ambiente sofisticado", text: "Um espaço pensado para o seu conforto." },
];

export function About() {
  return (
    <section id="sobre" className="bg-background py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <Reveal>
          <div className="relative">
            <motion.img
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.7 }}
              src={aboutImage}
              alt="Profissional finalizando o cabelo de uma cliente no SÜ Hair Concept"
              width={1200}
              height={1504}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute -bottom-6 -right-4 hidden bg-gold px-8 py-6 text-black sm:block">
              <p className="font-display text-3xl leading-none">+10</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.25em]">anos de experiência</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel>Sobre nós</SectionLabel>
            <h2 className="mt-6 font-display text-3xl font-light leading-tight sm:text-5xl">
              SÜ Hair Concept
              <span className="block text-muted-foreground">Beauty Experience</span>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Mais do que um salão, um conceito. Cada atendimento no SÜ Hair Concept nasce de uma leitura
              atenta do seu cabelo, do seu estilo e da sua rotina — para entregar um resultado autêntico,
              saudável e duradouro.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Em Indianópolis, a poucos minutos de Moema, unimos técnica de alta precisão, produtos premium
              e um ambiente sofisticado para transformar beleza em experiência.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="h-full bg-background p-6 transition-colors hover:bg-offwhite">
                  <h3 className="font-display text-base">{p.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
