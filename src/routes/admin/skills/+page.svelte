<!--
  管理後台 - 技能管理
-->
<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData, ActionData } from './$types';
  
  export let data: PageData;
  export let form: ActionData;
  
  $: ({ skills } = data);
  
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
  function confirmDelete(name: string, event: Event) {
    if (!confirm(`確定要刪除技能「${name}」嗎？此操作無法復原。`)) {
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
  
  // 技能等級標籤
  const levelLabels: Record<number, string> = {
    1: '初學者',
    2: '基礎',
    3: '中等',
    4: '熟練',
    5: '專家'
  };
  
  // 技能等級顏色
  const levelColors: Record<number, string> = {
    1: 'bg-red-100 text-red-800',
    2: 'bg-orange-100 text-orange-800',
    3: 'bg-yellow-100 text-yellow-800',
    4: 'bg-blue-100 text-blue-800',
    5: 'bg-green-100 text-green-800'
  };
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
    <h1 class="text-2xl font-bold text-gray-900">技能管理</h1>
    <p class="text-gray-600 mt-1">管理您的技能和專長</p>
  </div>
  <a 
    href="/admin/skills/new" 
    class="btn-primary flex items-center"
  >
    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
    新增技能
  </a>
</div>

<!-- 技能列表 -->
{#if skills.length > 0}
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">
        所有技能 ({skills.length})
      </h3>
    </div>
    
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              技能名稱
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              分類
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              等級
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              狀態
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each skills as skill}
            <tr class="hover:bg-gray-50">
              <!-- 技能名稱 -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  {#if skill.icon_url}
                    <img src={skill.icon_url} alt={skill.name} class="h-8 w-8 rounded mr-3" />
                  {:else}
                    <div class="h-8 w-8 rounded bg-gray-100 flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                      </svg>
                    </div>
                  {/if}
                  <div>
                    <div class="text-sm font-medium text-gray-900">{skill.name}</div>
                    {#if skill.description}
                      <div class="text-sm text-gray-500 max-w-xs truncate">{skill.description}</div>
                    {/if}
                  </div>
                </div>
              </td>
              
              <!-- 分類 -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                  {skill.category}
                </span>
              </td>
              
              <!-- 等級 -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {levelColors[skill.level]}">
                    {levelLabels[skill.level]}
                  </span>
                  <div class="flex">
                    {#each Array.from({ length: 5 }, (_, i) => i + 1) as star}
                      <svg class="w-4 h-4 {star <= skill.level ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    {/each}
                  </div>
                </div>
              </td>
              
              <!-- 狀態 -->
              <td class="px-6 py-4 whitespace-nowrap">
                {#if skill.is_featured}
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    精選
                  </span>
                {/if}
              </td>
              
              <!-- 操作按鈕 -->
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <!-- 編輯按鈕 -->
                  <a 
                    href="/admin/skills/{skill.id}/edit" 
                    class="text-indigo-600 hover:text-indigo-900"
                    title="編輯技能"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </a>
                  
                  <!-- 刪除按鈕 -->
                  <form 
                    method="POST" 
                    action="?/delete" 
                    use:enhance={() => handleDelete(skill.id)}
                    class="inline"
                  >
                    <input type="hidden" name="id" value={skill.id} />
                    <button
                      type="submit"
                      disabled={deletingId === skill.id}
                      on:click={(event) => confirmDelete(skill.name, event)}
                      class="text-red-600 hover:text-red-900 disabled:opacity-50"
                      title="刪除技能"
                    >
                      {#if deletingId === skill.id}
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
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
      </svg>
    </div>
    <h3 class="text-xl font-semibold text-gray-900 mb-2">
      還沒有技能
    </h3>
    <p class="text-gray-600 mb-6">
      開始新增您的第一個技能吧！
    </p>
    <a href="/admin/skills/new" class="btn-primary">
      新增技能
    </a>
  </div>
{/if}
