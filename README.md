# AI Mastery 28 Ngày

Nền tảng bán & học khóa học AI tổng hợp 28 ngày cho người Việt — MVP xây bằng
**Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui (Base UI)**.

> Bản demo chạy **local-first**: toàn bộ tiến độ học, đơn hàng và hồ sơ được lưu
> trong `localStorage` nên **chạy được ngay không cần backend**. Cấu trúc đã chuẩn
> bị sẵn để tích hợp Supabase (auth/database/storage) và payOS (thanh toán) khi
> go-live.

## ✨ Tính năng

- **Landing page** bán hàng đầy đủ section: hero, pain points, giải pháp, đối tượng,
  lợi ích, lộ trình 28 ngày, bonus, cảm nhận (minh họa), bảng giá 3 gói, FAQ, CTA.
- **Quiz cá nhân hóa** (14 câu) → trang **kết quả** hiển thị persona, lộ trình và
  gói học gợi ý.
- **Checkout** với thanh toán mô phỏng / chuyển khoản thủ công (sẵn webhook payOS).
- **Dashboard học viên**: tiến độ, danh sách 28 ngày, đánh dấu hoàn thành.
- **Trang bài học từng ngày** với mục tiêu, nội dung, bài tập, tài nguyên.
- **Bài kiểm tra cuối khóa** (mở khi hoàn thành đủ bài) + **chứng nhận** in được.
- **Admin** cơ bản: quản lý đơn hàng, học viên, bài học.
- Giao diện **dark premium, tím/neon, responsive mobile-first**.

## 🧱 Tech stack

| Lớp | Công nghệ |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Ngôn ngữ | TypeScript |
| Styling | Tailwind CSS v4 |
| UI | shadcn/ui (Base UI) + lucide-react |
| Toast | sonner |
| Lưu trữ (demo) | localStorage |
| Backend (chuẩn bị) | Supabase |
| Thanh toán (chuẩn bị) | payOS |

## 🚀 Bắt đầu

```bash
# 1. Cài dependencies
npm install

# 2. (Tùy chọn) tạo file env từ mẫu
cp .env.example .env.local

# 3. Chạy môi trường phát triển
npm run dev
```

Mở http://localhost:3000.

> Bản demo **không cần** điền `.env.local` để chạy. Chỉ cần khi tích hợp Supabase/payOS.

### Scripts

```bash
npm run dev     # Dev server
npm run build   # Build production
npm run start   # Chạy bản đã build
npm run lint    # ESLint
```

## 📂 Cấu trúc thư mục

```
src/
├─ app/
│  ├─ page.tsx              # Landing page
│  ├─ quiz/                 # Quiz cá nhân hóa
│  ├─ result/               # Kết quả lộ trình
│  ├─ checkout/             # Thanh toán (mock)
│  ├─ dashboard/            # Bảng học tập
│  ├─ lesson/[day]/         # Bài học từng ngày
│  ├─ final-test/           # Kiểm tra cuối khóa
│  ├─ certificate/          # Chứng nhận
│  ├─ admin/                # Quản trị
│  └─ api/webhooks/payos/   # Webhook payOS (stub)
├─ components/
│  ├─ ui/                   # shadcn/ui + ButtonLink
│  ├─ layout/               # Header, Footer, Container, Section
│  ├─ marketing/            # Các section landing
│  ├─ quiz/ result/ checkout/ dashboard/ lesson/ final-test/ certificate/ admin/
├─ data/                    # Seed: curriculum (28 ngày), quiz, pricing, faq, personas, final-test
├─ lib/                     # quiz-engine, progress (localStorage), supabase stub, helpers
└─ types/                   # Kiểu dữ liệu dùng chung
supabase/schema.sql         # Schema + RLS chuẩn bị sẵn
```

## 🗄️ Tích hợp Supabase (khi go-live)

1. Tạo project tại [supabase.com](https://supabase.com).
2. Vào **SQL Editor**, chạy nội dung `supabase/schema.sql` (tạo bảng, RLS và
   trigger tự tạo hồ sơ khi đăng ký).
3. Lấy URL + anon key tại **Project Settings → API**, điền vào `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
4. (Tùy chọn cho MVP) Vào **Authentication → Providers → Email**, tắt
   "Confirm email" để đăng ký xong đăng nhập được ngay (không cần email xác nhận).
5. Khởi động lại dev server. Khi đã có key, app tự bật chế độ đăng nhập:
   các trang `/login`, `/signup` hoạt động và khu vực học (`/dashboard`,
   `/lesson`, `/final-test`, `/certificate`, `/admin`) yêu cầu đăng nhập.
   Khi chưa có key, app chạy chế độ demo (không cần đăng nhập).

> Đã cài sẵn `@supabase/supabase-js` và `@supabase/ssr`. Client ở
> `src/lib/supabase/`, bảo vệ route ở `src/middleware.ts`.

## 💳 Đơn hàng & thanh toán payOS

**Đơn hàng đã lưu trên Supabase.** Luồng: checkout tạo đơn `pending` → xác nhận
thanh toán → `paid` + tạo enrollment (mở quyền học). Admin đọc mọi đơn qua
service role.

Cần thêm vào `.env.local` (lấy ở **Project Settings → API**):
```
SUPABASE_SERVICE_ROLE_KEY=...   # server-only, dùng cho webhook & admin
```
Và chạy migration `supabase/migrations/002_orders_insert_policy.sql`.

- **Chưa nối payOS**: checkout chạy chế độ *mock* — xác nhận thanh toán ngay
  (mô phỏng webhook) để test toàn bộ luồng. Cần `SUPABASE_SERVICE_ROLE_KEY`.
- **Khi có payOS** (sau khi được duyệt merchant tại [payos.vn](https://payos.vn)):
  1. Lấy `CLIENT_ID`, `API_KEY`, `CHECKSUM_KEY`, điền vào `.env.local`.
  2. App tự chuyển sang tạo payment link thật (`src/app/checkout/actions.ts`).
  3. Khai báo URL webhook trong dashboard payOS: `https://<domain>/api/webhooks/payos`
     (xử lý ở `src/app/api/webhooks/payos/route.ts`, xác thực chữ ký bằng SDK).

## ▲ Deploy lên Vercel

1. Push code lên GitHub.
2. Vào [vercel.com](https://vercel.com) → **New Project** → import repo.
3. Thêm Environment Variables (nếu dùng Supabase/payOS).
4. Deploy. Vercel tự nhận diện Next.js.

## ⚖️ Lưu ý tuân thủ (compliance)

- Nội dung **không cam kết/đảm bảo thu nhập**, không hứa kết quả chắc chắn.
- Phần cảm nhận học viên trên landing là **nội dung minh họa**, cần thay bằng
  đánh giá thật (có sự đồng ý) trước khi go-live.
- Chứng nhận là **chứng nhận hoàn thành chương trình**, **không phải** chứng chỉ
  nghề nghiệp hay chứng chỉ do cơ quan nhà nước công nhận.
- Toàn bộ thương hiệu, nội dung, hình ảnh là nguyên gốc, không sao chép đối thủ.

---

Tạo trong khuôn khổ MVP. Thay nội dung mẫu, thông tin ngân hàng và liên hệ thật
trước khi đưa vào sử dụng.
