'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertTriangle, 
  Shield, 
  Activity, 
  Users, 
  TrendingUp, 
  Clock, 
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  BarChart3,
  Network,
  Brain,
  Zap
} from 'lucide-react';
import {
  getFraudDashboardData,
  getFraudAlerts,
  updateAlertStatus,
  getBehavioralAnalysis,
  getNetworkAnalysis,
  executeAutomatedAction
} from '@/lib/fraud-detection-api';
import type { 
  FraudDashboardData, 
  FraudAlert, 
  UserBehaviorProfile,
  NetworkAnalysis,
  FraudCase
} from '@/types/fraud-detection';

export default function FraudDetectionCenter() {
  const [dashboardData, setDashboardData] = useState<FraudDashboardData | null>(null);
  const [alerts, setAlerts] = useState<FraudAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    loadDashboardData();
    loadAlerts();
  }, []);

  const loadDashboardData = async () => {
    try {
      const data = await getFraudDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to load fraud dashboard data:', error);
    }
  };

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const status = filterStatus === 'all' ? undefined : filterStatus;
      const severity = filterSeverity === 'all' ? undefined : filterSeverity;
      const alertData = await getFraudAlerts(status, severity, 50);
      setAlerts(alertData);
    } catch (error) {
      console.error('Failed to load alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, [filterStatus, filterSeverity]);

  const handleUpdateAlertStatus = async (alertId: string, newStatus: string) => {
    try {
      await updateAlertStatus(alertId, newStatus, 'current_officer');
      loadAlerts(); // Reload alerts
      loadDashboardData(); // Update dashboard stats
    } catch (error) {
      console.error('Failed to update alert status:', error);
    }
  };

  const handleExecuteAction = async (actionType: string, alertId: string) => {
    try {
      const result = await executeAutomatedAction(actionType, { alertId });
      if (result.success) {
        console.log('Action executed successfully:', result.message);
        loadAlerts(); // Reload to show updated status
      }
    } catch (error) {
      console.error('Failed to execute action:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'investigating': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fraud Detection & Prevention Center</h1>
        <p className="text-gray-600 mt-2">
          Advanced AI-powered fraud detection with behavioral analysis and real-time monitoring
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alerts Today</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.overviewStats.totalAlertsToday}
                </p>
                <p className="text-sm text-red-600 flex items-center mt-1">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  {dashboardData.overviewStats.criticalAlerts} Critical
                </p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Detection Accuracy</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.overviewStats.detectionAccuracy}%
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {dashboardData.overviewStats.falsePositiveRate}% False Positive
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Blocked Transactions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.overviewStats.transactionsBlocked}
                </p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <Activity className="h-4 w-4 mr-1" />
                  Real-time Protection
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Ban className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Investigations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.overviewStats.activeInvestigations}
                </p>
                <p className="text-sm text-orange-600 flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  {dashboardData.overviewStats.resolvedCasesToday} Resolved Today
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Alerts & Monitoring
          </TabsTrigger>
          <TabsTrigger value="behavioral" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Behavioral Analysis
          </TabsTrigger>
          <TabsTrigger value="network" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Network Analysis
          </TabsTrigger>
          <TabsTrigger value="investigations" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Investigations
          </TabsTrigger>
          <TabsTrigger value="automation" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Automation Rules
          </TabsTrigger>
        </TabsList>

        {/* Alerts & Monitoring Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Fraud Alerts</CardTitle>
                  <CardDescription>
                    Real-time fraud detection alerts requiring attention
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search alerts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="acknowledged">Acknowledged</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severity</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAlerts.map((alert) => (
                    <div key={alert.alertId} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(alert.status)}>
                            {alert.status.toUpperCase()}
                          </Badge>
                          <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            Risk Score: {(alert.riskScore * 100).toFixed(1)}%
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedAlert(selectedAlert?.alertId === alert.alertId ? null : alert)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            {selectedAlert?.alertId === alert.alertId ? 'Hide' : 'Details'}
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-gray-600">{alert.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Detected: {alert.detectionTimestamp.toLocaleString()}</span>
                          {alert.assignedOfficer && (
                            <span>Assigned: {alert.assignedOfficer}</span>
                          )}
                          <span>Entities: {alert.affectedEntities.length}</span>
                        </div>
                        
                        {alert.status === 'new' && (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateAlertStatus(alert.alertId, 'acknowledged')}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Acknowledge
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateAlertStatus(alert.alertId, 'investigating')}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Investigate
                            </Button>
                            {alert.severity === 'critical' && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleExecuteAction('freeze_account', alert.alertId)}
                              >
                                <Ban className="h-4 w-4 mr-1" />
                                Block
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {selectedAlert?.alertId === alert.alertId && (
                        <div className="border-t pt-4 mt-4 space-y-3">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Affected Entities</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {alert.affectedEntities.map((entity, idx) => (
                                <div key={idx} className="bg-gray-50 p-3 rounded">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">{entity.entityType}: {entity.entityId}</span>
                                    <Badge variant="outline">
                                      Risk: {(entity.riskLevel * 100).toFixed(0)}%
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Evidence</h4>
                            <div className="space-y-2">
                              {alert.evidence.map((evidence, idx) => (
                                <div key={idx} className="bg-gray-50 p-3 rounded">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">{evidence.evidenceType}</span>
                                    <Badge variant="outline">
                                      Confidence: {(evidence.confidence * 100).toFixed(0)}%
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">
                                    Collected: {evidence.timestamp.toLocaleString()}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Recommended Actions</h4>
                            <div className="flex flex-wrap gap-2">
                              {alert.recommendedActions.map((action, idx) => (
                                <Badge key={idx} variant="secondary">{action}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Behavioral Analysis Tab */}
        <TabsContent value="behavioral" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Behavioral Pattern Analysis</CardTitle>
              <CardDescription>
                AI-powered behavioral biometrics and pattern recognition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">User Behavior Monitoring</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Active Profiles</span>
                      <Badge>2,847 Users</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Baseline Accuracy:</span>
                        <span className="font-medium ml-2">94.2%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Anomalies Detected:</span>
                        <span className="font-medium ml-2">23 Today</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Biometric Signatures</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">Typing Patterns</span>
                      <Badge variant="outline">89% Accuracy</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">Mouse Movement</span>
                      <Badge variant="outline">76% Accuracy</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">Navigation Flow</span>
                      <Badge variant="outline">92% Accuracy</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Network Analysis Tab */}
        <TabsContent value="network" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Network Analysis</CardTitle>
              <CardDescription>
                Detect coordinated fraud and money laundering patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Network Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">Active Networks</span>
                      <Badge>156</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                      <span className="text-sm">Suspicious Patterns</span>
                      <Badge variant="destructive">8</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                      <span className="text-sm">ML Indicators</span>
                      <Badge variant="destructive">3</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="font-semibold text-gray-900">Recent Suspicious Patterns</h3>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Circular Transaction Pattern</span>
                        <Badge variant="destructive">High Risk</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        3 users conducting circular transfers to obscure fund origins
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">85% Confidence</Badge>
                        <Badge variant="outline">3 Entities</Badge>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Synchronized Activity</span>
                        <Badge variant="destructive">Critical</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Multiple accounts executing identical transactions simultaneously
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">90% Confidence</Badge>
                        <Badge variant="outline">7 Entities</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Investigations Tab */}
        <TabsContent value="investigations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Investigations</CardTitle>
              <CardDescription>
                Fraud cases under investigation and their progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.activeInvestigations.map((investigation) => (
                  <div key={investigation.caseId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{investigation.caseNumber}</h3>
                        <Badge className={getSeverityColor(investigation.severity)}>
                          {investigation.severity.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(investigation.status)}>
                          {investigation.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        {investigation.assignedOfficer}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{investigation.title}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Created: {investigation.createdAt.toLocaleDateString()}</span>
                      <span>Evidence: {investigation.evidence.length} items</span>
                      <span>Suspects: {investigation.suspects.length}</span>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Case
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Rules Tab */}
        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Automated Response Rules</CardTitle>
              <CardDescription>
                Configure automated actions for fraud prevention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Active Rules</h3>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">High-Value Transaction Block</span>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Automatically block transactions above RM 10,000 from new devices
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">Risk Score ≥ 0.8</Badge>
                        <Badge variant="secondary">New Device</Badge>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Geographic Anomaly Alert</span>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Alert when transactions occur from unusual locations
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">Location Change</Badge>
                        <Badge variant="secondary">≥ 1000km</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Rule Performance</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">Rules Triggered Today</span>
                      <Badge>89</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                      <span className="text-sm">Successful Blocks</span>
                      <Badge variant="secondary">76</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                      <span className="text-sm">False Positives</span>
                      <Badge variant="outline">3</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
