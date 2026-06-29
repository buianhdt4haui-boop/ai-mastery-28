-- Cho phép học viên TẠO đơn hàng của chính mình (status pending).
-- Việc cập nhật sang 'paid' do server (service role / webhook) thực hiện,
-- nên KHÔNG cấp quyền update cho user.
-- Chạy trong Supabase SQL Editor. An toàn để chạy lại.

drop policy if exists "insert own orders" on public.orders;
create policy "insert own orders" on public.orders
  for insert with check (auth.uid() = user_id);
