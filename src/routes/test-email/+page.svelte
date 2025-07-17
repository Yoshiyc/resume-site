<script>
  let isLoading = false;
  let result = null;

  async function testEmail() {
    isLoading = true;
    result = null;

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      result = data;
    } catch (error) {
      result = {
        success: false,
        error: '請求失敗：' + error.message
      };
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Email 功能測試</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-2xl mx-auto px-4">
    <div class="bg-white rounded-lg shadow-md p-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">📧 Email 功能測試</h1>
      
      <div class="mb-6">
        <p class="text-gray-600 mb-4">
          此頁面用於測試 AWS SES email 發送功能。點擊下方按鈕將發送一封測試郵件到 yongyuc7@gmail.com。
        </p>
        
        <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
          <h3 class="text-sm font-medium text-yellow-800 mb-2">⚠️ 使用前請確認：</h3>
          <ul class="text-sm text-yellow-700 space-y-1">
            <li>• 已在 .env 檔案中設定 AWS_ACCESS_KEY_ID 和 AWS_SECRET_ACCESS_KEY</li>
            <li>• AWS SES 已驗證 yongyuc7@gmail.com</li>
            <li>• AWS IAM 用戶具有 SES 發送權限</li>
          </ul>
        </div>
      </div>

      <button
        on:click={testEmail}
        disabled={isLoading}
        class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {#if isLoading}
          <span class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            發送中...
          </span>
        {:else}
          🚀 發送測試郵件
        {/if}
      </button>

      {#if result}
        <div class="mt-6">
          {#if result.success}
            <div class="bg-green-50 border border-green-200 rounded-md p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-green-800">✅ 發送成功！</h3>
                  <p class="mt-1 text-sm text-green-700">{result.message}</p>
                </div>
              </div>
            </div>
          {:else}
            <div class="bg-red-50 border border-red-200 rounded-md p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800">❌ 發送失敗</h3>
                  <p class="mt-1 text-sm text-red-700">{result.error}</p>
                </div>
              </div>
            </div>
          {/if}
        </div>
      {/if}

      <div class="mt-8 pt-6 border-t border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-3">🔧 故障排除</h3>
        <div class="text-sm text-gray-600 space-y-2">
          <p><strong>如果發送失敗，請檢查：</strong></p>
          <ul class="list-disc list-inside space-y-1 ml-4">
            <li>AWS 憑證是否正確設定在 .env 檔案中</li>
            <li>AWS SES 是否已驗證 yongyuc7@gmail.com</li>
            <li>AWS SES 是否在正確的區域（ap-southeast-2）</li>
            <li>IAM 用戶是否具有 ses:SendEmail 權限</li>
            <li>檢查瀏覽器開發者工具的 Console 和 Network 標籤</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
