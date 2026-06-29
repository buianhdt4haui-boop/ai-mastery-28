import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./config";

/**
 * Supabase client dùng SERVICE ROLE KEY — chỉ chạy phía server.
 * Bỏ qua RLS, dùng cho webhook (không có session user) và admin đọc mọi đơn.
 * TUYỆT ĐỐI không import vào client component.
 */
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isAdminConfigured = Boolean(SUPABASE_URL && SERVICE_KEY);

export function createAdminClient() {
  return createClient(SUPABASE_URL!, SERVICE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
