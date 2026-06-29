"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, Loader2, CheckCircle2, Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getQuizAnswers } from "@/lib/progress";
import { captureLead } from "@/app/result/actions";

const LEAD_KEY = "am28:lead-captured";

export function EmailCapture({
  personaId,
  recommendedPlan,
}: {
  personaId?: string;
  recommendedPlan?: string;
}) {
  // Đã thu email trước đó? (đọc 1 lần lúc khởi tạo, an toàn SSR)
  const [done, setDone] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return Boolean(window.localStorage.getItem(LEAD_KEY));
  });
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      toast.error("Email chưa hợp lệ.");
      return;
    }
    setLoading(true);
    const res = await captureLead({
      email: email.trim(),
      personaId,
      recommendedPlan,
      answers: getQuizAnswers() ?? undefined,
    });
    setLoading(false);

    if (res.error) {
      toast.error(res.error);
      return;
    }
    try {
      window.localStorage.setItem(LEAD_KEY, email.trim());
    } catch {
      /* ignore */
    }
    setDone(true);
    toast.success("Đã lưu! Chúng tôi sẽ gửi lộ trình & tài nguyên tới email của bạn.");
  }

  if (done) {
    return (
      <Card className="mt-6 border-primary/30 bg-primary/5">
        <CardContent className="flex items-center gap-3 p-6">
          <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
          <div>
            <p className="font-medium">Đã nhận email của bạn 🎉</p>
            <p className="text-sm text-muted-foreground">
              Lộ trình 28 ngày và bộ tài nguyên khởi đầu sẽ được gửi tới bạn.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6 border-[oklch(0.78_0.16_215)]/40 bg-card/60 glow-neon">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[oklch(0.78_0.16_215)]/15 text-[oklch(0.78_0.16_215)]">
            <Gift className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-semibold">Nhận lộ trình + tài nguyên miễn phí qua email</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Để lại email để nhận bản lộ trình 28 ngày cá nhân hóa và bộ prompt
              khởi đầu. Miễn phí, có thể hủy nhận bất cứ lúc nào.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@cuaban.com"
              className="pl-9"
              autoComplete="email"
              required
            />
          </div>
          <Button type="submit" className="glow shrink-0" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Đang gửi…
              </>
            ) : (
              "Nhận lộ trình"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
