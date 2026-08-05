import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Instagram,
  MapPin,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import logoSu from "@/assets/logo-su-marca.png";
import mg1 from "@/assets/mg-1.jpg";
import mg2 from "@/assets/mg-2.jpg";
import mg3 from "@/assets/mg-3.jpg";
import mg4 from "@/assets/mg-4.jpg";
import mg5 from "@/assets/mg-5.jpg";
import mg6 from "@/assets/mg-6.jpg";
import megaHero from "@/assets/mega-topo.jpg";
import megaResult from "@/assets/mega-resultado.jpg";
import testimonialPoster from "@/assets/megahair-depoimento-poster.jpg";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site-data";

const TITLE = "Mega Hair Premium em São Paulo | SÜ Hair Concept";
const DESCRIPTION =
  "Mega Hair premium com fios 100% humanos, aplicação segura e resultado natural no SÜ Hair Concept, em Moema.";

const techniques = [
  [
    "Fita adesiva",
    "Aplicação leve, plana e confortável para conquistar volume e comprimento com rapidez.",
  ],
  [
    "Ponto americano",
    "Técnica resistente, discreta e com movimento natural para uma transformação marcante.",
  ],
  [
    "Mega hair invisível",
    "Acabamento imperceptível, especialmente indicado para cabelos finos e delicados.",
  ],
  [
    "Queratina",
    "Aplicação fio a fio com caimento leve, liberdade de movimento e naturalidade máxima.",
  ],
];

const benefits = [
  "Fios 100% humanos e selecionados",
  "Aplicação segura e sem dor",
  "Resultado natural e duradouro",
  "Mais de 10 anos de experiência",
  "Diagnóstico gratuito e personalizado",
];

// Antes e depois reais de clientes — cada arquivo já traz os dois lados.
const TRANSFORMACOES = [mg1, mg2, mg3, mg4, mg5, mg6];

const missionValues = [
  {
    title: "Missão",
    text: "Somos pessoas cuidando de pessoas, criando experiências cuidadosamente pensadas que transformam sonhos em realidade.",
  },
  {
    title: "Visão",
    text: "Ser referência em experiências de beleza e cuidado, reconhecidos pela excelência e sofisticação.",
  },
  {
    title: "Valores",
    text: "Elevar a autoestima por meio de experiências cuidadosamente criadas, em um ambiente sofisticado e acolhedor.",
  },
];

export const Route = createFileRoute("/megahair")({
  component: MegaHairLanding,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://suhairconcept.lovable.app/megahair" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://suhairconcept.lovable.app/megahair" }],
  }),
});

