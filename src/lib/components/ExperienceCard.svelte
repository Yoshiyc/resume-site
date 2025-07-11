<!--
  工作經歷卡片元件
  展示單個工作經歷的詳細資訊
-->
<script lang="ts">
  import type { Experience } from '$lib/utils/supabaseClient';
  
  export let experience: Experience;
  export let index: number;
  
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

<div class="relative flex items-center">
  <!-- 時間軸節點 -->
  <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
  
  <!-- 經歷卡片 -->
  <div class="w-full {index % 2 === 0 ? 'pr-1/2 text-right' : 'pl-1/2 text-left'}">
    <div class="card p-6 {index % 2 === 0 ? 'mr-8' : 'ml-8'} hover:shadow-lg transition-all duration-300">
      <!-- 公司資訊 -->
      <div class="flex items-center {index % 2 === 0 ? 'justify-end' : 'justify-start'} mb-4">
        {#if experience.company_logo_url && index % 2 !== 0}
          <img 
            src={experience.company_logo_url} 
            alt={experience.company}
            class="w-12 h-12 rounded-lg object-contain mr-4"
          />
        {/if}
        
        <div class="{index % 2 === 0 ? 'text-right' : 'text-left'}">
          <h3 class="text-xl font-bold text-gray-900">
            {experience.position}
          </h3>
          <div class="flex items-center {index % 2 === 0 ? 'justify-end' : 'justify-start'} mt-1">
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
        
        {#if experience.company_logo_url && index % 2 === 0}
          <img 
            src={experience.company_logo_url} 
            alt={experience.company}
            class="w-12 h-12 rounded-lg object-contain ml-4"
          />
        {/if}
      </div>
      
      <!-- 時間和地點 -->
      <div class="mb-4 text-sm text-gray-600">
        <div class="flex items-center {index % 2 === 0 ? 'justify-end' : 'justify-start'} mb-1">
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
          <div class="flex items-center {index % 2 === 0 ? 'justify-end' : 'justify-start'}">
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
        <p class="text-gray-700 mb-4 leading-relaxed {index % 2 === 0 ? 'text-right' : 'text-left'}">
          {experience.description}
        </p>
      {/if}
      
      <!-- 主要成就 -->
      {#if experience.achievements && experience.achievements.length > 0}
        <div class="mb-4">
          <h4 class="font-semibold text-gray-900 mb-2 {index % 2 === 0 ? 'text-right' : 'text-left'}">
            主要成就
          </h4>
          <ul class="space-y-1 {index % 2 === 0 ? 'text-right' : 'text-left'}">
            {#each experience.achievements as achievement}
              <li class="text-gray-700 text-sm flex items-start {index % 2 === 0 ? 'justify-end' : 'justify-start'}">
                <svg class="w-4 h-4 text-green-500 mt-0.5 {index % 2 === 0 ? 'ml-2 order-2' : 'mr-2'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="{index % 2 === 0 ? 'order-1' : ''}">
                  {achievement}
                </span>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
      
      <!-- 使用技術 -->
      {#if experience.technologies && experience.technologies.length > 0}
        <div>
          <h4 class="font-semibold text-gray-900 mb-2 {index % 2 === 0 ? 'text-right' : 'text-left'}">
            使用技術
          </h4>
          <div class="flex flex-wrap gap-2 {index % 2 === 0 ? 'justify-end' : 'justify-start'}">
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
</div>
