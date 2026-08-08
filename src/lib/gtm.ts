/**
 * Google Tag Manager.
 *
 * O contêiner é a única coisa instalada aqui. Analytics, pixel do Ads e
 * pixel da Meta entram por dentro do painel do GTM, não pelo código —
 * foi assim que o salão pediu, e é o que evita ter que publicar o site
 * de novo a cada ferramenta nova.
 *
 * O ID não é segredo: ele aparece no código-fonte para qualquer
 * visitante. Por isso fica aqui, e não em variável de ambiente.
 */
export const GTM_ID = "GTM-TZB7QPTK";

/** Snippet oficial do GTM, para o <head>. */
export const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Avisa o GTM que a visitante trocou de página.
 *
 * Este site é uma aplicação de página única: ir da home para o mega
 * hair não recarrega nada, então o GTM contaria a visita inteira como
 * uma única exibição. Sem este evento os relatórios nascem errados — e
 * número errado é pior que número nenhum, porque vira decisão.
 */
export function avisarNavegacao(caminho: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "spa_page_view",
    page_path: caminho,
    page_title: document.title,
  });
}
