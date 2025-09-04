'use client'

import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  Package, 
  Filter, 
  Search, 
  Star,
  MapPin,
  Plane,
  SlidersHorizontal,
  Grid3X3,
  List,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { PackageCard } from '@/components/hajj/package-card'
import { PackageDetailsModal } from '@/components/hajj/package-details-modal'
import { PackageBookingModal } from '@/components/hajj/package-booking-modal'
import { fetchPackages } from '@/lib/api'
import { useFiltersStore } from '@/lib/store'
import { debounce } from '@/lib/utils'
import { HajjPackage, PackageFilters } from '@/types'

export default function PackagesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<HajjPackage | null>(null)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const { packageFilters, updateFilters, resetFilters } = useFiltersStore()

  const { data: packagesData, isLoading, error, refetch } = useQuery({
    queryKey: ['packages', packageFilters, searchQuery],
    queryFn: () => fetchPackages(packageFilters, 1, 20),
  })

  // Debounced search
  const debouncedSearch = debounce((query: string) => {
    setSearchQuery(query)
  }, 300)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }

  const handlePackageSelect = (pkg: HajjPackage) => {
    setSelectedPackage(pkg)
    setBookingModalOpen(true)
  }

  const handleViewDetails = (pkg: HajjPackage) => {
    setSelectedPackage(pkg)
    setDetailsModalOpen(true)
  }

  const handleBookingComplete = (bookingData: unknown) => {
    console.log('Booking completed:', bookingData)
    setBookingModalOpen(false)
    setSelectedPackage(null)
    // Show success message or redirect
  }

  const handleBookFromDetails = (pkg: HajjPackage) => {
    setDetailsModalOpen(false)
    setSelectedPackage(pkg)
    setBookingModalOpen(true)
  }

  if (isLoading) {
    return <PackagesSkeleton />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 mb-2">Error loading packages</div>
          <Button variant="outline" onClick={() => refetch()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  const packages = packagesData?.data || []

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Explore Hajj Packages</h1>
        <p className="text-gray-600">
          Curated for you by AI, based on your profile & budget
        </p>
      </div>

      {/* Search and Filters Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search packages..."
                className="pl-10"
                onChange={handleSearch}
              />
            </div>

            {/* Filter Actions */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <Button
                variant="outline"
                onClick={resetFilters}
                size="sm"
              >
                Reset
              </Button>

              {/* View Mode Toggle */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(packageFilters.hotelRating.length > 0 || 
            packageFilters.airline.length > 0 || 
            packageFilters.category.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">Active filters:</span>
              {packageFilters.hotelRating.map(rating => (
                <Badge key={rating} variant="secondary" className="text-xs">
                  {rating} Star
                </Badge>
              ))}
              {packageFilters.airline.map(airline => (
                <Badge key={airline} variant="secondary" className="text-xs">
                  {airline}
                </Badge>
              ))}
              {packageFilters.category.map(category => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filters Panel */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Filter Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <PackageFiltersComponent 
              filters={packageFilters}
              onFiltersChange={updateFilters}
            />
          </CardContent>
        </Card>
      )}

      {/* Results Header */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {packages.length} packages
          {packagesData?.pagination.total && (
            <span> of {packagesData.pagination.total} total</span>
          )}
        </div>
      </div>

      {/* Packages Grid/List */}
      {packages.length === 0 ? (
        <Card className="text-center p-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No packages found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or search criteria
          </p>
          <Button variant="outline" onClick={resetFilters}>
            Clear Filters
          </Button>
        </Card>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' 
            : 'space-y-4'
        }>
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              packageData={pkg}
              onSelect={handlePackageSelect}
              onViewDetails={handleViewDetails}
              className={viewMode === 'list' ? 'flex flex-row' : ''}
            />
          ))}
        </div>
      )}

      {/* Load More */}
      {packagesData?.pagination && 
       packagesData.pagination.page < packagesData.pagination.totalPages && (
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Packages
          </Button>
        </div>
      )}
    </div>
  )
}

interface PackageFiltersComponentProps {
  filters: PackageFilters
  onFiltersChange: (filters: Partial<PackageFilters>) => void
}

function PackageFiltersComponent({ filters, onFiltersChange }: PackageFiltersComponentProps) {
  const hotelRatings = [3, 4, 5]
  const airlines = ['Malaysia Airlines', 'AirAsia X', 'Malindo Air', 'Singapore Airlines']
  const categories = ['economy', 'standard', 'premium', 'luxury']

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range (RM)
        </label>
        <div className="space-y-2">
          <Input
            type="number"
            placeholder="Min price"
            value={filters.priceRange[0]}
            onChange={(e) => onFiltersChange({
              priceRange: [Number(e.target.value), filters.priceRange[1]]
            })}
          />
          <Input
            type="number"
            placeholder="Max price"
            value={filters.priceRange[1]}
            onChange={(e) => onFiltersChange({
              priceRange: [filters.priceRange[0], Number(e.target.value)]
            })}
          />
        </div>
      </div>

      {/* Hotel Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hotel Rating
        </label>
        <div className="space-y-2">
          {hotelRatings.map(rating => (
            <label key={rating} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.hotelRating.includes(rating)}
                onChange={(e) => {
                  const newRatings = e.target.checked
                    ? [...filters.hotelRating, rating]
                    : filters.hotelRating.filter(r => r !== rating)
                  onFiltersChange({ hotelRating: newRatings })
                }}
                className="mr-2"
              />
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm">{rating} Star</span>
            </label>
          ))}
        </div>
      </div>

      {/* Airlines */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Airlines
        </label>
        <div className="space-y-2">
          {airlines.map(airline => (
            <label key={airline} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.airline.includes(airline)}
                onChange={(e) => {
                  const newAirlines = e.target.checked
                    ? [...filters.airline, airline]
                    : filters.airline.filter(a => a !== airline)
                  onFiltersChange({ airline: newAirlines })
                }}
                className="mr-2"
              />
              <Plane className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm">{airline}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...filters.category, category]
                    : filters.category.filter(c => c !== category)
                  onFiltersChange({ category: newCategories })
                }}
                className="mr-2"
              />
              <span className="text-sm capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

function PackagesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>
      
      <Skeleton className="h-20 w-full" />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-96 rounded-lg" />
        ))}
      </div>
    </div>
  )
}
