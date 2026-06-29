import { PayOS } from "@payos/node";

/** True khi đã cấu hình đủ key payOS (server-only). */
export const isPayosConfigured = Boolean(
  process.env.PAYOS_CLIENT_ID &&
    process.env.PAYOS_API_KEY &&
    process.env.PAYOS_CHECKSUM_KEY,
);

export function getPayos() {
  return new PayOS({
    clientId: process.env.PAYOS_CLIENT_ID!,
    apiKey: process.env.PAYOS_API_KEY!,
    checksumKey: process.env.PAYOS_CHECKSUM_KEY!,
  });
}
