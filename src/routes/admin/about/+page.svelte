<!--
  管理後台 - 個人資訊編輯
-->
<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData, ActionData } from "./$types";

  export let data: PageData;
  export let form: ActionData;

  $: ({ aboutMe } = data);

  let isSubmitting = false;
  let showSuccess = false;

  // 處理表單提交
  function handleSubmit() {
    isSubmitting = true;
    return async ({ result, update }) => {
      isSubmitting = false;

      if (result.type === "success") {
        showSuccess = true;
        setTimeout(() => {
          showSuccess = false;
        }, 3000);
      }

      await update();
    };
  }
</script>

<!-- 成功訊息 -->
{#if showSuccess || form?.success}
  <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
    <div class="flex items-center">
      <svg
        class="w-5 h-5 text-green-400 mr-2"
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
      <p class="text-green-800">
        {form?.message || "個人資訊已成功更新！"}
      </p>
    </div>
  </div>
{/if}

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
  action="?/update"
  use:enhance={handleSubmit}
  class="space-y-8"
>
  <!-- 基本資訊 -->
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-medium text-gray-900 mb-6">基本資訊</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 姓名 -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
          姓名 <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={(form as any)?.data?.name || aboutMe?.name || ""}
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="請輸入您的姓名"
        />
      </div>

      <!-- 職稱 -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
          職稱 <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={(form as any)?.data?.title || aboutMe?.title || ""}
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="例如：全端工程師"
        />
      </div>

      <!-- 電子郵件 -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          電子郵件
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={(form as any)?.data?.email || aboutMe?.email || ""}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="your-email@example.com"
        />
      </div>

      <!-- 電話 -->
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
          電話
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={(form as any)?.data?.phone || aboutMe?.phone || ""}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="+886 912 345 678"
        />
      </div>

      <!-- 地點 -->
      <div class="md:col-span-2">
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
          value={(form as any)?.data?.location || aboutMe?.location || ""}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="台北市, 台灣"
        />
      </div>
    </div>

    <!-- 個人簡介 -->
    <div class="mt-6">
      <label for="bio" class="block text-sm font-medium text-gray-700 mb-2">
        個人簡介
      </label>
      <textarea
        id="bio"
        name="bio"
        rows="4"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        placeholder="簡單介紹您的背景和專長..."
        >{(form as any)?.data?.bio || aboutMe?.bio || ""}</textarea
      >
    </div>
  </div>

  <!-- 圖片和檔案 -->
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-medium text-gray-900 mb-6">圖片和檔案</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 頭像 URL -->
      <div>
        <label
          for="avatar_url"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          頭像圖片 URL
        </label>
        <input
          type="url"
          id="avatar_url"
          name="avatar_url"
          value={(form as any)?.data?.avatar_url || aboutMe?.avatar_url || ""}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com/avatar.jpg"
        />
        <p class="text-xs text-gray-500 mt-1">建議尺寸：400x400 像素</p>
      </div>

      <!-- 履歷 URL -->
      <div>
        <label
          for="resume_url"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          履歷檔案 URL
        </label>
        <input
          type="url"
          id="resume_url"
          name="resume_url"
          value={(form as any)?.data?.resume_url || aboutMe?.resume_url || ""}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com/resume.pdf"
        />
        <p class="text-xs text-gray-500 mt-1">PDF 格式履歷檔案連結</p>
      </div>
    </div>
  </div>

  <!-- 社群媒體連結 -->
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-medium text-gray-900 mb-6">社群媒體連結</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- GitHub -->
      <div>
        <label
          for="github_url"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          GitHub
        </label>
        <input
          type="url"
          id="github_url"
          name="github_url"
          value={(form as any)?.data?.github_url || aboutMe?.github_url || ""}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://github.com/yourusername"
        />
      </div>

      <!-- LinkedIn -->
      <div>
        <label
          for="linkedin_url"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          LinkedIn
        </label>
        <input
          type="url"
          id="linkedin_url"
          name="linkedin_url"
          value={(form as any)?.data?.linkedin_url || aboutMe?.linkedin_url || ""}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://linkedin.com/in/yourusername"
        />
      </div>

      <!-- Twitter -->
      <div>
        <label
          for="twitter_url"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Twitter
        </label>
        <input
          type="url"
          id="twitter_url"
          name="twitter_url"
          value={(form as any)?.data?.twitter_url || aboutMe?.twitter_url || ""}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://twitter.com/yourusername"
        />
      </div>

      <!-- 個人網站 -->
      <div>
        <label
          for="website_url"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          個人網站
        </label>
        <input
          type="url"
          id="website_url"
          name="website_url"
          value={(form as any)?.data?.website_url || aboutMe?.website_url || ""}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://yourwebsite.com"
        />
      </div>
    </div>
  </div>

  <!-- 提交按鈕 -->
  <div class="flex justify-end space-x-4">
    <a href="/admin" class="btn-secondary"> 取消 </a>
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
        更新中...
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
        儲存變更
      {/if}
    </button>
  </div>
</form>
