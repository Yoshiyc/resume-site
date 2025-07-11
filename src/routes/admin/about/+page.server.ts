/**
 * Admin About 頁面處理
 * 載入和更新個人資訊
 */

import { fail } from '@sveltejs/kit';
import { getAboutMe, updateAboutMe } from '$lib/utils/supabaseClient';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    const aboutMe = await getAboutMe();
    
    return {
      aboutMe
    };
  } catch (error) {
    console.error('Failed to load about me data:', error);
    return {
      aboutMe: null
    };
  }
};

export const actions: Actions = {
  update: async ({ request }) => {
    try {
      const data = await request.formData();
      
      const aboutMeData = {
        name: data.get('name') as string,
        title: data.get('title') as string,
        bio: data.get('bio') as string,
        email: data.get('email') as string,
        phone: data.get('phone') as string,
        location: data.get('location') as string,
        avatar_url: data.get('avatar_url') as string,
        resume_url: data.get('resume_url') as string,
        github_url: data.get('github_url') as string,
        linkedin_url: data.get('linkedin_url') as string,
        twitter_url: data.get('twitter_url') as string,
        website_url: data.get('website_url') as string
      };

      // 基本驗證
      if (!aboutMeData.name || !aboutMeData.title) {
        return fail(400, {
          error: '姓名和職稱為必填欄位',
          data: aboutMeData
        });
      }

      // 驗證 email 格式
      if (aboutMeData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(aboutMeData.email)) {
          return fail(400, {
            error: '請輸入有效的電子郵件地址',
            data: aboutMeData
          });
        }
      }

      // 更新資料
      const success = await updateAboutMe(aboutMeData);
      
      if (!success) {
        return fail(500, {
          error: '更新失敗，請稍後再試',
          data: aboutMeData
        });
      }

      return {
        success: true,
        message: '個人資訊已成功更新！'
      };

    } catch (error) {
      console.error('Update about me error:', error);
      return fail(500, {
        error: '系統錯誤，請稍後再試'
      });
    }
  }
};
