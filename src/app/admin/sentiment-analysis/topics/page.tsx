"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Hash, 
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Users,
  Clock,
  BarChart3,
  Activity,
  Eye,
  Filter
} from "lucide-react";

export default function TopicAnalysisPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topicAnalysis = [
    {
      id: "1",
      topic: "Hotel Service Quality",
      keywords: ["hotel", "room", "service", "cleaning", "staff", "reception"],
      volume: 342,
      sentimentScore: -0.45,
      trend: "declining",
      change: -0.18,
      topSources: ["support-tickets", "app-reviews", "chat-logs"],
      peakTime: "14:00-16:00",
      affectedPilgrims: 156,
      subcategories: [
        { name: "Room Cleaning", volume: 89, sentiment: -0.67 },
        { name: "Front Desk Service", volume: 76, sentiment: -0.34 },
        { name: "WiFi Issues", volume: 45, sentiment: -0.23 },
        { name: "Breakfast Quality", volume: 132, sentiment: -0.56 }
      ]
    },
    {
      id: "2",
      topic: "Transportation Services",
      keywords: ["bus", "transport", "delay", "schedule", "driver", "route"],
      volume: 567,
      sentimentScore: -0.62,
      trend: "declining",
      change: -0.28,
      topSources: ["chat-logs", "social-media", "support-tickets"],
      peakTime: "06:00-09:00",
      affectedPilgrims: 423,
      subcategories: [
        { name: "Bus Delays", volume: 234, sentiment: -0.78 },
        { name: "Route Changes", volume: 145, sentiment: -0.45 },
        { name: "Driver Behavior", volume: 89, sentiment: -0.34 },
        { name: "Vehicle Condition", volume: 99, sentiment: -0.56 }
      ]
    },
    {
      id: "3",
      topic: "Mobile App Experience",
      keywords: ["app", "loading", "crash", "login", "slow", "update"],
      volume: 234,
      sentimentScore: 0.23,
      trend: "improving",
      change: 0.34,
      topSources: ["app-reviews", "support-tickets"],
      peakTime: "20:00-22:00",
      affectedPilgrims: 134,
      subcategories: [
        { name: "App Performance", volume: 89, sentiment: 0.45 },
        { name: "New Features", volume: 67, sentiment: 0.78 },
        { name: "User Interface", volume: 45, sentiment: 0.12 },
        { name: "Offline Mode", volume: 33, sentiment: -0.23 }
      ]
    },
    {
      id: "4",
      topic: "Food & Dining",
      keywords: ["food", "meal", "halal", "taste", "variety", "dining"],
      volume: 189,
      sentimentScore: 0.12,
      trend: "stable",
      change: 0.05,
      topSources: ["chat-logs", "social-media"],
      peakTime: "12:00-14:00",
      affectedPilgrims: 98,
      subcategories: [
        { name: "Meal Quality", volume: 67, sentiment: 0.23 },
        { name: "Menu Variety", volume: 54, sentiment: 0.45 },
        { name: "Halal Certification", volume: 34, sentiment: 0.67 },
        { name: "Dining Times", volume: 34, sentiment: -0.12 }
      ]
    },
    {
      id: "5",
      topic: "Medical Services",
      keywords: ["medical", "doctor", "appointment", "medication", "health"],
      volume: 123,
      sentimentScore: -0.28,
      trend: "declining",
      change: -0.15,
      topSources: ["support-tickets", "chat-logs"],
      peakTime: "09:00-11:00",
      affectedPilgrims: 67,
      subcategories: [
        { name: "Appointment Booking", volume: 45, sentiment: -0.56 },
        { name: "Wait Times", volume: 34, sentiment: -0.34 },
        { name: "Staff Availability", volume: 23, sentiment: -0.12 },
        { name: "Medication Access", volume: 21, sentiment: -0.45 }
      ]
    }
  ];

  const timeframes = [
    { label: "24 Hours", value: "24h" },
    { label: "7 Days", value: "7d" },
    { label: "30 Days", value: "30d" }
  ];

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.2) return "text-green-600";
    if (sentiment < -0.2) return "text-red-600";
    return "text-gray-600";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "declining": return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "stable": return <BarChart3 className="h-4 w-4 text-blue-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving": return "text-green-600";
      case "declining": return "text-red-600";
      case "stable": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Topic Analysis</h1>
          <p className="text-gray-600 mt-1">
            Deep dive into topic-based sentiment analysis and trending discussion themes
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
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Topic Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Topics</p>
              <p className="text-2xl font-bold">{topicAnalysis.length}</p>
            </div>
            <Hash className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Volume</p>
              <p className="text-2xl font-bold text-purple-600">
                {topicAnalysis.reduce((sum, t) => sum + t.volume, 0)}
              </p>
            </div>
            <MessageSquare className="h-8 w-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Negative Topics</p>
              <p className="text-2xl font-bold text-red-600">
                {topicAnalysis.filter(t => t.sentimentScore < -0.2).length}
              </p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Affected Pilgrims</p>
              <p className="text-2xl font-bold text-orange-600">
                {topicAnalysis.reduce((sum, t) => sum + t.affectedPilgrims, 0)}
              </p>
            </div>
            <Users className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Topics List */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Topic Sentiment Analysis</h2>
          <div className="flex space-x-2">
            <Badge variant="outline">All Topics</Badge>
            <Badge variant="outline">Sort by Volume</Badge>
            <Badge variant="outline">Sort by Sentiment</Badge>
          </div>
        </div>

        <div className="space-y-4">
          {topicAnalysis.map((topic) => (
            <div
              key={topic.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedTopic === topic.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{topic.topic}</h3>
                    <p className="text-sm text-gray-600">
                      Peak activity: {topic.peakTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Volume</p>
                    <p className="text-lg font-bold text-purple-600">{topic.volume}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Sentiment</p>
                    <div className="flex items-center justify-center space-x-1">
                      <p className={`text-lg font-bold ${getSentimentColor(topic.sentimentScore)}`}>
                        {topic.sentimentScore > 0 ? '+' : ''}{topic.sentimentScore.toFixed(2)}
                      </p>
                      {getTrendIcon(topic.trend)}
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Affected</p>
                    <p className="text-lg font-bold text-orange-600">{topic.affectedPilgrims}</p>
                  </div>

                  <Badge className={`${getTrendColor(topic.trend)} bg-opacity-10`}>
                    {topic.trend.charAt(0).toUpperCase() + topic.trend.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Keywords */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-sm text-gray-600">Keywords:</span>
                {topic.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>

              {selectedTopic === topic.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                  {/* Subcategories */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Subcategory Breakdown</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {topic.subcategories.map((subcat, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{subcat.name}</p>
                              <p className="text-xs text-gray-600">{subcat.volume} mentions</p>
                            </div>
                            <div className="text-right">
                              <p className={`text-sm font-bold ${getSentimentColor(subcat.sentiment)}`}>
                                {subcat.sentiment > 0 ? '+' : ''}{subcat.sentiment.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Data Sources */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Top Data Sources</h4>
                    <div className="flex space-x-2">
                      {topic.topSources.map((source, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {source.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Trend Analysis
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      View Messages
                    </Button>
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
