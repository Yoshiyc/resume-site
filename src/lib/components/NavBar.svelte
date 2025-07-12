<!--
  導航列元件
  提供網站主要導航功能，包含 Logo 和導航連結
-->
<script lang="ts">
  import { page } from "$app/stores";

  // 導航項目配置
  const navItems = [
    { href: "/", label: "首頁" },
    { href: "/projects", label: "作品集" },
    { href: "/about", label: "關於我" },
    { href: "/contact", label: "聯絡我" },
  ];

  // 當前路徑 - 使用響應式語句確保更新
  $: currentPath = $page?.url?.pathname || "";

  // 檢查當前路由是否為活躍狀態
  $: isActive = (href: string): boolean => {
    return currentPath === href;
  };
</script>

<nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo / 品牌名稱 -->
      <div class="flex-shrink-0">
        <a
          href="/"
          class="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
        >
          Resume Site
        </a>
      </div>

      <!-- 桌面版導航選單 -->
      <div class="hidden md:block">
        <div class="ml-10 flex items-baseline space-x-8">
          {#each navItems as item}
            <a
              href={item.href}
              class="nav-link {isActive(item.href) ? 'text-blue-600' : 'text-gray-600'} hover:text-gray-900 font-medium transition-colors duration-200"
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </a>
          {/each}
        </div>
      </div>

      <!-- 手機版選單按鈕 -->
      <div class="md:hidden">
        <button
          type="button"
          class="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
          aria-label="開啟選單"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- 手機版導航選單 (可擴展) -->
  <div class="md:hidden">
    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
      {#each navItems as item}
        <a
          href={item.href}
          class="block px-3 py-2 text-base font-medium {isActive(item.href)
            ? 'text-blue-600 bg-blue-50'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-md transition-colors"
        >
          {item.label}
        </a>
      {/each}
    </div>
  </div>
</nav>
