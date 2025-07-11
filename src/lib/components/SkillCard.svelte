<!--
  技能卡片元件
  展示單個技能的詳細資訊
-->
<script lang="ts">
  import type { Skill } from "$lib/utils/supabaseClient";

  export let skill: Skill;

  // 技能等級對應的顏色
  const levelColors: Record<number, string> = {
    1: "bg-red-100 text-red-800",
    2: "bg-orange-100 text-orange-800",
    3: "bg-yellow-100 text-yellow-800",
    4: "bg-blue-100 text-blue-800",
    5: "bg-green-100 text-green-800",
  };

  // 技能等級描述
  const levelLabels: Record<number, string> = {
    1: "初學者",
    2: "基礎",
    3: "中等",
    4: "熟練",
    5: "專家",
  };

  // 生成星星評級
  function generateStars(level: number): string[] {
    return Array.from({ length: 5 }, (_, i) =>
      i < level ? "filled" : "empty",
    );
  }
</script>

<div class="card p-6 hover:shadow-lg transition-all duration-300 group">
  <!-- 技能圖標和名稱 -->
  <div class="flex items-center mb-4">
    {#if skill.icon_url}
      <img
        src={skill.icon_url}
        alt={skill.name}
        class="w-8 h-8 mr-3 object-contain"
      />
    {:else}
      <div
        class="w-8 h-8 mr-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center"
      >
        <span class="text-white font-bold text-sm">
          {skill.name.charAt(0).toUpperCase()}
        </span>
      </div>
    {/if}

    <div class="flex-1">
      <h4
        class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors"
      >
        {skill.name}
      </h4>
      {#if skill.is_featured}
        <span
          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-1"
        >
          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
          精選
        </span>
      {/if}
    </div>
  </div>

  <!-- 技能等級 -->
  <div class="mb-4">
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm font-medium text-gray-700">技能等級</span>
      <span class="text-xs px-2 py-1 rounded-full {levelColors[skill.level]}">
        {levelLabels[skill.level]}
      </span>
    </div>

    <!-- 星星評級 -->
    <div class="flex space-x-1">
      {#each generateStars(skill.level) as star}
        <svg
          class="w-4 h-4 {star === 'filled'
            ? 'text-yellow-400'
            : 'text-gray-300'}"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          ></path>
        </svg>
      {/each}
    </div>
  </div>

  <!-- 經驗年數 -->
  {#if skill.years_experience}
    <div class="mb-4">
      <span class="text-sm text-gray-600">
        經驗：{skill.years_experience} 年
      </span>
    </div>
  {/if}

  <!-- 技能描述 -->
  {#if skill.description}
    <p class="text-sm text-gray-600 leading-relaxed">
      {skill.description}
    </p>
  {/if}
</div>
