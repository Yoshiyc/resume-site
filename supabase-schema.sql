-- Resume Site Database Schema
-- 請在 Supabase SQL Editor 中執行此檔案來建立所有必要的資料表

-- 1. 個人資訊表 (about_me)
CREATE TABLE IF NOT EXISTS about_me (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  avatar_url TEXT,
  resume_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 技能表 (skills)
CREATE TABLE IF NOT EXISTS skills (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'frontend', 'backend', 'database', 'tools', 'other'
  level INTEGER CHECK (level >= 1 AND level <= 5), -- 1-5 技能等級
  icon_url TEXT,
  description TEXT,
  years_experience INTEGER,
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 工作經歷表 (experiences)
CREATE TABLE IF NOT EXISTS experiences (
  id BIGSERIAL PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE, -- NULL 表示目前仍在職
  is_current BOOLEAN DEFAULT FALSE,
  location TEXT,
  company_url TEXT,
  company_logo_url TEXT,
  technologies TEXT[], -- 使用的技術陣列
  achievements TEXT[], -- 主要成就陣列
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 聯絡訊息表 (contact_messages)
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  is_replied BOOLEAN DEFAULT FALSE,
  reply_message TEXT,
  replied_at TIMESTAMPTZ,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. 網站設定表 (site_settings)
CREATE TABLE IF NOT EXISTS site_settings (
  id BIGSERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. 學歷表 (educations)
CREATE TABLE IF NOT EXISTS educations (
  id BIGSERIAL PRIMARY KEY,
  school TEXT NOT NULL,
  department TEXT,
  degree TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE, -- NULL 表示至今
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. 更新現有的 projects 表，新增更多欄位
ALTER TABLE projects ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'completed'; -- 'in-progress', 'completed', 'archived'
ALTER TABLE projects ADD COLUMN IF NOT EXISTS start_date DATE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS end_date DATE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS client TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_type TEXT; -- 'personal', 'client', 'open-source'

-- 建立索引以提升查詢效能
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_featured ON skills(is_featured);
CREATE INDEX IF NOT EXISTS idx_experiences_current ON experiences(is_current);
CREATE INDEX IF NOT EXISTS idx_experiences_dates ON experiences(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_educations_dates ON educations(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

-- 插入預設的個人資訊
INSERT INTO about_me (name, title, bio, email) VALUES (
  '您的姓名',
  '全端工程師',
  '我是一位熱愛技術的全端工程師，專精於現代 Web 開發技術。擁有豐富的專案經驗，致力於創造優質的用戶體驗。',
  'your-email@example.com'
) ON CONFLICT DO NOTHING;

-- 插入預設技能
INSERT INTO skills (name, category, level, is_featured) VALUES 
  ('JavaScript', 'frontend', 5, true),
  ('TypeScript', 'frontend', 4, true),
  ('SvelteKit', 'frontend', 4, true),
  ('React', 'frontend', 4, false),
  ('Vue.js', 'frontend', 3, false),
  ('Node.js', 'backend', 4, true),
  ('Python', 'backend', 3, false),
  ('PostgreSQL', 'database', 4, true),
  ('Supabase', 'database', 4, true),
  ('Git', 'tools', 5, false),
  ('Docker', 'tools', 3, false),
  ('Vercel', 'tools', 4, false)
ON CONFLICT DO NOTHING;

-- 插入預設網站設定
INSERT INTO site_settings (key, value, description) VALUES 
  ('site_title', 'Resume Site', '網站標題'),
  ('site_description', '個人作品集網站', '網站描述'),
  ('admin_password', 'admin123', '管理後台密碼（請務必修改）'),
  ('contact_email', 'your-email@example.com', '聯絡信箱'),
  ('social_github', 'https://github.com/yourusername', 'GitHub 連結'),
  ('social_linkedin', 'https://linkedin.com/in/yourusername', 'LinkedIn 連結')
ON CONFLICT (key) DO NOTHING;
