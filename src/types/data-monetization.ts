/**
 * Data Monetization & Strategic Insights Types
 * AI-powered data analytics and monetization platform for Smart Hajj Ecosystem
 */

// Core Data Product Types
export interface DataProduct {
  id: string;
  name: string;
  type: DataProductType;
  category: DataCategory;
  description: string;
  pricing: PricingModel;
  subscribers: DataSubscriber[];
  dataSchema: DataSchema;
  accessLevel: AccessLevel;
  refreshFrequency: RefreshFrequency;
  status: ProductStatus;
  createdAt: Date;
  lastUpdated: Date;
  totalRevenue: number;
  monthlyRevenue: number;
  subscriberCount: number;
  apiEndpoint: string;
  documentation: string[];
  sampleData: any;
}

export type DataProductType = 
  | 'demand-insights'
  | 'sentiment-analytics'
  | 'predictive-forecasts'
  | 'operational-metrics'
  | 'market-intelligence'
  | 'customer-behavior'
  | 'resource-optimization'
  | 'competitive-analysis'
  | 'trend-analysis'
  | 'risk-assessment';

export type DataCategory = 
  | 'hospitality'
  | 'transportation'
  | 'tourism'
  | 'financial-services'
  | 'government'
  | 'retail'
  | 'healthcare'
  | 'education'
  | 'real-estate'
  | 'logistics';

export interface PricingModel {
  type: PricingType;
  basePrice: number;
  currency: string;
  billingCycle: BillingCycle;
  tierPricing?: PricingTier[];
  volumeDiscounts?: VolumeDiscount[];
  freeTrial?: TrialConfiguration;
  customPricing: boolean;
}

export type PricingType = 
  | 'fixed-subscription'
  | 'usage-based'
  | 'tiered'
  | 'hybrid'
  | 'custom'
  | 'free'
  | 'freemium';

export type BillingCycle = 'monthly' | 'quarterly' | 'annually' | 'usage';

export interface PricingTier {
  name: string;
  price: number;
  features: string[];
  limits: UsageLimits;
  popular: boolean;
}

export interface VolumeDiscount {
  minimumUsage: number;
  discountPercentage: number;
  description: string;
}

export interface TrialConfiguration {
  duration: number; // days
  features: string[];
  limitations: string[];
  autoConvert: boolean;
}

export interface UsageLimits {
  apiCalls: number;
  dataRecords: number;
  refreshRate: number; // minutes
  concurrentUsers: number;
  storageGB: number;
  supportLevel: SupportLevel;
}

export type SupportLevel = 'community' | 'email' | 'priority' | 'dedicated';

// Data Subscriber Management
export interface DataSubscriber {
  id: string;
  organizationName: string;
  organizationType: OrganizationType;
  contactPerson: ContactInfo;
  subscription: SubscriptionDetails;
  usage: UsageMetrics;
  billing: BillingInfo;
  accessCredentials: APICredentials;
  status: SubscriberStatus;
  joinedAt: Date;
  lastAccess: Date;
  feedback: SubscriberFeedback[];
}

export type OrganizationType = 
  | 'hotel-chain'
  | 'airline'
  | 'travel-agency'
  | 'government-agency'
  | 'research-institution'
  | 'technology-company'
  | 'consulting-firm'
  | 'financial-institution'
  | 'logistics-company'
  | 'retail-chain';

export interface ContactInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  department: string;
  alternateContact?: ContactInfo;
}

export interface SubscriptionDetails {
  productIds: string[];
  plan: string;
  startDate: Date;
  endDate: Date;
  autoRenewal: boolean;
  customizations: string[];
  slaAgreement: SLATerms;
}

export interface SLATerms {
  uptime: number; // percentage
  responseTime: number; // milliseconds
  supportResponseTime: number; // hours
  dataFreshness: number; // minutes
  penaltyTerms: string[];
}

export interface UsageMetrics {
  currentPeriod: UsagePeriod;
  historicalUsage: UsagePeriod[];
  quotaUtilization: QuotaUtilization;
  peakUsageTime: string;
  mostAccessedEndpoints: EndpointUsage[];
}

export interface UsagePeriod {
  period: string;
  apiCalls: number;
  dataDownloaded: number; // GB
  uniqueUsers: number;
  errorRate: number;
  averageResponseTime: number;
}

