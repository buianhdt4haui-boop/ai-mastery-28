"use client";

import { useEffect } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { subscribe } from "@/lib/progress";
import { pullAll, pushAll } from "@/lib/sync";

/**
 * Đồng bộ tiến độ học giữa localStorage và Supabase khi đã đăng nhập.
 * - Kéo dữ liệu về trước (pull), rồi mới đăng ký listener đẩy lên (push)
 *   để tránh vòng lặp echo.
 * - Không làm gì nếu chưa cấu hình Supabase hoặc chưa đăng nhập.
 */
export function SyncProvider() {
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const supabase = createClient();
    let cancelled = false;
    let unsubscribe = () => {};
    let pushTimer: ReturnType<typeof setTimeout> | undefined;

    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || cancelled) return;

      // 1) Kéo dữ liệu Supabase -> localStorage (chưa có listener nên không echo).
      await pullAll(supabase, user.id);
      if (cancelled) return;

      // 2) Đăng ký đẩy thay đổi local lên Supabase (debounce).
      unsubscribe = subscribe(() => {
        clearTimeout(pushTimer);
        pushTimer = setTimeout(() => {
          void pushAll(supabase, user.id);
        }, 600);
      });
    })();

    return () => {
      cancelled = true;
      clearTimeout(pushTimer);
      unsubscribe();
    };
  }, []);

  return null;
}
