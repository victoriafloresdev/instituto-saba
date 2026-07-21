import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-BsWcV1lP.js
var url = "https://rmeuusyuylsnuwqeadfy.supabase.co";
var publishableKey = "sb_publishable_eEj3XeOmKqv_vjUR9Ccf7Q_CgKadl4R";
var isBrowser = typeof window !== "undefined";
var supabase = createClient(url, publishableKey, { auth: {
	persistSession: isBrowser,
	autoRefreshToken: isBrowser,
	detectSessionInUrl: isBrowser
} });
//#endregion
export { supabase as t };
