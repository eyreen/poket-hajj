"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Clock, 
  Users,
  Shield,
  Phone,
  MessageSquare,
  Bell,
  CheckCircle,
  XCircle,
  Activity
} from "lucide-react";

export default function CrisisManagementPage() {
  const [selectedCrisis, setSelectedCrisis] = useState<string | null>(null);

  const crisisEvents = [
    {
      id: "1",
      title: "Mass Transportation Delays - Arafat to Mina",
      severity: "critical",
      status: "active",
      startTime: "2024-01-22T06:00:00Z",
      lastUpdate: "2024-01-22T14:30:00Z",
      affectedPilgrims: 2500,
      sentimentScore: -0.78,
      triggerEvents: [
        "Bus breakdown on main route",
        "Traffic congestion at checkpoint", 
        "Heat advisory issued"
      ],
      responseActions: [
        {
          action: "Alternative route activation",
          status: "completed",
          timestamp: "2024-01-22T06:15:00Z",
          assignee: "Transportation Team"
        },
        {
          action: "Emergency water distribution",
          status: "in-progress", 
          timestamp: "2024-01-22T07:00:00Z",
          assignee: "Field Operations"
        },
        {
          action: "SMS notifications to affected pilgrims",
          status: "completed",
          timestamp: "2024-01-22T06:30:00Z",
          assignee: "Communications Team"
        }
      ],
      escalationLevel: 3,
      expectedResolution: "2024-01-22T18:00:00Z"
    },
    {
      id: "2",
      title: "Hotel Service Quality Complaints - Makkah Sector",
      severity: "high",
      status: "monitoring",
      startTime: "2024-01-22T08:30:00Z", 
      lastUpdate: "2024-01-22T13:45:00Z",
      affectedPilgrims: 350,
      sentimentScore: -0.45,
      triggerEvents: [
        "Room cleaning service delays",
        "WiFi connectivity issues",
        "Front desk response time complaints"
      ],
      responseActions: [
        {
          action: "Hotel management meeting scheduled",
          status: "completed",
          timestamp: "2024-01-22T09:00:00Z",
          assignee: "Partnership Team"
        },
        {
          action: "On-site inspection initiated",
          status: "in-progress",
          timestamp: "2024-01-22T10:30:00Z", 
          assignee: "Quality Assurance"
        },
        {
          action: "Pilgrim support hotline activated",
          status: "completed",
          timestamp: "2024-01-22T09:15:00Z",
          assignee: "Customer Service"
        }
      ],
      escalationLevel: 2,
      expectedResolution: "2024-01-23T12:00:00Z"
    },
    {
      id: "3",
      title: "Mobile App Performance Issues",
      severity: "medium",
      status: "resolved",
      startTime: "2024-01-21T16:20:00Z",
      lastUpdate: "2024-01-22T08:00:00Z",
      affectedPilgrims: 150,
      sentimentScore: -0.32,
      triggerEvents: [
        "App loading delays reported",
        "Login authentication failures",
        "Offline mode not working"
      ],
      responseActions: [
        {
          action: "Emergency app update deployed",
          status: "completed", 
          timestamp: "2024-01-21T18:00:00Z",
          assignee: "Technical Team"
        },
        {
          action: "Server capacity increased",
          status: "completed",
          timestamp: "2024-01-21T19:30:00Z",
          assignee: "Infrastructure Team"
        },
        {
          action: "User communication via push notifications",
          status: "completed",
          timestamp: "2024-01-21T17:00:00Z",
          assignee: "Communications Team"
        }
      ],
      escalationLevel: 1,
      expectedResolution: "2024-01-22T08:00:00Z"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-red-100 text-red-800";
      case "monitoring": return "bg-yellow-100 text-yellow-800";
      case "resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getActionStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress": return <Activity className="h-4 w-4 text-blue-500" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Crisis Management</h1>
          <p className="text-gray-600 mt-1">
            Real-time crisis detection, response coordination, and resolution tracking
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Alert Settings
          </Button>
          <Button>
            <Shield className="h-4 w-4 mr-2" />
            Activate Protocol
          </Button>
        </div>
      </div>

      {/* Crisis Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Crises</p>
              <p className="text-2xl font-bold text-red-600">
                {crisisEvents.filter(c => c.status === "active").length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Under Monitoring</p>
              <p className="text-2xl font-bold text-yellow-600">
                {crisisEvents.filter(c => c.status === "monitoring").length}
              </p>
            </div>
            <Activity className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Affected Pilgrims</p>
              <p className="text-2xl font-bold text-purple-600">
                {crisisEvents.filter(c => c.status !== "resolved").reduce((sum, c) => sum + c.affectedPilgrims, 0)}
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-blue-600">12m</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
      </div>

      {/* Crisis Events List */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Crisis Events</h2>
          <div className="flex space-x-2">
            <Badge variant="outline">All Events</Badge>
            <Badge variant="outline">Filter by Status</Badge>
            <Badge variant="outline">Filter by Severity</Badge>
          </div>
        </div>

        <div className="space-y-4">
          {crisisEvents.map((crisis) => (
            <div
              key={crisis.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedCrisis === crisis.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedCrisis(selectedCrisis === crisis.id ? null : crisis.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className={`h-5 w-5 ${
                    crisis.severity === 'critical' ? 'text-red-500' :
                    crisis.severity === 'high' ? 'text-orange-500' : 'text-yellow-500'
                  }`} />
                  <div>
                    <h3 className="font-medium text-gray-900">{crisis.title}</h3>
                    <p className="text-sm text-gray-600">
                      Started: {new Date(crisis.startTime).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Affected</p>
                    <p className="text-lg font-bold text-purple-600">{crisis.affectedPilgrims}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Sentiment</p>
                    <p className="text-lg font-bold text-red-600">{crisis.sentimentScore.toFixed(2)}</p>
                  </div>

                  <Badge className={getSeverityColor(crisis.severity)}>
                    {crisis.severity.charAt(0).toUpperCase() + crisis.severity.slice(1)}
                  </Badge>

                  <Badge className={getStatusColor(crisis.status)}>
                    {crisis.status.charAt(0).toUpperCase() + crisis.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {selectedCrisis === crisis.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                  {/* Trigger Events */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Trigger Events</h4>
                    <ul className="space-y-1">
                      {crisis.triggerEvents.map((event, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {event}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Response Actions */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Response Actions</h4>
                    <div className="space-y-2">
                      {crisis.responseActions.map((action, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getActionStatusIcon(action.status)}
                            <div>
                              <p className="text-sm font-medium text-gray-900">{action.action}</p>
                              <p className="text-xs text-gray-600">
                                {action.assignee} • {new Date(action.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Badge variant={action.status === 'completed' ? 'default' : 'secondary'}>
                            {action.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Update Status
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Team
                    </Button>
                    <Button size="sm" variant="outline">
                      <Bell className="h-4 w-4 mr-2" />
                      Send Alert
                    </Button>
                    {crisis.status !== "resolved" && (
                      <Button size="sm" variant="outline">
                        <Shield className="h-4 w-4 mr-2" />
                        Escalate
                      </Button>
                    )}
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
