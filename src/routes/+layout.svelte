<!--
  全域 Layout 元件
  定義整個應用程式的基本結構，包含導航列和主要內容區域
-->
<script lang="ts">
  import '../app.css';
  import NavBar from '$lib/components/NavBar.svelte';
</script>

<!-- 設定頁面標題和 meta 資訊 -->
<svelte:head>
  <title>Resume Site - 個人作品集網站</title>
  <meta name="description" content="展示個人專案作品的作品集網站" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<!-- 主要頁面結構 -->
<div class="min-h-screen bg-gray-50">
  <!-- 導航列 -->
  <NavBar />
  
  <!-- 主要內容區域 -->
  <main class="flex-1">
    <slot />
  </main>
  
  <!-- 頁尾 -->
  <footer class="bg-white border-t border-gray-200 mt-auto">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="text-center text-gray-600">
        <p>&copy; 2024 Resume Site. 使用 SvelteKit 與 Tailwind CSS 建立。</p>
      </div>
    </div>
  </footer>
</div>
