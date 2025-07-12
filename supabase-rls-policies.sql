-- Supabase RLS 政策設定
-- 為了讓管理後台能夠正常運作，我們需要設定適當的 RLS 政策

-- 1. 暫時禁用所有表的 RLS（僅用於開發階段）
ALTER TABLE educations DISABLE ROW LEVEL SECURITY;
ALTER TABLE experiences DISABLE ROW LEVEL SECURITY;
ALTER TABLE skills DISABLE ROW LEVEL SECURITY;
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE about_me DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;

-- 或者，如果您想保持 RLS 啟用，可以使用以下政策：

-- 2. 為匿名用戶設定讀取權限（用於前端顯示）
-- CREATE POLICY "Allow anonymous read access" ON educations FOR SELECT USING (true);
-- CREATE POLICY "Allow anonymous read access" ON experiences FOR SELECT USING (true);
-- CREATE POLICY "Allow anonymous read access" ON skills FOR SELECT USING (true);
-- CREATE POLICY "Allow anonymous read access" ON projects FOR SELECT USING (true);
-- CREATE POLICY "Allow anonymous read access" ON about_me FOR SELECT USING (true);

-- 3. 為匿名用戶設定完全權限（用於管理後台，不建議在生產環境使用）
-- CREATE POLICY "Allow anonymous full access" ON educations FOR ALL USING (true);
-- CREATE POLICY "Allow anonymous full access" ON experiences FOR ALL USING (true);
-- CREATE POLICY "Allow anonymous full access" ON skills FOR ALL USING (true);
-- CREATE POLICY "Allow anonymous full access" ON projects FOR ALL USING (true);
-- CREATE POLICY "Allow anonymous full access" ON about_me FOR ALL USING (true);
-- CREATE POLICY "Allow anonymous full access" ON contact_messages FOR ALL USING (true);
-- CREATE POLICY "Allow anonymous full access" ON site_settings FOR ALL USING (true);

-- 注意：在生產環境中，您應該實施適當的身份驗證和更嚴格的 RLS 政策
