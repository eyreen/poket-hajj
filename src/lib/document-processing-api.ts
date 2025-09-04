// Document Processing API Functions
import { 
  DocumentData, 
  DocumentProcessingStats, 
  SuspiciousDocument, 
  DocumentProcessingAlert,
  ApprovalWorkflow,
  CrossReferenceResult
} from '@/types/document-processing';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Document Upload and OCR Processing
export async function uploadDocument(file: File, documentType: string, pilgrimId: string): Promise<DocumentData> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('documentType', documentType);
  formData.append('pilgrimId', pilgrimId);

  const response = await fetch(`${API_BASE}/admin/documents/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload document');
  }

  return response.json();
}

// Process document with AI OCR and verification
export async function processDocument(documentId: string): Promise<DocumentData> {
  const response = await fetch(`${API_BASE}/admin/documents/${documentId}/process`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to process document');
  }

  return response.json();
}

// Get document processing statistics
export async function getDocumentStats(timeRange: 'today' | 'week' | 'month' = 'today'): Promise<DocumentProcessingStats> {
  const response = await fetch(`${API_BASE}/admin/documents/stats?range=${timeRange}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch document statistics');
  }

  return response.json();
}

// Get pending documents for review
export async function getPendingDocuments(limit = 50, offset = 0): Promise<{
  documents: DocumentData[];
  total: number;
  hasMore: boolean;
}> {
  const response = await fetch(`${API_BASE}/admin/documents/pending?limit=${limit}&offset=${offset}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch pending documents');
  }

  return response.json();
}

// Get flagged/suspicious documents
export async function getFlaggedDocuments(severity?: 'low' | 'medium' | 'high' | 'critical'): Promise<SuspiciousDocument[]> {
  const params = severity ? `?severity=${severity}` : '';
  const response = await fetch(`${API_BASE}/admin/documents/flagged${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch flagged documents');
  }

  return response.json();
}

// Approve document
export async function approveDocument(documentId: string, officerId: string, notes?: string): Promise<void> {
  const response = await fetch(`${API_BASE}/admin/documents/${documentId}/approve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ officerId, notes }),
  });

  if (!response.ok) {
    throw new Error('Failed to approve document');
  }
}

// Reject document
export async function rejectDocument(documentId: string, officerId: string, reason: string): Promise<void> {
  const response = await fetch(`${API_BASE}/admin/documents/${documentId}/reject`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ officerId, reason }),
  });

  if (!response.ok) {
    throw new Error('Failed to reject document');
  }
}

// Request manual review
export async function requestManualReview(documentId: string, officerId: string, priority: 'normal' | 'high' | 'urgent'): Promise<void> {
  const response = await fetch(`${API_BASE}/admin/documents/${documentId}/manual-review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ officerId, priority }),
  });

  if (!response.ok) {
    throw new Error('Failed to request manual review');
  }
}

// Cross-reference document with external APIs
export async function crossReferenceDocument(documentId: string, apiSources: string[]): Promise<CrossReferenceResult[]> {
  const response = await fetch(`${API_BASE}/admin/documents/${documentId}/cross-reference`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ apiSources }),
  });

  if (!response.ok) {
    throw new Error('Failed to cross-reference document');
  }

  return response.json();
}

// Get processing alerts
export async function getProcessingAlerts(acknowledged = false): Promise<DocumentProcessingAlert[]> {
  const response = await fetch(`${API_BASE}/admin/documents/alerts?acknowledged=${acknowledged}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch processing alerts');
  }

  return response.json();
}

// Acknowledge alert
export async function acknowledgeAlert(alertId: string, officerId: string): Promise<void> {
  const response = await fetch(`${API_BASE}/admin/documents/alerts/${alertId}/acknowledge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ officerId }),
  });

  if (!response.ok) {
    throw new Error('Failed to acknowledge alert');
  }
}

// Get workflow status
export async function getWorkflowStatus(documentId: string): Promise<ApprovalWorkflow> {
  const response = await fetch(`${API_BASE}/admin/documents/${documentId}/workflow`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch workflow status');
  }

  return response.json();
}

// Bulk operations
export async function bulkApproveDocuments(documentIds: string[], officerId: string): Promise<{
  approved: string[];
  failed: string[];
}> {
  const response = await fetch(`${API_BASE}/admin/documents/bulk-approve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ documentIds, officerId }),
  });

  if (!response.ok) {
    throw new Error('Failed to bulk approve documents');
  }

  return response.json();
}

// Real-time processing status
export function subscribeToProcessingUpdates(callback: (update: any) => void): () => void {
  const eventSource = new EventSource(`${API_BASE}/admin/documents/stream`);
  
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    callback(data);
  };

  return () => {
    eventSource.close();
  };
}
