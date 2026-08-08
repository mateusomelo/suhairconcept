import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { GTM_ID, GTM_SNIPPET, avisarNavegacao } from "../lib/gtm";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      // viewport-fit=cover é o que faz env(safe-area-inset-*) devolver um
      // valor real no iPhone. Sem ele os botões fixos ficam sob a barra
      // de gestos, mesmo com o cálculo aplicado.
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      // Reforça o translate="no" do <html> para navegadores que já
      // guardaram a preferência de traduzir este site.
      { name: "google", content: "notranslate" },
      { title: "SÜ Hair Concept | Beauty Experience" },
      {
        name: "description",
        content:
          "Salão premium em Indianópolis, São Paulo. Coloração, mega hair, luzes e tratamentos capilares com atendimento exclusivo.",
      },
      { property: "og:site_name", content: "SÜ Hair Concept" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#111111" },
      { property: "og:title", content: "SÜ Hair Concept | Beauty Experience" },
      { name: "twitter:title", content: "SÜ Hair Concept | Beauty Experience" },
      {
        property: "og:description",
        content:
          "Salão premium em Indianópolis, São Paulo. Coloração, mega hair, luzes e tratamentos capilares com atendimento exclusivo.",
      },
      {
        name: "twitter:description",
        content:
          "Salão premium em Indianópolis, São Paulo. Coloração, mega hair, luzes e tratamentos capilares com atendimento exclusivo.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0c8916f9-ef1c-4cfd-b73d-c91cb95bdb0f/id-preview-564b33f7--2f719599-e399-4384-a060-c8909a93ac6c.lovable.app-1785640930630.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0c8916f9-ef1c-4cfd-b73d-c91cb95bdb0f/id-preview-564b33f7--2f719599-e399-4384-a060-c8909a93ac6c.lovable.app-1785640930630.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Montserrat:wght@300;400;500;600&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    // O site é em português. Declarar "en" fazia o Chrome traduzir a
    // página sozinho, e a tradução automática troca os nós de texto por
    // baixo do React — o que derrubava telas interativas como o /admin.
    // translate="no" é obrigatório aqui: a tradução automática do Chrome
    // substitui os nós de texto por baixo do React, que depois falha com
    // "removeChild: node is not a child of this node" e derruba a tela.
    <html lang="pt-BR" translate="no">
      <head>
        {/* O GTM pede para ficar o mais alto possível no <head>, antes de
            qualquer outra coisa — por isso vem acima do HeadContent. */}
        <script dangerouslySetInnerHTML={{ __html: GTM_SNIPPET }} />
        <HeadContent />
      </head>
      <body>
        {/* Alternativa para quem navega com JavaScript desligado. Hoje é
            quase ninguém, mas é o padrão do GTM e não custa nada. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  // location.href já é o caminho com a query em texto. Somar pathname
  // com location.search não funciona: search é um objeto de parâmetros,
  // e a concatenação derruba a renderização no servidor.
  const caminho = useRouterState({ select: (s) => s.location.href });
  const primeiraTela = useRef(true);

  // Cada troca de página vira um evento no GTM. Numa aplicação de página
  // única a navegação não recarrega nada, então sem isto o contêiner
  // registraria só a primeira tela de cada visita.
  //
  // Observar a localização em vez de router.subscribe("onResolved"):
  // aquele retorno de chamada não dispara nesta versão do roteador, e o
  // evento nunca chegava ao dataLayer.
  useEffect(() => {
    // A primeira tela já é contada pelo próprio carregamento do GTM.
    // Disparar aqui também faria a visita ser contada em dobro.
    if (primeiraTela.current) {
      primeiraTela.current = false;
      return;
    }
    // A troca do <title> acontece depois deste efeito. Com espera zero o
    // evento saía com o título da página anterior — medido no navegador.
    // 300ms é o suficiente para o título novo já estar aplicado, e curto
    // o bastante para não perder quem sai da página logo em seguida.
    const t = setTimeout(() => avisarNavegacao(caminho), 300);
    return () => clearTimeout(t);
  }, [caminho]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
