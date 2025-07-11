/**
 * Admin Experiences Edit 頁面處理
 * 編輯工作經歷
 */

import { error, fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/utils/supabaseClient';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const id = parseInt(params.id);
    
    if (!id) {
      throw error(404, '工作經歷不存在');
    }
    
    const { data: experience, error: experienceError } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', id)
      .single();

    if (experienceError) {
      console.error('Error fetching experience:', experienceError);
      throw error(404, '工作經歷不存在');
    }
    
    return {
      experience
    };
  } catch (err) {
    if (err instanceof Response) {
      throw err;
    }
    console.error('Failed to load experience:', err);
    throw error(500, '載入工作經歷失敗');
  }
};

export const actions: Actions = {
  update: async ({ request, params }) => {
    try {
      const id = parseInt(params.id);
      const data = await request.formData();
      
      // 處理技術陣列
      const technologiesString = data.get('technologies') as string;
      const technologies = technologiesString ? technologiesString.split(',').map(tech => tech.trim()).filter(tech => tech) : [];
      
      // 處理成就陣列
      const achievementsString = data.get('achievements') as string;
      const achievements = achievementsString ? achievementsString.split('\n').map(achievement => achievement.trim()).filter(achievement => achievement) : [];
      
      const experienceData = {
        company: data.get('company') as string,
        position: data.get('position') as string,
        description: data.get('description') as string,
        start_date: data.get('start_date') as string,
        end_date: data.get('end_date') as string || null,
        is_current: data.get('is_current') === 'on',
        location: data.get('location') as string,
        company_url: data.get('company_url') as string,
        company_logo_url: data.get('company_logo_url') as string,
        technologies,
        achievements,
        sort_order: parseInt(data.get('sort_order') as string) || 0
      };

      // 基本驗證
      if (!experienceData.company || !experienceData.position || !experienceData.start_date) {
        return fail(400, {
          error: '公司名稱、職位和開始日期為必填欄位',
          data: experienceData
        });
      }

      // 如果是目前職位，清空結束日期
      if (experienceData.is_current) {
        experienceData.end_date = null;
      }

      // 更新經歷
      const { error: updateError } = await supabase
        .from('experiences')
        .update(experienceData)
        .eq('id', id);
      
      if (updateError) {
        console.error('Failed to update experience:', updateError);
        return fail(500, {
          error: '更新失敗，請稍後再試',
          data: experienceData
        });
      }

      // 成功後重導向到經歷列表
      throw redirect(302, '/admin/experiences?success=updated');

    } catch (error) {
      if (error instanceof Response) {
        throw error; // 重導向
      }
      
      console.error('Update experience error:', error);
      return fail(500, {
        error: '系統錯誤，請稍後再試'
      });
    }
  }
};
