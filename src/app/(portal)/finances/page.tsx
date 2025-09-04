'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  CreditCard, 
  TrendingUp, 
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  Target,
  Plus,
  Wallet,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { KpiCard } from '@/components/hajj/kpi-card'
import { DataTable } from '@/components/hajj/data-table'
import { SavingsProgressChart, SavingsTrendChart } from '@/components/charts'
import { fetchFinanceData } from '@/lib/api'
import { formatCurrency, formatDate, calculatePercentage } from '@/lib/utils'
import { DataTableColumn, Transaction } from '@/types'

export default function FinancesPage() {
  const { data: financeData, isLoading, error } = useQuery({
    queryKey: ['finances'],
    queryFn: fetchFinanceData,
  })

  if (isLoading) {
    return <FinancesSkeleton />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 mb-2">Error loading finance data</div>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  const { tabungHajiAccount, transactions, savingsGoal } = financeData!

  // Mock savings trend data
  const savingsTrendData = [
    { month: 'Jan', amount: 20000 },
    { month: 'Feb', amount: 20500 },
    { month: 'Mar', amount: 21000 },
    { month: 'Apr', amount: 21800 },
    { month: 'May', amount: 22500 },
    { month: 'Jun', amount: 23200 },
    { month: 'Jul', amount: 23700 },
    { month: 'Aug', amount: 24000 },
    { month: 'Sep', amount: 24500 },
  ]

  const transactionColumns: DataTableColumn<Transaction>[] = [
    {
      key: 'date',
      header: 'Date',
      cell: (value) => formatDate(value),
      className: 'font-medium',
    },
    {
      key: 'description',
      header: 'Description',
      className: 'max-w-xs',
    },
    {
      key: 'amount',
      header: 'Amount',
      cell: (value) => (
        <span className={value >= 0 ? 'text-green-600' : 'text-red-600'}>
          {value >= 0 ? '+' : ''}{formatCurrency(value)}
        </span>
      ),
      className: 'text-right font-medium',
    },
    {
      key: 'status',
      header: 'Status',
      cell: (value) => (
        <Badge 
          variant={value === 'completed' ? 'default' : value === 'pending' ? 'secondary' : 'destructive'}
          className="capitalize"
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'reference',
      header: 'Reference',
      cell: (value) => (
        <span className="text-xs text-gray-500 font-mono">{value}</span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">My Hajj Finances</h1>
        <p className="text-gray-600">
          Manage your Hajj savings, track progress, and handle payments
        </p>
      </div>

      {/* Account Summary */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Tabung Haji Balance"
          value={formatCurrency(tabungHajiAccount.balance)}
          icon={<Wallet className="h-4 w-4" />}
          trend={{
            value: 500,
            label: "this month",
            direction: "up",
          }}
        />

        <KpiCard
          title="Monthly Contribution"
          value={formatCurrency(tabungHajiAccount.monthlyContribution)}
          icon={<CreditCard className="h-4 w-4" />}
        />

        <KpiCard
          title="Savings Progress"
          value={`${calculatePercentage(savingsGoal.current, savingsGoal.target)}%`}
          icon={<Target className="h-4 w-4" />}
          progress={{
            value: savingsGoal.current,
            max: savingsGoal.target,
            showPercentage: false,
          }}
        />

        <KpiCard
          title="Target Year"
          value={savingsGoal.targetYear.toString()}
          icon={<Clock className="h-4 w-4" />}
          trend={{
            value: 2,
            label: "years to go",
            direction: "neutral",
          }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Savings Goal Tracker */}
        <div className="lg:col-span-1">
          <SavingsProgressChart
            current={savingsGoal.current}
            target={savingsGoal.target}
            title="Savings Goal Tracker"
          />

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Transfer to TH Account
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Pay Pilgrimage Fees
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Target className="h-4 w-4 mr-2" />
                Setup Auto-Deposit
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Statement
              </Button>
            </CardContent>
          </Card>

          {/* Account Details */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Account Number</span>
                <span className="font-mono">{tabungHajiAccount.accountNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Monthly Target</span>
                <span className="font-medium">{formatCurrency(savingsGoal.monthlyTarget)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Remaining to Goal</span>
                <span className="font-medium text-orange-600">
                  {formatCurrency(savingsGoal.target - savingsGoal.current)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Savings Trend and Transactions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Savings Trend Chart */}
          <SavingsTrendChart
            data={savingsTrendData}
            title="Savings Trend (Last 9 Months)"
          />

          {/* Transaction History */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Transaction History</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                data={transactions}
                columns={transactionColumns}
                emptyMessage="No transactions found"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Goal Achievement Message */}
      {calculatePercentage(savingsGoal.current, savingsGoal.target) >= 50 && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <div className="font-medium text-green-900">Great Progress!</div>
                <div className="text-green-800 text-sm">
                  You're more than halfway to your Hajj savings goal. Keep up the excellent work!
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function FinancesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-96 rounded-lg" />
        <div className="lg:col-span-2">
          <Skeleton className="h-96 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
