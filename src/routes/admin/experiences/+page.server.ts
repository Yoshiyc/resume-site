/**
 * Admin Experiences 頁面處理
 * 載入和管理工作經歷
 */

import { fail } from '@sveltejs/kit';
import { getExperiences } from '$lib/utils/supabaseClient';
import { supabase } from '$lib/utils/supabaseClient';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    const experiences = await getExperiences();
    
    return {
      experiences
    };
  } catch (error) {
    console.error('Failed to load experiences:', error);
    return {
      experiences: []
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
          error: '無效的經歷 ID'
        });
      }

      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting experience:', error);
        return fail(500, {
          error: '刪除失敗，請稍後再試'
        });
      }

      return {
        success: true,
        message: '工作經歷已成功刪除！'
      };

    } catch (error) {
      console.error('Delete experience error:', error);
      return fail(500, {
        error: '系統錯誤，請稍後再試'
      });
    }
  }
};
