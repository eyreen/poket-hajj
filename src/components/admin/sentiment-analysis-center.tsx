'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  MessageCircle, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Heart, 
  ThumbsDown,
  Eye,
  Clock,
  Users,
  BarChart3,
  Brain,
  Zap,
  Globe,
  Shield,
  Bell,
  CheckCircle,
  XCircle,
  Search,
  Filter
} from 'lucide-react';
import {
  getSentimentDashboardData,
  getSentimentAlerts,
  updateAlertStatus,
  detectEmergingTrends,
  getSentimentBySource,
  triggerCrisisProtocol,
  generateAutomatedResponse
} from '@/lib/sentiment-analysis-api';
import type { 
  SentimentDashboardData, 
  SentimentAlert,
  TopicInsight 
} from '@/types/sentiment-analysis';

export default function SentimentAnalysisCenter() {
  const [dashboardData, setDashboardData] = useState<SentimentDashboardData | null>(null);
  const [alerts, setAlerts] = useState<SentimentAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState<SentimentAlert | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [emergingTrends, setEmergingTrends] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
    loadAlerts();
    loadEmergingTrends();
  }, []);

  const loadDashboardData = async () => {
    try {
      const data = await getSentimentDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to load sentiment dashboard data:', error);
    }
  };

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const status = filterStatus === 'all' ? undefined : filterStatus;
      const severity = filterSeverity === 'all' ? undefined : filterSeverity;
      const alertData = await getSentimentAlerts(status, severity, 50);
      setAlerts(alertData);
    } catch (error) {
      console.error('Failed to load sentiment alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEmergingTrends = async () => {
    try {
      const { trends, alerts: trendAlerts } = await detectEmergingTrends(24);
      setEmergingTrends(trends);
      // Merge trend alerts with existing alerts
      setAlerts(prev => [...trendAlerts, ...prev]);
    } catch (error) {
      console.error('Failed to load emerging trends:', error);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, [filterStatus, filterSeverity]);

  const handleUpdateAlertStatus = async (alertId: string, newStatus: string, team?: string) => {
    try {
      await updateAlertStatus(alertId, newStatus, team);
      loadAlerts(); // Reload alerts
      loadDashboardData(); // Update dashboard stats
    } catch (error) {
      console.error('Failed to update alert status:', error);
    }
  };

  const handleTriggerCrisis = async (alertId: string) => {
    try {
      const result = await triggerCrisisProtocol('sentiment_crisis', 'high', alertId);
      console.log('Crisis protocol activated:', result);
      loadAlerts(); // Reload to show updated status
    } catch (error) {
      console.error('Failed to trigger crisis protocol:', error);
    }
  };

  const handleGenerateResponse = async (alertId: string, responseType: 'acknowledgment' | 'resolution' | 'escalation' | 'information') => {
    try {
      const response = await generateAutomatedResponse(alertId, responseType);
      console.log('Automated response generated:', response);
    } catch (error) {
      console.error('Failed to generate response:', error);
    }
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 0.6) return 'text-green-600 bg-green-100';
    if (sentiment >= 0.2) return 'text-yellow-600 bg-yellow-100';
    if (sentiment >= -0.2) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
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
        <h1 className="text-3xl font-bold text-gray-900">Predictive Sentiment & Crisis Management</h1>
        <p className="text-gray-600 mt-2">
          AI-powered sentiment analysis and proactive crisis management system
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Sentiment</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(dashboardData.overviewMetrics.overallSentiment * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {dashboardData.overviewMetrics.trendDirection}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <Progress value={dashboardData.overviewMetrics.overallSentiment * 100} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Mentions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.overviewMetrics.totalMentions.toLocaleString()}
                </p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Last 24 hours
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.overviewMetrics.activeAlerts}
                </p>
                <p className="text-sm text-orange-600 flex items-center mt-1">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Require attention
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.overviewMetrics.resolutionTime}h
                </p>
                <p className="text-sm text-purple-600 flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  Avg Resolution
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Distribution</CardTitle>
          <CardDescription>Real-time breakdown of sentiment across all channels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {(dashboardData.overviewMetrics.sentimentDistribution.positive * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Positive
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {(dashboardData.overviewMetrics.sentimentDistribution.neutral * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                Neutral
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {(dashboardData.overviewMetrics.sentimentDistribution.negative * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                Negative
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {(dashboardData.overviewMetrics.sentimentDistribution.mixed * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                Mixed
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Emerging Trends
          </TabsTrigger>
          <TabsTrigger value="topics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Topic Analysis
          </TabsTrigger>
          <TabsTrigger value="sources" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Data Sources
          </TabsTrigger>
          <TabsTrigger value="crisis" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Crisis Management
          </TabsTrigger>
        </TabsList>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sentiment Alerts</CardTitle>
                  <CardDescription>
                    Real-time sentiment alerts and anomaly detection
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
                            Impact: {alert.businessImpact.impactLevel}
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
                          {alert.assignedTeam && (
                            <span>Team: {alert.assignedTeam}</span>
                          )}
                          <span>Source: {alert.triggeringData.dataSource}</span>
                        </div>
                        
                        {alert.status === 'new' && (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateAlertStatus(alert.alertId, 'acknowledged', 'Customer Service')}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Acknowledge
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateAlertStatus(alert.alertId, 'investigating', 'Operations')}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Investigate
                            </Button>
                            {alert.severity === 'critical' && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleTriggerCrisis(alert.alertId)}
                              >
                                <Shield className="h-4 w-4 mr-1" />
                                Crisis Protocol
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {selectedAlert?.alertId === alert.alertId && (
                        <div className="border-t pt-4 mt-4 space-y-3">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Business Impact</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="bg-gray-50 p-3 rounded">
                                <div className="text-sm font-medium">Customer Satisfaction</div>
                                <div className="text-lg font-bold text-red-600">
                                  -{(alert.businessImpact.estimatedImpact.customerSatisfaction * 100).toFixed(1)}%
                                </div>
                              </div>
                              <div className="bg-gray-50 p-3 rounded">
                                <div className="text-sm font-medium">Reputation Risk</div>
                                <div className="text-lg font-bold text-orange-600">
                                  {(alert.businessImpact.estimatedImpact.reputationRisk * 100).toFixed(1)}%
                                </div>
                              </div>
                              <div className="bg-gray-50 p-3 rounded">
                                <div className="text-sm font-medium">Operational Impact</div>
                                <div className="text-lg font-bold text-yellow-600">
                                  {(alert.businessImpact.estimatedImpact.operationalImpact * 100).toFixed(1)}%
                                </div>
                              </div>
                              <div className="bg-gray-50 p-3 rounded">
                                <div className="text-sm font-medium">Financial Impact</div>
                                <div className="text-lg font-bold text-red-600">
                                  {(alert.businessImpact.estimatedImpact.financialImpact * 100).toFixed(1)}%
                                </div>
                              </div>
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

                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Generate Response</h4>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleGenerateResponse(alert.alertId, 'acknowledgment')}
                              >
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Acknowledgment
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleGenerateResponse(alert.alertId, 'information')}
                              >
                                <Bell className="h-4 w-4 mr-1" />
                                Information
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleGenerateResponse(alert.alertId, 'resolution')}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Resolution
                              </Button>
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

        {/* Emerging Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Emerging Trends Detection</CardTitle>
              <CardDescription>
                AI-powered detection of emerging topics and sentiment shifts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergingTrends.map((trend, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{trend.topic}</h3>
                        <Badge 
                          variant="outline" 
                          className={trend.urgency === 'high' ? 'border-red-500 text-red-700' : 'border-yellow-500 text-yellow-700'}
                        >
                          {trend.urgency.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          Growth: +{(trend.growthRate * 100).toFixed(0)}%
                        </span>
                        <div className={`px-2 py-1 rounded text-sm ${getSentimentColor(trend.sentiment)}`}>
                          Sentiment: {(trend.sentiment * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-600">Growth Rate</div>
                        <Progress value={trend.growthRate * 100} className="h-2" />
                        <div className="text-xs text-gray-500">+{(trend.growthRate * 100).toFixed(0)}% in 24h</div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-600">Sentiment Score</div>
                        <Progress 
                          value={Math.abs(trend.sentiment) * 100} 
                          className="h-2" 
                        />
                        <div className="text-xs text-gray-500">
                          {trend.sentiment > 0 ? 'Positive' : 'Negative'} sentiment
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-600">Data Sources</div>
                        <div className="flex flex-wrap gap-1">
                          {trend.affectedSources.map((source: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {source.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Topic Analysis Tab */}
        <TabsContent value="topics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Topic Sentiment Analysis</CardTitle>
              <CardDescription>
                Detailed sentiment analysis across different topics and categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboardData.topicInsights.map((topic, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">{topic.topic}</h3>
                      <Badge variant="outline" className={
                        topic.trend === 'increasing' ? 'border-green-500 text-green-700' :
                        topic.trend === 'decreasing' ? 'border-red-500 text-red-700' :
                        'border-gray-500 text-gray-700'
                      }>
                        {topic.trend === 'increasing' ? <TrendingUp className="h-3 w-3 mr-1" /> :
                         topic.trend === 'decreasing' ? <TrendingDown className="h-3 w-3 mr-1" /> :
                         <div className="h-3 w-3 mr-1 bg-gray-400 rounded-full" />}
                        {topic.trend}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Volume:</span>
                        <span className="font-medium">{topic.volume.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Sentiment:</span>
                        <span className={`font-medium ${
                          topic.sentiment > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {(topic.sentiment * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Impact:</span>
                        <Badge variant="outline" className={
                          topic.impact === 'high' ? 'border-red-500 text-red-700' :
                          topic.impact === 'medium' ? 'border-yellow-500 text-yellow-700' :
                          'border-green-500 text-green-700'
                        }>
                          {topic.impact}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm text-gray-600 mb-1">Keywords:</div>
                      <div className="flex flex-wrap gap-1">
                        {topic.keywords.map((keyword, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Sources Tab */}
        <TabsContent value="sources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Source Analytics</CardTitle>
              <CardDescription>
                Sentiment analysis breakdown by data source and channel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Source Performance</h3>
                  <div className="space-y-3">
                    {['Chat Logs', 'App Reviews', 'Social Media', 'Support Tickets', 'Surveys'].map((source, index) => {
                      const volume = [2847, 156, 892, 445, 234][index];
                      const sentiment = [0.68, 0.45, 0.72, 0.34, 0.81][index];
                      const trend = ['stable', 'declining', 'improving', 'declining', 'stable'][index];
                      
                      return (
                        <div key={source} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{source}</span>
                            <Badge variant="outline" className={
                              trend === 'improving' ? 'border-green-500 text-green-700' :
                              trend === 'declining' ? 'border-red-500 text-red-700' :
                              'border-gray-500 text-gray-700'
                            }>
                              {trend}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Volume:</span>
                              <span className="font-medium ml-2">{volume.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Sentiment:</span>
                              <span className={`font-medium ml-2 ${sentiment > 0.5 ? 'text-green-600' : 'text-red-600'}`}>
                                {(sentiment * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                          <Progress value={sentiment * 100} className="mt-2 h-2" />
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Data Quality Metrics</h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">Data Quality</span>
                      </div>
                      <div className="text-2xl font-bold text-green-900">
                        {(dashboardData.systemHealth.dataQuality * 100).toFixed(1)}%
                      </div>
                      <p className="text-sm text-green-700">All sources operational</p>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Processing Speed</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-900">
                        {dashboardData.systemHealth.processingLatency}ms
                      </div>
                      <p className="text-sm text-blue-700">Real-time processing</p>
                    </div>
                    
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-5 w-5 text-purple-600" />
                        <span className="font-medium text-purple-900">Model Accuracy</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-900">
                        {(dashboardData.systemHealth.modelPerformance[0]?.accuracy * 100).toFixed(1)}%
                      </div>
                      <p className="text-sm text-purple-700">Continuously improving</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Crisis Management Tab */}
        <TabsContent value="crisis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Crisis Management Center</CardTitle>
              <CardDescription>
                Proactive crisis detection and automated response protocols
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Crisis Detection Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">Normal Operations</span>
                      </div>
                      <Badge variant="outline" className="border-green-500 text-green-700">
                        All Clear
                      </Badge>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Active Monitoring</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Sentiment Threshold Monitoring</span>
                          <Badge variant="outline" className="border-green-500 text-green-700">Active</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Volume Spike Detection</span>
                          <Badge variant="outline" className="border-green-500 text-green-700">Active</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Topic Emergence Tracking</span>
                          <Badge variant="outline" className="border-green-500 text-green-700">Active</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Network Sentiment Analysis</span>
                          <Badge variant="outline" className="border-green-500 text-green-700">Active</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Response Protocols</h3>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Level 1: Monitoring</span>
                        <Badge variant="outline">0-30% Impact</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Automated monitoring and basic responses</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Level 2: Response</span>
                        <Badge variant="outline" className="border-yellow-500 text-yellow-700">30-60% Impact</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Team notification and coordinated response</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Level 3: Crisis</span>
                        <Badge variant="outline" className="border-red-500 text-red-700">60%+ Impact</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Full crisis protocol activation</p>
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
