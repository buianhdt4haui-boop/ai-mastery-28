import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin-access";
import { isFreeLessonPath } from "@/lib/preview";

/** Các route yêu cầu đăng nhập. */
const PROTECTED = [
  "/dashboard",
  "/lesson",
  "/final-test",
  "/certificate",
  "/admin",
  "/checkout",
];

export async function middleware(request: NextRequest) {
  // Chưa cấu hình Supabase -> chạy chế độ demo, không chặn route nào.
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  // Ngày học thử miễn phí (vd /lesson/1) không cần đăng nhập.
  const isProtected =
    PROTECTED.some((p) => path === p || path.startsWith(`${p}/`)) &&
    !isFreeLessonPath(path);

  if (isProtected && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", path);
    return NextResponse.redirect(redirectUrl);
  }

  // /admin: chỉ cho email nằm trong ADMIN_EMAILS.
  if (
    user &&
    (path === "/admin" || path.startsWith("/admin/")) &&
    !isAdminEmail(user.email)
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  // Đã đăng nhập mà vào trang login/signup -> chuyển vào dashboard.
  if (user && (path === "/login" || path === "/signup")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
