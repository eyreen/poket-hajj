"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Star, 
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Database,
  RefreshCw,
  Eye,
  AlertTriangle
} from "lucide-react";

export default function DataSourcesPage() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const dataSources = [
    {
      id: "1",
      name: "Support Tickets",
      type: "support-tickets",
      status: "active",
      lastUpdate: "2024-01-22T14:45:00Z",
      totalRecords: 2847,
      todayRecords: 156,
      avgSentiment: -0.23,
      sentimentTrend: "declining",
      reliability: 98.5,
      processingTime: "2.3s",
      languages: ["Malay", "English", "Arabic"],
      categories: ["technical", "service", "billing", "general"],
      aiModels: ["sentiment-v2.1", "topic-classifier-v1.8"],
      dataQuality: 94.2
    },
    {
      id: "2", 
      name: "App Store Reviews",
      type: "app-reviews",
      status: "active",
      lastUpdate: "2024-01-22T14:30:00Z",
      totalRecords: 1234,
      todayRecords: 23,
      avgSentiment: 0.67,
      sentimentTrend: "improving",
      reliability: 96.8,
      processingTime: "1.8s",
      languages: ["Malay", "English"],
      categories: ["usability", "features", "performance", "bugs"],
      aiModels: ["sentiment-v2.1", "rating-predictor-v1.2"],
      dataQuality: 91.7
    },
    {
      id: "3",
      name: "Social Media Mentions",
      type: "social-media",
      status: "active", 
      lastUpdate: "2024-01-22T14:50:00Z",
      totalRecords: 5632,
      todayRecords: 342,
      avgSentiment: 0.12,
      sentimentTrend: "stable",
      reliability: 89.3,
      processingTime: "4.1s",
      languages: ["Malay", "English", "Arabic", "Urdu"],
      categories: ["experience", "complaints", "praise", "suggestions"],
      aiModels: ["sentiment-v2.1", "topic-classifier-v1.8", "spam-detector-v1.5"],
      dataQuality: 87.4
    },
    {
      id: "4",
      name: "Live Chat Logs",
      type: "chat-logs", 
      status: "active",
      lastUpdate: "2024-01-22T14:55:00Z",
      totalRecords: 8934,
      todayRecords: 445,
      avgSentiment: -0.34,
      sentimentTrend: "declining",
      reliability: 99.2,
      processingTime: "1.5s",
      languages: ["Malay", "English"],
      categories: ["urgent", "information", "complaint", "booking"],
      aiModels: ["sentiment-v2.1", "intent-classifier-v2.0"],
      dataQuality: 96.8
    },
    {
      id: "5",
      name: "Survey Responses",
      type: "surveys",
      status: "maintenance",
      lastUpdate: "2024-01-22T10:00:00Z",
      totalRecords: 923,
      todayRecords: 0,
      avgSentiment: 0.45,
      sentimentTrend: "stable",
      reliability: 0,
      processingTime: "N/A",
      languages: ["Malay", "English"],
      categories: ["satisfaction", "service-quality", "recommendations"],
      aiModels: ["sentiment-v2.1"],
      dataQuality: 98.5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      case "error": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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

  const getSourceIcon = (type: string) => {
    switch (type) {
      case "support-tickets": return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "app-reviews": return <Star className="h-5 w-5 text-yellow-500" />;
      case "social-media": return <Activity className="h-5 w-5 text-purple-500" />;
      case "chat-logs": return <MessageSquare className="h-5 w-5 text-green-500" />;
      case "surveys": return <BarChart3 className="h-5 w-5 text-orange-500" />;
      default: return <Database className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Sources</h1>
          <p className="text-gray-600 mt-1">
            Monitor and manage sentiment analysis data sources and processing pipelines
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh All
          </Button>
          <Button>
            <Database className="h-4 w-4 mr-2" />
            Add Source
          </Button>
        </div>
      </div>

      {/* Data Sources Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Sources</p>
              <p className="text-2xl font-bold text-green-600">
                {dataSources.filter(s => s.status === "active").length}
              </p>
            </div>
            <Database className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Records</p>
              <p className="text-2xl font-bold text-blue-600">
                {dataSources.reduce((sum, s) => sum + s.todayRecords, 0)}
              </p>
            </div>
            <Activity className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Reliability</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(dataSources.filter(s => s.status === "active").reduce((sum, s) => sum + s.reliability, 0) / dataSources.filter(s => s.status === "active").length)}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Quality Score</p>
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(dataSources.reduce((sum, s) => sum + s.dataQuality, 0) / dataSources.length)}%
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Data Sources List */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Data Source Pipeline Status</h2>
          <div className="flex space-x-2">
            <Badge variant="outline">All Sources</Badge>
            <Badge variant="outline">Filter by Status</Badge>
            <Badge variant="outline">Filter by Type</Badge>
          </div>
        </div>

        <div className="space-y-4">
          {dataSources.map((source) => (
            <div
              key={source.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedSource === source.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedSource(selectedSource === source.id ? null : source.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getSourceIcon(source.type)}
                  <div>
                    <h3 className="font-medium text-gray-900">{source.name}</h3>
                    <p className="text-sm text-gray-600">
                      Last updated: {new Date(source.lastUpdate).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Today's Records</p>
                    <p className="text-lg font-bold text-blue-600">{source.todayRecords}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Avg. Sentiment</p>
                    <div className="flex items-center justify-center space-x-1">
                      <p className={`text-lg font-bold ${getSentimentColor(source.avgSentiment)}`}>
                        {source.avgSentiment > 0 ? '+' : ''}{source.avgSentiment.toFixed(2)}
                      </p>
                      {getTrendIcon(source.sentimentTrend)}
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Reliability</p>
                    <p className={`text-lg font-bold ${source.reliability > 95 ? 'text-green-600' : source.reliability > 85 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {source.reliability}%
                    </p>
                  </div>

                  <Badge className={getStatusColor(source.status)}>
                    {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {selectedSource === source.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Data Processing</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Records:</span>
                          <span className="font-medium">{source.totalRecords.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Processing Time:</span>
                          <span className="font-medium">{source.processingTime}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Data Quality:</span>
                          <span className={`font-medium ${source.dataQuality > 95 ? 'text-green-600' : source.dataQuality > 85 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {source.dataQuality}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Configuration</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Languages:</p>
                          <div className="flex flex-wrap gap-1">
                            {source.languages.map((lang, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Categories:</p>
                          <div className="flex flex-wrap gap-1">
                            {source.categories.map((cat, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">AI Models</h4>
                      <div className="space-y-2">
                        {source.aiModels.map((model, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                            <span className="font-medium">{model}</span>
                            <Badge variant="secondary" className="text-xs">Active</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200">
                    <Button size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Data
                    </Button>
                    <Button size="sm" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                    {source.status === "maintenance" && (
                      <Button size="sm" variant="outline">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Check Status
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
