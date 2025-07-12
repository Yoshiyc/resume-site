/**
 * 新增學歷頁面處理
 */

import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/utils/supabaseClient';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    try {
      const data = await request.formData();
      
      const educationData = {
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

      // 新增學歷
      const { error } = await supabase
        .from('educations')
        .insert([educationData]);

      if (error) {
        console.error('Failed to create education:', error);
        return fail(500, {
          error: '新增失敗，請稍後再試',
          data: educationData
        });
      }

      // 成功後重導向到學歷管理頁面
      throw redirect(302, '/admin/educations');

    } catch (error) {
      if (error instanceof Response) {
        throw error; // 重導向
      }
      
      console.error('Create education error:', error);
      return fail(500, {
        error: '系統錯誤，請稍後再試'
      });
    }
  }
};
