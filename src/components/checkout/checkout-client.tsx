"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Landmark, ShieldCheck, Loader2, QrCode } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { pricingPlans, formatVnd } from "@/data/pricing";
import type { PlanId } from "@/types";
import { siteConfig } from "@/lib/site";
import { saveEnrollment, saveProfile } from "@/lib/progress";
import { createCheckout } from "@/app/checkout/actions";

export function CheckoutClient({ initialPlan }: { initialPlan: PlanId }) {
  const router = useRouter();
  const [planId, setPlanId] = useState<PlanId>(initialPlan);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  const plan = pricingPlans.find((p) => p.id === planId)!;

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate(): string | null {
    if (!form.fullName.trim()) return "Vui lòng nhập họ tên.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Email chưa hợp lệ.";
    if (!/^[0-9\s+]{8,}$/.test(form.phone)) return "Số điện thoại chưa hợp lệ.";
    return null;
  }

  async function handleActivate() {
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }
    setSubmitting(true);

    const result = await createCheckout({
      planId: plan.id,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    });

    if (result.error) {
      toast.error(result.error);
      setSubmitting(false);
      return;
    }

    // payOS thật -> chuyển sang trang thanh toán.
    if (result.redirectUrl) {
      window.location.assign(result.redirectUrl);
      return;
    }

    // Mock / demo -> đã kích hoạt. Lưu local cho UI tức thì (đã đồng bộ Supabase).
    saveProfile({ fullName: form.fullName.trim(), email: form.email.trim() });
    saveEnrollment({
      planId: plan.id,
      orderId: "",
      enrolledAt: new Date().toISOString(),
    });
    toast.success("Kích hoạt khóa học thành công!");
    setTimeout(() => router.push("/dashboard"), 700);
  }

  return (
    <Container className="max-w-5xl py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Thanh toán</h1>
      <p className="mt-2 text-muted-foreground">
        Hoàn tất đăng ký để bắt đầu lộ trình 28 ngày.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Left: form + payment */}
        <div className="space-y-8">
          {/* Plan picker */}
          <section>
            <h2 className="mb-3 text-sm font-medium text-muted-foreground">
              Chọn gói
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {pricingPlans.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlanId(p.id)}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-all",
                    p.id === planId
                      ? "border-primary/60 bg-primary/10 glow"
                      : "border-white/10 bg-card/50 hover:border-primary/40",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{p.name}</span>
                    {p.recommended && <Badge className="text-[10px]">Phổ biến</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatVnd(p.price)}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* Customer info */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground">
              Thông tin của bạn
            </h2>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="email@vidu.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="09xx xxx xxx"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Payment method (mock) */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground">
              Phương thức thanh toán
            </h2>
            <Card className="border-primary/30 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 font-medium">
                  <Landmark className="h-4 w-4 text-primary" />
                  Chuyển khoản ngân hàng
                  <Badge variant="secondary" className="ml-auto text-[10px]">
                    Demo
                  </Badge>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-[140px_1fr]">
                  {/* QR placeholder */}
                  <div className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-white/20 bg-background/40 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-1">
                      <QrCode className="h-8 w-8" />
                      <span className="text-[10px]">Mã QR (demo)</span>
                    </div>
                  </div>
                  <dl className="space-y-1.5 text-sm">
                    <Row label="Ngân hàng" value={siteConfig.bankTransfer.bankName} />
                    <Row
                      label="Chủ tài khoản"
                      value={siteConfig.bankTransfer.accountName}
                    />
                    <Row
                      label="Số tài khoản"
                      value={siteConfig.bankTransfer.accountNumber}
                    />
                    <Row
                      label="Nội dung"
                      value={`AIM28 ${form.phone || "<SĐT>"}`}
                    />
                    <Row label="Số tiền" value={formatVnd(plan.price)} />
                  </dl>
                </div>

                <p className="mt-4 rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
                  Đây là luồng thanh toán mô phỏng cho bản demo. Khi tích hợp cổng
                  payOS, đơn hàng sẽ được tự động xác nhận qua webhook. Hiện tại, nhấn
                  nút bên dưới để mô phỏng việc xác nhận chuyển khoản và kích hoạt khóa
                  học ngay.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Right: summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="border-white/10 bg-card/60">
            <CardContent className="space-y-4 p-6">
              <h2 className="font-semibold">Tóm tắt đơn hàng</h2>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Gói {plan.name}</span>
                <span>{formatVnd(plan.price)}</span>
              </div>
              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between font-semibold">
                  <span>Tổng cộng</span>
                  <span className="text-lg">{formatVnd(plan.price)}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Thanh toán một lần, truy cập nội dung lâu dài.
                </p>
              </div>

              <Button
                onClick={handleActivate}
                disabled={submitting}
                size="lg"
                className="glow w-full"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Đang xử lý…
                  </>
                ) : (
                  "Tôi đã chuyển khoản — Kích hoạt"
                )}
              </Button>

              <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" />
                Thông tin của bạn được lưu an toàn trên thiết bị (bản demo)
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </Container>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
