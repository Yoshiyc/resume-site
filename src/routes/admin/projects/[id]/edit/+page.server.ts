/**
 * Admin Projects Edit 頁面處理
 * 編輯專案
 */

import { error, fail, redirect } from '@sveltejs/kit';
import { getProject, upsertProject } from '$lib/utils/supabaseClient';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const id = parseInt(params.id);

    if (!id) {
      throw error(404, '專案不存在');
    }

    const project = await getProject(id);

    if (!project) {
      throw error(404, '專案不存在');
    }

    return {
      project
    };
  } catch (err) {
    if (err instanceof Response) {
      throw err;
    }
    console.error('Failed to load project:', err);
    throw error(500, '載入專案失敗');
  }
};

export const actions: Actions = {
  update: async ({ request, params }) => {
    try {
      const id = parseInt(params.id);
      const data = await request.formData();

      // 處理技術棧陣列
      const techStackString = data.get('tech_stack') as string;
      const tech_stack = techStackString ? techStackString.split(',').map(tech => tech.trim()).filter(tech => tech) : [];

      const projectData = {
        id,
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

      // 更新專案
      const success = await upsertProject(projectData);

      if (!success) {
        return fail(500, {
          error: '更新失敗，請稍後再試',
          data: projectData
        });
      }

      // 成功後重導向到專案列表
      throw redirect(302, '/admin/projects?success=updated');

    } catch (error) {
      if (error instanceof Response) {
        throw error; // 重導向
      }

      console.error('Update project error:', error);
      return fail(500, {
        error: '系統錯誤，請稍後再試'
      });
    }
  }
};
