// Predictive Pilgrim Sentiment & Crisis Management System Types
// Implementation of Feature 4 from improvement documents

export interface SentimentAnalysisSystem {
  sentimentEngine: SentimentAnalysisEngine;
  dataIngestion: DataIngestionEngine;
  alertSystem: SentimentAlertSystem;
  crisisManagement: CrisisManagementSystem;
  responseAutomation: ResponseAutomationEngine;
  analytics: SentimentAnalytics;
}

// Sentiment Analysis Engine
export interface SentimentAnalysisEngine {
  nlpModels: NLPModel[];
  sentimentClassification: SentimentClassifier;
  topicExtraction: TopicExtractor;
  emergingTrendDetection: TrendDetector;
  languageSupport: LanguageProcessor[];
}

export interface NLPModel {
  modelId: string;
  modelName: string;
  modelType: 'sentiment' | 'topic' | 'emotion' | 'intent';
  language: string;
  accuracy: number;
  lastTraining: Date;
  version: string;
  configuration: ModelConfiguration;
}

export interface ModelConfiguration {
  modelClass: string;
  parameters: Record<string, string | number | boolean>;
  preprocessingSteps: string[];
  postprocessingRules: string[];
  confidenceThreshold: number;
}

export interface SentimentClassifier {
  classificationTypes: SentimentClass[];
  confidenceScoring: ConfidenceScorer;
  contextAnalysis: ContextAnalyzer;
  emotionDetection: EmotionDetector;
}

export interface SentimentClass {
  className: 'positive' | 'negative' | 'neutral' | 'mixed';
  intensity: number; // 0-1 scale
  confidence: number;
  keywords: string[];
  patterns: string[];
}

export interface ConfidenceScorer {
  scoringAlgorithm: string;
  weightingFactors: Record<string, number>;
  calibrationData: CalibrationPoint[];
  threshold: number;
}

export interface CalibrationPoint {
  predictedScore: number;
  actualScore: number;
  sampleSize: number;
  timestamp: Date;
}

export interface ContextAnalyzer {
  contextTypes: ContextType[];
  situationalFactors: SituationalFactor[];
  temporalContext: TemporalContext;
  geographicContext: GeographicContext;
}

export interface ContextType {
  contextId: string;
  contextName: string;
  contextCategory: 'service' | 'experience' | 'communication' | 'product';
  keywords: string[];
  weightingFactor: number;
}

export interface SituationalFactor {
  factorId: string;
  factorName: string;
  factorType: 'seasonal' | 'event_based' | 'demographic' | 'behavioral';
  impact: number;
  conditions: string[];
}

export interface TemporalContext {
  timeOfDay: TimeWindow;
  dayOfWeek: number;
  seasonality: SeasonalFactor[];
  holidayEffects: HolidayFactor[];
}

export interface GeographicContext {
  region: string;
  culturalFactors: CulturalFactor[];
  languageVariations: LanguageVariation[];
  localEvents: LocalEvent[];
}

// Topic Extraction & Trending
export interface TopicExtractor {
  topicModels: TopicModel[];
  keywordExtraction: KeywordExtractor;
  phraseDetection: PhraseDetector;
  entityRecognition: EntityRecognizer;
}

export interface TopicModel {
  modelId: string;
  topicCategories: TopicCategory[];
  coherenceScore: number;
  lastUpdate: Date;
  trainingDataSize: number;
}

export interface TopicCategory {
  categoryId: string;
  categoryName: string;
  keywords: string[];
  relatedTopics: string[];
  frequency: number;
  sentiment: SentimentDistribution;
}

export interface SentimentDistribution {
  positive: number;
  negative: number;
  neutral: number;
  mixed: number;
}

export interface KeywordExtractor {
  extractionMethod: 'tfidf' | 'word2vec' | 'bert' | 'custom';
  relevanceThreshold: number;
  maxKeywords: number;
  stopWords: string[];
}

export interface TrendDetector {
  detectionAlgorithms: TrendAlgorithm[];
  trendCategories: TrendCategory[];
  alertThresholds: TrendThreshold[];
  forecastingModels: ForecastingModel[];
}

export interface TrendAlgorithm {
  algorithmId: string;
  algorithmType: 'statistical' | 'ml_based' | 'rule_based';
  sensitivity: number;
  lookbackPeriod: number;
  minimumDataPoints: number;
}

export interface TrendCategory {
  categoryId: string;
  categoryName: string;
  trendType: 'emerging' | 'declining' | 'volatile' | 'stable';
  severity: 'low' | 'medium' | 'high' | 'critical';
  impactArea: string[];
}

