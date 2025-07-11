<!--
  管理後台 - 聯絡訊息管理
-->
<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData, ActionData } from "./$types";

  export let data: PageData;
  export let form: ActionData;

  $: ({ messages } = data);

  let showSuccess = false;
  let replyingId: number | null = null;
  let replyText = "";

  // 處理操作成功
  $: if (form?.success) {
    showSuccess = true;
    replyingId = null;
    replyText = "";
    setTimeout(() => {
      showSuccess = false;
    }, 3000);
  }

  // 格式化日期
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // 開始回覆
  function startReply(id: number) {
    replyingId = id;
    replyText = "";
  }

  // 取消回覆
  function cancelReply() {
    replyingId = null;
    replyText = "";
  }

  // 確認刪除
  function confirmDelete(name: string, event: Event) {
    if (!confirm(`確定要刪除來自「${name}」的訊息嗎？此操作無法復原。`)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  // 統計資料
  $: stats = {
    total: messages.length,
    unread: messages.filter((m) => !m.is_read).length,
    replied: messages.filter((m) => m.is_replied).length,
  };
</script>

<!-- 成功訊息 -->
{#if showSuccess}
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

<!-- 頁面標題和統計 -->
<div class="mb-8">
  <h1 class="text-2xl font-bold text-gray-900 mb-4">聯絡訊息管理</h1>

  <!-- 統計卡片 -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center">
        <div
          class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3"
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
        <div>
          <p class="text-sm font-medium text-gray-600">總訊息數</p>
          <p class="text-2xl font-semibold text-gray-900">{stats.total}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center">
        <div
          class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3"
        >
          <svg
            class="w-5 h-5 text-yellow-600"
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
        </div>
        <div>
          <p class="text-sm font-medium text-gray-600">未讀訊息</p>
          <p class="text-2xl font-semibold text-gray-900">{stats.unread}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center">
        <div
          class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3"
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
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-600">已回覆</p>
          <p class="text-2xl font-semibold text-gray-900">{stats.replied}</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 訊息列表 -->
{#if messages.length > 0}
  <div class="space-y-6">
    {#each messages as message}
      <div
        class="bg-white rounded-lg shadow {!message.is_read
          ? 'ring-2 ring-blue-200'
          : ''}"
      >
        <!-- 訊息標題 -->
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900">
                  {message.name}
                </h3>
                <p class="text-sm text-gray-600">{message.email}</p>
              </div>
            </div>

            <div class="flex items-center space-x-2">
              {#if !message.is_read}
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  未讀
                </span>
              {/if}
              {#if message.is_replied}
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  已回覆
                </span>
              {/if}
              <span class="text-sm text-gray-500">
                {formatDate(message.created_at)}
              </span>
            </div>
          </div>

          {#if message.subject}
            <div class="mt-2">
              <p class="text-sm font-medium text-gray-700">
                主旨：{message.subject}
              </p>
            </div>
          {/if}
        </div>

        <!-- 訊息內容 -->
        <div class="px-6 py-4">
          <p class="text-gray-700 whitespace-pre-wrap">{message.message}</p>

          <!-- 已回覆的內容 -->
          {#if message.is_replied && message.reply_message}
            <div class="mt-4 p-4 bg-gray-50 rounded-lg">
              <div class="flex items-center mb-2">
                <svg
                  class="w-4 h-4 text-gray-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  ></path>
                </svg>
                <span class="text-sm font-medium text-gray-700">您的回覆</span>
                <span class="text-xs text-gray-500 ml-2">
                  {message.replied_at ? formatDate(message.replied_at) : ""}
                </span>
              </div>
              <p class="text-gray-700 whitespace-pre-wrap">
                {message.reply_message}
              </p>
            </div>
          {/if}

          <!-- 回覆表單 -->
          {#if replyingId === message.id}
            <form
              method="POST"
              action="?/reply"
              use:enhance
              class="mt-4 p-4 bg-blue-50 rounded-lg"
            >
              <input type="hidden" name="id" value={message.id} />
              <label
                for="reply_message_{message.id}"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                回覆訊息
              </label>
              <textarea
                id="reply_message_{message.id}"
                name="reply_message"
                rows="4"
                bind:value={replyText}
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="輸入您的回覆..."
              ></textarea>
              <div class="flex justify-end space-x-2 mt-3">
                <button
                  type="button"
                  on:click={cancelReply}
                  class="btn-secondary text-sm"
                >
                  取消
                </button>
                <button type="submit" class="btn-primary text-sm">
                  發送回覆
                </button>
              </div>
            </form>
          {/if}
        </div>

        <!-- 操作按鈕 -->
        <div
          class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2"
        >
          {#if !message.is_read}
            <form
              method="POST"
              action="?/markAsRead"
              use:enhance
              class="inline"
            >
              <input type="hidden" name="id" value={message.id} />
              <button
                type="submit"
                class="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                標記為已讀
              </button>
            </form>
          {/if}

          {#if !message.is_replied && replyingId !== message.id}
            <button
              type="button"
              on:click={() => startReply(message.id)}
              class="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              回覆
            </button>
          {/if}

          <form method="POST" action="?/delete" use:enhance class="inline">
            <input type="hidden" name="id" value={message.id} />
            <button
              type="submit"
              on:click={(event) => confirmDelete(message.name, event)}
              class="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              刪除
            </button>
          </form>
        </div>
      </div>
    {/each}
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
          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        ></path>
      </svg>
    </div>
    <h3 class="text-xl font-semibold text-gray-900 mb-2">還沒有聯絡訊息</h3>
    <p class="text-gray-600">當有人透過聯絡表單發送訊息時，會在這裡顯示</p>
  </div>
{/if}
