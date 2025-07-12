<!--
  技能卡片元件
  展示單個技能的詳細資訊
-->
<script lang="ts">
  import type { Skill } from "$lib/utils/supabaseClient";

  export let skill: Skill;
</script>

<div class="card p-6 hover:shadow-lg transition-all duration-300 group h-48 flex flex-col justify-between">
  <!-- 技能圖標和名稱 -->
  <div class="flex items-center mb-3">
    {#if skill.icon_url}
      <img
        src={skill.icon_url}
        alt={skill.name}
        class="w-10 h-10 mr-3 object-contain flex-shrink-0"
      />
    {:else}
      <div
        class="w-10 h-10 mr-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0"
      >
        <span class="text-white font-bold text-sm">
          {skill.name.charAt(0).toUpperCase()}
        </span>
      </div>
    {/if}

    <div class="flex-1 min-w-0">
      <h4
        class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-base truncate"
      >
        {skill.name}
      </h4>
    </div>
  </div>

  <!-- 技能描述 -->
  <div class="flex-1 flex flex-col justify-center">
    {#if skill.description}
      <p class="text-sm text-gray-600 leading-relaxed line-clamp-3">
        {skill.description}
      </p>
    {:else}
      <p class="text-sm text-gray-600 leading-relaxed">
        專業的 {skill.name} 技術能力，<br>
        具備實際開發經驗，<br>
        能夠應用於各種專案中。
      </p>
    {/if}
  </div>

  <!-- 底部資訊 -->
  {#if skill.is_featured}
    <div class="flex justify-center mt-2">
      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        精選
      </span>
    </div>
  {/if}
</div>
