'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  Activity,
  Cpu,
  BarChart3,
  Layers,
  Clock,
  Target
} from 'lucide-react';
import {
  getFraudDashboardData,
  trainFraudModel,
  getBehavioralBiometrics
} from '@/lib/fraud-detection-api';
import type { 
  FraudDashboardData, 
  ModelPerformance,
  RiskTrendData,
  FraudSystemHealth
} from '@/types/fraud-detection';

export default function FraudAIAnalytics() {
  const [dashboardData, setDashboardData] = useState<FraudDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [modelTraining, setModelTraining] = useState(false);

  useEffect(() => {
    loadAnalyticsData();
    const interval = setInterval(loadAnalyticsData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadAnalyticsData = async () => {
    try {
      const data = await getFraudDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleModelTraining = async (modelType: string) => {
    try {
      setModelTraining(true);
      const result = await trainFraudModel(modelType, []);
      console.log('Model training completed:', result);
      await loadAnalyticsData(); // Refresh data
    } catch (error) {
      console.error('Model training failed:', error);
    } finally {
      setModelTraining(false);
    }
  };

  if (loading || !dashboardData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const { systemHealth, riskTrends } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">AI Analytics & Performance</h2>
        <p className="text-gray-600 mt-1">
          Real-time AI model performance and fraud detection analytics
        </p>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Uptime</p>
                <p className="text-2xl font-bold text-gray-900">
                  {systemHealth.systemUptime}%
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Operational
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing Latency</p>
                <p className="text-2xl font-bold text-gray-900">
                  {systemHealth.processingLatency}ms
                </p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  Real-time
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alert Response</p>
                <p className="text-2xl font-bold text-gray-900">
                  {systemHealth.alertResponse}min
                </p>
                <p className="text-sm text-orange-600 flex items-center mt-1">
                  <Target className="h-4 w-4 mr-1" />
                  Target: &lt;2min
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Models</p>
                <p className="text-2xl font-bold text-gray-900">
                  {systemHealth.modelPerformance.length}
                </p>
                <p className="text-sm text-purple-600 flex items-center mt-1">
                  <Brain className="h-4 w-4 mr-1" />
                  All Healthy
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Model Performance */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>AI Model Performance</CardTitle>
              <CardDescription>
                Real-time performance metrics for all fraud detection models
              </CardDescription>
            </div>
            <Button 
              onClick={() => handleModelTraining('behavioral')}
              disabled={modelTraining}
              className="flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              {modelTraining ? 'Training...' : 'Retrain Models'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {systemHealth.modelPerformance.map((model, index) => (
              <div key={model.modelId} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    Model {index + 1}: {model.modelId}
                  </h3>
                  <Badge variant={model.accuracy > 0.95 ? 'default' : 'secondary'}>
                    {model.accuracy > 0.95 ? 'Excellent' : 'Good'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Accuracy</span>
                      <span className="font-medium">{(model.accuracy * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={model.accuracy * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Precision</span>
                      <span className="font-medium">{(model.precision * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={model.precision * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Recall</span>
                      <span className="font-medium">{(model.recall * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={model.recall * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">F1 Score</span>
                      <span className="font-medium">{(model.f1Score * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={model.f1Score * 100} className="h-2" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-600">False Positive Rate: </span>
                    <span className={`font-medium ${model.falsePositiveRate < 0.03 ? 'text-green-600' : 'text-orange-600'}`}>
                      {(model.falsePositiveRate * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Evaluation: </span>
                    <span className="font-medium">
                      {model.lastEvaluation.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Trends Analysis</CardTitle>
          <CardDescription>
            24-hour risk score and alert patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Simple trend visualization */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Average Risk Score</span>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {(riskTrends.reduce((sum, trend) => sum + trend.riskScore, 0) / riskTrends.length).toFixed(2)}
                </p>
                <p className="text-sm text-green-600">Stable trend</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Peak Alert Count</span>
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.max(...riskTrends.map(trend => trend.alertCount))}
                </p>
                <p className="text-sm text-blue-600">alerts/hour</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Transaction Volume</span>
                  <Activity className="h-4 w-4 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {riskTrends.reduce((sum, trend) => sum + trend.transactionVolume, 0).toLocaleString()}
                </p>
                <p className="text-sm text-purple-600">processed today</p>
              </div>
            </div>
            
            {/* Hourly breakdown */}
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Hourly Risk Distribution</h4>
              <div className="grid grid-cols-12 gap-1">
                {riskTrends.slice(0, 12).map((trend, index) => {
                  const hour = new Date(trend.timestamp).getHours();
                  const riskLevel = trend.riskScore;
                  const height = Math.max(20, riskLevel * 100);
                  
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className={`w-full rounded ${
                          riskLevel > 0.7 ? 'bg-red-500' :
                          riskLevel > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ height: `${height}px` }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-1">{hour}h</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Issues */}
      {systemHealth.issues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              System Issues
            </CardTitle>
            <CardDescription>
              Current system issues requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemHealth.issues.map((issue) => (
                <div key={issue.issueId} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        issue.severity === 'critical' ? 'destructive' :
                        issue.severity === 'high' ? 'destructive' :
                        issue.severity === 'medium' ? 'default' : 'secondary'
                      }>
                        {issue.severity.toUpperCase()}
                      </Badge>
                      <span className="font-medium">{issue.component}</span>
                    </div>
                    <Badge variant="outline" className={
                      issue.status === 'new' ? 'border-red-200 text-red-800' :
                      issue.status === 'investigating' ? 'border-yellow-200 text-yellow-800' :
                      'border-green-200 text-green-800'
                    }>
                      {issue.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-2">{issue.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Impact: {issue.impact}</span>
                    <span>Detected: {issue.timestamp.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Automation Status */}
      <Card>
        <CardHeader>
          <CardTitle>AI Automation Status</CardTitle>
          <CardDescription>
            Current status of automated fraud prevention systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Real-time Monitoring</span>
              </div>
              <p className="text-sm text-green-700">
                All transaction streams are being monitored in real-time
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Behavioral Analysis</span>
              </div>
              <p className="text-sm text-green-700">
                User behavior patterns are continuously analyzed
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Network Detection</span>
              </div>
              <p className="text-sm text-green-700">
                Coordinated fraud networks are actively detected
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Auto-blocking</span>
              </div>
              <p className="text-sm text-blue-700">
                High-risk transactions are automatically blocked
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Adaptive Learning</span>
              </div>
              <p className="text-sm text-blue-700">
                Models continuously improve from new data
              </p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-900">Multi-layer Defense</span>
              </div>
              <p className="text-sm text-purple-700">
                Multiple AI models provide layered protection
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
