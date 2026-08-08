import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionLabel } from "@/components/site/Reveal";
import { SITE, WHATSAPP } from "@/lib/site-data";

/**
 * Perguntas por serviço. As de mega hair vêm do atendimento do salão; as
 * demais foram trazidas do site anterior (studiouber.com.br), onde já
 * estavam publicadas e respondidas pela equipe.
 */
export const FAQ_GRUPOS = [
  {
    titulo: "Mega hair",
    perguntas: [
      {
        q: "O mega hair danifica o meu cabelo?",
        // Sem "garantir a saúde do cabelo": é promessa de resultado de
        // saúde, que o salão não tem como assegurar em toda cliente.
        a: "A técnica é escolhida conforme as características do seu cabelo, com aplicação confortável e acompanhamento durante todo o processo. Na avaliação, explicamos o que esperar no seu caso.",
      },
      {
        q: "Os fios são naturais?",
        a: "Sim, trabalhamos apenas com cabelos 100% humanos, selecionados fio a fio para garantir movimento, brilho e aparência completamente real.",
      },
      {
        q: "Qual técnica é a ideal para mim?",
        a: "Fita adesiva, ponto americano, invisível ou queratina — a indicação é feita no diagnóstico gratuito, considerando espessura, densidade e rotina do seu cabelo.",
      },
      {
        q: "A avaliação tem custo?",
        a: "Não. O diagnóstico capilar é totalmente gratuito e sem compromisso.",
      },
    ],
  },
  {
    titulo: "Escova e baby liss",
    perguntas: [
      {
        q: "Qual é a diferença entre escova e baby liss?",
        a: "A escova geralmente cria um visual liso e reto, enquanto o baby liss produz ondas ou cachos no cabelo.",
      },
      {
        q: "Quanto tempo dura o efeito da escova e do baby liss?",
        a: "O tempo pode variar dependendo do tipo de cabelo e das condições climáticas, mas geralmente a escova dura de 1 a 3 dias, enquanto o baby liss pode durar de 6 a 8 horas.",
      },
      {
        q: "Qual é o melhor tipo de cabelo para receber uma escova ou baby liss?",
        a: "A escova é adequada para cabelos lisos ou levemente ondulados, enquanto o baby liss é ótimo para adicionar textura a cabelos naturalmente lisos.",
      },
      {
        q: "O serviço de escova ou baby liss danifica o cabelo?",
        a: "Quando feito por um profissional qualificado e usando produtos de proteção térmica, o dano ao cabelo é mínimo.",
      },
    ],
  },
  {
    titulo: "Design de sobrancelha e brow lamination",
    perguntas: [
      {
        q: "Qual é a diferença entre design e brow lamination?",
        a: "O design é modelar e definir as sobrancelhas, enquanto o brow lamination alisa e modela os fios.",
      },
      {
        q: "Quanto tempo duram os efeitos?",
        a: "O design dura de 2 a 4 semanas; o lamination dura de 4 a 6 semanas.",
      },
      {
        q: "O lamination danifica os fios?",
        a: "Quando realizado por profissional qualificado, é um tratamento seguro.",
      },
      {
        q: "Quais são os benefícios do lamination?",
        a: "Pode ajudar a alinhar fios, preencher falhas, criar um visual mais volumoso e reduzir a necessidade de produtos diários.",
      },
    ],
  },
  {
    titulo: "Alongamento de cílios",
    perguntas: [
      {
        q: "O que é o alongamento de cílios?",
        a: "Procedimento onde cílios sintéticos são aplicados aos cílios naturais para criar um visual mais longo e volumoso.",
      },
      {
        q: "Quanto tempo dura?",
        a: "Geralmente pode durar de 4 a 6 semanas antes de ser necessário um preenchimento.",
      },
      {
        q: "Danifica os cílios naturais?",
        a: "Quando realizado por profissional experiente, não deve danificar os cílios naturais.",
      },
      {
        q: "Quais são os tipos?",
        a: "Clássico e volume russo são os mais comuns.",
      },
    ],
  },
  {
    titulo: "Manicure e pedicure",
    perguntas: [
      {
        q: "Com que frequência devo fazer manicure e pedicure?",
        a: "Geralmente é recomendado fazer uma manicure e pedicure a cada duas semanas.",
      },
      {
        q: "Quais são os benefícios de fazer com um profissional?",
        a: "Podem ajudar a melhorar a saúde das unhas e da pele ao redor, prevenir infecções e promover relaxamento.",
      },
      {
        q: "É seguro fazer durante a gravidez?",
        a: "Geralmente, sim. No entanto, é importante informar a profissional sobre a gravidez.",
      },
    ],
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

        {FAQ_GRUPOS.map((grupo, gi) => (
          <Reveal key={grupo.titulo} delay={0.05 + gi * 0.04}>
            <div className="mt-12 first:mt-10">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                {grupo.titulo}
              </h3>
              <Accordion type="single" collapsible className="mt-4 border-t border-border">
                {grupo.perguntas.map((item) => (
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
            </div>
          </Reveal>
        ))}

        <Reveal delay={0.15}>
          <a
            href={WHATSAPP.geral}
            target="_blank"
            rel="noreferrer"
            className="mt-12 inline-flex items-center justify-center border border-foreground px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors hover:border-gold hover:bg-gold hover:text-black"
          >
            Ainda estou com dúvidas
          </a>
        </Reveal>
      </div>
    </section>
  );
}
