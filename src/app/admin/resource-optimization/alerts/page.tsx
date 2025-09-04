"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  Bell,
  Zap
} from "lucide-react";

export default function OptimizationAlertsPage() {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "resolved">("all");

  const alerts = [
    {
      id: "1",
      title: "Flight Overbooking Risk - Weekend Departures",
      type: "capacity-warning",
      severity: "high",
      status: "active",
      createdAt: "2024-01-22T10:30:00Z",
      affectedResource: "Flight Seats",
      impact: "98% utilization on Saturday flights",
      recommendation: "Add additional flight or redistribute passengers",
      estimatedRevenueLoss: 25000,
      autoActions: ["Sent notifications to flexible passengers", "Created standby list"],
      manualActionRequired: true,
      resolvedAt: null
    },
    {
      id: "2",
      title: "Hotel Room Shortage - Makkah Premium",
      type: "availability-critical",
      severity: "critical",
      status: "active", 
      createdAt: "2024-01-22T09:15:00Z",
      affectedResource: "Hotel Rooms - Makkah",
      impact: "Zero premium rooms available for next 2 weeks",
      recommendation: "Negotiate emergency allocation with partner hotels",
      estimatedRevenueLoss: 45000,
      autoActions: ["Contacted hotel partners", "Prepared alternative options"],
      manualActionRequired: true,
      resolvedAt: null
    },
    {
      id: "3",
      title: "Transportation Efficiency Drop",
      type: "performance-degradation", 
      severity: "medium",
      status: "active",
      createdAt: "2024-01-22T08:45:00Z",
      affectedResource: "Ground Transportation",
      impact: "15% increase in travel time due to route inefficiencies",
      recommendation: "Optimize routes and adjust schedules",
      estimatedRevenueLoss: 8500,
      autoActions: ["Analyzed traffic patterns", "Generated optimal routes"],
      manualActionRequired: false,
      resolvedAt: null
    },
    {
      id: "4",
      title: "Guide Language Mismatch",
      type: "resource-mismatch",
      severity: "medium",
      status: "resolved",
      createdAt: "2024-01-21T16:20:00Z",
      affectedResource: "Tour Guides",
      impact: "3 groups without Mandarin-speaking guides",
      recommendation: "Reassign bilingual guides or provide interpreters",
      estimatedRevenueLoss: 3200,
      autoActions: ["Matched available guides", "Notified group leaders"],
      manualActionRequired: false,
      resolvedAt: "2024-01-22T11:30:00Z"
    },
    {
      id: "5",
      title: "Visa Processing Backlog",
      type: "workflow-bottleneck",
      severity: "high",
      status: "active",
      createdAt: "2024-01-21T14:10:00Z",
      affectedResource: "Visa Processing",
      impact: "127 applications pending beyond normal timeframe",
      recommendation: "Allocate additional processing staff",
      estimatedRevenueLoss: 15600,
      autoActions: ["Prioritized urgent applications", "Sent progress updates"],
      manualActionRequired: true,
      resolvedAt: null
    },
    {
      id: "6",
      title: "Dynamic Pricing Opportunity",
      type: "revenue-optimization",
      severity: "low",
      status: "resolved",
      createdAt: "2024-01-21T11:30:00Z",
      affectedResource: "Flight Seats",
      impact: "Demand spike detected for specific routes",
      recommendation: "Increase prices for high-demand flights",
      estimatedRevenueLoss: -12000, // Negative = potential gain
      autoActions: ["Applied dynamic pricing", "Updated package rates"],
      manualActionRequired: false,
      resolvedAt: "2024-01-21T15:45:00Z"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "resolved": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "dismissed": return <XCircle className="h-4 w-4 text-gray-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "capacity-warning": return <TrendingUp className="h-5 w-5 text-orange-500" />;
      case "availability-critical": return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "performance-degradation": return <TrendingDown className="h-5 w-5 text-yellow-500" />;
      case "resource-mismatch": return <Activity className="h-5 w-5 text-purple-500" />;
      case "workflow-bottleneck": return <Clock className="h-5 w-5 text-blue-500" />;
      case "revenue-optimization": return <Zap className="h-5 w-5 text-green-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => 
    filterStatus === "all" || alert.status === filterStatus
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Optimization Alerts</h1>
          <p className="text-gray-600 mt-1">
            Real-time alerts for resource optimization opportunities and issues
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Alert Settings
          </Button>
          <Button>
            <Activity className="h-4 w-4 mr-2" />
            Create Custom Alert
          </Button>
        </div>
      </div>

      {/* Alert Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Alerts</p>
              <p className="text-2xl font-bold">{alerts.length}</p>
            </div>
            <Bell className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-orange-600">
                {alerts.filter(a => a.status === "active").length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600">
                {alerts.filter(a => a.severity === "critical").length}
              </p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Potential Loss</p>
              <p className="text-2xl font-bold text-red-600">
                RM {alerts
                  .filter(a => a.status === "active" && a.estimatedRevenueLoss > 0)
                  .reduce((sum, a) => sum + a.estimatedRevenueLoss, 0)
                  .toLocaleString()}
              </p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Alert Filters */}
      <Card className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {(["all", "active", "resolved"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === status
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({
                  status === "all" 
                    ? alerts.length 
                    : alerts.filter(a => a.status === status).length
                })
              </button>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Badge variant="outline">All Types</Badge>
            <Badge variant="outline">All Severities</Badge>
          </div>
        </div>
      </Card>

      {/* Alerts List */}
      <Card className="p-6">
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedAlert === alert.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getTypeIcon(alert.type)}
                  <div>
                    <h3 className="font-medium text-gray-900">{alert.title}</h3>
                    <p className="text-sm text-gray-600">{alert.affectedResource}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Impact</p>
                    <p className="text-sm font-medium">{alert.impact}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Potential Loss</p>
                    <p className={`text-lg font-bold ${
                      alert.estimatedRevenueLoss > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {alert.estimatedRevenueLoss > 0 ? '+' : ''}RM {Math.abs(alert.estimatedRevenueLoss).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="text-sm">{new Date(alert.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {getStatusIcon(alert.status)}
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              {selectedAlert === alert.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Recommendation</h4>
                      <p className="text-sm text-gray-700 mb-3">{alert.recommendation}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Manual Action Required:</span>
                          <span className={alert.manualActionRequired ? 'text-red-600' : 'text-green-600'}>
                            {alert.manualActionRequired ? 'Yes' : 'No'}
                          </span>
                        </div>
                        {alert.resolvedAt && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Resolved:</span>
                            <span className="text-green-600">
                              {new Date(alert.resolvedAt).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Auto Actions Taken</h4>
                      <ul className="space-y-1">
                        {alert.autoActions.map((action, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <CheckCircle className="h-3 w-3 mt-1 mr-2 text-green-500 flex-shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Actions</h4>
                      <div className="space-y-2">
                        {alert.status === "active" && (
                          <>
                            <Button size="sm" className="w-full">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark as Resolved
                            </Button>
                            <Button size="sm" variant="outline" className="w-full">
                              <Activity className="h-4 w-4 mr-2" />
                              Take Action
                            </Button>
                            <Button size="sm" variant="outline" className="w-full">
                              <Bell className="h-4 w-4 mr-2" />
                              Escalate
                            </Button>
                          </>
                        )}
                        {alert.status === "resolved" && (
                          <Button size="sm" variant="outline" className="w-full">
                            <Activity className="h-4 w-4 mr-2" />
                            View Resolution Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-600">
              {filterStatus === "all" 
                ? "No optimization alerts at this time."
                : `No ${filterStatus} alerts found.`
              }
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
