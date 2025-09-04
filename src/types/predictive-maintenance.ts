/**
 * Predictive Maintenance System Types
 * AI-powered infrastructure monitoring and predictive maintenance for Smart Hajj Ecosystem
 */

// Core Infrastructure Types
export interface InfrastructureAsset {
  id: string;
  name: string;
  type: AssetType;
  category: AssetCategory;
  location: AssetLocation;
  specifications: AssetSpecifications;
  installationDate: Date;
  lastMaintenanceDate: Date;
  nextScheduledMaintenance: Date;
  warrantyExpiry?: Date;
  vendor: VendorInfo;
  status: AssetStatus;
  criticality: CriticalityLevel;
  dependencies: string[]; // IDs of dependent assets
  maintenanceHistory: MaintenanceRecord[];
}

export type AssetType = 
  | 'hvac-system'
  | 'elevator'
  | 'escalator'
  | 'water-pump'
  | 'generator'
  | 'cooling-tower'
  | 'fire-safety'
  | 'security-camera'
  | 'access-control'
  | 'lighting-system'
  | 'sound-system'
  | 'network-equipment'
  | 'power-distribution'
  | 'plumbing'
  | 'structural'
  | 'transportation'
  | 'medical-equipment';

export type AssetCategory = 
  | 'mechanical'
  | 'electrical'
  | 'plumbing'
  | 'hvac'
  | 'safety'
  | 'security'
  | 'it-infrastructure'
  | 'transportation'
  | 'structural'
  | 'medical';

export interface AssetLocation {
  facility: string;
  building?: string;
  floor?: string;
  room?: string;
  zone: HajjZone;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  accessibility: AccessibilityInfo;
}

export type HajjZone = 
  | 'masjid-al-haram'
  | 'mina'
  | 'arafah'
  | 'muzdalifah'
  | 'jamarat'
  | 'hotel-area'
  | 'transport-hub'
  | 'medical-center'
  | 'administrative';

export interface AccessibilityInfo {
  requiresShutdown: boolean;
  accessDifficulty: 'easy' | 'moderate' | 'difficult' | 'extremely-difficult';
  specialEquipmentRequired: string[];
  saftyPrecautions: string[];
  operatingHoursRestrictions?: {
    start: string;
    end: string;
  };
}

export interface AssetSpecifications {
  manufacturer: string;
  model: string;
  serialNumber: string;
  capacity?: string;
  powerRating?: string;
  operatingConditions: {
    temperatureRange: { min: number; max: number };
    humidityRange: { min: number; max: number };
    operatingHours?: number;
  };
  technicalSpecs: Record<string, any>;
}

export interface VendorInfo {
  name: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  supportLevel: 'basic' | 'standard' | 'premium' | '24x7';
  responseTime: number; // hours
  certifications: string[];
}

export type AssetStatus = 
  | 'operational'
  | 'degraded'
  | 'maintenance-required'
  | 'critical'
  | 'offline'
  | 'under-maintenance'
  | 'decommissioned';

export type CriticalityLevel = 'low' | 'medium' | 'high' | 'critical' | 'mission-critical';

// Sensor Data and Monitoring
export interface SensorReading {
  id: string;
  assetId: string;
  sensorType: SensorType;
  timestamp: Date;
  value: number;
  unit: string;
  quality: DataQuality;
  threshold: SensorThreshold;
  anomalyScore?: number;
  processed: boolean;
}

export type SensorType = 
  | 'temperature'
  | 'humidity'
  | 'pressure'
  | 'vibration'
  | 'flow-rate'
  | 'power-consumption'
  | 'voltage'
  | 'current'
  | 'frequency'
  | 'noise-level'
  | 'air-quality'
  | 'water-quality'
  | 'rotation-speed'
  | 'oil-level'
  | 'ph-level'
  | 'conductivity';

export interface SensorThreshold {
  normal: { min: number; max: number };
  warning: { min: number; max: number };
  critical: { min: number; max: number };
  emergency: { min: number; max: number };
}

export type DataQuality = 'excellent' | 'good' | 'fair' | 'poor' | 'invalid';

// Predictive Analytics
export interface PredictiveModel {
  id: string;
  name: string;
  assetType: AssetType;
  modelType: ModelType;
  algorithm: MLAlgorithm;
  features: ModelFeature[];
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  lastTraining: Date;
  trainingDataSize: number;
  validationResults: ValidationResult[];
  deploymentStatus: 'development' | 'testing' | 'production' | 'deprecated';
}

