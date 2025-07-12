<!--
  聯絡我頁面
  包含聯絡表單和聯絡資訊
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
        // 清空表單
        const formElement = document.getElementById(
          "contact-form",
        ) as HTMLFormElement;
        if (formElement) {
          formElement.reset();
        }

        // 3秒後隱藏成功訊息
        setTimeout(() => {
          showSuccess = false;
        }, 5000);
      }

      await update();
    };
  }
</script>

<svelte:head>
  <title>聯絡我 - {aboutMe?.name || "Resume Site"}</title>
  <meta name="description" content="與我聯絡，討論合作機會或技術交流" />
</svelte:head>

<!-- 頁面標題區塊 -->
<section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">聯絡我</h1>
    <p class="text-xl text-gray-600 max-w-2xl mx-auto">
      有任何問題或合作機會嗎？歡迎與我聯絡，我會盡快回覆您！
    </p>
  </div>
</section>

<!-- 主要內容區塊 -->
<section class="py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- 聯絡表單 -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-6">發送訊息</h2>

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
                {form?.message || "訊息已成功發送！我會盡快回覆您。"}
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
          id="contact-form"
          method="POST"
          action="?/submit"
          use:enhance={handleSubmit}
          class="space-y-6"
        >
          <!-- 姓名 -->
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              姓名 <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={(form as any)?.name || ""}
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="請輸入您的姓名"
            />
          </div>

          <!-- 電子郵件 -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              電子郵件 <span class="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={(form as any)?.email || ""}
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="請輸入您的電子郵件"
            />
          </div>

          <!-- 主旨 -->
          <div>
            <label
              for="subject"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              主旨
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={(form as any)?.subject || ""}
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="請輸入訊息主旨"
            />
          </div>

          <!-- 訊息內容 -->
          <div>
            <label
              for="message"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              訊息內容 <span class="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
              placeholder="請輸入您想說的話..."
              >{(form as any)?.message || ""}</textarea
            >
          </div>

          <!-- 提交按鈕 -->
          <button
            type="submit"
            disabled={isSubmitting}
            class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
              發送中...
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
              發送訊息
            {/if}
          </button>
        </form>
      </div>

      <!-- 聯絡資訊 -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-6">聯絡資訊</h2>

        <div class="space-y-6">
          <!-- 電子郵件 -->
          {#if aboutMe?.email}
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div
                  class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">電子郵件</h3>
                <a
                  href="mailto:{aboutMe.email}"
                  class="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {aboutMe.email}
                </a>
              </div>
            </div>
          {/if}

          <!-- 電話 -->
          {#if aboutMe?.phone}
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div
                  class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">電話</h3>
                <a
                  href="tel:{aboutMe.phone}"
                  class="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {aboutMe.phone}
                </a>
              </div>
            </div>
          {/if}

          <!-- 地點 -->
          {#if aboutMe?.location}
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div
                  class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">地點</h3>
                <p class="text-gray-600">{aboutMe.location}</p>
              </div>
            </div>
          {/if}
        </div>

        <!-- 社群媒體 -->
        <div class="mt-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">社群媒體</h3>
          <div class="flex space-x-4">
            {#if aboutMe?.github_url}
              <a
                href={aboutMe.github_url}
                target="_blank"
                rel="noopener noreferrer"
                class="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="GitHub"
              >
                <svg
                  class="w-6 h-6 text-gray-600 group-hover:text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>
            {/if}

            {#if aboutMe?.linkedin_url}
              <a
                href={aboutMe.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                class="w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="LinkedIn"
              >
                <svg
                  class="w-6 h-6 text-blue-600 group-hover:text-blue-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>
            {/if}

            {#if aboutMe?.twitter_url}
              <a
                href={aboutMe.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                class="w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="Twitter"
              >
                <svg
                  class="w-6 h-6 text-blue-400 group-hover:text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  />
                </svg>
              </a>
            {/if}
          </div>
        </div>

        <!-- 回應時間說明 -->
        <div class="mt-8 p-4 bg-blue-50 rounded-lg">
          <div class="flex items-start">
            <svg
              class="w-5 h-5 text-blue-600 mt-0.5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>
              <h4 class="font-medium text-blue-900 mb-1">回應時間</h4>
              <p class="text-sm text-blue-700">
                我通常會在 24
                小時內回覆您的訊息。如果是緊急事項，請直接撥打電話聯絡。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
