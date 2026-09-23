import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
  throw new Error(
    "As variáveis VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY são obrigatórias.",
  );
}

const isBrowser = typeof window !== "undefined";

export const supabase = createClient<Database>(url, publishableKey, {
  auth: {
    persistSession: isBrowser,
    autoRefreshToken: isBrowser,
    detectSessionInUrl: isBrowser,
  },
});
