'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Clock, 
  MapPin, 
  CreditCard, 
  Smartphone, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Calendar,
  Target,
  Brain
} from 'lucide-react';
import { getBehavioralAnalysis, getBehavioralBiometrics } from '@/lib/fraud-detection-api';
import type { UserBehaviorProfile, BehavioralBiometrics } from '@/types/fraud-detection';

interface UserBehaviorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

export default function UserBehaviorModal({ open, onOpenChange, userId }: UserBehaviorModalProps) {
  const [behaviorProfile, setBehaviorProfile] = useState<UserBehaviorProfile | null>(null);
  const [biometrics, setBiometrics] = useState<BehavioralBiometrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && userId) {
      loadBehaviorData();
    }
  }, [open, userId]);

  const loadBehaviorData = async () => {
    try {
      setLoading(true);
      const [profile, biometricsData] = await Promise.all([
        getBehavioralAnalysis(userId),
        getBehavioralBiometrics(userId)
      ]);
      setBehaviorProfile(profile);
      setBiometrics(biometricsData);
    } catch (error) {
      console.error('Failed to load behavior data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore >= 0.7) return 'text-red-600 bg-red-100';
    if (riskScore >= 0.4) return 'text-orange-600 bg-orange-100';
    if (riskScore >= 0.2) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getTrustLevelColor = (trustLevel: number) => {
    if (trustLevel >= 0.8) return 'text-green-600';
    if (trustLevel >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Behavioral Analysis
          </DialogTitle>
          <DialogDescription>
            Comprehensive behavioral pattern analysis for user {userId}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : behaviorProfile ? (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="login">Login Patterns</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="devices">Devices & Location</TabsTrigger>
              <TabsTrigger value="biometrics">Biometrics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Risk Score</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {(behaviorProfile.riskScore * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${getRiskColor(behaviorProfile.riskScore)}`}>
                        <Target className="h-6 w-6" />
                      </div>
                    </div>
                    <Progress value={behaviorProfile.riskScore * 100} className="mt-3" />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Confidence Level</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {(behaviorProfile.confidenceLevel * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Brain className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <Progress value={behaviorProfile.confidenceLevel * 100} className="mt-3" />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Last Updated</p>
                        <p className="text-lg font-bold text-gray-900">
                          {behaviorProfile.lastUpdated.toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          {behaviorProfile.lastUpdated.toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Clock className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Behavioral Summary</CardTitle>
                  <CardDescription>Key behavioral patterns and indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Activity Patterns</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="text-sm">Active Hours</span>
                          <Badge variant="outline">
                            {behaviorProfile.timeBasedBehavior.activeHours[0]?.start} - {behaviorProfile.timeBasedBehavior.activeHours[0]?.end}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="text-sm">Device Consistency</span>
                          <Badge variant="outline">
                            {(behaviorProfile.loginPatterns[0]?.deviceConsistency * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="text-sm">Location Consistency</span>
                          <Badge variant="outline">
                            {(behaviorProfile.loginPatterns[0]?.locationConsistency * 100).toFixed(0)}%
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Transaction Patterns</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="text-sm">Typical Amount Range</span>
                          <Badge variant="outline">
                            RM {behaviorProfile.transactionPatterns[0]?.typicalAmounts[0]?.min} - {behaviorProfile.transactionPatterns[0]?.typicalAmounts[0]?.max}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="text-sm">Monthly Frequency</span>
                          <Badge variant="outline">
                            {behaviorProfile.transactionPatterns[0]?.frequency.monthly} transactions
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="text-sm">Preferred Method</span>
                          <Badge variant="outline">
                            {behaviorProfile.transactionPatterns[0]?.preferredMethods[0]?.method}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Login Patterns Tab */}
            <TabsContent value="login" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Login Pattern Analysis</CardTitle>
                  <CardDescription>User authentication and session behavior patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  {behaviorProfile.loginPatterns.map((pattern, index) => (
                    <div key={index} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">Typical Login Times</h4>
                          <div className="space-y-2">
                            {pattern.typicalLoginTimes.map((timeWindow, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{timeWindow.start} - {timeWindow.end}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">Authentication Methods</h4>
                          <div className="space-y-2">
                            {pattern.authenticationMethods.map((method, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                <span className="text-sm">{method}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Smartphone className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium">Device Consistency</span>
                          </div>
                          <p className="text-lg font-bold text-blue-900">
                            {(pattern.deviceConsistency * 100).toFixed(0)}%
                          </p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium">Location Consistency</span>
                          </div>
                          <p className="text-lg font-bold text-green-900">
                            {(pattern.locationConsistency * 100).toFixed(0)}%
                          </p>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium">Avg Session Duration</span>
                          </div>
                          <p className="text-lg font-bold text-purple-900">
                            {pattern.sessionDuration} min
                          </p>
                        </div>
                      </div>

                      {pattern.failurePatterns.length > 0 && (
                        <div className="border border-orange-200 bg-orange-50 p-4 rounded-lg">
                          <h4 className="font-medium text-orange-900 mb-2 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Authentication Failures
                          </h4>
                          <div className="space-y-2">
                            {pattern.failurePatterns.map((failure, idx) => (
                              <div key={idx} className="text-sm text-orange-800">
                                <span className="font-medium">{failure.failureType}:</span> {failure.frequency * 100}% failure rate
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction Behavior Analysis</CardTitle>
                  <CardDescription>Financial transaction patterns and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  {behaviorProfile.transactionPatterns.map((pattern, index) => (
                    <div key={index} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">Typical Amount Ranges</h4>
                          <div className="space-y-2">
                            {pattern.typicalAmounts.map((amount, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <span className="text-sm">
                                  {amount.currency} {amount.min} - {amount.max}
                                </span>
                                <Badge variant="outline">{amount.frequency} times</Badge>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">Preferred Payment Methods</h4>
                          <div className="space-y-2">
                            {pattern.preferredMethods.map((method, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <div className="flex items-center gap-2">
                                  <CreditCard className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm">{method.method}</span>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium">{method.frequency} uses</div>
                                  <div className="text-xs text-gray-500">Avg: RM {method.averageAmount}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 mb-1">Daily Frequency</div>
                          <div className="text-lg font-bold text-blue-900">{pattern.frequency.daily}</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-600 mb-1">Weekly Frequency</div>
                          <div className="text-lg font-bold text-green-900">{pattern.frequency.weekly}</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="text-sm text-purple-600 mb-1">Monthly Frequency</div>
                          <div className="text-lg font-bold text-purple-900">{pattern.frequency.monthly}</div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <div className="text-sm text-orange-600 mb-1">Variance</div>
                          <div className="text-lg font-bold text-orange-900">{(pattern.frequency.variance * 100).toFixed(0)}%</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Seasonal Variations</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {pattern.seasonalVariations.map((season, idx) => (
                            <div key={idx} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium capitalize">{season.season} Season</span>
                                <Badge variant={season.adjustmentFactor > 1 ? 'default' : 'secondary'}>
                                  {season.adjustmentFactor}x factor
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                {season.adjustmentFactor > 1 ? (
                                  <TrendingUp className="h-4 w-4 text-green-600" />
                                ) : (
                                  <TrendingDown className="h-4 w-4 text-red-600" />
                                )}
                                <span>Historical spending pattern</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Devices & Location Tab */}
            <TabsContent value="devices" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Device Fingerprints</CardTitle>
                    <CardDescription>Trusted devices and their characteristics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {behaviorProfile.deviceFingerprints.map((device, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium">{device.deviceId}</span>
                            <Badge 
                              variant="outline" 
                              className={getTrustLevelColor(device.trustLevel)}
                            >
                              Trust: {(device.trustLevel * 100).toFixed(0)}%
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div><span className="text-gray-600">Browser:</span> {device.browserFingerprint}</div>
                            <div><span className="text-gray-600">Resolution:</span> {device.screenResolution}</div>
                            <div><span className="text-gray-600">Timezone:</span> {device.timezone}</div>
                            <div><span className="text-gray-600">Language:</span> {device.language}</div>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            Last seen: {device.lastSeen.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Location Patterns</CardTitle>
                    <CardDescription>Frequent locations and access patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {behaviorProfile.locationHistory.map((location, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">
                                {location.coordinates.latitude.toFixed(4)}, {location.coordinates.longitude.toFixed(4)}
                              </span>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={getTrustLevelColor(location.trustLevel)}
                            >
                              Trust: {(location.trustLevel * 100).toFixed(0)}%
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Frequency:</span> {location.frequency} visits
                            </div>
                            <div>
                              <span className="text-gray-600">Accuracy:</span> ±{location.coordinates.accuracy}m
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="text-sm text-gray-600 mb-1">Active hours:</div>
                            <div className="flex flex-wrap gap-1">
                              {location.timeOfDay.map((time, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {time.start} - {time.end}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            Last seen: {location.lastSeen.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Biometrics Tab */}
            <TabsContent value="biometrics" className="space-y-6">
              {biometrics && (
                <Card>
                  <CardHeader>
                    <CardTitle>Behavioral Biometrics</CardTitle>
                    <CardDescription>Advanced behavioral pattern recognition</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">Biometric Signatures</h4>
                        <div className="space-y-3">
                          {biometrics.biometricSignatures.map((signature, index) => (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium capitalize">
                                  {signature.signatureType.replace('_', ' ')}
                                </span>
                                <Badge variant="outline">
                                  {(signature.confidence * 100).toFixed(0)}% confidence
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-600">
                                Last updated: {signature.lastUpdated.toLocaleDateString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900">Detection System</h4>
                        <div className="space-y-3">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Detector Type</span>
                              <Badge variant="outline">{biometrics.deviationDetection.detectorType}</Badge>
                            </div>
                            <div className="text-sm text-gray-600">
                              Sensitivity: {(biometrics.deviationDetection.sensitivity * 100).toFixed(0)}%
                            </div>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm font-medium mb-2">Adaptive Learning</div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Learning Type:</span>
                                <span className="capitalize">{biometrics.adaptiveLearning.learningType}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Adaptation Rate:</span>
                                <span>{(biometrics.adaptiveLearning.adaptationRate * 100).toFixed(0)}%</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Model Accuracy:</span>
                                <span>{(biometrics.adaptiveLearning.performanceMetrics.accuracy * 100).toFixed(1)}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No behavioral data available for this user.</p>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={loadBehaviorData} disabled={loading}>
            Refresh Data
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
