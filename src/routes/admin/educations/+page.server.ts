/**
 * Admin Educations 頁面處理
 * 載入和管理學歷
 */

import { fail } from '@sveltejs/kit';
import { getEducations } from '$lib/utils/supabaseClient';
import { supabase } from '$lib/utils/supabaseClient';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    const educations = await getEducations();
    
    return {
      educations
    };
  } catch (error) {
    console.error('Failed to load educations:', error);
    return {
      educations: []
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
          error: '無效的學歷 ID'
        });
      }

      const { error } = await supabase
        .from('educations')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting education:', error);
        return fail(500, {
          error: '刪除失敗，請稍後再試'
        });
      }

      return {
        success: true,
        message: '學歷已成功刪除！'
      };

    } catch (error) {
      console.error('Delete education error:', error);
      return fail(500, {
        error: '系統錯誤，請稍後再試'
      });
    }
  }
};
