"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Target,
  Clock,
  DollarSign,
  Zap,
  CheckCircle,
  AlertTriangle,
  Settings,
  Calendar,
  Users,
  Wrench,
  BarChart3
} from "lucide-react";

export default function OptimizationPage() {
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);

  const optimizationRecommendations = [
    {
      id: "opt-001",
      category: "scheduling",
      priority: "high",
      title: "Optimize Preventive Maintenance Scheduling",
      description: "Implement condition-based scheduling for HVAC systems to reduce unnecessary maintenance by 25%",
      rationale: "Current fixed-interval scheduling leads to over-maintenance of well-performing assets",
      expectedImpact: "25% reduction in maintenance costs, improved asset availability",
      costSavings: 45000,
      downtimeReduction: 15,
      efficiencyGain: 12,
      implementation: {
        effort: "medium",
        timeframe: "3-4 months",
        dependencies: ["Sensor upgrades", "Staff training", "System integration"],
        risks: ["Initial learning curve", "Resistance to change"]
      },
      status: "pending"
    },
    {
      id: "opt-002", 
      category: "resource-allocation",
      priority: "critical",
      title: "Emergency Response Team Restructuring",
      description: "Create dedicated emergency response teams for critical infrastructure failures",
      rationale: "Current response times for critical failures exceed acceptable thresholds",
      expectedImpact: "50% reduction in emergency response time, improved safety",
      costSavings: 85000,
      downtimeReduction: 35,
      efficiencyGain: 25,
      implementation: {
        effort: "high",
        timeframe: "2-3 months",
        dependencies: ["Team recruitment", "Equipment procurement", "Training program"],
        risks: ["Budget constraints", "Skills availability"]
      },
      status: "in-progress"
    },
    {
      id: "opt-003",
      category: "technology",
      priority: "medium", 
      title: "IoT Sensor Network Expansion",
      description: "Deploy additional vibration and temperature sensors on critical assets",
      rationale: "Insufficient sensor coverage limiting predictive capabilities",
      expectedImpact: "30% improvement in failure prediction accuracy",
      costSavings: 32000,
      downtimeReduction: 20,
      efficiencyGain: 18,
      implementation: {
        effort: "medium",
        timeframe: "4-6 months",
        dependencies: ["Sensor procurement", "Network infrastructure", "Integration testing"],
        risks: ["Technical complexity", "Integration challenges"]
      },
      status: "planned"
    },
    {
      id: "opt-004",
      category: "process",
      priority: "high",
      title: "Automated Work Order Generation",
      description: "Implement AI-driven automatic work order creation based on predictions",
      rationale: "Manual work order creation causes delays in maintenance execution",
      expectedImpact: "40% reduction in administrative overhead",
      costSavings: 28000,
      downtimeReduction: 10,
      efficiencyGain: 22,
      implementation: {
        effort: "low",
        timeframe: "1-2 months", 
        dependencies: ["API integration", "Approval workflows", "User training"],
        risks: ["System reliability", "Change management"]
      },
      status: "pending"
    },
    {
      id: "opt-005",
      category: "training",
      priority: "medium",
      title: "Predictive Maintenance Training Program",
      description: "Comprehensive training program for maintenance staff on AI-driven techniques",
      rationale: "Staff skills gap limiting effective utilization of predictive technologies",
      expectedImpact: "Improved maintenance quality and reduced human errors",
      costSavings: 15000,
      downtimeReduction: 8,
      efficiencyGain: 15,
      implementation: {
        effort: "medium",
        timeframe: "3-4 months",
        dependencies: ["Training materials", "Expert trainers", "Schedule coordination"],
        risks: ["Staff availability", "Knowledge retention"]
      },
      status: "pending"
    }
  ];

  const implementationPlans = [
    {
      id: "plan-001",
      name: "Q1 2024 Optimization Implementation",
      totalDuration: 90, // days
      totalCost: 125000,
      phases: [
        {
          phase: 1,
          name: "Emergency Response Setup",
          duration: 30,
          status: "in-progress",
          progress: 65
        },
        {
          phase: 2,
          name: "Automated Work Orders",
          duration: 45,
          status: "planned", 
          progress: 0
        },
        {
          phase: 3,
          name: "IoT Sensor Deployment",
          duration: 60,
          status: "planned",
          progress: 0
        }
      ],
      keyMilestones: [
        { name: "Emergency Team Operational", date: "2024-02-15", status: "on-track" },
        { name: "Work Order Automation Live", date: "2024-03-30", status: "pending" },
        { name: "Sensor Network Complete", date: "2024-05-15", status: "pending" }
      ],
      expectedBenefits: {
        costSavings: 158000,
        downtimeReduction: 40,
        efficiencyGain: 28,
        safetyImprovement: "50% reduction in emergency response time"
      }
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "planned": return "bg-purple-100 text-purple-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "on-hold": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "scheduling": return <Calendar className="h-4 w-4" />;
      case "resource-allocation": return <Users className="h-4 w-4" />;
      case "technology": return <Zap className="h-4 w-4" />;
      case "process": return <Settings className="h-4 w-4" />;
      case "training": return <Users className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance Optimization</h1>
          <p className="text-gray-600 mt-1">
            AI-powered recommendations for optimizing maintenance operations and resource allocation
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Impact Analysis
          </Button>
          <Button>
            <Target className="h-4 w-4 mr-2" />
            Implement Selected
          </Button>
        </div>
      </div>

      {/* Optimization Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Recommendations</p>
              <p className="text-2xl font-bold">{optimizationRecommendations.length}</p>
            </div>
            <Target className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Potential Savings</p>
              <p className="text-2xl font-bold text-green-600">
                RM {optimizationRecommendations.reduce((sum, r) => sum + r.costSavings, 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Downtime Reduction</p>
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(optimizationRecommendations.reduce((sum, r) => sum + r.downtimeReduction, 0) / optimizationRecommendations.length)}%
              </p>
            </div>
            <Clock className="h-8 w-8 text-orange-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Efficiency Gain</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(optimizationRecommendations.reduce((sum, r) => sum + r.efficiencyGain, 0) / optimizationRecommendations.length)}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Optimization Recommendations */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Optimization Recommendations</h2>
          <div className="flex space-x-2">
            <Badge variant="outline">All Categories</Badge>
            <Badge variant="outline">Filter by Priority</Badge>
            <Badge variant="outline">Filter by Status</Badge>
          </div>
        </div>

        <div className="space-y-4">
          {optimizationRecommendations.map((recommendation) => (
            <div
              key={recommendation.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedRecommendation === recommendation.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedRecommendation(selectedRecommendation === recommendation.id ? null : recommendation.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getCategoryIcon(recommendation.category)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{recommendation.title}</h3>
                      <Badge className={getPriorityColor(recommendation.priority)}>
                        {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
                    <p className="text-sm text-gray-500 mt-1 capitalize">{recommendation.category.replace('-', ' ')}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Cost Savings</p>
                    <p className="text-lg font-bold text-green-600">
                      RM {recommendation.costSavings.toLocaleString()}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Downtime ↓</p>
                    <p className="text-lg font-bold text-orange-600">
                      {recommendation.downtimeReduction}%
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Efficiency ↑</p>
                    <p className="text-lg font-bold text-purple-600">
                      {recommendation.efficiencyGain}%
                    </p>
                  </div>

                  <Badge className={getStatusColor(recommendation.status)}>
                    {recommendation.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                </div>
              </div>

              {selectedRecommendation === recommendation.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Rationale & Impact</h4>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Rationale:</span> {recommendation.rationale}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Expected Impact:</span> {recommendation.expectedImpact}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Implementation Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Effort Level:</span>
                          <span className="font-medium capitalize">{recommendation.implementation.effort}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Timeframe:</span>
                          <span className="font-medium">{recommendation.implementation.timeframe}</span>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-600 mb-1">Dependencies:</p>
                          <ul className="space-y-1">
                            {recommendation.implementation.dependencies.map((dep, index) => (
                              <li key={index} className="text-xs text-gray-700 flex items-start">
                                <span className="inline-block w-1 h-1 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                                {dep}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Actions & Risks</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Key Risks:</p>
                          <div className="space-y-1">
                            {recommendation.implementation.risks.map((risk, index) => (
                              <div key={index} className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded">
                                {risk}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Button size="sm" className="w-full">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve Implementation
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Review
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

      {/* Implementation Plans */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Implementation Plans</h2>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Create New Plan
          </Button>
        </div>

        {implementationPlans.map((plan) => (
          <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium text-gray-900">{plan.name}</h3>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span>Duration: {plan.totalDuration} days</span>
                  <span>Budget: RM {plan.totalCost.toLocaleString()}</span>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Active</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Implementation Phases</h4>
                <div className="space-y-3">
                  {plan.phases.map((phase) => (
                    <div key={phase.phase} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Phase {phase.phase}: {phase.name}</p>
                        <p className="text-xs text-gray-600">{phase.duration} days</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${phase.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{phase.progress}%</span>
                        <Badge className={getStatusColor(phase.status)} variant="outline">
                          {phase.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Expected Benefits</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cost Savings:</span>
                    <span className="font-medium text-green-600">RM {plan.expectedBenefits.costSavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Downtime Reduction:</span>
                    <span className="font-medium text-orange-600">{plan.expectedBenefits.downtimeReduction}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Efficiency Gain:</span>
                    <span className="font-medium text-purple-600">{plan.expectedBenefits.efficiencyGain}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Safety Improvement:</span>
                    <span className="font-medium text-blue-600">{plan.expectedBenefits.safetyImprovement}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
