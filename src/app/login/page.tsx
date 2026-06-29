import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập vào AI Mastery 28 Ngày.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <main className="flex flex-1 items-center justify-center py-16">
      <Container>
        <AuthForm mode="login" next={next} />
      </Container>
    </main>
  );
}