// Data Ingestion
export interface DataIngestionEngine {
  dataSources: DataSource[];
  ingestionPipelines: IngestionPipeline[];
  dataQuality: DataQualityChecker;
  realTimeStreaming: StreamingProcessor;
}

export interface DataSource {
  sourceId: string;
  sourceName: string;
  sourceType: 'chat_logs' | 'app_reviews' | 'social_media' | 'surveys' | 'support_tickets';
  connectionConfig: ConnectionConfig;
  dataFormat: string;
  updateFrequency: string;
  isActive: boolean;
  lastUpdate: Date;
}

export interface ConnectionConfig {
  endpoint?: string;
  authentication: AuthConfig;
  parameters: Record<string, string | number | boolean>;
  rateLimit: RateLimit;
}

export interface AuthConfig {
  authType: 'api_key' | 'oauth' | 'basic' | 'custom';
  credentials: Record<string, string>;
  tokenRefresh?: TokenRefreshConfig;
}

export interface TokenRefreshConfig {
  refreshEndpoint: string;
  refreshInterval: number;
  autoRefresh: boolean;
}

export interface RateLimit {
  requestsPerMinute: number;
  burstLimit: number;
  backoffStrategy: 'exponential' | 'linear' | 'fixed';
}

export interface IngestionPipeline {
  pipelineId: string;
  pipelineName: string;
  sourceIds: string[];
  transformationSteps: TransformationStep[];
  outputDestination: string;
  schedule: PipelineSchedule;
}

export interface TransformationStep {
  stepId: string;
  stepType: 'cleaning' | 'normalization' | 'enrichment' | 'filtering';
  configuration: Record<string, string | number | boolean>;
  order: number;
}

export interface PipelineSchedule {
  scheduleType: 'real_time' | 'batch' | 'trigger_based';
  interval?: string;
  triggers?: TriggerCondition[];
}

export interface TriggerCondition {
  conditionType: 'data_volume' | 'time_based' | 'external_event';
  threshold: number;
  action: string;
}

// Alert System
export interface SentimentAlertSystem {
  alertRules: SentimentAlertRule[];
  escalationMatrix: EscalationMatrix;
  notificationChannels: NotificationChannel[];
  alertQueue: SentimentAlert[];
}

