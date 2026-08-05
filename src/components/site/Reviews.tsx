import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, PenLine, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { Reveal, SectionLabel } from "@/components/site/Reveal";
import { SITE } from "@/lib/site-data";
import { supabase } from "@/lib/supabase";

type Depoimento = {
  id: string;
  nota: number;
  texto: string;
  nome: string;
  quando?: string;
  doGoogle?: boolean;
};

/**
 * Avaliações reais publicadas no perfil do Google do salão, transcritas
 * palavra por palavra. O selo do Google fica no card porque é o que dá
 * credibilidade: a visitante sabe que pode conferir na fonte.
 */
const GOOGLE: Depoimento[] = [
  {
    id: "g1",
    nota: 5,
    nome: "Cristiana Malaquias dos Santos",
    quando: "4 meses atrás",
    texto:
      "Fiz meu cabelo com o Kaua, segue o antes e depois! eu AMEI, ele sabe MUITO, dá várias dicas, super acolhedor, caprichoso, cuidadoso… nossa! 5 estrelas! Demorei pra encontrar um Cabeleleiro que soubesse acertar na cor e saber o significado de morena iluminada! Voltarei mais vezes!",
    doGoogle: true,
  },
  {
    id: "g2",
    nota: 5,
    nome: "Isadora Lagreca Treptow",
    quando: "5 meses atrás",
    texto:
      "Estou há um ano fazendo manutenção do meu mega e cuidados do meu cabelo com Márcio e erica e nao poderia estar mais satisfeita. Me sinto muito segura depois de muitos anos procurando alguém para cuidar do meu cabelo. Acho ambos muito prudentes cautelosos e responsáveis com minha saúde capilar, alem de serem super gentis e carismáticos!",
    doGoogle: true,
  },
  {
    id: "g3",
    nota: 5,
    nome: "Flávio Noguer",
    quando: "um mês atrás",
    texto:
      "Agendamento primoroso com Tiffany e o melhor corte de cabelo do mundo com o Kiko. Vale cada centavo. Melhor Hair Studio de São Paulo. Posso afirmar pois uso o serviço há anos.",
    doGoogle: true,
  },
  {
    id: "g4",
    nota: 5,
    nome: "Stephanie Paranhos",
    quando: "5 meses atrás",
    texto:
      "Muito bem recebida pelo Kiko e todos do salão. Toda vez que viajo pra SP marco com Kiko assim que chego. Meu cabelo sempre fica muito lindo e continua saudável. Super recomendo. Luzes e progressiva",
    doGoogle: true,
  },
  {
    id: "g5",
    nota: 5,
    nome: "Kyaa Fernandes",
    quando: "um mês atrás",
    texto:
      "Um lugar que dá gosto de ir! Atendimento fantástico, desde a recepção (que por sinal merece mil no atendimento, educada, simpática), aos profissionais, te explicam todo procedimento, não te empurram nada… Te deixam a vontade… Olha… Super recomendo!",
    doGoogle: true,
  },
  {
    id: "g6",
    nota: 5,
    nome: "Raquel Mesquita",
    quando: "7 meses atrás",
    texto:
      "Minha experiência no salão sempre foi e continua sendo excelente. Acompanho o trabalho do Diego Cardoso há muitos anos, e ele faz meu cabelo como ninguém. É excepcional em coloração, escovação e em tudo o que se propõe a fazer. Confio 100% no trabalho dele e sempre saio encantada com o resultado.",
    doGoogle: true,
  },
  {
    id: "g7",
    nota: 5,
    nome: "Luli Crespin",
    quando: "9 meses atrás",
    texto:
      "Lugar bonito, com astral e energias muito boas, pessoas gentis, e a melhor profissional em luzes do mundo, Helô Bassi.",
    doGoogle: true,
  },
  {
    id: "g8",
    nota: 5,
    nome: "Jessica Espinosa",
    quando: "5 meses atrás",
    texto:
      "Superou as expectativas! Fui um pouco insegura, sem indicação e confiando apenas no que tinha visto pelas redes sociais. Entre os profissionais o Diego foi um dos que escolhi considerando as referências de loiro que vi no insta e fiquei extremamente satisfeita. Tudo muito bem realizado. Preço justo.",
    doGoogle: true,
  },
  {
    id: "g9",
    nota: 5,
    nome: "Vanessa Tondo",
    quando: "5 meses atrás",
    texto:
      "Sou cliente há mais de 1 ano do salão, faço sempre minhas sobrancelhas com a Vanessa e ficam perfeitas! Além disse, diz as mãos recentemente e amei o resultado. Super indico!",
    doGoogle: true,
  },
  {
    id: "g10",
    nota: 5,
    nome: "L m",
    quando: "5 meses atrás",
    texto:
      "Foi a minha primeira experiência nesse salão e eu amei. Espaço aconchegante e profissionais sempre muito prestativas e atenciosas com cada detalhe para me deixarem confortáveis. A cabeleireira Helo Bassi é incrível. Ela desde o início respeitou a saúde dos meus fios. Eu amei tudo!",
    doGoogle: true,
  },
  {
    id: "g11",
    nota: 5,
    nome: "Gabriela Andrade",
    quando: "5 meses atrás",
    texto: "Elika minha maravilhosa amei ❤ Nando atendimento excelente ❤ Simone Obrigada meu amor",
    doGoogle: true,
  },
  {
    id: "g12",
    nota: 5,
    nome: "Rosana Nogueira dos Santos",
    quando: "5 meses atrás",
    texto:
      "Marcio do Studio Uber, faz a manutenção do meu mega hair DIVINAMENTE. Ja tentei em outros salões, mas ninguém acertou, pq gosto de tudo próximo a perfeição. O ambiente é ótimo, a equipe toda muito cuidadosa. Recomendo!",
    doGoogle: true,
  },
];

