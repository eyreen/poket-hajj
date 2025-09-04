"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Wrench,
  BarChart3
} from "lucide-react";

export default function AssetHealthPage() {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const assets = [
    {
      id: "1",
      name: "HVAC System - Mina Terminal 1",
      type: "hvac-system",
      status: "healthy",
      healthScore: 85,
      lastMaintenance: "2024-01-15",
      nextScheduled: "2024-02-15",
      alerts: 0,
      efficiency: 92,
      temperature: 22.5,
      location: "Mina Terminal 1, Floor 2"
    },
    {
      id: "2", 
      name: "Elevator Bank A - Jamarat Bridge",
      type: "elevator",
      status: "warning",
      healthScore: 68,
      lastMaintenance: "2024-01-10",
      nextScheduled: "2024-01-30",
      alerts: 2,
      efficiency: 78,
      load: 85,
      location: "Jamarat Bridge, Level 1"
    },
    {
      id: "3",
      name: "Water Pump System - Arafat Camp",
      type: "water-pump", 
      status: "critical",
      healthScore: 45,
      lastMaintenance: "2023-12-20",
      nextScheduled: "2024-01-25",
      alerts: 4,
      efficiency: 65,
      pressure: 3.2,
      location: "Arafat Camp, Sector B"
    },
    {
      id: "4",
      name: "Generator Unit 3 - Emergency Power",
      type: "generator",
      status: "healthy",
      healthScore: 92,
      lastMaintenance: "2024-01-18", 
      nextScheduled: "2024-03-18",
      alerts: 0,
      efficiency: 96,
      fuel: 78,
      location: "Main Power Station"
    },
    {
      id: "5",
      name: "Security Camera Network - Haram",
      type: "security-camera",
      status: "warning",
      healthScore: 72,
      lastMaintenance: "2024-01-12",
      nextScheduled: "2024-02-10",
      alerts: 1,
      efficiency: 88,
      connectivity: 94,
      location: "Haram Perimeter"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning": return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "critical": return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-green-100 text-green-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Asset Health Monitoring</h1>
          <p className="text-gray-600 mt-1">
            Real-time health monitoring and predictive analysis of critical infrastructure
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button>
            <Wrench className="h-4 w-4 mr-2" />
            Schedule Maintenance
          </Button>
        </div>
      </div>

      {/* Asset Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Assets</p>
              <p className="text-2xl font-bold">{assets.length}</p>
            </div>
            <Activity className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Healthy</p>
              <p className="text-2xl font-bold text-green-600">
                {assets.filter(a => a.status === "healthy").length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Warning</p>
              <p className="text-2xl font-bold text-yellow-600">
                {assets.filter(a => a.status === "warning").length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600">
                {assets.filter(a => a.status === "critical").length}
              </p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Health</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(assets.reduce((sum, a) => sum + a.healthScore, 0) / assets.length)}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
      </div>

      {/* Assets List */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Infrastructure Assets</h2>
          <div className="flex space-x-2">
            <Badge variant="outline">All Assets</Badge>
            <Badge variant="outline">Filter by Type</Badge>
            <Badge variant="outline">Filter by Status</Badge>
          </div>
        </div>

        <div className="space-y-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedAsset === asset.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedAsset(selectedAsset === asset.id ? null : asset.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(asset.status)}
                  <div>
                    <h3 className="font-medium text-gray-900">{asset.name}</h3>
                    <p className="text-sm text-gray-600">{asset.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Health Score</p>
                    <p className={`text-lg font-bold ${getHealthScoreColor(asset.healthScore)}`}>
                      {asset.healthScore}%
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Efficiency</p>
                    <p className="text-lg font-bold text-blue-600">{asset.efficiency}%</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Alerts</p>
                    <p className={`text-lg font-bold ${asset.alerts > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {asset.alerts}
                    </p>
                  </div>

                  <Badge className={getStatusColor(asset.status)}>
                    {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {selectedAsset === asset.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Maintenance Schedule</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Last Maintenance:</span>
                          <span>{asset.lastMaintenance}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Next Scheduled:</span>
                          <span className="font-medium">{asset.nextScheduled}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Performance Metrics</h4>
                      <div className="space-y-2">
                        {asset.type === "hvac-system" && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Temperature:</span>
                            <span>{asset.temperature}°C</span>
                          </div>
                        )}
                        {asset.type === "water-pump" && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Pressure:</span>
                            <span>{asset.pressure} bar</span>
                          </div>
                        )}
                        {asset.type === "generator" && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Fuel Level:</span>
                            <span>{asset.fuel}%</span>
                          </div>
                        )}
                        {asset.type === "elevator" && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Load:</span>
                            <span>{asset.load}%</span>
                          </div>
                        )}
                        {asset.type === "security-camera" && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Connectivity:</span>
                            <span>{asset.connectivity}%</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button size="sm" variant="outline" className="w-full">
                          <Wrench className="h-4 w-4 mr-2" />
                          Schedule Maintenance
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Analytics
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