export interface SentimentAlertRule {
  ruleId: string;
  ruleName: string;
  ruleType: 'threshold' | 'trend' | 'anomaly' | 'pattern';
  conditions: AlertCondition[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  targetAudience: string[];
  cooldownPeriod: number;
  isActive: boolean;
}

export interface AlertCondition {
  conditionId: string;
  metric: string;
  operator: '>' | '<' | '=' | '>=' | '<=' | '!=';
  threshold: number;
  timeWindow: number;
  aggregation: 'avg' | 'sum' | 'max' | 'min' | 'count';
}

export interface EscalationMatrix {
  escalationLevels: EscalationLevel[];
  escalationRules: EscalationRule[];
  automatedActions: AutomatedEscalationAction[];
}

export interface EscalationLevel {
  level: number;
  levelName: string;
  targetRoles: string[];
  responseTimeSLA: number;
  requiredActions: string[];
}

export interface EscalationRule {
  ruleId: string;
  triggerConditions: string[];
  escalationDelay: number;
  skipConditions: string[];
  automatedEscalation: boolean;
}

export interface AutomatedEscalationAction {
  actionId: string;
  actionType: 'notify' | 'assign' | 'create_task' | 'trigger_workflow';
  parameters: Record<string, string | number | boolean>;
  conditions: string[];
}

export interface SentimentAlert {
  alertId: string;
  alertType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  triggeringData: TriggeringData;
  detectionTimestamp: Date;
  status: 'new' | 'acknowledged' | 'investigating' | 'resolved';
  assignedTeam?: string;
  assignedOfficer?: string;
  recommendedActions: string[];
  relatedAlerts: string[];
  businessImpact: BusinessImpact;
}

export interface TriggeringData {
  dataSource: string;
  dataPoints: DataPoint[];
  aggregatedMetrics: Record<string, number>;
  trendAnalysis: TrendAnalysis;
  contextualInfo: ContextualInfo;
}

export interface DataPoint {
  timestamp: Date;
  source: string;
  content: string;
  sentiment: SentimentScore;
  topics: string[];
  metadata: Record<string, string | number | boolean>;
}

export interface SentimentScore {
  overall: number;
  positive: number;
  negative: number;
  neutral: number;
  confidence: number;
}

export interface TrendAnalysis {
  trendDirection: 'increasing' | 'decreasing' | 'stable' | 'volatile';
  changeRate: number;
  significance: number;
  predictedTrajectory: TrajectoryPoint[];
}

export interface TrajectoryPoint {
  timestamp: Date;
  predictedValue: number;
  confidence: number;
}

export interface ContextualInfo {
  timeContext: string;
  geographicContext: string;
  demographicContext: string;
  situationalContext: string;
}

export interface BusinessImpact {
  impactLevel: 'low' | 'medium' | 'high' | 'critical';
  affectedAreas: string[];
  estimatedImpact: EstimatedImpact;
  mitigationPriority: number;
}

export interface EstimatedImpact {
  customerSatisfaction: number;
  reputationRisk: number;
  operationalImpact: number;
  financialImpact: number;
}

// Crisis Management
export interface CrisisManagementSystem {
  crisisDetection: CrisisDetector;
  responseProtocols: ResponseProtocol[];
  communicationTemplates: CommunicationTemplate[];
  stakeholderManagement: StakeholderManager;
  incidentTracking: IncidentTracker;
}

export interface CrisisDetector {
  detectionRules: CrisisDetectionRule[];
  severityAssessment: SeverityAssessor;
  impactAnalysis: ImpactAnalyzer;
  riskCalculator: RiskCalculator;
}

export interface CrisisDetectionRule {
  ruleId: string;
  ruleName: string;
  triggerConditions: CrisisTrigger[];
  severityMapping: SeverityMapping;
  autoActivation: boolean;
  confirmationRequired: boolean;
}

export interface CrisisTrigger {
  triggerId: string;
  triggerType: 'sentiment_threshold' | 'volume_spike' | 'topic_emergence' | 'combination';
  parameters: Record<string, string | number | boolean>;
  weight: number;
}

export interface SeverityMapping {
  criticalThreshold: number;
  highThreshold: number;
  mediumThreshold: number;
  escalationCriteria: string[];
}

export interface ResponseProtocol {
  protocolId: string;
  protocolName: string;
  crisisType: string;
  severity: string;
  responseSteps: ResponseStep[];
  timelineTargets: TimelineTarget[];
  successMetrics: SuccessMetric[];
}

export interface ResponseStep {
  stepId: string;
  stepName: string;
  stepType: 'assessment' | 'communication' | 'action' | 'monitoring';
  description: string;
  responsibleTeam: string;
  targetDuration: number;
  dependencies: string[];
  deliverables: string[];
}

export interface TimelineTarget {
  milestone: string;
  targetTime: number;
  criticalPath: boolean;
  successCriteria: string[];
}

export interface SuccessMetric {
  metricName: string;
  metricType: 'sentiment_recovery' | 'volume_reduction' | 'resolution_time' | 'satisfaction';
  targetValue: number;
  measurementMethod: string;
}

// Response Automation
export interface ResponseAutomationEngine {
  automatedResponses: AutomatedResponse[];
  responseTemplates: ResponseTemplate[];
  approvalWorkflows: ApprovalWorkflow[];
  contentGeneration: ContentGenerator;
}

export interface AutomatedResponse {
  responseId: string;
  responseName: string;
  triggerConditions: ResponseTrigger[];
  responseType: 'immediate' | 'scheduled' | 'conditional';
  channels: string[];
  content: ResponseContent;
  approvalRequired: boolean;
}

export interface ResponseTrigger {
  triggerId: string;
  triggerEvent: string;
  conditions: string[];
  priority: number;
  cooldown: number;
}

export interface ResponseContent {
  contentType: 'text' | 'template' | 'generated' | 'multimedia';
  content: string;
  personalization: PersonalizationRule[];
  localization: LocalizationConfig[];
}

export interface PersonalizationRule {
  ruleId: string;
  targetCriteria: string[];
  customization: Record<string, string>;
  priority: number;
}

export interface LocalizationConfig {
  language: string;
  region: string;
  culturalAdaptations: string[];
  localizedContent: Record<string, string>;
}

export interface ResponseTemplate {
  templateId: string;
  templateName: string;
  templateType: string;
  content: string;
  variables: TemplateVariable[];
  approvalLevel: string;
  usageTracking: TemplateUsage;
}

export interface TemplateVariable {
  variableName: string;
  variableType: 'text' | 'number' | 'date' | 'boolean';
  defaultValue?: string;
  validationRules: string[];
}

export interface TemplateUsage {
  timesUsed: number;
  lastUsed: Date;
  effectiveness: EffectivenessMetric[];
  feedbackScore: number;
}

export interface EffectivenessMetric {
  metricName: string;
  value: number;
  timestamp: Date;
  context: string;
}

// Analytics
export interface SentimentAnalytics {
  dashboards: SentimentDashboard[];
  reports: SentimentReport[];
  insights: SentimentInsight[];
  predictions: SentimentPrediction[];
}

export interface SentimentDashboard {
  dashboardId: string;
  dashboardName: string;
  widgets: DashboardWidget[];
  refreshInterval: number;
  targetAudience: string[];
  accessControl: AccessControl;
}

export interface DashboardWidget {
  widgetId: string;
  widgetType: 'chart' | 'metric' | 'table' | 'map' | 'text';
  title: string;
  dataSource: string;
  configuration: WidgetConfiguration;
  position: WidgetPosition;
}

export interface WidgetConfiguration {
  chartType?: string;
  timeRange: string;
  filters: Record<string, string | number | boolean>;
  aggregation: string;
  thresholds?: ThresholdConfig[];
}

export interface ThresholdConfig {
  name: string;
  value: number;
  color: string;
  operator: string;
}

export interface WidgetPosition {
  row: number;
  column: number;
  width: number;
  height: number;
}

export interface AccessControl {
  allowedRoles: string[];
  allowedUsers: string[];
  accessLevel: 'read' | 'write' | 'admin';
}

export interface SentimentReport {
  reportId: string;
  reportName: string;
  reportType: 'scheduled' | 'on_demand' | 'triggered';
  schedule?: ReportSchedule;
  content: ReportContent;
  distribution: ReportDistribution;
}

export interface ReportSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  time: string;
  timezone: string;
  excludeWeekends: boolean;
}

