/**
 * Data Monetization & Strategic Insights API Functions
 * B2B Data SaaS platform for Smart Hajj Ecosystem analytics
 */

import {
  DataProduct,
  DataSubscriber,
  InsightsDashboard,
  MarketIntelligence,
  PredictiveModel,
  APIUsageMetrics,
  RevenueAnalytics,
  DataQualityMetrics,
  CompetitiveAnalysis
} from '@/types/data-monetization';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Data Products Management
export async function getAllDataProducts(): Promise<DataProduct[]> {
  const response = await fetch(`${API_BASE}/admin/data-products`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch data products');
  }
  
  return response.json();
}

export async function getDataProduct(id: string): Promise<DataProduct> {
  const response = await fetch(`${API_BASE}/admin/data-products/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch data product');
  }
  
  return response.json();
}

export async function createDataProduct(product: Partial<DataProduct>): Promise<DataProduct> {
  const response = await fetch(`${API_BASE}/admin/data-products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create data product');
  }
  
  return response.json();
}

export async function updateDataProduct(id: string, updates: Partial<DataProduct>): Promise<DataProduct> {
  const response = await fetch(`${API_BASE}/admin/data-products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update data product');
  }
  
  return response.json();
}

export async function publishDataProduct(id: string): Promise<DataProduct> {
  const response = await fetch(`${API_BASE}/admin/data-products/${id}/publish`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error('Failed to publish data product');
  }
  
  return response.json();
}

// Subscribers Management
export async function getAllSubscribers(): Promise<DataSubscriber[]> {
  const response = await fetch(`${API_BASE}/admin/data-subscribers`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch subscribers');
  }
  
  return response.json();
}

export async function getSubscriber(id: string): Promise<DataSubscriber> {
  const response = await fetch(`${API_BASE}/admin/data-subscribers/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch subscriber');
  }
  
  return response.json();
}

export async function approveSubscriber(id: string): Promise<DataSubscriber> {
  const response = await fetch(`${API_BASE}/admin/data-subscribers/${id}/approve`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error('Failed to approve subscriber');
  }
  
  return response.json();
}

export async function suspendSubscriber(id: string, reason: string): Promise<DataSubscriber> {
  const response = await fetch(`${API_BASE}/admin/data-subscribers/${id}/suspend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reason }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to suspend subscriber');
  }
  
  return response.json();
}

// Analytics & Insights
export async function getInsightsDashboard(): Promise<InsightsDashboard> {
  const response = await fetch(`${API_BASE}/admin/insights/dashboard`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch insights dashboard');
  }
  
  return response.json();
}

export async function getMarketIntelligence(category?: string): Promise<MarketIntelligence[]> {
  const params = category ? `?category=${category}` : '';
  const response = await fetch(`${API_BASE}/admin/insights/market-intelligence${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch market intelligence');
  }
  
  return response.json();
}

export async function generateMarketReport(params: {
  category: string;
  timeframe: string;
  metrics: string[];
}): Promise<MarketIntelligence> {
  const response = await fetch(`${API_BASE}/admin/insights/generate-report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate market report');
  }
  
  return response.json();
}

// Predictive Models
export async function getPredictiveModels(): Promise<PredictiveModel[]> {
  const response = await fetch(`${API_BASE}/admin/models/predictive`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch predictive models');
  }
  
  return response.json();
}

export async function trainPredictiveModel(modelConfig: {
  name: string;
  type: string;
  dataSource: string;
  parameters: Record<string, any>;
}): Promise<PredictiveModel> {
  const response = await fetch(`${API_BASE}/admin/models/train`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(modelConfig),
  });
  
  if (!response.ok) {
    throw new Error('Failed to train predictive model');
  }
  
  return response.json();
}

export async function deployModel(modelId: string): Promise<PredictiveModel> {
  const response = await fetch(`${API_BASE}/admin/models/${modelId}/deploy`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error('Failed to deploy model');
  }
  
  return response.json();
}

// API Usage Analytics
export async function getAPIUsageMetrics(timeframe: string = '7d'): Promise<APIUsageMetrics> {
  const response = await fetch(`${API_BASE}/admin/analytics/api-usage?timeframe=${timeframe}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch API usage metrics');
  }
  
  return response.json();
}

export async function getSubscriberUsage(subscriberId: string, timeframe: string = '30d'): Promise<APIUsageMetrics> {
  const response = await fetch(`${API_BASE}/admin/analytics/subscriber-usage/${subscriberId}?timeframe=${timeframe}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch subscriber usage');
  }
  
  return response.json();
}

// Revenue Analytics
export async function getRevenueAnalytics(timeframe: string = '30d'): Promise<RevenueAnalytics> {
  const response = await fetch(`${API_BASE}/admin/analytics/revenue?timeframe=${timeframe}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch revenue analytics');
  }
  
  return response.json();
}

export async function getRevenueByProduct(timeframe: string = '30d'): Promise<Array<{
  productId: string;
  productName: string;
  revenue: number;
  growth: number;
}>> {
  const response = await fetch(`${API_BASE}/admin/analytics/revenue/by-product?timeframe=${timeframe}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch revenue by product');
  }
  
  return response.json();
}

export async function getRevenueProjections(): Promise<Array<{
  month: string;
  projectedRevenue: number;
  confidence: number;
}>> {
  const response = await fetch(`${API_BASE}/admin/analytics/revenue/projections`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch revenue projections');
  }
  
  return response.json();
}

// Data Quality & Monitoring
export async function getDataQualityMetrics(): Promise<DataQualityMetrics> {
  const response = await fetch(`${API_BASE}/admin/data-quality/metrics`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch data quality metrics');
  }
  
  return response.json();
}

export async function runDataQualityCheck(datasetId: string): Promise<DataQualityMetrics> {
  const response = await fetch(`${API_BASE}/admin/data-quality/check/${datasetId}`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error('Failed to run data quality check');
  }
  
  return response.json();
}

// Competitive Analysis
export async function getCompetitiveAnalysis(): Promise<CompetitiveAnalysis[]> {
  const response = await fetch(`${API_BASE}/admin/competitive/analysis`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch competitive analysis');
  }
  
  return response.json();
}

export async function updateCompetitiveData(analysis: Partial<CompetitiveAnalysis>): Promise<CompetitiveAnalysis> {
  const response = await fetch(`${API_BASE}/admin/competitive/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(analysis),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update competitive data');
  }
  
  return response.json();
}

// Data Export & Integration
export async function exportDataProduct(productId: string, format: 'json' | 'csv' | 'xml' = 'json'): Promise<Blob> {
  const response = await fetch(`${API_BASE}/admin/data-products/${productId}/export?format=${format}`);
  
  if (!response.ok) {
    throw new Error('Failed to export data product');
  }
  
  return response.blob();
}

export async function scheduleDataRefresh(productId: string, schedule: string): Promise<{ success: boolean }> {
  const response = await fetch(`${API_BASE}/admin/data-products/${productId}/schedule-refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ schedule }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to schedule data refresh');
  }
  
  return response.json();
}

// API Key Management
export async function generateAPIKey(subscriberId: string, permissions: string[]): Promise<{
  apiKey: string;
  permissions: string[];
  expiresAt: Date;
}> {
  const response = await fetch(`${API_BASE}/admin/api-keys/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subscriberId, permissions }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate API key');
  }
  
  return response.json();
}

