/** Các hàm định dạng & sinh mã dùng chung. */

export function formatDateVi(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

/** Mã ngắn ngẫu nhiên (dùng cho id đơn hàng demo). */
export function genId(prefix = "ord"): string {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}_${Date.now().toString(36).toUpperCase()}${rand}`;
}

/** Mã chứng nhận dạng AIM28-XXXXXX. */
export function genCertCode(): string {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `AIM28-${rand}`;
}
