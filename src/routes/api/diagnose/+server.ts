/**
 * 診斷 API - 檢查所有 AWS SES 相關設定
 */

import { json } from '@sveltejs/kit';
import { validateSESConfig } from '$lib/utils/emailService';
import { SESClient, GetSendQuotaCommand, ListVerifiedEmailAddressesCommand } from '@aws-sdk/client-ses';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    console.log('=== AWS SES 診斷開始 ===');
    
    // 1. 檢查環境變數
    const configResult = await validateSESConfig();
    console.log('1. 環境變數檢查:', configResult);
    
    const diagnosis = {
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        platform: process.platform,
        nodeVersion: process.version
      },
      awsConfig: configResult,
      sesTests: {}
    };

    if (!configResult.valid) {
      return json({
        success: false,
        diagnosis,
        error: '環境變數設定無效'
      });
    }

    // 2. 測試 SES 客戶端連接
    try {
      const sesClient = new SESClient({
        region: 'ap-southeast-2',
        credentials: {
          accessKeyId: env.AWS_ACCESS_KEY_ID || '',
          secretAccessKey: env.AWS_SECRET_ACCESS_KEY || ''
        }
      });

      console.log('2. 測試 SES 連接...');
      
      // 測試取得發送配額
      const quotaCommand = new GetSendQuotaCommand({});
      const quotaResult = await sesClient.send(quotaCommand);
      
      diagnosis.sesTests.quota = {
        success: true,
        data: quotaResult
      };
      
      console.log('3. SES 配額檢查成功:', quotaResult);

      // 測試取得已驗證的 email 地址
      const verifiedEmailsCommand = new ListVerifiedEmailAddressesCommand({});
      const verifiedEmailsResult = await sesClient.send(verifiedEmailsCommand);
      
      diagnosis.sesTests.verifiedEmails = {
        success: true,
        data: verifiedEmailsResult,
        hasTargetEmail: verifiedEmailsResult.VerifiedEmailAddresses?.includes('yongyuc7@gmail.com') || false
      };
      
      console.log('4. 已驗證 Email 檢查:', verifiedEmailsResult);

    } catch (sesError) {
      console.error('SES 連接測試失敗:', sesError);
      diagnosis.sesTests.connectionError = {
        success: false,
        error: sesError instanceof Error ? sesError.message : 'Unknown SES error',
        code: (sesError as any)?.name || 'UnknownError'
      };
    }

    console.log('=== AWS SES 診斷完成 ===');

    return json({
      success: true,
      diagnosis
    });

  } catch (error) {
    console.error('診斷 API 錯誤:', error);
    return json({
      success: false,
      error: error instanceof Error ? error.message : '診斷過程發生未知錯誤'
    }, { status: 500 });
  }
};
