"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, signup, type AuthState } from "@/app/auth/actions";

const initial: AuthState = {};

export function AuthForm({
  mode,
  next,
}: {
  mode: "login" | "signup";
  next?: string;
}) {
  const action = mode === "login" ? login : signup;
  const [state, formAction, pending] = useActionState(action, initial);

  const isLogin = mode === "login";

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-8 flex flex-col items-center text-center">
        <Link href="/" className="mb-4 flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary glow">
            <Sparkles className="h-5 w-5" />
          </span>
          AI Mastery 28 Ngày
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">
          {isLogin ? "Đăng nhập" : "Tạo tài khoản"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isLogin
            ? "Đăng nhập để tiếp tục lộ trình học của bạn."
            : "Tạo tài khoản để bắt đầu và lưu tiến độ học."}
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        {next && <input type="hidden" name="next" value={next} />}

        {!isLogin && (
          <div className="grid gap-2">
            <Label htmlFor="fullName">Họ và tên</Label>
            <Input id="fullName" name="fullName" placeholder="Nguyễn Văn A" required />
          </div>
        )}

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="email@vidu.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder={isLogin ? "Mật khẩu" : "Tối thiểu 6 ký tự"}
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
          />
        </div>

        {state.error && (
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.error}
          </p>
        )}
        {state.message && (
          <p className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
            {state.message}
          </p>
        )}

        <Button type="submit" className="glow w-full" size="lg" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Đang xử lý…
            </>
          ) : isLogin ? (
            "Đăng nhập"
          ) : (
            "Tạo tài khoản"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {isLogin ? (
          <>
            Chưa có tài khoản?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Đăng ký
            </Link>
          </>
        ) : (
          <>
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Đăng nhập
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
