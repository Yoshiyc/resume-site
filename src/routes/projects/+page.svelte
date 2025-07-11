<!--
  專案作品集頁面
  展示所有專案的列表，使用 ProjectCard 元件渲染每個專案
-->
<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import type { PageData } from './$types';
  
  // 接收從伺服器載入的資料
  export let data: PageData;
  
  // 解構取得專案列表
  $: ({ projects } = data);
</script>

<svelte:head>
  <title>作品集 - Resume Site</title>
  <meta name="description" content="查看我的專案作品集，包含各種 Web 開發專案" />
</svelte:head>

<!-- 頁面標題區塊 -->
<section class="bg-white border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        我的作品集
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        這裡展示了我開發的各種專案，涵蓋前端、後端和全端開發
      </p>
    </div>
  </div>
</section>

<!-- 專案列表區塊 -->
<section class="py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {#if projects && projects.length > 0}
      <!-- 專案統計 -->
      <div class="mb-8">
        <p class="text-gray-600">
          共 <span class="font-semibold text-gray-900">{projects.length}</span> 個專案
        </p>
      </div>
      
      <!-- 專案卡片網格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each projects as project (project.id)}
          <ProjectCard {project} />
        {/each}
      </div>
    {:else}
      <!-- 空狀態 -->
      <div class="text-center py-16">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">
          目前沒有專案
        </h3>
        <p class="text-gray-600 mb-6">
          專案資料正在載入中，或者還沒有新增任何專案
        </p>
        <a href="/" class="btn-primary">
          返回首頁
        </a>
      </div>
    {/if}
  </div>
</section>

<!-- 聯絡區塊 -->
<section class="bg-gray-50 py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl font-bold text-gray-900 mb-4">
      有興趣合作嗎？
    </h2>
    <p class="text-lg text-gray-600 mb-8">
      如果您對我的作品感興趣，歡迎與我聯絡討論合作機會
    </p>
    <a href="/contact" class="btn-primary">
      聯絡我
    </a>
  </div>
</section>
