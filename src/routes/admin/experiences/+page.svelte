<!--
  管理後台 - 經歷管理
-->
<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData, ActionData } from './$types';
  
  export let data: PageData;
  export let form: ActionData;
  
  $: ({ experiences } = data);
  
  let showSuccess = false;
  let deletingId: number | null = null;
  
  // 處理操作成功
  $: if (form?.success) {
    showSuccess = true;
    setTimeout(() => {
      showSuccess = false;
    }, 3000);
  }
  
  // 確認刪除
  function confirmDelete(company: string, position: string, event: Event) {
    if (!confirm(`確定要刪除「${company} - ${position}」的工作經歷嗎？此操作無法復原。`)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  
  // 處理刪除表單提交
  function handleDelete(id: number) {
    return async ({ result, update }: any) => {
      deletingId = null;
      
      if (result.type === 'success') {
        showSuccess = true;
        setTimeout(() => {
          showSuccess = false;
        }, 3000);
      }
      
      await update();
    };
  }
  
  // 格式化日期
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'short'
    });
  }
</script>

<!-- 成功訊息 -->
{#if showSuccess}
  <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
    <div class="flex items-center">
      <svg class="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <p class="text-green-800">
        {form?.message || '操作成功！'}
      </p>
    </div>
  </div>
{/if}

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

<!-- 頁面標題和新增按鈕 -->
<div class="flex justify-between items-center mb-8">
  <div>
    <h1 class="text-2xl font-bold text-gray-900">經歷管理</h1>
    <p class="text-gray-600 mt-1">管理您的工作經歷和職業發展</p>
  </div>
  <a 
    href="/admin/experiences/new" 
    class="btn-primary flex items-center"
  >
    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
    新增經歷
  </a>
</div>

<!-- 經歷列表 -->
{#if experiences.length > 0}
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">
        所有工作經歷 ({experiences.length})
      </h3>
    </div>
    
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              公司 / 職位
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              期間
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              狀態
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              技術
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each experiences as experience}
            <tr class="hover:bg-gray-50">
              <!-- 公司 / 職位 -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-12 w-12">
                    {#if experience.company_logo_url}
                      <img src={experience.company_logo_url} alt={experience.company} class="h-12 w-12 rounded-lg object-cover" />
                    {:else}
                      <div class="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
                        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
                        </svg>
                      </div>
                    {/if}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {experience.company}
                    </div>
                    <div class="text-sm text-gray-600">
                      {experience.position}
                    </div>
                    {#if experience.location}
                      <div class="text-xs text-gray-500">
                        {experience.location}
                      </div>
                    {/if}
                  </div>
                </div>
              </td>
              
              <!-- 期間 -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div>
                  {formatDate(experience.start_date)}
                  {#if experience.end_date}
                    - {formatDate(experience.end_date)}
                  {:else}
                    - 至今
                  {/if}
                </div>
              </td>
              
              <!-- 狀態 -->
              <td class="px-6 py-4 whitespace-nowrap">
                {#if experience.is_current}
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    目前職位
                  </span>
                {:else}
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    已離職
                  </span>
                {/if}
              </td>
              
              <!-- 技術 -->
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1 max-w-xs">
                  {#each (experience.technologies || []).slice(0, 3) as tech}
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {tech}
                    </span>
                  {/each}
                  {#if (experience.technologies || []).length > 3}
                    <span class="text-xs text-gray-500">
                      +{(experience.technologies || []).length - 3} 更多
                    </span>
                  {/if}
                </div>
              </td>
              
              <!-- 操作按鈕 -->
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <!-- 查看按鈕 -->
                  {#if experience.company_url}
                    <a 
                      href={experience.company_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="text-blue-600 hover:text-blue-900"
                      title="查看公司網站"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  {/if}
                  
                  <!-- 編輯按鈕 -->
                  <a 
                    href="/admin/experiences/{experience.id}/edit" 
                    class="text-indigo-600 hover:text-indigo-900"
                    title="編輯經歷"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </a>
                  
                  <!-- 刪除按鈕 -->
                  <form 
                    method="POST" 
                    action="?/delete" 
                    use:enhance={() => handleDelete(experience.id)}
                    class="inline"
                  >
                    <input type="hidden" name="id" value={experience.id} />
                    <button
                      type="submit"
                      disabled={deletingId === experience.id}
                      on:click={(event) => confirmDelete(experience.company, experience.position, event)}
                      class="text-red-600 hover:text-red-900 disabled:opacity-50"
                      title="刪除經歷"
                    >
                      {#if deletingId === experience.id}
                        <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      {:else}
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      {/if}
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
{:else}
  <!-- 空狀態 -->
  <div class="text-center py-12">
    <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
      </svg>
    </div>
    <h3 class="text-xl font-semibold text-gray-900 mb-2">
      還沒有工作經歷
    </h3>
    <p class="text-gray-600 mb-6">
      開始新增您的第一個工作經歷吧！
    </p>
    <a href="/admin/experiences/new" class="btn-primary">
      新增經歷
    </a>
  </div>
{/if}
