# Resume Site - 個人作品集網站

這是一個使用 SvelteKit 和 Tailwind CSS 建立的個人作品集網站，連接 Supabase 作為後端資料庫。

## 🚀 技術棧

- **前端框架**: SvelteKit
- **樣式框架**: Tailwind CSS
- **後端服務**: Supabase
- **資料庫**: PostgreSQL (透過 Supabase)
- **部署平台**: Vercel (推薦)

## 📁 專案結構

```
resume-site/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── NavBar.svelte          # 導航列元件
│   │   │   └── ProjectCard.svelte     # 專案卡片元件
│   │   └── utils/
│   │       └── supabaseClient.ts      # Supabase 客戶端配置
│   ├── routes/
│   │   ├── projects/
│   │   │   ├── +page.server.ts        # 專案頁面伺服器端載入
│   │   │   └── +page.svelte           # 專案頁面
│   │   ├── +layout.svelte             # 全域 Layout
│   │   └── +page.svelte               # 首頁
│   ├── app.css                        # 全域樣式
│   ├── app.d.ts                       # TypeScript 型別定義
│   └── app.html                       # HTML 模板
├── static/                            # 靜態資源
├── .env                              # 環境變數 (不會被提交到 Git)
├── package.json                      # 專案依賴
├── tailwind.config.js               # Tailwind CSS 配置
├── tsconfig.json                    # TypeScript 配置
└── vite.config.ts                   # Vite 配置
```

## 🗄️ 資料庫結構

### projects 表

| 欄位名稱 | 型別 | 說明 |
|---------|------|------|
| id | int8 | 主鍵，自動遞增 |
| title | text | 專案標題 |
| description | text | 專案描述 |
| image_url | text | 專案圖片 URL |
| tech_stack | text[] | 技術標籤陣列 |
| github_url | text | GitHub 連結 |
| demo_url | text | 線上展示連結 |
| created_at | timestamptz | 建立時間 (預設: now()) |

## 🛠️ 安裝與設定

1. **克隆專案**
   ```bash
   git clone https://github.com/Yoshiyc/resume-site.git
   cd resume-site
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **設定環境變數**
   
   創建 `.env` 檔案並加入以下內容：
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

5. **開啟瀏覽器**
   
   前往 `http://localhost:5173` 查看網站

## 📝 使用說明

### 新增專案資料

在 Supabase 的 `projects` 表中新增資料：

```sql
INSERT INTO projects (title, description, image_url, tech_stack, github_url, demo_url)
VALUES (
  '專案標題',
  '專案描述...',
  'https://example.com/image.jpg',
  ARRAY['React', 'TypeScript', 'Tailwind CSS'],
  'https://github.com/username/project',
  'https://project-demo.vercel.app'
);
```

### 自訂樣式

- 全域樣式：編輯 `src/app.css`
- Tailwind 配置：編輯 `tailwind.config.js`
- 元件樣式：在各個 `.svelte` 檔案中的 `<style>` 區塊

### 新增頁面

1. 在 `src/routes/` 目錄下建立新的資料夾
2. 建立 `+page.svelte` 檔案
3. 如需伺服器端資料載入，建立 `+page.server.ts` 檔案

## 🚀 部署

### Vercel 部署

1. 將程式碼推送到 GitHub
2. 在 Vercel 中匯入專案
3. 設定環境變數
4. 部署完成

### 其他平台

專案支援部署到任何支援 Node.js 的平台，如 Netlify、Railway 等。

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來改善這個專案。

## 📄 授權

MIT License

## 📞 聯絡

如有任何問題，歡迎透過以下方式聯絡：

- GitHub: [@Yoshiyc](https://github.com/Yoshiyc)
- Email: your-email@example.com
