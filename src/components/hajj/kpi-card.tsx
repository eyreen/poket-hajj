'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { KpiCardProps } from '@/types'
import { cn, formatCurrency, formatNumber, calculatePercentage } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export function KpiCard({ 
  title, 
  value, 
  icon, 
  trend, 
  progress, 
  className, 
  onClick 
}: KpiCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val > 1000) {
        return formatNumber(val)
      }
      return val.toString()
    }
    return val
  }

  const getTrendIcon = () => {
    if (!trend) return null
    
    switch (trend.direction) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = () => {
    if (!trend) return 'text-gray-600'
    
    switch (trend.direction) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <Card 
      className={cn(
        'transition-all duration-200 hover:shadow-md', 
        onClick && 'cursor-pointer hover:shadow-lg',
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-4 w-4 text-gray-400">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          {/* Main Value */}
          <div className="flex items-baseline space-x-2">
            <div className="text-2xl font-bold text-gray-900">
              {formatValue(value)}
            </div>
            {trend && (
              <div className={cn('flex items-center space-x-1 text-sm', getTrendColor())}>
                {getTrendIcon()}
                <span>{trend.value > 0 ? '+' : ''}{trend.value}</span>
                {trend.label && <span className="text-xs text-gray-500">({trend.label})</span>}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {progress && (
            <div className="space-y-2">
              <Progress 
                value={calculatePercentage(progress.value, progress.max)} 
                className="w-full h-2"
              />
              {progress.showPercentage && (
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{formatValue(progress.value)}</span>
                  <span>{calculatePercentage(progress.value, progress.max)}%</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
