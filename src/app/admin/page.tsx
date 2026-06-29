import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { AdminClient } from "@/components/admin/admin-client";
import { redirect } from "next/navigation";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin-access";
import type { Order } from "@/types";

export const metadata: Metadata = {
  title: "Quản trị",
  description: "Bảng điều khiển quản trị AI Mastery 28 Ngày.",
  robots: { index: false, follow: false },
};

interface OrderRow {
  id: string;
  plan_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  amount: number;
  status: Order["status"];
  created_at: string;
}

/** Đọc mọi đơn hàng từ Supabase qua service role (bỏ qua RLS). */
async function fetchRemoteOrders(): Promise<Order[] | null> {
  if (!isAdminConfigured) return null;
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("orders")
    .select("id,plan_id,full_name,email,phone,amount,status,created_at")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[admin] fetch orders failed", error.message);
    return [];
  }
  return (data as OrderRow[]).map((o) => ({
    id: o.id,
    planId: o.plan_id as Order["planId"],
    fullName: o.full_name,
    email: o.email,
    phone: o.phone ?? "",
    amount: o.amount,
    status: o.status,
    createdAt: o.created_at,
  }));
}

export default async function AdminPage() {
  // Chặn truy cập nếu không phải admin (chỉ khi đã bật Supabase).
  if (isSupabaseConfigured) {
    const user = await getCurrentUser();
    if (!isAdminEmail(user?.email)) redirect("/dashboard");
  }

  const remoteOrders = await fetchRemoteOrders();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <ShieldCheck className="h-4 w-4" />
            </span>
            Admin · AI Mastery 28
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Về trang chủ
          </Link>
        </Container>
      </header>
      <main className="flex-1">
        <AdminClient remoteOrders={remoteOrders} />
      </main>
      <SiteFooter />
    </>
  );
}