export interface ReportContent {
  sections: ReportSection[];
  format: 'pdf' | 'html' | 'excel' | 'json';
  template: string;
  dataRange: string;
}

export interface ReportSection {
  sectionId: string;
  sectionType: 'summary' | 'detailed' | 'chart' | 'table';
  title: string;
  content: string;
  data: Record<string, unknown>;
}

export interface ReportDistribution {
  recipients: string[];
  deliveryMethod: 'email' | 'portal' | 'api' | 'print';
  distributionRules: DistributionRule[];
}

export interface DistributionRule {
  condition: string;
  recipients: string[];
  priority: number;
}

export interface SentimentInsight {
  insightId: string;
  insightType: 'trend' | 'anomaly' | 'pattern' | 'correlation';
  title: string;
  description: string;
  significance: number;
  actionable: boolean;
  recommendedActions: string[];
  supportingData: Record<string, unknown>;
  timestamp: Date;
}

export interface SentimentPrediction {
  predictionId: string;
  predictionType: 'short_term' | 'medium_term' | 'long_term';
  targetMetric: string;
  forecastHorizon: number;
  confidence: number;
  predictions: PredictionPoint[];
  methodology: string;
  assumptions: string[];
}

export interface PredictionPoint {
  timestamp: Date;
  predictedValue: number;
  confidenceInterval: ConfidenceInterval;
  influencingFactors: string[];
}

export interface ConfidenceInterval {
  lower: number;
  upper: number;
  confidence: number;
}

// Supporting Types
export interface TimeWindow {
  start: string;
  end: string;
  timezone?: string;
}

export interface SeasonalFactor {
  season: string;
  adjustmentFactor: number;
  historicalData: number[];
}

export interface HolidayFactor {
  holidayName: string;
  impact: number;
  duration: number;
  culturalRelevance: string[];
}

export interface CulturalFactor {
  factorId: string;
  factorName: string;
  region: string;
  impact: number;
  considerations: string[];
}

export interface LanguageVariation {
  language: string;
  dialect: string;
  commonPhrases: string[];
  sentimentModifiers: Record<string, number>;
}

