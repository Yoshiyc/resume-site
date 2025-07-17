/**
 * About 頁面的伺服器端載入函數
 * 載入個人資訊、技能和工作經歷
 */

import { getAboutMe, getSkills, getExperiences, getEducations, getLearningSteps, getDevCommunities, upsertEducation, deleteEducation } from '$lib/utils/supabaseClient';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  try {
    // 檢查是否已登入
    const isAuthenticated = cookies.get('admin_authenticated') === 'true';

    // 並行載入所有資料
    const [aboutMe, skills, experiences, educations, learningSteps, devCommunities] = await Promise.all([
      getAboutMe(),
      getSkills(),
      getExperiences(),
      getEducations(),
      getLearningSteps(),
      getDevCommunities()
    ]);

    return {
      aboutMe,
      skills,
      experiences,
      educations,
      learningSteps,
      devCommunities,
      isAuthenticated
    };
  } catch (error) {
    console.error('Failed to load about page data:', error);

    // 如果載入失敗，返回空資料避免頁面崩潰
    return {
      aboutMe: null,
      skills: [],
      experiences: [],
      educations: [],
      learningSteps: [],
      devCommunities: [],
      isAuthenticated: false
    };
  }
};

export const actions: Actions = {
  upsertEducation: async ({ request }) => {
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

      // 如果有 ID，表示是編輯
      const id = data.get('id');
      if (id) {
        educationData.id = parseInt(id as string);
      }

      // 基本驗證
      if (!educationData.school || !educationData.degree || !educationData.start_date) {
        return fail(400, {
          error: '學校、學位和開始日期為必填欄位',
          data: educationData
        });
      }

      const result = await upsertEducation(educationData);

      if (!result.success) {
        return fail(500, {
          error: result.error || '操作失敗，請稍後再試',
          data: educationData
        });
      }

      return {
        success: true,
        message: id ? '學歷已成功更新！' : '學歷已成功新增！'
      };

    } catch (error) {
      console.error('Upsert education error:', error);
      return fail(500, {
        error: '系統錯誤，請稍後再試'
      });
    }
  },

  deleteEducation: async ({ request }) => {
    try {
      const data = await request.formData();
      const id = parseInt(data.get('id') as string);

      if (!id) {
        return fail(400, {
          error: '無效的學歷 ID'
        });
      }

      const result = await deleteEducation(id);

      if (!result.success) {
        return fail(500, {
          error: result.error || '刪除失敗，請稍後再試'
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
