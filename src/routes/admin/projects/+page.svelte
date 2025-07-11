<!--
  管理後台 - 專案管理
-->
<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData, ActionData } from "./$types";

  export let data: PageData;
  export let form: ActionData;

  $: ({ projects } = data);

  let showSuccess = false;
  let deletingId: number | null = null;
  let errorMessage = "";
  let localProjects = projects; // 本地專案列表，用於即時更新

  // 當 data.projects 更新時，同步更新本地列表
  $: localProjects = projects;

  // 處理刪除確認
  function confirmDelete(title: string, event: Event) {
    if (!confirm(`確定要刪除專案「${title}」嗎？此操作無法復原。`)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  // 處理刪除表單提交
  function handleDelete(id: number) {
    return async ({ result, update }: any) => {
      console.log("Delete result:", result);

      // 重置 loading 狀態
      deletingId = null;

      if (result.type === "success") {
        console.log("Delete successful, removing project from local list");

        // 立即從本地列表中移除該專案
        localProjects = localProjects.filter((project) => project.id !== id);

        // 顯示成功訊息
        showSuccess = true;
        setTimeout(() => {
          showSuccess = false;
        }, 3000);
      } else if (result.type === "failure") {
        console.error("Delete failed:", result.data?.error);

        // 顯示錯誤訊息
        errorMessage = result.data?.error || "刪除失敗，請稍後再試";
        setTimeout(() => {
          errorMessage = "";
        }, 5000);
      }

      // 更新頁面資料
      await update();
    };
  }

  // 格式化日期
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
        {form?.message || "操作成功！"}
      </p>
    </div>
  </div>
{/if}

<!-- 錯誤訊息 -->
{#if errorMessage || form?.error}
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
      <p class="text-red-800">
        {errorMessage || form?.error}
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

<!-- 頁面標題和新增按鈕 -->
<div class="flex justify-between items-center mb-8">
  <div>
    <h1 class="text-2xl font-bold text-gray-900">專案管理</h1>
    <p class="text-gray-600 mt-1">管理您的專案作品集</p>
  </div>
  <a href="/admin/projects/new" class="btn-primary flex items-center">
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
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      ></path>
    </svg>
    新增專案
  </a>
</div>

<!-- 專案列表 -->
{#if localProjects.length > 0}
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">
        所有專案 ({localProjects.length})
      </h3>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              專案
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              狀態
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              技術棧
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              建立日期
            </th>
            <th
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              操作
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each localProjects as project}
            <tr class="hover:bg-gray-50">
              <!-- 專案資訊 -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-12 w-12">
                    {#if project.image_url}
                      <img
                        src={project.image_url}
                        alt={project.title}
                        class="h-12 w-12 rounded-lg object-cover"
                      />
                    {:else}
                      <div
                        class="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center"
                      >
                        <svg
                          class="w-6 h-6 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          ></path>
                        </svg>
                      </div>
                    {/if}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {project.title}
                    </div>
                    <div class="text-sm text-gray-500 max-w-xs truncate">
                      {project.description}
                    </div>
                  </div>
                </div>
              </td>

              <!-- 狀態 -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  {#if project.featured}
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                    >
                      精選
                    </span>
                  {/if}
                  {#if project.status}
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {project.status ===
                      'completed'
                        ? 'bg-green-100 text-green-800'
                        : project.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'}"
                    >
                      {project.status === "completed"
                        ? "已完成"
                        : project.status === "in-progress"
                          ? "進行中"
                          : "已封存"}
                    </span>
                  {/if}
                </div>
              </td>

              <!-- 技術棧 -->
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1 max-w-xs">
                  {#each (project.tech_stack || []).slice(0, 3) as tech}
                    <span
                      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tech}
                    </span>
                  {/each}
                  {#if (project.tech_stack || []).length > 3}
                    <span class="text-xs text-gray-500">
                      +{(project.tech_stack || []).length - 3} 更多
                    </span>
                  {/if}
                </div>
              </td>

              <!-- 建立日期 -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(project.created_at)}
              </td>

              <!-- 操作按鈕 -->
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <div class="flex items-center justify-end space-x-2">
                  <!-- 查看按鈕 -->
                  {#if project.demo_url}
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-600 hover:text-blue-900"
                      title="查看專案"
                      aria-label="查看專案"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                    </a>
                  {/if}

                  <!-- 編輯按鈕 -->
                  <a
                    href="/admin/projects/{project.id}/edit"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="編輯專案"
                    aria-label="編輯專案"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                  </a>

                  <!-- 刪除按鈕 -->
                  <form
                    method="POST"
                    action="?/delete"
                    use:enhance={() => handleDelete(project.id)}
                    class="inline"
                  >
                    <input type="hidden" name="id" value={project.id} />
                    <button
                      type="submit"
                      disabled={deletingId === project.id}
                      on:click={(event: Event) =>
                        confirmDelete(project.title, event)}
                      class="text-red-600 hover:text-red-900 disabled:opacity-50"
                      title="刪除專案"
                      aria-label="刪除專案"
                    >
                      {#if deletingId === project.id}
                        <svg
                          class="w-4 h-4 animate-spin"
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
                      {:else}
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
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
    <div
      class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
    >
      <svg
        class="w-12 h-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        ></path>
      </svg>
    </div>
    <h3 class="text-xl font-semibold text-gray-900 mb-2">還沒有專案</h3>
    <p class="text-gray-600 mb-6">開始新增您的第一個專案吧！</p>
    <a href="/admin/projects/new" class="btn-primary"> 新增專案 </a>
  </div>
{/if}
