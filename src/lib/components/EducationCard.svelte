<!--
  學歷卡片元件
  展示單個學歷的詳細資訊
-->
<script lang="ts">
  import type { Education } from '$lib/utils/supabaseClient';
  
  export let education: Education;
  export const index: number = 0; // 不再使用，保留以維持向後相容性
  export let isAuthenticated: boolean = false;
  
  // 格式化日期為 YYYY 年 MM 月格式
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long'
    });
  }
  
  // 計算學習期間
  function calculateDuration(startDate: string, endDate?: string): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    
    let totalMonths = years * 12 + months;
    if (totalMonths < 0) totalMonths = 0;
    
    if (totalMonths < 12) {
      return `${totalMonths} 個月`;
    } else {
      const displayYears = Math.floor(totalMonths / 12);
      const displayMonths = totalMonths % 12;
      if (displayMonths === 0) {
        return `${displayYears} 年`;
      } else {
        return `${displayYears} 年 ${displayMonths} 個月`;
      }
    }
  }
</script>

<!-- 時間軸節點 -->
<div class="relative flex items-center justify-center">
  <div class="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
</div>

<!-- 學歷卡片 -->
<div class="w-full max-w-2xl mx-auto">
  <div class="card p-6 hover:shadow-lg transition-all duration-300 relative text-center">
    
    <!-- 編輯按鈕 (僅登入時顯示) -->
    {#if isAuthenticated}
      <div class="absolute top-4 right-4 flex gap-2">
        <button
          type="button"
          class="text-blue-600 hover:text-blue-800 transition-colors"
          title="編輯學歷"
          aria-label="編輯學歷"
          on:click={() => {
            // 觸發編輯事件
            const event = new CustomEvent('edit-education', {
              detail: { education }
            });
            document.dispatchEvent(event);
          }}
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          type="button"
          class="text-red-600 hover:text-red-800 transition-colors"
          title="刪除學歷"
          aria-label="刪除學歷"
          on:click={() => {
            if (confirm('確定要刪除這筆學歷嗎？')) {
              const event = new CustomEvent('delete-education', {
                detail: { id: education.id }
              });
              document.dispatchEvent(event);
            }
          }}
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    {/if}
    
    <!-- 學校資訊 -->
    <div class="flex flex-col items-center mb-4">
      <div class="text-center">
        <h3 class="text-xl font-bold text-gray-900 mb-2">
          {education.degree}
        </h3>
        <div class="flex items-center justify-center">
          <span class="text-blue-600 font-semibold">
            {education.school}
          </span>
        </div>
        {#if education.department}
          <div class="text-gray-600 mt-1">
            {education.department}
          </div>
        {/if}
      </div>
    </div>
    
    <!-- 時間和期間 -->
    <div class="mb-4 text-sm text-gray-600 text-center">
      <div class="flex items-center justify-center mb-1">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2"></path>
        </svg>
        <span>
          {formatDate(education.start_date)} -
          {education.end_date ? formatDate(education.end_date) : '至今'}
          ({calculateDuration(education.start_date, education.end_date)})
        </span>
      </div>
    </div>

    <!-- 補充說明 -->
    {#if education.description}
      <div class="text-gray-700 text-sm leading-relaxed text-center whitespace-pre-line">
        {education.description}
      </div>
    {/if}
  </div>
</div>
