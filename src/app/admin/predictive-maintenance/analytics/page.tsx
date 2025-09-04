"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Clock,
  DollarSign,
  Wrench,
  Zap,
  Target,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export default function AnalyticsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("last-30-days");

  const kpiMetrics = [
    {
      metric: "mtbf",
      name: "Mean Time Between Failures",
      value: 720, // hours
      target: 650,
      unit: "hours",
      trend: "improving",
      variance: 10.8,
      benchmark: 680,
      ranking: "excellent"
    },
    {
      metric: "mttr", 
      name: "Mean Time To Repair",
      value: 4.2,
      target: 6.0,
      unit: "hours",
      trend: "improving",
      variance: -30.0,
      benchmark: 5.5,
      ranking: "excellent"
    },
    {
      metric: "availability",
      name: "Asset Availability",
      value: 98.5,
      target: 95.0,
      unit: "%",
      trend: "stable",
      variance: 3.7,
      benchmark: 96.2,
      ranking: "excellent"
    },
    {
      metric: "oee",
      name: "Overall Equipment Effectiveness",
      value: 87.3,
      target: 85.0,
      unit: "%", 
      trend: "improving",
      variance: 2.7,
      benchmark: 82.5,
      ranking: "good"
    },
    {
      metric: "maintenance-cost-ratio",
      name: "Maintenance Cost Ratio",
      value: 3.2,
      target: 4.0,
      unit: "%",
      trend: "improving",
      variance: -20.0,
      benchmark: 4.5,
      ranking: "excellent"
    },
    {
      metric: "planned-maintenance-percentage",
      name: "Planned Maintenance %",
      value: 78.5,
      target: 75.0,
      unit: "%",
      trend: "improving",
      variance: 4.7,
      benchmark: 70.0,
      ranking: "good"
    },
    {
      metric: "prediction-accuracy",
      name: "AI Prediction Accuracy",
      value: 92.1,
      target: 85.0,
      unit: "%",
      trend: "improving",
      variance: 8.4,
      benchmark: 78.0,
      ranking: "excellent"
    },
    {
      metric: "safety-incidents",
      name: "Safety Incidents",
      value: 0,
      target: 0,
      unit: "incidents",
      trend: "stable",
      variance: 0,
      benchmark: 1.2,
      ranking: "excellent"
    }
  ];

  const performanceReports = [
    {
      assetId: "HVAC-MT1-001",
      assetName: "HVAC System - Mina Terminal 1",
      uptime: 98.2,
      downtime: 1.8,
      availability: 98.2,
      reliability: 94.5,
      efficiency: 92.1,
      maintenanceEvents: 3,
      totalCost: 2850,
      trend: "stable"
    },
    {
      assetId: "ELV-JB-A01", 
      assetName: "Elevator Bank A - Jamarat Bridge",
      uptime: 95.8,
      downtime: 4.2,
      availability: 95.8,
      reliability: 89.2,
      efficiency: 87.6,
      maintenanceEvents: 5,
      totalCost: 18500,
      trend: "declining"
    },
    {
      assetId: "WP-AC-B02",
      assetName: "Water Pump System - Arafat Camp",
      uptime: 96.5,
      downtime: 3.5,
      availability: 96.5,
      reliability: 91.8,
      efficiency: 89.3,
      maintenanceEvents: 4,
      totalCost: 12200,
      trend: "improving"
    },
    {
      assetId: "GEN-EP-003",
      assetName: "Generator Unit 3 - Emergency Power",
      uptime: 99.1,
      downtime: 0.9,
      availability: 99.1,
      reliability: 96.7,
      efficiency: 95.8,
      maintenanceEvents: 2,
      totalCost: 1800,
      trend: "stable"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "declining": return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "stable": return <Activity className="h-4 w-4 text-blue-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRankingColor = (ranking: string) => {
    switch (ranking) {
      case "excellent": return "text-green-600";
      case "good": return "text-blue-600";
      case "average": return "text-yellow-600";
      case "below-average": return "text-orange-600";
      case "poor": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return "text-green-600";
    if (variance < 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance Analytics</h1>
          <p className="text-gray-600 mt-1">
            Performance metrics, KPIs, and analytical insights for infrastructure maintenance
          </p>
        </div>
        <div className="flex space-x-3">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="last-7-days">Last 7 Days</option>
            <option value="last-30-days">Last 30 Days</option>
            <option value="last-90-days">Last 90 Days</option>
            <option value="last-year">Last Year</option>
          </select>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Target className="h-4 w-4 mr-2" />
            Set Targets
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiMetrics.slice(0, 4).map((kpi) => (
          <Card key={kpi.metric} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getTrendIcon(kpi.trend)}
                <span className={`text-xs font-medium ${getRankingColor(kpi.ranking)}`}>
                  {kpi.ranking.toUpperCase()}
                </span>
              </div>
              <Badge variant="outline" className="text-xs">
                vs Target: {kpi.variance > 0 ? '+' : ''}{kpi.variance.toFixed(1)}%
              </Badge>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">{kpi.name}</p>
              <p className="text-2xl font-bold text-gray-900">
                {kpi.value} <span className="text-sm text-gray-500">{kpi.unit}</span>
              </p>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                <span>Target: {kpi.target} {kpi.unit}</span>
                <span>Benchmark: {kpi.benchmark} {kpi.unit}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Detailed KPI Metrics */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Key Performance Indicators</h2>
          <div className="flex space-x-2">
            <Badge variant="outline">All Metrics</Badge>
            <Badge variant="outline">Critical Only</Badge>
            <Badge variant="outline">Benchmarking</Badge>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Metric</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900">Current</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900">Target</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900">Variance</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900">Benchmark</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900">Trend</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900">Ranking</th>
              </tr>
            </thead>
            <tbody>
              {kpiMetrics.map((kpi) => (
                <tr key={kpi.metric} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{kpi.name}</p>
                      <p className="text-sm text-gray-600">{kpi.metric.replace('-', ' ').toUpperCase()}</p>
                    </div>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="font-medium">{kpi.value} {kpi.unit}</span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="text-gray-600">{kpi.target} {kpi.unit}</span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className={`font-medium ${getVarianceColor(kpi.variance)}`}>
                      {kpi.variance > 0 ? '+' : ''}{kpi.variance.toFixed(1)}%
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="text-gray-600">{kpi.benchmark} {kpi.unit}</span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <div className="flex items-center justify-center">
                      {getTrendIcon(kpi.trend)}
                      <span className="ml-1 text-sm capitalize">{kpi.trend}</span>
                    </div>
                  </td>
                  <td className="text-center py-3 px-4">
                    <Badge className={`${getRankingColor(kpi.ranking)} bg-opacity-10`}>
                      {kpi.ranking.charAt(0).toUpperCase() + kpi.ranking.slice(1)}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Asset Performance Reports */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Asset Performance Reports</h2>
          <div className="flex space-x-2">
            <Badge variant="outline">All Assets</Badge>
            <Badge variant="outline">Critical Assets</Badge>
            <Badge variant="outline">Filter by Type</Badge>
          </div>
        </div>

        <div className="space-y-4">
          {performanceReports.map((report) => (
            <div
              key={report.assetId}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getTrendIcon(report.trend)}
                  <div>
                    <h3 className="font-medium text-gray-900">{report.assetName}</h3>
                    <p className="text-sm text-gray-600">{report.assetId}</p>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-6 text-center">
                  <div>
                    <p className="text-sm text-gray-600">Uptime</p>
                    <p className="text-lg font-bold text-green-600">{report.uptime}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Availability</p>
                    <p className="text-lg font-bold text-blue-600">{report.availability}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Reliability</p>
                    <p className="text-lg font-bold text-purple-600">{report.reliability}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Efficiency</p>
                    <p className="text-lg font-bold text-orange-600">{report.efficiency}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Events</p>
                    <p className="text-lg font-bold text-gray-600">{report.maintenanceEvents}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Cost</p>
                    <p className="text-lg font-bold text-red-600">RM {report.totalCost.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Cost Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Cost Analysis</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Maintenance Cost</span>
              <span className="text-lg font-bold">RM 35,350</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Preventive Cost</span>
              <span className="text-green-600 font-medium">RM 18,200 (51.5%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Corrective Cost</span>
              <span className="text-yellow-600 font-medium">RM 12,150 (34.4%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Emergency Cost</span>
              <span className="text-red-600 font-medium">RM 5,000 (14.1%)</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cost Per Hour</span>
                <span className="font-medium">RM 42.15</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">Cost Trend</span>
                <div className="flex items-center">
                  <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">Decreasing</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Predictive Model Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Overall Accuracy</span>
              <span className="text-lg font-bold text-green-600">92.1%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Precision</span>
              <span className="text-blue-600 font-medium">89.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Recall</span>
              <span className="text-purple-600 font-medium">94.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">F1 Score</span>
              <span className="text-orange-600 font-medium">91.8%</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">False Positive Rate</span>
                <span className="font-medium">3.2%</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">Model Status</span>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">Optimal</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
