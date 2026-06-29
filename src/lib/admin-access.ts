/**
 * Kiểm soát ai được vào khu vực /admin.
 * Danh sách email quản trị lấy từ biến môi trường ADMIN_EMAILS
 * (server-only, các email cách nhau bởi dấu phẩy).
 */
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}
