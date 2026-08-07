import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/site/About";
import { BackToTop } from "@/components/site/BackToTop";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { CtaSection } from "@/components/site/CtaSection";
import { Differentials } from "@/components/site/Differentials";
import { Faq, FAQ_GRUPOS } from "@/components/site/Faq";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Footer } from "@/components/site/Footer";
import { Gallery } from "@/components/site/Gallery";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { InstagramSection } from "@/components/site/InstagramSection";
import { MegaHair } from "@/components/site/MegaHair";
import { Philosophy } from "@/components/site/Philosophy";
import { Reviews } from "@/components/site/Reviews";
import { Services } from "@/components/site/Services";
import { LocationHours } from "@/components/site/LocationHours";
import { WHATSAPP } from "@/lib/site-data";

const TITLE = "SÜ Hair Concept | Beauty Experience";
const DESCRIPTION =
  "Conheça o SÜ Hair Concept em Moema, São Paulo. Um salão premium com profissionais especializados, atendimento exclusivo, coloração, mega hair, luzes e tratamentos capilares.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "salão de beleza, cabeleireiro Moema, mega hair, morena iluminada, luzes, coloração, hair concept, salão premium São Paulo",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        // Perguntas frequentes marcadas para o Google — podem aparecer
        // expandidas direto no resultado de busca.
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_GRUPOS.flatMap((grupo) =>
            grupo.perguntas.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          ),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HairSalon",
          name: "SÜ Hair Concept",
          description: DESCRIPTION,
          telephone: "+55 11 5042-1518",
          priceRange: "$$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Av. Pavão, 362",
            addressLocality: "São Paulo",
            addressRegion: "SP",
            postalCode: "04516-010",
            addressCountry: "BR",
          },
          sameAs: ["https://www.instagram.com/suhairconcept/"],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "742",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday"],
              opens: "09:00",
              closes: "20:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Thursday", "Friday"],
              opens: "09:00",
              closes: "21:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Saturday"],
              opens: "08:00",
              closes: "19:00",
            },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/*
       * No celular a home segue a ordem de prioridade das diretrizes:
       * apresentação, serviços, mega hair, resultados, avaliações,
       * localização e agendamento. O que não está nessa lista vai para
       * o fim, para a visitante chegar ao agendamento sem rolar tudo.
       *
       * `lg:order-none` devolve a ordem do código no computador, onde a
       * página longa não atrapalha.
       */}
      <main className="flex flex-col">
        {/* A ordem do código é a do computador e não muda. Os números
            abaixo valem só no celular; `lg:order-none` devolve tudo à
            ordem original a partir de 1024px. */}
        <div className="order-[1] lg:order-none">
          <Hero />
        </div>
        <div className="order-[2] lg:order-none">
          <About />
        </div>
        <div className="order-[3] lg:order-none">
          <Services />
        </div>
        <div className="order-[4] lg:order-none">
          <MegaHair />
        </div>
        <div className="order-[11] lg:order-none">
          <Differentials />
        </div>
        <div className="order-[12] lg:order-none">
          <Philosophy />
        </div>
        <div className="order-[5] lg:order-none">
          <BeforeAfter />
        </div>
        <div className="order-[6] lg:order-none">
          <Gallery />
        </div>
        <div className="order-[7] lg:order-none">
          <Reviews />
        </div>
        <div className="order-[9] lg:order-none">
          <CtaSection />
        </div>
        <div className="order-[10] lg:order-none">
          <Faq />
        </div>
        <div className="order-[8] lg:order-none">
          <LocationHours />
        </div>
        <div className="order-[13] lg:order-none">
          <InstagramSection />
        </div>
      </main>
      <Footer />
      <BackToTop />
      <FloatingWhatsApp href={WHATSAPP.geral} lado="esquerda" />
    </div>
  );
}
