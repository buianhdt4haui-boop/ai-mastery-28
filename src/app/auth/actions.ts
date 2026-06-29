"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export interface AuthState {
  error?: string;
  message?: string;
}

const NOT_CONFIGURED =
  "Chưa cấu hình Supabase. Vui lòng thêm key vào .env.local (xem README).";

export async function login(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!isSupabaseConfigured) return { error: NOT_CONFIGURED };

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextRaw = String(formData.get("next") ?? "/dashboard");
  // Chỉ cho phép đường dẫn nội bộ để tránh open redirect.
  const next = nextRaw.startsWith("/") && !nextRaw.startsWith("//") ? nextRaw : "/dashboard";

  if (!email || !password) return { error: "Vui lòng nhập email và mật khẩu." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Email hoặc mật khẩu không đúng." };

  revalidatePath("/", "layout");
  redirect(next);
}

export async function signup(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!isSupabaseConfigured) return { error: NOT_CONFIGURED };

  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!fullName) return { error: "Vui lòng nhập họ tên." };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "Email chưa hợp lệ." };
  if (password.length < 6) return { error: "Mật khẩu cần ít nhất 6 ký tự." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (error) return { error: error.message };

  // Nếu bật xác nhận email, session sẽ null -> báo người dùng kiểm tra hộp thư.
  if (!data.session) {
    return {
      message:
        "Đã gửi email xác nhận tới hộp thư của bạn. Hãy bấm vào liên kết để kích hoạt tài khoản, sau đó đăng nhập.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signout(): Promise<void> {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  revalidatePath("/", "layout");
  redirect("/");
}
