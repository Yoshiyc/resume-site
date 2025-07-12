<!--
  學歷管理頁面
  管理所有學歷資料
-->
<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData, ActionData } from './$types';
  
  export let data: PageData;
  export let form: ActionData;
  
  $: ({ educations } = data);
  
  let isDeleting = false;
  
  // 格式化日期
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long'
    });
  }
  
  // 處理刪除
  function handleDelete() {
    isDeleting = true;
    return async ({ update }: { update: () => Promise<void> }) => {
      isDeleting = false;
      await update();
    };
  }
</script>

<svelte:head>
  <title>學歷管理 - 管理後台</title>
</svelte:head>

<!-- 頁面標題 -->
<div class="mb-8">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">學歷管理</h1>
      <p class="mt-1 text-sm text-gray-600">管理您的教育背景資訊</p>
    </div>
    <a
      href="/admin/educations/new"
      class="btn-primary"
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      新增學歷
    </a>
  </div>
</div>

<!-- 成功/錯誤訊息 -->
{#if form?.success}
  <div class="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
    <div class="flex">
      <svg class="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div class="ml-3">
        <p class="text-sm text-green-800">{form.message}</p>
      </div>
    </div>
  </div>
{/if}

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

<!-- 學歷列表 -->
{#if educations.length > 0}
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <ul class="divide-y divide-gray-200">
      {#each educations as education}
        <li>
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-medium text-gray-900">
                    {education.degree}
                  </h3>
                  <div class="flex space-x-2">
                    <a
                      href="/admin/educations/{education.id}/edit"
                      class="text-blue-600 hover:text-blue-800 transition-colors"
                      title="編輯學歷"
                      aria-label="編輯學歷"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </a>
                    <form method="POST" action="?/delete" use:enhance={handleDelete} class="inline">
                      <input type="hidden" name="id" value={education.id} />
                      <button
                        type="submit"
                        class="text-red-600 hover:text-red-800 transition-colors"
                        title="刪除學歷"
                        aria-label="刪除學歷"
                        disabled={isDeleting}
                        on:click={() => confirm('確定要刪除這筆學歷嗎？')}
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
                
                <div class="mt-2">
                  <p class="text-sm text-blue-600 font-medium">{education.school}</p>
                  {#if education.department}
                    <p class="text-sm text-gray-600">{education.department}</p>
                  {/if}
                </div>
                
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <svg class="flex-shrink-0 mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
                  </svg>
                  <span>
                    {formatDate(education.start_date)} - 
                    {education.end_date ? formatDate(education.end_date) : '至今'}
                  </span>
                </div>
                
                {#if education.description}
                  <div class="mt-2">
                    <p class="text-sm text-gray-700 line-clamp-2">{education.description}</p>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
{:else}
  <div class="text-center py-12">
    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
    <h3 class="mt-2 text-sm font-medium text-gray-900">暫無學歷資料</h3>
    <p class="mt-1 text-sm text-gray-500">開始新增您的第一筆學歷資料</p>
    <div class="mt-6">
      <a
        href="/admin/educations/new"
        class="btn-primary"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        新增學歷
      </a>
    </div>
  </div>
{/if}
