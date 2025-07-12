/**
 * Projects 頁面的伺服器端載入函數
 * 在頁面渲染前從 Supabase 載入專案資料
 */

import { getProjects } from '$lib/utils/supabaseClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    // 從 Supabase 載入所有專案資料
    const projects = await getProjects();
    
    return {
      projects
    };
  } catch (error) {
    console.error('Failed to load projects:', error);
    
    // 如果載入失敗，返回空陣列避免頁面崩潰
    return {
      projects: []
    };
  }
};
