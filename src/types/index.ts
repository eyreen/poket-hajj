// User and Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  profileComplete?: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Dashboard Types
export interface DashboardData {
  queuePosition: {
    current: number;
    total: number;
    estimatedYear: number;
    estimatedYearRange: number;
  };
  savings: {
    current: number;
    target: number;
    monthlyTarget: number;
    isOnTrack: boolean;
  };
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'savings' | 'queue' | 'package' | 'profile';
  title: string;
  description: string;
  timestamp: string;
  amount?: number;
}

// Hajj Journey Types
export interface JourneyData {
  queuePosition: {
    current: number;
    total: number;
    estimatedYear: number;
    estimatedYearRange: number;
  };
  aiInsights: {
    keyInfluencers: Influencer[];
    recommendation: string;
  };
  profileCompleteness: {
    score: number;
    missingItems: string[];
  };
}

export interface Influencer {
  factor: string;
  effect: 'positive' | 'negative' | 'neutral';
  description: string;
  impact: number;
}

// Package Types
export interface HajjPackage {
  id: string;
  name: string;
  provider: string;
  price: number;
  matchScore: number;
  imageUrl: string;
  highlights: string[];
  duration: number;
  hotelRating: number;
  airline: string;
  distanceFromHaram: number;
  inclusions: string[];
  category: 'economy' | 'standard' | 'premium' | 'luxury';
}

export interface PackageFilters {
  priceRange: [number, number];
  hotelRating: number[];
  airline: string[];
  category: string[];
  specialNeeds: string[];
}

// Finance Types
export interface FinanceData {
  tabungHajiAccount: {
    accountNumber: string;
    balance: number;
    monthlyContribution: number;
  };
  transactions: Transaction[];
  savingsGoal: {
    target: number;
    current: number;
    monthlyTarget: number;
    targetYear: number;
  };
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'payment' | 'refund';
  status: 'completed' | 'pending' | 'failed';
  reference?: string;
}

// Component Props Types
export interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  progress?: {
    value: number;
    max: number;
    showPercentage?: boolean;
  };
  className?: string;
  onClick?: () => void;
}

export interface DataTableColumn<T> {
  key: keyof T;
  header: string;
  cell?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export interface PackageCardProps {
  packageData: HajjPackage;
  onSelect?: (pkg: HajjPackage) => void;
  onViewDetails?: (pkg: HajjPackage) => void;
  className?: string;
}

// Store Types
export interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export interface FiltersStore {
  packageFilters: PackageFilters;
  updateFilters: (filters: Partial<PackageFilters>) => void;
  resetFilters: () => void;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: 'success' | 'error';
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Navigation Types
export interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  children?: NavItem[];
}

// Admin Portal Types
export interface AdminRole {
  id: string;
  name: 'super_admin' | 'operations_manager' | 'financial_officer' | 'customer_service' | 'compliance_officer';
  permissions: AdminPermission[];
  level: number;
}

export interface AdminPermission {
  resource: 'pilgrims' | 'finances' | 'packages' | 'analytics' | 'system_settings';
  actions: ('view' | 'create' | 'update' | 'delete' | 'export')[];
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  permissions: AdminPermission[];
  lastLogin: Date;
  isActive: boolean;
  profile: {
    avatar?: string;
    phone?: string;
    department: string;
    employeeId: string;
  };
  preferences: {
    timezone: string;
    language: string;
    theme: 'light' | 'dark';
    notifications: NotificationPreferences;
  };
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  alerts: boolean;
  reports: boolean;
}

// Dashboard Analytics Types
export interface DashboardMetrics {
  overview: {
    totalPilgrims: number;
    activeApplications: number;
    completedJourneys: number;
    totalRevenue: number;
    averageWaitTime: number;
  };
  trends: {
    pilgrimGrowth: TimeSeriesData[];
    revenueGrowth: TimeSeriesData[];
    queueMovement: TimeSeriesData[];
  };
  demographics: {
    ageDistribution: CategoryData[];
    stateDistribution: CategoryData[];
    packagePreferences: CategoryData[];
  };
  alerts: AdminAlert[];
}

export interface TimeSeriesData {
  date: string;
  value: number;
  label?: string;
}

export interface CategoryData {
  category: string;
  value: number;
  percentage: number;
  color?: string;
}

export interface AdminAlert {
  id: string;
  type: 'financial' | 'operational' | 'system' | 'compliance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: Date;
  status: 'active' | 'acknowledged' | 'resolved' | 'dismissed';
  assignedTo?: string;
  relatedEntities: {
    pilgrimIds?: string[];
    transactionIds?: string[];
    packageIds?: string[];
  };
  actions: AlertAction[];
  metadata: Record<string, string | number | boolean>;
}

export interface AlertAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'danger';
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  requiresConfirmation: boolean;
  permissions: string[];
}

