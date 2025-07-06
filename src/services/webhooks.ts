const WEBHOOK_AUTH_KEY = import.meta.env.VITE_WEBHOOK_AUTH_KEY;

interface WebhookConfig {
  customerUrl: string;
  crawlUrl: string;
  uploadUrl: string;
  extractionUrl: string;
  valueMapUrl: string;
}

const webhookConfig: WebhookConfig = {
  customerUrl: import.meta.env.VITE_CUSTOMER_WEBHOOK_URL || '',
  crawlUrl: import.meta.env.VITE_CRAWL_WEBHOOK_URL || '',
  uploadUrl: import.meta.env.VITE_UPLOAD_WEBHOOK_URL || '',
  extractionUrl: import.meta.env.VITE_EXTRACTION_WEBHOOK_URL || '',
  valueMapUrl: import.meta.env.VITE_VALUE_MAP_WEBHOOK_URL || '',
};

async function callWebhook(url: string, payload: any) {
  if (!url) {
    throw new Error('Webhook URL not configured');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(WEBHOOK_AUTH_KEY && { 'Authorization': `Bearer ${WEBHOOK_AUTH_KEY}` }),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook failed: ${response.statusText}`);
  }

  return response.json();
}

export const webhooks = {
  createCustomer: (data: { name: string; metadata?: any }) =>
    callWebhook(webhookConfig.customerUrl, data),
    
  startCrawl: (data: { customer_id: number; url: string; limit: number }) =>
    callWebhook(webhookConfig.crawlUrl, data),
    
  uploadDocument: (data: { customer_id: number; file: string; filename: string; content_type: string }) =>
    callWebhook(webhookConfig.uploadUrl, data),
    
  startExtraction: (data: { customer_id: number; document_ids: number[] }) =>
    callWebhook(webhookConfig.extractionUrl, data),
    
  generateValueMap: (data: { customer_id: number; extraction_id: number }) =>
    callWebhook(webhookConfig.valueMapUrl, data),
};