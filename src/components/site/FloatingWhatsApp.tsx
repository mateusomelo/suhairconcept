import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Agendar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-white shadow-lg transition-transform hover:-translate-y-0.5 md:hidden"
    >
      <MessageCircle className="size-5" />
      Agendar
    </a>
  );
}
