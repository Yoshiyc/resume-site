<!--
  管理後台 Layout
  提供後台導航和基本結構
-->
<script lang="ts">
  import { page } from "$app/stores";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  // 導航項目
  const navItems = [
    { href: "/admin", label: "儀表板", icon: "dashboard" },
    { href: "/admin/about", label: "個人資訊", icon: "user" },
    { href: "/admin/projects", label: "專案管理", icon: "folder" },
    { href: "/admin/skills", label: "技能管理", icon: "star" },
    { href: "/admin/experiences", label: "經歷管理", icon: "briefcase" },
    { href: "/admin/educations", label: "學歷管理", icon: "academic-cap" },
    { href: "/admin/messages", label: "聯絡訊息", icon: "mail" },
  ];

  // 檢查當前路由是否為活躍狀態
  $: isActive = (href: string): boolean => {
    if (href === "/admin") {
      return $page.url.pathname === "/admin";
    }
    return $page.url.pathname.startsWith(href);
  };

  // 圖標 SVG
  const icons: Record<string, string> = {
    dashboard:
      "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586l-2 2V5H5v14h14v-1.586l2-2V19a1 1 0 01-1 1H4a1 1 0 01-1-1V4z M9 9h6v2H9V9z M9 13h6v2H9v-2z",
    user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 3a4 4 0 100 8 4 4 0 000-8z",
    folder:
      "M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    briefcase:
      "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M14 2H10a2 2 0 00-2 2v3h8V4a2 2 0 00-2-2z",
    "academic-cap": "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14L4.16 10.578a12.083 12.083 0 01-.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 006.824-2.998 12.078 12.078 0 01-.665-6.479L12 14z",
    mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  };
</script>

<svelte:head>
  <title>管理後台 - Resume Site</title>
</svelte:head>

{#if data.isAuthenticated}
  <!-- 管理後台主要結構 -->
  <div class="min-h-screen bg-gray-50 flex">
    <!-- 側邊欄 -->
    <div class="w-64 bg-white shadow-lg">
      <!-- Logo -->
      <div class="p-6 border-b border-gray-200">
        <h1 class="text-xl font-bold text-gray-900">管理後台</h1>
        <p class="text-sm text-gray-600 mt-1">Resume Site</p>
      </div>

      <!-- 導航選單 -->
      <nav class="mt-6">
        <div class="px-3">
          {#each navItems as item}
            <a
              href={item.href}
              class="group flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 transition-colors {isActive(
                item.href,
              )
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}"
            >
              <svg
                class="mr-3 h-5 w-5 {isActive(item.href)
                  ? 'text-blue-500'
                  : 'text-gray-400 group-hover:text-gray-500'}"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d={icons[item.icon]}
                />
              </svg>
              {item.label}
            </a>
          {/each}
        </div>
      </nav>

      <!-- 登出按鈕 -->
      <div class="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <form method="POST" action="/admin/logout">
          <button
            type="submit"
            class="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <svg
              class="mr-3 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            登出
          </button>
        </form>
      </div>
    </div>

    <!-- 主要內容區域 -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- 頂部導航 -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="px-6 py-4">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-semibold text-gray-900">
              {#if $page.url.pathname === "/admin"}
                儀表板
              {:else if $page.url.pathname.includes("/about")}
                個人資訊管理
              {:else if $page.url.pathname.includes("/projects")}
                專案管理
              {:else if $page.url.pathname.includes("/skills")}
                技能管理
              {:else if $page.url.pathname.includes("/experiences")}
                經歷管理
              {:else if $page.url.pathname.includes("/messages")}
                聯絡訊息
              {:else}
                管理後台
              {/if}
            </h2>

            <!-- 快速操作 -->
            <div class="flex items-center space-x-4">
              <a
                href="/"
                target="_blank"
                class="text-gray-600 hover:text-gray-900 transition-colors"
                title="查看網站"
                aria-label="查看網站"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      <!-- 頁面內容 -->
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
{:else}
  <!-- 未登入時顯示登入頁面 -->
  <slot />
{/if}
