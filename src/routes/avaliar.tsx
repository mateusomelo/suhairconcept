import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Check, Loader2, MapPin, Star } from "lucide-react";

import logoSu from "@/assets/logo-su-marca.png";
import { SERVICOS_AVALIACAO, SITE } from "@/lib/site-data";
import { supabase } from "@/lib/supabase";

const TITLE = "Como foi sua experiência? | SÜ Hair Concept";

export const Route = createFileRoute("/avaliar")({
  component: AvaliarPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: "Conte como foi seu atendimento no SÜ Hair Concept." },
      // Página de uso interno (QR code na saída do salão) — fora do Google.
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function AvaliarPage() {
  const [nota, setNota] = useState(0);
  const [hover, setHover] = useState(0);
  const [comentario, setComentario] = useState("");
  const [nome, setNome] = useState("");
  const [servicos, setServicos] = useState<string[]>([]);
  const [estado, setEstado] = useState<"form" | "enviando" | "pronto">("form");
  const [erro, setErro] = useState<string | null>(null);

  function alternarServico(nomeServico: string) {
    setServicos((atuais) =>
      atuais.includes(nomeServico)
        ? atuais.filter((s) => s !== nomeServico)
        : [...atuais, nomeServico],
    );
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();

    // Obrigatórios: estrelas, nome e comentário. O serviço é opcional —
    // exigir mais de quem está saindo do salão derruba a resposta.
    if (nota === 0) {
      setErro("Escolha de 1 a 5 estrelas para continuar.");
      return;
    }
    if (!nome.trim()) {
      setErro("Escreva seu nome para continuar.");
      return;
    }
    if (!comentario.trim()) {
      setErro("Escreva um comentário para continuar.");
      return;
    }

    setEstado("enviando");
    setErro(null);

    const base = {
      nota,
      comentario: comentario.trim(),
      nome: nome.trim(),
      aprovado: false,
    };

    let { error } = await supabase
      .from("avaliacoes")
      .insert({ ...base, servicos: servicos.length ? servicos : null });

    // Coluna `servicos` ainda não criada no banco — acontece enquanto o
    // 004_avaliacoes_servicos.sql não for rodado no Supabase. Nesse caso
    // grava sem os serviços: perder o depoimento de uma cliente por
    // causa da ordem do deploy seria bem pior.
    //
    // São dois códigos porque vêm de camadas diferentes: PGRST204 é o
    // PostgREST recusando pelo cache de schema (é o que realmente sai
    // num insert) e 42703 é o Postgres reclamando de coluna inexistente.
    if (error?.code === "PGRST204" || error?.code === "42703") {
      ({ error } = await supabase.from("avaliacoes").insert(base));
    }

    if (error) {
      setErro("Não conseguimos enviar sua avaliação. Tente novamente em instantes.");
      setEstado("form");
      return;
    }

    setEstado("pronto");

    // Enviou, vai direto para o Google. A tela de agradecimento continua
    // sendo renderizada por baixo: se o navegador segurar a ida ou a
    // cliente voltar, ela ainda encontra o botão para avaliar.
    //
    // Vale para TODO MUNDO, independente da nota. Mandar só quem deu 4
    // ou 5 estrelas seria filtragem de avaliação, proibida pelo Google
    // desde 2018 e motivo de punição no perfil do salão.
    window.location.href = SITE.googleReview;
  }

  return (
    <div className="flex min-h-svh flex-col bg-offwhite text-foreground">
      {/* O link de voltar existia só na tela de agradecimento. Quem
          desistia de avaliar ficava sem saída a não ser o botão do
          navegador. */}
      <header className="mx-auto flex w-full max-w-md items-center justify-between gap-4 px-6 pt-8">
        <a
          href="/"
          className="flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-gold"
        >
          <ArrowLeft className="size-4" />
          Site
        </a>
        <img src={logoSu} alt="SÜ Hair Concept" className="h-10 w-auto object-contain" />
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {estado === "pronto" ? (
            <Agradecimento nota={nota} />
          ) : (
            <form onSubmit={enviar} className="rounded-2xl border border-border bg-background p-8">
              <h1 className="text-balance-pretty font-display text-3xl font-light leading-tight">
                Como foi sua experiência hoje?
              </h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Sua opinião leva menos de um minuto e nos ajuda a cuidar melhor de você.
              </p>

              <fieldset className="mt-8">
                <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Sua nota
                </legend>
                <div className="mt-4 flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setNota(n)}
                      onMouseEnter={() => setHover(n)}
                      onMouseLeave={() => setHover(0)}
                      aria-label={`${n} ${n === 1 ? "estrela" : "estrelas"}`}
                      aria-pressed={nota === n}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`size-9 ${
                          n <= (hover || nota) ? "fill-gold text-gold" : "text-border"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="mt-8 block">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Seu comentário
                </span>
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  maxLength={600}
                  rows={4}
                  required
                  placeholder="O que mais te marcou no atendimento?"
                  className="mt-3 w-full resize-none rounded-lg border border-border bg-offwhite p-4 text-sm outline-none focus:border-gold"
                />
              </label>

              <label className="mt-5 block">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Seu nome
                </span>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  maxLength={80}
                  required
                  placeholder="Como podemos te chamar?"
                  className="mt-3 w-full rounded-lg border border-border bg-offwhite p-4 text-sm outline-none focus:border-gold"
                />
              </label>

              {/* Opcional de propósito: serve para o salão saber qual
                  serviço gerou a nota, mas exigir isso de quem está
                  saindo com pressa custaria respostas. */}
              <fieldset className="mt-8">
                <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Quais serviços você recebeu? (opcional)
                </legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SERVICOS_AVALIACAO.map((servico) => {
                    const marcado = servicos.includes(servico);
                    return (
                      <button
                        key={servico}
                        type="button"
                        onClick={() => alternarServico(servico)}
                        aria-pressed={marcado}
                        className={`min-h-9 rounded-full border px-4 text-xs transition-colors ${
                          marcado
                            ? "border-gold bg-gold font-semibold text-ink"
                            : "border-border bg-offwhite text-muted-foreground hover:border-gold"
                        }`}
                      >
                        {servico}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {erro && <p className="mt-5 text-sm text-red-600">{erro}</p>}

              <button
                type="submit"
                disabled={estado === "enviando"}
                className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-opacity disabled:opacity-60"
              >
                {estado === "enviando" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Enviando
                  </>
                ) : (
                  "Enviar avaliação"
                )}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

function Agradecimento({ nota }: { nota: number }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-8 text-center">
      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-gold text-ink">
        <Check className="size-7" />
      </span>
      <h1 className="mt-6 font-display text-3xl font-light leading-tight">
        Obrigado pela sua avaliação!
      </h1>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {nota >= 4
          ? "Ficamos felizes que sua experiência tenha sido boa. Se puder deixar esse mesmo carinho no Google, ajuda muito outras pessoas a nos encontrarem."
          : "Sua opinião chegou até a nossa equipe e vamos usar cada detalhe para melhorar. Se quiser registrar publicamente, o link do Google está abaixo."}
      </p>

      <a
        href={SITE.googleReview}
        target="_blank"
        rel="noreferrer"
        className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-xs font-semibold uppercase tracking-[0.16em] text-background transition-transform hover:-translate-y-0.5"
      >
        <MapPin className="size-4" /> Avaliar no Google
      </a>

      <a
        href="/"
        className="mt-4 inline-block text-xs uppercase tracking-[0.16em] text-muted-foreground underline underline-offset-4"
      >
        Voltar ao site
      </a>
    </div>
  );
}
