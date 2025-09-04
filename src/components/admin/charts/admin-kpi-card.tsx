"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AdminKpiCardProps } from "@/types";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function AdminKpiCard({ 
  title, 
  value, 
  change, 
  icon, 
  actionButton, 
  status = 'normal' 
}: AdminKpiCardProps) {
  const getTrendIcon = () => {
    if (!change) return null;
    
    switch (change.trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4" />;
      case 'down':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getTrendColor = () => {
    if (!change) return '';
    
    switch (change.trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'warning':
        return 'border-orange-200 bg-orange-50';
      case 'critical':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const getStatusIndicator = () => {
    switch (status) {
      case 'warning':
        return <div className="w-2 h-2 bg-orange-500 rounded-full" />;
      case 'critical':
        return <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />;
      default:
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
    }
  };

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", getStatusColor())}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className={cn(
                "p-2 rounded-lg",
                status === 'critical' ? 'bg-red-100 text-red-600' :
                status === 'warning' ? 'bg-orange-100 text-orange-600' :
                'bg-blue-100 text-blue-600'
              )}>
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-600">{title}</h3>
              {getStatusIndicator()}
            </div>
          </div>
          {actionButton && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={actionButton.onClick}
              className="text-xs"
            >
              {actionButton.label}
            </Button>
          )}
        </div>

        {/* Value */}
        <div className="space-y-2">
          <div className="text-3xl font-bold text-gray-900">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          
          {/* Change Indicator */}
          {change && (
            <div className={cn("flex items-center space-x-1 text-sm", getTrendColor())}>
              {getTrendIcon()}
              <span className="font-medium">
                {change.value > 0 ? '+' : ''}{change.value}%
              </span>
              <span className="text-gray-500">vs {change.period}</span>
            </div>
          )}
        </div>

        {/* Status Badge */}
        {status !== 'normal' && (
          <div className="mt-4">
            <Badge 
              variant={status === 'critical' ? 'destructive' : 'secondary'}
              className="text-xs"
            >
              {status === 'critical' ? 'Requires Attention' : 'Monitor'}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
