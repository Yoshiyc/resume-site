<!--
  管理後台儀表板
  顯示網站統計和快速操作
-->
<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  $: ({ stats, recentMessages, recentProjects, featuredSkills } = data);
  
  // 格式化日期
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

<!-- 統計卡片 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <!-- 專案統計 -->
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
      </div>
      <div class="ml-4">
        <p class="text-sm font-medium text-gray-600">專案總數</p>
        <p class="text-2xl font-semibold text-gray-900">{stats.totalProjects}</p>
        <p class="text-xs text-gray-500">精選: {stats.featuredProjects}</p>
      </div>
    </div>
  </div>
  
  <!-- 技能統計 -->
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
      </div>
      <div class="ml-4">
        <p class="text-sm font-medium text-gray-600">技能總數</p>
        <p class="text-2xl font-semibold text-gray-900">{stats.totalSkills}</p>
        <p class="text-xs text-gray-500">精選: {stats.featuredSkills}</p>
      </div>
    </div>
  </div>
  
  <!-- 經歷統計 -->
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
        </div>
      </div>
      <div class="ml-4">
        <p class="text-sm font-medium text-gray-600">工作經歷</p>
        <p class="text-2xl font-semibold text-gray-900">{stats.totalExperiences}</p>
        <p class="text-xs text-gray-500">目前: {stats.currentExperiences}</p>
      </div>
    </div>
  </div>
  
  <!-- 訊息統計 -->
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      <div class="ml-4">
        <p class="text-sm font-medium text-gray-600">聯絡訊息</p>
        <p class="text-2xl font-semibold text-gray-900">{stats.totalMessages}</p>
        <p class="text-xs text-gray-500">未讀: {stats.unreadMessages}</p>
      </div>
    </div>
  </div>
</div>

<!-- 主要內容區域 -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <!-- 最近的聯絡訊息 -->
  <div class="bg-white rounded-lg shadow">
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">最近的聯絡訊息</h3>
        <a href="/admin/messages" class="text-blue-600 hover:text-blue-800 text-sm">
          查看全部
        </a>
      </div>
    </div>
    <div class="p-6">
      {#if recentMessages.length > 0}
        <div class="space-y-4">
          {#each recentMessages as message}
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900">{message.name}</p>
                  {#if !message.is_read}
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      新
                    </span>
                  {/if}
                </div>
                <p class="text-sm text-gray-600">{message.email}</p>
                <p class="text-xs text-gray-500 mt-1">
                  {formatDate(message.created_at)}
                </p>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-gray-500 text-center py-4">暫無聯絡訊息</p>
      {/if}
    </div>
  </div>
  
  <!-- 最近的專案 -->
  <div class="bg-white rounded-lg shadow">
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">最近的專案</h3>
        <a href="/admin/projects" class="text-blue-600 hover:text-blue-800 text-sm">
          管理專案
        </a>
      </div>
    </div>
    <div class="p-6">
      {#if recentProjects.length > 0}
        <div class="space-y-4">
          {#each recentProjects as project}
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                {#if project.image_url}
                  <img src={project.image_url} alt={project.title} class="w-12 h-12 rounded-lg object-cover" />
                {:else}
                  <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                {/if}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900 truncate">{project.title}</p>
                  {#if project.featured}
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                      精選
                    </span>
                  {/if}
                </div>
                <p class="text-sm text-gray-600 truncate">{project.description}</p>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-gray-500 text-center py-4">暫無專案</p>
      {/if}
    </div>
  </div>
</div>

<!-- 快速操作 -->
<div class="mt-8">
  <h3 class="text-lg font-medium text-gray-900 mb-4">快速操作</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <a href="/admin/projects" class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <div class="flex items-center">
        <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <span class="text-sm font-medium text-gray-900">新增專案</span>
      </div>
    </a>
    
    <a href="/admin/skills" class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <div class="flex items-center">
        <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <span class="text-sm font-medium text-gray-900">新增技能</span>
      </div>
    </a>
    
    <a href="/admin/about" class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <div class="flex items-center">
        <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
          <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <span class="text-sm font-medium text-gray-900">編輯個人資訊</span>
      </div>
    </a>
    
    <a href="/admin/messages" class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <div class="flex items-center">
        <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
          <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <span class="text-sm font-medium text-gray-900">查看訊息</span>
      </div>
    </a>
  </div>
</div>
