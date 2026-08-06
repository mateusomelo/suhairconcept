import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Gem,
  Heart,
  Instagram,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import logoSu from "@/assets/logo-su-marca.png";
import unAcri1 from "@/assets/un-acri1.jpg";
import unAcri2 from "@/assets/un-acri2.jpg";
import unBlind1 from "@/assets/un-blind1.jpg";
import unFibra1 from "@/assets/un-fibra1.jpg";
import unFibra2 from "@/assets/un-fibra2.jpg";
import unGel1 from "@/assets/un-gel1.jpg";
import unGel2 from "@/assets/un-gel2.jpg";
import unGel3 from "@/assets/un-gel3.jpg";
import unMani1 from "@/assets/un-mani1.jpg";
import unMani2 from "@/assets/un-mani2.jpg";
import unMani3 from "@/assets/un-mani3.jpg";
import unMani4 from "@/assets/un-mani4.jpg";
import nailsDetail from "@/assets/unhas-detalhe.jpg";
import nailsHero from "@/assets/unhas-hero.jpg";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Reveal } from "@/components/site/Reveal";
import { BASE_URL, SITE, WHATSAPP } from "@/lib/site-data";

const TITLE = "Alongamento de Unhas em Moema | SÜ Hair Concept";
const DESCRIPTION =
  "Alongamento de unhas em Moema com acabamento delicado, alta durabilidade e materiais esterilizados. Acrílico, fibra de vidro, gel e blindagem no SÜ Hair Concept.";

/**
 * Nomes em linguagem comum, como a cliente procura. Os nomes exclusivos
 * SÜ entram depois, quando a planilha de correspondência chegar — não
 * são inventados aqui.
 */
const services = [
  {
    nome: "Alongamento em fibra de vidro",
    texto: "Leve, resistente e moldado para harmonizar perfeitamente com as suas mãos.",
    icone: Gem,
  },
  {
    nome: "Blindagem e banho de gel",
    texto: "Proteção e estrutura para suas unhas naturais crescerem fortes e impecáveis.",
    icone: ShieldCheck,
  },
  {
    nome: "Manicure e manutenção",
    texto: "Cuidado técnico com as cutículas e acabamento impecável em cada detalhe.",
    icone: Heart,
  },
];

// Diferenciais listados nas diretrizes de otimização.
const DIFERENCIAIS = [
  "Profissionais especializadas",
  "Materiais esterilizados e uso de luvas",
  "Cuidado técnico com as cutículas",
  "Marcas reconhecidas",
  "Mãos e pés no mesmo atendimento",
  "Atendimento com uma ou duas profissionais",
  "Possibilidade de trabalhar durante o procedimento",
  "Durações diferentes conforme o serviço",
];

// Trabalhos reais do salão, agrupados pela técnica usada em cada um.
const GALERIA = [
  { src: unAcri1, tecnica: "Acrílico" },
  { src: unGel1, tecnica: "Gel" },
  { src: unMani1, tecnica: "Manicure" },
  { src: unFibra1, tecnica: "Fibra de vidro" },
  { src: unBlind1, tecnica: "Blindagem" },
  { src: unMani2, tecnica: "Manicure" },
  { src: unGel2, tecnica: "Gel" },
  { src: unAcri2, tecnica: "Acrílico" },
  { src: unMani3, tecnica: "Manicure" },
  { src: unFibra2, tecnica: "Fibra de vidro" },
  { src: unGel3, tecnica: "Gel" },
  { src: unMani4, tecnica: "Manicure" },
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
      { property: "og:url", content: `${BASE_URL}/unhas` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/unhas` }],
  }),
});

function NailCta({ inverse = false }: { inverse?: boolean }) {
  return (
    <a
      href={WHATSAPP.unhas}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-xs font-semibold uppercase tracking-[0.16em] transition-transform hover:-translate-y-0.5 ${inverse ? "bg-background text-ink" : "bg-gold text-ink"}`}
    >
      <MessageCircle className="size-4" />
      Quero agendar meu horário
    </a>
  );
}

