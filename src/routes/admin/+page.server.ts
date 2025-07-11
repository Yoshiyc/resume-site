/**
 * Admin Dashboard 資料載入
 * 載入儀表板統計資料
 */

import { getProjects, getSkills, getExperiences } from '$lib/utils/supabaseClient';
import { supabase } from '$lib/utils/supabaseClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    // 並行載入統計資料
    const [projects, skills, experiences] = await Promise.all([
      getProjects(),
      getSkills(),
      getExperiences()
    ]);

    // 獲取聯絡訊息統計
    const { data: messages, error: messagesError } = await supabase
      .from('contact_messages')
      .select('id, is_read, created_at')
      .order('created_at', { ascending: false });

    if (messagesError) {
      console.error('Error fetching messages:', messagesError);
    }

    // 計算統計數據
    const stats = {
      totalProjects: projects.length,
      featuredProjects: projects.filter(p => p.featured).length,
      totalSkills: skills.length,
      featuredSkills: skills.filter(s => s.is_featured).length,
      totalExperiences: experiences.length,
      currentExperiences: experiences.filter(e => e.is_current).length,
      totalMessages: messages?.length || 0,
      unreadMessages: messages?.filter(m => !m.is_read).length || 0
    };

    // 最近的聯絡訊息
    const recentMessages = messages?.slice(0, 5) || [];

    return {
      stats,
      recentMessages,
      recentProjects: projects.slice(0, 3),
      featuredSkills: skills.filter(s => s.is_featured).slice(0, 6)
    };

  } catch (error) {
    console.error('Failed to load dashboard data:', error);
    
    return {
      stats: {
        totalProjects: 0,
        featuredProjects: 0,
        totalSkills: 0,
        featuredSkills: 0,
        totalExperiences: 0,
        currentExperiences: 0,
        totalMessages: 0,
        unreadMessages: 0
      },
      recentMessages: [],
      recentProjects: [],
      featuredSkills: []
    };
  }
};
