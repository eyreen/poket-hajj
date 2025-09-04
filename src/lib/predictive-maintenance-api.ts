/**
 * Predictive Maintenance API
 * AI-powered infrastructure monitoring and maintenance management for Smart Hajj
 */

import {
  InfrastructureAsset,
  SensorReading,
  MaintenancePrediction,
  MaintenanceWorkOrder,
  MaintenanceRecord,
  AssetPerformanceReport,
  MaintenanceOptimization,
  MaintenanceKPI,
  PredictiveModel,
  MaintenanceAlert,
  PredictiveMaintenanceResponse,
  AssetType,
  MaintenanceType,
  WorkOrderPriority,
  WorkOrderStatus,
  ModelType,
  HajjZone
} from '@/types/predictive-maintenance';

const API_BASE = '/api/predictive-maintenance';

// Asset Management
export const predictiveMaintenanceApi = {
  // Asset Management
  async getAssets(filters?: {
    type?: AssetType;
    zone?: HajjZone;
    status?: string;
    criticality?: string;
  }): Promise<PredictiveMaintenanceResponse<InfrastructureAsset[]>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    
    const response = await fetch(`${API_BASE}/assets?${params}`);
    return response.json();
  },

  async getAsset(assetId: string): Promise<PredictiveMaintenanceResponse<InfrastructureAsset>> {
    const response = await fetch(`${API_BASE}/assets/${assetId}`);
    return response.json();
  },

  async updateAsset(assetId: string, updates: Partial<InfrastructureAsset>): Promise<PredictiveMaintenanceResponse<InfrastructureAsset>> {
    const response = await fetch(`${API_BASE}/assets/${assetId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response.json();
  },

  async getAssetHealth(assetId: string): Promise<PredictiveMaintenanceResponse<{
    overallHealth: number;
    componentHealth: Record<string, number>;
    trends: Record<string, 'improving' | 'stable' | 'degrading'>;
    alerts: MaintenanceAlert[];
  }>> {
    const response = await fetch(`${API_BASE}/assets/${assetId}/health`);
    return response.json();
  },

  // Sensor Data Management
  async ingestSensorData(readings: SensorReading[]): Promise<PredictiveMaintenanceResponse<{
    processed: number;
    errors: string[];
    anomaliesDetected: number;
  }>> {
    const response = await fetch(`${API_BASE}/sensors/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ readings })
    });
    return response.json();
  },

  async getSensorData(
    assetId: string,
    timeRange: { start: Date; end: Date },
    sensorTypes?: string[]
  ): Promise<PredictiveMaintenanceResponse<SensorReading[]>> {
    const params = new URLSearchParams({
      assetId,
      start: timeRange.start.toISOString(),
      end: timeRange.end.toISOString()
    });
    
    if (sensorTypes?.length) {
      params.append('sensorTypes', sensorTypes.join(','));
    }
    
    const response = await fetch(`${API_BASE}/sensors/data?${params}`);
    return response.json();
  },

  async getAnomalies(
    assetId?: string,
    timeRange?: { start: Date; end: Date }
  ): Promise<PredictiveMaintenanceResponse<{
    anomalies: Array<{
      assetId: string;
      sensorType: string;
      timestamp: Date;
      anomalyScore: number;
      description: string;
      severity: 'low' | 'medium' | 'high';
    }>;
    summary: {
      total: number;
      byAsset: Record<string, number>;
      bySeverity: Record<string, number>;
    };
  }>> {
    const params = new URLSearchParams();
    if (assetId) params.append('assetId', assetId);
    if (timeRange) {
      params.append('start', timeRange.start.toISOString());
      params.append('end', timeRange.end.toISOString());
    }
    
    const response = await fetch(`${API_BASE}/sensors/anomalies?${params}`);
    return response.json();
  },

  // Predictive Analytics
  async getPredictions(
    assetId?: string,
    predictionType?: string,
    timeHorizon?: number
  ): Promise<PredictiveMaintenanceResponse<MaintenancePrediction[]>> {
    const params = new URLSearchParams();
    if (assetId) params.append('assetId', assetId);
    if (predictionType) params.append('type', predictionType);
    if (timeHorizon) params.append('timeHorizon', timeHorizon.toString());
    
    const response = await fetch(`${API_BASE}/predictions?${params}`);
    return response.json();
  },

  async runPredictionModel(
    modelId: string,
    assetIds: string[]
  ): Promise<PredictiveMaintenanceResponse<MaintenancePrediction[]>> {
    const response = await fetch(`${API_BASE}/predictions/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modelId, assetIds })
    });
    return response.json();
  },

  async acknowledgePrediction(
    predictionId: string,
    action: 'acknowledge' | 'schedule-maintenance' | 'false-positive' | 'defer'
  ): Promise<PredictiveMaintenanceResponse<void>> {
    const response = await fetch(`${API_BASE}/predictions/${predictionId}/acknowledge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    });
    return response.json();
  },

  // Model Management
  async getModels(): Promise<PredictiveMaintenanceResponse<PredictiveModel[]>> {
    const response = await fetch(`${API_BASE}/models`);
    return response.json();
  },

  async getModel(modelId: string): Promise<PredictiveMaintenanceResponse<PredictiveModel>> {
    const response = await fetch(`${API_BASE}/models/${modelId}`);
    return response.json();
  },

  async trainModel(
    modelId: string,
    parameters?: {
      trainingPeriod?: { start: Date; end: Date };
      validationSplit?: number;
      hyperparameters?: Record<string, any>;
    }
  ): Promise<PredictiveMaintenanceResponse<{
    trainingJobId: string;
    estimatedDuration: number;
    status: 'started' | 'in-progress' | 'completed' | 'failed';
  }>> {
    const response = await fetch(`${API_BASE}/models/${modelId}/train`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parameters || {})
    });
    return response.json();
  },

  async getModelPerformance(modelId: string): Promise<PredictiveMaintenanceResponse<{
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    confusionMatrix: number[][];
    featureImportance: Array<{ feature: string; importance: number }>;
    performanceHistory: Array<{
      date: Date;
      accuracy: number;
      precision: number;
      recall: number;
    }>;
  }>> {
    const response = await fetch(`${API_BASE}/models/${modelId}/performance`);
    return response.json();
  },

  // Work Order Management
  async getWorkOrders(filters?: {
    assetId?: string;
    type?: MaintenanceType;
    priority?: WorkOrderPriority;
    status?: WorkOrderStatus;
    assignedTo?: string;
    dateRange?: { start: Date; end: Date };
  }): Promise<PredictiveMaintenanceResponse<MaintenanceWorkOrder[]>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (key === 'dateRange' && typeof value === 'object') {
            params.append('startDate', value.start.toISOString());
            params.append('endDate', value.end.toISOString());
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }
    
    const response = await fetch(`${API_BASE}/work-orders?${params}`);
    return response.json();
  },

  async createWorkOrder(workOrder: Omit<MaintenanceWorkOrder, 'id' | 'createdAt'>): Promise<PredictiveMaintenanceResponse<MaintenanceWorkOrder>> {
    const response = await fetch(`${API_BASE}/work-orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workOrder)
    });
    return response.json();
  },

  async updateWorkOrder(
    workOrderId: string,
    updates: Partial<MaintenanceWorkOrder>
  ): Promise<PredictiveMaintenanceResponse<MaintenanceWorkOrder>> {
    const response = await fetch(`${API_BASE}/work-orders/${workOrderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response.json();
  },

  async completeWorkOrder(
    workOrderId: string,
    completion: {
      workPerformed: string;
      partsUsed: Array<{ partNumber: string; quantity: number }>;
      timeSpent: number;
      issues?: string[];
      recommendations?: string[];
      nextMaintenanceDate?: Date;
    }
  ): Promise<PredictiveMaintenanceResponse<MaintenanceRecord>> {
    const response = await fetch(`${API_BASE}/work-orders/${workOrderId}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(completion)
    });
    return response.json();
  },

  async scheduleWorkOrders(
    workOrderIds: string[],
    constraints?: {
      startDate?: Date;
      endDate?: Date;
      resourceConstraints?: boolean;
      priorityWeighting?: number;
    }
  ): Promise<PredictiveMaintenanceResponse<{
    schedule: Array<{
      workOrderId: string;
      scheduledDate: Date;
      estimatedDuration: number;
      assignedTeam: string[];
    }>;
    conflicts: Array<{
      type: 'resource' | 'time' | 'dependency';
      description: string;
      affectedWorkOrders: string[];
    }>;
  }>> {
    const response = await fetch(`${API_BASE}/work-orders/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workOrderIds, constraints })
    });
    return response.json();
  },

  // Maintenance History
  async getMaintenanceHistory(
    assetId: string,
    limit?: number
  ): Promise<PredictiveMaintenanceResponse<MaintenanceRecord[]>> {
    const params = new URLSearchParams({ assetId });
    if (limit) params.append('limit', limit.toString());
    
    const response = await fetch(`${API_BASE}/maintenance/history?${params}`);
    return response.json();
  },

  async getMaintenanceRecord(recordId: string): Promise<PredictiveMaintenanceResponse<MaintenanceRecord>> {
    const response = await fetch(`${API_BASE}/maintenance/records/${recordId}`);
    return response.json();
  },

  // Performance Analytics
  async getAssetPerformanceReport(
    assetId: string,
    period: { start: Date; end: Date }
  ): Promise<PredictiveMaintenanceResponse<AssetPerformanceReport>> {
    const params = new URLSearchParams({
      assetId,
      start: period.start.toISOString(),
      end: period.end.toISOString()
    });
    
    const response = await fetch(`${API_BASE}/analytics/performance?${params}`);
    return response.json();
  },

  async getMaintenanceKPIs(
    timeframe: 'daily' | 'weekly' | 'monthly' | 'quarterly',
    assetType?: AssetType,
    zone?: HajjZone
  ): Promise<PredictiveMaintenanceResponse<MaintenanceKPI[]>> {
    const params = new URLSearchParams({ timeframe });
    if (assetType) params.append('assetType', assetType);
    if (zone) params.append('zone', zone);
    
    const response = await fetch(`${API_BASE}/analytics/kpis?${params}`);
    return response.json();
  },

  async getCostAnalysis(
    period: { start: Date; end: Date },
    groupBy?: 'asset' | 'type' | 'zone' | 'team'
  ): Promise<PredictiveMaintenanceResponse<{
    totalCost: number;
    breakdown: Array<{
      category: string;
      cost: number;
      percentage: number;
      trend: 'up' | 'down' | 'stable';
    }>;
    comparison: {
      previousPeriod: number;
      variance: number;
      variantcePercentage: number;
    };
    projections: Array<{
      month: string;
      projectedCost: number;
      confidence: number;
    }>;
  }>> {
    const params = new URLSearchParams({
      start: period.start.toISOString(),
      end: period.end.toISOString()
    });
    if (groupBy) params.append('groupBy', groupBy);
    
    const response = await fetch(`${API_BASE}/analytics/costs?${params}`);
    return response.json();
  },

  // Optimization
  async getOptimizationRecommendations(
    assetId?: string,
    category?: 'scheduling' | 'resource-allocation' | 'strategy'
  ): Promise<PredictiveMaintenanceResponse<MaintenanceOptimization[]>> {
    const params = new URLSearchParams();
    if (assetId) params.append('assetId', assetId);
    if (category) params.append('category', category);
    
    const response = await fetch(`${API_BASE}/optimization/recommendations?${params}`);
    return response.json();
  },

  async implementOptimization(
    optimizationId: string,
    implementation: {
      phaseIds?: string[];
      startDate?: Date;
      approvedBy: string;
      notes?: string;
    }
  ): Promise<PredictiveMaintenanceResponse<{
    implementationId: string;
    status: 'scheduled' | 'in-progress' | 'completed';
    timeline: Array<{
      phase: string;
      startDate: Date;
      endDate: Date;
      status: string;
    }>;
  }>> {
    const response = await fetch(`${API_BASE}/optimization/${optimizationId}/implement`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(implementation)
    });
    return response.json();
  },

  // Alerts and Notifications
  async getAlerts(
    filters?: {
      assetId?: string;
      severity?: string;
      acknowledged?: boolean;
      type?: string;
    }
  ): Promise<PredictiveMaintenanceResponse<MaintenanceAlert[]>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, value.toString());
      });
    }
    
    const response = await fetch(`${API_BASE}/alerts?${params}`);
    return response.json();
  },

  async acknowledgeAlert(alertId: string): Promise<PredictiveMaintenanceResponse<void>> {
    const response = await fetch(`${API_BASE}/alerts/${alertId}/acknowledge`, {
      method: 'POST'
    });
    return response.json();
  },

  async escalateAlert(
    alertId: string,
    escalation: {
      escalateTo: string[];
      reason: string;
      urgency: 'normal' | 'high' | 'critical';
    }
  ): Promise<PredictiveMaintenanceResponse<void>> {
    const response = await fetch(`${API_BASE}/alerts/${alertId}/escalate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(escalation)
    });
    return response.json();
  },

  // Resource Management
  async getResourceUtilization(
    timeframe: { start: Date; end: Date },
    resourceType?: 'personnel' | 'equipment' | 'budget'
  ): Promise<PredictiveMaintenanceResponse<{
    utilization: Array<{
      resource: string;
      allocated: number;
      used: number;
      efficiency: number;
      bottlenecks: string[];
    }>;
    trends: Array<{
      date: Date;
      utilization: number;
      capacity: number;
    }>;
    recommendations: string[];
  }>> {
    const params = new URLSearchParams({
      start: timeframe.start.toISOString(),
      end: timeframe.end.toISOString()
    });
    if (resourceType) params.append('resourceType', resourceType);
    
    const response = await fetch(`${API_BASE}/resources/utilization?${params}`);
    return response.json();
  },

  async getPersonnelWorkload(): Promise<PredictiveMaintenanceResponse<Array<{
    technicianId: string;
    name: string;
    currentWorkload: number;
    scheduledHours: number;
    availableHours: number;
    utilization: number;
    nextAvailable: Date;
    skills: string[];
    activeWorkOrders: number;
  }>>> {
    const response = await fetch(`${API_BASE}/resources/personnel/workload`);
    return response.json();
  },

  async getPartsInventory(
    lowStockOnly?: boolean
  ): Promise<PredictiveMaintenanceResponse<Array<{
    partNumber: string;
    description: string;
    currentStock: number;
    minimumStock: number;
    averageUsage: number;
    leadTime: number;
    supplier: string;
    unitCost: number;
    status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'on-order';
    lastOrderDate?: Date;
    estimatedDelivery?: Date;
  }>>> {
    const params = new URLSearchParams();
    if (lowStockOnly) params.append('lowStockOnly', 'true');
    
    const response = await fetch(`${API_BASE}/resources/parts/inventory?${params}`);
    return response.json();
  },

  // System Health and Monitoring
  async getSystemHealth(): Promise<PredictiveMaintenanceResponse<{
    overallHealth: number;
    components: Array<{
      component: string;
      status: 'healthy' | 'warning' | 'critical' | 'down';
      uptime: number;
      lastCheck: Date;
      metrics: Record<string, number>;
    }>;
    dataQuality: {
      completeness: number;
      accuracy: number;
      timeliness: number;
      consistency: number;
    };
    modelPerformance: Array<{
      modelId: string;
      accuracy: number;
      lastUpdate: Date;
      predictionCount: number;
      falsePositiveRate: number;
    }>;
  }>> {
    const response = await fetch(`${API_BASE}/system/health`);
    return response.json();
  },

  async getDashboardData(
    timeframe: 'today' | 'week' | 'month'
  ): Promise<PredictiveMaintenanceResponse<{
    summary: {
      totalAssets: number;
      activeAlerts: number;
      scheduledMaintenance: number;
      overdueMaintenance: number;
      systemHealth: number;
    };
    recentActivity: Array<{
      timestamp: Date;
      type: 'prediction' | 'alert' | 'maintenance' | 'failure';
      assetId: string;
      description: string;
      severity?: string;
    }>;
    upcomingMaintenance: Array<{
      workOrderId: string;
      assetId: string;
      scheduledDate: Date;
      type: MaintenanceType;
      priority: WorkOrderPriority;
      estimatedDuration: number;
    }>;
    criticalAssets: Array<{
      assetId: string;
      name: string;
      healthScore: number;
      riskLevel: 'low' | 'medium' | 'high' | 'critical';
      nextMaintenance: Date;
      issues: string[];
    }>;
    kpiSummary: {
      availability: number;
      mtbf: number;
      mttr: number;
      maintenanceCost: number;
      energyEfficiency: number;
    };
  }>> {
    const response = await fetch(`${API_BASE}/dashboard/${timeframe}`);
    return response.json();
  }
};

// Utility functions for predictive maintenance
export const maintenanceUtils = {
  // Priority calculations
  calculateMaintenancePriority(
    prediction: MaintenancePrediction,
    asset: InfrastructureAsset
  ): WorkOrderPriority {
    const criticalityWeight = {
      'low': 1,
      'medium': 2,
      'high': 3,
      'critical': 4,
      'mission-critical': 5
    };

    const urgencyWeight = {
      'planned': 1,
      'within-month': 2,
      'within-week': 3,
      'immediate': 4
    };

    const score = 
      (criticalityWeight[asset.criticality] || 1) * 0.4 +
      (urgencyWeight[prediction.timeframe.urgency] || 1) * 0.3 +
      prediction.probability * 0.3;

    if (score >= 3.5) return 'critical';
    if (score >= 2.5) return 'high';
    if (score >= 1.5) return 'medium';
    return 'low';
  },

  // Cost calculations
  calculateMaintenanceCost(
    laborHours: number,
    laborRate: number,
    parts: Array<{ cost: number; quantity: number }>,
    overhead: number = 0.15
  ): number {
    const laborCost = laborHours * laborRate;
    const partsCost = parts.reduce((sum, part) => sum + (part.cost * part.quantity), 0);
    const totalDirectCost = laborCost + partsCost;
    return totalDirectCost * (1 + overhead);
  },

  // Time calculations
  estimateMaintenanceDuration(
    maintenanceType: MaintenanceType,
    assetType: AssetType,
    complexity: 'simple' | 'moderate' | 'complex' | 'major'
  ): number {
    const baseHours = {
      'preventive': { 'simple': 1, 'moderate': 2, 'complex': 4, 'major': 8 },
      'predictive': { 'simple': 1.5, 'moderate': 3, 'complex': 6, 'major': 12 },
      'corrective': { 'simple': 2, 'moderate': 4, 'complex': 8, 'major': 16 },
      'emergency': { 'simple': 3, 'moderate': 6, 'complex': 12, 'major': 24 },
      'inspection': { 'simple': 0.5, 'moderate': 1, 'complex': 2, 'major': 4 },
      'calibration': { 'simple': 1, 'moderate': 2, 'complex': 4, 'major': 8 },
      'upgrade': { 'simple': 4, 'moderate': 8, 'complex': 16, 'major': 40 }
    };

    const multipliers = {
      'hvac-system': 1.2,
      'elevator': 1.5,
      'escalator': 1.3,
      'generator': 1.4,
      'medical-equipment': 1.6
    };

    const base = baseHours[maintenanceType]?.[complexity] || 2;
    const multiplier = multipliers[assetType] || 1;
    
    return base * multiplier;
  },

  // Health score calculations
  calculateAssetHealth(
    sensorReadings: SensorReading[],
    maintenanceHistory: MaintenanceRecord[],
    age: number,
    predictionRisk: number
  ): number {
    // Normalize sensor data health (0-1)
    const sensorHealth = sensorReadings.length > 0 ? 
      sensorReadings.reduce((sum, reading) => {
        const normalizedValue = Math.max(0, Math.min(1, 
          (reading.threshold.normal.max - Math.abs(reading.value - 
            (reading.threshold.normal.min + reading.threshold.normal.max) / 2)) / 
          (reading.threshold.normal.max - reading.threshold.normal.min)
        ));
        return sum + normalizedValue;
      }, 0) / sensorReadings.length : 0.5;

    // Maintenance history health (0-1)
    const recentMaintenance = maintenanceHistory.filter(
      record => new Date().getTime() - record.completedDate.getTime() < 90 * 24 * 60 * 60 * 1000
    );
    const maintenanceHealth = recentMaintenance.length > 0 ?
      recentMaintenance.reduce((sum, record) => sum + (record.effectivenessRating || 7), 0) / 
      (recentMaintenance.length * 10) : 0.7;

    // Age factor (0-1, newer is better)
    const ageHealth = Math.max(0, 1 - (age / (20 * 365))); // Assume 20 year lifespan

    // Risk factor (0-1, lower risk is better)
    const riskHealth = 1 - predictionRisk;

    // Weighted average
    return (sensorHealth * 0.4 + maintenanceHealth * 0.3 + ageHealth * 0.2 + riskHealth * 0.1) * 100;
  },

  // Scheduling optimization
  optimizeMaintenanceSchedule(
    workOrders: MaintenanceWorkOrder[],
    resources: { personnel: number; equipment: number },
    constraints: { workingHours: number; weekends: boolean }
  ): Array<{ workOrderId: string; scheduledDate: Date; duration: number }> {
    // Simple priority-based scheduling algorithm
    const sortedOrders = workOrders.sort((a, b) => {
      const priorityOrder = { 'emergency': 5, 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    const schedule: Array<{ workOrderId: string; scheduledDate: Date; duration: number }> = [];
    let currentDate = new Date();
    
    sortedOrders.forEach(order => {
      // Find next available slot
      while (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        if (!constraints.weekends) {
          currentDate.setDate(currentDate.getDate() + 1);
        } else {
          break;
        }
      }

      schedule.push({
        workOrderId: order.id,
        scheduledDate: new Date(currentDate),
        duration: order.estimatedDuration
      });

      // Advance time
      currentDate.setHours(currentDate.getHours() + order.estimatedDuration);
      if (currentDate.getHours() >= constraints.workingHours) {
        currentDate.setDate(currentDate.getDate() + 1);
        currentDate.setHours(8); // Start next day at 8 AM
      }
    });

    return schedule;
  },

  // Data validation
  validateSensorReading(reading: SensorReading): boolean {
    return !!(
      reading.assetId &&
      reading.sensorType &&
      reading.timestamp &&
      typeof reading.value === 'number' &&
      !isNaN(reading.value) &&
      reading.unit &&
      reading.threshold
    );
  },

  validateWorkOrder(workOrder: Partial<MaintenanceWorkOrder>): string[] {
    const errors: string[] = [];
    
    if (!workOrder.assetId) errors.push('Asset ID is required');
    if (!workOrder.type) errors.push('Maintenance type is required');
    if (!workOrder.priority) errors.push('Priority is required');
    if (!workOrder.title) errors.push('Title is required');
    if (!workOrder.description) errors.push('Description is required');
    if (!workOrder.scheduledDate) errors.push('Scheduled date is required');
    if (!workOrder.estimatedDuration || workOrder.estimatedDuration <= 0) {
      errors.push('Valid estimated duration is required');
    }
    
    return errors;
  }
};
