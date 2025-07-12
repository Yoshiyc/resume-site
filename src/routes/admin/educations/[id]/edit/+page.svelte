<!--
  編輯學歷頁面
-->
<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData, ActionData } from './$types';
  
  export let data: PageData;
  export let form: ActionData;
  
  $: ({ education } = data);
  
  let isSubmitting = false;
  
  function handleSubmit() {
    isSubmitting = true;
    return async ({ update }: { update: () => Promise<void> }) => {
      isSubmitting = false;
      await update();
    };
  }
</script>

<svelte:head>
  <title>編輯學歷 - 管理後台</title>
</svelte:head>

<!-- 頁面標題 -->
<div class="mb-8">
  <div class="flex items-center space-x-4">
    <a
      href="/admin/educations"
      class="text-gray-600 hover:text-gray-900 transition-colors"
      title="返回學歷管理"
      aria-label="返回學歷管理"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </a>
    <div>
      <h1 class="text-2xl font-bold text-gray-900">編輯學歷</h1>
      <p class="mt-1 text-sm text-gray-600">修改您的教育背景資訊</p>
    </div>
  </div>
</div>

<!-- 錯誤訊息 -->
{#if form?.error}
  <div class="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
    <div class="flex">
      <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div class="ml-3">
        <p class="text-sm text-red-800">{form.error}</p>
      </div>
    </div>
  </div>
{/if}

<!-- 表單 -->
<div class="bg-white shadow rounded-lg">
  <form method="POST" use:enhance={handleSubmit} class="space-y-6 p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 學校 -->
      <div>
        <label for="school" class="block text-sm font-medium text-gray-700 mb-2">
          學校 <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="school"
          name="school"
          value={form?.data?.school || education?.school || ''}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="請輸入學校名稱"
          required
        />
      </div>

      <!-- 系所 -->
      <div>
        <label for="department" class="block text-sm font-medium text-gray-700 mb-2">
          系所
        </label>
        <input
          type="text"
          id="department"
          name="department"
          value={form?.data?.department || education?.department || ''}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="請輸入系所名稱"
        />
      </div>

      <!-- 學位 -->
      <div>
        <label for="degree" class="block text-sm font-medium text-gray-700 mb-2">
          學位 <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="degree"
          name="degree"
          value={form?.data?.degree || education?.degree || ''}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="例如：學士、碩士、博士"
          required
        />
      </div>



      <!-- 開始日期 -->
      <div>
        <label for="start_date" class="block text-sm font-medium text-gray-700 mb-2">
          開始日期 <span class="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="start_date"
          name="start_date"
          value={form?.data?.start_date || education?.start_date || ''}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <!-- 結束日期 -->
      <div>
        <label for="end_date" class="block text-sm font-medium text-gray-700 mb-2">
          結束日期
        </label>
        <input
          type="date"
          id="end_date"
          name="end_date"
          value={form?.data?.end_date || education?.end_date || ''}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p class="mt-1 text-sm text-gray-500">留空表示至今</p>
      </div>
    </div>

    <!-- 補充說明 -->
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
        補充說明
      </label>
      <textarea
        id="description"
        name="description"
        rows="4"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="可填寫主修課程、成績、獲獎記錄等..."
      >{form?.data?.description || education?.description || ''}</textarea>
    </div>

    <!-- 提交按鈕 -->
    <div class="flex justify-end space-x-4">
      <a
        href="/admin/educations"
        class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        取消
      </a>
      <button
        type="submit"
        disabled={isSubmitting}
        class="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {#if isSubmitting}
          更新中...
        {:else}
          更新學歷
        {/if}
      </button>
    </div>
  </form>
</div>
