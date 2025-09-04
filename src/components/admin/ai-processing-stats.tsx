'use client'

import React from 'react'
import { 
  Brain, 
  Zap, 
  Shield, 
  Clock, 
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Activity
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface AIProcessingStatsProps {
  className?: string
}

export function AIProcessingStats({ className }: AIProcessingStatsProps) {
  // Mock data - in real implementation, this would come from API
  const stats = {
    totalProcessed: 15847,
    todayProcessed: 342,
    automationRate: 87.3,
    averageProcessingTime: 2.4,
    accuracyRate: 99.7,
    flaggedDocuments: 23,
    pendingReview: 156,
    costSavings: 450000, // RM saved per month
    timeReduction: 73 // percentage
  }

  const aiMetrics = [
    {
      title: "Total Documents Processed",
      value: stats.totalProcessed.toLocaleString(),
      subtitle: `${stats.todayProcessed} processed today`,
      icon: <Activity className="h-5 w-5 text-blue-600" />,
      trend: "+12.5%"
    },
    {
      title: "Automation Rate",
      value: `${stats.automationRate}%`,
      subtitle: "Documents auto-processed",
      icon: <Zap className="h-5 w-5 text-green-600" />,
      trend: "+5.2%"
    },
    {
      title: "AI Accuracy",
      value: `${stats.accuracyRate}%`,
      subtitle: "Verification accuracy",
      icon: <Brain className="h-5 w-5 text-purple-600" />,
      trend: "+0.3%"
    },
    {
      title: "Processing Speed",
      value: `${stats.averageProcessingTime}s`,
      subtitle: "Average processing time",
      icon: <Clock className="h-5 w-5 text-orange-600" />,
      trend: "-15%"
    }
  ]

  const systemHealth = [
    {
      name: "OCR Engine",
      status: "Optimal",
      performance: 98,
      color: "bg-green-500"
    },
    {
      name: "Fraud Detection",
      status: "Active",
      performance: 95,
      color: "bg-blue-500"
    },
    {
      name: "Cross-Reference APIs",
      status: "Healthy",
      performance: 92,
      color: "bg-green-500"
    },
    {
      name: "ML Models",
      status: "Training",
      performance: 88,
      color: "bg-yellow-500"
    }
  ]

  const recentActivities = [
    {
      time: "2 min ago",
      action: "Auto-approved 15 IC documents",
      type: "success"
    },
    {
      time: "5 min ago",
      action: "Flagged suspicious passport document",
      type: "warning"
    },
    {
      time: "8 min ago",
      action: "Completed batch processing of 50 health certificates",
      type: "info"
    },
    {
      time: "12 min ago",
      action: "API cross-reference successful for 23 documents",
      type: "success"
    }
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* AI Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
                <Badge variant="secondary" className="text-green-600 bg-green-50">
                  {metric.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>AI System Health</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemHealth.map((system) => (
              <div key={system.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{system.name}</span>
                  <Badge variant="outline">{system.status}</Badge>
                </div>
                <div className="flex items-center space-x-3">
                  <Progress value={system.performance} className="flex-1" />
                  <span className="text-sm text-muted-foreground">{system.performance}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent AI Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Recent AI Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Performance Impact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">RM {stats.costSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Monthly operational savings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Reduction</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.timeReduction}%</div>
            <p className="text-xs text-muted-foreground">
              Faster document processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Officer Workload</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-60%</div>
            <p className="text-xs text-muted-foreground">
              Reduction in manual review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI Learning & Improvement</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Model Training Progress</p>
                <p className="text-xs text-muted-foreground">Current training cycle for improved accuracy</p>
              </div>
              <Badge variant="secondary">In Progress</Badge>
            </div>
            <Progress value={67} className="w-full" />
            <div className="text-xs text-muted-foreground">
              Training on 50,000+ verified documents to improve fraud detection
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
