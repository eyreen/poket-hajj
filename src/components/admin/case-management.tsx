'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Clock, 
  User, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  Search,
  Calendar,
  Users,
  Shield,
  Activity,
  Target,
  BarChart3
} from 'lucide-react';
import {
  getFraudDashboardData,
  createFraudCase
} from '@/lib/fraud-detection-api';
import type { 
  FraudCase,
  FraudDashboardData
} from '@/types/fraud-detection';

export default function CaseManagement() {
  const [cases, setCases] = useState<FraudCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState<FraudCase | null>(null);

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      setLoading(true);
      const dashboardData = await getFraudDashboardData();
      setCases(dashboardData.activeInvestigations);
    } catch (error) {
      console.error('Failed to load cases:', error);
    } finally {
      setLoading(false);
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
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'investigating': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'closed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <FileText className="h-4 w-4" />;
      case 'investigating': return <Eye className="h-4 w-4" />;
      case 'pending_approval': return <Clock className="h-4 w-4" />;
      case 'closed': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const filteredCases = cases.filter(caseItem => {
    const matchesStatus = filterStatus === 'all' || caseItem.status === filterStatus;
    const matchesSeverity = filterSeverity === 'all' || caseItem.severity === filterSeverity;
    const matchesSearch = caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         caseItem.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         caseItem.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSeverity && matchesSearch;
  });

  const caseStats = {
    total: cases.length,
    open: cases.filter(c => c.status === 'open').length,
    investigating: cases.filter(c => c.status === 'investigating').length,
    pendingApproval: cases.filter(c => c.status === 'pending_approval').length,
    closed: cases.filter(c => c.status === 'closed').length,
    critical: cases.filter(c => c.severity === 'critical').length,
    high: cases.filter(c => c.severity === 'high').length
  };

  if (loading) {
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
        <h1 className="text-3xl font-bold text-gray-900">Fraud Case Management</h1>
        <p className="text-gray-600 mt-2">
          Comprehensive case tracking and investigation management system
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cases</p>
                <p className="text-2xl font-bold text-gray-900">{caseStats.total}</p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <FileText className="h-4 w-4 mr-1" />
                  Active Investigations
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Under Investigation</p>
                <p className="text-2xl font-bold text-gray-900">{caseStats.investigating}</p>
                <p className="text-sm text-orange-600 flex items-center mt-1">
                  <Eye className="h-4 w-4 mr-1" />
                  Active Progress
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Cases</p>
                <p className="text-2xl font-bold text-gray-900">{caseStats.critical}</p>
                <p className="text-sm text-red-600 flex items-center mt-1">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  High Priority
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
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-gray-900">{caseStats.pendingApproval}</p>
                <p className="text-sm text-yellow-600 flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  Awaiting Review
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="cases" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cases">Case List</TabsTrigger>
          <TabsTrigger value="analytics">Case Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Cases Tab */}
        <TabsContent value="cases" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Cases</CardTitle>
                  <CardDescription>
                    Manage and track fraud investigation cases
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search cases..."
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
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="pending_approval">Pending Approval</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
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
              <div className="space-y-4">
                {filteredCases.map((caseItem) => (
                  <div key={caseItem.caseId} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className={getSeverityColor(caseItem.severity)}>
                          {caseItem.severity.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(caseItem.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(caseItem.status)}
                            {caseItem.status.toUpperCase().replace('_', ' ')}
                          </div>
                        </Badge>
                        <h3 className="font-semibold text-gray-900">
                          {caseItem.caseNumber}: {caseItem.title}
                        </h3>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCase(
                          selectedCase?.caseId === caseItem.caseId ? null : caseItem
                        )}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        {selectedCase?.caseId === caseItem.caseId ? 'Hide' : 'View Details'}
                      </Button>
                    </div>
                    
                    <p className="text-gray-600">{caseItem.summary}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{caseItem.assignedOfficer}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Created: {caseItem.createdAt.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Updated: {caseItem.updatedAt.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="h-4 w-4" />
                          <span>Evidence: {caseItem.evidence.length} items</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>Suspects: {caseItem.suspects.length}</span>
                        </div>
                      </div>
                    </div>
                    
                    {selectedCase?.caseId === caseItem.caseId && (
                      <div className="border-t pt-4 mt-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Case Timeline</h4>
                            <div className="space-y-2">
                              {caseItem.timeline.map((event, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Activity className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium text-sm capitalize">
                                        {event.eventType.replace('_', ' ')}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {event.timestamp.toLocaleDateString()}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                                    <p className="text-xs text-gray-500 mt-1">Officer: {event.officer}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Case Details</h4>
                            <div className="space-y-3">
                              <div className="bg-gray-50 p-3 rounded">
                                <span className="text-sm font-medium text-gray-600">Evidence Items:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {caseItem.evidence.map((evidenceId, idx) => (
                                    <Badge key={idx} variant="outline">{evidenceId}</Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="bg-gray-50 p-3 rounded">
                                <span className="text-sm font-medium text-gray-600">Suspects:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {caseItem.suspects.map((suspect, idx) => (
                                    <Badge key={idx} variant="outline">{suspect}</Badge>
                                  ))}
                                </div>
                              </div>
                              
                              {caseItem.resolution && (
                                <div className="bg-green-50 border border-green-200 p-3 rounded">
                                  <span className="text-sm font-medium text-green-800">Resolution:</span>
                                  <p className="text-sm text-green-700 mt-1">{caseItem.resolution.description}</p>
                                  <p className="text-xs text-green-600 mt-1">
                                    Resolved by: {caseItem.resolution.resolvedBy} on {caseItem.resolution.resolvedAt.toLocaleDateString()}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2 pt-4 border-t">
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            Generate Report
                          </Button>
                          <Button variant="outline" size="sm">
                            <User className="h-4 w-4 mr-1" />
                            Assign Officer
                          </Button>
                          {caseItem.status !== 'closed' && (
                            <Button size="sm">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Update Status
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Case Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                    <span className="text-sm font-medium">Open Cases</span>
                    <Badge>{caseStats.open}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
                    <span className="text-sm font-medium">Under Investigation</span>
                    <Badge>{caseStats.investigating}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                    <span className="text-sm font-medium">Pending Approval</span>
                    <Badge>{caseStats.pendingApproval}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                    <span className="text-sm font-medium">Closed Cases</span>
                    <Badge>{caseStats.closed}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Severity Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                    <span className="text-sm font-medium">Critical</span>
                    <Badge variant="destructive">{caseStats.critical}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
                    <span className="text-sm font-medium">High</span>
                    <Badge>{caseStats.high}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                    <span className="text-sm font-medium">Medium</span>
                    <Badge>{cases.filter(c => c.severity === 'medium').length}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                    <span className="text-sm font-medium">Low</span>
                    <Badge>{cases.filter(c => c.severity === 'low').length}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Investigation Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">4.2</div>
                  <div className="text-sm text-gray-600">Avg Days to Resolution</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">87%</div>
                  <div className="text-sm text-gray-600">Case Closure Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-gray-600">Evidence Quality Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Case Reports & Documentation</CardTitle>
              <CardDescription>
                Generate comprehensive reports and documentation for fraud cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Available Reports</h3>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Monthly Case Summary</span>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Generate
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Comprehensive monthly summary of all fraud cases and outcomes
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Investigation Timeline Report</span>
                        <Button variant="outline" size="sm">
                          <Clock className="h-4 w-4 mr-1" />
                          Generate
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Detailed timeline analysis of investigation processes and efficiency
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Evidence Analysis Report</span>
                        <Button variant="outline" size="sm">
                          <Shield className="h-4 w-4 mr-1" />
                          Generate
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Analysis of evidence quality and investigation outcomes
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Export Options</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Export Case List (PDF)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Export Analytics (Excel)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="h-4 w-4 mr-2" />
                      Export Evidence Log (CSV)
                    </Button>
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
