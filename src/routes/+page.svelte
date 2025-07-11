<!--
  首頁元件
  展示網站歡迎訊息和簡介
-->
<script lang="ts">
  // 可以在這裡加入任何需要的邏輯
</script>

<svelte:head>
  <title>首頁 - Resume Site</title>
</svelte:head>

<!-- 英雄區塊 -->
<section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div class="text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        歡迎來到我的作品集
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-blue-100">
        展示我的專案作品與技術能力
      </p>
      <div class="space-x-4">
        <a href="/projects" class="btn-primary bg-white text-blue-600 hover:bg-gray-100">
          查看作品
        </a>
        <a href="/about" class="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600">
          關於我
        </a>
      </div>
    </div>
  </div>
</section>

<!-- 特色區塊 -->
<section class="py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">技術專長</h2>
      <p class="text-lg text-gray-600">我專精於現代 Web 開發技術</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="card p-6 text-center">
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">前端開發</h3>
        <p class="text-gray-600">SvelteKit, React, Vue.js, TypeScript</p>
      </div>
      
      <div class="card p-6 text-center">
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">後端開發</h3>
        <p class="text-gray-600">Node.js, Python, Supabase, PostgreSQL</p>
      </div>
      
      <div class="card p-6 text-center">
        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">設計與部署</h3>
        <p class="text-gray-600">Tailwind CSS, Figma, Vercel, GitHub</p>
      </div>
    </div>
  </div>
</section>
