"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  TrendingUp, 
  Users, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  Calendar,
  MapPin
} from "lucide-react";

export default function AutoPackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const autoPackages = [
    {
      id: "1",
      name: "Dynamic Makkah Express",
      type: "auto-generated",
      status: "pending-approval",
      createdAt: "2024-01-22T10:30:00Z",
      capacity: 50,
      filled: 23,
      price: 12500,
      profit: 2340,
      profitMargin: 18.7,
      triggeredBy: "surplus-capacity",
      flightId: "SV-821",
      hotelId: "HTL-MKH-045",
      departureDate: "2024-02-15",
      duration: 14,
      aiConfidence: 0.89,
      demandScore: 92,
      recommendations: [
        "Increase marketing to East Malaysia",
        "Add premium meal option",
        "Target customers aged 45-65"
      ]
    },
    {
      id: "2",
      name: "Smart Madinah Combo",
      type: "demand-driven",
      status: "active",
      createdAt: "2024-01-20T14:15:00Z",
      capacity: 30,
      filled: 28,
      price: 9800,
      profit: 1680,
      profitMargin: 17.1,
      triggeredBy: "high-demand",
      flightId: "MH-502",
      hotelId: "HTL-MDN-023",
      departureDate: "2024-02-08",
      duration: 10,
      aiConfidence: 0.94,
      demandScore: 97,
      recommendations: [
        "Almost full - consider price increase",
        "Create waiting list",
        "Replicate for similar dates"
      ]
    },
    {
      id: "3",
      name: "Flexible Umrah Plus",
      type: "optimization",
      status: "draft",
      createdAt: "2024-01-22T08:45:00Z",
      capacity: 40,
      filled: 0,
      price: 8900,
      profit: 1425,
      profitMargin: 16.0,
      triggeredBy: "route-optimization",
      flightId: "QR-334",
      hotelId: "HTL-JED-078",
      departureDate: "2024-02-20",
      duration: 12,
      aiConfidence: 0.76,
      demandScore: 78,
      recommendations: [
        "Test market response",
        "Consider flexible booking terms",
        "Target price-sensitive segment"
      ]
    },
    {
      id: "4",
      name: "Premium Hajj Experience",
      type: "ai-optimized",
      status: "approved",
      createdAt: "2024-01-19T16:20:00Z",
      capacity: 25,
      filled: 25,
      price: 18500,
      profit: 4625,
      profitMargin: 25.0,
      triggeredBy: "premium-demand",
      flightId: "EY-403",
      hotelId: "HTL-MKH-012",
      departureDate: "2024-03-05",
      duration: 21,
      aiConfidence: 0.98,
      demandScore: 99,
      recommendations: [
        "Fully booked - success!",
        "Replicate model for next season",
        "Consider premium+ tier"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "approved": return "bg-blue-100 text-blue-800";
      case "pending-approval": return "bg-yellow-100 text-yellow-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Activity className="h-4 w-4 text-green-500" />;
      case "approved": return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "pending-approval": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "draft": return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTriggerIcon = (trigger: string) => {
    switch (trigger) {
      case "surplus-capacity": return <Package className="h-4 w-4 text-blue-500" />;
      case "high-demand": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "route-optimization": return <MapPin className="h-4 w-4 text-purple-500" />;
      case "premium-demand": return <DollarSign className="h-4 w-4 text-gold-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Auto-Generated Packages</h1>
          <p className="text-gray-600 mt-1">
            Dynamic package creation based on resource availability and demand patterns
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            Training Data
          </Button>
          <Button>
            <Package className="h-4 w-4 mr-2" />
            Generate New Package
          </Button>
        </div>
      </div>

      {/* Package Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Auto Packages</p>
              <p className="text-2xl font-bold">{autoPackages.length}</p>
            </div>
            <Package className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {autoPackages.filter(p => p.status === "active").length}
              </p>
            </div>
            <Activity className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Approval</p>
              <p className="text-2xl font-bold text-yellow-600">
                {autoPackages.filter(p => p.status === "pending-approval").length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Profit Margin</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(autoPackages.reduce((sum, p) => sum + p.profitMargin, 0) / autoPackages.length)}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
      </div>

      {/* Packages List */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Auto-Generated Packages</h2>
          <div className="flex space-x-2">
            <Badge variant="outline">All Packages</Badge>
            <Badge variant="outline">Filter by Status</Badge>
            <Badge variant="outline">Filter by Type</Badge>
          </div>
        </div>

        <div className="space-y-4">
          {autoPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedPackage === pkg.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedPackage(selectedPackage === pkg.id ? null : pkg.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getTriggerIcon(pkg.triggeredBy)}
                  <div>
                    <h3 className="font-medium text-gray-900">{pkg.name}</h3>
                    <p className="text-sm text-gray-600">
                      {pkg.duration} days • Departure: {new Date(pkg.departureDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Capacity</p>
                    <p className="text-lg font-bold">
                      {pkg.filled}/{pkg.capacity}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-lg font-bold text-green-600">
                      RM {pkg.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Profit Margin</p>
                    <p className="text-lg font-bold text-blue-600">
                      {pkg.profitMargin.toFixed(1)}%
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">AI Confidence</p>
                    <p className="text-lg font-bold text-purple-600">
                      {Math.round(pkg.aiConfidence * 100)}%
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {getStatusIcon(pkg.status)}
                    <Badge className={getStatusColor(pkg.status)}>
                      {pkg.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  </div>
                </div>
              </div>

              {selectedPackage === pkg.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Package Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Flight:</span>
                          <span>{pkg.flightId}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Hotel:</span>
                          <span>{pkg.hotelId}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Triggered By:</span>
                          <span className="capitalize">{pkg.triggeredBy.replace('-', ' ')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Demand Score:</span>
                          <span className="font-medium">{pkg.demandScore}/100</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Financial Analysis</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Package Price:</span>
                          <span>RM {pkg.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Expected Profit:</span>
                          <span className="text-green-600 font-medium">RM {pkg.profit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Profit Margin:</span>
                          <span className="text-blue-600 font-medium">{pkg.profitMargin.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Fill Rate:</span>
                          <span>{Math.round((pkg.filled / pkg.capacity) * 100)}%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">AI Recommendations</h4>
                      <ul className="space-y-1">
                        {pkg.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-3 space-y-2">
                        {pkg.status === "pending-approval" && (
                          <>
                            <Button size="sm" className="w-full">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve Package
                            </Button>
                            <Button size="sm" variant="outline" className="w-full">
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Request Changes
                            </Button>
                          </>
                        )}
                        {pkg.status === "draft" && (
                          <Button size="sm" className="w-full">
                            <Activity className="h-4 w-4 mr-2" />
                            Submit for Approval
                          </Button>
                        )}
                        {pkg.status === "active" && (
                          <Button size="sm" variant="outline" className="w-full">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            View Performance
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
      </Card>
    </div>
  );
}
