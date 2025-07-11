/**
 * Admin Projects New 頁面處理
 * 新增專案
 */

import { fail, redirect } from '@sveltejs/kit';
import { upsertProject } from '$lib/utils/supabaseClient';
import type { Actions } from './$types';

export const actions: Actions = {
  create: async ({ request }) => {
    try {
      const data = await request.formData();

      // 處理技術棧陣列
      const techStackString = data.get('tech_stack') as string;
      const tech_stack = techStackString ? techStackString.split(',').map(tech => tech.trim()).filter(tech => tech) : [];

      const projectData = {
        title: data.get('title') as string,
        description: data.get('description') as string,
        image_url: data.get('image_url') as string,
        tech_stack,
        github_url: data.get('github_url') as string,
        demo_url: data.get('demo_url') as string,
        featured: data.get('featured') === 'on',
        status: (data.get('status') as 'in-progress' | 'completed' | 'archived') || 'completed',
        project_type: (data.get('project_type') as 'personal' | 'client' | 'open-source') || 'personal',
        client: data.get('client') as string,
        start_date: data.get('start_date') as string || null,
        end_date: data.get('end_date') as string || null,
        sort_order: parseInt(data.get('sort_order') as string) || 0
      };

      // 基本驗證
      if (!projectData.title || !projectData.description) {
        return fail(400, {
          error: '專案標題和描述為必填欄位',
          data: projectData
        });
      }

      // 新增專案
      console.log('Attempting to create project with data:', projectData);
      const result = await upsertProject(projectData);

      if (!result.success) {
        console.error('Failed to create project:', {
          error: result.error,
          details: result.details,
          projectData
        });

        // 根據錯誤類型提供更具體的錯誤訊息
        let userFriendlyError = result.error || '新增失敗，請稍後再試';

        // 處理常見的 Supabase 錯誤
        if (result.error?.includes('violates row-level security')) {
          userFriendlyError = '權限不足，無法新增專案。請檢查資料庫設定。';
        } else if (result.error?.includes('duplicate key')) {
          userFriendlyError = '專案已存在，請檢查專案標題是否重複。';
        } else if (result.error?.includes('not-null constraint')) {
          userFriendlyError = '必填欄位不能為空，請檢查表單內容。';
        } else if (result.error?.includes('foreign key constraint')) {
          userFriendlyError = '資料關聯錯誤，請聯絡系統管理員。';
        }

        return fail(500, {
          error: userFriendlyError,
          technicalError: result.error, // 技術錯誤訊息，可選擇是否顯示
          data: projectData
        });
      }

      // 成功後重導向到專案列表
      throw redirect(302, '/admin/projects?success=created');

    } catch (error) {
      if (error instanceof Response) {
        throw error; // 重導向
      }

      console.error('Create project error:', error);
      return fail(500, {
        error: '系統錯誤，請稍後再試'
      });
    }
  }
};