export interface QuotaUtilization {
  apiCalls: { used: number; limit: number };
  dataTransfer: { used: number; limit: number };
  storage: { used: number; limit: number };
  users: { used: number; limit: number };
}

export interface EndpointUsage {
  endpoint: string;
  calls: number;
  avgResponseTime: number;
  errorRate: number;
}

export interface BillingInfo {
  paymentMethod: PaymentMethod;
  billingAddress: Address;
  invoices: Invoice[];
  totalSpent: number;
  outstandingAmount: number;
  creditLimit?: number;
  paymentTerms: string;
}

export interface PaymentMethod {
  type: 'credit-card' | 'bank-transfer' | 'invoice' | 'prepaid';
  details: any;
  isDefault: boolean;
  expiryDate?: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface Invoice {
  id: string;
  number: string;
  date: Date;
  dueDate: Date;
  amount: number;
  status: InvoiceStatus;
  items: InvoiceItem[];
  taxAmount: number;
  currency: string;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  productId: string;
}

export interface APICredentials {
  apiKey: string;
  secretKey: string;
  allowedIPs: string[];
  rateLimits: RateLimits;
  permissions: APIPermission[];
  lastRotated: Date;
  expiresAt?: Date;
}

export interface RateLimits {
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  concurrentRequests: number;
}

export interface APIPermission {
  resource: string;
  actions: string[];
  filters?: Record<string, any>;
}

export type SubscriberStatus = 
  | 'active'
  | 'trial'
  | 'suspended'
  | 'cancelled'
  | 'pending-approval'
  | 'overdue';

export interface SubscriberFeedback {
  id: string;
  date: Date;
  rating: number; // 1-5
  category: FeedbackCategory;
  comment: string;
  response?: string;
  status: 'new' | 'responded' | 'resolved';
}

export type FeedbackCategory = 
  | 'data-quality'
  | 'api-performance'
  | 'documentation'
  | 'support'
  | 'pricing'
  | 'feature-request'
  | 'bug-report';

// Data Schema and Structure
export interface DataSchema {
  version: string;
  fields: DataField[];
  relationships: DataRelationship[];
  aggregations: AggregationRule[];
  filters: FilterOption[];
  sortOptions: SortOption[];
  exportFormats: ExportFormat[];
}

export interface DataField {
  name: string;
  type: FieldType;
  description: string;
  required: boolean;
  nullable: boolean;
  enumValues?: string[];
  validation?: ValidationRule[];
  anonymized: boolean;
  aggregatable: boolean;
}

export type FieldType = 
  | 'string'
  | 'number'
  | 'integer'
  | 'decimal'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'timestamp'
  | 'array'
  | 'object'
  | 'enum';

export interface ValidationRule {
  type: string;
  value: any;
  message: string;
}

export interface DataRelationship {
  name: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  foreignKey: string;
  relatedSchema: string;
}

export interface AggregationRule {
  name: string;
  fields: string[];
  function: AggregationFunction;
  groupBy: string[];
  filters?: Record<string, any>;
}

export type AggregationFunction = 
  | 'count'
  | 'sum'
  | 'average'
  | 'min'
  | 'max'
  | 'median'
  | 'percentile'
  | 'distinct'
  | 'variance'
  | 'stddev';

export interface FilterOption {
  field: string;
  operator: FilterOperator;
  valueType: FieldType;
  multiValue: boolean;
  defaultValue?: any;
}

export type FilterOperator = 
  | 'equals'
  | 'not-equals'
  | 'greater-than'
  | 'less-than'
  | 'greater-equal'
  | 'less-equal'
  | 'contains'
  | 'starts-with'
  | 'ends-with'
  | 'in'
  | 'not-in'
  | 'between'
  | 'is-null'
  | 'is-not-null';

export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
  default: boolean;
}

export type ExportFormat = 'json' | 'csv' | 'xlsx' | 'xml' | 'parquet' | 'avro';

export type AccessLevel = 
  | 'public'
  | 'restricted'
  | 'confidential'
  | 'highly-confidential';

export type RefreshFrequency = 
  | 'real-time'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'on-demand';

export type ProductStatus = 
  | 'development'
  | 'beta'
  | 'active'
  | 'deprecated'
  | 'retired';

// Data Intelligence and Analytics
export interface DataInsight {
  id: string;
  title: string;
  type: InsightType;
  category: string;
  description: string;
  methodology: string;
  dataSource: string[];
  confidence: number;
  impact: ImpactAssessment;
  generatedAt: Date;
  validUntil: Date;
  tags: string[];
  visualizations: ChartConfiguration[];
  recommendedActions: string[];
  relatedInsights: string[];
}

