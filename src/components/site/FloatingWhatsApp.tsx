import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp({
  href,
  lado = "direita",
}: {
  href: string;
  /** Na home fica à esquerda para não cobrir o botão de voltar ao topo. */
  lado?: "direita" | "esquerda";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Agendar pelo WhatsApp"
      // env(safe-area-inset-bottom) afasta o botão da barra de gestos do
      // iPhone. Sem isso ele fica parcialmente sob a barra do Safari e
      // parte da área de toque se perde.
      style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
      className={`fixed z-50 flex min-h-11 items-center gap-2 rounded-full bg-[#25D366] px-5 text-xs font-semibold uppercase tracking-wide text-white shadow-lg transition-transform hover:-translate-y-0.5 md:hidden ${lado === "esquerda" ? "left-5" : "right-5"}`}
    >
      <MessageCircle className="size-5" />
      Agendar
    </a>
  );
}
