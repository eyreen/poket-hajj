"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  BarChart3,
  Clock,
  Users,
  MessageSquare,
  Eye,
  ArrowUp,
  ArrowDown
} from "lucide-react";

export default function EmergingTrendsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");

  const trends = [
    {
      id: "1",
      topic: "Hotel Service Quality - Makkah",
      sentiment: "declining",
      score: -0.34,
      change: -0.18,
      volume: 156,
      sources: ["support-tickets", "app-reviews", "social-media"],
      keywords: ["room cleaning", "front desk", "wifi", "breakfast"],
      urgency: "high",
      firstDetected: "2024-01-22T08:30:00Z",
      peakTime: "2024-01-22T14:15:00Z",
      affectedPilgrims: 89,
      actionRequired: true
    },
    {
      id: "2", 
      topic: "Transportation Delays - Arafat",
      sentiment: "negative",
      score: -0.67,
      change: -0.42,
      volume: 234,
      sources: ["chat-logs", "support-tickets"],
      keywords: ["bus delay", "waiting time", "heat", "schedule"],
      urgency: "critical",
      firstDetected: "2024-01-22T06:00:00Z",
      peakTime: "2024-01-22T12:30:00Z",
      affectedPilgrims: 312,
      actionRequired: true
    },
    {
      id: "3",
      topic: "Mobile App Performance",
      sentiment: "improving",
      score: 0.23,
      change: 0.15,
      volume: 89,
      sources: ["app-reviews", "support-tickets"],
      keywords: ["faster loading", "new features", "offline mode"],
      urgency: "low",
      firstDetected: "2024-01-21T16:20:00Z",
      peakTime: "2024-01-22T10:45:00Z", 
      affectedPilgrims: 45,
      actionRequired: false
    },
    {
      id: "4",
      topic: "Food Quality - Mina Camps",
      sentiment: "stable",
      score: 0.12,
      change: 0.03,
      volume: 67,
      sources: ["chat-logs", "social-media"],
      keywords: ["halal", "variety", "taste", "portion size"],
      urgency: "medium",
      firstDetected: "2024-01-22T11:10:00Z",
      peakTime: "2024-01-22T13:20:00Z",
      affectedPilgrims: 34,
      actionRequired: false
    },
    {
      id: "5",
      topic: "Medical Services Access",
      sentiment: "declining",
      score: -0.28,
      change: -0.12,
      volume: 43,
      sources: ["support-tickets", "chat-logs"],
      keywords: ["appointment booking", "waiting time", "medication"],
      urgency: "high",
      firstDetected: "2024-01-22T09:45:00Z",
      peakTime: "2024-01-22T15:30:00Z",
      affectedPilgrims: 28,
      actionRequired: true
    }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "declining":
      case "negative": return "text-red-600";
      case "improving": return "text-green-600";
      case "stable": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "declining":
      case "negative": return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "improving": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "stable": return <BarChart3 className="h-4 w-4 text-blue-500" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-500" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const timeframes = [
    { label: "24 Hours", value: "24h" },
    { label: "7 Days", value: "7d" },
    { label: "30 Days", value: "30d" }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Emerging Trends</h1>
          <p className="text-gray-600 mt-1">
            Real-time sentiment trend detection and emerging topic analysis
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="flex space-x-1">
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe.value}
                variant={selectedTimeframe === timeframe.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe.value)}
              >
                {timeframe.label}
              </Button>
            ))}
          </div>
          <Button>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Generate Alert
          </Button>
        </div>
      </div>

      {/* Trend Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Trends</p>
              <p className="text-2xl font-bold">{trends.length}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Negative Trends</p>
              <p className="text-2xl font-bold text-red-600">
                {trends.filter(t => t.sentiment === "declining" || t.sentiment === "negative").length}
              </p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Action Required</p>
              <p className="text-2xl font-bold text-orange-600">
                {trends.filter(t => t.actionRequired).length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Mentions</p>
              <p className="text-2xl font-bold text-purple-600">
                {trends.reduce((sum, t) => sum + t.volume, 0)}
              </p>
            </div>
            <MessageSquare className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Trends List */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Trending Topics</h2>
          <div className="flex space-x-2">
            <Badge variant="outline">All Trends</Badge>
            <Badge variant="outline">Filter by Urgency</Badge>
            <Badge variant="outline">Filter by Sentiment</Badge>
          </div>
        </div>

        <div className="space-y-4">
          {trends.map((trend) => (
            <div
              key={trend.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getSentimentIcon(trend.sentiment)}
                  <div>
                    <h3 className="font-medium text-gray-900">{trend.topic}</h3>
                    <p className="text-sm text-gray-600">
                      First detected: {new Date(trend.firstDetected).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge className={getUrgencyColor(trend.urgency)}>
                    {trend.urgency.charAt(0).toUpperCase() + trend.urgency.slice(1)}
                  </Badge>
                  {trend.actionRequired && (
                    <Badge variant="destructive">Action Required</Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Sentiment Score</p>
                  <p className={`text-lg font-bold ${getSentimentColor(trend.sentiment)}`}>
                    {trend.score > 0 ? '+' : ''}{trend.score.toFixed(2)}
                  </p>
                  <div className="flex items-center justify-center text-sm">
                    {trend.change > 0 ? (
                      <ArrowUp className="h-3 w-3 text-red-500 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-green-500 mr-1" />
                    )}
                    <span className={trend.change > 0 ? 'text-red-600' : 'text-green-600'}>
                      {Math.abs(trend.change).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">Volume</p>
                  <p className="text-lg font-bold text-blue-600">{trend.volume}</p>
                  <p className="text-sm text-gray-500">mentions</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">Affected Pilgrims</p>
                  <p className="text-lg font-bold text-purple-600">{trend.affectedPilgrims}</p>
                  <p className="text-sm text-gray-500">estimated</p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">Data Sources</p>
                  <p className="text-lg font-bold text-gray-700">{trend.sources.length}</p>
                  <p className="text-sm text-gray-500">sources</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm text-gray-600">Keywords:</span>
                {trend.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Trend Analysis
                </Button>
                {trend.actionRequired && (
                  <Button size="sm">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Create Response
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