export type InsightType = 
  | 'trend-analysis'
  | 'anomaly-detection'
  | 'demand-forecast'
  | 'market-opportunity'
  | 'risk-assessment'
  | 'performance-benchmark'
  | 'customer-segmentation'
  | 'price-optimization'
  | 'operational-efficiency'
  | 'competitive-intelligence';

export interface ImpactAssessment {
  revenueImpact: number;
  costImpact: number;
  riskLevel: RiskLevel;
  timeframe: string;
  businessValue: BusinessValue;
  stakeholders: string[];
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface BusinessValue {
  category: BusinessValueCategory;
  quantified: boolean;
  metrics: ValueMetric[];
  description: string;
}

export type BusinessValueCategory = 
  | 'revenue-growth'
  | 'cost-reduction'
  | 'risk-mitigation'
  | 'efficiency-improvement'
  | 'customer-satisfaction'
  | 'market-expansion'
  | 'competitive-advantage';

export interface ValueMetric {
  name: string;
  value: number;
  unit: string;
  timeframe: string;
}

export interface ChartConfiguration {
  type: ChartType;
  title: string;
  data: ChartData;
  options: ChartOptions;
}

export type ChartType = 
  | 'line'
  | 'bar'
  | 'area'
  | 'pie'
  | 'scatter'
  | 'heatmap'
  | 'treemap'
  | 'sankey'
  | 'gauge'
  | 'funnel';

export interface ChartData {
  datasets: Dataset[];
  labels: string[];
  metadata: Record<string, any>;
}

export interface Dataset {
  label: string;
  data: number[];
  color?: string;
  type?: string;
}

export interface ChartOptions {
  responsive: boolean;
  interactive: boolean;
  legend: boolean;
  annotations?: Annotation[];
  thresholds?: Threshold[];
}

export interface Annotation {
  type: 'line' | 'area' | 'point' | 'text';
  value: any;
  label: string;
  color: string;
}

export interface Threshold {
  value: number;
  label: string;
  color: string;
  operator: 'greater' | 'less' | 'equal';
}

// Market Intelligence
export interface MarketIntelligence {
  id: string;
  market: MarketSegment;
  period: TimePeriod;
  competitiveAnalysis: CompetitiveAnalysis;
  demandForecasting: DemandForecast;
  pricingIntelligence: PricingIntelligence;
  trendAnalysis: TrendAnalysis;
  riskAssessment: MarketRisk[];
  opportunities: MarketOpportunity[];
  recommendations: StrategicRecommendation[];
  dataConfidence: number;
  lastUpdated: Date;
}

export interface MarketSegment {
  name: string;
  geography: string[];
  demographics: Demographics;
  seasonality: SeasonalPattern[];
  size: MarketSize;
  growthRate: number;
}

export interface Demographics {
  ageGroups: AgeGroup[];
  incomeRanges: IncomeRange[];
  preferences: CustomerPreference[];
  behaviors: CustomerBehavior[];
}

export interface AgeGroup {
  range: string;
  percentage: number;
  spendingPower: number;
  preferences: string[];
}

export interface IncomeRange {
  range: string;
  percentage: number;
  avgSpending: number;
  pricesensitivity: number;
}

export interface CustomerPreference {
  category: string;
  preferences: { item: string; score: number }[];
}

export interface CustomerBehavior {
  type: string;
  pattern: string;
  frequency: string;
  triggers: string[];
}

export interface SeasonalPattern {
  period: string;
  demandMultiplier: number;
  characteristics: string[];
}

export interface MarketSize {
  totalValue: number;
  totalVolume: number;
  currency: string;
  unit: string;
  year: number;
}

export interface CompetitiveAnalysis {
  competitors: Competitor[];
  marketShare: MarketShareData[];
  priceComparison: PriceComparison[];
  featureComparison: FeatureComparison;
  swotAnalysis: SWOTAnalysis;
}

export interface Competitor {
  name: string;
  type: CompetitorType;
  marketShare: number;
  strengths: string[];
  weaknesses: string[];
  recentMoves: CompetitorMove[];
  pricing: CompetitorPricing;
}

export type CompetitorType = 'direct' | 'indirect' | 'substitute' | 'new-entrant';

export interface CompetitorMove {
  date: Date;
  type: 'pricing' | 'product' | 'partnership' | 'expansion' | 'acquisition';
  description: string;
  impact: string;
}

export interface CompetitorPricing {
  strategy: PricingStrategy;
  ranges: PriceRange[];
  discounts: DiscountStrategy[];
}

export type PricingStrategy = 
  | 'premium'
  | 'competitive'
  | 'value'
  | 'penetration'
  | 'skimming'
  | 'dynamic';

export interface PriceRange {
  product: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
}

export interface DiscountStrategy {
  type: string;
  amount: number;
  conditions: string[];
  timing: string;
}

export interface MarketShareData {
  company: string;
  share: number;
  change: number;
  trend: 'growing' | 'stable' | 'declining';
}

export interface PriceComparison {
  category: string;
  ourPrice: number;
  competitorPrices: { competitor: string; price: number }[];
  positioning: 'premium' | 'competitive' | 'value';
}

export interface FeatureComparison {
  features: FeatureScore[];
  overallScore: number;
  ranking: number;
  gaps: string[];
  advantages: string[];
}

export interface FeatureScore {
  feature: string;
  ourScore: number;
  competitorScores: { competitor: string; score: number }[];
  importance: number;
}

export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  strategicFit: number;
}