function NailsLanding() {
  return (
    <div className="bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="/" aria-label="SÜ Hair Concept — início" className="flex items-center">
            <img
              src={logoSu}
              alt="SÜ Hair Concept"
              width={112}
              height={112}
              className="h-9 w-auto object-contain"
            />
          </a>
          <nav className="hidden gap-7 text-xs font-semibold uppercase tracking-[0.1em] md:flex">
            <a href="#servicos" className="hover:text-gold">
              Serviços
            </a>
            <a href="#beneficios" className="hover:text-gold">
              Diferenciais
            </a>
            <a href="#galeria" className="hover:text-gold">
              Trabalhos
            </a>
          </nav>
          <div className="hidden md:block">
            <NailCta />
          </div>
        </div>
      </header>

      <main>
        <section className="relative min-h-[90svh] overflow-hidden bg-offwhite">
          <div className="mx-auto grid min-h-[90svh] max-w-7xl lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative z-10 flex items-center px-6 pb-16 pt-32 lg:px-10">
              <div className="max-w-xl">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  <Sparkles className="size-4" /> Suas mãos, sua assinatura
                </p>
                <h1 className="mt-5 text-balance-pretty font-display text-5xl font-light leading-[1.02] sm:text-7xl">
                  Alongamento de unhas em Moema.
                </h1>
                <p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                  Acabamento delicado, estrutura perfeita e um atendimento que valoriza cada detalhe
                  do seu estilo.
                </p>
                <div className="mt-9">
                  <NailCta />
                </div>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <BadgeCheck className="size-4 text-gold" />
                    Profissionais especializadas
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock3 className="size-4 text-gold" />
                    Alta durabilidade
                  </span>
                </div>
              </div>
            </div>
            <div className="relative min-h-[52svh] lg:min-h-full">
              <img
                src={nailsHero}
                alt="Alongamento de unhas amendoadas em tom nude"
                width={1280}
                height={1600}
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-offwhite to-transparent lg:hidden" />
            </div>
          </div>
        </section>

        <section id="servicos" className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Nossos serviços
              </p>
              <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
                O cuidado certo para cada fase das suas unhas.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {services.map((s, i) => (
                <Reveal key={s.nome} delay={(i % 3) * 0.06}>
                  <article className="h-full border border-border bg-offwhite p-8">
                    <span className="flex size-11 items-center justify-center rounded-full bg-background text-gold">
                      <s.icone className="size-5" />
                    </span>
                    <h3 className="mt-7 font-display text-2xl leading-snug">{s.nome}</h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{s.texto}</p>
                    <a
                      href={WHATSAPP.unhas}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-gold"
                    >
                      Agendar <ArrowRight className="size-4" />
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <p className="mt-10 text-center text-sm text-muted-foreground">
                Também realizamos acrílico, nail art e manutenção.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="beneficios" className="bg-ink py-24 text-background lg:py-32">
          <Reveal className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center lg:px-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Por que aqui
              </p>
              <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
                Mais que beleza: segurança e cuidado em cada detalhe.
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-background/75">
                Um alongamento bem executado corrige o formato, protege as unhas e mantém suas mãos
                prontas para qualquer ocasião.
              </p>
              <div className="mt-8">
                <NailCta inverse />
              </div>
            </div>
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {DIFERENCIAIS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-background/85">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section id="galeria" className="bg-offwhite py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Nossos trabalhos
              </p>
              <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
                Unhas perfeitas, toque de elegância.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                Cada técnica tem seu acabamento. Veja resultados reais de clientes.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {GALERIA.map((item, i) => (
                <Reveal key={item.src} delay={(i % 4) * 0.06}>
                  <figure className="group relative overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.tecnica}
                      loading="lazy"
                      className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                      {item.tecnica}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="resultado" className="py-24 lg:py-32">
          <Reveal className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10">
            <img
              src={nailsDetail}
              alt="Unhas alongadas com acabamento natural"
              width={1504}
              height={1008}
              loading="lazy"
              className="aspect-[3/2] size-full object-cover"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Seu estilo em cada detalhe
              </p>
              <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
                Do clássico ao marcante, o resultado é sempre você.
              </h2>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">
                Escolha o comprimento, formato e esmaltação que combinam com sua rotina. Nossa
                técnica garante uma estrutura elegante, fina e confortável.
              </p>
              <ul className="mt-7 space-y-4 text-sm">
                {[
                  "Almond, bailarina, quadrada ou stiletto",
                  "Esmaltação clássica ou nail art",
                  "Orientação completa de cuidados",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        <section className="bg-offwhite py-24 text-center">
          <Reveal className="mx-auto max-w-3xl px-6">
            <div className="flex justify-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-current" />
              ))}
            </div>
            <blockquote className="mt-7 font-display text-3xl font-light leading-snug">
              “Amei o cuidado e a delicadeza. Minhas unhas ficaram finas, naturais e exatamente no
              formato que eu queria.”
            </blockquote>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Cliente SÜ Hair Concept
            </p>
          </Reveal>
        </section>

        <section className="bg-gold py-20 text-ink">
          <Reveal className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center lg:px-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                Reserve seu momento
              </p>
              <h2 className="mt-3 font-display text-4xl font-light sm:text-5xl">
                Suas unhas merecem esse cuidado.
              </h2>
            </div>
            <NailCta inverse />
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-6 text-xs text-muted-foreground sm:flex-row sm:items-center lg:px-10">
          <p className="font-display text-xl tracking-[0.15em] text-foreground">SÜ HAIR CONCEPT</p>
          <p>Alongamento de unhas em Moema, com técnica, beleza e cuidado.</p>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-semibold text-gold"
          >
            <Instagram className="size-4" />
            Instagram
          </a>
        </div>
      </footer>

      <FloatingWhatsApp href={WHATSAPP.unhas} />
    </div>
  );
}
