/**
 * Email 測試 API 路由
 * 用於測試 AWS SES 設定是否正確
 */

import { json } from '@sveltejs/kit';
import { sendContactEmail, validateSESConfig } from '$lib/utils/emailService';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    // 驗證 SES 設定
    const configResult = await validateSESConfig();
    console.log('Test Email - SES Config Result:', configResult);

    if (!configResult.valid) {
      return json({
        success: false,
        error: 'AWS SES 設定無效，請檢查環境變數',
        details: configResult.details
      }, { status: 500 });
    }

    // 發送測試 email
    const testEmailData = {
      name: '測試用戶',
      email: 'test@example.com',
      subject: 'Email 功能測試',
      message: '這是一封測試郵件，用於驗證 AWS SES 整合是否正常運作。\n\n如果您收到這封郵件，表示設定成功！',
      ip_address: '127.0.0.1',
      user_agent: 'Test Agent'
    };

    const result = await sendContactEmail(testEmailData);

    if (result.success) {
      return json({
        success: true,
        message: '測試郵件發送成功！請檢查您的信箱。'
      });
    } else {
      return json({
        success: false,
        error: result.error || '發送失敗'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Test email API error:', error);
    return json({
      success: false,
      error: error instanceof Error ? error.message : '未知錯誤'
    }, { status: 500 });
  }
};