export type ModelType = 
  | 'failure-prediction'
  | 'remaining-useful-life'
  | 'anomaly-detection'
  | 'performance-degradation'
  | 'energy-optimization'
  | 'maintenance-scheduling';

export type MLAlgorithm = 
  | 'random-forest'
  | 'gradient-boosting'
  | 'neural-network'
  | 'support-vector-machine'
  | 'lstm'
  | 'isolation-forest'
  | 'arima'
  | 'prophet';

export interface ModelFeature {
  name: string;
  type: 'sensor' | 'derived' | 'environmental' | 'operational';
  importance: number;
  description: string;
  dataSource: string;
}

export interface ValidationResult {
  testDate: Date;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  confusionMatrix: number[][];
  testDataSize: number;
}

// Predictions and Insights
export interface MaintenancePrediction {
  id: string;
  assetId: string;
  predictionType: PredictionType;
  probability: number;
  confidence: number;
  timeframe: TimeframePrediction;
  failureMode?: FailureMode;
  impactAssessment: ImpactAssessment;
  recommendations: Recommendation[];
  modelUsed: string;
  generatedAt: Date;
  status: 'active' | 'acknowledged' | 'resolved' | 'false-positive';
}

export type PredictionType = 
  | 'failure-imminent'
  | 'performance-degradation'
  | 'maintenance-due'
  | 'efficiency-decline'
  | 'component-wear'
  | 'energy-anomaly';

export interface TimeframePrediction {
  estimatedDays: number;
  confidenceInterval: { min: number; max: number };
  urgency: 'immediate' | 'within-week' | 'within-month' | 'planned';
}

export interface FailureMode {
  type: string;
  description: string;
  typicalCauses: string[];
  symptoms: string[];
  previousOccurrences: number;
}

export interface ImpactAssessment {
  operationalImpact: OperationalImpact;
  financialImpact: FinancialImpact;
  safetyRisk: SafetyRisk;
  pilgrimExperienceImpact: ExperienceImpact;
  cascadingEffects: CascadingEffect[];
}

export interface OperationalImpact {
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedServices: string[];
  estimatedDowntime: number; // hours
  capacityReduction: number; // percentage
  alternativesAvailable: boolean;
}

export interface FinancialImpact {
  maintenanceCost: number;
  operationalLoss: number;
  replacementCost?: number;
  thirdPartyCosts: number;
  totalEstimatedCost: number;
  currency: string;
}

export interface SafetyRisk {
  level: 'low' | 'medium' | 'high' | 'critical';
  riskFactors: string[];
  affectedPersonnel: number;
  affectedPilgrims: number;
  mitigationMeasures: string[];
}

export interface ExperienceImpact {
  comfortLevel: 'minimal' | 'moderate' | 'significant' | 'severe';
  serviceDisruption: string[];
  alternativeArrangements: string[];
  communicationRequired: boolean;
}

export interface CascadingEffect {
  dependentAssetId: string;
  impactType: 'performance' | 'availability' | 'failure';
  probability: number;
  timeDelay: number; // hours
}

// Maintenance Management
export interface MaintenanceWorkOrder {
  id: string;
  assetId: string;
  type: MaintenanceType;
  priority: WorkOrderPriority;
  title: string;
  description: string;
  predictedIssue?: string;
  scheduledDate: Date;
  estimatedDuration: number;
  assignedTeam: MaintenanceTeam;
  requiredParts: RequiredPart[];
  requiredTools: string[];
  safetyRequirements: SafetyRequirement[];
  status: WorkOrderStatus;
  createdBy: string;
  createdAt: Date;
  completedAt?: Date;
  cost: WorkOrderCost;
}

export type MaintenanceType = 
  | 'preventive'
  | 'predictive'
  | 'corrective'
  | 'emergency'
  | 'inspection'
  | 'calibration'
  | 'upgrade';

export type WorkOrderPriority = 
  | 'low'
  | 'medium' 
  | 'high'
  | 'critical'
  | 'emergency';

export interface MaintenanceTeam {
  leadTechnician: TechnicianInfo;
  assistants: TechnicianInfo[];
  externalVendor?: VendorInfo;
  specialistRequired?: string;
  teamSize: number;
}

export interface TechnicianInfo {
  id: string;
  name: string;
  level: 'junior' | 'senior' | 'expert' | 'specialist';
  certifications: string[];
  specialties: string[];
  availability: AvailabilityInfo;
  contactInfo: {
    phone: string;
    email: string;
  };
}

