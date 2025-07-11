/**
 * Supabase 客戶端配置
 * 用於連接到 Supabase 資料庫並執行各種操作
 */

import { createClient } from '@supabase/supabase-js';

// 建立 Supabase 客戶端實例
const supabaseUrl = 'https://ledrgyyfreebbncgdyvw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlZHJneXlmcmVlYmJuY2dkeXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMTA2MjksImV4cCI6MjA2NzY4NjYyOX0.Ab0bFNn8iMT6Lvmv420qmisA0_Zy1GaPeb6cR_FTD3o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ===== 資料型別定義 =====

// 專案資料型別
export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  github_url: string;
  demo_url: string;
  featured?: boolean;
  sort_order?: number;
  status?: 'in-progress' | 'completed' | 'archived';
  start_date?: string;
  end_date?: string;
  client?: string;
  project_type?: 'personal' | 'client' | 'open-source';
  created_at: string;
}

// 個人資訊型別
export interface AboutMe {
  id: number;
  name: string;
  title: string;
  bio?: string;
  email?: string;
  phone?: string;
  location?: string;
  avatar_url?: string;
  resume_url?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  created_at: string;
  updated_at: string;
}

// 技能型別
export interface Skill {
  id: number;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
  level: number; // 1-5
  icon_url?: string;
  description?: string;
  years_experience?: number;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// 工作經歷型別
export interface Experience {
  id: number;
  company: string;
  position: string;
  description?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  location?: string;
  company_url?: string;
  company_logo_url?: string;
  technologies?: string[];
  achievements?: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// 聯絡訊息型別
export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  is_read: boolean;
  is_replied: boolean;
  reply_message?: string;
  replied_at?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// 網站設定型別
export interface SiteSetting {
  id: number;
  key: string;
  value?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// ===== 資料操作函數 =====

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

/**
 * 獲取精選專案
 * @returns Promise<Project[]> 精選專案列表
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to fetch featured projects:', error);
    return [];
  }
}

/**
 * 獲取個人資訊
 * @returns Promise<AboutMe | null> 個人資訊
 */
export async function getAboutMe(): Promise<AboutMe | null> {
  try {
    const { data, error } = await supabase
      .from('about_me')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) throw error;
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('Failed to fetch about me:', error);
    return null;
  }
}

/**
 * 獲取技能列表
 * @param featured 是否只獲取精選技能
 * @returns Promise<Skill[]> 技能列表
 */
export async function getSkills(featured?: boolean): Promise<Skill[]> {
  try {
    let query = supabase
      .from('skills')
      .select('*')
      .order('name', { ascending: true });

    if (featured) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to fetch skills:', error);
    return [];
  }
}

/**
 * 獲取工作經歷
 * @returns Promise<Experience[]> 工作經歷列表
 */
export async function getExperiences(): Promise<Experience[]> {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('start_date', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to fetch experiences:', error);
    return [];
  }
}

/**
 * 提交聯絡表單
 * @param message 聯絡訊息
 * @returns Promise<boolean> 是否成功
 */
export async function submitContactMessage(message: Omit<ContactMessage, 'id' | 'is_read' | 'is_replied' | 'created_at'>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert([message]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to submit contact message:', error);
    return false;
  }
}

// ===== 管理後台操作函數 =====

/**
 * 獲取網站設定
 * @param key 設定鍵值
 * @returns Promise<string | null> 設定值
 */
export async function getSiteSetting(key: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .single();

    if (error) throw error;
    return data?.value || null;
  } catch (error) {
    console.error(`Failed to fetch site setting ${key}:`, error);
    return null;
  }
}

/**
 * 更新個人資訊
 * @param aboutMe 個人資訊
 * @returns Promise<boolean> 是否成功
 */
export async function updateAboutMe(aboutMe: Partial<AboutMe>): Promise<boolean> {
  try {
    // 先檢查是否有現有記錄
    const { data: existing } = await supabase
      .from('about_me')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1);

    if (existing && existing.length > 0) {
      // 如果有記錄，更新最新的一筆
      const { error } = await supabase
        .from('about_me')
        .update({ ...aboutMe, updated_at: new Date().toISOString() })
        .eq('id', existing[0].id);

      if (error) throw error;
    } else {
      // 如果沒有記錄，插入新記錄
      const { error } = await supabase
        .from('about_me')
        .insert({ ...aboutMe, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });

      if (error) throw error;
    }

    return true;
  } catch (error) {
    console.error('Failed to update about me:', error);
    return false;
  }
}

/**
 * 新增或更新專案
 * @param project 專案資料
 * @returns Promise<boolean> 是否成功
 */
export async function upsertProject(project: Partial<Project>): Promise<{ success: boolean; error?: string; details?: any }> {
  try {
    let result;

    if (project.id) {
      // 如果有 ID，更新現有專案
      console.log('Updating project with ID:', project.id, project);
      result = await supabase
        .from('projects')
        .update(project)
        .eq('id', project.id);
    } else {
      // 如果沒有 ID，新增專案
      // 移除 undefined 值以避免 RLS 問題，但保留空字串和 null
      const cleanProject = Object.fromEntries(
        Object.entries(project).filter(([_, value]) => value !== undefined)
      );

      console.log('Inserting new project:', cleanProject);

      result = await supabase
        .from('projects')
        .insert([cleanProject])
        .select(); // 加上 select() 來獲取插入的資料
    }

    if (result.error) {
      console.error('Supabase database error:', {
        message: result.error.message,
        details: result.error.details,
        hint: result.error.hint,
        code: result.error.code
      });

      return {
        success: false,
        error: result.error.message,
        details: result.error
      };
    }

    console.log('Project operation successful:', result.data);
    return { success: true };

  } catch (error) {
    console.error('Failed to upsert project - Unexpected error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '未知錯誤',
      details: error
    };
  }
}

/**
 * 刪除專案
 * @param id 專案 ID
 * @returns Promise<boolean> 是否成功
 */
export async function deleteProject(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('Attempting to delete project with ID:', id);

    const { error, data } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
      .select(); // 加上 select() 來確認刪除的資料

    if (error) {
      console.error('Supabase delete error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return {
        success: false,
        error: error.message
      };
    }

    console.log('Project deleted successfully:', data);
    return { success: true };

  } catch (error) {
    console.error('Failed to delete project - Unexpected error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '未知錯誤'
    };
  }
}

/**
 * 獲取單一專案
 * @param id 專案 ID
 * @returns Promise<Project | null> 專案資料
 */
export async function getProject(id: number): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch project:', error);
    return null;
  }
}
