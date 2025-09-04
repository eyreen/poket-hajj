'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  MapPin, 
  Heart, 
  Users, 
  Bell, 
  TrendingUp,
  Shield,
  Smartphone,
  Battery,
  Signal,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import PilgrimExperienceModal from './pilgrim-experience-modal';
import IoTExperienceAnalytics from './iot-experience-analytics';

interface IoTSystemStats {
  connectedPilgrims: number;
  activeDevices: number;
  totalSensors: number;
  dataPointsToday: number;
  systemHealth: number;
  responseTime: number;
  alertsActive: number;
  locationAccuracy: number;
}

interface DeviceHealth {
  deviceId: string;
  pilgrimId: string;
  type: string;
  batteryLevel: number;
  signalStrength: number;
  lastSync: Date;
  status: 'online' | 'offline' | 'low-battery' | 'no-signal';
  location?: string;
}

interface RealTimeAlert {
  id: string;
  type: 'health' | 'location' | 'device' | 'crowd' | 'emergency';
  pilgrimId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  location?: string;
  resolved: boolean;
}

interface LocationHeatmap {
  zone: string;
  pilgrimCount: number;
  capacity: number;
  utilization: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  alerts: number;
}

interface HealthMetrics {
  averageHeartRate: number;
  abnormalVitals: number;
  emergencyAlerts: number;
  medicationReminders: number;
  wellnessScore: number;
  activePilgrims: number;
}

