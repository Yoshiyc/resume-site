/**
 * Admin Messages 頁面處理
 * 管理聯絡訊息
 */

import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/utils/supabaseClient';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    const { data: messages, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }

    return {
      messages: messages || []
    };
  } catch (error) {
    console.error('Failed to load messages:', error);
    return {
      messages: []
    };
  }
};

export const actions: Actions = {
  markAsRead: async ({ request }) => {
    try {
      const data = await request.formData();
      const id = parseInt(data.get('id') as string);

      if (!id) {
        return fail(400, {
          error: '無效的訊息 ID'
        });
      }

      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', id);

      if (error) {
        console.error('Error marking message as read:', error);
        return fail(500, {
          error: '標記失敗，請稍後再試'
        });
      }

      return {
        success: true,
        message: '訊息已標記為已讀'
      };

    } catch (error) {
      console.error('Mark as read error:', error);
      return fail(500, {
        error: '系統錯誤，請稍後再試'
      });
    }
  },

  reply: async ({ request }) => {
    try {
      const data = await request.formData();
      const id = parseInt(data.get('id') as string);
      const replyMessage = data.get('reply_message') as string;

      if (!id || !replyMessage) {
        return fail(400, {
          error: '請填寫回覆內容'
        });
      }

      const { error } = await supabase
        .from('contact_messages')
        .update({ 
          is_replied: true,
          reply_message: replyMessage,
          replied_at: new Date().toISOString(),
          is_read: true
        })
        .eq('id', id);

      if (error) {
        console.error('Error replying to message:', error);
        return fail(500, {
          error: '回覆失敗，請稍後再試'
        });
      }

      return {
        success: true,
        message: '回覆已儲存'
      };

    } catch (error) {
      console.error('Reply error:', error);
      return fail(500, {
        error: '系統錯誤，請稍後再試'
      });
    }
  },

  delete: async ({ request }) => {
    try {
      const data = await request.formData();
      const id = parseInt(data.get('id') as string);

      if (!id) {
        return fail(400, {
          error: '無效的訊息 ID'
        });
      }

      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting message:', error);
        return fail(500, {
          error: '刪除失敗，請稍後再試'
        });
      }

      return {
        success: true,
        message: '訊息已刪除'
      };

    } catch (error) {
      console.error('Delete message error:', error);
      return fail(500, {
        error: '系統錯誤，請稍後再試'
      });
    }
  }
};
