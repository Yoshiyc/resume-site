/**
 * Admin Layout 伺服器端處理
 * 處理身份驗證和權限檢查
 */

import { redirect } from '@sveltejs/kit';
import { getSiteSetting } from '$lib/utils/supabaseClient';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  // 檢查是否已登入
  const isAuthenticated = cookies.get('admin_authenticated') === 'true';
  
  // 如果未登入且不是登入頁面，重導向到登入頁面
  if (!isAuthenticated && url.pathname !== '/admin/login') {
    throw redirect(302, '/admin/login');
  }
  
  // 如果已登入且在登入頁面，重導向到儀表板
  if (isAuthenticated && url.pathname === '/admin/login') {
    throw redirect(302, '/admin');
  }
  
  return {
    isAuthenticated
  };
};