export interface DemandForecast {
  timeHorizon: string;
  methodology: ForecastMethodology;
  scenarios: ForecastScenario[];
  drivers: DemandDriver[];
  assumptions: string[];
  confidence: ConfidenceInterval;
}

export interface ForecastMethodology {
  algorithm: string;
  dataPoints: number;
  variables: string[];
  accuracy: number;
  limitations: string[];
}

export interface ForecastScenario {
  name: string;
  probability: number;
  demand: number[];
  revenue: number[];
  timeline: string[];
  keyFactors: string[];
}

export interface DemandDriver {
  factor: string;
  impact: number;
  elasticity: number;
  controllable: boolean;
  trends: TrendDirection;
}

export type TrendDirection = 'increasing' | 'decreasing' | 'stable' | 'volatile';

export interface ConfidenceInterval {
  lower: number;
  upper: number;
  confidence: number;
}

export interface PricingIntelligence {
  optimalPricing: PricingRecommendation[];
  elasticity: PriceElasticity[];
  strategies: PricingStrategy[];
  competitivePressure: number;
  marketAcceptance: AcceptanceRange[];
}

export interface PricingRecommendation {
  product: string;
  currentPrice: number;
  recommendedPrice: number;
  expectedImpact: PriceImpact;
  rationale: string;
  implementation: ImplementationPlan;
}

export interface PriceImpact {
  revenueChange: number;
  volumeChange: number;
  marginChange: number;
  marketShareChange: number;
}

export interface ImplementationPlan {
  timeline: string;
  phases: ImplementationPhase[];
  risks: string[];
  mitigations: string[];
}

export interface ImplementationPhase {
  phase: string;
  duration: string;
  activities: string[];
  milestones: string[];
}

export interface PriceElasticity {
  product: string;
  elasticity: number;
  segment: string;
  priceRange: { min: number; max: number };
  factors: string[];
}

export interface AcceptanceRange {
  segment: string;
  minPrice: number;
  maxPrice: number;
  optimalPrice: number;
  sensitivity: number;
}

export interface TrendAnalysis {
  emergingTrends: EmergingTrend[];
  cyclicalPatterns: CyclicalPattern[];
  disruptiveForces: DisruptiveForce[];
  futureProjections: FutureProjection[];
}

export interface EmergingTrend {
  name: string;
  strength: TrendStrength;
  timeframe: string;
  impact: TrendImpact;
  indicators: TrendIndicator[];
  implications: string[];
}

export type TrendStrength = 'weak' | 'moderate' | 'strong' | 'dominant';

export interface TrendImpact {
  market: number;
  revenue: number;
  operations: number;
  competitive: number;
}

export interface TrendIndicator {
  metric: string;
  value: number;
  change: number;
  significance: string;
}

export interface CyclicalPattern {
  name: string;
  period: string;
  amplitude: number;
  phase: string;
  predictability: number;
}

export interface DisruptiveForce {
  name: string;
  type: DisruptionType;
  probability: number;
  timeline: string;
  impact: DisruptionImpact;
  preparedness: number;
}

