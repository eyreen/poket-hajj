'use client'

import React, { useState } from 'react'
import { 
  X, 
  Star, 
  MapPin, 
  Plane, 
  Clock, 
  Users,
  Calendar,
  Wifi,
  Car,
  Utensils,
  Shield,
  CheckCircle,
  ArrowRight,
  Heart,
  Share2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { formatCurrency } from '@/lib/utils'
import { HajjPackage } from '@/types'
import Image from 'next/image'

interface PackageDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  packageData: HajjPackage | null
  onBookNow: (pkg: HajjPackage) => void
}

export function PackageDetailsModal({ 
  isOpen, 
  onClose, 
  packageData,
  onBookNow 
}: PackageDetailsModalProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  if (!packageData) return null

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
    inclusions,
    category,
  } = packageData

  const itinerary = [
    { day: 1, title: "Departure from Malaysia", description: "Flight to Jeddah, transfer to Medina" },
    { day: 2, title: "Medina Visit", description: "Ziyarah and prayers at Masjid Nabawi" },
    { day: 5, title: "Travel to Makkah", description: "Check-in to Makkah hotel, perform Umrah" },
    { day: 8, title: "Hajj Rituals Begin", description: "Departure to Mina for Hajj" },
    { day: 9, title: "Arafah", description: "Wuquf at Arafah" },
    { day: 10, title: "Muzdalifah & Mina", description: "Collect pebbles, perform Ramy" },
    { day: 13, title: "Farewell Tawaf", description: "Final rituals and departure preparation" },
    { day: 14, title: "Return to Malaysia", description: "Flight back to Kuala Lumpur" },
  ]

  const reviews = [
    {
      id: 1,
      name: "Ahmad Rahman",
      rating: 5,
      comment: "Excellent service and very organized. The guides were knowledgeable and helpful throughout the journey.",
      date: "2024-03-15",
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      rating: 4,
      comment: "Great package overall. Hotel was close to Haram and food was good. Would recommend!",
      date: "2024-02-20",
    },
    {
      id: 3,
      name: "Mohammed Ali",
      rating: 5,
      comment: "Professional team, comfortable accommodation, and seamless experience. Worth every ringgit!",
      date: "2024-01-10",
    },
  ]

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'luxury': return 'bg-purple-100 text-purple-800'
      case 'premium': return 'bg-blue-100 text-blue-800'
      case 'standard': return 'bg-green-100 text-green-800'
      case 'economy': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    // TODO: Implement favorite functionality
  }

  const handleShare = () => {
    // TODO: Implement share functionality
    navigator.share?.({
      title: name,
      text: `Check out this Hajj package: ${name} by ${provider}`,
      url: window.location.href,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span>{name}</span>
              <Badge className={getCategoryColor(category)}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handleFavorite}>
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Image and Basic Info */}
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
            <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-medium">
              {matchScore}% Match
            </div>
          </div>

          {/* Price and Provider */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {formatCurrency(price)}
              </div>
              <div className="text-sm text-gray-600">per person • by {provider}</div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">4.8 (124 reviews)</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">{hotelRating} Star Hotel</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{distanceFromHaram}m from Haram</span>
            </div>
            <div className="flex items-center space-x-2">
              <Plane className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{airline}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{duration} days</span>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Package Highlights</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Accommodation Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Hotel Rating:</span>
                      <span className="text-sm font-medium">{hotelRating} Stars</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Distance from Haram:</span>
                      <span className="text-sm font-medium">{distanceFromHaram}m walking</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Room Type:</span>
                      <span className="text-sm font-medium">Quad Sharing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="itinerary" className="space-y-4">
              <div className="space-y-3">
                {itinerary.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-medium">
                          {item.day}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="inclusions" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3 text-green-700">✓ Included</h3>
                    <div className="space-y-2">
                      {inclusions.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Experienced Hajj Guide</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Travel Insurance</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3 text-red-700">✗ Not Included</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <X className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Personal expenses</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <X className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Additional tours</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <X className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Excess baggage</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <X className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Room service charges</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium">{review.name}</span>
                            <div className="flex items-center">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{review.comment}</p>
                        </div>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Book Now Button */}
          <div className="sticky bottom-0 bg-white border-t pt-4">
            <Button 
              onClick={() => onBookNow(packageData)}
              className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
            >
              Book This Package
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
