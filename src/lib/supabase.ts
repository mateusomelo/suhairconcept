import { createClient } from "@supabase/supabase-js";

// A chave publicável é pública por design — ela vai para o bundle do navegador.
// A proteção dos dados vem das políticas de RLS no banco, não do sigilo dela.
const SUPABASE_URL = "https://fblclifbsdrfgforkrja.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_nJHWnYmP2dGOECnLyvFcFA_cq8BGjrh";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false },
});

export type Avaliacao = {
  id: string;
  nota: number;
  comentario: string | null;
  nome: string | null;
  criado_em: string;
};
