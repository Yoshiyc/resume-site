/**
 * Admin Login 頁面處理
 * 處理管理員登入驗證
 */

import { fail, redirect } from '@sveltejs/kit';
import { getSiteSetting } from '$lib/utils/supabaseClient';
import type { Actions } from './$types';

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    try {
      const data = await request.formData();
      const password = data.get('password') as string;

      if (!password) {
        return fail(400, {
          error: '請輸入密碼'
        });
      }

      // 從 Supabase 獲取管理員密碼
      const adminPassword = await getSiteSetting('admin_password');
      
      if (!adminPassword) {
        return fail(500, {
          error: '系統設定錯誤，請聯絡管理員'
        });
      }

      // 驗證密碼
      if (password !== adminPassword) {
        return fail(400, {
          error: '密碼錯誤'
        });
      }

      // 設定登入 cookie (24小時有效)
      cookies.set('admin_authenticated', 'true', {
        path: '/admin',
        maxAge: 60 * 60 * 24, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      // 重導向到管理後台
      throw redirect(302, '/admin');

    } catch (error) {
      if (error instanceof Response) {
        throw error; // 重導向
      }
      
      console.error('Login error:', error);
      return fail(500, {
        error: '登入失敗，請稍後再試'
      });
    }
  }
};
