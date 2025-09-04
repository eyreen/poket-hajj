'use client'

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PackageCardProps } from '@/types'
import { formatCurrency, cn } from '@/lib/utils'
import { 
  Star, 
  MapPin, 
  Plane, 
  Clock, 
  Users,
  Eye,
  Heart,
} from 'lucide-react'
import Image from 'next/image'

export function PackageCard({ 
  packageData, 
  onSelect, 
  onViewDetails, 
  className 
}: PackageCardProps) {
  const {
    name,
    provider,
    price,
    matchScore,
    imageUrl,
    highlights,
    hotelRating,
    airline,
    distanceFromHaram,
    duration,
    category,
  } = packageData

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'luxury':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'premium':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'standard':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'economy':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50'
    if (score >= 80) return 'text-blue-600 bg-blue-50'
    if (score >= 70) return 'text-yellow-600 bg-yellow-50'
    return 'text-gray-600 bg-gray-50'
  }

  return (
    <Card className={cn('overflow-hidden transition-all duration-200 hover:shadow-lg', className)}>
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Match Score Badge */}
        <div className={cn(
          'absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium',
          getMatchScoreColor(matchScore)
        )}>
          {matchScore}% Match
        </div>

        {/* Category Badge */}
        <Badge 
          className={cn(
            'absolute top-3 left-3 text-xs font-medium border',
            getCategoryColor(category)
          )}
          variant="outline"
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                {name}
              </h3>
              <p className="text-sm text-gray-600">{provider}</p>
            </div>
            <Button variant="ghost" size="sm" className="h-auto p-1">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(price)}
            </span>
            <span className="text-sm text-gray-500">per person</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-gray-600">
              {hotelRating} Star Hotel
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">
              {distanceFromHaram}m from Haram
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Plane className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 line-clamp-1">
              {airline}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">
              {duration} days
            </span>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Highlights</h4>
          <div className="flex flex-wrap gap-1">
            {highlights.slice(0, 3).map((highlight, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs bg-gray-100 text-gray-700 border-0"
              >
                {highlight}
              </Badge>
            ))}
            {highlights.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 border-0">
                +{highlights.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onViewDetails?.(packageData)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button 
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={() => onSelect?.(packageData)}
          >
            <Users className="h-4 w-4 mr-2" />
            Select Package
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
