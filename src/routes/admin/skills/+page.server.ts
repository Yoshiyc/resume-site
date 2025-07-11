/**
 * Admin Skills 頁面處理
 * 載入和管理技能
 */

import { fail } from '@sveltejs/kit';
import { getSkills } from '$lib/utils/supabaseClient';
import { supabase } from '$lib/utils/supabaseClient';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    const skills = await getSkills();
    
    return {
      skills
    };
  } catch (error) {
    console.error('Failed to load skills:', error);
    return {
      skills: []
    };
  }
};

export const actions: Actions = {
  delete: async ({ request }) => {
    try {
      const data = await request.formData();
      const id = parseInt(data.get('id') as string);

      if (!id) {
        return fail(400, {
          error: '無效的技能 ID'
        });
      }

      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting skill:', error);
        return fail(500, {
          error: '刪除失敗，請稍後再試'
        });
      }

      return {
        success: true,
        message: '技能已成功刪除！'
      };

    } catch (error) {
      console.error('Delete skill error:', error);
      return fail(500, {
        error: '系統錯誤，請稍後再試'
      });
    }
  }
};
