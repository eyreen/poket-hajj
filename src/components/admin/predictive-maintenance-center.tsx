'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Settings, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Zap,
  Clock,
  DollarSign,
  Wrench,
  CheckCircle,
  XCircle,
  Calendar,
  Users,
  Package,
  BarChart3,
  RefreshCw,
  Eye,
  Edit,
  Plus,
  Filter,
  Download,
  Bell,
  Shield,
  Tool,
  Gauge,
  MapPin,
  Timer,
  Target
} from 'lucide-react';
import { predictiveMaintenanceApi } from '@/lib/predictive-maintenance-api';

interface SystemOverview {
  totalAssets: number;
  activeAlerts: number;
  scheduledMaintenance: number;
  overdueMaintenance: number;
  systemHealth: number;
  dailyPredictions: number;
  costSavings: number;
  uptime: number;
}

interface AssetSummary {
  id: string;
  name: string;
  type: string;
  zone: string;
  healthScore: number;
  status: 'operational' | 'degraded' | 'maintenance-required' | 'critical' | 'offline';
  lastMaintenance: Date;
  nextMaintenance: Date;
  activePredictions: number;
  criticalityLevel: string;
}

interface MaintenanceAlert {
  id: string;
  type: 'prediction' | 'threshold' | 'failure' | 'system';
  severity: 'info' | 'warning' | 'critical' | 'emergency';
  assetId: string;
  assetName: string;
  message: string;
  timestamp: Date;
  predictedFailureDate?: Date;
  estimatedCost: number;
  acknowledged: boolean;
  actionRequired: boolean;
}

interface KPIMetric {
  name: string;
  value: number;
  unit: string;
  target: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  icon: React.ElementType;
}

