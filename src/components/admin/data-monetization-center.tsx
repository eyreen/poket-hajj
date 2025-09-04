'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  BarChart3,
  Package,
  Globe,
  Shield,
  Activity,
  Eye,
  Download,
  Plus,
  CheckCircle,
  AlertTriangle,
  Clock,
  Target,
  Zap,
  Database,
  API,
  Key,
  FileText,
  Settings
} from 'lucide-react';
import { dataMonetizationApi } from '@/lib/data-monetization-api';

interface SystemOverview {
  totalRevenue: number;
  monthlyRevenue: number;
  activeSubscribers: number;
  dataProducts: number;
  apiCalls: number;
  growth: number;
  revenueGrowth: number;
  newSubscribers: number;
}

export default function DataMonetizationCenter() {
  const [overview, setOverview] = useState<SystemOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadOverviewData();
  }, []);

  const loadOverviewData = async () => {
    try {
      setLoading(true);
      // In a real app, this would fetch actual data
      const mockOverview: SystemOverview = {
        totalRevenue: 2450000,
        monthlyRevenue: 156000,
        activeSubscribers: 47,
        dataProducts: 12,
        apiCalls: 1250000,
        growth: 23.5,
        revenueGrowth: 18.7,
        newSubscribers: 8
      };
      setOverview(mockOverview);
    } catch (error) {
      console.error('Failed to load overview data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Data Monetization Platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">RM {overview?.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{overview?.revenueGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.activeSubscribers}</div>
            <p className="text-xs text-muted-foreground">
              +{overview?.newSubscribers} new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.dataProducts}</div>
            <p className="text-xs text-muted-foreground">
              3 new products launched
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.apiCalls.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{overview?.growth}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Data Products</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="insights">Market Insights</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Performance</CardTitle>
                <CardDescription>Monthly revenue growth and projections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="font-bold text-green-600">RM 156,000</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Target: RM 200,000</span>
                    <span>75% achieved</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Data Products</CardTitle>
                <CardDescription>Best performing products by revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Hotel Demand Insights", revenue: 45000, growth: 12.5 },
                    { name: "Pilgrim Behavior Analytics", revenue: 38000, growth: 8.3 },
                    { name: "Transport Optimization Data", revenue: 32000, growth: 15.7 }
                  ].map((product, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-600">+{product.growth}% growth</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">RM {product.revenue.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Platform Activity</CardTitle>
              <CardDescription>Latest updates and subscriber activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    action: "New subscriber approved",
                    details: "Saudi Hospitality Group - Premium plan",
                    time: "2 hours ago",
                    status: "success"
                  },
                  {
                    action: "Data product updated",
                    details: "Hotel Demand Insights - Added Q4 2024 data",
                    time: "4 hours ago",
                    status: "info"
                  },
                  {
                    action: "High API usage detected",
                    details: "Malaysian Tourism Board - 150% of monthly quota",
                    time: "6 hours ago",
                    status: "warning"
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-gray-600">{activity.details}</div>
                    </div>
                    <div className="text-sm text-gray-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Data Products</h2>
              <p className="text-gray-600">Manage and monitor your data product portfolio</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Product
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Hotel Demand Insights",
                category: "Hospitality",
                subscribers: 12,
                revenue: 45000,
                status: "active",
                apiCalls: 125000
              },
              {
                name: "Pilgrim Behavior Analytics",
                category: "Tourism",
                subscribers: 8,
                revenue: 38000,
                status: "active",
                apiCalls: 98000
              },
              {
                name: "Transport Optimization Data",
                category: "Logistics", 
                subscribers: 6,
                revenue: 32000,
                status: "active",
                apiCalls: 76000
              },
              {
                name: "Sentiment Analysis Trends",
                category: "Market Intelligence",
                subscribers: 4,
                revenue: 18000,
                status: "beta",
                apiCalls: 45000
              }
            ].map((product, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>{product.category}</CardDescription>
                    </div>
                    <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                      {product.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Subscribers</span>
                      <span className="font-medium">{product.subscribers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Monthly Revenue</span>
                      <span className="font-medium">RM {product.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">API Calls</span>
                      <span className="font-medium">{product.apiCalls.toLocaleString()}</span>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Subscribers</h2>
              <p className="text-gray-600">Manage subscriber access and permissions</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export List
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Subscriber
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">Organization</th>
                      <th className="text-left p-4">Plan</th>
                      <th className="text-left p-4">Products</th>
                      <th className="text-left p-4">Usage</th>
                      <th className="text-left p-4">Revenue</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Saudi Hospitality Group",
                        plan: "Premium",
                        products: 8,
                        usage: "125K / 150K",
                        revenue: 25000,
                        status: "active"
                      },
                      {
                        name: "Malaysian Tourism Board",
                        plan: "Enterprise",
                        products: 12,
                        usage: "98K / 100K",
                        revenue: 45000,
                        status: "active"
                      },
                      {
                        name: "Hajj Travel Solutions",
                        plan: "Standard",
                        products: 4,
                        usage: "34K / 50K",
                        revenue: 8000,
                        status: "active"
                      }
                    ].map((subscriber, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-4">
                          <div className="font-medium">{subscriber.name}</div>
                        </td>
                        <td className="p-4">
                          <Badge>{subscriber.plan}</Badge>
                        </td>
                        <td className="p-4">{subscriber.products}</td>
                        <td className="p-4">
                          <div className="text-sm">{subscriber.usage}</div>
                          <Progress value={80} className="h-1 w-20 mt-1" />
                        </td>
                        <td className="p-4">RM {subscriber.revenue.toLocaleString()}</td>
                        <td className="p-4">
                          <Badge variant="outline" className="text-green-600">
                            {subscriber.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Key className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Platform Analytics</h2>
            <p className="text-gray-600">Detailed insights into platform performance and usage</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>API Usage Trends</CardTitle>
                <CardDescription>Daily API call volume over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">API Usage Chart</p>
                  <p className="text-sm text-gray-500">Interactive chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Distribution</CardTitle>
                <CardDescription>Revenue breakdown by data product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { category: "Hospitality", percentage: 35, revenue: 54000 },
                    { category: "Tourism", percentage: 28, revenue: 43000 },
                    { category: "Logistics", percentage: 22, revenue: 34000 },
                    { category: "Market Intelligence", percentage: 15, revenue: 23000 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{item.category}</span>
                        <span className="text-sm text-gray-600">RM {item.revenue.toLocaleString()}</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Market Insights</h2>
            <p className="text-gray-600">AI-generated market intelligence and forecasting</p>
          </div>

          <Alert>
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              AI models have detected a 25% increase in demand for hotel booking data in the Saudi hospitality sector. 
              Consider creating targeted data products for this market.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Demand Forecasting</CardTitle>
                <CardDescription>Predicted demand for different data categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Real-time Location Data", trend: "increasing", confidence: 92 },
                    { category: "Sentiment Analytics", trend: "stable", confidence: 87 },
                    { category: "Predictive Maintenance", trend: "increasing", confidence: 89 },
                    { category: "Financial Analytics", trend: "decreasing", confidence: 76 }
                  ].map((forecast, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{forecast.category}</div>
                        <div className="text-sm text-gray-600">Confidence: {forecast.confidence}%</div>
                      </div>
                      <Badge variant={forecast.trend === 'increasing' ? 'default' : 
                                   forecast.trend === 'stable' ? 'secondary' : 'destructive'}>
                        {forecast.trend}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competitive Analysis</CardTitle>
                <CardDescription>Market positioning and opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">Market Leader</div>
                    <div className="text-sm text-gray-600">Hajj & Umrah Data Analytics</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Market Share</span>
                      <span className="font-medium">67%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Price Competitiveness</span>
                      <span className="font-medium text-green-600">Strong</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Data Quality</span>
                      <span className="font-medium text-green-600">Superior</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Compliance & Security</h2>
            <p className="text-gray-600">Data governance, privacy, and regulatory compliance</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">GDPR Compliance</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Anonymization</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Access Controls</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Audit Trails</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Accuracy Score</span>
                    <span className="font-medium">98.5%</span>
                  </div>
                  <Progress value={98.5} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-sm">Completeness</span>
                    <span className="font-medium">96.2%</span>
                  </div>
                  <Progress value={96.2} className="h-2" />
                  <div className="flex justify-between">
                    <span className="text-sm">Freshness</span>
                    <span className="font-medium">99.1%</span>
                  </div>
                  <Progress value={99.1} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Security</span>
                    <Shield className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Encryption</span>
                    <Shield className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rate Limiting</span>
                    <Shield className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monitoring</span>
                    <Activity className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Audit Events</CardTitle>
              <CardDescription>Security and compliance audit trail</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    event: "Data Export Request",
                    user: "Saudi Hospitality Group",
                    timestamp: "2024-01-22 14:30:00",
                    status: "approved"
                  },
                  {
                    event: "API Key Generated",
                    user: "Malaysian Tourism Board",
                    timestamp: "2024-01-22 12:15:00",
                    status: "completed"
                  },
                  {
                    event: "Compliance Scan",
                    user: "System",
                    timestamp: "2024-01-22 10:00:00",
                    status: "passed"
                  }
                ].map((event, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <div>
                      <div className="font-medium">{event.event}</div>
                      <div className="text-sm text-gray-600">{event.user} • {event.timestamp}</div>
                    </div>
                    <Badge variant={event.status === 'approved' || event.status === 'passed' ? 'default' : 'secondary'}>
                      {event.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
