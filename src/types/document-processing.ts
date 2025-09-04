// Document Processing AI System Types
export interface DocumentData {
  id: string;
  type: 'ic' | 'passport' | 'health_certificate' | 'financial_statement' | 'visa' | 'other';
  extractedText: string;
  confidence: number;
  fields: Record<string, any>;
  metadata: {
    fileSize: number;
    mimeType: string;
    uploadDate: Date;
    processingTime: number;
  };
}

export interface FraudPattern {
  id: string;
  type: 'duplicate_document' | 'altered_document' | 'fake_document' | 'suspicious_pattern';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  confidence: number;
  indicators: string[];
}

export interface IntelligentDocumentProcessor {
  ocrEngine: {
    documentExtraction: DocumentData;
    multiLanguageSupport: ['malay', 'english', 'arabic'];
    accuracyRate: number; // Target 99.5%
  };
  verification: {
    crossReferenceAPIs: ['JPJ', 'Immigration', 'MOH'];
    blockchainVerification: boolean;
    fraudDetection: FraudPattern[];
  };
  automation: {
    autoApproval: DocumentCategory[];
    flagging: SuspiciousDocument[];
    workflowRouting: ApprovalWorkflow[];
  };
}

export interface DocumentCategory {
  id: string;
  name: string;
  type: DocumentData['type'];
  autoApprovalCriteria: {
    minimumConfidence: number;
    requiredFields: string[];
    crossReferenceRequired: boolean;
  };
  processingTime: {
    average: number; // in seconds
    target: number;
  };
}

export interface SuspiciousDocument {
  documentId: string;
  pilgrimId: string;
  suspiciousPatterns: FraudPattern[];
  flaggedAt: Date;
  flaggedBy: 'system' | 'human';
  status: 'pending_review' | 'under_investigation' | 'cleared' | 'rejected';
  assignedOfficer?: string;
  notes: string[];
}

export interface ApprovalWorkflow {
  id: string;
  documentType: DocumentData['type'];
  steps: WorkflowStep[];
  automationRules: AutomationRule[];
  escalationPath: EscalationRule[];
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'automated' | 'human_review' | 'cross_reference' | 'final_approval';
  timeLimit: number; // in hours
  criteria: StepCriteria;
  nextStep?: string;
}

export interface StepCriteria {
  confidence: number;
  requiredFields: string[];
  crossReferenceResults?: CrossReferenceResult[];
  manualReviewRequired: boolean;
}

export interface AutomationRule {
  id: string;
  condition: string;
  action: 'auto_approve' | 'flag_for_review' | 'reject' | 'escalate';
  priority: number;
}

export interface EscalationRule {
  trigger: 'time_exceeded' | 'high_risk' | 'officer_request' | 'system_error';
  escalateTo: 'senior_officer' | 'department_head' | 'security_team';
  timeframe: number; // in hours
}

export interface CrossReferenceResult {
  apiSource: string;
  status: 'verified' | 'not_found' | 'mismatch' | 'error';
  confidence: number;
  data?: any;
  lastChecked: Date;
}

export interface DocumentProcessingStats {
  totalDocuments: number;
  processedToday: number;
  averageProcessingTime: number;
  automationRate: number;
  accuracyRate: number;
  flaggedDocuments: number;
  pendingReview: number;
  officerWorkload: {
    [officerId: string]: {
      pendingDocuments: number;
      averageReviewTime: number;
      approvalRate: number;
    };
  };
}

export interface DocumentProcessingAlert {
  id: string;
  type: 'high_volume' | 'system_error' | 'fraud_detected' | 'api_failure' | 'quality_decline';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: Date;
  affectedDocuments?: string[];
  recommendedAction: string;
  acknowledged: boolean;
  resolvedAt?: Date;
}
