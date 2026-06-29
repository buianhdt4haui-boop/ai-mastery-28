import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { getCurrentUser } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { signout } from "@/app/auth/actions";

/** Nút auth cho header marketing (landing, result, checkout). */
export async function MarketingAuthButtons() {
  if (!isSupabaseConfigured) {
    return (
      <ButtonLink
        href="/dashboard"
        variant="ghost"
        size="sm"
        className="hidden sm:inline-flex"
      >
        Vào học
      </ButtonLink>
    );
  }

  const user = await getCurrentUser();
  if (user) {
    return (
      <div className="flex items-center gap-1">
        <ButtonLink
          href="/dashboard"
          variant="ghost"
          size="sm"
          className="hidden sm:inline-flex"
        >
          Vào học
        </ButtonLink>
        <form action={signout}>
          <Button type="submit" variant="ghost" size="sm">
            Đăng xuất
          </Button>
        </form>
      </div>
    );
  }

  return (
    <ButtonLink href="/login" variant="ghost" size="sm">
      Đăng nhập
    </ButtonLink>
  );
}

/** Nút auth cho header khu vực học viên. */
export async function AppAuthButton() {
  if (!isSupabaseConfigured) return null;

  const user = await getCurrentUser();
  if (!user) {
    return (
      <ButtonLink href="/login" variant="ghost" size="sm">
        Đăng nhập
      </ButtonLink>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden max-w-[160px] truncate text-sm text-muted-foreground sm:inline">
        {user.email}
      </span>
      <form action={signout}>
        <Button type="submit" variant="ghost" size="sm">
          <LogOut className="mr-1 h-4 w-4" /> Đăng xuất
        </Button>
      </form>
    </div>
  );
}
