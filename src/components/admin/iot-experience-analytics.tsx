'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MapPin, 
  Heart, 
  Navigation, 
  Clock, 
  Thermometer,
  Wind,
  Activity,
  AlertTriangle,
  CheckCircle,
  Smartphone,
  Users,
  TrendingUp,
  Eye,
  RefreshCw,
  Calendar,
  MessageSquare,
  Bell,
  Shield,
  Battery,
  Signal,
  Zap,
  Settings,
  Target,
  Award,
  Compass,
  Timer
} from 'lucide-react';
import PilgrimExperienceModal from './pilgrim-experience-modal';

interface PilgrimSummary {
  id: string;
  name: string;
  profileImage?: string;
  currentLocation: string;
  zone: string;
  healthStatus: 'excellent' | 'good' | 'fair' | 'concerning' | 'critical';
  deviceStatus: 'connected' | 'partial' | 'disconnected';
  lastUpdate: Date;
  activeAlerts: number;
  experienceScore: number;
  completedRituals: number;
  totalRituals: number;
  groupSize: number;
  groupPresent: number;
}

interface LocationInsight {
  zone: string;
  pilgrimCount: number;
  averageExperience: number;
  topConcerns: string[];
  recommendations: string[];
  crowdLevel: 'low' | 'medium' | 'high' | 'critical';
  weatherCondition: string;
  nextPrayerTime: string;
}

interface SystemInsight {
  category: 'performance' | 'engagement' | 'safety' | 'satisfaction';
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  description: string;
  impact: 'positive' | 'neutral' | 'negative';
}