export interface AvailabilityInfo {
  currentShift: 'morning' | 'afternoon' | 'night' | 'off-duty';
  nextAvailable: Date;
  workload: number; // percentage
  location: string;
}

export interface RequiredPart {
  partNumber: string;
  description: string;
  quantity: number;
  unitCost: number;
  inStock: boolean;
  estimatedDelivery?: Date;
  supplier: string;
  category: 'consumable' | 'component' | 'spare-part' | 'specialty';
}

export interface SafetyRequirement {
  type: 'ppe' | 'lockout' | 'permit' | 'escort' | 'certification';
  description: string;
  mandatory: boolean;
  verificationRequired: boolean;
}

export type WorkOrderStatus = 
  | 'created'
  | 'scheduled'
  | 'in-progress'
  | 'on-hold'
  | 'completed'
  | 'cancelled'
  | 'pending-parts'
  | 'pending-approval';

export interface WorkOrderCost {
  laborCost: number;
  partsCost: number;
  vendorCost: number;
  miscellaneousCost: number;
  totalCost: number;
  budgetAllocated: number;
  currency: string;
}

// Maintenance History and Records
export interface MaintenanceRecord {
  id: string;
  workOrderId: string;
  assetId: string;
  completedDate: Date;
  workPerformed: string;
  partsReplaced: ReplacedPart[];
  findings: MaintenanceFindings;
  recommendations: string[];
  nextMaintenanceDate?: Date;
  techniciansInvolved: string[];
  duration: number; // hours
  cost: number;
  effectivenessRating?: number; // 1-10
  issues: MaintenanceIssue[];
}

export interface ReplacedPart {
  partNumber: string;
  description: string;
  serialNumber?: string;
  quantity: number;
  condition: 'new' | 'refurbished' | 'used';
  warrantyPeriod?: number; // months
}

export interface MaintenanceFindings {
  overallCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  specificIssues: FoundIssue[];
  improvementsObserved: string[];
  futureRisks: string[];
  operationalNotes: string;
}

export interface FoundIssue {
  component: string;
  severity: 'minor' | 'moderate' | 'major' | 'critical';
  description: string;
  actionTaken: string;
  followUpRequired: boolean;
}

export interface MaintenanceIssue {
  type: 'delay' | 'parts-shortage' | 'access-problem' | 'technical-difficulty' | 'safety-concern';
  description: string;
  impact: string;
  resolution: string;
  preventionMeasures: string[];
}

// Resource Management
export interface MaintenanceResource {
  type: ResourceType;
  availability: ResourceAvailability;
  capacity: ResourceCapacity;
  utilization: ResourceUtilization;
  cost: ResourceCost;
}

export type ResourceType = 'personnel' | 'equipment' | 'parts' | 'budget' | 'time';

export interface ResourceAvailability {
  available: number;
  allocated: number;
  reserved: number;
  total: number;
  unit: string;
  timeframe: string;
}

export interface ResourceCapacity {
  maxCapacity: number;
  currentLoad: number;
  utilizationRate: number;
  bottlenecks: string[];
  expansionPossible: boolean;
}

export interface ResourceUtilization {
  planned: number;
  actual: number;
  efficiency: number;
  wasteFactors: string[];
  optimizationOpportunities: string[];
}

export interface ResourceCost {
  unitCost: number;
  totalAllocated: number;
  totalSpent: number;
  projectedCost: number;
  costVariance: number;
  currency: string;
}

// Performance Analytics
export interface MaintenanceKPI {
  metric: KPIMetric;
  value: number;
  target: number;
  variance: number;
  trend: 'improving' | 'declining' | 'stable';
  period: string;
  benchmark: number;
  ranking: 'excellent' | 'good' | 'average' | 'below-average' | 'poor';
}

export type KPIMetric = 
  | 'mtbf' // Mean Time Between Failures
  | 'mttr' // Mean Time To Repair
  | 'availability'
  | 'reliability'
  | 'oee' // Overall Equipment Effectiveness
  | 'maintenance-cost-ratio'
  | 'planned-maintenance-percentage'
  | 'schedule-compliance'
  | 'first-time-fix-rate'
  | 'safety-incidents'
  | 'energy-efficiency'
  | 'prediction-accuracy';

