/**
 * AWS SES Email Service
 * 處理透過 AWS SES 發送 email 的功能
 */

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { env } from '$env/dynamic/private';

// 建立 SES 客戶端
const sesClient = new SESClient({
  region: 'ap-southeast-2', // Asia Pacific (Sydney)
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY || ''
  }
});

// Email 發送介面
export interface ContactEmailData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  ip_address?: string;
  user_agent?: string;
}

/**
 * 發送聯絡表單 email 到指定信箱
 * @param contactData 聯絡表單資料
 * @returns Promise<boolean> 是否發送成功
 */
export async function sendContactEmail(contactData: ContactEmailData): Promise<{ success: boolean; error?: string }> {
  try {
    const { name, email, subject, message, ip_address, user_agent } = contactData;
    
    // 建立 email 內容
    const emailSubject = subject ? `[網站聯絡] ${subject}` : `[網站聯絡] 來自 ${name} 的訊息`;
    
    const htmlBody = `
      <!DOCTYPE html>
      <html lang="zh-TW">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>網站聯絡表單</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            text-align: center;
          }
          .field {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
            border-left: 4px solid #667eea;
          }
          .field-label {
            font-weight: bold;
            color: #495057;
            margin-bottom: 5px;
            display: block;
          }
          .field-value {
            color: #212529;
            word-wrap: break-word;
          }
          .message-content {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            border: 1px solid #dee2e6;
            white-space: pre-wrap;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            font-size: 12px;
            color: #6c757d;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">📧 網站聯絡表單</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">有新的訊息來自您的履歷網站</p>
          </div>
          
          <div class="field">
            <span class="field-label">👤 聯絡人姓名：</span>
            <div class="field-value">${name}</div>
          </div>
          
          <div class="field">
            <span class="field-label">📧 電子郵件：</span>
            <div class="field-value"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></div>
          </div>
          
          ${subject ? `
          <div class="field">
            <span class="field-label">📝 主旨：</span>
            <div class="field-value">${subject}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <span class="field-label">💬 訊息內容：</span>
            <div class="message-content">${message}</div>
          </div>
          
          <div class="footer">
            <p><strong>📊 技術資訊：</strong></p>
            ${ip_address ? `<p>🌐 IP 位址：${ip_address}</p>` : ''}
            ${user_agent ? `<p>🖥️ 瀏覽器：${user_agent}</p>` : ''}
            <p>⏰ 收到時間：${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textBody = `
網站聯絡表單 - 新訊息

聯絡人姓名：${name}
電子郵件：${email}
${subject ? `主旨：${subject}` : ''}

訊息內容：
${message}

---
技術資訊：
${ip_address ? `IP 位址：${ip_address}` : ''}
${user_agent ? `瀏覽器：${user_agent}` : ''}
收到時間：${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}
    `;

    // 建立發送指令
    const sendEmailCommand = new SendEmailCommand({
      Source: 'yongyuc7@gmail.com', // 寄件人（已驗證的 email）
      Destination: {
        ToAddresses: ['yongyuc7@gmail.com'] // 收件人
      },
      Message: {
        Subject: {
          Data: emailSubject,
          Charset: 'UTF-8'
        },
        Body: {
          Html: {
            Data: htmlBody,
            Charset: 'UTF-8'
          },
          Text: {
            Data: textBody,
            Charset: 'UTF-8'
          }
        }
      },
      ReplyToAddresses: [email] // 設定回覆地址為聯絡人的 email
    });

    // 發送 email
    const result = await sesClient.send(sendEmailCommand);
    
    console.log('Email sent successfully:', result.MessageId);
    return { success: true };

  } catch (error) {
    console.error('Failed to send email via SES:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '未知錯誤'
    };
  }
}

/**
 * 驗證 AWS SES 設定
 * @returns Promise<boolean> 設定是否正確
 */
export async function validateSESConfig(): Promise<boolean> {
  try {
    const accessKeyId = env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = env.AWS_SECRET_ACCESS_KEY;
    
    if (!accessKeyId || !secretAccessKey) {
      console.error('AWS credentials not found in environment variables');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('SES configuration validation failed:', error);
    return false;
  }
}