export default function IoTExperienceAnalytics() {
  const [selectedPilgrim, setSelectedPilgrim] = useState<string | null>(null);
  const [pilgrims, setPilgrims] = useState<PilgrimSummary[]>([
    {
      id: 'P123456',
      name: 'Ahmad Abdullah',
      currentLocation: 'Masjid al-Haram, Level 1',
      zone: 'Makkah',
      healthStatus: 'good',
      deviceStatus: 'connected',
      lastUpdate: new Date(Date.now() - 2 * 60 * 1000),
      activeAlerts: 1,
      experienceScore: 87,
      completedRituals: 6,
      totalRituals: 10,
      groupSize: 8,
      groupPresent: 6
    },
    {
      id: 'P123457',
      name: 'Fatimah Hassan',
      currentLocation: 'Hotel Al-Safwah',
      zone: 'Makkah',
      healthStatus: 'excellent',
      deviceStatus: 'connected',
      lastUpdate: new Date(Date.now() - 5 * 60 * 1000),
      activeAlerts: 0,
      experienceScore: 94,
      completedRituals: 7,
      totalRituals: 10,
      groupSize: 6,
      groupPresent: 6
    },
    {
      id: 'P123458',
      name: 'Omar Al-Mansouri',
      currentLocation: 'Mina Camp Area',
      zone: 'Mina',
      healthStatus: 'concerning',
      deviceStatus: 'partial',
      lastUpdate: new Date(Date.now() - 15 * 60 * 1000),
      activeAlerts: 3,
      experienceScore: 72,
      completedRituals: 5,
      totalRituals: 10,
      groupSize: 4,
      groupPresent: 3
    }
  ]);

  const [locationInsights, setLocationInsights] = useState<LocationInsight[]>([
    {
      zone: 'Masjid al-Haram',
      pilgrimCount: 45000,
      averageExperience: 85,
      topConcerns: ['High crowd density', 'Long waiting times', 'Heat exhaustion'],
      recommendations: ['Avoid peak hours', 'Use alternative entrances', 'Increase hydration breaks'],
      crowdLevel: 'high',
      weatherCondition: 'Hot, 42°C',
      nextPrayerTime: 'Maghrib in 2h 15m'
    },
    {
      zone: 'Jamarat Bridge',
      pilgrimCount: 25000,
      averageExperience: 78,
      topConcerns: ['Crowd congestion', 'Anxiety levels', 'Physical fatigue'],
      recommendations: ['Schedule off-peak visits', 'Group coordination', 'Mental health support'],
      crowdLevel: 'critical',
      weatherCondition: 'Hot, 41°C',
      nextPrayerTime: 'Maghrib in 2h 15m'
    },
    {
      zone: 'Mina Camps',
      pilgrimCount: 120000,
      averageExperience: 89,
      topConcerns: ['Sleep quality', 'Meal satisfaction', 'Social connectivity'],
      recommendations: ['Optimize sleep schedules', 'Improve dining options', 'Enhance group activities'],
      crowdLevel: 'medium',
      weatherCondition: 'Warm, 38°C',
      nextPrayerTime: 'Maghrib in 2h 15m'
    }
  ]);

  const [systemInsights, setSystemInsights] = useState<SystemInsight[]>([
    {
      category: 'performance',
      metric: 'Real-time Response Rate',
      value: 98.5,
      trend: 'up',
      description: 'System responds to pilgrim requests within 150ms average',
      impact: 'positive'
    },
    {
      category: 'engagement',
      metric: 'Daily Active Users',
      value: 92.3,
      trend: 'up',
      description: 'Pilgrims actively using IoT features and recommendations',
      impact: 'positive'
    },
    {
      category: 'safety',
      metric: 'Emergency Response Time',
      value: 3.2,
      trend: 'down',
      description: 'Minutes to first responder arrival for critical alerts',
      impact: 'positive'
    },
    {
      category: 'satisfaction',
      metric: 'Experience Satisfaction',
      value: 87.6,
      trend: 'up',
      description: 'Overall pilgrim satisfaction with personalized experience',
      impact: 'positive'
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleRefreshData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Refresh all data
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'concerning': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDeviceStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600';
      case 'partial': return 'text-yellow-600';
      case 'disconnected': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down': return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
      case 'stable': return <div className="h-3 w-3 bg-gray-400 rounded-full" />;
      default: return null;
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
          <h1 className="text-3xl font-bold">IoT Experience Analytics</h1>
          <p className="text-gray-600 mt-2">
            Advanced analytics and insights for personalized pilgrim experiences
          </p>
        </div>
        <Button onClick={handleRefreshData} disabled={isLoading} className="flex items-center gap-2">
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Analytics
        </Button>
      </div>

      <Tabs defaultValue="pilgrims" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="pilgrims">Pilgrim Insights</TabsTrigger>
          <TabsTrigger value="locations">Location Analytics</TabsTrigger>
          <TabsTrigger value="system">System Performance</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="pilgrims" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pilgrim List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Active Pilgrims</CardTitle>
                  <CardDescription>Real-time monitoring of pilgrim experiences and status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pilgrims.map((pilgrim) => (
                      <div key={pilgrim.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                           onClick={() => setSelectedPilgrim(pilgrim.id)}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium">{pilgrim.name}</div>
                              <div className="text-sm text-gray-600">{pilgrim.id}</div>
                              <div className="text-xs text-gray-500">
                                {pilgrim.currentLocation} • {formatTimeAgo(pilgrim.lastUpdate)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-sm font-medium">Experience</div>
                              <div className="text-lg font-bold text-blue-600">{pilgrim.experienceScore}%</div>
                            </div>
                            
                            <div className="text-center">
                              <div className="text-sm font-medium">Rituals</div>
                              <div className="text-sm">{pilgrim.completedRituals}/{pilgrim.totalRituals}</div>
                              <Progress value={(pilgrim.completedRituals / pilgrim.totalRituals) * 100} className="w-16 mt-1" />
                            </div>
                            
                            <div className="flex flex-col gap-1">
                              <Badge className={getHealthStatusColor(pilgrim.healthStatus)}>
                                {pilgrim.healthStatus}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs">
                                <Smartphone className={`h-3 w-3 ${getDeviceStatusColor(pilgrim.deviceStatus)}`} />
                                <span className={getDeviceStatusColor(pilgrim.deviceStatus)}>
                                  {pilgrim.deviceStatus}
                                </span>
                              </div>
                              {pilgrim.activeAlerts > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {pilgrim.activeAlerts} alerts
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-gray-500" />
                              <span className="text-gray-600">{pilgrim.zone}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 text-gray-500" />
                              <span className="text-gray-600">
                                Group: {pilgrim.groupPresent}/{pilgrim.groupSize}
                              </span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Stats */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Experience Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average Experience Score</span>
                    <div className="flex items-center gap-2">
                      <Progress value={84} className="w-16" />
                      <span className="font-bold">84%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Active Devices</span>
                    <Badge variant="default">18,734</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Health Alerts</span>
                    <Badge variant="destructive">23</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Ritual Completion</span>
                    <Badge variant="default">76%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Send Group Notification
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Emergency Broadcast
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    System Configuration
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {locationInsights.map((location) => (
              <Card key={location.zone}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{location.zone}</CardTitle>
                    <Badge className={getCrowdLevelColor(location.crowdLevel)}>
                      {location.crowdLevel} crowd
                    </Badge>
                  </div>
                  <CardDescription>
                    {location.pilgrimCount.toLocaleString()} pilgrims • Avg experience: {location.averageExperience}%
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium mb-1">Weather</div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Thermometer className="h-4 w-4" />
                        {location.weatherCondition}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Next Prayer</div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        {location.nextPrayerTime}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-2">Top Concerns</div>
                    <div className="space-y-1">
                      {location.topConcerns.map((concern, index) => (
                        <div key={index} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">
                          {concern}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-2">AI Recommendations</div>
                    <div className="space-y-1">
                      {location.recommendations.map((rec, index) => (
                        <div key={index} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemInsights.map((insight) => (
              <Card key={insight.metric}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{insight.category}</CardTitle>
                    {getTrendIcon(insight.trend)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{insight.value}
                    {insight.category === 'performance' || insight.category === 'engagement' || insight.category === 'satisfaction' ? '%' : 
                     insight.category === 'safety' ? 'min' : ''}
                  </div>
                  <div className="text-sm font-medium text-gray-600 mt-1">{insight.metric}</div>
                  <div className="text-xs text-gray-500 mt-2">{insight.description}</div>
                  <Badge 
                    className={`mt-2 ${
                      insight.impact === 'positive' ? 'bg-green-100 text-green-800' :
                      insight.impact === 'negative' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {insight.impact}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Health Monitor</CardTitle>
              <CardDescription>Real-time system performance and operational metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="text-sm font-medium">Device Connectivity</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Smartwatches</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>98.5%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Smartphones</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>99.2%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>GPS Trackers</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>95.8%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-sm font-medium">Data Processing</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Location Updates</span>
                      <span>2.3M/hour</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Health Metrics</span>
                      <span>890K/hour</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Notifications Sent</span>
                      <span>45K/hour</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-sm font-medium">Alert Response</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Average Response</span>
                      <span>2.8 minutes</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Critical Alerts</span>
                      <span>45 seconds</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Success Rate</span>
                      <span>99.7%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Crowd Predictions</CardTitle>
                <CardDescription>AI-powered crowd density forecasting for next 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-orange-800">Jamarat Bridge</div>
                        <div className="text-sm text-orange-600">Expected peak at 2:00 PM</div>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">High Risk</Badge>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-yellow-800">Masjid al-Haram</div>
                        <div className="text-sm text-yellow-600">Moderate crowds during Maghrib</div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-green-800">Mina Camps</div>
                        <div className="text-sm text-green-600">Optimal conditions all day</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Predictions</CardTitle>
                <CardDescription>Predictive health insights and risk assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-medium text-red-800">Heat Exhaustion Risk</div>
                        <div className="text-sm text-red-600">145 pilgrims at high risk today</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Activity className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-blue-800">Fatigue Monitoring</div>
                        <div className="text-sm text-blue-600">23% showing signs of physical fatigue</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-medium text-purple-800">Stress Levels</div>
                        <div className="text-sm text-purple-600">Overall stress decreased by 12%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations Engine</CardTitle>
              <CardDescription>System-wide optimization suggestions based on real-time data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="h-5 w-5 text-blue-600" />
                    <div className="font-medium">Optimize Prayer Timings</div>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Adjust prayer recommendations based on individual schedules and crowd patterns
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Impact: High</Badge>
                    <Badge variant="outline">Effort: Low</Badge>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="h-5 w-5 text-green-600" />
                    <div className="font-medium">Enhance Group Coordination</div>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Implement smart group check-ins based on location and activity patterns
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Impact: Medium</Badge>
                    <Badge variant="outline">Effort: Medium</Badge>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Compass className="h-5 w-5 text-purple-600" />
                    <div className="font-medium">Dynamic Route Optimization</div>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Real-time route adjustments based on crowd density and weather conditions
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Impact: High</Badge>
                    <Badge variant="outline">Effort: High</Badge>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Timer className="h-5 w-5 text-orange-600" />
                    <div className="font-medium">Personalized Schedules</div>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    AI-generated daily schedules optimized for individual preferences and health
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Impact: High</Badge>
                    <Badge variant="outline">Effort: Medium</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
