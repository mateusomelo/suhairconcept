import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Loader2, MapPin, Star } from "lucide-react";

import logoSu from "@/assets/logo-su-marca.png";
import { SITE } from "@/lib/site-data";
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
  const [estado, setEstado] = useState<"form" | "enviando" | "pronto">("form");
  const [erro, setErro] = useState<string | null>(null);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (nota === 0) {
      setErro("Escolha de 1 a 5 estrelas para continuar.");
      return;
    }

    setEstado("enviando");
    setErro(null);

    const { error } = await supabase.from("avaliacoes").insert({
      nota,
      comentario: comentario.trim() || null,
      nome: nome.trim() || null,
      aprovado: false,
    });

    if (error) {
      setErro("Não conseguimos enviar sua avaliação. Tente novamente em instantes.");
      setEstado("form");
      return;
    }

    setEstado("pronto");
  }

  return (
    <div className="flex min-h-svh flex-col bg-offwhite text-foreground">
      <header className="flex justify-center px-6 pt-12">
        <img src={logoSu} alt="SÜ Hair Concept" className="h-14 w-auto object-contain" />
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
                  Quer contar mais? (opcional)
                </span>
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  maxLength={600}
                  rows={4}
                  placeholder="O que mais te marcou no atendimento?"
                  className="mt-3 w-full resize-none rounded-lg border border-border bg-offwhite p-4 text-sm outline-none focus:border-gold"
                />
              </label>

              <label className="mt-5 block">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Seu nome (opcional)
                </span>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  maxLength={80}
                  placeholder="Como podemos te chamar?"
                  className="mt-3 w-full rounded-lg border border-border bg-offwhite p-4 text-sm outline-none focus:border-gold"
                />
              </label>

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
