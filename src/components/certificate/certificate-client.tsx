"use client";

import { useState } from "react";
import { Award, Lock, Printer, Sparkles, Pencil } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/lib/site";
import { formatDateVi } from "@/lib/format";
import {
  getFinalResult,
  getProfile,
  saveProfile,
  getOrCreateCertCode,
} from "@/lib/progress";
import { useHydrated } from "@/lib/use-store";

export function CertificateClient() {
  const hydrated = useHydrated();
  const [name, setName] = useState(() => getProfile()?.fullName ?? "Học viên");
  const [editing, setEditing] = useState(false);
  // Lazy init đọc/tạo mã chứng nhận (SSR-safe, chỉ chạy thật ở client).
  const [code] = useState(() => getOrCreateCertCode());

  const final = hydrated ? getFinalResult() : null;
  const passed = final?.passed ?? false;
  const date = final?.completedAt ?? "";

  function saveName() {
    const trimmed = name.trim() || "Học viên";
    setName(trimmed);
    const profile = getProfile();
    saveProfile({ fullName: trimmed, email: profile?.email ?? "" });
    setEditing(false);
  }

  if (!hydrated) {
    return (
      <Container className="py-24 text-center text-muted-foreground">
        Đang tải…
      </Container>
    );
  }

  if (!passed) {
    return (
      <Container className="max-w-xl py-20 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <Lock className="h-7 w-7 text-muted-foreground" />
        </span>
        <h1 className="mt-6 text-2xl font-bold">Chưa có chứng nhận</h1>
        <p className="mt-3 text-muted-foreground">
          Bạn cần hoàn thành và đạt bài kiểm tra cuối khóa để nhận chứng nhận hoàn
          thành chương trình.
        </p>
        <ButtonLink href="/final-test" className="glow mt-6">
          Làm bài kiểm tra cuối
        </ButtonLink>
      </Container>
    );
  }

  return (
    <Container className="max-w-4xl py-12">
      {/* Controls (ẩn khi in) */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold">Chứng nhận của bạn</h1>
          <p className="text-sm text-muted-foreground">
            Bạn có thể chỉnh tên và in / lưu PDF.
          </p>
        </div>
        <div className="flex gap-2">
          {editing ? (
            <div className="flex gap-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-48"
                placeholder="Tên của bạn"
              />
              <Button onClick={saveName}>Lưu</Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setEditing(true)}>
              <Pencil className="mr-1 h-4 w-4" /> Sửa tên
            </Button>
          )}
          <Button className="glow" onClick={() => window.print()}>
            <Printer className="mr-1 h-4 w-4" /> In / Lưu PDF
          </Button>
        </div>
      </div>

      {/* Certificate */}
      <div
        id="certificate"
        className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-[oklch(0.2_0.03_285)] to-[oklch(0.16_0.02_280)] p-8 text-center shadow-2xl sm:p-14 print:border-2 print:bg-white print:text-black"
      >
        {/* Decorative glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl print:hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[oklch(0.78_0.16_215)]/20 blur-3xl print:hidden"
        />

        <div className="relative">
          <div className="flex items-center justify-center gap-2 text-primary print:text-black">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-[0.3em]">
              {siteConfig.name}
            </span>
          </div>

          <span className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary print:bg-transparent print:text-black">
            <Award className="h-8 w-8" />
          </span>

          <h2 className="mt-6 text-sm uppercase tracking-widest text-muted-foreground print:text-gray-600">
            Chứng nhận hoàn thành
          </h2>
          <p className="mt-4 text-base text-muted-foreground print:text-gray-700">
            Chứng nhận rằng
          </p>
          <p className="mt-3 text-4xl font-bold text-gradient print:bg-none print:text-black">
            {name}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground print:text-gray-700">
            đã hoàn thành chương trình học{" "}
            <span className="font-semibold text-foreground print:text-black">
              “AI Mastery 28 Ngày”
            </span>{" "}
            gồm {siteConfig.totalDays} ngày học và bài kiểm tra cuối khóa.
          </p>

          <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 text-sm sm:flex-row print:border-gray-300">
            <div className="text-left">
              <p className="text-muted-foreground print:text-gray-600">Ngày hoàn thành</p>
              <p className="font-semibold">{formatDateVi(date)}</p>
            </div>
            <div className="text-left">
              <p className="text-muted-foreground print:text-gray-600">Mã chứng nhận</p>
              <p className="font-mono font-semibold">{code}</p>
            </div>
            <div className="text-left">
              <p className="text-muted-foreground print:text-gray-600">Cấp bởi</p>
              <p className="font-semibold">{siteConfig.name}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Đây là chứng nhận hoàn thành chương trình do {siteConfig.name} cấp. Đây không
        phải chứng chỉ nghề nghiệp hoặc chứng chỉ do cơ quan nhà nước công nhận.
      </p>
    </Container>
  );
}
