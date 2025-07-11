<!--
  管理後台 - 新增專案
-->
<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let form: ActionData;

  let isSubmitting = false;
  let validationErrors: Record<string, string> = {};

  // 表單驗證函數
  function validateForm(formData: FormData): boolean {
    validationErrors = {};

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const githubUrl = formData.get("github_url") as string;
    const demoUrl = formData.get("demo_url") as string;
    const imageUrl = formData.get("image_url") as string;

    // 必填欄位驗證
    if (!title?.trim()) {
      validationErrors.title = "專案標題為必填欄位";
    }

    if (!description?.trim()) {
      validationErrors.description = "專案描述為必填欄位";
    }

    // URL 格式驗證
    const urlPattern = /^https?:\/\/.+/;

    if (githubUrl && !urlPattern.test(githubUrl)) {
      validationErrors.github_url =
        "請輸入有效的 GitHub URL（需以 http:// 或 https:// 開頭）";
    }

    if (demoUrl && !urlPattern.test(demoUrl)) {
      validationErrors.demo_url =
        "請輸入有效的展示 URL（需以 http:// 或 https:// 開頭）";
    }

    if (imageUrl && !urlPattern.test(imageUrl)) {
      validationErrors.image_url =
        "請輸入有效的圖片 URL（需以 http:// 或 https:// 開頭）";
    }

    return Object.keys(validationErrors).length === 0;
  }

  // 處理表單提交
  function handleSubmit() {
    isSubmitting = true;
    return async ({ update }: any) => {
      isSubmitting = false;
      await update();
    };
  }

  // 處理表單提交前的驗證
  function handleFormSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    if (!validateForm(formData)) {
      event.preventDefault();
      return false;
    }

    return true;
  }
</script>

<!-- 頁面標題 -->
<div class="mb-8">
  <div class="flex items-center space-x-4">
    <a
      href="/admin/projects"
      class="text-gray-600 hover:text-gray-900"
      title="返回專案列表"
      aria-label="返回專案列表"
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
      <h1 class="text-2xl font-bold text-gray-900">新增專案</h1>
      <p class="text-gray-600 mt-1">建立一個新的專案作品</p>
    </div>
  </div>
</div>

