/**
 * Admin Skills Edit 頁面處理
 * 編輯技能
 */

import { error, fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/utils/supabaseClient';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const id = parseInt(params.id);
    
    if (!id) {
      throw error(404, '技能不存在');
    }
    
    const { data: skill, error: skillError } = await supabase
      .from('skills')
      .select('*')
      .eq('id', id)
      .single();

    if (skillError) {
      console.error('Error fetching skill:', skillError);
      throw error(404, '技能不存在');
    }
    
    return {
      skill
    };
  } catch (err) {
    if (err instanceof Response) {
      throw err;
    }
    console.error('Failed to load skill:', err);
    throw error(500, '載入技能失敗');
  }
};

export const actions: Actions = {
  update: async ({ request, params }) => {
    try {
      const id = parseInt(params.id);
      const data = await request.formData();
      
      const skillData = {
        name: data.get('name') as string,
        category: data.get('category') as string,
        level: parseInt(data.get('level') as string) || 1,
        icon_url: data.get('icon_url') as string,
        description: data.get('description') as string,
        years_experience: parseInt(data.get('years_experience') as string) || 0,
        is_featured: data.get('is_featured') === 'on',
        sort_order: parseInt(data.get('sort_order') as string) || 0
      };

      // 基本驗證
      if (!skillData.name || !skillData.category) {
        return fail(400, {
          error: '技能名稱和分類為必填欄位',
          data: skillData
        });
      }

      // 更新技能
      const { error: updateError } = await supabase
        .from('skills')
        .update(skillData)
        .eq('id', id);
      
      if (updateError) {
        console.error('Failed to update skill:', updateError);
        return fail(500, {
          error: '更新失敗，請稍後再試',
          data: skillData
        });
      }

      // 成功後重導向到技能列表
      throw redirect(302, '/admin/skills?success=updated');

    } catch (error) {
      if (error instanceof Response) {
        throw error; // 重導向
      }
      
      console.error('Update skill error:', error);
      return fail(500, {
        error: '系統錯誤，請稍後再試'
      });
    }
  }
};
