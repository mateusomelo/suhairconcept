import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Clock3, Gem, Heart, Instagram, MessageCircle, ShieldCheck, Sparkles, Star } from "lucide-react";

import nailsDetail from "@/assets/nails-detail.jpg";
import nailsHero from "@/assets/nails-hero.jpg";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site-data";

const TITLE = "Alongamento de Unhas | Studio Über — SÜ Hair Concept";
const DESCRIPTION = "Alongamento de unhas com acabamento delicado e alta durabilidade no Studio Über, o espaço de unhas da SÜ Hair Concept, em Moema.";

const services = [
  ["Alongamento em fibra", "Leve, resistente e moldado para harmonizar perfeitamente com as suas mãos."],
  ["Banho de gel", "Proteção e estrutura para suas unhas naturais crescerem fortes e impecáveis."],
  ["Manutenção", "Cuidado técnico para preservar o formato, o brilho e a durabilidade do alongamento."],
];

export const Route = createFileRoute("/unhas")({
  component: NailsLanding,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://suhairconcept.lovable.app/unhas" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://suhairconcept.lovable.app/unhas" }],
  }),
});

function NailCta({ inverse = false }: { inverse?: boolean }) {
  return <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-xs font-bold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5 ${inverse ? "bg-background text-primary" : "bg-primary text-primary-foreground"}`}><MessageCircle className="size-4" />Quero agendar meu horário</a>;
}

function NailsLanding() {
  return (
    <div className="nail-page bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="/" className="text-lg font-bold uppercase tracking-[0.08em] text-foreground">Studio <span className="font-display text-3xl font-normal italic text-primary">Über</span></a>
          <nav className="hidden gap-7 text-xs font-semibold uppercase tracking-[0.1em] md:flex"><a href="#servicos">Serviços</a><a href="#beneficios">Benefícios</a><a href="#resultado">Resultados</a></nav>
          <div className="hidden md:block"><NailCta /></div>
        </div>
      </header>

      <main>
        <section className="relative min-h-[90svh] overflow-hidden bg-muted">
          <div className="mx-auto grid min-h-[90svh] max-w-7xl lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative z-10 flex items-center px-6 pb-16 pt-32 lg:px-10">
              <div className="max-w-xl"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary"><Sparkles className="size-4" /> Suas mãos, sua assinatura</p><h1 className="mt-5 text-balance-pretty font-display text-5xl font-normal leading-[1.02] sm:text-7xl">Unhas lindas, resistentes e feitas para você.</h1><p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">Alongamento com acabamento delicado, estrutura perfeita e um atendimento que valoriza cada detalhe do seu estilo.</p><div className="mt-9"><NailCta /></div><div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-foreground"><span className="flex items-center gap-2"><BadgeCheck className="size-4 text-primary" />Atendimento especializado</span><span className="flex items-center gap-2"><Clock3 className="size-4 text-primary" />Alta durabilidade</span></div></div>
            </div>
            <div className="relative min-h-[52svh] lg:min-h-full"><img src={nailsHero} alt="Alongamento de unhas amendoadas em tom nude" width={1280} height={1600} className="absolute inset-0 size-full object-cover" /><div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-muted to-transparent lg:hidden" /></div>
          </div>
        </section>

        <section id="servicos" className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Nossos serviços</p><h2 className="mt-4 font-display text-4xl sm:text-5xl">O cuidado certo para cada fase das suas unhas.</h2></Reveal>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {services.map(([title, text], i) => (
                <Reveal key={title} delay={(i % 3) * 0.06}>
                  <article className="h-full border border-border bg-background p-8">
                    <span className="flex size-11 items-center justify-center rounded-full bg-muted text-primary">{i === 0 ? <Gem className="size-5" /> : i === 1 ? <ShieldCheck className="size-5" /> : <Heart className="size-5" />}</span>
                    <h3 className="mt-7 font-display text-2xl">{title}</h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{text}</p>
                    <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">Agendar <ArrowRight className="size-4" /></a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="beneficios" className="bg-primary py-24 text-primary-foreground lg:py-32"><Reveal className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center lg:px-10"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/70">Por que alongar?</p><h2 className="mt-4 font-display text-4xl sm:text-5xl">Mais que beleza: praticidade e autoestima todos os dias.</h2><p className="mt-6 max-w-xl text-sm leading-7 text-primary-foreground/75">Um alongamento bem executado corrige o formato, protege as unhas e mantém suas mãos prontas para qualquer ocasião.</p><div className="mt-8"><NailCta inverse /></div></div><div className="grid gap-px bg-primary-foreground/20 sm:grid-cols-2">{["Formato personalizado", "Acabamento natural", "Materiais de qualidade", "Manutenção cuidadosa"].map((item, i) => <div key={item} className="bg-primary p-7"><span className="font-display text-3xl text-primary-foreground/40">0{i + 1}</span><p className="mt-6 font-display text-xl">{item}</p></div>)}</div></Reveal></section>

        <section id="resultado" className="py-24 lg:py-32"><Reveal className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10"><img src={nailsDetail} alt="Unhas alongadas com francesinha vermelha" width={1504} height={1008} loading="lazy" className="aspect-[3/2] size-full object-cover" /><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Seu estilo em cada detalhe</p><h2 className="mt-4 font-display text-4xl sm:text-5xl">Do clássico ao marcante, o resultado é sempre você.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">Escolha o comprimento, formato e esmaltação que combinam com sua rotina. Nossa técnica garante uma estrutura elegante, fina e confortável.</p><ul className="mt-7 space-y-4 text-sm">{["Almond, bailarina, quadrada ou stiletto", "Esmaltação clássica ou nail art", "Orientação completa de cuidados"].map((item) => <li key={item} className="flex items-center gap-3"><span className="size-2 rounded-full bg-primary" />{item}</li>)}</ul></div></Reveal></section>

        <section className="bg-muted py-24 text-center"><Reveal className="mx-auto max-w-3xl px-6"><div className="flex justify-center gap-1 text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-5 fill-current" />)}</div><blockquote className="mt-7 font-display text-3xl leading-snug">“Amei o cuidado e a delicadeza. Minhas unhas ficaram finas, naturais e exatamente no formato que eu queria.”</blockquote><p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Cliente Studio Über</p></Reveal></section>

        <section className="bg-rose-ink py-20 text-primary-foreground"><Reveal className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center lg:px-10"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/65">Reserve seu momento</p><h2 className="mt-3 font-display text-4xl sm:text-5xl">Suas unhas merecem esse cuidado.</h2></div><NailCta inverse /></Reveal></section>
      </main>

      <footer className="border-t border-border py-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-6 text-xs text-muted-foreground sm:flex-row sm:items-center lg:px-10"><p className="font-display text-xl text-foreground">Studio Über</p><p>Alongamento de unhas com técnica, beleza e cuidado — parte da SÜ Hair Concept.</p><a href={SITE.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-semibold text-primary"><Instagram className="size-4" />Instagram</a></div></footer>

      <FloatingWhatsApp href={SITE.whatsapp} />
    </div>
  );
}
