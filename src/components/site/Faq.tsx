import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionLabel } from "@/components/site/Reveal";
import { SITE } from "@/lib/site-data";

const FAQ = [
  {
    q: "O mega hair danifica o meu cabelo?",
    a: "Não. Nossa técnica é aplicada sem tração e sem agredir os fios, garantindo uma experiência confortável e a saúde do seu cabelo natural.",
  },
  {
    q: "Os fios são naturais?",
    a: "Sim, trabalhamos apenas com cabelos 100% humanos, selecionados fio a fio para garantir movimento, brilho e aparência completamente real.",
  },
  {
    q: "Quanto tempo dura a aplicação?",
    a: "Depende da técnica escolhida e do volume desejado. Na avaliação gratuita a especialista informa o tempo exato do seu procedimento.",
  },
  {
    q: "Qual técnica é a ideal para mim?",
    a: "Fita adesiva, ponto americano, invisível ou queratina — a indicação é feita no diagnóstico gratuito, considerando espessura, densidade e rotina do seu cabelo.",
  },
  {
    q: "Preciso agendar com antecedência?",
    a: "Sim. As vagas para novas clientes são limitadas por semana, pois cada atendimento é individual e exclusivo.",
  },
  {
    q: "A avaliação tem custo?",
    a: "Não. O diagnóstico capilar é totalmente gratuito e sem compromisso.",
  },
];

export function Faq() {
  return (
    <section id="duvidas" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal>
          <SectionLabel>Dúvidas</SectionLabel>
          <h2 className="mt-6 font-display text-3xl font-light leading-tight sm:text-4xl">
            Perguntas mais frequentes
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-10 border-t border-border">
            {FAQ.map((item) => (
              <AccordionItem key={item.q} value={item.q} className="border-border">
                <AccordionTrigger className="text-left font-display text-base hover:text-gold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center justify-center border border-foreground px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors hover:border-gold hover:bg-gold hover:text-black"
          >
            Ainda estou com dúvidas
          </a>
        </Reveal>
      </div>
    </section>
  );
}
