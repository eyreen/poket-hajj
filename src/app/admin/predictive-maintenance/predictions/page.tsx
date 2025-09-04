"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  Wrench,
  Calendar,
  Activity,
  ArrowUp,
  ArrowDown,
  Zap
} from "lucide-react";

export default function PredictionsPage() {
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);

  const predictions = [
    {
      id: "1",
      assetName: "HVAC System - Mina Terminal 1",
      assetId: "HVAC-MT1-001",
      predictionType: "performance-degradation",
      severity: "medium",
      probability: 0.78,
      confidence: 0.92,
      timeframe: "7-14 days",
      urgency: "within-week",
      description: "Performance degradation detected in cooling efficiency",
      impact: "15% reduction in cooling capacity expected",
      recommendations: [
        "Schedule filter replacement",
        "Check refrigerant levels",
        "Inspect ductwork for blockages"
      ],
      estimatedCost: 2500,
      preventiveMaintenance: true,
      generatedAt: "2024-01-22T10:30:00Z"
    },
    {
      id: "2",
      assetName: "Elevator Bank A - Jamarat Bridge", 
      assetId: "ELV-JB-A01",
      predictionType: "failure-imminent",
      severity: "high",
      probability: 0.85,
      confidence: 0.89,
      timeframe: "2-5 days",
      urgency: "immediate",
      description: "Cable wear pattern indicates potential failure",
      impact: "Complete elevator shutdown risk",
      recommendations: [
        "Immediate cable inspection",
        "Replace worn cables",
        "Emergency evacuation plan activation"
      ],
      estimatedCost: 15000,
      preventiveMaintenance: false,
      generatedAt: "2024-01-22T08:15:00Z"
    },
    {
      id: "3",
      assetName: "Water Pump System - Arafat Camp",
      assetId: "WP-AC-B02",
      predictionType: "component-wear",
      severity: "high",
      probability: 0.91,
      confidence: 0.95,
      timeframe: "1-3 days",
      urgency: "immediate",
      description: "Bearing wear exceeding critical threshold",
      impact: "Complete water supply interruption to Sector B",
      recommendations: [
        "Replace pump bearings immediately",
        "Activate backup water supply",
        "Notify camp management"
      ],
      estimatedCost: 8500,
      preventiveMaintenance: false,
      generatedAt: "2024-01-22T06:45:00Z"
    },
    {
      id: "4",
      assetName: "Generator Unit 3 - Emergency Power",
      assetId: "GEN-EP-003",
      predictionType: "maintenance-due",
      severity: "low",
      probability: 0.65,
      confidence: 0.88,
      timeframe: "14-21 days",
      urgency: "planned",
      description: "Scheduled maintenance approaching optimal window",
      impact: "No immediate impact, preventive action recommended",
      recommendations: [
        "Schedule routine maintenance",
        "Oil change and filter replacement",
        "Test emergency startup procedures"
      ],
      estimatedCost: 1200,
      preventiveMaintenance: true,
      generatedAt: "2024-01-22T07:20:00Z"
    },
    {
      id: "5",
      assetName: "Security Camera Network - Haram",
      assetId: "CAM-HAR-NET",
      predictionType: "efficiency-decline",
      severity: "medium",
      probability: 0.72,
      confidence: 0.84,
      timeframe: "5-10 days",
      urgency: "within-week",
      description: "Network performance degradation detected",
      impact: "Reduced surveillance coverage quality",
      recommendations: [
        "Network infrastructure assessment",
        "Replace aging network switches",
        "Optimize camera positioning"
      ],
      estimatedCost: 4500,
      preventiveMaintenance: true,
      generatedAt: "2024-01-22T09:10:00Z"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "immediate": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "within-week": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "planned": return <Calendar className="h-4 w-4 text-green-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPredictionTypeIcon = (type: string) => {
    switch (type) {
      case "failure-imminent": return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "performance-degradation": return <TrendingDown className="h-5 w-5 text-yellow-500" />;
      case "component-wear": return <Wrench className="h-5 w-5 text-orange-500" />;
      case "maintenance-due": return <Calendar className="h-5 w-5 text-blue-500" />;
      case "efficiency-decline": return <Activity className="h-5 w-5 text-purple-500" />;
      default: return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Predictive Analytics</h1>
          <p className="text-gray-600 mt-1">
            AI-powered predictions for infrastructure maintenance and failure prevention
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            Model Performance
          </Button>
          <Button>
            <Wrench className="h-4 w-4 mr-2" />
            Generate Action Plan
          </Button>
        </div>
      </div>

      {/* Prediction Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Predictions</p>
              <p className="text-2xl font-bold">{predictions.length}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600">
                {predictions.filter(p => p.severity === "high").length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Immediate Action</p>
              <p className="text-2xl font-bold text-orange-600">
                {predictions.filter(p => p.urgency === "immediate").length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-orange-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Confidence</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round(predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length * 100)}%
              </p>
            </div>
            <Activity className="h-8 w-8 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Predictions List */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Active Predictions</h2>
          <div className="flex space-x-2">
            <Badge variant="outline">All Predictions</Badge>
            <Badge variant="outline">Filter by Severity</Badge>
            <Badge variant="outline">Filter by Urgency</Badge>
          </div>
        </div>

        <div className="space-y-4">
          {predictions.map((prediction) => (
            <div
              key={prediction.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedPrediction === prediction.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedPrediction(selectedPrediction === prediction.id ? null : prediction.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getPredictionTypeIcon(prediction.predictionType)}
                  <div>
                    <h3 className="font-medium text-gray-900">{prediction.assetName}</h3>
                    <p className="text-sm text-gray-600">{prediction.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Probability</p>
                    <p className="text-lg font-bold text-blue-600">
                      {Math.round(prediction.probability * 100)}%
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Confidence</p>
                    <p className="text-lg font-bold text-green-600">
                      {Math.round(prediction.confidence * 100)}%
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Timeframe</p>
                    <p className="text-sm font-medium">{prediction.timeframe}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {getUrgencyIcon(prediction.urgency)}
                    <Badge className={getSeverityColor(prediction.severity)}>
                      {prediction.severity.charAt(0).toUpperCase() + prediction.severity.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              {selectedPrediction === prediction.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Impact Assessment</h4>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">{prediction.impact}</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Estimated Cost:</span>
                          <span className="font-medium">RM {prediction.estimatedCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Maintenance Type:</span>
                          <span className={`font-medium ${prediction.preventiveMaintenance ? 'text-green-600' : 'text-red-600'}`}>
                            {prediction.preventiveMaintenance ? 'Preventive' : 'Emergency'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
                      <ul className="space-y-1">
                        {prediction.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Actions</h4>
                      <div className="space-y-2">
                        <Button size="sm" className="w-full">
                          <Wrench className="h-4 w-4 mr-2" />
                          Create Work Order
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Maintenance
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Escalate Alert
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
