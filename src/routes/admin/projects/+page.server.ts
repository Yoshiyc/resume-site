/**
 * Admin Projects 頁面處理
 * 載入和管理專案
 */

import { fail } from '@sveltejs/kit';
import { getProjects } from '$lib/utils/supabaseClient';
import { supabase } from '$lib/utils/supabaseClient';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    const projects = await getProjects();

    return {
      projects
    };
  } catch (error) {
    console.error('Failed to load projects:', error);
    return {
      projects: []
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
          error: '無效的專案 ID'
        });
      }

      console.log('Attempting to delete project with ID:', id);

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting project:', error);
        return fail(500, {
          error: '刪除失敗，請稍後再試'
        });
      }

      return {
        success: true,
        message: '專案已成功刪除！'
      };

    } catch (error) {
      console.error('Delete project error:', error);
      return fail(500, {
        error: '系統錯誤，請稍後再試'
      });
    }
  }
};
