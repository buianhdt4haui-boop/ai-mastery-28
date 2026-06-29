@AGENTS.md

# ai-mastery-28

Ứng dụng web xây dựng bằng Next.js (App Router) + TypeScript + Tailwind CSS.

## Lệnh thường dùng

```bash
npm run dev     # Chạy server phát triển (mặc định http://localhost:3000)
npm run build   # Build bản production
npm run start   # Chạy bản production (cần build trước)
npm run lint    # Kiểm tra ESLint
```

## Stack & cấu hình

- **Next.js 16** — App Router (thư mục `src/app`). Đây là phiên bản mới, có thể khác tài liệu cũ; xem lưu ý trong `AGENTS.md`.
- **TypeScript** — strict mode (`tsconfig.json`).
- **Tailwind CSS v4** — cấu hình qua `@tailwindcss/postcss` (`postcss.config.mjs`), khai báo trong `src/app/globals.css`.
- **ESLint 9** — flat config (`eslint.config.mjs`), dùng `eslint-config-next`.
- **Import alias**: `@/*` trỏ tới `src/*`.

## Cấu trúc thư mục

```
src/app/
  layout.tsx     # Root layout — fonts, metadata, <html>/<body>
  page.tsx       # Trang chủ (route "/")
  globals.css    # Style toàn cục + import Tailwind
  favicon.ico
public/          # Tài nguyên tĩnh (ảnh, icon...)
```

## Quy ước

- Tạo route mới bằng cách thêm thư mục trong `src/app/` chứa `page.tsx`.
- Component mặc định là Server Component; thêm `"use client"` ở đầu file khi cần tương tác phía client (state, event, hook trình duyệt).
- Dùng alias `@/` thay cho đường dẫn tương đối dài.
