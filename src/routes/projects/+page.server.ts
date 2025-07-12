/**
 * Projects 頁面的伺服器端載入函數
 * 在頁面渲染前從 Supabase 載入專案資料
 */

import { getProjects } from '$lib/utils/supabaseClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // 暫時返回空陣列以避免 Vercel 部署問題
  console.log('Loading projects page...');

  return {
    projects: []
  };
};
