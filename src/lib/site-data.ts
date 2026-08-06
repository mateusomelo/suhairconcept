/**
 * Endereço público do site. Usado nas tags canonical, og:url e no
 * sitemap — o Google trata esse valor como o endereço oficial de cada
 * página. Ao migrar para domínio próprio, troque só esta linha.
 */
export const BASE_URL = "https://suhairconcept.netlify.app";

export const SITE = {
  name: "SÜ Hair Concept",
  tagline: "Beauty Experience",
  phone: "(11) 5042-1518",
  phoneHref: "tel:+551150421518",
  whatsappNumero: "5511914981956",
  whatsapp: "https://wa.me/5511914981956?text=Ola%20gostaria%20de%20agendar%20um%20hor%C3%A1rio",
  instagram: "https://www.instagram.com/suhairconcept/",
  // Link curto do Perfil da Empresa no Google: abre a caixa de avaliação
  // direto, sem a cliente precisar procurar o botão na ficha do Maps.
  googleReview: "https://g.page/r/CWAhutpsG6bREB0/review",
  address: {
    street: "Av. Pavão, 362",
    district: "Indianópolis",
    city: "São Paulo - SP",
    zip: "04516-010",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Av.+Pavão,+362+-+Indianópolis,+São+Paulo+-+SP,+04516-010",
  mapsEmbed:
    "https://www.google.com/maps?q=Av.+Pav%C3%A3o,+362+-+Indian%C3%B3polis,+S%C3%A3o+Paulo+-+SP,+04516-010&output=embed",
};

/**
 * Monta o link do WhatsApp com uma mensagem própria da página.
 *
 * Serve como rastreamento sem depender de ferramenta: a mensagem já
 * chega dizendo de onde a cliente veio, então dá para saber qual página
 * gerou o contato lendo a própria conversa.
 */
export function whatsappUrl(mensagem: string): string {
  return `https://wa.me/${SITE.whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
}

/** Mensagens por página, conforme as diretrizes de otimização. */
export const WHATSAPP = {
  geral: whatsappUrl(
    "Olá! Acessei o site da SÜ Hair Concept e gostaria de consultar horários.",
  ),
  megahair: whatsappUrl(
    "Olá! Acessei a página de Mega Hair da SÜ Hair Concept e gostaria de consultar horários.",
  ),
  unhas: whatsappUrl(
    "Olá! Acessei a página de Alongamento de Unhas da SÜ Hair Concept e gostaria de consultar horários.",
  ),
  blog: whatsappUrl(
    "Olá! Li uma matéria no blog da SÜ Hair Concept e gostaria de consultar horários.",
  ),
};

export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Blog", href: "/blog" },
  { label: "Resultados", href: "#resultados" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Localização", href: "#localizacao" },
];

/** Editável: horários de funcionamento */
export const HOURS = [
  { day: "Segunda-feira", time: "09h — 20h" },
  { day: "Terça-feira", time: "09h — 20h" },
  { day: "Quarta-feira", time: "09h — 20h" },
  { day: "Quinta-feira", time: "09h — 21h" },
  { day: "Sexta-feira", time: "09h — 21h" },
  { day: "Sábado", time: "08h — 19h" },
  { day: "Domingo", time: "Fechado" },
];