export interface AssetPerformanceReport {
  assetId: string;
  reportPeriod: { start: Date; end: Date };
  uptime: number;
  downtime: number;
  availability: number;
  reliability: number;
  efficiency: number;
  maintenanceEvents: MaintenanceEvent[];
  costAnalysis: CostAnalysis;
  trendAnalysis: TrendAnalysis;
  benchmarking: BenchmarkingData;
}

export interface MaintenanceEvent {
  date: Date;
  type: MaintenanceType;
  duration: number;
  cause: string;
  impact: string;
  cost: number;
  preventable: boolean;
}

export interface CostAnalysis {
  totalMaintenanceCost: number;
  preventiveCost: number;
  correctiveCost: number;
  emergencyCost: number;
  costPerHour: number;
  costTrend: 'increasing' | 'decreasing' | 'stable';
  costDrivers: string[];
}

export interface TrendAnalysis {
  failureFrequency: TrendData;
  maintenanceCost: TrendData;
  performance: TrendData;
  energyConsumption: TrendData;
}

export interface TrendData {
  current: number;
  previous: number;
  change: number;
  direction: 'up' | 'down' | 'stable';
  forecast: number[];
}

export interface BenchmarkingData {
  industryAverage: number;
  bestInClass: number;
  peerComparison: number;
  ranking: number;
  improvementPotential: number;
}

// Optimization and Recommendations
export interface MaintenanceOptimization {
  assetId: string;
  currentStrategy: MaintenanceStrategy;
  recommendedStrategy: MaintenanceStrategy;
  optimization: OptimizationRecommendation[];
  expectedBenefits: ExpectedBenefits;
  implementationPlan: ImplementationPlan;
  riskAssessment: OptimizationRisk[];
}

export interface MaintenanceStrategy {
  type: 'reactive' | 'preventive' | 'predictive' | 'proactive' | 'hybrid';
  frequency: number; // days
  triggers: string[];
  resources: string[];
  cost: number;
  effectiveness: number;
}

export interface OptimizationRecommendation {
  id: string;
  category: 'scheduling' | 'resource-allocation' | 'technology' | 'process' | 'training';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  rationale: string;
  expectedImpact: string;
  implementation: {
    effort: 'low' | 'medium' | 'high';
    timeframe: string;
    dependencies: string[];
    risks: string[];
  };
}

export interface ExpectedBenefits {
  costSavings: number;
  downtimeReduction: number;
  efficiencyGain: number;
  safetyImprovement: string;
  lifeExtension: number; // months
  energySavings: number;
  qualityImprovement: string;
}

export interface ImplementationPlan {
  phases: ImplementationPhase[];
  totalDuration: number; // days
  totalCost: number;
  keyMilestones: Milestone[];
  successMetrics: string[];
  rollbackPlan?: string;
}

export interface ImplementationPhase {
  phase: number;
  name: string;
  description: string;
  duration: number; // days
  dependencies: string[];
  deliverables: string[];
  resources: string[];
  risks: string[];
}

export interface Milestone {
  name: string;
  date: Date;
  criteria: string[];
  responsible: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
}

export interface OptimizationRisk {
  type: 'technical' | 'financial' | 'operational' | 'safety' | 'regulatory';
  description: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string[];
  contingency: string;
}

// System Configuration and Settings
export interface PredictiveMaintenanceConfig {
  modelSettings: ModelConfiguration;
  alertSettings: AlertConfiguration;
  schedulingSettings: SchedulingConfiguration;
  integrationSettings: IntegrationConfiguration;
  reportingSettings: ReportingConfiguration;
}

export interface ModelConfiguration {
  retrainingFrequency: number; // days
  dataRetentionPeriod: number; // days
  minimumDataPoints: number;
  confidenceThreshold: number;
  anomalyThreshold: number;
  predictionHorizon: number; // days
  modelValidationCriteria: ValidationCriteria;
}

export interface ValidationCriteria {
  minimumAccuracy: number;
  minimumPrecision: number;
  minimumRecall: number;
  maximumFalsePositiveRate: number;
  benchmarkModel: string;
}

export interface AlertConfiguration {
  notificationChannels: string[];
  escalationRules: EscalationRule[];
  quietHours: { start: string; end: string };
  batchingRules: BatchingRule[];
  suppressionRules: SuppressionRule[];
}

export interface EscalationRule {
  condition: string;
  timeDelay: number; // minutes
  escalateTo: string[];
  escalationLevel: number;
  maxEscalations: number;
}

export interface BatchingRule {
  assetType: AssetType;
  batchWindow: number; // minutes
  maxBatchSize: number;
  priorityLevel: WorkOrderPriority;
}