export async function revokeAPIKey(keyId: string): Promise<{ success: boolean }> {
  const response = await fetch(`${API_BASE}/admin/api-keys/${keyId}/revoke`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error('Failed to revoke API key');
  }
  
  return response.json();
}

// Audit & Compliance
export async function getDataAccessAudit(timeframe: string = '30d'): Promise<Array<{
  timestamp: Date;
  subscriberId: string;
  productId: string;
  action: string;
  ipAddress: string;
  userAgent: string;
}>> {
  const response = await fetch(`${API_BASE}/admin/audit/data-access?timeframe=${timeframe}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch data access audit');
  }
  
  return response.json();
}

export async function generateComplianceReport(type: 'gdpr' | 'sox' | 'iso27001'): Promise<Blob> {
  const response = await fetch(`${API_BASE}/admin/compliance/report/${type}`);
  
  if (!response.ok) {
    throw new Error('Failed to generate compliance report');
  }
  
  return response.blob();
}

// Export all functions
export const dataMonetizationApi = {
  // Data Products
  getAllDataProducts,
  getDataProduct,
  createDataProduct,
  updateDataProduct,
  publishDataProduct,
  
  // Subscribers
  getAllSubscribers,
  getSubscriber,
  approveSubscriber,
  suspendSubscriber,
  
  // Analytics & Insights
  getInsightsDashboard,
  getMarketIntelligence,
  generateMarketReport,
  
  // Predictive Models
  getPredictiveModels,
  trainPredictiveModel,
  deployModel,
  
  // Usage & Revenue Analytics
  getAPIUsageMetrics,
  getSubscriberUsage,
  getRevenueAnalytics,
  getRevenueByProduct,
  getRevenueProjections,
  
  // Data Quality
  getDataQualityMetrics,
  runDataQualityCheck,
  
  // Competitive Analysis
  getCompetitiveAnalysis,
  updateCompetitiveData,
  
  // Export & Integration
  exportDataProduct,
  scheduleDataRefresh,
  
  // API Management
  generateAPIKey,
  revokeAPIKey,
  
  // Audit & Compliance
  getDataAccessAudit,
  generateComplianceReport
};
