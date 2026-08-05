import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, PenLine, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { Reveal, SectionLabel } from "@/components/site/Reveal";
import { supabase } from "@/lib/supabase";

type Depoimento = { id: string; nota: number; texto: string; nome: string };

// Usados enquanto nenhuma avaliação da pesquisa foi aprovada ainda.
const FALLBACK: Depoimento[] = [
  {
    id: "f1",
    nota: 5,
    texto: "Ambiente perfeito e diversos serviços no mesmo lugar.",
    nome: "Camila R.",
  },
  {
    id: "f2",
    nota: 5,
    texto: "Equipe extremamente simpática e profissionais excelentes.",
    nome: "Fernanda L.",
  },
  {
    id: "f3",
    nota: 5,
    texto: "Meu cabelo ficou lindo e saudável. Atendimento impecável.",
    nome: "Juliana M.",
  },
  { id: "f4", nota: 5, texto: "O melhor Hair Studio de São Paulo.", nome: "Patrícia S." },
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

const PAGE_SIZE = 4;

export function Reviews() {
  const [depoimentos, setDepoimentos] = useState<Depoimento[]>(FALLBACK);
  const [pagina, setPagina] = useState(0);

  useEffect(() => {
    let ativo = true;

    supabase
      .from("avaliacoes")
      .select("id, nota, comentario, nome")
      .eq("aprovado", true)
      .not("comentario", "is", null)
      .order("criado_em", { ascending: false })
      .limit(24)
      .then(({ data, error }) => {
        if (!ativo || error || !data?.length) return;
        setDepoimentos(
          data.map((d) => ({
            id: d.id as string,
            nota: d.nota as number,
            texto: d.comentario as string,
            nome: (d.nome as string | null) ?? "Cliente SÜ",
          })),
        );
        setPagina(0);
      });

    return () => {
      ativo = false;
    };
  }, []);

  const totalPaginas = Math.ceil(depoimentos.length / PAGE_SIZE);
  const visiveis = depoimentos.slice(pagina * PAGE_SIZE, pagina * PAGE_SIZE + PAGE_SIZE);
  const girar = (dir: number) => setPagina((p) => (p + dir + totalPaginas) % totalPaginas);

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
                  <p className="mt-2 text-xs text-muted-foreground">
                    Baseado em{" "}
                    <strong className="font-semibold text-foreground">742 avaliações</strong>
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

        <AnimatePresence mode="wait">
          <motion.div
            key={pagina}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {visiveis.map((r) => (
              <motion.blockquote
                key={r.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35 }}
                className="flex h-full flex-col justify-between border border-border bg-offwhite p-7 transition-colors hover:border-gold/60"
              >
                <div>
                  <Stars nota={r.nota} />
                  <p className="mt-5 font-display text-lg leading-snug">“{r.texto}”</p>
                </div>
                <footer className="mt-8 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {r.nome}
                </footer>
              </motion.blockquote>
            ))}
          </motion.div>
        </AnimatePresence>

        {totalPaginas > 1 && (
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
        )}
      </div>
    </section>
  );
}
