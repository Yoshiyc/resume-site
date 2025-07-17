<!--
  關於我頁面
  展示個人簡介、技能和工作經歷
-->
<script lang="ts">
  import type { PageData } from "./$types";
  import SkillCard from "$lib/components/SkillCard.svelte";
  import ExperienceCard from "$lib/components/ExperienceCard.svelte";
  import EducationCard from "$lib/components/EducationCard.svelte";

  export let data: PageData;

  $: ({ aboutMe, skills, experiences, educations, learningSteps, devCommunities, isAuthenticated } = data);

  // 移除分類邏輯，直接使用所有技能統一顯示

  // 學歷編輯相關狀態
  let showEducationModal = false;
  let editingEducation: any = null;
  let isSubmitting = false;

  // 學歷表單資料
  let educationForm = {
    school: '',
    department: '',
    degree: '',
    start_date: '',
    end_date: '',
    description: ''
  };

  // 重置表單
  function resetEducationForm() {
    educationForm = {
      school: '',
      department: '',
      degree: '',
      start_date: '',
      end_date: '',
      description: ''
    };
    editingEducation = null;
  }

  // 開啟新增學歷 modal
  function openAddEducationModal() {
    resetEducationForm();
    showEducationModal = true;
  }

  // 開啟編輯學歷 modal
  function openEditEducationModal(education: any) {
    editingEducation = education;
    educationForm = {
      school: education.school || '',
      department: education.department || '',
      degree: education.degree || '',
      start_date: education.start_date || '',
      end_date: education.end_date || '',
      description: education.description || ''
    };
    showEducationModal = true;
  }

  // 關閉 modal
  function closeEducationModal() {
    showEducationModal = false;
    resetEducationForm();
  }

  // 提交學歷表單
  async function submitEducationForm() {
    if (!educationForm.school || !educationForm.degree || !educationForm.start_date) {
      alert('請填寫必填欄位：學校、學位、開始日期');
      return;
    }

    isSubmitting = true;

    try {
      const formData = new FormData();
      formData.append('school', educationForm.school);
      formData.append('department', educationForm.department);
      formData.append('degree', educationForm.degree);
      formData.append('start_date', educationForm.start_date);
      formData.append('end_date', educationForm.end_date);
      formData.append('description', educationForm.description);

      if (editingEducation) {
        formData.append('id', editingEducation.id.toString());
      }

      const response = await fetch('?/upsertEducation', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.type === 'success') {
        closeEducationModal();
        // 重新載入頁面以更新資料
        window.location.reload();
      } else {
        alert(result.data?.error || '操作失敗');
      }
    } catch (error) {
      console.error('Submit education error:', error);
      alert('系統錯誤，請稍後再試');
    } finally {
      isSubmitting = false;
    }
  }

  // 刪除學歷
  async function deleteEducation(id: number) {
    try {
      const formData = new FormData();
      formData.append('id', id.toString());

      const response = await fetch('?/deleteEducation', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.type === 'success') {
        // 重新載入頁面以更新資料
        window.location.reload();
      } else {
        alert(result.data?.error || '刪除失敗');
      }
    } catch (error) {
      console.error('Delete education error:', error);
      alert('系統錯誤，請稍後再試');
    }
  }

  // 監聽自定義事件
  if (typeof document !== 'undefined') {
    document.addEventListener('add-education', openAddEducationModal);
    document.addEventListener('edit-education', (event: any) => {
      openEditEducationModal(event.detail.education);
    });
    document.addEventListener('delete-education', (event: any) => {
      deleteEducation(event.detail.id);
    });
  }
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
          <div class="text-lg text-gray-700 mb-8 leading-relaxed whitespace-pre-line">
            {aboutMe.bio || "歡迎來到我的個人網站！"}
          </div>
        {:else}
          <!-- 預設內容當沒有個人資訊時 -->
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            歡迎來到我的網站
          </h1>
          <h2 class="text-2xl md:text-3xl text-blue-600 font-semibold mb-6">
            初階工程師
          </h2>
          <p class="text-lg text-gray-700 mb-8 leading-relaxed">
            我能結合 AI 工具獨立完成網站開發與部署。
          </p>
        {/if}

        <!-- 聯絡資訊 -->
        <div class="flex flex-wrap gap-4 justify-center lg:justify-start">
          {#if aboutMe?.email}
            <div class="flex items-center text-gray-700">
              <svg
                class="w-5 h-5 mr-2 text-blue-600"
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
              <a
                href="mailto:{aboutMe.email}"
                class="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {aboutMe.email}
              </a>
            </div>
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
              title="GitHub: {aboutMe.github_url}"
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

    {#if skills.length > 0}
      <!-- 自定義佈局：第一列三個，第二列兩個 -->
      <div class="max-w-4xl mx-auto">
        <!-- 第一列：三個技能卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {#each skills.slice(0, 3) as skill}
            <SkillCard {skill} />
          {/each}
        </div>

        <!-- 第二列：兩個技能卡片，置中顯示 -->
        {#if skills.length > 3}
          <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              {#each skills.slice(3, 5) as skill}
                <SkillCard {skill} />
              {/each}
            </div>
          </div>
        {/if}

        <!-- 如果有超過5個技能，剩餘的用標準網格顯示 -->
        {#if skills.length > 5}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {#each skills.slice(5) as skill}
              <SkillCard {skill} />
            {/each}
          </div>
        {/if}
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

<!-- 學歷區塊 -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <div class="flex items-center justify-center gap-4 mb-4">
        <h2 class="text-3xl font-bold text-gray-900">學歷</h2>
        {#if isAuthenticated}
          <button
            type="button"
            class="btn-primary text-sm"
            on:click={() => {
              const event = new CustomEvent('add-education');
              document.dispatchEvent(event);
            }}
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            新增學歷
          </button>
        {/if}
      </div>
      <p class="text-lg text-gray-600">我的教育背景</p>
    </div>

    {#if educations && educations.length > 0}
      <div class="relative">
        <!-- 時間軸線 -->
        <div
          class="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-300"
        ></div>

        <div class="space-y-12">
          {#each educations as education, index}
            <EducationCard {education} {index} {isAuthenticated} />
          {/each}
        </div>
      </div>
    {:else}
      <div class="text-center py-12">
        <p class="text-gray-500">暫無學歷資料</p>
      </div>
    {/if}
  </div>
</section>

<!-- Vibe Coding 學習流程區塊 -->
<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">🧠 Vibe Coding 學習流程</h2>
      <p class="text-lg text-gray-600">我的程式學習方法與步驟</p>
    </div>

    {#if learningSteps && learningSteps.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each learningSteps as step}
          <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div class="flex items-center mb-4">
              <span class="text-2xl mr-3">{step.step_number}</span>
              <h3 class="text-xl font-semibold text-gray-900">{step.title}</h3>
            </div>
            <p class="text-gray-600 leading-relaxed">{step.description}</p>
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-center py-12">
        <p class="text-gray-500">暫無學習流程資料</p>
      </div>
    {/if}
  </div>
</section>

<!-- 已加入的開發社群區塊 -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">🌐 已加入的開發社群</h2>
      <p class="text-lg text-gray-600">我參與的技術社群與平台</p>
    </div>

    {#if devCommunities && devCommunities.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each devCommunities as community}
          <div class="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-300 text-center">
            <div class="mb-4">
              <img
                src={community.icon_url}
                alt={community.name}
                class="w-12 h-12 mx-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{community.name}</h3>
            <p class="text-sm text-gray-600 leading-relaxed">{community.description}</p>
            {#if community.website_url}
              <a
                href={community.website_url}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                訪問社群
                <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            {/if}
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-center py-12">
        <p class="text-gray-500">暫無社群資料</p>
      </div>
    {/if}
  </div>
</section>

<!-- 學歷編輯 Modal -->
{#if showEducationModal}
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" role="dialog" aria-modal="true" tabindex="-1" on:click={closeEducationModal} on:keydown={(e: KeyboardEvent) => e.key === 'Escape' && closeEducationModal()}>
    <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white" on:click|stopPropagation>
      <div class="mt-3">
        <!-- Modal Header -->
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {editingEducation ? '編輯學歷' : '新增學歷'}
          </h3>
          <button
            type="button"
            class="text-gray-400 hover:text-gray-600"
            aria-label="關閉對話框"
            on:click={closeEducationModal}
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <form on:submit|preventDefault={submitEducationForm} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- 學校 -->
            <div>
              <label for="school" class="block text-sm font-medium text-gray-700 mb-1">
                學校 <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="school"
                bind:value={educationForm.school}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <!-- 系所 -->
            <div>
              <label for="department" class="block text-sm font-medium text-gray-700 mb-1">
                系所
              </label>
              <input
                type="text"
                id="department"
                bind:value={educationForm.department}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <!-- 學位 -->
            <div>
              <label for="degree" class="block text-sm font-medium text-gray-700 mb-1">
                學位 <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="degree"
                bind:value={educationForm.degree}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <!-- 開始日期 -->
            <div>
              <label for="start_date" class="block text-sm font-medium text-gray-700 mb-1">
                開始日期 <span class="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="start_date"
                bind:value={educationForm.start_date}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <!-- 結束日期 -->
            <div class="md:col-span-2">
              <label for="end_date" class="block text-sm font-medium text-gray-700 mb-1">
                結束日期（留空表示至今）
              </label>
              <input
                type="date"
                id="end_date"
                bind:value={educationForm.end_date}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- 補充說明 -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
              補充說明
            </label>
            <textarea
              id="description"
              bind:value={educationForm.description}
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="可填寫主修課程、成績、獲獎記錄等..."
            ></textarea>
          </div>

          <!-- Modal Footer -->
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              on:click={closeEducationModal}
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {#if isSubmitting}
                處理中...
              {:else}
                {editingEducation ? '更新' : '新增'}
              {/if}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}