export default function IoTExperienceCenter() {
  const [stats, setStats] = useState<IoTSystemStats>({
    connectedPilgrims: 12456,
    activeDevices: 18734,
    totalSensors: 45632,
    dataPointsToday: 2341567,
    systemHealth: 98.7,
    responseTime: 145,
    alertsActive: 23,
    locationAccuracy: 99.2
  });

  const [deviceHealth, setDeviceHealth] = useState<DeviceHealth[]>([
    {
      deviceId: 'SW001234',
      pilgrimId: 'P123456',
      type: 'Apple Watch',
      batteryLevel: 85,
      signalStrength: 92,
      lastSync: new Date(Date.now() - 2 * 60 * 1000),
      status: 'online',
      location: 'Masjid al-Haram'
    },
    {
      deviceId: 'FT005678',
      pilgrimId: 'P123457',
      type: 'Fitbit Sense',
      batteryLevel: 23,
      signalStrength: 78,
      lastSync: new Date(Date.now() - 5 * 60 * 1000),
      status: 'low-battery',
      location: 'Hotel Al-Safwah'
    },
    {
      deviceId: 'GP009876',
      pilgrimId: 'P123458',
      type: 'GPS Tracker',
      batteryLevel: 67,
      signalStrength: 45,
      lastSync: new Date(Date.now() - 15 * 60 * 1000),
      status: 'no-signal',
      location: 'Mina'
    }
  ]);

  const [alerts, setAlerts] = useState<RealTimeAlert[]>([
    {
      id: 'A001',
      type: 'health',
      pilgrimId: 'P123456',
      severity: 'high',
      message: 'Abnormal heart rate detected (125 BPM)',
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      location: 'Masjid al-Haram',
      resolved: false
    },
    {
      id: 'A002',
      type: 'crowd',
      pilgrimId: 'P123457',
      severity: 'medium',
      message: 'High crowd density at Jamarat Bridge',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      location: 'Jamarat',
      resolved: false
    },
    {
      id: 'A003',
      type: 'device',
      pilgrimId: 'P123458',
      severity: 'low',
      message: 'Device battery below 25%',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      location: 'Hotel Al-Safwah',
      resolved: true
    }
  ]);

  const [locationHeatmap, setLocationHeatmap] = useState<LocationHeatmap[]>([
    { zone: 'Masjid al-Haram', pilgrimCount: 45000, capacity: 50000, utilization: 90, trend: 'increasing', alerts: 3 },
    { zone: 'Jamarat Bridge', pilgrimCount: 25000, capacity: 30000, utilization: 83, trend: 'stable', alerts: 8 },
    { zone: 'Mina Camps', pilgrimCount: 120000, capacity: 150000, utilization: 80, trend: 'decreasing', alerts: 2 },
    { zone: 'Arafah', pilgrimCount: 8000, capacity: 200000, utilization: 4, trend: 'stable', alerts: 0 },
    { zone: 'Muzdalifah', pilgrimCount: 2000, capacity: 100000, utilization: 2, trend: 'stable', alerts: 0 }
  ]);

  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics>({
    averageHeartRate: 78,
    abnormalVitals: 145,
    emergencyAlerts: 3,
    medicationReminders: 234,
    wellnessScore: 87,
    activePilgrims: 12456
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedPilgrim, setSelectedPilgrim] = useState<string | null>(null);
  const handleRefreshData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate data updates
      setStats(prev => ({
        ...prev,
        dataPointsToday: prev.dataPointsToday + Math.floor(Math.random() * 1000),
        responseTime: 120 + Math.floor(Math.random() * 50)
      }));
      
      setDeviceHealth(prev => 
        prev.map(device => ({
          ...device,
          batteryLevel: Math.max(10, device.batteryLevel - Math.floor(Math.random() * 5)),
          lastSync: new Date()
        }))
      );
      
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewPilgrimDetails = (pilgrimId: string) => {
    setSelectedPilgrim(pilgrimId);
  };

  const handleResolveAlert = async (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, resolved: true } : alert
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'low-battery': return 'bg-yellow-500';
      case 'no-signal': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">IoT Experience Management</h1>
          <p className="text-gray-600 mt-2">
            Real-time monitoring and management of pilgrim IoT devices and experiences
          </p>
        </div>
        <Button onClick={handleRefreshData} disabled={isLoading} className="flex items-center gap-2">
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Pilgrims</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.connectedPilgrims.toLocaleString()}</div>
            <p className="text-xs text-gray-600">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +5.2% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
            <Smartphone className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeDevices.toLocaleString()}</div>
            <p className="text-xs text-gray-600">
              <Activity className="h-3 w-3 inline mr-1" />
              {((stats.activeDevices / stats.totalSensors) * 100).toFixed(1)}% active rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.systemHealth}%</div>
            <Progress value={stats.systemHealth} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">All systems operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.alertsActive}</div>
            <p className="text-xs text-gray-600">
              <AlertTriangle className="h-3 w-3 inline mr-1" />
              3 high priority
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">        <TabsList className="grid grid-cols-7 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="devices">Device Health</TabsTrigger>
          <TabsTrigger value="alerts">Real-Time Alerts</TabsTrigger>
          <TabsTrigger value="location">Location Tracking</TabsTrigger>
          <TabsTrigger value="health">Health Monitoring</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Real-time system metrics and performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Response Time</span>
                  <Badge variant={stats.responseTime < 200 ? "default" : "destructive"}>
                    {stats.responseTime}ms
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Location Accuracy</span>
                  <Badge variant="default">{stats.locationAccuracy}%</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Data Points Today</span>
                  <span className="text-sm font-bold">{stats.dataPointsToday.toLocaleString()}</span>
                </div>
                
                <div className="pt-4">
                  <div className="text-sm font-medium mb-2">Service Status</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Location Services</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs">Operational</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Health Monitoring</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs">Operational</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Notification System</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs">Degraded</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system events and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.slice(0, 5).map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'health' ? 'bg-red-500' :
                        alert.type === 'crowd' ? 'bg-orange-500' :
                        alert.type === 'device' ? 'bg-blue-500' :
                        'bg-gray-500'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-gray-600">
                          {alert.location} • {formatTimeAgo(alert.timestamp)}
                        </p>
                      </div>
                      {alert.resolved && (
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Device Health Status</CardTitle>
              <CardDescription>Monitor connected devices and their operational status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceHealth.map((device) => (
                  <div key={device.deviceId} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(device.status)}`}></div>
                      <div>
                        <div className="font-medium">{device.type}</div>
                        <div className="text-sm text-gray-600">
                          {device.deviceId} • Pilgrim {device.pilgrimId}
                        </div>
                        <div className="text-xs text-gray-500">{device.location}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-sm">
                          <Battery className="h-4 w-4" />
                          {device.batteryLevel}%
                        </div>
                        <Progress value={device.batteryLevel} className="w-16 mt-1" />
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-sm">
                          <Signal className="h-4 w-4" />
                          {device.signalStrength}%
                        </div>
                        <Progress value={device.signalStrength} className="w-16 mt-1" />
                      </div>
                        <div className="text-right">
                        <div className="text-sm font-medium capitalize">{device.status}</div>
                        <div className="text-xs text-gray-600">
                          {formatTimeAgo(device.lastSync)}
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="mt-1"
                          onClick={() => handleViewPilgrimDetails(device.pilgrimId)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Alerts</CardTitle>
              <CardDescription>Monitor and respond to system alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <Alert key={alert.id} className={`${getSeverityColor(alert.severity)} ${alert.resolved ? 'opacity-60' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {alert.type === 'health' && <Heart className="h-4 w-4 mt-0.5" />}
                        {alert.type === 'location' && <MapPin className="h-4 w-4 mt-0.5" />}
                        {alert.type === 'device' && <Smartphone className="h-4 w-4 mt-0.5" />}
                        {alert.type === 'crowd' && <Users className="h-4 w-4 mt-0.5" />}
                        {alert.type === 'emergency' && <AlertTriangle className="h-4 w-4 mt-0.5" />}
                        
                        <div>
                          <AlertDescription className="font-medium">
                            {alert.message}
                          </AlertDescription>
                          <div className="text-xs text-gray-600 mt-1">
                            Pilgrim ID: {alert.pilgrimId} • {alert.location} • {formatTimeAgo(alert.timestamp)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          alert.severity === 'critical' ? 'destructive' :
                          alert.severity === 'high' ? 'destructive' :
                          alert.severity === 'medium' ? 'default' : 'secondary'
                        }>
                          {alert.severity}
                        </Badge>
                        
                        {!alert.resolved && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleResolveAlert(alert.id)}
                          >
                            Resolve
                          </Button>
                        )}
                        
                        {alert.resolved && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Location Heatmap</CardTitle>
              <CardDescription>Real-time pilgrim distribution across Hajj zones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationHeatmap.map((zone) => (
                  <div key={zone.zone} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">{zone.zone}</div>
                          <div className="text-sm text-gray-600">
                            {zone.pilgrimCount.toLocaleString()} / {zone.capacity.toLocaleString()} pilgrims
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">{zone.utilization}%</div>
                          <div className={`text-xs ${
                            zone.trend === 'increasing' ? 'text-red-600' :
                            zone.trend === 'decreasing' ? 'text-green-600' :
                            'text-gray-600'
                          }`}>
                            {zone.trend}
                          </div>
                        </div>
                        
                        {zone.alerts > 0 && (
                          <Badge variant="destructive">{zone.alerts} alerts</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Progress value={zone.utilization} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Health Metrics Overview</CardTitle>
                <CardDescription>Aggregate health monitoring statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Average Heart Rate</span>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="font-bold">{healthMetrics.averageHeartRate} BPM</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Abnormal Vitals</span>
                  <Badge variant="destructive">{healthMetrics.abnormalVitals}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Emergency Alerts</span>
                  <Badge variant="destructive">{healthMetrics.emergencyAlerts}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Wellness Score</span>
                  <div className="flex items-center gap-2">
                    <Progress value={healthMetrics.wellnessScore} className="w-20" />
                    <span className="font-bold">{healthMetrics.wellnessScore}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Alerts</CardTitle>
                <CardDescription>Recent health-related notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.filter(alert => alert.type === 'health').map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border">
                      <Heart className="h-4 w-4 text-red-500 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-gray-600">
                          Pilgrim {alert.pilgrimId} • {formatTimeAgo(alert.timestamp)}
                        </p>
                      </div>
                      <Badge variant={alert.severity === 'high' ? 'destructive' : 'default'}>
                        {alert.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
                <CardDescription>IoT system usage patterns and trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Device Adoption Rate</span>
                  <div className="flex items-center gap-2">
                    <Progress value={87} className="w-20" />
                    <span className="font-bold">87%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Data Quality Score</span>
                  <div className="flex items-center gap-2">
                    <Progress value={94} className="w-20" />
                    <span className="font-bold">94%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">User Engagement</span>
                  <div className="flex items-center gap-2">
                    <Progress value={76} className="w-20" />
                    <span className="font-bold">76%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Metrics</CardTitle>
                <CardDescription>Technical performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">API Response Time</span>
                  <Badge variant="default">{stats.responseTime}ms</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Uptime</span>
                  <Badge variant="default">99.8%</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Error Rate</span>
                  <Badge variant="default">0.2%</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Data Processing</span>
                  <Badge variant="default">2.3M/day</Badge>
                </div>
              </CardContent>
            </Card>
          </div>        </TabsContent>        <TabsContent value="insights" className="space-y-6">
          <IoTExperienceAnalytics />
        </TabsContent>
      </Tabs>

      {/* Pilgrim Experience Modal */}
      {selectedPilgrim && (
        <PilgrimExperienceModal 
          pilgrimId={selectedPilgrim} 
          onClose={() => setSelectedPilgrim(null)} 
        />
      )}
    </div>
  );
}
