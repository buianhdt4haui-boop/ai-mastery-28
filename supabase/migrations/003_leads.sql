-- Bảng lưu email lead thu từ trang kết quả quiz.
-- Chạy trong Supabase SQL Editor. An toàn để chạy lại.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  persona_id text,
  recommended_plan text,
  answers jsonb,
  source text default 'quiz_result',
  created_at timestamptz not null default now()
);

-- Bật RLS và KHÔNG tạo policy công khai: chỉ server (service role) ghi/đọc được.
alter table public.leads enable row level security;
