/**
 * Cấu hình Supabase dùng chung cho cả client & server.
 * Tách riêng để không kéo theo code browser/server không cần thiết.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True khi đã cấu hình đủ biến môi trường Supabase. */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
