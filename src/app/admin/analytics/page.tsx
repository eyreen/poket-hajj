"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminKpiCard } from "@/components/admin/charts/admin-kpi-card";
import { AdminDataTable } from "@/components/admin/tables/admin-data-table";
import { 
  BarChart3,
  TrendingUp,
  Brain,
  PieChart,
  AlertCircle,
  User
} from "lucide-react";

// Mock data
const analyticsOverview = {
  totalPilgrims: 1200000,
  activeApplications: 320000,
  completedJourneys: 880000,
  totalRevenue: 2450000000,
  anomalyAlerts: 3,
  totalDataPoints: 2450000,
  realTimeAlerts: 12,
  predictionAccuracy: 87.3,
  anomaliesDetected: 45,
  modelsRunning: 8,
  dataProcessingRate: 15600
};

const aiModels = [
  {
    id: "MODEL-001",
    name: "Queue Time Predictor",
    type: "Regression",
    accuracy: 89.2,
    lastTrained: "2025-01-10",
    status: "active",
    predictions: 45234,
    category: "Queue Management"
  },
  {
    id: "MODEL-002",
    name: "Financial Fraud Detector", 
    type: "Classification",
    accuracy: 94.7,
    lastTrained: "2025-01-12",
    status: "active",
    predictions: 156789,
    category: "Finance"
  },
  {
    id: "MODEL-003",
    name: "Package Recommendation Engine",
    type: "Collaborative Filtering",
    accuracy: 76.8,
    lastTrained: "2025-01-08",
    status: "retraining",
    predictions: 89234,
    category: "Recommendations"
  },
  {
    id: "MODEL-004",
    name: "Demand Forecasting",
    type: "Time Series",
    accuracy: 82.1,
    lastTrained: "2025-01-11",
    status: "active", 
    predictions: 23456,
    category: "Planning"
  },
  {
    id: "MODEL-005",
    name: "Churn Prediction",
    type: "Classification",
    accuracy: 78.9,
    lastTrained: "2025-01-09",
    status: "inactive",
    predictions: 67890,
    category: "Customer Insights"
  }
];

const insights = [
  {
    id: "INSIGHT-001",
    title: "Queue Processing Optimization",
    description: "AI suggests processing applications from Selangor state first to reduce average wait time by 2.3 months",
    impact: "high",
    confidence: 92,
    category: "Operations",
    actionRequired: true,
    estimatedSaving: "RM 1.2M",
    timestamp: "2025-01-15 09:30"
  },
  {
    id: "INSIGHT-002", 
    title: "Peak Demand Prediction",
    description: "Ramadan period expected to show 35% increase in package bookings based on historical patterns",
    impact: "medium",
    confidence: 85,
    category: "Revenue",
    actionRequired: false,
    estimatedSaving: "RM 2.1M",
    timestamp: "2025-01-14 14:22"
  },
  {
    id: "INSIGHT-003",
    title: "Pricing Strategy Recommendation",
    description: "Economy packages underpriced by 12% compared to market standards and customer willingness to pay",
    impact: "high",
    confidence: 88,
    category: "Finance",
    actionRequired: true,
    estimatedSaving: "RM 8.7M",
    timestamp: "2025-01-13 11:15"
  }
];

const anomalies = [
  {
    id: "ANOM-001",
    type: "Financial",
    description: "Unusual spike in premium package purchases from Johor region",
    severity: "medium",
    detectedAt: "2025-01-15 08:45",
    status: "investigating",
    affectedEntities: 156,
    confidence: 94.2
  },
  {
    id: "ANOM-002",
    type: "Behavioral", 
    description: "Multiple login attempts from same IP address for different user accounts",
    severity: "high",
    detectedAt: "2025-01-15 12:30",
    status: "resolved",
    affectedEntities: 8,
    confidence: 98.7
  },
  {
    id: "ANOM-003",
    type: "System",
    description: "API response time increased by 200% for package search endpoint",
    severity: "critical",
    detectedAt: "2025-01-15 10:15",
    status: "active",
    affectedEntities: 2341,
    confidence: 99.1
  }
];

