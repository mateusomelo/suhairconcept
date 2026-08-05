import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/site/About";
import { BackToTop } from "@/components/site/BackToTop";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { CtaSection } from "@/components/site/CtaSection";
import { Differentials } from "@/components/site/Differentials";
import { Faq, FAQ_GRUPOS } from "@/components/site/Faq";
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
      <main>
        <Hero />
        <About />
        <Services />
        <MegaHair />
        <Differentials />
        <Philosophy />
        <BeforeAfter />
        <Gallery />
        <Reviews />
        <CtaSection />
        <Faq />
        <LocationHours />
        <InstagramSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
