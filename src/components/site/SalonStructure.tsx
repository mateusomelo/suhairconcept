import { Accessibility, Car, KeyRound, MapPin, PawPrint, Wifi } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";

/**
 * Estrutura física do salão.
 *
 * A maior parte vem da ficha do Google Meu Negócio. Valet e pet
 * friendly não constam lá: entraram só depois de o salão confirmar
 * que existem, porque prometer o que não existe vira reclamação
 * quando a cliente chega.
 *
 * Fica em componente porque as duas landing pages mostram os mesmos
 * itens — duplicar a lista faria uma página desatualizar sem a outra.
 */
const ESTRUTURA = [
  {
    icon: Car,
    title: "Estacionamento no local",
    text: "Vaga descoberta e gratuita, sem precisar procurar lugar na rua.",
  },
  {
    icon: KeyRound,
    title: "Valet",
    text: "Você para na porta e entrega a chave. Do resto a gente cuida.",
  },
  {
    icon: PawPrint,
    title: "Pet friendly",
    text: "Seu pet é bem-vindo e pode ficar com você durante o atendimento.",
  },
  {
    icon: Accessibility,
    title: "Acessível de ponta a ponta",
    text: "Entrada, banheiro, assento e estacionamento acessíveis para cadeira de rodas.",
  },
  {
    icon: Wifi,
    title: "Wi-Fi gratuito",
    text: "Enquanto o atendimento acontece, dá para trabalhar ou assistir alguma coisa.",
  },
  {
    icon: MapPin,
    title: "Bem localizado em Moema",
    text: "Na Av. Pavão, a poucos minutos do metrô Moema e da Av. Ibirapuera.",
  },
];

export function SalonStructure({ chamada }: { chamada: string }) {
  return (
    <section className="bg-offwhite py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">O salão</p>
          <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
            Uma estrutura pensada para o seu conforto.
          </h2>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">{chamada}</p>
        </Reveal>
        {/* 3 colunas para 6 itens: fecha em duas linhas cheias. Com 4
            colunas sobrariam dois cards sozinhos na segunda linha. */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ESTRUTURA.map((item, i) => (
            <Reveal key={item.title} delay={(i % 4) * 0.06}>
              <article className="flex h-full flex-col border border-border bg-background p-6">
                <item.icon className="size-6 text-gold" strokeWidth={1.4} />
                <h3 className="mt-5 font-display text-lg leading-snug">{item.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
