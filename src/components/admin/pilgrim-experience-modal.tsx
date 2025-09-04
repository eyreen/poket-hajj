'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  RefreshCw
} from 'lucide-react';

interface PersonalizedInsight {
  id: string;
  type: 'health' | 'spiritual' | 'logistics' | 'social' | 'safety';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  actionable: boolean;
  timestamp: Date;
}

interface RecommendationCard {
  id: string;
  category: 'ritual' | 'health' | 'navigation' | 'social' | 'safety';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  timeframe: string;
  progress: number;
  actions: string[];
}

interface ExperienceMetric {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  benchmark: number;
  icon: React.ElementType;
  color: string;
}

interface PilgrimExperienceProps {
  pilgrimId: string;
  onClose: () => void;
}

export default function PilgrimExperienceModal({ pilgrimId, onClose }: PilgrimExperienceProps) {
  const [insights, setInsights] = useState<PersonalizedInsight[]>([
    {
      id: 'I001',
      type: 'health',
      title: 'Hydration Alert',
      description: 'Your hydration levels are below optimal. Consider drinking more water, especially during peak hours.',
      priority: 'medium',
      actionable: true,
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: 'I002',
      type: 'spiritual',
      title: 'Optimal Tawaf Time',
      description: 'Based on crowd patterns, the best time for your next Tawaf is between 2-4 AM.',
      priority: 'low',
      actionable: true,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 'I003',
      type: 'logistics',
      title: 'Transport Optimization',
      description: 'There\'s a faster route to your hotel that avoids current traffic congestion.',
      priority: 'high',
      actionable: true,
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    }
  ]);

  const [recommendations, setRecommendations] = useState<RecommendationCard[]>([
    {
      id: 'R001',
      category: 'health',
      title: 'Optimize Sleep Schedule',
      description: 'Your sleep quality has decreased by 15%. Try sleeping 30 minutes earlier and avoid screens 1 hour before bed.',
      impact: 'high',
      timeframe: 'Next 3 days',
      progress: 20,
      actions: ['Set sleep reminder', 'Enable do-not-disturb mode', 'Track sleep patterns']
    },
    {
      id: 'R002',
      category: 'ritual',
      title: 'Personalized Ritual Guide',
      description: 'Based on your pace and preferences, we\'ve customized your Hajj ritual timeline.',
      impact: 'medium',
      timeframe: 'Ongoing',
      progress: 75,
      actions: ['Review updated timeline', 'Set ritual reminders', 'Share with group']
    },
    {
      id: 'R003',
      category: 'social',
      title: 'Group Coordination',
      description: 'Your group members would benefit from more frequent check-ins during crowded periods.',
      impact: 'medium',
      timeframe: 'Today',
      progress: 0,
      actions: ['Enable group tracking', 'Set check-in intervals', 'Share location']
    }
  ]);

  const [metrics, setMetrics] = useState<ExperienceMetric[]>([
    {
      label: 'Daily Steps',
      value: 12450,
      unit: 'steps',
      trend: 'up',
      benchmark: 10000,
      icon: Activity,
      color: 'text-blue-600'
    },
    {
      label: 'Heart Rate Avg',
      value: 78,
      unit: 'BPM',
      trend: 'stable',
      benchmark: 80,
      icon: Heart,
      color: 'text-red-600'
    },
    {
      label: 'Stress Level',
      value: 35,
      unit: '%',
      trend: 'down',
      benchmark: 40,
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      label: 'Sleep Quality',
      value: 82,
      unit: '%',
      trend: 'up',
      benchmark: 85,
      icon: Clock,
      color: 'text-purple-600'
    },
    {
      label: 'Hydration',
      value: 68,
      unit: '%',
      trend: 'down',
      benchmark: 80,
      icon: Thermometer,
      color: 'text-cyan-600'
    },
    {
      label: 'Social Engagement',
      value: 72,
      unit: 'score',
      trend: 'up',
      benchmark: 70,
      icon: Users,
      color: 'text-green-600'
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleRefreshData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Refresh insights and recommendations
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Pilgrim Experience Dashboard</h2>
              <p className="text-gray-600">Pilgrim ID: {pilgrimId}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefreshData}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" onClick={onClose}>Close</Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Experience Metrics */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {metrics.map((metric) => {
                const IconComponent = metric.icon;
                return (
                  <Card key={metric.label}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <IconComponent className={`h-4 w-4 ${metric.color}`} />
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="text-2xl font-bold">{metric.value.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">{metric.unit}</div>
                      <div className="mt-2">
                        <Progress 
                          value={(metric.value / metric.benchmark) * 100} 
                          className="h-1"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          vs {metric.benchmark} {metric.unit}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Personalized Insights */}
          <div>
            <h3 className="text-lg font-semibold mb-4">AI-Powered Insights</h3>
            <div className="space-y-3">
              {insights.map((insight) => (
                <Alert key={insight.id} className={getPriorityColor(insight.priority)}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {insight.type === 'health' && <Heart className="h-4 w-4 mt-0.5" />}
                      {insight.type === 'spiritual' && <MapPin className="h-4 w-4 mt-0.5" />}
                      {insight.type === 'logistics' && <Navigation className="h-4 w-4 mt-0.5" />}
                      {insight.type === 'social' && <Users className="h-4 w-4 mt-0.5" />}
                      {insight.type === 'safety' && <AlertTriangle className="h-4 w-4 mt-0.5" />}
                      
                      <div>
                        <div className="font-medium">{insight.title}</div>
                        <AlertDescription className="mt-1">
                          {insight.description}
                        </AlertDescription>
                        <div className="text-xs text-gray-600 mt-2">
                          {formatTimeAgo(insight.timestamp)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        insight.priority === 'high' ? 'destructive' :
                        insight.priority === 'medium' ? 'default' : 'secondary'
                      }>
                        {insight.priority}
                      </Badge>
                      
                      {insight.actionable && (
                        <Button size="sm" variant="outline">
                          Take Action
                        </Button>
                      )}
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </div>

          {/* Personalized Recommendations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Personalized Recommendations</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recommendations.map((rec) => (
                <Card key={rec.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{rec.title}</CardTitle>
                      <Badge className={getImpactColor(rec.impact)}>
                        {rec.impact} impact
                      </Badge>
                    </div>
                    <CardDescription>{rec.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{rec.progress}%</span>
                    </div>
                    <Progress value={rec.progress} />
                    
                    <div className="text-sm">
                      <div className="font-medium mb-2">Suggested Actions:</div>
                      <div className="space-y-1">
                        {rec.actions.map((action, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-600">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{rec.timeframe}</span>
                      <Button size="sm">
                        Start Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Current Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Current Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span>Masjid al-Haram, Level 1</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Last updated: 2 minutes ago
                </div>
                <div className="mt-3">
                  <div className="text-xs text-gray-600 mb-1">Crowd density</div>
                  <Progress value={75} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">High (75%)</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Device Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Apple Watch</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Connected</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>iPhone 14</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Connected</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Emergency Button</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Group Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Group Members</span>
                    <span className="font-medium">6/8 nearby</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Last Check-in</span>
                    <span className="text-gray-600">5 minutes ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Next Meeting</span>
                    <span className="text-blue-600">Maghrib at Hotel</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