export default function AdminAnalyticsPage() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const modelColumns = [
    {
      key: "name" as keyof typeof aiModels[0],
      header: "Model Name",
      sortable: true
    },
    {
      key: "type" as keyof typeof aiModels[0],
      header: "Type",
      sortable: true
    },
    {
      key: "category" as keyof typeof aiModels[0],
      header: "Category",
      render: (value: unknown) => {
        const category = value as string;
        const variants = {
          "Queue Management": "bg-blue-100 text-blue-800",
          "Finance": "bg-green-100 text-green-800",
          "Recommendations": "bg-purple-100 text-purple-800",
          "Planning": "bg-orange-100 text-orange-800",
          "Customer Insights": "bg-cyan-100 text-cyan-800"
        };
        return (
          <Badge className={variants[category as keyof typeof variants]}>
            {category}
          </Badge>
        );
      }
    },
    {
      key: "accuracy" as keyof typeof aiModels[0],
      header: "Accuracy (%)",
      render: (value: unknown) => `${value}%`
    },
    {
      key: "predictions" as keyof typeof aiModels[0],
      header: "Predictions",
      render: (value: unknown) => Number(value).toLocaleString()
    },
    {
      key: "status" as keyof typeof aiModels[0],
      header: "Status",
      render: (value: unknown) => {
        const status = value as string;
        const variants = {
          active: "bg-green-100 text-green-800",
          retraining: "bg-yellow-100 text-yellow-800", 
          inactive: "bg-gray-100 text-gray-800",
          error: "bg-red-100 text-red-800"
        };
        return (
          <Badge className={variants[status as keyof typeof variants]}>
            {status}
          </Badge>
        );
      }
    },
    {
      key: "lastTrained" as keyof typeof aiModels[0],
      header: "Last Trained",
      sortable: true
    }
  ];

  const insightColumns = [
    {
      key: "title" as keyof typeof insights[0],
      header: "Insight",
      sortable: true
    },
    {
      key: "category" as keyof typeof insights[0],
      header: "Category",
      render: (value: unknown) => {
        const category = value as string;
        const variants = {
          Operations: "bg-blue-100 text-blue-800",
          Revenue: "bg-green-100 text-green-800",
          Finance: "bg-purple-100 text-purple-800",
          Customer: "bg-orange-100 text-orange-800"
        };
        return (
          <Badge className={variants[category as keyof typeof variants]}>
            {category}
          </Badge>
        );
      }
    },
    {
      key: "impact" as keyof typeof insights[0],
      header: "Impact",
      render: (value: unknown) => {
        const impact = value as string;
        const variants = {
          high: "bg-red-100 text-red-800",
          medium: "bg-yellow-100 text-yellow-800",
          low: "bg-green-100 text-green-800"
        };
        return (
          <Badge className={variants[impact as keyof typeof variants]}>
            {impact}
          </Badge>
        );
      }
    },
    {
      key: "confidence" as keyof typeof insights[0],
      header: "Confidence (%)",
      render: (value: unknown) => `${value}%`
    },
    {
      key: "estimatedSaving" as keyof typeof insights[0],
      header: "Est. Saving",
      sortable: true
    },
    {
      key: "actionRequired" as keyof typeof insights[0],
      header: "Action Required",
      render: (value: unknown) => (
        <Badge className={value ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-800"}>
          {value ? "Yes" : "No"}
        </Badge>
      )
    }
  ];

  const anomalyColumns = [
    {
      key: "type" as keyof typeof anomalies[0],
      header: "Type",
      render: (value: unknown) => {
        const type = value as string;
        const variants = {
          Financial: "bg-green-100 text-green-800",
          Behavioral: "bg-blue-100 text-blue-800",
          System: "bg-red-100 text-red-800",
          Compliance: "bg-purple-100 text-purple-800"
        };
        return (
          <Badge className={variants[type as keyof typeof variants]}>
            {type}
          </Badge>
        );
      }
    },
    {
      key: "description" as keyof typeof anomalies[0],
      header: "Description",
      sortable: true
    },
    {
      key: "severity" as keyof typeof anomalies[0],
      header: "Severity",
      render: (value: unknown) => {
        const severity = value as string;
        const variants = {
          critical: "bg-red-100 text-red-800",
          high: "bg-orange-100 text-orange-800",
          medium: "bg-yellow-100 text-yellow-800",
          low: "bg-green-100 text-green-800"
        };
        return (
          <Badge className={variants[severity as keyof typeof variants]}>
            {severity}
          </Badge>
        );
      }
    },
    {
      key: "confidence" as keyof typeof anomalies[0],
      header: "Confidence (%)",
      render: (value: unknown) => `${value}%`
    },
    {
      key: "affectedEntities" as keyof typeof anomalies[0],
      header: "Affected",
      render: (value: unknown) => Number(value).toLocaleString()
    },
    {
      key: "status" as keyof typeof anomalies[0],
      header: "Status",
      render: (value: unknown) => {
        const status = value as string;
        const variants = {
          active: "bg-red-100 text-red-800",
          investigating: "bg-yellow-100 text-yellow-800",
          resolved: "bg-green-100 text-green-800"
        };
        return (
          <Badge className={variants[status as keyof typeof variants]}>
            {status}
          </Badge>
        );
      }
    }
  ];

  const modelActions = [
    {
      label: "View Details",
      onClick: (row: typeof aiModels[0]) => {
        console.log("View model:", row.id);
      }
    },
    {
      label: "Configure",
      onClick: (row: typeof aiModels[0]) => {
        console.log("Configure model:", row.id);
      }
    }
  ];

  const insightActions = [
    {
      label: "View Details",
      onClick: (row: typeof insights[0]) => {
        console.log("View insight:", row.id);
      }
    },
    {
      label: "Take Action", 
      onClick: (row: typeof insights[0]) => {
        console.log("Take action:", row.id);
      },
      variant: "default" as const
    }
  ];

  const anomalyActions = [
    {
      label: "Investigate",
      onClick: (row: typeof anomalies[0]) => {
        console.log("Investigate:", row.id);
      }
    }
  ];
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & AI Insights</h1>
          <p className="text-gray-600 mt-1">Advanced analytics, trends, and anomaly detection</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <AdminKpiCard
          title="Total Pilgrims"
          value={analyticsOverview.totalPilgrims.toLocaleString()}
          icon={<User className="h-5 w-5" />}
          status="normal"
        />
        <AdminKpiCard
          title="Active Applications"
          value={analyticsOverview.activeApplications.toLocaleString()}
          icon={<PieChart className="h-5 w-5" />}
          status="normal"
        />
        <AdminKpiCard
          title="Completed Journeys"
          value={analyticsOverview.completedJourneys.toLocaleString()}
          icon={<BarChart3 className="h-5 w-5" />}
          status="normal"
        />
        <AdminKpiCard
          title="Total Revenue"
          value={`RM ${(analyticsOverview.totalRevenue / 1000000).toFixed(1)}M`}
          icon={<TrendingUp className="h-5 w-5" />}
          status="normal"
        />
        <AdminKpiCard
          title="Anomaly Alerts"
          value={analyticsOverview.anomalyAlerts}
          icon={<AlertCircle className="h-5 w-5 text-orange-500" />}
          status={analyticsOverview.anomalyAlerts > 0 ? "warning" : "normal"}
        />
      </div>

      {/* Analytics Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Real-time Analytics */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Real-time System Health</CardTitle>
                <CardDescription>Live monitoring of AI systems and data processing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Data Processing Rate</span>
                      <span className="font-semibold text-green-600">{analyticsOverview.dataProcessingRate.toLocaleString()}/min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Model Uptime</span>
                      <span className="font-semibold text-green-600">99.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">API Response Time</span>
                      <span className="font-semibold">127ms</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Anomalies Today</span>
                      <span className="font-semibold text-orange-600">{analyticsOverview.anomaliesDetected}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">False Positives</span>
                      <span className="font-semibold">2.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Queue Processing</span>
                      <span className="font-semibold text-blue-600">Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Top AI Insights</CardTitle>
                <CardDescription>High-impact recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border border-red-200 rounded-lg p-3 bg-red-50">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-red-800">High Impact</span>
                  </div>
                  <p className="text-sm text-red-700 mt-1">
                    Pricing optimization could increase revenue by RM 8.7M
                  </p>
                </div>
                
                <div className="border border-orange-200 rounded-lg p-3 bg-orange-50">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-orange-800">Medium Impact</span>
                  </div>
                  <p className="text-sm text-orange-700 mt-1">
                    Queue optimization to reduce wait times by 2.3 months
                  </p>
                </div>

                <div className="border border-blue-200 rounded-lg p-3 bg-blue-50">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Prediction</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    35% increase in bookings expected during Ramadan
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <div className="grid lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Queue Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">89.2%</div>
                <p className="text-xs text-gray-600">Accuracy Rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Fraud Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">94.7%</div>
                <p className="text-xs text-gray-600">Detection Rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">76.8%</div>
                <p className="text-xs text-gray-600">Conversion Rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Demand Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">82.1%</div>
                <p className="text-xs text-gray-600">Forecast Accuracy</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Models Management</CardTitle>
              <CardDescription>Monitor and manage all AI/ML models in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminDataTable
                data={aiModels}
                columns={modelColumns}
                actions={modelActions}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Insights</CardTitle>
              <CardDescription>Actionable insights and recommendations from AI analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminDataTable
                data={insights}
                columns={insightColumns}
                actions={insightActions}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Anomaly Detection</CardTitle>
              <CardDescription>Review and manage detected anomalies</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminDataTable
                data={anomalies}
                columns={anomalyColumns}
                actions={anomalyActions}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>Predictive analytics and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <span>Demand forecast: <span className="font-semibold">+8.5% next year</span></span>
                </div>
                <div className="flex items-center space-x-3">
                  <Brain className="h-5 w-5 text-green-600" />
                  <span>Queue optimization: <span className="font-semibold">-12% average wait time</span></span>
                </div>
                <div className="flex items-center space-x-3">
                  <Brain className="h-5 w-5 text-orange-600" />
                  <span>Financial risk: <span className="font-semibold">Low</span></span>
                </div>
                <div className="flex items-center space-x-3">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <span>Package recommendation accuracy: <span className="font-semibold">92%</span></span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Anomalies</CardTitle>
              <CardDescription>AI-detected anomalies requiring review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  <span>Unusual payment pattern detected (TXN-002)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  <span>Compliance document mismatch (PID-009)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  <span>High queue churn rate (Region: Selangor)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
