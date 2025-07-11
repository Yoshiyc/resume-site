<!--
  管理後台 - 新增技能
-->
<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';
  
  export let form: ActionData;
  
  let isSubmitting = false;
  
  // 處理表單提交
  function handleSubmit() {
    isSubmitting = true;
    return async ({ result, update }: any) => {
      isSubmitting = false;
      await update();
    };
  }
</script>

<!-- 頁面標題 -->
<div class="mb-8">
  <div class="flex items-center space-x-4">
    <a 
      href="/admin/skills" 
      class="text-gray-600 hover:text-gray-900"
      title="返回技能列表"
      aria-label="返回技能列表"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </a>
    <div>
      <h1 class="text-2xl font-bold text-gray-900">新增技能</h1>
      <p class="text-gray-600 mt-1">建立一個新的技能項目</p>
    </div>
  </div>
</div>

<!-- 錯誤訊息 -->
{#if form?.error}
  <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
    <div class="flex items-center">
      <svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p class="text-red-800">{form.error}</p>
    </div>
  </div>
{/if}

<form method="POST" action="?/create" use:enhance={handleSubmit} class="space-y-8">
  <!-- 基本資訊 -->
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-medium text-gray-900 mb-6">基本資訊</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 技能名稱 -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
          技能名稱 <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={(form as any)?.data?.name || ''}
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="例如：JavaScript"
        />
      </div>
      
      <!-- 分類 -->
      <div>
        <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
          分類 <span class="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">請選擇分類</option>
          <option value="frontend" selected={(form as any)?.data?.category === 'frontend'}>前端開發</option>
          <option value="backend" selected={(form as any)?.data?.category === 'backend'}>後端開發</option>
          <option value="database" selected={(form as any)?.data?.category === 'database'}>資料庫</option>
          <option value="devops" selected={(form as any)?.data?.category === 'devops'}>DevOps</option>
          <option value="design" selected={(form as any)?.data?.category === 'design'}>設計</option>
          <option value="other" selected={(form as any)?.data?.category === 'other'}>其他</option>
        </select>
      </div>
      
      <!-- 技能等級 -->
      <div>
        <label for="level" class="block text-sm font-medium text-gray-700 mb-2">
          技能等級
        </label>
        <select
          id="level"
          name="level"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="1" selected={(form as any)?.data?.level === 1}>1 - 初學者</option>
          <option value="2" selected={(form as any)?.data?.level === 2}>2 - 基礎</option>
          <option value="3" selected={(form as any)?.data?.level === 3}>3 - 中等</option>
          <option value="4" selected={(form as any)?.data?.level === 4}>4 - 熟練</option>
          <option value="5" selected={(form as any)?.data?.level === 5}>5 - 專家</option>
        </select>
      </div>
      
      <!-- 經驗年數 -->
      <div>
        <label for="years_experience" class="block text-sm font-medium text-gray-700 mb-2">
          經驗年數
        </label>
        <input
          type="number"
          id="years_experience"
          name="years_experience"
          value={(form as any)?.data?.years_experience || 0}
          min="0"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="0"
        />
      </div>
      
      <!-- 圖標 URL -->
      <div class="md:col-span-2">
        <label for="icon_url" class="block text-sm font-medium text-gray-700 mb-2">
          圖標 URL
        </label>
        <input
          type="url"
          id="icon_url"
          name="icon_url"
          value={(form as any)?.data?.icon_url || ''}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com/icon.svg"
        />
      </div>
      
      <!-- 描述 -->
      <div class="md:col-span-2">
        <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
          描述
        </label>
        <textarea
          id="description"
          name="description"
          rows="3"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="簡單描述這個技能..."
        >{(form as any)?.data?.description || ''}</textarea>
      </div>
    </div>
  </div>
  
  <!-- 設定 -->
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-medium text-gray-900 mb-6">設定</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 排序順序 -->
      <div>
        <label for="sort_order" class="block text-sm font-medium text-gray-700 mb-2">
          排序順序
        </label>
        <input
          type="number"
          id="sort_order"
          name="sort_order"
          value={(form as any)?.data?.sort_order || 0}
          min="0"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="0"
        />
        <p class="text-xs text-gray-500 mt-1">數字越小排序越前面</p>
      </div>
      
      <!-- 精選技能 -->
      <div class="flex items-center">
        <input
          type="checkbox"
          id="is_featured"
          name="is_featured"
          checked={(form as any)?.data?.is_featured || false}
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label for="is_featured" class="ml-2 block text-sm text-gray-900">
          設為精選技能
        </label>
      </div>
    </div>
  </div>
  
  <!-- 提交按鈕 -->
  <div class="flex justify-end space-x-4">
    <a 
      href="/admin/skills" 
      class="btn-secondary"
    >
      取消
    </a>
    <button
      type="submit"
      disabled={isSubmitting}
      class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
    >
      {#if isSubmitting}
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        建立中...
      {:else}
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        建立技能
      {/if}
    </button>
  </div>
</form>
