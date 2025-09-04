'use client'

import React from 'react'
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ChartData {
  name: string
  value: number
  color?: string
}

interface SavingsProgressChartProps {
  current: number
  target: number
  title?: string
}

export function SavingsProgressChart({ current, target, title = 'Savings Progress' }: SavingsProgressChartProps) {
  const percentage = Math.round((current / target) * 100)
  const data = [
    { name: 'Saved', value: current, color: '#16a34a' },
    { name: 'Remaining', value: target - current, color: '#e5e7eb' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold text-gray-900">{percentage}%</div>
            <div className="text-sm text-gray-600">of target reached</div>
            <div className="text-xs text-gray-500 mt-1">
              RM {current.toLocaleString()} / RM {target.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface QueueTimelineChartProps {
  currentPosition: number
  totalQueue: number
  estimatedYear: number
  title?: string
}

export function QueueTimelineChart({ 
  currentPosition, 
  totalQueue, 
  estimatedYear, 
  title = 'Queue Timeline' 
}: QueueTimelineChartProps) {
  const currentYear = new Date().getFullYear()
  const yearsToWait = estimatedYear - currentYear
  
  const data = Array.from({ length: Math.min(yearsToWait + 2, 10) }, (_, i) => {
    const year = currentYear + i
    const isCurrentPosition = year === estimatedYear
    return {
      year: year.toString(),
      position: isCurrentPosition ? currentPosition : null,
      total: totalQueue,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="year" 
                fontSize={12}
                tick={{ fill: '#6b7280' }}
              />
              <YAxis hide />
              <Tooltip 
                formatter={(value: any, name: string) => [
                  name === 'position' ? `Position: ${value}` : `Total: ${value}`,
                  ''
                ]}
                labelStyle={{ color: '#374151' }}
              />
              <Bar 
                dataKey="position" 
                fill="#16a34a" 
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">
          Estimated departure: {estimatedYear}
        </div>
      </CardContent>
    </Card>
  )
}

interface SavingsTrendChartProps {
  data: Array<{ month: string; amount: number }>
  title?: string
}

export function SavingsTrendChart({ data, title = 'Savings Trend' }: SavingsTrendChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="month" 
                fontSize={12}
                tick={{ fill: '#6b7280' }}
              />
              <YAxis 
                fontSize={12}
                tick={{ fill: '#6b7280' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: number) => [`RM ${value.toLocaleString()}`, 'Amount']}
                labelStyle={{ color: '#374151' }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#16a34a"
                fill="#16a34a"
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

interface PackageDistributionChartProps {
  data: ChartData[]
  title?: string
}

export function PackageDistributionChart({ data, title = 'Package Distribution' }: PackageDistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || '#8884d8'} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [value, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color || '#8884d8' }}
                />
                <span className="text-gray-600">{item.name}</span>
                <span className="font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
