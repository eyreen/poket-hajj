// Advanced Anomaly Detection & Fraud Prevention System Types
// Implementation of Feature 3 from improvement documents

export interface FraudDetectionSystem {
  behavioralBiometrics: BehavioralBiometrics;
  networkAnalysis: NetworkAnalysis;
  realTimeScoring: RealTimeScoring;
  transactionMonitoring: TransactionMonitoring;
  alertSystem: FraudAlertSystem;
  investigation: FraudInvestigation;
  automation: FraudAutomation;
}

// Behavioral Biometrics & User Pattern Analysis
export interface BehavioralBiometrics {
  userProfiles: UserBehaviorProfile[];
  deviationDetection: DeviationDetector;
  biometricSignatures: BiometricSignature[];
  adaptiveLearning: AdaptiveLearningEngine;
}

export interface UserBehaviorProfile {
  userId: string;
  loginPatterns: LoginPattern[];
  transactionPatterns: TransactionPattern[];
  deviceFingerprints: DeviceFingerprint[];
  locationHistory: LocationPattern[];
  timeBasedBehavior: TimeBasedBehavior;
  riskScore: number;
  lastUpdated: Date;
  confidenceLevel: number;
}

export interface LoginPattern {
  typicalLoginTimes: TimeWindow[];
  deviceConsistency: number;
  locationConsistency: number;
  sessionDuration: number;
  authenticationMethods: string[];
  failurePatterns: FailurePattern[];
}

export interface TransactionPattern {
  typicalAmounts: AmountRange[];
  frequency: TransactionFrequency;
  preferredMethods: PaymentMethod[];
  recipientPatterns: string[];
  timingPatterns: TimeWindow[];
  seasonalVariations: SeasonalPattern[];
}

export interface DeviceFingerprint {
  deviceId: string;
  browserFingerprint: string;
  screenResolution: string;
  timezone: string;
  language: string;
  plugins: string[];
  userAgent: string;
  lastSeen: Date;
  trustLevel: number;
}

export interface LocationPattern {
  coordinates: GeoCoordinate;
  frequency: number;
  timeOfDay: TimeWindow[];
  trustLevel: number;
  lastSeen: Date;
}

export interface TimeBasedBehavior {
  activeHours: TimeWindow[];
  weeklyPatterns: WeeklyPattern[];
  holidayBehavior: HolidayPattern[];
  timezoneConsistency: number;
}

// Network Analysis for Coordinated Fraud Detection
export interface NetworkAnalysis {
  transactionNetworks: TransactionNetwork[];
  suspiciousPatterns: SuspiciousPattern[];
  moneyLaunderingDetection: MoneyLaunderingIndicator[];
  coordinatedActivity: CoordinatedActivity[];
  entityResolution: EntityResolution;
}

export interface TransactionNetwork {
  networkId: string;
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  riskScore: number;
  analysisTimestamp: Date;
  flaggedReasons: string[];
}

