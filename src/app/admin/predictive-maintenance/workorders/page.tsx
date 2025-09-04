"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Wrench, 
  Clock, 
  User,
  CheckCircle,
  AlertTriangle,
  Calendar,
  DollarSign,
  Activity,
  Settings
} from "lucide-react";

export default function WorkOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const workOrders = [
    {
      id: "WO-2024-001",
      assetName: "HVAC System - Mina Terminal 1",
      assetId: "HVAC-MT1-001",
      title: "Replace Air Filters and Check Refrigerant",
      description: "Preventive maintenance based on AI prediction for performance degradation",
      type: "preventive",
      priority: "medium",
      status: "scheduled",
      assignedTeam: "HVAC Team Alpha",
      leadTechnician: "Ahmad Rahman",
      scheduledDate: "2024-01-25T09:00:00Z",
      estimatedDuration: 4, // hours
      requiredParts: [
        { name: "Air Filter (HEPA)", quantity: 4, cost: 200 },
        { name: "Refrigerant R-410A", quantity: 2, cost: 150 }
      ],
      totalCost: 850,
      createdAt: "2024-01-22T10:30:00Z",
      createdBy: "AI Prediction System",
      safetyRequirements: ["PPE Required", "Lockout Procedure"]
    },
    {
      id: "WO-2024-002", 
      assetName: "Elevator Bank A - Jamarat Bridge",
      assetId: "ELV-JB-A01",
      title: "Emergency Cable Replacement",
      description: "Critical cable replacement due to imminent failure prediction",
      type: "emergency",
      priority: "critical",
      status: "in-progress",
      assignedTeam: "Elevator Emergency Team",
      leadTechnician: "Mohd Aziz",
      scheduledDate: "2024-01-23T06:00:00Z",
      estimatedDuration: 12,
      requiredParts: [
        { name: "Elevator Cable Assembly", quantity: 1, cost: 8500 },
        { name: "Cable Clamps", quantity: 6, cost: 180 },
        { name: "Safety Inspection Kit", quantity: 1, cost: 250 }
      ],
      totalCost: 15200,
      createdAt: "2024-01-22T08:15:00Z",
      createdBy: "Emergency Response System",
      safetyRequirements: ["Fall Protection", "Electrical Lockout", "Confined Space"]
    },
    {
      id: "WO-2024-003",
      assetName: "Water Pump System - Arafat Camp",
      assetId: "WP-AC-B02", 
      title: "Bearing Replacement and System Inspection",
      description: "Replace worn bearings identified by vibration analysis",
      type: "corrective",
      priority: "high",
      status: "pending-parts",
      assignedTeam: "Mechanical Team Beta",
      leadTechnician: "Ibrahim Salleh",
      scheduledDate: "2024-01-24T08:00:00Z",
      estimatedDuration: 8,
      requiredParts: [
        { name: "Pump Bearing Set", quantity: 2, cost: 1200 },
        { name: "Mechanical Seal", quantity: 1, cost: 450 },
        { name: "Coupling Assembly", quantity: 1, cost: 680 }
      ],
      totalCost: 8950,
      createdAt: "2024-01-22T06:45:00Z",
      createdBy: "Vibration Monitoring System",
      safetyRequirements: ["Confined Space Entry", "Hot Work Permit"]
    },
    {
      id: "WO-2024-004",
      assetName: "Generator Unit 3 - Emergency Power",
      assetId: "GEN-EP-003",
      title: "Routine Maintenance and Performance Check",
      description: "Scheduled preventive maintenance for optimal performance",
      type: "preventive",
      priority: "low",
      status: "created",
      assignedTeam: "Power Systems Team",
      leadTechnician: "Hassan Omar",
      scheduledDate: "2024-02-05T10:00:00Z",
      estimatedDuration: 6,
      requiredParts: [
        { name: "Engine Oil (15W-40)", quantity: 8, cost: 120 },
        { name: "Oil Filter", quantity: 2, cost: 45 },
        { name: "Air Filter", quantity: 1, cost: 35 }
      ],
      totalCost: 1350,
      createdAt: "2024-01-22T07:20:00Z",
      createdBy: "Preventive Maintenance Scheduler",
      safetyRequirements: ["PPE Required", "Fire Safety"]
    },
    {
      id: "WO-2024-005",
      assetName: "Security Camera Network - Haram",
      assetId: "CAM-HAR-NET",
      title: "Network Infrastructure Upgrade",
      description: "Replace aging network components affecting surveillance quality",
      type: "upgrade",
      priority: "medium",
      status: "on-hold",
      assignedTeam: "IT Infrastructure Team",
      leadTechnician: "Khalid Mahmud",
      scheduledDate: "2024-02-10T20:00:00Z",
      estimatedDuration: 10,
      requiredParts: [
        { name: "Network Switch (24-port)", quantity: 3, cost: 1500 },
        { name: "Fiber Optic Cables", quantity: 500, cost: 2000 },
        { name: "UPS Unit", quantity: 2, cost: 800 }
      ],
      totalCost: 4850,
      createdAt: "2024-01-22T09:10:00Z",
      createdBy: "Network Performance Monitor",
      safetyRequirements: ["Electrical Safety", "Height Safety"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "scheduled": return "bg-purple-100 text-purple-800";
      case "pending-parts": return "bg-yellow-100 text-yellow-800";
      case "on-hold": return "bg-gray-100 text-gray-800";
      case "created": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "emergency": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "corrective": return <Wrench className="h-4 w-4 text-orange-500" />;
      case "preventive": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "upgrade": return <Settings className="h-4 w-4 text-blue-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Work Order Management</h1>
          <p className="text-gray-600 mt-1">
            Manage and track maintenance work orders across all infrastructure assets
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule View
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Create Work Order
          </Button>
        </div>
      </div>

      {/* Work Order Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold">{workOrders.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {workOrders.filter(wo => wo.status === "in-progress").length}
              </p>
            </div>
            <Activity className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600">
                {workOrders.filter(wo => wo.priority === "critical").length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Parts</p>
              <p className="text-2xl font-bold text-yellow-600">
                {workOrders.filter(wo => wo.status === "pending-parts").length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Cost</p>
              <p className="text-2xl font-bold text-green-600">
                RM {workOrders.reduce((sum, wo) => sum + wo.totalCost, 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Work Orders List */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Active Work Orders</h2>
          <div className="flex space-x-2">
            <Badge variant="outline">All Orders</Badge>
            <Badge variant="outline">Filter by Status</Badge>
            <Badge variant="outline">Filter by Priority</Badge>
          </div>
        </div>

        <div className="space-y-4">
          {workOrders.map((order) => (
            <div
              key={order.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedOrder === order.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getTypeIcon(order.type)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{order.id}</h3>
                      <Badge className={getPriorityColor(order.priority)}>
                        {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-900 font-medium">{order.title}</p>
                    <p className="text-sm text-gray-600">{order.assetName}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Assigned To</p>
                    <p className="text-sm font-medium">{order.leadTechnician}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="text-sm font-medium">{order.estimatedDuration}h</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Cost</p>
                    <p className="text-sm font-medium">RM {order.totalCost.toLocaleString()}</p>
                  </div>

                  <Badge className={getStatusColor(order.status)}>
                    {order.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                </div>
              </div>

              {selectedOrder === order.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Work Details</h4>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">{order.description}</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Scheduled:</span>
                          <span>{new Date(order.scheduledDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Team:</span>
                          <span>{order.assignedTeam}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Type:</span>
                          <span className="capitalize">{order.type}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Required Parts</h4>
                      <div className="space-y-2">
                        {order.requiredParts.map((part, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-700">{part.name} (x{part.quantity})</span>
                            <span className="font-medium">RM {part.cost}</span>
                          </div>
                        ))}
                        <div className="pt-2 border-t">
                          <div className="flex justify-between text-sm font-medium">
                            <span>Parts Total:</span>
                            <span>RM {order.requiredParts.reduce((sum, p) => sum + p.cost, 0)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Safety & Actions</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Safety Requirements:</p>
                          <div className="space-y-1">
                            {order.safetyRequirements.map((req, index) => (
                              <div key={index} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">
                                {req}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Button size="sm" className="w-full">
                            <Wrench className="h-4 w-4 mr-2" />
                            Update Status
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            <User className="h-4 w-4 mr-2" />
                            Assign Team
                          </Button>
                        </div>
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