// Queue Management Types
export interface QueueManagement {
  queueAnalytics: {
    totalInQueue: number;
    averageWaitTime: number;
    processingRate: number;
    yearlyQuotas: YearlyQuota[];
  };
  queueOperations: {
    adjustPosition: (pilgrimId: string, newPosition: number) => void;
    bulkProcessing: (pilgrimIds: string[], action: QueueAction) => void;
    emergencyProcessing: (pilgrimId: string, reason: string) => void;
  };
  predictions: {
    estimatedCompletionYears: PredictionData[];
    capacityForecasting: CapacityData[];
    optimizationSuggestions: Suggestion[];
  };
}

export interface YearlyQuota {
  year: number;
  quota: number;
  filled: number;
  remaining: number;
}

export interface QueueAction {
  type: 'approve' | 'reject' | 'defer' | 'priority';
  reason?: string;
}

export interface PredictionData {
  pilgrimId: string;
  estimatedYear: number;
  confidence: number;
}

export interface CapacityData {
  year: number;
  capacity: number;
  projected: number;
}

export interface Suggestion {
  id: string;
  type: 'optimization' | 'resource' | 'process';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
}

// Financial Analytics Types
export interface FinancialAnalytics {
  revenue: {
    totalRevenue: number;
    monthlyGrowth: number;
    revenueByCategory: CategoryRevenue[];
    projectedRevenue: ProjectionData[];
  };
  transactions: {
    totalTransactions: number;
    transactionVolume: TimeSeriesData[];
    averageTransactionValue: number;
    failureRate: number;
  };
  savings: {
    totalSavings: number;
    averageMonthlySavings: number;
    savingsGrowthTrend: TimeSeriesData[];
    savingsDistribution: DistributionData[];
  };
}

export interface CategoryRevenue {
  category: string;
  revenue: number;
  growth: number;
  percentage: number;
}

export interface ProjectionData {
  period: string;
  projected: number;
  actual?: number;
  confidence: number;
}

export interface DistributionData {
  range: string;
  count: number;
  percentage: number;
}

// Package Recommendation Types
export interface PackageRecommendationSystem {
  algorithm: {
    factorsConsidered: RecommendationFactor[];
    weightingStrategy: WeightingStrategy;
    performanceMetrics: AlgorithmMetrics;
  };
  optimization: {
    conversionRates: PackageConversionData[];
    customerSatisfaction: SatisfactionMetrics[];
    revenueOptimization: RevenueOptimizationData[];
  };
  management: {
    adjustWeights: (factor: string, weight: number) => void;
    addNewFactor: (factor: RecommendationFactor) => void;
    viewPerformance: () => AlgorithmPerformance;
  };
}

export interface RecommendationFactor {
  id: string;
  name: string;
  weight: number;
  category: 'demographic' | 'financial' | 'behavioral' | 'historical';
}

export interface WeightingStrategy {
  type: 'linear' | 'exponential' | 'adaptive';
  parameters: Record<string, number>;
}

export interface AlgorithmMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
}

export interface PackageConversionData {
  packageId: string;
  packageName: string;
  recommendationRate: number;
  conversionRate: number;
  revenue: number;
}

export interface SatisfactionMetrics {
  packageId: string;
  rating: number;
  reviewCount: number;
  nps: number;
}

export interface RevenueOptimizationData {
  packageId: string;
  currentRevenue: number;
  optimizedRevenue: number;
  improvementPercentage: number;
}