export interface NetworkNode {
  nodeId: string;
  nodeType: 'user' | 'account' | 'device' | 'location';
  attributes: Record<string, string | number | boolean>;
  connections: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface NetworkEdge {
  sourceNodeId: string;
  targetNodeId: string;
  relationshipType: 'transaction' | 'device_sharing' | 'location_overlap' | 'timing_correlation';
  weight: number;
  frequency: number;
  suspicious: boolean;
}

export interface SuspiciousPattern {
  patternId: string;
  patternType: 'circular_transactions' | 'rapid_movement' | 'structuring' | 'wash_trading';
  involvedEntities: string[];
  confidence: number;
  detectedAt: Date;
  riskLevel: number;
}

export interface MoneyLaunderingIndicator {
  indicatorId: string;
  indicatorType: 'placement' | 'layering' | 'integration';
  description: string;
  involvedTransactions: string[];
  riskScore: number;
  requiredActions: string[];
}

export interface CoordinatedActivity {
  activityId: string;
  activityType: 'mass_registration' | 'synchronized_transactions' | 'bot_activity';
  involvedUsers: string[];
  timeWindow: TimeWindow;
  confidence: number;
  automaticBlocking: boolean;
}

// Real-Time Fraud Scoring
export interface RealTimeScoring {
  scoringModels: ScoringModel[];
  riskFactors: RiskFactor[];
  thresholds: RiskThreshold[];
  modelPerformance: ModelPerformance;
}

export interface ScoringModel {
  modelId: string;
  modelName: string;
  modelType: 'behavioral' | 'transactional' | 'network' | 'hybrid';
  version: string;
  accuracy: number;
  lastTraining: Date;
  features: ModelFeature[];
  weights: Record<string, number>;
}

export interface RiskFactor {
  factorId: string;
  factorName: string;
  category: 'behavioral' | 'transactional' | 'contextual' | 'historical';
  weight: number;
  description: string;
  calculation: string;
}

export interface RiskThreshold {
  thresholdId: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  scoreRange: [number, number];
  actions: AutomatedAction[];
  humanReviewRequired: boolean;
}

export interface ModelFeature {
  featureName: string;
  featureType: 'numerical' | 'categorical' | 'boolean' | 'text';
  importance: number;
  description: string;
}

// Transaction Monitoring
export interface TransactionMonitoring {
  monitors: TransactionMonitor[];
  rules: MonitoringRule[];
  alerts: TransactionAlert[];
  patterns: SuspiciousTransactionPattern[];
}

export interface TransactionMonitor {
  monitorId: string;
  monitorName: string;
  monitorType: 'amount_based' | 'velocity_based' | 'pattern_based' | 'geographic';
  isActive: boolean;
  rules: string[];
  alertThreshold: number;
  lastUpdated: Date;
}

export interface MonitoringRule {
  ruleId: string;
  ruleName: string;
  ruleType: 'threshold' | 'pattern' | 'statistical' | 'ml_based';
  condition: string;
  parameters: Record<string, string | number | boolean>;
  severity: number;
  isActive: boolean;
  falsePositiveRate: number;
}

export interface TransactionAlert {
  alertId: string;
  transactionId: string;
  alertType: 'unusual_amount' | 'velocity_anomaly' | 'pattern_match' | 'geographic_anomaly';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  riskScore: number;
  triggeredRules: string[];
  timestamp: Date;
  status: 'new' | 'investigating' | 'resolved' | 'false_positive';
  assignedOfficer?: string;
  actions: string[];
}

export interface SuspiciousTransactionPattern {
  patternId: string;
  patternName: string;
  description: string;
  indicators: string[];
  examples: TransactionExample[];
  riskLevel: number;
}

// Alert System
export interface FraudAlertSystem {
  alertTypes: FraudAlertType[];
  escalationRules: EscalationRule[];
  notifications: NotificationChannel[];
  alertQueue: FraudAlert[];
  responseProtocols: ResponseProtocol[];
}

export interface FraudAlertType {
  typeId: string;
  typeName: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  automaticActions: AutomatedAction[];
  requiredResponse: ResponseRequirement;
  escalationTime: number; // minutes
}

export interface FraudAlert {
  alertId: string;
  alertType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  affectedEntities: AffectedEntity[];
  detectionTimestamp: Date;
  status: 'new' | 'acknowledged' | 'investigating' | 'resolved';
  assignedOfficer?: string;
  riskScore: number;
  evidence: Evidence[];
  recommendedActions: string[];
  escalated: boolean;
  tags: string[];
}

export interface AffectedEntity {
  entityId: string;
  entityType: 'user' | 'transaction' | 'account' | 'device';
  riskLevel: number;
  actions: string[];
}

export interface Evidence {
  evidenceId: string;
  evidenceType: 'transaction_log' | 'behavior_pattern' | 'network_analysis' | 'device_fingerprint';
  data: Record<string, string | number | boolean>;
  confidence: number;
  timestamp: Date;
}

// Investigation Tools
export interface FraudInvestigation {
  investigationTools: InvestigationTool[];
  forensicAnalysis: ForensicAnalysis;
  reportGeneration: CaseReporting;
  caseManagement: CaseManagement;
}

export interface InvestigationTool {
  toolId: string;
  toolName: string;
  toolType: 'network_graph' | 'timeline_analysis' | 'pattern_matching' | 'correlation_analysis';
  description: string;
  capabilities: string[];
  requiredPermissions: string[];
}

export interface ForensicAnalysis {
  digitalForensics: DigitalForensic[];
  transactionForensics: TransactionForensicData[];
  behaviorAnalysis: BehaviorAnalysisData[];
  evidenceChain: EvidenceChain;
}

export interface TransactionForensicData {
  forensicId: string;
  transactionId: string;
  analysisType: 'flow_analysis' | 'timing_analysis' | 'amount_analysis';
  findings: string[];
  riskIndicators: string[];
  timestamp: Date;
}

export interface BehaviorAnalysisData {
  analysisId: string;
  userId: string;
  analysisType: 'pattern_deviation' | 'timing_anomaly' | 'location_anomaly';
  deviationScore: number;
  findings: string[];
  timestamp: Date;
}

export interface DigitalForensic {
  forensicId: string;
  targetType: 'device' | 'session' | 'network';
  artifacts: DigitalArtifact[];
  analysisResults: AnalysisResult[];
  timestamp: Date;
}

export interface DigitalArtifact {
  artifactId: string;
  artifactType: 'log_file' | 'network_trace' | 'device_fingerprint' | 'session_data';
  data: Record<string, string | number | boolean>;
  hash: string;
  chain_of_custody: CustodyRecord[];
}

// Automation & Response
export interface FraudAutomation {
  automatedActions: AutomatedAction[];
  workflows: FraudWorkflow[];
  blockingRules: BlockingRule[];
  complianceActions: ComplianceAction[];
}

export interface AutomatedAction {
  actionId: string;
  actionType: 'freeze_account' | 'block_transaction' | 'require_verification' | 'flag_for_review';
  trigger: ActionTrigger;
  parameters: Record<string, string | number | boolean>;
  rollbackConditions: string[];
  executionLog: ExecutionLogEntry[];
}

export interface ActionTrigger {
  triggerId: string;
  triggerType: 'risk_score' | 'pattern_match' | 'manual_override' | 'time_based';
  condition: string;
  threshold: number;
  cooldownPeriod: number;
}

export interface FraudWorkflow {
  workflowId: string;
  workflowName: string;
  steps: WorkflowStep[];
  triggers: string[];
  automationLevel: 'manual' | 'semi_automatic' | 'fully_automatic';
  slaTarget: number; // minutes
}

export interface WorkflowStep {
  stepId: string;
  stepName: string;
  stepType: 'automated' | 'manual' | 'approval';
  action: string;
  conditions: string[];
  timeout: number;
  escalation: EscalationAction;
}

export interface BlockingRule {
  ruleId: string;
  ruleName: string;
  blockingType: 'temporary' | 'permanent' | 'conditional';
  conditions: string[];
  duration?: number;
  unblockConditions: string[];
  lastUpdated: Date;
}

// Supporting Types
export interface TimeWindow {
  start: string; // HH:mm format
  end: string;   // HH:mm format
  timezone?: string;
}

export interface AmountRange {
  min: number;
  max: number;
  currency: string;
  frequency: number;
}

export interface TransactionFrequency {
  daily: number;
  weekly: number;
  monthly: number;
  variance: number;
}

export interface PaymentMethod {
  method: string;
  frequency: number;
  averageAmount: number;
  lastUsed: Date;
}

export interface SeasonalPattern {
  season: 'hajj' | 'umrah' | 'ramadan' | 'normal';
  adjustmentFactor: number;
  historicalData: number[];
}

export interface WeeklyPattern {
  dayOfWeek: number; // 0-6
  activityLevel: number;
  typicalHours: TimeWindow[];
}

export interface HolidayPattern {
  holidayType: string;
  behaviorChange: number;
  duration: number;
}

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface FailurePattern {
  failureType: 'wrong_password' | 'wrong_otp' | 'device_not_recognized';
  frequency: number;
  consecutiveFailures: number;
  timePattern: TimeWindow[];
}

export interface TransactionExample {
  exampleId: string;
  description: string;
  transactionData: Record<string, string | number | boolean>;
  riskIndicators: string[];
}

export interface ResponseRequirement {
  maxResponseTime: number; // minutes
  requiredRole: string[];
  approvalRequired: boolean;
  documentationRequired: boolean;
}

export interface EscalationRule {
  ruleId: string;
  conditions: string[];
  escalationTarget: string;
  timeThreshold: number;
  notificationMethods: string[];
}

export interface EscalationAction {
  targetRole: string;
  notificationMethod: string[];
  additionalContext: string[];
}

export interface ResponseProtocol {
  protocolId: string;
  alertType: string;
  steps: ProtocolStep[];
  maxDuration: number;
  successCriteria: string[];
}

export interface ProtocolStep {
  stepNumber: number;
  action: string;
  maxDuration: number;
  requiredRole: string[];
  outputs: string[];
}

export interface NotificationChannel {
  channelId: string;
  channelType: 'email' | 'sms' | 'push' | 'slack' | 'dashboard';
  config: Record<string, string | number | boolean>;
  priority: number;
  isActive: boolean;
}

export interface ModelPerformance {
  modelId: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  falsePositiveRate: number;
  falseNegativeRate: number;
  lastEvaluation: Date;
}

export interface ExecutionLogEntry {
  timestamp: Date;
  action: string;
  result: 'success' | 'failure' | 'partial';
  details: string;
  officer?: string;
}

export interface CustodyRecord {
  timestamp: Date;
  officer: string;
  action: 'collected' | 'analyzed' | 'transferred' | 'stored';
  details: string;
  signature: string;
}

export interface AnalysisResult {
  resultId: string;
  analysisType: string;
  findings: string[];
  confidence: number;
  recommendations: string[];
  timestamp: Date;
}

export interface EvidenceChain {
  chainId: string;
  evidenceItems: string[];
  integrity: boolean;
  custodyTrail: CustodyRecord[];
  verified: boolean;
}

export interface CaseManagement {
  cases: FraudCase[];
  caseTemplates: CaseTemplate[];
  workflows: CaseWorkflow[];
  reporting: CaseReporting;
}

export interface FraudCase {
  caseId: string;
  caseNumber: string;
  title: string;
  status: 'open' | 'investigating' | 'pending_approval' | 'closed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  assignedOfficer: string;
  createdAt: Date;
  updatedAt: Date;
  summary: string;
  evidence: string[];
  suspects: string[];
  timeline: CaseEvent[];
  resolution?: CaseResolution;
}

export interface CaseTemplate {
  templateId: string;
  templateName: string;
  caseType: string;
  defaultSteps: WorkflowStep[];
  requiredEvidence: string[];
  slaTarget: number;
}

export interface CaseWorkflow {
  workflowId: string;
  caseType: string;
  steps: CaseWorkflowStep[];
  automationRules: string[];
}

export interface CaseWorkflowStep {
  stepId: string;
  stepName: string;
  stepType: 'investigation' | 'evidence_collection' | 'analysis' | 'review' | 'decision';
  requiredActions: string[];
  deliverables: string[];
  sla: number;
}

export interface CaseEvent {
  eventId: string;
  eventType: 'evidence_added' | 'interview_conducted' | 'analysis_completed' | 'decision_made';
  timestamp: Date;
  officer: string;
  description: string;
  attachments: string[];
}

export interface CaseResolution {
  resolutionId: string;
  resolutionType: 'confirmed_fraud' | 'false_positive' | 'inconclusive' | 'policy_violation';
  description: string;
  actionsRequired: string[];
  preventiveMeasures: string[];
  resolvedBy: string;
  resolvedAt: Date;
}

export interface CaseReporting {
  reportTypes: CaseReportType[];
  scheduledReports: ScheduledReport[];
  metrics: CaseMetrics;
}

export interface CaseReportType {
  reportId: string;
  reportName: string;
  description: string;
  template: string;
  requiredData: string[];
}

export interface ScheduledReport {
  scheduleId: string;
  reportType: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  recipients: string[];
  lastGenerated: Date;
  nextDue: Date;
}

export interface CaseMetrics {
  totalCases: number;
  casesByStatus: Record<string, number>;
  casesBySeverity: Record<string, number>;
  averageResolutionTime: number;
  falsePositiveRate: number;
  detectionAccuracy: number;
  officerWorkload: Record<string, number>;
}

export interface ComplianceAction {
  actionId: string;
  actionType: 'regulatory_report' | 'audit_trail' | 'policy_enforcement' | 'documentation';
  description: string;
  requiredBy: string[];
  automationLevel: 'manual' | 'semi_automatic' | 'fully_automatic';
  compliance_framework: string[];
}

export interface EntityResolution {
  entityId: string;
  aliases: string[];
  confidence: number;
  attributes: Record<string, string | number | boolean>;
  linkedEntities: string[];
  lastUpdated: Date;
}

export interface DeviationDetector {
  detectorId: string;
  detectorType: 'statistical' | 'ml_based' | 'rule_based';
  sensitivity: number;
  thresholds: Record<string, number>;
  lastCalibration: Date;
}

export interface BiometricSignature {
  signatureId: string;
  userId: string;
  signatureType: 'typing_pattern' | 'mouse_movement' | 'touch_pattern' | 'navigation_flow';
  template: Record<string, string | number | boolean>;
  confidence: number;
  lastUpdated: Date;
}

export interface AdaptiveLearningEngine {
  engineId: string;
  learningType: 'supervised' | 'unsupervised' | 'reinforcement';
  modelVersions: string[];
  adaptationRate: number;
  performanceMetrics: ModelPerformance;
  lastUpdate: Date;
}

// API Response Types
export interface FraudDashboardData {
  overviewStats: FraudOverviewStats;
  recentAlerts: FraudAlert[];
  riskTrends: RiskTrendData[];
  activeInvestigations: FraudCase[];
  systemHealth: FraudSystemHealth;
}

export interface FraudOverviewStats {
  totalAlertsToday: number;
  criticalAlerts: number;
  averageRiskScore: number;
  transactionsBlocked: number;
  falsePositiveRate: number;
  detectionAccuracy: number;
  activeInvestigations: number;
  resolvedCasesToday: number;
}

export interface RiskTrendData {
  timestamp: Date;
  riskScore: number;
  alertCount: number;
  transactionVolume: number;
  falsePositives: number;
}

export interface FraudSystemHealth {
  modelPerformance: ModelPerformance[];
  systemUptime: number;
  processingLatency: number;
  alertResponse: number;
  lastUpdate: Date;
  issues: SystemIssue[];
}

export interface SystemIssue {
  issueId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  component: string;
  impact: string;
  timestamp: Date;
  status: 'new' | 'investigating' | 'resolved';
}