export type DisruptionType = 
  | 'technological'
  | 'regulatory'
  | 'economic'
  | 'social'
  | 'environmental'
  | 'political';

export interface DisruptionImpact {
  severity: 'low' | 'medium' | 'high' | 'extreme';
  scope: string[];
  mitigation: string[];
  opportunities: string[];
}

export interface FutureProjection {
  timeframe: string;
  scenario: string;
  probability: number;
  keyMetrics: ProjectionMetric[];
  assumptions: string[];
}

export interface ProjectionMetric {
  name: string;
  currentValue: number;
  projectedValue: number;
  confidence: number;
  drivers: string[];
}

export interface MarketRisk {
  id: string;
  name: string;
  type: RiskType;
  probability: number;
  impact: number;
  severity: RiskSeverity;
  timeframe: string;
  indicators: RiskIndicator[];
  mitigation: MitigationStrategy[];
  monitoring: MonitoringPlan;
}

export type RiskType = 
  | 'market'
  | 'competitive'
  | 'operational'
  | 'financial'
  | 'regulatory'
  | 'technological'
  | 'reputational';

export type RiskSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface RiskIndicator {
  metric: string;
  threshold: number;
  currentValue: number;
  trend: TrendDirection;
  frequency: string;
}

export interface MitigationStrategy {
  strategy: string;
  cost: number;
  effectiveness: number;
  timeline: string;
  owner: string;
}

export interface MonitoringPlan {
  frequency: string;
  metrics: string[];
  alerts: AlertRule[];
  reporting: ReportingRequirement[];
}

export interface AlertRule {
  condition: string;
  threshold: number;
  severity: string;
  recipients: string[];
}

export interface ReportingRequirement {
  frequency: string;
  format: string;
  recipients: string[];
  content: string[];
}

export interface MarketOpportunity {
  id: string;
  name: string;
  type: OpportunityType;
  size: OpportunitySize;
  attractiveness: number;
  feasibility: number;
  urgency: string;
  requirements: string[];
  timeline: OpportunityTimeline;
  competition: number;
}

export type OpportunityType = 
  | 'new-market'
  | 'product-expansion'
  | 'pricing'
  | 'partnership'
  | 'technology'
  | 'acquisition'
  | 'innovation';

export interface OpportunitySize {
  revenue: number;
  volume: number;
  margin: number;
  customers: number;
}

export interface OpportunityTimeline {
  immediate: string[];
  shortTerm: string[];
  mediumTerm: string[];
  longTerm: string[];
}

export interface StrategicRecommendation {
  id: string;
  title: string;
  priority: Priority;
  category: RecommendationCategory;
  description: string;
  rationale: string;
  expectedOutcome: ExpectedOutcome;
  implementation: ImplementationPlan;
  resources: ResourceRequirement[];
  risks: string[];
  metrics: SuccessMetric[];
}

export type Priority = 'low' | 'medium' | 'high' | 'critical';

export type RecommendationCategory = 
  | 'pricing'
  | 'product'
  | 'market'
  | 'operations'
  | 'technology'
  | 'partnership'
  | 'investment';

export interface ExpectedOutcome {
  revenue: number;
  costs: number;
  roi: number;
  timeline: string;
  confidence: number;
}

export interface ResourceRequirement {
  type: ResourceType;
  amount: number;
  duration: string;
  availability: string;
}

export type ResourceType = 
  | 'financial'
  | 'human'
  | 'technology'
  | 'infrastructure'
  | 'partnership'
  | 'regulatory';

export interface SuccessMetric {
  name: string;
  target: number;
  measurement: string;
  frequency: string;
  owner: string;
}

export interface TimePeriod {
  start: Date;
  end: Date;
  granularity: TimeGranularity;
  timezone: string;
}

export type TimeGranularity = 
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year';

// API Response Types
export interface DataMonetizationResponse<T = any> {
  success: boolean;
  data: T;
  metadata: {
    timestamp: Date;
    version: string;
    count?: number;
    pagination?: PaginationInfo;
    filters?: Record<string, any>;
  };
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface DataAlert {
  id: string;
  type: 'product-usage' | 'revenue' | 'subscriber' | 'data-quality' | 'system';
  severity: 'info' | 'warning' | 'critical' | 'emergency';
  productId?: string;
  subscriberId?: string;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  actionRequired: boolean;
  recommendations: string[];
  escalated: boolean;
}