function Cta({
  label = "Agendar avaliação gratuita",
  light = false,
}: {
  label?: string;
  light?: boolean;
}) {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-xs font-semibold uppercase tracking-[0.16em] transition-transform hover:-translate-y-0.5 ${light ? "bg-background text-ink" : "bg-gold text-ink"}`}
    >
      <MessageCircle className="size-4" /> {label}
    </a>
  );
}

function VideoTestimonial() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-2xl bg-ink shadow-2xl">
      {playing ? (
        <video
          src="/videos/megahair-depoimento.mp4"
          controls
          autoPlay
          playsInline
          className="size-full object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Assistir depoimento em vídeo"
          className="group relative block size-full"
        >
          <img
            src={testimonialPoster}
            alt="Depoimento em vídeo sobre o resultado do mega hair"
            className="size-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-ink/25 transition-colors group-hover:bg-ink/40">
            <span className="flex size-16 items-center justify-center rounded-full bg-background/95 text-ink shadow-lg transition-transform group-hover:scale-110">
              <Play className="size-6 translate-x-0.5 fill-current" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

function MegaHairLanding() {
  return (
    <div className="bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-background/20">
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
          <a
            href="#tecnicas"
            className="hidden text-xs uppercase tracking-[0.14em] text-background/80 sm:block"
          >
            Conheça as técnicas
          </a>
          <div className="hidden md:block">
            <Cta label="Falar com especialista" />
          </div>
        </div>
      </header>

      <main>
        <section className="relative min-h-[92svh] overflow-hidden bg-ink">
          <img
            src={megaHero}
            alt="Resultado de mega hair longo, natural e brilhante"
            width={1280}
            height={1600}
            className="absolute inset-0 size-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/10" />
          <div className="relative mx-auto flex min-h-[92svh] max-w-7xl items-center px-6 pb-16 pt-32 lg:px-10">
            <div className="max-w-2xl text-background">
              <p className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-gold">
                <Sparkles className="size-4" /> Especialistas em Mega Hair
              </p>
              <h1 className="text-balance-pretty font-display text-5xl font-light leading-[1.04] sm:text-7xl">
                O cabelo que você sonha, com a naturalidade que você merece.
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-7 text-background/75 sm:text-base">
                Técnicas exclusivas, fios 100% humanos e um atendimento individual para transformar
                comprimento, volume e confiança.
              </p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Cta />
                <span className="flex items-center gap-2 text-xs text-background/70">
                  <ShieldCheck className="size-4 text-gold" /> Avaliação sem compromisso
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-offwhite py-8">
          <Reveal className="mx-auto grid max-w-7xl gap-5 px-6 sm:grid-cols-3 lg:px-10">
            {[
              "+10 anos de experiência",
              "Fios humanos selecionados",
              "Atendimento personalizado",
            ].map((item) => (
              <p
                key={item}
                className="flex items-center justify-center gap-2 text-center text-xs font-semibold uppercase tracking-[0.12em]"
              >
                <Check className="size-4 text-gold" />
                {item}
              </p>
            ))}
          </Reveal>
        </section>

        <section id="tecnicas" className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gold">
                  Escolha personalizada
                </p>
                <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
                  Uma técnica para cada cabelo.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                Antes de cada aplicação, avaliamos espessura, densidade, rotina e objetivo. Assim, o
                resultado respeita a saúde dos seus fios e parece parte de você.
              </p>
            </Reveal>
            <div className="mt-14 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
              {techniques.map(([title, text], index) => (
                <Reveal key={title} delay={(index % 4) * 0.06}>
                  <article className="min-h-64 border-b border-r border-border p-7 transition-colors hover:bg-offwhite">
                    <span className="font-display text-3xl text-gold/70">0{index + 1}</span>
                    <h3 className="mt-7 font-display text-2xl">{title}</h3>
                    <p className="mt-4 text-xs leading-6 text-muted-foreground">{text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink py-24 lg:py-32">
          <Reveal className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="text-background">
                <p className="text-xs uppercase tracking-[0.2em] text-gold">Depoimento real</p>
                <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
                  Veja e ouça o resultado, direto de quem viveu.
                </h2>
                <p className="mt-6 max-w-md text-sm leading-7 text-background/75">
                  Um relato real de transformação, gravado no dia da aplicação.
                </p>
                <div className="mt-9">
                  <Cta light />
                </div>
              </div>
              <VideoTestimonial />
            </div>
          </Reveal>
        </section>

        <section id="transformacoes" className="bg-offwhite py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Antes e depois</p>
              <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
                Transformações reais de clientes.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                Comprimento, volume e cor — resultados de quem sentou na nossa cadeira.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {TRANSFORMACOES.map((src, i) => (
                <Reveal key={src} delay={(i % 3) * 0.06}>
                  <figure className="overflow-hidden border border-border bg-background">
                    <img
                      src={src}
                      alt="Antes e depois de mega hair"
                      loading="lazy"
                      className="w-full object-contain"
                    />
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background py-24 lg:py-32">
          <Reveal className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Nossa essência</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-light sm:text-5xl">
              Missão, visão e valores que guiam cada atendimento.
            </h2>
            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {missionValues.map((item) => (
                <div key={item.title} className="border border-border bg-background p-8">
                  <h3 className="font-display text-2xl text-gold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="bg-ink py-24 text-background lg:py-32">
          <Reveal className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center lg:px-10">
            <img
              src={megaResult}
              alt="Cabelo longo com mega hair de acabamento natural"
              width={1200}
              height={1504}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Por que escolher o SÜ</p>
              <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
                Beleza sem abrir mão da saúde dos fios.
              </h2>
              <div className="mt-9 divide-y divide-background/15">
                {benefits.map((item) => (
                  <div key={item} className="flex items-center gap-4 py-5">
                    <span className="flex size-8 items-center justify-center rounded-full border border-gold text-gold">
                      <Check className="size-4" />
                    </span>
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-9">
                <Cta />
              </div>
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
              “Um atendimento cuidadoso do início ao fim e um resultado tão natural que ninguém
              percebe onde começa o alongamento.”
            </blockquote>
            <p className="mt-5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Experiência SÜ Hair Concept
            </p>
          </Reveal>
        </section>

        <section className="bg-gold py-20 text-ink">
          <Reveal className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center lg:px-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                Seu novo cabelo começa aqui
              </p>
              <h2 className="mt-3 font-display text-4xl font-light sm:text-5xl">
                Agende seu diagnóstico gratuito.
              </h2>
            </div>
            <Cta label="Quero transformar meu cabelo" light />
          </Reveal>
        </section>
      </main>

      <footer className="bg-ink py-12 text-background/65">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-6 text-xs md:flex-row md:items-center lg:px-10">
          <p className="font-display text-xl tracking-[0.15em] text-background">SÜ HAIR CONCEPT</p>
          <div className="flex flex-wrap gap-5">
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-gold"
            >
              <MapPin className="size-4" />
              Moema, São Paulo
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-gold"
            >
              <Instagram className="size-4" />
              Instagram
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-gold"
            >
              <ArrowRight className="size-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </footer>

      <FloatingWhatsApp href={SITE.whatsapp} />
    </div>
  );
}