function Stars({ nota = 5, className = "" }: { nota?: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-label={`${nota} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-3.5 ${i < nota ? "fill-gold text-gold" : "text-border"}`} />
      ))}
    </div>
  );
}

/** Selo do Google desenhado em SVG para não depender de imagem externa. */
function SeloGoogle() {
  return (
    <svg viewBox="0 0 48 48" className="size-5 shrink-0" aria-label="Avaliação publicada no Google">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

const POR_PAGINA = 3;
const INTERVALO = 7000;

export function Reviews() {
  const [depoimentos, setDepoimentos] = useState<Depoimento[]>(GOOGLE);
  const [pagina, setPagina] = useState(0);
  const [pausado, setPausado] = useState(false);

  // Depoimentos aprovados na pesquisa de satisfação entram junto com os
  // do Google, sem o selo, já que vieram pelo site.
  useEffect(() => {
    let ativo = true;

    supabase
      .from("avaliacoes")
      .select("id, nota, comentario, nome")
      .eq("aprovado", true)
      .not("comentario", "is", null)
      .order("criado_em", { ascending: false })
      .limit(12)
      .then(({ data, error }) => {
        if (!ativo || error || !data?.length) return;
        const doSite = data.map((d) => ({
          id: d.id as string,
          nota: d.nota as number,
          texto: d.comentario as string,
          nome: (d.nome as string | null) ?? "Cliente SÜ",
        }));
        setDepoimentos([...GOOGLE, ...doSite]);
      });

    return () => {
      ativo = false;
    };
  }, []);

  const totalPaginas = Math.ceil(depoimentos.length / POR_PAGINA);

  useEffect(() => {
    if (pausado) return;
    const t = setInterval(() => setPagina((p) => (p + 1) % totalPaginas), INTERVALO);
    return () => clearInterval(t);
  }, [pausado, totalPaginas]);

  const girar = (dir: number) => setPagina((p) => (p + dir + totalPaginas) % totalPaginas);
  const visiveis = depoimentos.slice(pagina * POR_PAGINA, pagina * POR_PAGINA + POR_PAGINA);

  return (
    <section id="avaliacoes" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <Reveal className="max-w-2xl">
            <SectionLabel>Avaliações</SectionLabel>
            <h2 className="mt-6 font-display text-3xl font-light leading-tight sm:text-5xl">
              Quem vive a experiência, recomenda.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-5 border border-border px-8 py-6">
                <p className="font-display text-5xl leading-none">4,9</p>
                <div>
                  <Stars />
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <SeloGoogle />
                    <span>
                      <strong className="font-semibold text-foreground">742 avaliações</strong> no
                      Google
                    </span>
                  </p>
                </div>
              </div>
              <a
                href="/avaliar"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-transform hover:-translate-y-0.5"
              >
                <PenLine className="size-4" /> Deixe sua avaliação
              </a>
            </div>
          </Reveal>
        </div>

        <div onMouseEnter={() => setPausado(true)} onMouseLeave={() => setPausado(false)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={pagina}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
              className="mt-14 grid gap-4 md:grid-cols-3"
            >
              {visiveis.map((r) => (
                <blockquote
                  key={r.id}
                  className="flex h-full flex-col border border-border bg-offwhite p-7"
                >
                  <header className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Inicial no lugar da foto: a imagem do perfil é da
                          cliente e não nos pertence para republicar. */}
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/15 font-display text-lg text-gold">
                        {r.nome.trim().charAt(0).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{r.nome}</p>
                        {r.quando && (
                          <p className="text-[11px] text-muted-foreground">{r.quando}</p>
                        )}
                      </div>
                    </div>
                    {r.doGoogle && <SeloGoogle />}
                  </header>

                  <Stars nota={r.nota} className="mt-5" />
                  <p className="mt-4 line-clamp-6 text-sm leading-relaxed text-muted-foreground">
                    {r.texto}
                  </p>
                </blockquote>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={() => girar(-1)}
            aria-label="Avaliações anteriores"
            className="flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowLeft className="size-4" />
          </button>
          <span className="text-xs tabular-nums text-muted-foreground">
            {pagina + 1} / {totalPaginas}
          </span>
          <button
            onClick={() => girar(1)}
            aria-label="Próximas avaliações"
            className="flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Avaliações publicadas no{" "}
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-gold"
          >
            perfil do salão no Google
          </a>
          .
        </p>
      </div>
    </section>
  );
}
