/**
 * Contact 頁面的伺服器端處理
 * 處理聯絡表單提交
 */

import { fail } from '@sveltejs/kit';
import { submitContactMessage, getAboutMe } from '$lib/utils/supabaseClient';
import { sendContactEmail, validateSESConfig } from '$lib/utils/emailService';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    // 載入個人聯絡資訊
    const aboutMe = await getAboutMe();
    
    return {
      aboutMe
    };
  } catch (error) {
    console.error('Failed to load contact page data:', error);
    return {
      aboutMe: null
    };
  }
};

export const actions: Actions = {
  submit: async ({ request, getClientAddress }) => {
    try {
      const data = await request.formData();
      const name = data.get('name') as string;
      const email = data.get('email') as string;
      const subject = data.get('subject') as string;
      const message = data.get('message') as string;

      // 基本驗證
      if (!name || !email || !message) {
        return fail(400, {
          error: '請填寫所有必填欄位',
          name,
          email,
          subject,
          message
        });
      }

      // 驗證 email 格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return fail(400, {
          error: '請輸入有效的電子郵件地址',
          name,
          email,
          subject,
          message
        });
      }

      // 準備聯絡資料
      const contactData = {
        name,
        email,
        subject,
        message,
        ip_address: getClientAddress(),
        user_agent: request.headers.get('user-agent') || undefined
      };

      // 驗證 AWS SES 設定
      const sesConfigResult = await validateSESConfig();
      console.log('SES Config Validation Result:', sesConfigResult);

      if (!sesConfigResult.valid) {
        console.error('AWS SES configuration is invalid:', sesConfigResult.details);
        return fail(500, {
          error: `Email 服務設定錯誤：${sesConfigResult.details.error || '請檢查 AWS 憑證設定'}`,
          name,
          email,
          subject,
          message
        });
      }

      // 並行處理：同時發送 email 和儲存到資料庫
      const [emailResult, dbResult] = await Promise.allSettled([
        sendContactEmail(contactData),
        submitContactMessage(contactData)
      ]);

      // 檢查 email 發送結果
      let emailSuccess = false;
      let emailError = '';

      if (emailResult.status === 'fulfilled') {
        emailSuccess = emailResult.value.success;
        emailError = emailResult.value.error || '';
      } else {
        emailError = emailResult.reason?.message || '發送失敗';
      }

      // 檢查資料庫儲存結果
      let dbSuccess = false;
      if (dbResult.status === 'fulfilled') {
        dbSuccess = dbResult.value;
      }

      // 如果 email 發送失敗，返回錯誤
      if (!emailSuccess) {
        console.error('Email sending failed:', emailError);
        return fail(500, {
          error: `訊息發送失敗：${emailError}`,
          name,
          email,
          subject,
          message
        });
      }

      // 如果資料庫儲存失敗，記錄警告但不影響用戶體驗
      if (!dbSuccess) {
        console.warn('Database storage failed, but email was sent successfully');
      }

      return {
        success: true,
        message: '訊息已成功發送到我的信箱！我會盡快回覆您。'
      };

    } catch (error) {
      console.error('Contact form submission error:', error);
      return fail(500, {
        error: '系統錯誤，請稍後再試'
      });
    }
  }
};
