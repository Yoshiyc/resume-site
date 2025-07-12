<!--
  工作經歷卡片元件
  展示單個工作經歷的詳細資訊
-->
<script lang="ts">
  import type { Experience } from '$lib/utils/supabaseClient';
  
  export let experience: Experience;
  export const index: number = 0; // 不再使用，保留以維持向後相容性
  
  // 格式化日期
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long'
    });
  }
  
  // 計算工作期間
  function calculateDuration(startDate: string, endDate?: string): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                   (end.getMonth() - start.getMonth());
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} 個月`;
    } else if (remainingMonths === 0) {
      return `${years} 年`;
    } else {
      return `${years} 年 ${remainingMonths} 個月`;
    }
  }
</script>

<!-- 時間軸節點 -->
<div class="relative flex items-center justify-center">
  <div class="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
</div>

<!-- 經歷卡片 -->
<div class="w-full max-w-2xl mx-auto">
  <div class="card p-6 hover:shadow-lg transition-all duration-300 relative text-center">
      <!-- 公司資訊 -->
      <div class="flex flex-col items-center mb-4">
        {#if experience.company_logo_url}
          <img
            src={experience.company_logo_url}
            alt={experience.company}
            class="w-16 h-16 rounded-lg object-contain mb-3"
          />
        {/if}

        <div class="text-center">
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            {experience.position}
          </h3>
          <div class="flex items-center justify-center">
            {#if experience.company_url}
              <a
                href={experience.company_url}
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                {experience.company}
              </a>
            {:else}
              <span class="text-blue-600 font-semibold">
                {experience.company}
              </span>
            {/if}

            {#if experience.is_current}
              <span class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                目前職位
              </span>
            {/if}
          </div>
        </div>
      </div>
      
      <!-- 時間和地點 -->
      <div class="mb-4 text-sm text-gray-600 text-center">
        <div class="flex items-center justify-center mb-1">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2"></path>
          </svg>
          <span>
            {formatDate(experience.start_date)} -
            {experience.end_date ? formatDate(experience.end_date) : '至今'}
            ({calculateDuration(experience.start_date, experience.end_date)})
          </span>
        </div>

        {#if experience.location}
          <div class="flex items-center justify-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>{experience.location}</span>
          </div>
        {/if}
      </div>
      
      <!-- 工作描述 -->
      {#if experience.description}
        <p class="text-gray-700 mb-4 leading-relaxed text-center">
          {experience.description}
        </p>
      {/if}

      <!-- 主要成就 -->
      {#if experience.achievements && experience.achievements.length > 0}
        <div class="mb-4">
          <h4 class="font-semibold text-gray-900 mb-2 text-center">
            主要成就
          </h4>
          <ul class="space-y-2 text-center">
            {#each experience.achievements as achievement}
              <li class="text-gray-700 text-sm flex items-center justify-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{achievement}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/if}

      <!-- 使用技術 -->
      {#if experience.technologies && experience.technologies.length > 0}
        <div>
          <h4 class="font-semibold text-gray-900 mb-2 text-center">
            使用技術
          </h4>
          <div class="flex flex-wrap gap-2 justify-center">
            {#each experience.technologies as tech}
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {tech}
              </span>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
