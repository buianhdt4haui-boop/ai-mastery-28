"use client";

import type { Order, PlanId, QuizAnswers } from "@/types";
import { scoreQuiz, type QuizResult } from "./quiz-engine";
import { curriculum } from "@/data/curriculum";
import { genCertCode } from "./format";

/**
 * Lớp lưu trữ phía client bằng localStorage (local-first).
 * Mọi hàm an toàn khi chạy SSR (kiểm tra window) và phát sự kiện
 * "am28:change" để UI cập nhật real-time.
 */

const KEYS = {
  completed: "am28:completed",
  quizAnswers: "am28:quiz",
  profile: "am28:profile",
  final: "am28:final",
  enrollment: "am28:enrollment",
  orders: "am28:orders",
  certCode: "am28:cert-code",
} as const;

export interface StudentProfile {
  fullName: string;
  email: string;
}

export interface Enrollment {
  planId: PlanId;
  orderId: string;
  enrolledAt: string;
}

const CHANGE_EVENT = "am28:change";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Cache theo key để read() trả về CÙNG một tham chiếu khi chuỗi lưu trữ
 * không đổi. Bắt buộc cho useSyncExternalStore (getSnapshot phải ổn định),
 * nếu không sẽ gây "getSnapshot should be cached" / lặp vô hạn.
 */
const snapshotCache = new Map<string, { raw: string | null; value: unknown }>();

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    return fallback;
  }

  const cached = snapshotCache.get(key);
  if (cached && cached.raw === raw) return cached.value as T;

  let value: T = fallback;
  if (raw !== null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = fallback;
    }
  }
  snapshotCache.set(key, { raw, value });
  return value;
}

function write<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  } catch {
    /* ignore quota / serialization errors */
  }
}

/** Đăng ký lắng nghe mọi thay đổi trạng thái local. Trả về hàm hủy. */
export function subscribe(callback: () => void): () => void {
  if (!isBrowser()) return () => {};
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/* ----------------------------- Tiến độ học ----------------------------- */

export function getCompletedDays(): number[] {
  return read<number[]>(KEYS.completed, []);
}

export function isDayCompleted(day: number): boolean {
  return getCompletedDays().includes(day);
}

export function setDayCompleted(day: number, completed: boolean): void {
  const current = new Set(getCompletedDays());
  if (completed) current.add(day);
  else current.delete(day);
  write(
    KEYS.completed,
    [...current].sort((a, b) => a - b),
  );
}

export function toggleDay(day: number): void {
  setDayCompleted(day, !isDayCompleted(day));
}

export function getProgressPercent(): number {
  const total = curriculum.length;
  if (total === 0) return 0;
  return Math.round((getCompletedDays().length / total) * 100);
}

/** Đủ điều kiện làm bài kiểm tra cuối khi đã hoàn thành tất cả bài học. */
export function isFinalTestUnlocked(): boolean {
  return getCompletedDays().length >= curriculum.length;
}

/* ------------------------------- Quiz -------------------------------- */

export function saveQuizAnswers(answers: QuizAnswers): void {
  write(KEYS.quizAnswers, answers);
}

export function getQuizAnswers(): QuizAnswers | null {
  return read<QuizAnswers | null>(KEYS.quizAnswers, null);
}

export function getQuizResult(): QuizResult | null {
  const answers = getQuizAnswers();
  return answers ? scoreQuiz(answers) : null;
}

/* ------------------------------ Profile ------------------------------ */

export function getProfile(): StudentProfile | null {
  return read<StudentProfile | null>(KEYS.profile, null);
}

export function saveProfile(profile: StudentProfile): void {
  write(KEYS.profile, profile);
}

/* ---------------------------- Final test ----------------------------- */

export interface FinalResult {
  score: number;
  total: number;
  passed: boolean;
  completedAt: string;
}

export function getFinalResult(): FinalResult | null {
  return read<FinalResult | null>(KEYS.final, null);
}

export function saveFinalResult(result: FinalResult): void {
  write(KEYS.final, result);
}

export function hasPassedFinal(): boolean {
  return getFinalResult()?.passed ?? false;
}

/* ---------------------------- Enrollment ----------------------------- */

export function getEnrollment(): Enrollment | null {
  return read<Enrollment | null>(KEYS.enrollment, null);
}

export function saveEnrollment(enrollment: Enrollment): void {
  write(KEYS.enrollment, enrollment);
}

/* ------------------------------ Orders ------------------------------- */

export function getOrders(): Order[] {
  return read<Order[]>(KEYS.orders, []);
}

export function addOrder(order: Order): void {
  write(KEYS.orders, [order, ...getOrders()]);
}

export function updateOrderStatus(id: string, status: Order["status"]): void {
  write(
    KEYS.orders,
    getOrders().map((o) => (o.id === id ? { ...o, status } : o)),
  );
}

/* ---------------------------- Certificate ---------------------------- */

/** Đọc mã chứng nhận; tự tạo & lưu nếu chưa có. SSR-safe (trả "" nếu chưa ở client). */
export function getOrCreateCertCode(): string {
  if (!isBrowser()) return "";
  let code = read<string | null>(KEYS.certCode, null);
  if (!code) {
    code = genCertCode();
    write(KEYS.certCode, code);
  }
  return code;
}

/* ------------------------- Đồng bộ Supabase -------------------------- */

export interface RemoteSnapshot {
  completed?: number[];
  profile?: StudentProfile | null;
  enrollment?: Enrollment | null;
  final?: FinalResult | null;
  certCode?: string | null;
}

/** Ghi dữ liệu kéo từ Supabase vào localStorage (gọi khi đăng nhập). */
export function hydrateFromRemote(snapshot: RemoteSnapshot): void {
  if (snapshot.completed) write(KEYS.completed, snapshot.completed);
  if (snapshot.profile) write(KEYS.profile, snapshot.profile);
  if (snapshot.enrollment) write(KEYS.enrollment, snapshot.enrollment);
  if (snapshot.final) write(KEYS.final, snapshot.final);
  if (snapshot.certCode) write(KEYS.certCode, snapshot.certCode);
}

/** Xóa toàn bộ dữ liệu local (dùng cho nút reset khi demo). */
export function resetAll(): void {
  if (!isBrowser()) return;
  Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}
