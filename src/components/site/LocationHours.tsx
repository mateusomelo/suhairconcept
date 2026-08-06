import { CalendarCheck, Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

import { Reveal, SectionLabel } from "@/components/site/Reveal";
import { HOURS, SITE, WHATSAPP } from "@/lib/site-data";

export function LocationHours() {
  return (
    <section id="localizacao" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <SectionLabel>Localização</SectionLabel>
          <h2 className="mt-6 font-display text-3xl font-light leading-tight sm:text-5xl">
            Em Indianópolis, a minutos de Moema.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="h-full overflow-hidden border border-border">
              <iframe
                title="Mapa da localização do SÜ Hair Concept"
                src={SITE.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[380px] w-full lg:h-full lg:min-h-[460px]"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between border border-border p-8">
              <div>
                <MapPin className="size-5 text-gold" strokeWidth={1.3} />
                <address className="mt-5 not-italic leading-relaxed">
                  <span className="font-display text-xl">{SITE.address.street}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {SITE.address.district}
                  </span>
                  <span className="block text-sm text-muted-foreground">{SITE.address.city}</span>
                  <span className="mt-3 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    CEP {SITE.address.zip}
                  </span>
                </address>
                <a
                  href={SITE.phoneHref}
                  className="mt-6 inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-gold"
                >
                  <Phone className="size-4" /> {SITE.phone}
                </a>
              </div>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 border border-foreground py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors hover:border-gold hover:bg-gold hover:text-black"
              >
                <Navigation className="size-4" /> Como Chegar
              </a>
            </div>
          </Reveal>
        </div>

        {/* Horários */}
        <Reveal className="mt-20 max-w-2xl">
          <SectionLabel>Horário</SectionLabel>
          <h2 className="mt-6 font-display text-3xl font-light leading-tight sm:text-4xl">
            Funcionamento
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {HOURS.map((h) => (
            <div key={h.day} className="bg-background p-6 transition-colors hover:bg-offwhite">
              <Clock className="size-4 text-gold" strokeWidth={1.3} />
              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {h.day}
              </p>
              <p className="mt-1 font-display text-lg">{h.time}</p>
            </div>
          ))}
        </div>

        {/* Contato */}
        <div id="contato" className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Phone, label: "Ligar Agora", href: SITE.phoneHref },
            { icon: MessageCircle, label: "WhatsApp", href: WHATSAPP.geral },
            { icon: Navigation, label: "Como Chegar", href: SITE.mapsUrl },
            { icon: CalendarCheck, label: "Agendar Online", href: WHATSAPP.geral },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06}>
              <a
                href={c.href}
                target={c.href.startsWith("tel:") ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex items-center justify-between border border-border px-6 py-5 transition-colors hover:border-gold hover:bg-offwhite"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
                  {c.label}
                </span>
                <c.icon className="size-4 text-gold transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
