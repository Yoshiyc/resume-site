<!--
  關於我頁面
  展示個人簡介、技能和工作經歷
-->
<script lang="ts">
  import type { PageData } from "./$types";
  import SkillCard from "$lib/components/SkillCard.svelte";
  import ExperienceCard from "$lib/components/ExperienceCard.svelte";

  export let data: PageData;

  $: ({ aboutMe, skills, experiences } = data);

  // 檢查是否正在載入
  $: isLoading = !data;

  // 按類別分組技能
  $: skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>,
  );

  // 類別顯示名稱
  const categoryNames: Record<string, string> = {
    frontend: "前端開發",
    backend: "後端開發",
    database: "資料庫",
    tools: "開發工具",
    other: "其他技能",
  };
</script>

<svelte:head>
  <title>關於我 - {aboutMe?.name || "Resume Site"}</title>
  <meta
    name="description"
    content={aboutMe?.bio || "了解更多關於我的背景和技能"}
  />
</svelte:head>

<!-- 個人簡介區塊 -->
<section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- 個人照片 -->
      <div class="text-center lg:text-left">
        {#if aboutMe?.avatar_url}
          <img
            src={aboutMe.avatar_url}
            alt={aboutMe.name}
            class="w-64 h-64 rounded-full mx-auto lg:mx-0 object-cover shadow-xl border-4 border-white"
          />
        {:else}
          <div
            class="w-64 h-64 rounded-full mx-auto lg:mx-0 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-xl border-4 border-white"
          >
            <span class="text-6xl font-bold text-white">
              {aboutMe?.name?.charAt(0) || "U"}
            </span>
          </div>
        {/if}
      </div>

      <!-- 個人資訊 -->
      <div class="text-center lg:text-left">
        {#if aboutMe}
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {aboutMe.name}
          </h1>
          <h2 class="text-2xl md:text-3xl text-blue-600 font-semibold mb-6">
            {aboutMe.title}
          </h2>
          <p class="text-lg text-gray-700 mb-8 leading-relaxed">
            {aboutMe.bio || "歡迎來到我的個人網站！"}
          </p>
        {:else}
          <!-- 預設內容當沒有個人資訊時 -->
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            歡迎來到我的網站
          </h1>
          <h2 class="text-2xl md:text-3xl text-blue-600 font-semibold mb-6">
            全端工程師
          </h2>
          <p class="text-lg text-gray-700 mb-8 leading-relaxed">
            我是一位熱愛技術的全端工程師，專精於現代 Web 開發技術。
          </p>
        {/if}

        <!-- 聯絡資訊 -->
        <div class="flex flex-wrap gap-4 justify-center lg:justify-start">
          {#if aboutMe?.email}
            <a
              href="mailto:{aboutMe.email}"
              class="btn-primary"
              aria-label="發送郵件"
            >
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
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              聯絡我
            </a>
          {/if}

          {#if aboutMe?.resume_url}
            <a
              href={aboutMe.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary"
              aria-label="下載履歷"
            >
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              下載履歷
            </a>
          {/if}
        </div>

        <!-- 社群媒體連結 -->
        <div class="flex gap-4 justify-center lg:justify-start mt-6">
          {#if aboutMe?.github_url}
            <a
              href={aboutMe.github_url}
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="GitHub"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
          {/if}

          {#if aboutMe?.linkedin_url}
            <a
              href={aboutMe.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="LinkedIn"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
          {/if}

          {#if aboutMe?.twitter_url}
            <a
              href={aboutMe.twitter_url}
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 hover:text-blue-400 transition-colors"
              aria-label="Twitter"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                />
              </svg>
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 技能展示區塊 -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">技術技能</h2>
      <p class="text-lg text-gray-600">我的專業技能與經驗</p>
    </div>

    {#if Object.keys(skillsByCategory).length > 0}
      <div class="space-y-12">
        {#each Object.entries(skillsByCategory) as [category, categorySkills]}
          <div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-6 text-center">
              {categoryNames[category] || category}
            </h3>
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {#each categorySkills as skill}
                <SkillCard {skill} />
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-center py-12">
        <p class="text-gray-500">暫無技能資料</p>
      </div>
    {/if}
  </div>
</section>

<!-- 工作經歷區塊 -->
<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">工作經歷</h2>
      <p class="text-lg text-gray-600">我的職業發展歷程</p>
    </div>

    {#if experiences.length > 0}
      <div class="relative">
        <!-- 時間軸線 -->
        <div
          class="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-300"
        ></div>

        <div class="space-y-12">
          {#each experiences as experience, index}
            <ExperienceCard {experience} {index} />
          {/each}
        </div>
      </div>
    {:else}
      <div class="text-center py-12">
        <p class="text-gray-500">暫無工作經歷資料</p>
      </div>
    {/if}
  </div>
</section>
