<!--
  專案卡片元件
  用於展示單個專案的資訊，包含圖片、標題、描述、技術標籤和連結
-->
<script lang="ts">
  import type { Project } from '$lib/utils/supabaseClient';
  
  // 接收專案資料作為 props
  export let project: Project;
  
  // 處理圖片載入錯誤的預設圖片
  const defaultImage = 'https://via.placeholder.com/400x200/e5e7eb/6b7280?text=Project+Image';
  
  // 處理圖片載入錯誤
  function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = defaultImage;
  }
  
  // 格式化日期顯示
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<article class="card group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
  <!-- 專案圖片 -->
  <div class="relative overflow-hidden">
    <img 
      src={project.image_url || defaultImage}
      alt={project.title}
      class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      on:error={handleImageError}
      loading="lazy"
    />
    <!-- 圖片上的漸層遮罩 -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </div>
  
  <!-- 卡片內容 -->
  <div class="p-6">
    <!-- 專案標題 -->
    <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
      {project.title}
    </h3>
    
    <!-- 專案描述 -->
    <p class="text-gray-600 mb-4 line-clamp-3">
      {project.description}
    </p>
    
    <!-- 技術標籤 -->
    {#if project.tech_stack && project.tech_stack.length > 0}
      <div class="flex flex-wrap gap-2 mb-4">
        {#each project.tech_stack as tech}
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {tech}
          </span>
        {/each}
      </div>
    {/if}
    
    <!-- 專案連結按鈕 -->
    <div class="flex gap-3 mt-6">
      {#if project.demo_url}
        <a 
          href={project.demo_url}
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary flex-1 text-center"
          aria-label="查看 {project.title} 的線上展示"
        >
          <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
          線上展示
        </a>
      {/if}
      
      {#if project.github_url}
        <a 
          href={project.github_url}
          target="_blank"
          rel="noopener noreferrer"
          class="btn-secondary flex-1 text-center"
          aria-label="查看 {project.title} 的 GitHub 原始碼"
        >
          <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
      {/if}
    </div>
    
    <!-- 建立日期 -->
    <div class="mt-4 pt-4 border-t border-gray-100">
      <p class="text-sm text-gray-500">
        建立於 {formatDate(project.created_at)}
      </p>
    </div>
  </div>
</article>

<style>
  /* 限制文字行數的樣式 */
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
