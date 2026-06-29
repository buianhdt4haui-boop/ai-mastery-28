-- =============================================================
-- AI Mastery 28 Ngày — Supabase schema (chuẩn bị sẵn cho go-live)
-- Bản demo hiện chạy local-first (localStorage). Khi tích hợp
-- Supabase, chạy file này trong SQL Editor để tạo bảng + RLS.
-- =============================================================

-- Hồ sơ học viên (liên kết với auth.users của Supabase)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  phone text,
  created_at timestamptz not null default now()
);

-- Bài học (seed từ src/data/curriculum.ts)
create table if not exists public.lessons (
  day integer primary key,
  week integer not null,
  title text not null,
  tool text not null,
  objective text not null,
  lesson_summary text not null,
  assignment text not null,
  resource_name text,
  estimated_minutes integer not null default 15
);

-- Đơn hàng
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  plan_id text not null check (plan_id in ('starter', 'pro', 'premium')),
  full_name text not null,
  email text not null,
  phone text,
  amount integer not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled')),
  payos_order_code bigint,
  created_at timestamptz not null default now()
);

-- Ghi danh (quyền truy cập khóa học)
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  plan_id text not null,
  order_id uuid references public.orders (id) on delete set null,
  enrolled_at timestamptz not null default now(),
  unique (user_id)
);

-- Tiến độ học từng bài
create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  -- 'day' không ràng buộc FK tới lessons: nội dung bài học nằm trong code,
  -- bảng lessons có thể trống nên FK sẽ chặn việc lưu tiến độ.
  day integer not null,
  completed boolean not null default false,
  completed_at timestamptz,
  primary key (user_id, day)
);

-- Chứng nhận
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  code text not null unique,
  score integer,
  total integer,
  issued_at timestamptz not null default now()
);

-- ===================== Row Level Security =====================
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.certificates enable row level security;

-- Mỗi người chỉ đọc/ghi dữ liệu của chính mình
create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "own orders" on public.orders
  for select using (auth.uid() = user_id);

create policy "own enrollment" on public.enrollments
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own progress" on public.lesson_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own certificate" on public.certificates
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Lessons công khai cho người đã đăng nhập đọc
create policy "read lessons" on public.lessons
  for select using (true);
alter table public.lessons enable row level security;

-- ============== Tự tạo hồ sơ khi có người đăng ký ==============
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
