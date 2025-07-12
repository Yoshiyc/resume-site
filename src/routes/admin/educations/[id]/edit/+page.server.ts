/**
 * 編輯學歷頁面處理
 */

import { error, fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/utils/supabaseClient';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const id = parseInt(params.id);
    
    if (!id) {
      throw error(404, '學歷不存在');
    }
    
    const { data: education, error: educationError } = await supabase
      .from('educations')
      .select('*')
      .eq('id', id)
      .single();

    if (educationError) {
      console.error('Error fetching education:', educationError);
      throw error(404, '學歷不存在');
    }
    
    return {
      education
    };
  } catch (err) {
    if (err instanceof Response) {
      throw err;
    }
    console.error('Failed to load education:', err);
    throw error(500, '載入學歷失敗');
  }
};

export const actions: Actions = {
  default: async ({ request, params }) => {
    try {
      const id = parseInt(params.id);
      const data = await request.formData();
      
      const educationData = {
        id,
        school: data.get('school') as string,
        department: data.get('department') as string,
        degree: data.get('degree') as string,
        start_date: data.get('start_date') as string,
        end_date: data.get('end_date') as string || null,
        description: data.get('description') as string
      };

      // 基本驗證
      if (!educationData.school || !educationData.degree || !educationData.start_date) {
        return fail(400, {
          error: '學校、學位和開始日期為必填欄位',
          data: educationData
        });
      }

      // 更新學歷
      const { error: updateError } = await supabase
        .from('educations')
        .update(educationData)
        .eq('id', id);

      if (updateError) {
        console.error('Failed to update education:', updateError);
        return fail(500, {
          error: '更新失敗，請稍後再試',
          data: educationData
        });
      }

      // 成功後重導向到學歷管理頁面
      throw redirect(302, '/admin/educations');

    } catch (error) {
      if (error instanceof Response) {
        throw error; // 重導向
      }
      
      console.error('Update education error:', error);
      return fail(500, {
        error: '系統錯誤，請稍後再試'
      });
    }
  }
};