export interface LocalEvent {
  eventId: string;
  eventName: string;
  eventType: string;
  impact: number;
  dateRange: DateRange;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface PhraseDetector {
  detectionMethod: string;
  minPhraseLength: number;
  maxPhraseLength: number;
  frequencyThreshold: number;
}

export interface EntityRecognizer {
  entityTypes: string[];
  recognitionMethod: string;
  confidence: number;
  customEntities: CustomEntity[];
}

export interface CustomEntity {
  entityId: string;
  entityName: string;
  entityType: string;
  patterns: string[];
  aliases: string[];
}

export interface TrendThreshold {
  thresholdId: string;
  metricName: string;
  operator: string;
  value: number;
  timeWindow: number;
  severity: string;
}

export interface ForecastingModel {
  modelId: string;
  modelType: 'arima' | 'lstm' | 'prophet' | 'linear_regression';
  accuracy: number;
  horizon: number;
  lastTrained: Date;
}

export interface DataQualityChecker {
  qualityRules: QualityRule[];
  qualityMetrics: QualityMetric[];
  cleaningProcedures: CleaningProcedure[];
}

export interface QualityRule {
  ruleId: string;
  ruleName: string;
  ruleType: 'completeness' | 'accuracy' | 'consistency' | 'timeliness';
  condition: string;
  threshold: number;
  action: string;
}

export interface QualityMetric {
  metricName: string;
  currentValue: number;
  targetValue: number;
  trend: string;
  lastCalculated: Date;
}

export interface CleaningProcedure {
  procedureId: string;
  procedureName: string;
  steps: string[];
  automationLevel: 'manual' | 'semi_automatic' | 'fully_automatic';
}

export interface StreamingProcessor {
  streamingTechnology: string;
  throughputCapacity: number;
  latency: number;
  bufferConfig: BufferConfig;
}

export interface BufferConfig {
  bufferSize: number;
  flushInterval: number;
  backpressureHandling: string;
}

export interface NotificationChannel {
  channelId: string;
  channelType: 'email' | 'sms' | 'slack' | 'teams' | 'dashboard' | 'mobile_push';
  configuration: ChannelConfiguration;
  isActive: boolean;
  priority: number;
}

export interface ChannelConfiguration {
  endpoint?: string;
  authentication?: Record<string, string>;
  templateFormat: string;
  rateLimit?: number;
  retryPolicy?: RetryPolicy;
}

export interface RetryPolicy {
  maxRetries: number;
  backoffStrategy: string;
  retryInterval: number;
}

export interface SeverityAssessor {
  assessmentCriteria: AssessmentCriteria[];
  scoringAlgorithm: string;
  weightingFactors: Record<string, number>;
}

export interface AssessmentCriteria {
  criteriaId: string;
  criteriaName: string;
  weight: number;
  thresholds: Record<string, number>;
}

export interface ImpactAnalyzer {
  impactDimensions: ImpactDimension[];
  calculationMethod: string;
  timeHorizons: string[];
}

export interface ImpactDimension {
  dimensionId: string;
  dimensionName: string;
  weight: number;
  calculationFormula: string;
}

export interface RiskCalculator {
  riskFactors: RiskFactor[];
  riskMatrix: RiskMatrix;
  mitigationStrategies: MitigationStrategy[];
}

export interface RiskFactor {
  factorId: string;
  factorName: string;
  probability: number;
  impact: number;
  weight: number;
}

export interface RiskMatrix {
  matrixId: string;
  dimensions: string[];
  riskLevels: RiskLevel[];
  thresholds: Record<string, number>;
}

export interface RiskLevel {
  level: string;
  color: string;
  description: string;
  requiredActions: string[];
}

export interface MitigationStrategy {
  strategyId: string;
  strategyName: string;
  applicableRisks: string[];
  effectiveness: number;
  cost: number;
  implementationTime: number;
}

export interface StakeholderManager {
  stakeholderGroups: StakeholderGroup[];
  communicationPlans: CommunicationPlan[];
  escalationPaths: EscalationPath[];
}

export interface StakeholderGroup {
  groupId: string;
  groupName: string;
  stakeholders: Stakeholder[];
  communicationPreferences: CommunicationPreference[];
  influenceLevel: number;
}

export interface Stakeholder {
  stakeholderId: string;
  name: string;
  role: string;
  contactInfo: ContactInfo;
  availabilitySchedule: AvailabilitySchedule;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  alternateContacts: string[];
}

export interface AvailabilitySchedule {
  timezone: string;
  workingHours: TimeWindow[];
  emergencyAvailability: boolean;
}

export interface CommunicationPreference {
  channel: string;
  priority: number;
  urgencyThreshold: string;
}

export interface CommunicationPlan {
  planId: string;
  planName: string;
  targetAudience: string[];
  messageTemplates: MessageTemplate[];
  timing: CommunicationTiming;
}

export interface MessageTemplate {
  templateId: string;
  messageType: string;
  channel: string;
  template: string;
  approvalRequired: boolean;
}

export interface CommunicationTiming {
  immediateNotification: boolean;
  followUpSchedule: string[];
  updateFrequency: string;
}

export interface EscalationPath {
  pathId: string;
  pathName: string;
  triggerConditions: string[];
  escalationSteps: EscalationStep[];
  maxEscalationTime: number;
}

export interface EscalationStep {
  stepNumber: number;
  targetRole: string;
  contactMethod: string;
  timeout: number;
  requiredActions: string[];
}

export interface IncidentTracker {
  incidents: SentimentIncident[];
  trackingMetrics: TrackingMetric[];
  resolutionWorkflows: ResolutionWorkflow[];
}

export interface SentimentIncident {
  incidentId: string;
  incidentType: string;
  severity: string;
  status: 'open' | 'investigating' | 'resolving' | 'resolved' | 'closed';
  title: string;
  description: string;
  detectedAt: Date;
  assignedTeam: string;
  timeline: IncidentEvent[];
  resolution?: IncidentResolution;
}

export interface IncidentEvent {
  eventId: string;
  eventType: string;
  timestamp: Date;
  description: string;
  actor: string;
  impact: string;
}

export interface IncidentResolution {
  resolutionId: string;
  resolutionType: string;
  description: string;
  resolvedAt: Date;
  resolvedBy: string;
  effectiveness: number;
  lessonsLearned: string[];
}

export interface TrackingMetric {
  metricName: string;
  currentValue: number;
  trend: string;
  benchmark: number;
  lastUpdated: Date;
}

export interface ResolutionWorkflow {
  workflowId: string;
  workflowName: string;
  incidentTypes: string[];
  steps: WorkflowStep[];
  slaTargets: SLATarget[];
}

export interface WorkflowStep {
  stepId: string;
  stepName: string;
  stepType: string;
  description: string;
  assignedRole: string;
  estimatedDuration: number;
  dependencies: string[];
}

export interface SLATarget {
  targetName: string;
  targetValue: number;
  unit: string;
  severity: string;
}

export interface ApprovalWorkflow {
  workflowId: string;
  workflowName: string;
  approvalSteps: ApprovalStep[];
  autoApprovalRules: AutoApprovalRule[];
}

export interface ApprovalStep {
  stepId: string;
  stepName: string;
  approverRole: string;
  requiredLevel: string;
  timeout: number;
  escalationAction: string;
}

export interface AutoApprovalRule {
  ruleId: string;
  conditions: string[];
  maxValue?: number;
  trustedSources: string[];
}

export interface ContentGenerator {
  generationModels: GenerationModel[];
  templates: ContentTemplate[];
  qualityCheckers: QualityChecker[];
}

export interface GenerationModel {
  modelId: string;
  modelType: 'gpt' | 'bert' | 'custom';
  capabilities: string[];
  languages: string[];
  qualityScore: number;
}

export interface ContentTemplate {
  templateId: string;
  contentType: string;
  structure: string;
  placeholders: string[];
  styleguide: string;
}

export interface QualityChecker {
  checkerId: string;
  checkerType: 'grammar' | 'sentiment' | 'brand_voice' | 'factual';
  threshold: number;
  autoCorrect: boolean;
}

// API Response Types
export interface SentimentDashboardData {
  overviewMetrics: SentimentOverviewMetrics;
  recentAlerts: SentimentAlert[];
  trendAnalysis: SentimentTrendData[];
  topicInsights: TopicInsight[];
  systemHealth: SentimentSystemHealth;
}

export interface SentimentOverviewMetrics {
  totalMentions: number;
  overallSentiment: number;
  sentimentDistribution: SentimentDistribution;
  activeAlerts: number;
  trendDirection: string;
  satisfactionScore: number;
  responseRate: number;
  resolutionTime: number;
}

export interface SentimentTrendData {
  timestamp: Date;
  sentiment: number;
  volume: number;
  topics: string[];
  sources: Record<string, number>;
}

export interface TopicInsight {
  topic: string;
  volume: number;
  sentiment: number;
  trend: string;
  keywords: string[];
  impact: string;
}

export interface SentimentSystemHealth {
  modelPerformance: ModelPerformanceMetric[];
  dataQuality: number;
  processingLatency: number;
  systemUptime: number;
  lastUpdate: Date;
  issues: SystemIssue[];
}

export interface ModelPerformanceMetric {
  modelId: string;
  modelName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  lastEvaluation: Date;
}

export interface SystemIssue {
  issueId: string;
  severity: string;
  description: string;
  component: string;
  impact: string;
  timestamp: Date;
  status: string;
}
