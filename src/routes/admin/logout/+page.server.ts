/**
 * Admin Logout 處理
 * 清除登入狀態並重導向
 */

import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ cookies }) => {
    // 清除登入 cookie
    cookies.delete('admin_authenticated', { path: '/admin' });
    
    // 重導向到登入頁面
    throw redirect(302, '/admin/login');
  }
};