export interface SuppressionRule {
  condition: string;
  duration: number; // minutes
  reason: string;
  overrideLevel: string;
}

export interface SchedulingConfiguration {
  planningHorizon: number; // days
  resourceBuffer: number; // percentage
  prioritizationRules: PrioritizationRule[];
  constraintHandling: ConstraintHandling;
  optimizationObjective: 'cost' | 'time' | 'resource' | 'balanced';
}

export interface PrioritizationRule {
  criteria: string;
  weight: number;
  direction: 'minimize' | 'maximize';
  constraints: string[];
}

export interface ConstraintHandling {
  workingHours: { start: string; end: string };
  weekendWork: boolean;
  holidayWork: boolean;
  simultaneousLimit: number;
  resourceConflictResolution: 'priority' | 'delay' | 'alternative';
}

export interface IntegrationConfiguration {
  dataSourceMappings: DataSourceMapping[];
  apiEndpoints: APIEndpoint[];
  synchronizationSettings: SyncSettings;
  dataValidationRules: ValidationRule[];
}

export interface DataSourceMapping {
  sourceSystem: string;
  dataType: string;
  mappingRules: string;
  updateFrequency: number; // minutes
  qualityThresholds: Record<string, number>;
}

export interface APIEndpoint {
  name: string;
  url: string;
  authentication: string;
  rateLimits: RateLimits;
  retryPolicy: RetryPolicy;
}

export interface RateLimits {
  requestsPerMinute: number;
  requestsPerHour: number;
  concurrentRequests: number;
}

export interface RetryPolicy {
  maxRetries: number;
  backoffStrategy: 'linear' | 'exponential';
  retryDelay: number; // seconds
}

export interface SyncSettings {
  batchSize: number;
  syncInterval: number; // minutes
  conflictResolution: 'source-wins' | 'target-wins' | 'manual' | 'timestamp';
  deltaSync: boolean;
}

export interface ValidationRule {
  field: string;
  rule: string;
  errorAction: 'reject' | 'flag' | 'correct';
  severity: 'warning' | 'error' | 'critical';
}

export interface ReportingConfiguration {
  standardReports: StandardReport[];
  customReports: CustomReport[];
  distributionSettings: DistributionSettings;
  archivalSettings: ArchivalSettings;
}

export interface StandardReport {
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  recipients: string[];
  format: 'pdf' | 'excel' | 'dashboard';
  parameters: Record<string, any>;
}

export interface CustomReport {
  id: string;
  name: string;
  query: string;
  visualization: string;
  filters: ReportFilter[];
  schedule?: string;
}

export interface ReportFilter {
  field: string;
  operator: string;
  value: any;
  required: boolean;
}

export interface DistributionSettings {
  emailSettings: EmailSettings;
  portalSettings: PortalSettings;
  mobileSettings: MobileSettings;
}

export interface EmailSettings {
  smtpServer: string;
  authentication: boolean;
  encryption: 'none' | 'ssl' | 'tls';
  templates: EmailTemplate[];
}

export interface EmailTemplate {
  type: string;
  subject: string;
  body: string;
  attachments: string[];
}

export interface PortalSettings {
  dashboardUrl: string;
  accessControls: AccessControl[];
  refreshInterval: number; // seconds
}

export interface AccessControl {
  role: string;
  permissions: string[];
  dataFilters: string[];
}

export interface MobileSettings {
  pushNotifications: boolean;
  appIntegration: boolean;
  offlineCapability: boolean;
}

export interface ArchivalSettings {
  retentionPeriod: number; // days
  compressionEnabled: boolean;
  storageLocation: string;
  purgePolicy: PurgePolicy;
}

export interface PurgePolicy {
  criticalDataRetention: number; // days
  operationalDataRetention: number; // days
  historicalDataRetention: number; // days
  automaticPurge: boolean;
}

// API Response Types
export interface PredictiveMaintenanceResponse<T = any> {
  success: boolean;
  data: T;
  metadata: {
    timestamp: Date;
    version: string;
    modelVersion?: string;
    confidence?: number;
  };
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface MaintenanceAlert {
  id: string;
  type: 'prediction' | 'threshold' | 'failure' | 'system';
  severity: 'info' | 'warning' | 'critical' | 'emergency';
  assetId: string;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  actionRequired: boolean;
  estimatedImpact: string;
  recommendations: string[];
  escalated: boolean;
}
