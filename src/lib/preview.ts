/** Các ngày học được mở miễn phí (học thử, không cần đăng nhập). */
export const FREE_PREVIEW_DAYS = [1];

export function isFreePreviewDay(day: number): boolean {
  return FREE_PREVIEW_DAYS.includes(day);
}

/** Với path dạng "/lesson/<n>", trả true nếu là ngày học thử miễn phí. */
export function isFreeLessonPath(pathname: string): boolean {
  const match = pathname.match(/^\/lesson\/(\d+)\/?$/);
  return match ? isFreePreviewDay(Number(match[1])) : false;
}
