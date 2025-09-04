import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { 
  DashboardData, 
  JourneyData, 
  FinanceData, 
  HajjPackage, 
  ApiResponse, 
  PaginatedResponse,
  PackageFilters,
  User
} from '@/types'

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Mock data for prototype (replace with real API calls later)
const mockDashboardData: DashboardData = {
  queuePosition: {
    current: 153238,
    total: 1000000,
    estimatedYear: 2040,
    estimatedYearRange: 2,
  },
  savings: {
    current: 24500,
    target: 50000,
    monthlyTarget: 500,
    isOnTrack: true,
  },
  recentActivity: [
    {
      id: '1',
      type: 'savings',
      title: 'Savings Transfer Successful',
      description: 'Your savings transfer of RM500 was successful.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      amount: 500,
    },
    {
      id: '2',
      type: 'queue',
      title: 'Queue Position Updated',
      description: 'Your queue position moved up by 150 spots.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      type: 'package',
      title: 'New Package Available',
      description: 'A new package matching your profile is available.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
}

const mockJourneyData: JourneyData = {
  queuePosition: {
    current: 153238,
    total: 1000000,
    estimatedYear: 2040,
    estimatedYearRange: 2,
  },
  aiInsights: {
    keyInfluencers: [
      {
        factor: 'Consistent monthly savings',
        effect: 'positive',
        description: 'Your regular contributions improve your standing',
        impact: 15,
      },
      {
        factor: 'Current age (55)',
        effect: 'negative',
        description: 'Younger applicants generally have longer waits',
        impact: -10,
      },
      {
        factor: 'Projected annual intake',
        effect: 'neutral',
        description: 'Based on historical Hajj quotas',
        impact: 0,
      },
    ],
    recommendation: 'Complete your health certificate to improve estimation accuracy.',
  },
  profileCompleteness: {
    score: 70,
    missingItems: ['Health Certificate', 'Next of Kin Details', 'Emergency Contact'],
  },
}

const mockFinanceData: FinanceData = {
  tabungHajiAccount: {
    accountNumber: 'TH-1234567890',
    balance: 24500,
    monthlyContribution: 500,
  },
  savingsGoal: {
    target: 50000,
    current: 24500,
    monthlyTarget: 500,
    targetYear: 2040,
  },
  transactions: [
    {
      id: '1',
      date: new Date().toISOString(),
      description: 'Monthly Contribution',
      amount: 500,
      type: 'deposit',
      status: 'completed',
      reference: 'TXN001',
    },
    {
      id: '2',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Monthly Contribution',
      amount: 500,
      type: 'deposit',
      status: 'completed',
      reference: 'TXN002',
    },
    {
      id: '3',
      date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Package Payment',
      amount: -1200,
      type: 'payment',
      status: 'completed',
      reference: 'TXN003',
    },
  ],
}

const mockPackages: HajjPackage[] = [
  {
    id: '1',
    name: 'Premium Hajj Package',
    provider: 'TH Travel Services',
    price: 49900,
    matchScore: 95,
    imageUrl: '/api/placeholder/400/250',
    highlights: ['5-Star Hotel', '500m from Haram', 'Malaysia Airlines', 'Private Transport'],
    duration: 14,
    hotelRating: 5,
    airline: 'Malaysia Airlines',
    distanceFromHaram: 500,
    inclusions: ['Flight', 'Hotel', 'Transport', 'Meals', 'Visa'],
    category: 'premium',
  },
  {
    id: '2',
    name: 'Standard Hajj Package',
    provider: 'Al-Hijrah Tours',
    price: 35000,
    matchScore: 88,
    imageUrl: '/api/placeholder/400/250',
    highlights: ['4-Star Hotel', '800m from Haram', 'AirAsia X', 'Group Transport'],
    duration: 12,
    hotelRating: 4,
    airline: 'AirAsia X',
    distanceFromHaram: 800,
    inclusions: ['Flight', 'Hotel', 'Transport', 'Visa'],
    category: 'standard',
  },
  {
    id: '3',
    name: 'Economy Hajj Package',
    provider: 'Barakah Travel',
    price: 28000,
    matchScore: 75,
    imageUrl: '/api/placeholder/400/250',
    highlights: ['3-Star Hotel', '1.2km from Haram', 'Malindo Air', 'Shuttle Service'],
    duration: 10,
    hotelRating: 3,
    airline: 'Malindo Air',
    distanceFromHaram: 1200,
    inclusions: ['Flight', 'Hotel', 'Visa'],
    category: 'economy',
  },
]

// Mock delay function for realistic API simulation
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// API functions
export const fetchDashboardData = async (): Promise<DashboardData> => {
  await delay(800) // Simulate network delay
  return mockDashboardData
}

export const fetchJourneyData = async (): Promise<JourneyData> => {
  await delay(600)
  return mockJourneyData
}

export const fetchFinanceData = async (): Promise<FinanceData> => {
  await delay(700)
  return mockFinanceData
}

export const fetchPackages = async (
  filters?: Partial<PackageFilters>,
  page = 1,
  limit = 10
): Promise<PaginatedResponse<HajjPackage>> => {
  await delay(500)
  
  let filteredPackages = [...mockPackages]
  
  // Apply filters (simplified for demo)
  if (filters?.priceRange) {
    filteredPackages = filteredPackages.filter(
      pkg => pkg.price >= filters.priceRange![0] && pkg.price <= filters.priceRange![1]
    )
  }
  
  if (filters?.hotelRating?.length) {
    filteredPackages = filteredPackages.filter(
      pkg => filters.hotelRating!.includes(pkg.hotelRating)
    )
  }
  
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedData = filteredPackages.slice(startIndex, endIndex)
  
  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: filteredPackages.length,
      totalPages: Math.ceil(filteredPackages.length / limit),
    },
  }
}

export const loginUser = async (email: string, password: string): Promise<ApiResponse<User & { token: string }>> => {
  await delay(1000)
  
  // Mock successful login
  return {
    data: {
      id: '1',
      name: 'Ahmad Abdullah',
      email,
      avatar: '/api/placeholder/100/100',
      phone: '+60123456789',
      token: 'mock-jwt-token-12345',
    },
    message: 'Login successful',
    status: 'success',
    timestamp: new Date().toISOString(),
  }
}

export const updateProfile = async (profileData: Partial<User>): Promise<ApiResponse<User>> => {
  await delay(800)
  
  return {
    data: {
      id: '1',
      name: 'Ahmad Abdullah',
      email: 'ahmad@example.com',
      ...profileData,
    },
    message: 'Profile updated successfully',
    status: 'success',
    timestamp: new Date().toISOString(),
  }
}

export default api
