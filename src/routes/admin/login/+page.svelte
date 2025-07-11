<!--
  管理後台登入頁面
-->
<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';
  
  export let form: ActionData;
  
  let isSubmitting = false;
  
  function handleSubmit() {
    isSubmitting = true;
    return async ({ result, update }) => {
      isSubmitting = false;
      await update();
    };
  }
</script>

<svelte:head>
  <title>管理後台登入 - Resume Site</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <!-- Logo -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Resume Site</h1>
      <h2 class="text-xl text-gray-600">管理後台</h2>
    </div>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form method="POST" action="?/login" use:enhance={handleSubmit} class="space-y-6">
        <!-- 錯誤訊息 -->
        {#if form?.error}
          <div class="bg-red-50 border border-red-200 rounded-md p-4">
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

        <!-- 密碼輸入 -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            管理員密碼
          </label>
          <div class="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="請輸入管理員密碼"
            />
          </div>
        </div>

        <!-- 登入按鈕 -->
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {#if isSubmitting}
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              登入中...
            {:else}
              登入
            {/if}
          </button>
        </div>
      </form>

      <!-- 說明文字 -->
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">安全提示</span>
          </div>
        </div>

        <div class="mt-4 text-sm text-gray-600">
          <div class="bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <div class="flex">
              <svg class="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div class="ml-3">
                <p class="text-sm text-yellow-800">
                  請妥善保管您的管理員密碼。建議定期更換密碼以確保安全。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 返回首頁連結 -->
    <div class="mt-6 text-center">
      <a href="/" class="text-blue-600 hover:text-blue-500 text-sm">
        ← 返回網站首頁
      </a>
    </div>
  </div>
</div>
