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
  /** Título exibido pelo Google. Quando vazio, cai no `titulo`. */
  meta_title: string | null;
  /** Descrição exibida pelo Google. Quando vazia, cai no `resumo`. */
  meta_description: string | null;
  publicado: boolean;
  criado_em: string;
  atualizado_em: string;
};

/** Envia a imagem para o bucket `blog` e devolve a URL pública dela. */
export async function enviarImagem(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  // Nome sem acento/espaço e com sufixo aleatório, para não sobrescrever
  // uma imagem existente quando dois arquivos tiverem o mesmo nome.
  const base = file.name
    .replace(/\.[^.]+$/, "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  const caminho = `${base || "imagem"}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  const { error } = await supabase.storage.from("blog").upload(caminho, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;

  return supabase.storage.from("blog").getPublicUrl(caminho).data.publicUrl;
}

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
