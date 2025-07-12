/**
 * Contact 頁面的伺服器端處理
 * 處理聯絡表單提交
 */

import { fail } from '@sveltejs/kit';
import { submitContactMessage, getAboutMe } from '$lib/utils/supabaseClient';
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

      // 提交到 Supabase
      const success = await submitContactMessage({
        name,
        email,
        subject,
        message,
        ip_address: getClientAddress(),
        user_agent: request.headers.get('user-agent') || undefined
      });

      if (!success) {
        return fail(500, {
          error: '訊息發送失敗，請稍後再試',
          name,
          email,
          subject,
          message
        });
      }

      return {
        success: true,
        message: '訊息已成功發送！我會盡快回覆您。'
      };

    } catch (error) {
      console.error('Contact form submission error:', error);
      return fail(500, {
        error: '系統錯誤，請稍後再試'
      });
    }
  }
};
