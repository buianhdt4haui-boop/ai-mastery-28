import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config";

export { isSupabaseConfigured } from "./config";

/** Tạo Supabase client phía trình duyệt (dùng trong client component). */
export function createClient() {
  return createBrowserClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
}
