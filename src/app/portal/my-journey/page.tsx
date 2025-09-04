'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Users, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  Bot,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { KpiCard } from '@/components/hajj/kpi-card'
import { AiAssistantModal } from '@/components/hajj/ai-assistant-modal'
import { QueueTimelineChart } from '@/components/charts'
import { fetchJourneyData } from '@/lib/api'
import { formatNumber, calculatePercentage } from '@/lib/utils'

export default function MyJourneyPage() {
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false)
  
  const { data: journeyData, isLoading, error } = useQuery({
    queryKey: ['journey'],
    queryFn: fetchJourneyData,
  })

  if (isLoading) {
    return <JourneySkeleton />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 mb-2">Error loading journey data</div>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  const { queuePosition, aiInsights, profileCompleteness } = journeyData!

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">My Hajj Journey</h1>
        <p className="text-gray-600">
          Track your progress and get AI-powered insights for your Hajj pilgrimage
        </p>
      </div>

      {/* Main Summary */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          title="Current Queue Position"
          value={`#${formatNumber(queuePosition.current)}`}
          icon={<Users className="h-4 w-4" />}
          progress={{
            value: queuePosition.total - queuePosition.current,
            max: queuePosition.total,
            showPercentage: true,
          }}
        />

        <KpiCard
          title="Estimated Departure Year"
          value={queuePosition.estimatedYear.toString()}
          icon={<Calendar className="h-4 w-4" />}
          trend={{
            value: queuePosition.estimatedYearRange,
            label: "year range",
            direction: "neutral",
          }}
        />

        <KpiCard
          title="Profile Completeness"
          value={`${profileCompleteness.score}%`}
          icon={<CheckCircle className="h-4 w-4" />}
          progress={{
            value: profileCompleteness.score,
            max: 100,
            showPercentage: false,
          }}
          onClick={() => {/* Navigate to profile */}}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* AI Insights */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personalized Forecast */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2 text-blue-600" />
                Your Personalized Forecast
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Timeline Visualization */}
              <QueueTimelineChart
                currentPosition={queuePosition.current}
                totalQueue={queuePosition.total}
                estimatedYear={queuePosition.estimatedYear}
              />

              {/* Key Influencers */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Your forecast is based on:</h4>
                <div className="space-y-3">
                  {aiInsights.keyInfluencers.map((influencer, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50"
                    >
                      <div className={`p-1 rounded-full ${getInfluencerBg(influencer.effect)}`}>
                        {getInfluencerIcon(influencer.effect)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {influencer.factor}
                        </div>
                        <div className="text-sm text-gray-600">
                          {influencer.description}
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${getInfluencerColor(influencer.effect)}`}>
                        {influencer.effect === 'positive' ? '+' : influencer.effect === 'negative' ? '-' : ''}
                        {Math.abs(influencer.impact)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-blue-900 mb-1">AI Recommendation</div>
                    <div className="text-blue-800 text-sm">{aiInsights.recommendation}</div>
                  </div>
                </div>
              </div>              <Button className="w-full" variant="outline" onClick={() => setAiAssistantOpen(true)}>
                <Bot className="h-4 w-4 mr-2" />
                How can I improve my position?
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Profile Completeness */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile Completeness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress Circle */}
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - profileCompleteness.score / 100)}`}
                      className="text-green-600"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {profileCompleteness.score}%
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-2">Complete</div>
              </div>

              {/* Missing Items */}
              <div>
                <div className="text-sm font-medium text-gray-900 mb-2">
                  Missing Information:
                </div>
                <div className="space-y-2">
                  {profileCompleteness.missingItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-orange-50 border border-orange-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                        <span className="text-sm text-orange-800">{item}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-orange-600" />
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full">
                Complete My Profile
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              {/* Boost Message */}
              <div className="text-xs text-gray-500 text-center bg-gray-50 p-3 rounded-lg">
                💡 Boost your application! A complete profile improves our estimation accuracy.
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle className="h-4 w-4 mr-2" />
                Upload Health Certificate
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Add Emergency Contact
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                Schedule Medical Checkup
              </Button>
            </CardContent>
          </Card>        </div>
      </div>

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        userContext={{
          queuePosition: queuePosition.current,
          savingsAmount: 25000, // This would come from actual savings data
          profileCompleteness: profileCompleteness.score,
        }}
      />
    </div>
  )
}

function JourneySkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Skeleton className="h-96 rounded-lg" />
        </div>
        <Skeleton className="h-96 rounded-lg" />
      </div>
    </div>
  )
}

function getInfluencerIcon(effect: string) {
  switch (effect) {
    case 'positive':
      return <TrendingUp className="h-4 w-4 text-green-600" />
    case 'negative':
      return <TrendingDown className="h-4 w-4 text-red-600" />
    default:
      return <Minus className="h-4 w-4 text-gray-500" />
  }
}

function getInfluencerBg(effect: string) {
  switch (effect) {
    case 'positive':
      return 'bg-green-100'
    case 'negative':
      return 'bg-red-100'
    default:
      return 'bg-gray-100'
  }
}

function getInfluencerColor(effect: string) {
  switch (effect) {
    case 'positive':
      return 'text-green-600'
    case 'negative':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}
