'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Network, 
  Users, 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  Eye,
  Ban,
  Clock,
  Target,
  Brain,
  Zap,
  Shield
} from 'lucide-react';
import {
  getNetworkAnalysis,
  getFraudDashboardData
} from '@/lib/fraud-detection-api';
import type { 
  NetworkAnalysis,
  TransactionNetwork,
  SuspiciousPattern,
  MoneyLaunderingIndicator
} from '@/types/fraud-detection';

export default function NetworkMonitoring() {
  const [networkData, setNetworkData] = useState<NetworkAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState<TransactionNetwork | null>(null);

  useEffect(() => {
    loadNetworkData();
    const interval = setInterval(loadNetworkData, 15000); // Update every 15 seconds
    return () => clearInterval(interval);
  }, []);

  const loadNetworkData = async () => {
    try {
      const data = await getNetworkAnalysis();
      setNetworkData(data);
    } catch (error) {
      console.error('Failed to load network data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore >= 0.7) return 'bg-red-100 text-red-800 border-red-200';
    if (riskScore >= 0.4) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (riskScore >= 0.2) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getPatternTypeIcon = (patternType: string) => {
    switch (patternType) {
      case 'circular_transactions': return <Network className="h-4 w-4" />;
      case 'rapid_movement': return <Zap className="h-4 w-4" />;
      case 'structuring': return <Target className="h-4 w-4" />;
      case 'wash_trading': return <Activity className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  if (loading || !networkData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Network Analysis & Monitoring</h1>
        <p className="text-gray-600 mt-2">
          Real-time analysis of transaction networks and coordinated fraud detection
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Networks</p>
                <p className="text-2xl font-bold text-gray-900">
                  {networkData.transactionNetworks.length}
                </p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <Network className="h-4 w-4 mr-1" />
                  Monitoring
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Network className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Suspicious Patterns</p>
                <p className="text-2xl font-bold text-gray-900">
                  {networkData.suspiciousPatterns.length}
                </p>
                <p className="text-sm text-orange-600 flex items-center mt-1">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Detected
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ML Indicators</p>
                <p className="text-2xl font-bold text-gray-900">
                  {networkData.moneyLaunderingDetection.length}
                </p>
                <p className="text-sm text-red-600 flex items-center mt-1">
                  <Shield className="h-4 w-4 mr-1" />
                  High Risk
                </p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Coordinated Activity</p>
                <p className="text-2xl font-bold text-gray-900">
                  {networkData.coordinatedActivity.length}
                </p>
                <p className="text-sm text-purple-600 flex items-center mt-1">
                  <Users className="h-4 w-4 mr-1" />
                  Under Investigation
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="networks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="networks">Transaction Networks</TabsTrigger>
          <TabsTrigger value="patterns">Suspicious Patterns</TabsTrigger>
          <TabsTrigger value="laundering">Money Laundering</TabsTrigger>
          <TabsTrigger value="coordinated">Coordinated Activity</TabsTrigger>
        </TabsList>

        {/* Transaction Networks Tab */}
        <TabsContent value="networks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Network Analysis</CardTitle>
              <CardDescription>
                Visual representation and analysis of transaction flow networks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {networkData.transactionNetworks.map((network) => (
                    <div key={network.networkId} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">Network {network.networkId}</h3>
                          <Badge className={getRiskColor(network.riskScore)}>
                            Risk: {(network.riskScore * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedNetwork(
                            selectedNetwork?.networkId === network.networkId ? null : network
                          )}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          {selectedNetwork?.networkId === network.networkId ? 'Hide' : 'Analyze'}
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{network.nodes.length}</div>
                          <div className="text-sm text-gray-600">Nodes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{network.edges.length}</div>
                          <div className="text-sm text-gray-600">Connections</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">
                            {network.flaggedReasons.length}
                          </div>
                          <div className="text-sm text-gray-600">Flags</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">
                            {network.analysisTimestamp.toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-600">Last Analysis</div>
                        </div>
                      </div>

                      {network.flaggedReasons.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {network.flaggedReasons.map((reason, idx) => (
                            <Badge key={idx} variant="destructive" className="text-xs">
                              {reason}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {selectedNetwork?.networkId === network.networkId && (
                        <div className="border-t pt-4 space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Network Nodes</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {network.nodes.map((node, idx) => (
                                <div key={idx} className="bg-gray-50 p-3 rounded">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">{node.nodeType}: {node.nodeId}</span>
                                    <Badge variant="outline" className={
                                      node.riskLevel === 'critical' ? 'border-red-500 text-red-700' :
                                      node.riskLevel === 'high' ? 'border-orange-500 text-orange-700' :
                                      node.riskLevel === 'medium' ? 'border-yellow-500 text-yellow-700' :
                                      'border-green-500 text-green-700'
                                    }>
                                      {node.riskLevel}
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-gray-600 mt-1">
                                    {node.connections} connections
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Connection Analysis</h4>
                            <div className="space-y-2">
                              {network.edges.map((edge, idx) => (
                                <div key={idx} className={`p-3 rounded ${edge.suspicious ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">
                                      {edge.sourceNodeId} → {edge.targetNodeId}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline">
                                        {edge.relationshipType}
                                      </Badge>
                                      {edge.suspicious && (
                                        <Badge variant="destructive">Suspicious</Badge>
                                      )}
                                    </div>
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    Weight: {edge.weight.toFixed(2)} | Frequency: {edge.frequency}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Network Statistics</h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Network className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Total Networks</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-900">
                        {networkData.transactionNetworks.length}
                      </p>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium">High Risk Networks</span>
                      </div>
                      <p className="text-2xl font-bold text-orange-900">
                        {networkData.transactionNetworks.filter(n => n.riskScore > 0.7).length}
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Detection Accuracy</span>
                      </div>
                      <p className="text-2xl font-bold text-green-900">96.2%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Suspicious Patterns Tab */}
        <TabsContent value="patterns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Suspicious Pattern Detection</CardTitle>
              <CardDescription>
                AI-detected patterns indicating potential fraudulent activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {networkData.suspiciousPatterns.map((pattern) => (
                  <div key={pattern.patternId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getPatternTypeIcon(pattern.patternType)}
                        <h3 className="font-semibold capitalize">
                          {pattern.patternType.replace('_', ' ')}
                        </h3>
                        <Badge variant="destructive">
                          {(pattern.confidence * 100).toFixed(0)}% confidence
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        Risk Level: {(pattern.riskLevel * 100).toFixed(0)}%
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Entities Involved:</span>
                        <p className="font-medium">{pattern.involvedEntities.length}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Detection Time:</span>
                        <p className="font-medium">{pattern.detectedAt.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Confidence Level:</span>
                        <Progress value={pattern.confidence * 100} className="mt-1" />
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="text-sm text-gray-600">Involved Entities:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {pattern.involvedEntities.map((entity, idx) => (
                          <Badge key={idx} variant="outline">{entity}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Money Laundering Tab */}
        <TabsContent value="laundering" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Money Laundering Detection</CardTitle>
              <CardDescription>
                Advanced detection of money laundering indicators and schemes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {networkData.moneyLaunderingDetection.map((indicator) => (
                  <div key={indicator.indicatorId} className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-red-600" />
                        <h3 className="font-semibold text-red-900 capitalize">
                          {indicator.indicatorType} Stage
                        </h3>
                        <Badge variant="destructive">
                          Risk: {(indicator.riskScore * 100).toFixed(0)}%
                        </Badge>
                      </div>
                    </div>

                    <p className="text-red-800 mb-3">{indicator.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className="text-sm text-red-600">Involved Transactions:</span>
                        <p className="font-medium text-red-900">{indicator.involvedTransactions.length}</p>
                      </div>
                      <div>
                        <span className="text-sm text-red-600">Risk Score:</span>
                        <Progress 
                          value={indicator.riskScore * 100} 
                          className="mt-1 bg-red-200"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-red-600">Required Actions:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {indicator.requiredActions.map((action, idx) => (
                          <Badge key={idx} variant="destructive">{action}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Investigate
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Ban className="h-4 w-4 mr-1" />
                        Block Activity
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Coordinated Activity Tab */}
        <TabsContent value="coordinated" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Coordinated Activity Detection</CardTitle>
              <CardDescription>
                Detection of coordinated fraud attempts and bot activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {networkData.coordinatedActivity.map((activity) => (
                  <div key={activity.activityId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-purple-600" />
                        <h3 className="font-semibold capitalize">
                          {activity.activityType.replace('_', ' ')}
                        </h3>
                        <Badge variant={activity.automaticBlocking ? 'destructive' : 'default'}>
                          {activity.automaticBlocking ? 'Auto-blocked' : 'Monitoring'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        Confidence: {(activity.confidence * 100).toFixed(0)}%
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <span className="text-sm text-gray-600">Involved Users:</span>
                        <p className="font-medium">{activity.involvedUsers.length}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Time Window:</span>
                        <p className="font-medium">
                          {activity.timeWindow.start} - {activity.timeWindow.end}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Status:</span>
                        <p className="font-medium">
                          {activity.automaticBlocking ? 'Blocked' : 'Under Review'}
                        </p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="text-sm text-gray-600">Involved Users:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {activity.involvedUsers.slice(0, 10).map((user, idx) => (
                          <Badge key={idx} variant="outline">{user}</Badge>
                        ))}
                        {activity.involvedUsers.length > 10 && (
                          <Badge variant="secondary">+{activity.involvedUsers.length - 10} more</Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      {!activity.automaticBlocking && (
                        <Button variant="destructive" size="sm">
                          <Ban className="h-4 w-4 mr-1" />
                          Block Users
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
