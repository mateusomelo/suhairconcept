import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Instagram,
  MapPin,
  MessageCircle,
  Play,
  RefreshCw,
  ShieldCheck,
  Sparkles,
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
import { LocationHours } from "@/components/site/LocationHours";
import { Reviews, type Depoimento } from "@/components/site/Reviews";
import { SalonStructure } from "@/components/site/SalonStructure";
import { BASE_URL, MEGA_HAIR_SERVICOS, SITE, WHATSAPP } from "@/lib/site-data";

// "Moema" e não "São Paulo": mantém coerência com a URL
// /mega-hair-moema e com o H1, que é o que o Google cruza.
const TITLE = "Mega Hair em Moema | SÜ Hair Concept";
const DESCRIPTION =
  "Mega Hair premium com fios 100% humanos, aplicação segura e resultado natural no SÜ Hair Concept, em Moema.";

const benefits = [
  "Fios 100% humanos e selecionados",
  // Sem "segura" e "sem dor": promessa de resultado que o salão não
  // controla em toda cliente.
  "Aplicação confortável e tecnicamente cuidadosa",
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

/**
 * Manutenção.
 *
 * Sem prazos ou preços: a consultoria não passou esses números e
 * inventá-los viraria promessa falsa. O prazo real é definido na
 * avaliação, que é o que o texto diz.
 */
const MANUTENCAO = [
  {
    title: "Para quem aplicou aqui",
    text: "Acompanhamos o crescimento do seu cabelo e reposicionamos os fios na hora certa, preservando a saúde do fio natural.",
  },
  {
    title: "Para quem aplicou em outro lugar",
    text: "Você não precisa ter feito a aplicação conosco. Avaliamos o que já está no seu cabelo e assumimos a manutenção a partir dali.",
  },
  {
    title: "Pacotes de manutenção",
    text: "Em vez de pagar avulso a cada retorno, você fecha um pacote e mantém o resultado sempre em dia.",
  },
];

/**
 * Avaliações do Google que falam especificamente de mega hair,
 * transcritas palavra por palavra dos links enviados pelo salão.
 *
 * Duas das oito enviadas ficaram de fora porque o texto da própria
 * cliente cita "Studio Uber", a marca que saiu do site — e reescrever
 * a fala de alguém para trocar o nome seria falsificar o depoimento.
 * São elas: Rosana Nogueira dos Santos e Palloma Barbosa.
 */
const AVALIACOES_MEGA_HAIR: Depoimento[] = [
  {
    id: "mh1",
    nota: 5,
    nome: "Mariana Savio Trilho",
    quando: "um mês atrás",
    texto:
      "Coloquei mega hair, fiz gloss e hidratação com o Marcio, profissional excelente, estou muito satisfeita.",
    doGoogle: true,
  },
  {
    id: "mh2",
    nota: 5,
    nome: "Jessica Cavalcante",
    quando: "4 meses atrás",
    texto:
      "Simplesmente impecável! ✨ Preciso deixar registrado o quanto estou encantada com o trabalho do Márcio Nunes e da Érica. Não são apenas profissionais, eles realmente entendem de cabelo e, principalmente, de cuidado com a cliente. Cheguei com o cabelo extremamente fragilizado após um corte químico, insegura… e encontrei acolhimento, atenção e um direcionamento real para recuperação. O megahair é perfeito, super natural e leve. Hoje posso dizer que recuperei não só meu cabelo, mas também minha autoestima.",
    doGoogle: true,
  },
  {
    id: "mh3",
    nota: 5,
    nome: "Shana Agostini",
    quando: "5 meses atrás",
    texto:
      "O Márcio e sua assistente Erica são os melhores que existem!!! Só faço meu mega hair com eles, ARRASAM, os melhores de SP!",
    doGoogle: true,
  },
  {
    id: "mh4",
    nota: 5,
    nome: "Eurita Cardoso",
    quando: "um ano atrás",
    texto:
      "Primeira vez no salão e já saí de lá apaixonada. Fiz meu mega hair com o profissional Márcio Nunes. Um excelente profissional, amei seu trabalho. Retornarei em breve.",
    doGoogle: true,
  },
  {
    id: "mh5",
    nota: 5,
    nome: "Ilse Andriotti",
    quando: "4 anos atrás",
    texto:
      "Atendimento e serviços maravilhosos! O Marcio é o melhor para colocação de megahair 😍😍😍",
    doGoogle: true,
  },
  {
    id: "mh6",
    nota: 5,
    nome: "Karla Bustamante",
    quando: "4 anos atrás",
    texto:
      "Muito bom serviço.. eu fui fazer um mega hair e umas luzes.. eles cuidaram muito bem dos meus cabelos !!!!!",
    doGoogle: true,
  },
];

export const Route = createFileRoute("/mega-hair-moema")({
  component: MegaHairLanding,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE_URL}/mega-hair-moema` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/mega-hair-moema` }],
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
      href={WHATSAPP.megahair}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-xs font-semibold uppercase tracking-[0.16em] transition-transform hover:-translate-y-0.5 ${light ? "bg-background text-ink" : "bg-gold text-ink"}`}
    >
      <MessageCircle className="size-4" /> {label}
    </a>
  );
}

/** ID do Short no canal @Suhairconcept: youtube.com/shorts/L_6_huNm6qg */
const DEPOIMENTO_YT = "L_6_huNm6qg";

function VideoTestimonial() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-2xl bg-ink shadow-2xl">
      {playing ? (
        // O iframe só é criado depois do clique: sem isso o YouTube
        // baixaria o próprio player em toda visita à página.
        // nocookie evita rastreamento de quem nem assistiu.
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${DEPOIMENTO_YT}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
          title="Depoimento de cliente sobre o mega hair no SÜ Hair Concept"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="size-full border-0"
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
            alt="Cliente do SÜ Hair Concept falando sobre o resultado do mega hair"
            width={720}
            height={1280}
            loading="lazy"
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
              {/* O H1 diz o serviço e o bairro, que é o que o Google
                  cruza com a URL e o título. A frase comercial continua
                  em destaque logo abaixo, como subtítulo. */}
              <h1 className="text-balance-pretty font-display text-5xl font-light leading-[1.04] sm:text-7xl">
                Mega Hair em <span className="italic text-gold">Moema</span>
              </h1>
              <p className="mt-5 text-balance-pretty font-display text-2xl font-light leading-snug text-background/90 sm:text-3xl">
                O cabelo que você sonha, com a naturalidade que você merece.
              </p>
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
            {/* Dois por linha já no celular, como na home: empilhado
                um a um a lista ficava longa demais para rolar. */}
            <div className="mt-14 grid grid-cols-2 border-l border-t border-border lg:grid-cols-4">
              {MEGA_HAIR_SERVICOS.map((s, index) => (
                <Reveal key={s.nome} delay={(index % 4) * 0.06}>
                  <article className="flex min-h-56 flex-col border-b border-r border-border p-4 transition-colors hover:bg-offwhite sm:min-h-64 sm:p-7">
                    <span className="font-display text-2xl text-gold/70 sm:text-3xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {/* Nome de busca em destaque, assinatura SÜ abaixo —
                        o nome exclusivo nunca aparece sozinho. */}
                    <h3 className="mt-5 font-display text-base leading-snug sm:mt-7 sm:text-xl">
                      {s.nome}
                    </h3>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
                      {s.su}
                    </p>
                    <a
                      href={s.cta}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto pt-5 text-[10px] font-semibold uppercase tracking-[0.04em] text-foreground underline underline-offset-4 hover:text-gold sm:pt-6 sm:text-[11px] sm:tracking-[0.12em]"
                    >
                      Quero avaliação
                    </a>
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

        <section id="manutencao" className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal className="max-w-2xl">
              <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gold">
                <RefreshCw className="size-4" /> Manutenção
              </p>
              <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
                Mega hair não acaba na aplicação.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                O cabelo cresce e os fios precisam voltar ao lugar. Cuidamos dessa etapa com a mesma
                atenção da primeira aplicação — inclusive de quem aplicou fora daqui.
              </p>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
              {MANUTENCAO.map((item, i) => (
                <Reveal key={item.title} delay={(i % 3) * 0.06}>
                  <article className="flex h-full flex-col border border-border bg-offwhite p-6 sm:p-8">
                    <h3 className="font-display text-xl leading-snug">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2} className="mt-10">
              <Cta label="Consultar manutenção" />
            </Reveal>
          </div>
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

        {/* Só avaliações que falam de mega hair: numa landing page de um
            serviço, elogio a outro serviço não convence. Todas 5 estrelas. */}
        <Reviews lista={AVALIACOES_MEGA_HAIR} titulo="Quem fez mega hair aqui, recomenda." />

        <SalonStructure chamada="Aplicação de mega hair pede tempo. Aqui você passa esse tempo bem." />

        {/* Mesmo bloco de localização e horários do site principal, com
            mapa — em vez de uma versão própria só desta página. */}
        <LocationHours />

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

        {/* Institucional fica depois do CTA de propósito: é conteúdo de
            marca, não de conversão, e antes disputava atenção no meio
            da página. */}
        <section className="bg-background py-24 lg:py-32">
          <Reveal className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Nossa essência</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-light sm:text-5xl">
              Missão, visão e valores que guiam cada atendimento.
            </h2>
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {missionValues.map((item) => (
                <div key={item.title} className="border border-border bg-background p-6 sm:p-8">
                  <h3 className="font-display text-2xl text-gold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
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
              href={WHATSAPP.megahair}
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

      {/* À esquerda como no site principal: além de não cobrir o botão
          de voltar ao topo, o atalho fica no mesmo lugar em todas as
          páginas. */}
      <FloatingWhatsApp href={WHATSAPP.megahair} lado="esquerda" />
    </div>
  );
}
