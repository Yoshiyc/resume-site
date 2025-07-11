/**
 * About 頁面的伺服器端載入函數
 * 載入個人資訊、技能和工作經歷
 */

import { getAboutMe, getSkills, getExperiences } from '$lib/utils/supabaseClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    // 並行載入所有資料
    const [aboutMe, skills, experiences] = await Promise.all([
      getAboutMe(),
      getSkills(),
      getExperiences()
    ]);

    return {
      aboutMe,
      skills,
      experiences
    };
  } catch (error) {
    console.error('Failed to load about page data:', error);
    
    // 如果載入失敗，返回空資料避免頁面崩潰
    return {
      aboutMe: null,
      skills: [],
      experiences: []
    };
  }
};
