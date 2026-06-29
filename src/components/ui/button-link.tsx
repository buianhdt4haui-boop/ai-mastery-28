import Link from "next/link";
import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

/**
 * Next.js Link được style như Button.
 * Dùng thay cho `<Button asChild><Link/></Button>` vì Base UI Button
 * không hỗ trợ `asChild`. Áp buttonVariants trực tiếp lên thẻ <a>.
 */
export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>) {
  return (
    <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