<!-- 錯誤訊息 -->
{#if form?.error}
  <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
    <div class="flex items-start">
      <svg
        class="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0"
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
      <div class="flex-1">
        <p class="text-red-800 font-medium">{form.error}</p>

        <!-- 顯示技術錯誤訊息（開發模式） -->
        {#if (form as any)?.technicalError && (form as any)?.technicalError !== form.error}
          <details class="mt-2">
            <summary
              class="text-red-600 text-sm cursor-pointer hover:text-red-800"
            >
              顯示技術詳情
            </summary>
            <div
              class="mt-2 p-3 bg-red-100 rounded text-red-700 text-sm font-mono"
            >
              {(form as any).technicalError}
            </div>
          </details>
        {/if}

        <!-- 建議解決方案 -->
        <div class="mt-3 text-red-700 text-sm">
          <p class="font-medium">建議解決方案：</p>
          <ul class="list-disc list-inside mt-1 space-y-1">
            <li>檢查所有必填欄位是否已填寫</li>
            <li>確認專案標題不與現有專案重複</li>
            <li>檢查網址格式是否正確</li>
            <li>如果問題持續，請聯絡系統管理員</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
{/if}

<form
  method="POST"
  action="?/create"
  use:enhance={handleSubmit}
  on:submit={handleFormSubmit}
  class="space-y-8"
>
  <!-- 基本資訊 -->
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-medium text-gray-900 mb-6">基本資訊</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 專案標題 -->
      <div class="md:col-span-2">
        <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
          專案標題 <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={(form as any)?.data?.title || ""}
          required
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent {validationErrors.title
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300'}"
          placeholder="請輸入專案標題"
        />
        {#if validationErrors.title}
          <p class="mt-1 text-sm text-red-600">{validationErrors.title}</p>
        {/if}
      </div>

      <!-- 專案描述 -->
      <div class="md:col-span-2">
        <label
          for="description"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          專案描述 <span class="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          required
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none {validationErrors.description
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300'}"
          placeholder="詳細描述這個專案..."
          >{(form as any)?.data?.description || ""}</textarea
        >
        {#if validationErrors.description}
          <p class="mt-1 text-sm text-red-600">
            {validationErrors.description}
          </p>
        {/if}
      </div>

      <!-- 專案圖片 -->
      <div>
        <label
          for="image_url"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          專案圖片 URL
        </label>
        <input
          type="url"
          id="image_url"
          name="image_url"
          value={(form as any)?.data?.image_url || ""}
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent {validationErrors.image_url
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300'}"
          placeholder="https://example.com/project-image.jpg"
        />
        {#if validationErrors.image_url}
          <p class="mt-1 text-sm text-red-600">{validationErrors.image_url}</p>
        {:else}
          <p class="text-xs text-gray-500 mt-1">建議尺寸：800x600 像素</p>
        {/if}
      </div>

      <!-- 技術棧 -->
      <div>
        <label
          for="tech_stack"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          技術棧
        </label>
        <input
          type="text"
          id="tech_stack"
          name="tech_stack"
          value={(form as any)?.data?.tech_stack?.join(", ") || ""}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="React, TypeScript, Tailwind CSS"
        />
        <p class="text-xs text-gray-500 mt-1">使用逗號分隔多個技術</p>
      </div>
    </div>
  </div>

  <!-- 連結資訊 -->
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-medium text-gray-900 mb-6">連結資訊</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- GitHub URL -->
      <div>
        <label
          for="github_url"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          GitHub 連結
        </label>
        <input
          type="url"
          id="github_url"
          name="github_url"
          value={(form as any)?.data?.github_url || ""}
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent {validationErrors.github_url
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300'}"
          placeholder="https://github.com/username/project"
        />
        {#if validationErrors.github_url}
          <p class="mt-1 text-sm text-red-600">{validationErrors.github_url}</p>
        {/if}
      </div>

      <!-- Demo URL -->
      <div>
        <label
          for="demo_url"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          線上展示連結
        </label>
        <input
          type="url"
          id="demo_url"
          name="demo_url"
          value={(form as any)?.data?.demo_url || ""}
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent {validationErrors.demo_url
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300'}"
          placeholder="https://project-demo.vercel.app"
        />
        {#if validationErrors.demo_url}
          <p class="mt-1 text-sm text-red-600">{validationErrors.demo_url}</p>
        {/if}
      </div>
    </div>
  </div>

  <!-- 專案設定 -->
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-medium text-gray-900 mb-6">專案設定</h3>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- 專案狀態 -->
      <div>
        <label
          for="status"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          專案狀態
        </label>
        <select
          id="status"
          name="status"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option
            value="completed"
            selected={(form as any)?.data?.status === "completed"}
            >已完成</option
          >
          <option
            value="in-progress"
            selected={(form as any)?.data?.status === "in-progress"}
            >進行中</option
          >
          <option
            value="archived"
            selected={(form as any)?.data?.status === "archived"}>已封存</option
          >
        </select>
      </div>

      <!-- 專案類型 -->
      <div>
        <label
          for="project_type"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          專案類型
        </label>
        <select
          id="project_type"
          name="project_type"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option
            value="personal"
            selected={(form as any)?.data?.project_type === "personal"}
            >個人專案</option
          >
          <option
            value="client"
            selected={(form as any)?.data?.project_type === "client"}
            >客戶專案</option
          >
          <option
            value="open-source"
            selected={(form as any)?.data?.project_type === "open-source"}
            >開源專案</option
          >
        </select>
      </div>

      <!-- 排序順序 -->
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

    <!-- 精選專案 -->
    <div class="mt-6">
      <div class="flex items-center">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={(form as any)?.data?.featured || false}
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label for="featured" class="ml-2 block text-sm text-gray-900">
          設為精選專案
        </label>
      </div>
      <p class="text-xs text-gray-500 mt-1">精選專案會在首頁和特殊位置顯示</p>
    </div>
  </div>

  <!-- 提交按鈕 -->
  <div class="flex justify-end space-x-4">
    <a href="/admin/projects" class="btn-secondary"> 取消 </a>
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
        建立專案
      {/if}
    </button>
  </div>
</form>
