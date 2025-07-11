/**
 * Admin Skills New 頁面處理
 * 新增技能
 */

import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/utils/supabaseClient';
import type { Actions } from './$types';

export const actions: Actions = {
  create: async ({ request }) => {
    try {
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

      // 新增技能
      const { error } = await supabase
        .from('skills')
        .insert([skillData]);

      if (error) {
        console.error('Failed to create skill:', error);
        return fail(500, {
          error: '新增失敗，請稍後再試',
          data: skillData
        });
      }

      // 成功後重導向到技能列表
      throw redirect(302, '/admin/skills?success=created');

    } catch (error) {
      if (error instanceof Response) {
        throw error; // 重導向 - 這是成功的情況
      }

      console.error('Create skill error:', error);
      return fail(500, {
        error: '系統錯誤，請稍後再試'
      });
    }
  }
};