export default function PredictiveMaintenanceCenter() {
  const [overview, setOverview] = useState<SystemOverview>({
    totalAssets: 1247,
    activeAlerts: 28,
    scheduledMaintenance: 45,
    overdueMaintenance: 3,
    systemHealth: 94.2,
    dailyPredictions: 156,
    costSavings: 2450000,
    uptime: 99.7
  });

  const [assets, setAssets] = useState<AssetSummary[]>([
    {
      id: 'HVAC-001',
      name: 'Main HVAC System - Masjid',
      type: 'HVAC System',
      zone: 'Masjid al-Haram',
      healthScore: 87,
      status: 'operational',
      lastMaintenance: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      activePredictions: 2,
      criticalityLevel: 'critical'
    },
    {
      id: 'ELEV-012',
      name: 'Elevator Bank A - Level 1',
      type: 'Elevator',
      zone: 'Masjid al-Haram',
      healthScore: 72,
      status: 'degraded',
      lastMaintenance: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      nextMaintenance: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      activePredictions: 4,
      criticalityLevel: 'high'
    },
    {
      id: 'GEN-005',
      name: 'Emergency Generator 5',
      type: 'Generator',
      zone: 'Mina',
      healthScore: 91,
      status: 'operational',
      lastMaintenance: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      nextMaintenance: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      activePredictions: 1,
      criticalityLevel: 'medium'
    }
  ]);

  const [alerts, setAlerts] = useState<MaintenanceAlert[]>([
    {
      id: 'ALT-001',
      type: 'prediction',
      severity: 'warning',
      assetId: 'HVAC-001',
      assetName: 'Main HVAC System - Masjid',
      message: 'Compressor bearing degradation detected - predicted failure in 15 days',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      predictedFailureDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      estimatedCost: 45000,
      acknowledged: false,
      actionRequired: true
    },
    {
      id: 'ALT-002',
      type: 'threshold',
      severity: 'critical',
      assetId: 'ELEV-012',
      assetName: 'Elevator Bank A - Level 1',
      message: 'Motor temperature exceeding critical threshold (85°C)',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      estimatedCost: 15000,
      acknowledged: false,
      actionRequired: true
    },
    {
      id: 'ALT-003',
      type: 'system',
      severity: 'info',
      assetId: 'GEN-005',
      assetName: 'Emergency Generator 5',
      message: 'Scheduled maintenance reminder - oil change due',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      estimatedCost: 2500,
      acknowledged: true,
      actionRequired: false
    }
  ]);

  const [kpis, setKpis] = useState<KPIMetric[]>([
    {
      name: 'Overall Equipment Effectiveness',
      value: 87.3,
      unit: '%',
      target: 85,
      trend: 'up',
      change: 2.1,
      status: 'excellent',
      icon: Gauge
    },
    {
      name: 'Mean Time Between Failures',
      value: 2847,
      unit: 'hours',
      target: 2500,
      trend: 'up',
      change: 156,
      status: 'excellent',
      icon: Clock
    },
    {
      name: 'Mean Time To Repair',
      value: 4.2,
      unit: 'hours',
      target: 6,
      trend: 'down',
      change: -0.8,
      status: 'excellent',
      icon: Timer
    },
    {
      name: 'Planned Maintenance %',
      value: 78.5,
      unit: '%',
      target: 80,
      trend: 'up',
      change: 3.2,
      status: 'good',
      icon: Calendar
    },
    {
      name: 'Maintenance Cost Ratio',
      value: 3.2,
      unit: '%',
      target: 4,
      trend: 'down',
      change: -0.3,
      status: 'excellent',
      icon: DollarSign
    },
    {
      name: 'Prediction Accuracy',
      value: 92.8,
      unit: '%',
      target: 90,
      trend: 'up',
      change: 1.5,
      status: 'excellent',
      icon: Target
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const handleRefreshData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // In real implementation, fetch fresh data from API
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcknowledgeAlert = async (alertId: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'degraded': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance-required': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'emergency': return 'border-red-600 bg-red-50';
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-orange-500 bg-orange-50';
      case 'info': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getKPIStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') {
      return <TrendingUp className={`h-3 w-3 ${change > 0 ? 'text-green-500' : 'text-red-500'}`} />;
    } else if (trend === 'down') {
      return <TrendingDown className={`h-3 w-3 ${change < 0 ? 'text-green-500' : 'text-red-500'}`} />;
    }
    return <div className="h-3 w-3 bg-gray-400 rounded-full" />;
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const hours = Math.floor(diffInMinutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Predictive Maintenance Center</h1>
          <p className="text-gray-600 mt-2">
            AI-powered infrastructure monitoring and maintenance management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleRefreshData} disabled={isLoading} className="flex items-center gap-2">
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Settings className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.totalAssets.toLocaleString()}</div>
            <p className="text-xs text-gray-600">
              <Activity className="h-3 w-3 inline mr-1" />
              {((overview.totalAssets - overview.overdueMaintenance) / overview.totalAssets * 100).toFixed(1)}% operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.systemHealth}%</div>
            <Progress value={overview.systemHealth} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">Overall infrastructure health</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.activeAlerts}</div>
            <p className="text-xs text-gray-600">
              <AlertTriangle className="h-3 w-3 inline mr-1" />
              {alerts.filter(a => a.severity === 'critical').length} critical
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(overview.costSavings)}</div>
            <p className="text-xs text-gray-600">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +15.2% vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assets">Asset Health</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="work-orders">Work Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* KPI Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>Critical maintenance performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {kpis.map((kpi) => {
                    const IconComponent = kpi.icon;
                    return (
                      <div key={kpi.name} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${getKPIStatusColor(kpi.status)} bg-opacity-10`}>
                            <IconComponent className={`h-4 w-4 ${getKPIStatusColor(kpi.status)}`} />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{kpi.name}</div>
                            <div className="text-xs text-gray-600">Target: {kpi.target}{kpi.unit}</div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{kpi.value}{kpi.unit}</span>
                            {getTrendIcon(kpi.trend, kpi.change)}
                          </div>
                          <div className="text-xs text-gray-600">
                            {kpi.change > 0 ? '+' : ''}{kpi.change}{kpi.unit}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Latest maintenance alerts and predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.slice(0, 5).map((alert) => (
                    <Alert key={alert.id} className={`${getSeverityColor(alert.severity)} ${alert.acknowledged ? 'opacity-60' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {alert.type === 'prediction' && <Zap className="h-4 w-4 mt-0.5" />}
                          {alert.type === 'threshold' && <AlertTriangle className="h-4 w-4 mt-0.5" />}
                          {alert.type === 'failure' && <XCircle className="h-4 w-4 mt-0.5" />}
                          {alert.type === 'system' && <Settings className="h-4 w-4 mt-0.5" />}
                          
                          <div>
                            <AlertDescription className="font-medium text-sm">
                              {alert.message}
                            </AlertDescription>
                            <div className="text-xs text-gray-600 mt-1">
                              {alert.assetName} • {formatTimeAgo(alert.timestamp)}
                              {alert.estimatedCost > 0 && ` • Est. cost: ${formatCurrency(alert.estimatedCost)}`}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            alert.severity === 'emergency' || alert.severity === 'critical' ? 'destructive' :
                            alert.severity === 'warning' ? 'default' : 'secondary'
                          }>
                            {alert.severity}
                          </Badge>
                          
                          {!alert.acknowledged && alert.actionRequired && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleAcknowledgeAlert(alert.id)}
                            >
                              Acknowledge
                            </Button>
                          )}
                          
                          {alert.acknowledged && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </div>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Scheduled Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{overview.scheduledMaintenance}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {overview.overdueMaintenance} overdue
                </div>
                <div className="mt-3">
                  <div className="text-xs text-gray-600 mb-1">This week</div>
                  <Progress value={75} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">12 of 16 completed</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Daily Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">{overview.dailyPredictions}</div>
                <div className="text-sm text-gray-600 mt-1">
                  AI predictions generated
                </div>
                <div className="mt-3">
                  <div className="text-xs text-gray-600 mb-1">Accuracy rate</div>
                  <Progress value={92.8} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">92.8% accuracy</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">System Uptime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{overview.uptime}%</div>
                <div className="text-sm text-gray-600 mt-1">
                  Overall availability
                </div>
                <div className="mt-3">
                  <div className="text-xs text-gray-600 mb-1">Target: 99.5%</div>
                  <Progress value={overview.uptime} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">Above target</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Asset Health Monitoring</CardTitle>
              <CardDescription>Real-time health status of critical infrastructure assets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assets.map((asset) => (
                  <div key={asset.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                       onClick={() => setSelectedAsset(asset.id)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Settings className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{asset.name}</div>
                          <div className="text-sm text-gray-600">{asset.id} • {asset.type}</div>
                          <div className="text-xs text-gray-500">{asset.zone}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-sm font-medium">Health Score</div>
                          <div className="text-2xl font-bold text-blue-600">{asset.healthScore}%</div>
                          <Progress value={asset.healthScore} className="w-20 mt-1" />
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm font-medium">Status</div>
                          <Badge className={getStatusColor(asset.status)}>
                            {asset.status.replace('-', ' ')}
                          </Badge>
                          <div className="text-xs text-gray-600 mt-1">
                            {asset.activePredictions} predictions
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm font-medium">Next Maintenance</div>
                          <div className="text-sm text-gray-600">
                            {asset.nextMaintenance.toLocaleDateString()}
                          </div>
                          <Badge variant="outline" className="mt-1">
                            {asset.criticalityLevel}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-500" />
                          <span className="text-gray-600">
                            Last maintenance: {formatTimeAgo(asset.lastMaintenance)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-500" />
                          <span className="text-gray-600">{asset.zone}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Predictions</CardTitle>
                <CardDescription>AI-generated maintenance predictions and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.filter(alert => alert.type === 'prediction').map((prediction) => (
                    <div key={prediction.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Zap className="h-5 w-5 text-orange-500 mt-0.5" />
                          <div>
                            <div className="font-medium">{prediction.message}</div>
                            <div className="text-sm text-gray-600 mt-1">
                              Asset: {prediction.assetName}
                            </div>
                            {prediction.predictedFailureDate && (
                              <div className="text-xs text-orange-600 mt-1">
                                Predicted failure: {prediction.predictedFailureDate.toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge variant="destructive">
                          {prediction.severity}
                        </Badge>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-gray-600">Estimated cost: </span>
                          <span className="font-medium">{formatCurrency(prediction.estimatedCost)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            Schedule Maintenance
                          </Button>
                          <Button size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prediction Accuracy</CardTitle>
                <CardDescription>Model performance and accuracy metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Accuracy</span>
                    <div className="flex items-center gap-2">
                      <Progress value={92.8} className="w-20" />
                      <span className="font-bold">92.8%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">False Positive Rate</span>
                    <Badge variant="default">3.2%</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">True Positive Rate</span>
                    <Badge variant="default">89.6%</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Predictions Today</span>
                    <span className="font-bold">{overview.dailyPredictions}</span>
                  </div>

                  <div className="pt-4">
                    <div className="text-sm font-medium mb-2">Model Status</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">HVAC Failure Model</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs">Active</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Elevator Degradation Model</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs">Active</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Generator Health Model</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-xs">Training</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="work-orders" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Maintenance Work Orders</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Work Order
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">18</div>
                <div className="text-sm text-gray-600">Open Work Orders</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">7</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">45</div>
                <div className="text-sm text-gray-600">Completed This Week</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">3</div>
                <div className="text-sm text-gray-600">Overdue</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Work Orders</CardTitle>
              <CardDescription>Latest maintenance work orders and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">WO-2024-001: HVAC Compressor Maintenance</div>
                      <div className="text-sm text-gray-600">Asset: HVAC-001 • Priority: High</div>
                      <div className="text-xs text-gray-500">Scheduled: Tomorrow 9:00 AM</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-orange-100 text-orange-800">In Progress</Badge>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">WO-2024-002: Elevator Motor Inspection</div>
                      <div className="text-sm text-gray-600">Asset: ELEV-012 • Priority: Critical</div>
                      <div className="text-xs text-gray-500">Scheduled: Today 2:00 PM</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-100 text-red-800">Critical</Badge>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">WO-2024-003: Generator Oil Change</div>
                      <div className="text-sm text-gray-600">Asset: GEN-005 • Priority: Medium</div>
                      <div className="text-xs text-gray-500">Completed: 2 hours ago</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
                <CardDescription>Maintenance cost breakdown and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Preventive Maintenance</span>
                    <div className="flex items-center gap-2">
                      <Progress value={65} className="w-20" />
                      <span className="font-bold">65%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Corrective Maintenance</span>
                    <div className="flex items-center gap-2">
                      <Progress value={25} className="w-20" />
                      <span className="font-bold">25%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Emergency Repairs</span>
                    <div className="flex items-center gap-2">
                      <Progress value={10} className="w-20" />
                      <span className="font-bold">10%</span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="text-sm font-medium mb-2">Monthly Spending</div>
                    <div className="text-2xl font-bold">{formatCurrency(850000)}</div>
                    <div className="text-xs text-green-600">-12% vs last month</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Efficiency Metrics</CardTitle>
                <CardDescription>Operational efficiency and performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Equipment Effectiveness</span>
                    <Badge variant="default">87.3%</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">First Time Fix Rate</span>
                    <Badge variant="default">94.2%</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Schedule Compliance</span>
                    <Badge variant="default">91.8%</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Wrench Time</span>
                    <Badge variant="default">68.5%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Recommendations</CardTitle>
              <CardDescription>AI-powered recommendations to improve maintenance efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg border-green-200 bg-green-50">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-green-800">Optimize HVAC Maintenance Schedule</div>
                      <div className="text-sm text-green-700 mt-1">
                        Adjust maintenance frequency from monthly to 6-week intervals based on usage patterns.
                      </div>
                      <div className="text-xs text-green-600 mt-2">
                        Expected savings: {formatCurrency(125000)}/year • Impact: High
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Implement
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg border-blue-200 bg-blue-50">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-blue-800">Resource Allocation Optimization</div>
                      <div className="text-sm text-blue-700 mt-1">
                        Redistribute technician workload to balance capacity and reduce overtime costs.
                      </div>
                      <div className="text-xs text-blue-600 mt-2">
                        Expected savings: {formatCurrency(75000)}/year • Impact: Medium
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg border-purple-200 bg-purple-50">
                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-purple-800">Inventory Optimization</div>
                      <div className="text-sm text-purple-700 mt-1">
                        Implement predictive inventory management to reduce stock holding costs.
                      </div>
                      <div className="text-xs text-purple-600 mt-2">
                        Expected savings: {formatCurrency(95000)}/year • Impact: Medium
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Analyze
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Potential Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{formatCurrency(295000)}</div>
                <div className="text-sm text-gray-600 mt-1">
                  Annual optimization potential
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Efficiency Gain</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">23%</div>
                <div className="text-sm text-gray-600 mt-1">
                  Projected efficiency improvement
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">ROI Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">8</div>
                <div className="text-sm text-gray-600 mt-1">
                  Months to break-even
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
