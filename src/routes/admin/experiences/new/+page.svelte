<!--
  管理後台 - 新增工作經歷
-->
<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let form: ActionData;

  let isSubmitting = false;
  let isCurrent = false;

  // 處理表單提交
  function handleSubmit() {
    isSubmitting = true;
    return async ({ result, update }: any) => {
      isSubmitting = false;
      await update();
    };
  }

  // 當目前職位狀態改變時，清空結束日期
  $: if (isCurrent) {
    // 如果是目前職位，清空結束日期欄位
    const endDateInput = document.getElementById(
      "end_date",
    ) as HTMLInputElement;
    if (endDateInput) {
      endDateInput.value = "";
    }
  }
</script>

<!-- 頁面標題 -->
<div class="mb-8">
  <div class="flex items-center space-x-4">
    <a
      href="/admin/experiences"
      class="text-gray-600 hover:text-gray-900"
      title="返回經歷列表"
      aria-label="返回經歷列表"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </a>
    <div>
      <h1 class="text-2xl font-bold text-gray-900">新增工作經歷</h1>
      <p class="text-gray-600 mt-1">建立一個新的工作經歷</p>
    </div>
  </div>
</div>

<!-- 錯誤訊息 -->
{#if form?.error}
  <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
    <div class="flex items-center">
      <svg
        class="w-5 h-5 text-red-400 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <p class="text-red-800">{form.error}</p>
    </div>
  </div>
{/if}

<form
  method="POST"
  action="?/create"
  use:enhance={handleSubmit}
  class="space-y-8"
>
  <!-- 基本資訊 -->
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-medium text-gray-900 mb-6">基本資訊</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 公司名稱 -->
      <div>
        <label
          for="company"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          公司名稱 <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={(form as any)?.data?.company || ""}
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="例如：科技公司"
        />
      </div>

      <!-- 職位 -->
      <div>
        <label
          for="position"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          職位 <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="position"
          name="position"
          value={(form as any)?.data?.position || ""}
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="例如：全端工程師"
        />
      </div>

      <!-- 地點 -->
      <div>
        <label
          for="location"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          地點
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={(form as any)?.data?.location || ""}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="台北市, 台灣"
        />
      </div>

      <!-- 公司網站 -->
      <div>
        <label
          for="company_url"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          公司網站
        </label>
        <input
          type="url"
          id="company_url"
          name="company_url"
          value={(form as any)?.data?.company_url || ""}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://company.com"
        />
      </div>

      <!-- 公司 Logo -->
      <div class="md:col-span-2">
        <label
          for="company_logo_url"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          公司 Logo URL
        </label>
        <input
          type="url"
          id="company_logo_url"
          name="company_logo_url"
          value={(form as any)?.data?.company_logo_url || ""}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://company.com/logo.png"
        />
      </div>

      <!-- 工作描述 -->
      <div class="md:col-span-2">
        <label
          for="description"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          工作描述
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="描述您在這個職位的工作內容和職責..."
          >{(form as any)?.data?.description || ""}</textarea
        >
      </div>
    </div>
  </div>

  <!-- 時間和技術 -->
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-medium text-gray-900 mb-6">時間和技術</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 開始日期 -->
      <div>
        <label
          for="start_date"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          開始日期 <span class="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="start_date"
          name="start_date"
          value={(form as any)?.data?.start_date || ""}
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <!-- 結束日期 -->
      <div>
        <label
          for="end_date"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          結束日期
        </label>
        <input
          type="date"
          id="end_date"
          name="end_date"
          value={(form as any)?.data?.end_date || ""}
          disabled={isCurrent}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
        />
      </div>

      <!-- 目前職位 -->
      <div class="md:col-span-2">
        <div class="flex items-center">
          <input
            type="checkbox"
            id="is_current"
            name="is_current"
            bind:checked={isCurrent}
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="is_current" class="ml-2 block text-sm text-gray-900">
            這是我目前的職位
          </label>
        </div>
      </div>

      <!-- 使用技術 -->
      <div class="md:col-span-2">
        <label
          for="technologies"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          使用技術
        </label>
        <input
          type="text"
          id="technologies"
          name="technologies"
          value={(form as any)?.data?.technologies?.join(", ") || ""}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="JavaScript, React, Node.js, PostgreSQL"
        />
        <p class="text-xs text-gray-500 mt-1">使用逗號分隔多個技術</p>
      </div>

      <!-- 主要成就 -->
      <div class="md:col-span-2">
        <label
          for="achievements"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          主要成就
        </label>
        <textarea
          id="achievements"
          name="achievements"
          rows="4"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="每行一個成就項目&#10;例如：&#10;開發了新的用戶管理系統&#10;提升系統效能 30%&#10;帶領 5 人團隊完成專案"
          >{(form as any)?.data?.achievements?.join("\n") || ""}</textarea
        >
        <p class="text-xs text-gray-500 mt-1">每行一個成就項目</p>
      </div>
    </div>
  </div>

  <!-- 設定 -->
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-medium text-gray-900 mb-6">設定</h3>

    <div>
      <label
        for="sort_order"
        class="block text-sm font-medium text-gray-700 mb-2"
      >
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
  </div>

  <!-- 提交按鈕 -->
  <div class="flex justify-end space-x-4">
    <a href="/admin/experiences" class="btn-secondary"> 取消 </a>
    <button
      type="submit"
      disabled={isSubmitting}
      class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
    >
      {#if isSubmitting}
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        建立中...
      {:else}
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        建立經歷
      {/if}
    </button>
  </div>
</form>
