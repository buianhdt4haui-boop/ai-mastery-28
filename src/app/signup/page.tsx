import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Tạo tài khoản AI Mastery 28 Ngày.",
};

export default function SignupPage() {
  return (
    <main className="flex flex-1 items-center justify-center py-16">
      <Container>
        <AuthForm mode="signup" />
      </Container>
    </main>
  );
}
