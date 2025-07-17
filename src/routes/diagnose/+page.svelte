<script>
  import { onMount } from 'svelte';
  
  let diagnosis = null;
  let isLoading = false;
  let error = null;

  async function runDiagnosis() {
    isLoading = true;
    error = null;
    diagnosis = null;

    try {
      const response = await fetch('/api/diagnose');
      const data = await response.json();
      
      if (data.success) {
        diagnosis = data.diagnosis;
      } else {
        error = data.error;
        diagnosis = data.diagnosis; // 可能有部分診斷資料
      }
    } catch (err) {
      error = '診斷請求失敗：' + err.message;
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    runDiagnosis();
  });

  function getStatusColor(success) {
    return success ? 'text-green-600' : 'text-red-600';
  }

  function getStatusIcon(success) {
    return success ? '✅' : '❌';
  }
</script>

<svelte:head>
  <title>AWS SES 診斷工具</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-4xl mx-auto px-4">
    <div class="bg-white rounded-lg shadow-md p-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold text-gray-900">🔍 AWS SES 診斷工具</h1>
        <button
          on:click={runDiagnosis}
          disabled={isLoading}
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? '診斷中...' : '重新診斷'}
        </button>
      </div>

      {#if isLoading}
        <div class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span class="ml-3 text-gray-600">正在診斷 AWS SES 設定...</span>
        </div>
      {/if}

      {#if error}
        <div class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <h3 class="text-red-800 font-medium">❌ 診斷失敗</h3>
          <p class="text-red-700 mt-1">{error}</p>
        </div>
      {/if}

      {#if diagnosis}
        <div class="space-y-6">
          <!-- 環境資訊 -->
          <div class="border rounded-lg p-4">
            <h2 class="text-xl font-semibold mb-3">🖥️ 環境資訊</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span class="font-medium">Node.js 版本：</span>
                {diagnosis.environment.nodeVersion}
              </div>
              <div>
                <span class="font-medium">平台：</span>
                {diagnosis.environment.platform}
              </div>
              <div>
                <span class="font-medium">環境：</span>
                {diagnosis.environment.nodeEnv || 'development'}
              </div>
            </div>
          </div>

          <!-- AWS 設定檢查 -->
          <div class="border rounded-lg p-4">
            <h2 class="text-xl font-semibold mb-3">
              {getStatusIcon(diagnosis.awsConfig.valid)} AWS 憑證設定
            </h2>
            <div class="space-y-2 text-sm">
              <div class="flex items-center">
                <span class="font-medium w-40">Access Key ID：</span>
                <span class={getStatusColor(diagnosis.awsConfig.details.hasAccessKeyId)}>
                  {diagnosis.awsConfig.details.hasAccessKeyId ? 
                    `${diagnosis.awsConfig.details.accessKeyIdPreview} (${diagnosis.awsConfig.details.accessKeyIdLength} 字元)` : 
                    '未設定'}
                </span>
              </div>
              <div class="flex items-center">
                <span class="font-medium w-40">Secret Access Key：</span>
                <span class={getStatusColor(diagnosis.awsConfig.details.hasSecretAccessKey)}>
                  {diagnosis.awsConfig.details.hasSecretAccessKey ? 
                    `已設定 (${diagnosis.awsConfig.details.secretAccessKeyLength} 字元)` : 
                    '未設定'}
                </span>
              </div>
              <div class="flex items-center">
                <span class="font-medium w-40">區域：</span>
                <span class="text-gray-700">{diagnosis.awsConfig.details.region}</span>
              </div>
            </div>
            
            {#if diagnosis.awsConfig.details.error}
              <div class="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                <p class="text-red-700 text-sm">錯誤：{diagnosis.awsConfig.details.error}</p>
              </div>
            {/if}
          </div>

          <!-- SES 連接測試 -->
          <div class="border rounded-lg p-4">
            <h2 class="text-xl font-semibold mb-3">📡 SES 服務測試</h2>
            
            {#if diagnosis.sesTests.quota}
              <div class="mb-4">
                <h3 class="font-medium text-green-600 mb-2">✅ 發送配額檢查</h3>
                <div class="bg-green-50 p-3 rounded text-sm">
                  <p>24小時發送限制：{diagnosis.sesTests.quota.data.Max24HourSend}</p>
                  <p>每秒發送限制：{diagnosis.sesTests.quota.data.MaxSendRate}</p>
                  <p>已發送數量：{diagnosis.sesTests.quota.data.SentLast24Hours}</p>
                </div>
              </div>
            {/if}

            {#if diagnosis.sesTests.verifiedEmails}
              <div class="mb-4">
                <h3 class="font-medium {getStatusColor(diagnosis.sesTests.verifiedEmails.data.VerifiedEmailAddresses?.length > 0)} mb-2">
                  {getStatusIcon(diagnosis.sesTests.verifiedEmails.data.VerifiedEmailAddresses?.length > 0)} 已驗證 Email 地址
                </h3>
                <div class="bg-gray-50 p-3 rounded text-sm">
                  {#if diagnosis.sesTests.verifiedEmails.data.VerifiedEmailAddresses?.length > 0}
                    <ul class="space-y-1">
                      {#each diagnosis.sesTests.verifiedEmails.data.VerifiedEmailAddresses as email}
                        <li class="flex items-center">
                          <span class={email === 'yongyuc7@gmail.com' ? 'text-green-600 font-medium' : 'text-gray-700'}>
                            {email}
                          </span>
                          {#if email === 'yongyuc7@gmail.com'}
                            <span class="ml-2 text-green-600">← 目標信箱 ✅</span>
                          {/if}
                        </li>
                      {/each}
                    </ul>
                    
                    {#if !diagnosis.sesTests.verifiedEmails.hasTargetEmail}
                      <div class="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                        <p class="text-yellow-700 text-sm">⚠️ 目標信箱 yongyuc7@gmail.com 尚未驗證</p>
                      </div>
                    {/if}
                  {:else}
                    <p class="text-red-600">沒有已驗證的 email 地址</p>
                  {/if}
                </div>
              </div>
            {/if}

            {#if diagnosis.sesTests.connectionError}
              <div class="mb-4">
                <h3 class="font-medium text-red-600 mb-2">❌ SES 連接失敗</h3>
                <div class="bg-red-50 p-3 rounded text-sm">
                  <p class="text-red-700">錯誤代碼：{diagnosis.sesTests.connectionError.code}</p>
                  <p class="text-red-700">錯誤訊息：{diagnosis.sesTests.connectionError.error}</p>
                </div>
              </div>
            {/if}
          </div>

          <!-- 建議修復步驟 -->
          <div class="border rounded-lg p-4 bg-blue-50">
            <h2 class="text-xl font-semibold mb-3 text-blue-800">💡 修復建議</h2>
            <div class="space-y-2 text-sm text-blue-700">
              {#if !diagnosis.awsConfig.valid}
                <p>• 請在 .env 檔案中設定正確的 AWS_ACCESS_KEY_ID 和 AWS_SECRET_ACCESS_KEY</p>
              {/if}
              {#if diagnosis.sesTests.verifiedEmails && !diagnosis.sesTests.verifiedEmails.hasTargetEmail}
                <p>• 請在 AWS SES 控制台中驗證 yongyuc7@gmail.com</p>
              {/if}
              {#if diagnosis.sesTests.connectionError}
                <p>• 檢查 AWS IAM 用戶是否具有 SES 權限</p>
                <p>• 確認 AWS 憑證是否正確且有效</p>
              {/if}
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
