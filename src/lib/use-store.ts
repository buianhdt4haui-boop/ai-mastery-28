"use client";

import { useSyncExternalStore } from "react";
import { subscribe } from "./progress";

/**
 * Hook đọc trạng thái từ localStorage và tự re-render khi có thay đổi.
 * `serverSnapshot` được trả về trong lúc SSR / hydrate đầu tiên để tránh mismatch.
 */
export function useStore<T>(getSnapshot: () => T, serverSnapshot: T): T {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
}

const emptySubscribe = () => () => {};

/**
 * Trả về false trong lúc SSR / hydrate, true sau khi đã ở client.
 * Dùng để đọc dữ liệu localStorage trong render an toàn mà không cần
 * setState trong useEffect.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
