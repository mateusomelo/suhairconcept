import { createClient } from "@supabase/supabase-js";

// A chave publicável é pública por design — ela vai para o bundle do navegador.
// A proteção dos dados vem das políticas de RLS no banco, não do sigilo dela.
const SUPABASE_URL = "https://fblclifbsdrfgforkrja.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_nJHWnYmP2dGOECnLyvFcFA_cq8BGjrh";

// persistSession mantém a proprietária logada no /admin entre visitas.
// No servidor não há localStorage, então o cliente do SSR fica anônimo —
// que é justamente o que queremos: ele só enxerga posts publicados.
const noBrowser = typeof window === "undefined";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: !noBrowser,
    autoRefreshToken: !noBrowser,
    detectSessionInUrl: !noBrowser,
  },
});

export type Avaliacao = {
  id: string;
  nota: number;
  comentario: string | null;
  nome: string | null;
  criado_em: string;
};

export type Post = {
  id: string;
  slug: string;
  titulo: string;
  resumo: string | null;
  conteudo: string;
  imagem_url: string | null;
  publicado: boolean;
  criado_em: string;
  atualizado_em: string;
};

/** Gera o slug da URL a partir do título: "Cuidados no Verão" -> "cuidados-no-verao" */
export function gerarSlug(titulo: string): string {
  return titulo
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
