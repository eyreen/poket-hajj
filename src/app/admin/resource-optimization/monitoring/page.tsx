"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle, 
  Users,
  Plane,
  Building,
  Bus,
  BarChart3,
  Clock
} from "lucide-react";

export default function ResourceMonitoringPage() {
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d">("24h");

  const resources = [
    {
      id: "1",
      name: "Flight Seats",
      type: "transportation",
      totalCapacity: 2400,
      allocated: 1980,
      utilized: 1756,
      available: 420,
      utilizationRate: 88.7,
      trend: "up",
      trendValue: 5.2,
      status: "optimal",
      bottlenecks: ["Saturday departures fully booked"],
      optimization: "Consider adding mid-week flights",
      lastUpdated: "2024-01-22T11:30:00Z"
    },
    {
      id: "2", 
      name: "Hotel Rooms - Makkah",
      type: "accommodation",
      totalCapacity: 1800,
      allocated: 1650,
      utilized: 1534,
      available: 150,
      utilizationRate: 92.9,
      trend: "up",
      trendValue: 3.1,
      status: "high",
      bottlenecks: ["5-star hotels overbooked", "Limited rooms near Haram"],
      optimization: "Negotiate additional rooms with partner hotels",
      lastUpdated: "2024-01-22T11:25:00Z"
    },
    {
      id: "3",
      name: "Ground Transportation",
      type: "transportation", 
      totalCapacity: 45,
      allocated: 38,
      utilized: 31,
      available: 7,
      utilizationRate: 81.6,
      trend: "down",
      trendValue: -2.4,
      status: "warning",
      bottlenecks: ["Peak time conflicts", "Maintenance schedules"],
      optimization: "Stagger departure times, add backup vehicles",
      lastUpdated: "2024-01-22T11:20:00Z"
    },
    {
      id: "4",
      name: "Tour Guides",
      type: "personnel",
      totalCapacity: 85,
      allocated: 72,
      utilized: 68,
      available: 13,
      utilizationRate: 94.4,
      trend: "up",
      trendValue: 1.8,
      status: "optimal",
      bottlenecks: ["Language specialization gaps"],
      optimization: "Cross-train guides in multiple languages",
      lastUpdated: "2024-01-22T11:15:00Z"
    },
    {
      id: "5",
      name: "Visa Processing",
      type: "administrative",
      totalCapacity: 200,
      allocated: 156,
      utilized: 142,
      available: 44,
      utilizationRate: 91.0,
      trend: "stable",
      trendValue: 0.3,
      status: "optimal",
      bottlenecks: ["Document verification delays"],
      optimization: "Implement AI document pre-screening",
      lastUpdated: "2024-01-22T11:10:00Z"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal": return "bg-green-100 text-green-800";
      case "high": return "bg-blue-100 text-blue-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "transportation": return <Plane className="h-5 w-5 text-blue-500" />;
      case "accommodation": return <Building className="h-5 w-5 text-green-500" />;
      case "personnel": return <Users className="h-5 w-5 text-purple-500" />;
      case "administrative": return <Activity className="h-5 w-5 text-orange-500" />;
      default: return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down": return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "stable": return <Activity className="h-4 w-4 text-gray-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getUtilizationColor = (rate: number) => {
    if (rate >= 95) return "text-red-600";
    if (rate >= 85) return "text-blue-600";
    if (rate >= 70) return "text-green-600";
    return "text-yellow-600";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resource Monitoring</h1>
          <p className="text-gray-600 mt-1">
            Real-time tracking and optimization of all operational resources
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="flex border rounded-lg">
            {(["24h", "7d", "30d"] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-4 py-2 text-sm font-medium ${
                  timeframe === period
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          <Button>
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Resource Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Resources</p>
              <p className="text-2xl font-bold">{resources.length}</p>
            </div>
            <Activity className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Utilization</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(resources.reduce((sum, r) => sum + r.utilizationRate, 0) / resources.length)}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Bottlenecks</p>
              <p className="text-2xl font-bold text-yellow-600">
                {resources.reduce((sum, r) => sum + r.bottlenecks.length, 0)}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Utilization</p>
              <p className="text-2xl font-bold text-red-600">
                {resources.filter(r => r.utilizationRate >= 90).length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Resources List */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Resource Utilization</h2>
          <div className="flex space-x-2">
            <Badge variant="outline">All Resources</Badge>
            <Badge variant="outline">Filter by Type</Badge>
            <Badge variant="outline">Filter by Status</Badge>
          </div>
        </div>

        <div className="space-y-4">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedResource === resource.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedResource(selectedResource === resource.id ? null : resource.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getTypeIcon(resource.type)}
                  <div>
                    <h3 className="font-medium text-gray-900">{resource.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{resource.type}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Utilization</p>
                    <p className={`text-lg font-bold ${getUtilizationColor(resource.utilizationRate)}`}>
                      {resource.utilizationRate.toFixed(1)}%
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Available</p>
                    <p className="text-lg font-bold text-green-600">{resource.available}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Trend</p>
                    <div className="flex items-center justify-center space-x-1">
                      {getTrendIcon(resource.trend)}
                      <span className={`text-sm font-medium ${
                        resource.trend === "up" ? "text-green-600" : 
                        resource.trend === "down" ? "text-red-600" : "text-gray-600"
                      }`}>
                        {Math.abs(resource.trendValue)}%
                      </span>
                    </div>
                  </div>

                  <Badge className={getStatusColor(resource.status)}>
                    {resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {selectedResource === resource.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Capacity Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Capacity:</span>
                          <span>{resource.totalCapacity}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Allocated:</span>
                          <span>{resource.allocated}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Utilized:</span>
                          <span className="font-medium">{resource.utilized}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Available:</span>
                          <span className="text-green-600 font-medium">{resource.available}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Bottlenecks & Issues</h4>
                      <ul className="space-y-1">
                        {resource.bottlenecks.map((bottleneck, index) => (
                          <li key={index} className="text-sm text-red-700 flex items-start">
                            <AlertTriangle className="h-3 w-3 mt-1 mr-2 flex-shrink-0" />
                            {bottleneck}
                          </li>
                        ))}
                      </ul>
                      {resource.bottlenecks.length === 0 && (
                        <p className="text-sm text-green-600">No current bottlenecks</p>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Optimization</h4>
                      <p className="text-sm text-gray-700 mb-3">{resource.optimization}</p>
                      
                      <div className="space-y-2">
                        <Button size="sm" className="w-full">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Apply Optimization
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Analytics
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <Clock className="h-4 w-4 mr-2" />
                          Schedule Review
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
