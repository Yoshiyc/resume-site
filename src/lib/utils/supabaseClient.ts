/**
 * Supabase 客戶端配置
 * 用於連接到 Supabase 資料庫並執行各種操作
 */

import { createClient } from '@supabase/supabase-js';

// 建立 Supabase 客戶端實例
const supabaseUrl = 'https://ledrgyyfreebbncgdyvw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlZHJneXlmcmVlYmJuY2dkeXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMTA2MjksImV4cCI6MjA2NzY4NjYyOX0.Ab0bFNn8iMT6Lvmv420qmisA0_Zy1GaPeb6cR_FTD3o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 定義 Project 資料型別，對應 Supabase 中的 projects 表
export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  github_url: string;
  demo_url: string;
  created_at: string;
}

/**
 * 從 Supabase 獲取所有專案資料
 * @returns Promise<Project[]> 專案列表
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}
