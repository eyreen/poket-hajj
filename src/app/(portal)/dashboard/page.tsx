'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  Package,
  Calendar,
  ArrowRight,
  Plus,
  FileText,
  Phone,
  Bot,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { KpiCard } from '@/components/hajj/kpi-card'
import { SavingsProgressChart } from '@/components/charts'
import { ProfileCompletionModal } from '@/components/hajj/profile-completion-modal'
import { TransferModal, AutoDepositModal } from '@/components/hajj/financial-modals'
import { AiAssistantModal } from '@/components/hajj/ai-assistant-modal'
import { fetchDashboardData } from '@/lib/api'
import { formatCurrency, formatNumber, formatRelativeTime, calculatePercentage } from '@/lib/utils'
import { useAuthStore } from '@/lib/store'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [transferModalOpen, setTransferModalOpen] = useState(false)
  const [autoDepositModalOpen, setAutoDepositModalOpen] = useState(false)
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false)

  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
  })

  const handleProfileComplete = () => {
    console.log('Profile completed!')
    // Refresh data or show success message
  }
  const handleTransferComplete = (transferData: unknown) => {
    console.log('Transfer completed:', transferData)
    // Handle transfer completion
  }

  const handleAutoDepositSetup = (setupData: unknown) => {
    console.log('Auto-deposit setup:', setupData)
    // Handle auto-deposit setup
  }

  if (isLoading) {
    return <DashboardSkeleton />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 mb-2">Error loading dashboard</div>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  const { queuePosition, savings, recentActivity } = dashboardData!

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">
            Selamat Datang, Ahmad Abdullah!
          </h1>
          <p className="text-green-100 mb-4">
            Your journey to Hajj made simple, smart & secure.
          </p>          <Button variant="secondary" className="bg-white text-green-700 hover:bg-gray-50" onClick={() => setProfileModalOpen(true)}>
            Complete Your Profile
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="absolute right-0 top-0 opacity-10">
          <div className="h-32 w-32 rounded-full bg-white transform translate-x-8 -translate-y-8" />
          <div className="h-24 w-24 rounded-full bg-white transform translate-x-16 translate-y-4" />
        </div>
      </div>

      {/* Key Status Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          title="Hajj Registration Status"
          value={`#${formatNumber(queuePosition.current)} / ${formatNumber(queuePosition.total)}`}
          icon={<Users className="h-4 w-4" />}
          progress={{
            value: queuePosition.current,
            max: queuePosition.total,
            showPercentage: true,
          }}
          trend={{
            value: -150,
            label: "spots moved up",
            direction: "up",
          }}
          onClick={() => window.location.href = '/my-journey'}
        />

        <KpiCard
          title="Hajj Savings Goal"
          value={formatCurrency(savings.current)}
          icon={<CreditCard className="h-4 w-4" />}
          progress={{
            value: savings.current,
            max: savings.target,
            showPercentage: true,
          }}
          trend={{
            value: calculatePercentage(savings.current, savings.target),
            label: "of target",
            direction: savings.isOnTrack ? "up" : "neutral",
          }}
          onClick={() => window.location.href = '/finances'}
        />

        <div className="md:col-span-2 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Package className="h-4 w-4 mr-2" />
                Next Steps
              </CardTitle>
            </CardHeader>            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline" onClick={() => setTransferModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Top Up Savings
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => setProfileModalOpen(true)}>
                <FileText className="h-4 w-4 mr-2" />
                Update Profile
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => window.location.href = '/packages'}>
                <Package className="h-4 w-4 mr-2" />
                Explore Packages
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => setAiAssistantOpen(true)}>
                <Bot className="h-4 w-4 mr-2" />
                AI Assistant
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`p-2 rounded-full ${getActivityIconBg(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900">
                        {activity.title}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {activity.description}
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        {formatRelativeTime(activity.timestamp)}
                      </div>
                    </div>
                    {activity.amount && (
                      <div className={`text-sm font-medium ${
                        activity.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {activity.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(activity.amount))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Savings Progress Chart */}
        <div className="lg:col-span-1">
          <SavingsProgressChart
            current={savings.current}
            target={savings.target}
            title="Savings Progress"
          />
          
          {/* Estimated Timeline */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Estimated Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {queuePosition.estimatedYear}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  ± {queuePosition.estimatedYearRange} years
                </div>
                <div className="text-xs text-gray-500">
                  Based on your current position and savings rate
                </div>
              </div>
            </CardContent>
          </Card>        </div>
      </div>

      {/* Modals */}
      <ProfileCompletionModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onComplete={handleProfileComplete}
      />      <TransferModal
        isOpen={transferModalOpen}
        onClose={() => setTransferModalOpen(false)}
        currentBalance={savings.current}
        onTransferComplete={handleTransferComplete}
      />

      <AutoDepositModal
        isOpen={autoDepositModalOpen}
        onClose={() => setAutoDepositModalOpen(false)}
        onSetupComplete={handleAutoDepositSetup}
      />

      <AiAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        userContext={{
          queuePosition: queuePosition.current,
          savingsAmount: savings.current,
          profileCompleteness: user?.profileComplete ? 100 : 70,
        }}
      />
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Banner Skeleton */}
      <Skeleton className="h-32 w-full rounded-lg" />
      
      {/* Cards Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
      
      {/* Content Skeleton */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Skeleton className="h-96 rounded-lg" />
        </div>
        <Skeleton className="h-96 rounded-lg" />
      </div>
    </div>
  )
}

function getActivityIcon(type: string) {
  switch (type) {
    case 'savings':
      return <CreditCard className="h-4 w-4 text-green-600" />
    case 'queue':
      return <Users className="h-4 w-4 text-blue-600" />
    case 'package':
      return <Package className="h-4 w-4 text-purple-600" />
    case 'profile':
      return <FileText className="h-4 w-4 text-orange-600" />
    default:
      return <FileText className="h-4 w-4 text-gray-600" />
  }
}

function getActivityIconBg(type: string) {
  switch (type) {
    case 'savings':
      return 'bg-green-100'
    case 'queue':
      return 'bg-blue-100'
    case 'package':
      return 'bg-purple-100'
    case 'profile':
      return 'bg-orange-100'
    default:
      return 'bg-gray-100'
  }
}
