import { Compass, Eye, Gem } from "lucide-react";

import { Reveal, SectionLabel } from "@/components/site/Reveal";

const ITEMS = [
  {
    icon: Compass,
    label: "Missão",
    text: "Somos pessoas cuidando de pessoas, criando experiências cuidadosamente pensadas que transformam sonhos em realidade e elevam a autoestima, em um ambiente sofisticado, acolhedor e que inspira pertencimento.",
  },
  {
    icon: Eye,
    label: "Visão",
    text: "Ser referência em experiências de beleza e cuidado, reconhecidos pela excelência, sofisticação e por colocar pessoas no centro de tudo o que fazemos.",
  },
  {
    icon: Gem,
    label: "Valores",
    text: "Elevar a autoestima por meio de experiências cuidadosamente criadas, em um ambiente sofisticado, acolhedor e que inspira pertencimento.",
  },
];

export function Philosophy() {
  return (
    <section id="filosofia" className="bg-offwhite py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <SectionLabel>Nossa Essência</SectionLabel>
          <h2 className="mt-6 font-display text-3xl font-light leading-tight sm:text-5xl">
            Missão, visão e valores.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px bg-border lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="h-full bg-background p-9">
                <item.icon className="size-6 text-gold" strokeWidth={1.2} />
                <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-gold">{item.label}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
