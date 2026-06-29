-- Migration vá lỗi đồng bộ (chạy trong Supabase SQL Editor nếu bạn đã chạy
-- schema.sql bản đầu). An toàn để chạy lại nhiều lần.

-- 1) Cho phép học viên TẠO/SỬA chứng nhận của chính mình (không chỉ đọc).
drop policy if exists "own certificate" on public.certificates;
create policy "own certificate" on public.certificates
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 2) Bỏ ràng buộc khóa ngoại lesson_progress.day -> lessons.day.
--    Nội dung bài học nằm trong code; bảng lessons có thể trống nên FK này
--    sẽ chặn việc lưu tiến độ học.
alter table public.lesson_progress
  drop constraint if exists lesson_progress_day_fkey;
