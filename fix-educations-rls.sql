-- 修正學歷表的 RLS 問題
-- 在 Supabase SQL Editor 中執行此腳本

-- 禁用 educations 表的 Row Level Security
ALTER TABLE educations DISABLE ROW LEVEL SECURITY;

-- 驗證 RLS 狀態（可選）
-- SELECT schemaname, tablename, rowsecurity 
-- FROM pg_tables 
-- WHERE tablename IN ('projects', 'skills', 'experiences', 'educations');
