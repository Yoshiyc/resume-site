# 📧 AWS SES Email 功能部署設定指南

## 🚀 功能概述

您的履歷網站現在已整合 AWS SES email 發送功能！當使用者透過聯絡表單發送訊息時，系統會：

1. 透過 AWS SES 將表單內容發送到您的 Gmail (yongyuc7@gmail.com)
2. 同時將訊息儲存到 Supabase 資料庫
3. 提供美觀的 HTML email 格式和純文字備份

## ⚙️ Vercel 環境變數設定

### 步驟 1：登入 Vercel Dashboard
1. 前往 [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. 選擇您的 `resume-site` 專案

### 步驟 2：設定環境變數
1. 點擊 **Settings** 標籤
2. 在左側選單點擊 **Environment Variables**
3. 新增以下兩個環境變數：

#### 變數 1：AWS_ACCESS_KEY_ID
- **Name**: `AWS_ACCESS_KEY_ID`
- **Value**: `您的 AWS Access Key ID`
- **Environment**: 選擇 `Production`, `Preview`, `Development` (全選)

#### 變數 2：AWS_SECRET_ACCESS_KEY
- **Name**: `AWS_SECRET_ACCESS_KEY`
- **Value**: `您的 AWS Secret Access Key`
- **Environment**: 選擇 `Production`, `Preview`, `Development` (全選)

### 步驟 3：重新部署
設定完環境變數後，Vercel 會自動觸發重新部署。

## 🧪 測試功能

### 方法 1：使用測試頁面
1. 部署完成後，訪問：`https://your-site.vercel.app/test-email`
2. 點擊「發送測試郵件」按鈕
3. 檢查您的 Gmail 信箱是否收到測試郵件

### 方法 2：使用聯絡表單
1. 訪問：`https://your-site.vercel.app/contact`
2. 填寫並提交聯絡表單
3. 檢查 Gmail 信箱是否收到表單內容

## 📧 Email 內容格式

發送的 email 包含：
- **主旨**：`[網站聯絡] 主旨內容` 或 `[網站聯絡] 來自 姓名 的訊息`
- **寄件人**：yongyuc7@gmail.com
- **收件人**：yongyuc7@gmail.com
- **回覆地址**：聯絡人的 email（方便直接回覆）
- **內容**：
  - 聯絡人姓名
  - 電子郵件
  - 主旨（如有）
  - 訊息內容
  - 技術資訊（IP、瀏覽器、時間）

## 🔧 故障排除

### 如果 email 發送失敗：

1. **檢查 AWS 憑證**
   - 確認 Vercel 環境變數設定正確
   - 確認 AWS Access Key 有效且具有 SES 權限

2. **檢查 AWS SES 設定**
   - 確認 yongyuc7@gmail.com 已在 AWS SES 中驗證
   - 確認 SES 區域設定為 `ap-southeast-2` (Sydney)
   - 如果是沙盒模式，確認收件人 email 也已驗證

3. **檢查 IAM 權限**
   - 確認 IAM 用戶具有以下權限：
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Action": [
             "ses:SendEmail",
             "ses:SendRawEmail"
           ],
           "Resource": "*"
         }
       ]
     }
     ```

4. **查看錯誤日誌**
   - 在 Vercel Dashboard 的 Functions 標籤查看錯誤日誌
   - 檢查瀏覽器開發者工具的 Console

## 📱 功能特色

- ✅ 美觀的 HTML email 模板
- ✅ 純文字備份版本
- ✅ 響應式 email 設計
- ✅ 自動設定回覆地址
- ✅ 包含技術資訊（IP、瀏覽器、時間）
- ✅ 並行處理（email + 資料庫）
- ✅ 完整的錯誤處理
- ✅ 測試工具頁面

## 🎯 下一步

1. 設定 Vercel 環境變數
2. 測試 email 功能
3. 如有問題，檢查故障排除指南
4. 享受自動化的聯絡表單功能！

---

**注意**：請勿將 AWS 憑證提交到 Git 儲存庫中。`.env` 檔案已加入 `.gitignore`。