export interface AlgorithmPerformance {
  trainingAccuracy: number;
  validationAccuracy: number;
  testAccuracy: number;
  lastUpdated: Date;
}

// Anomaly Detection Types
export interface AnomalyDetectionSystem {
  detectionTypes: {
    financialAnomalies: FinancialAnomaly[];
    behavioralAnomalies: BehavioralAnomaly[];
    systemAnomalies: SystemAnomaly[];
    complianceAnomalies: ComplianceAnomaly[];
  };
  alertSystem: {
    realTimeAlerts: AdminAlert[];
    alertPriorities: AlertPriority[];
    escalationRules: EscalationRule[];
    notificationChannels: NotificationChannel[];
  };
  investigation: {
    forensicTools: ForensicTool[];
    reportGeneration: ReportGenerator;
    actionTracking: ActionTracker;
  };
}

export interface FinancialAnomaly {
  id: string;
  type: 'unusual_transaction' | 'payment_pattern' | 'fraud_indicator';
  severity: number;
  description: string;
  relatedTransactions: string[];
  timestamp: Date;
}

export interface BehavioralAnomaly {
  id: string;
  type: 'unusual_activity' | 'access_pattern' | 'usage_anomaly';
  userId: string;
  description: string;
  timestamp: Date;
}

export interface SystemAnomaly {
  id: string;
  type: 'performance' | 'error_rate' | 'capacity';
  metric: string;
  value: number;
  threshold: number;
  timestamp: Date;
}

export interface ComplianceAnomaly {
  id: string;
  type: 'document_mismatch' | 'regulation_violation' | 'audit_finding';
  description: string;
  relatedEntities: string[];
  timestamp: Date;
}

export interface AlertPriority {
  level: number;
  name: string;
  responseTime: number;
  escalationTime: number;
}

export interface EscalationRule {
  id: string;
  condition: string;
  escalateTo: string[];
  timeout: number;
}

export interface NotificationChannel {
  type: 'email' | 'sms' | 'push' | 'webhook';
  config: Record<string, string | number | boolean>;
  enabled: boolean;
}

export interface ForensicTool {
  name: string;
  description: string;
  capabilities: string[];
}

export interface ReportGenerator {
  generateReport: (type: string, params: Record<string, unknown>) => Promise<Report>;
  scheduleReport: (config: ReportConfig) => Promise<void>;
}

export interface ActionTracker {
  logAction: (action: AuditAction) => Promise<void>;
  getActionHistory: (entityId: string) => Promise<AuditAction[]>;
}

export interface Report {
  id: string;
  type: string;
  data: Record<string, unknown>;
  generatedAt: Date;
  format: 'pdf' | 'excel' | 'json';
}

export interface ReportConfig {
  type: string;
  schedule: string;
  recipients: string[];
  parameters: Record<string, string | number | boolean>;
}

export interface AuditAction {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: Date;
  metadata: Record<string, string | number | boolean>;
}

// Admin Component Props Types
export interface AdminKpiCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  status?: 'normal' | 'warning' | 'critical';
}

export interface AdminDataTableProps<T> {
  data: T[];
  columns: AdminTableColumn<T>[];
  actions?: TableAction<T>[];
  filters?: FilterConfig[];
  sorting?: SortConfig;
  pagination?: PaginationConfig;
  bulkActions?: BulkAction<T>[];
  exportOptions?: ExportOption[];
}

export interface AdminTableColumn<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface TableAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  variant?: 'default' | 'destructive' | 'outline';
}

export interface FilterConfig {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'range';
  options?: { label: string; value: string }[];
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
}

export interface BulkAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (selectedRows: T[]) => void;
  variant?: 'default' | 'destructive' | 'outline';
}

export interface ExportOption {
  format: 'csv' | 'excel' | 'pdf';
  label: string;
  onClick: () => void;
}

export interface AdminAlertProps {
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'financial' | 'operational' | 'system' | 'compliance';
  message: string;
  timestamp: Date;
  actions?: AlertAction[];
  relatedData?: Record<string, unknown>;
}
