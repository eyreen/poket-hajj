// User and Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  profileComplete?: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Dashboard Types
export interface DashboardData {
  queuePosition: {
    current: number;
    total: number;
    estimatedYear: number;
    estimatedYearRange: number;
  };
  savings: {
    current: number;
    target: number;
    monthlyTarget: number;
    isOnTrack: boolean;
  };
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'savings' | 'queue' | 'package' | 'profile';
  title: string;
  description: string;
  timestamp: string;
  amount?: number;
}

// Hajj Journey Types
export interface JourneyData {
  queuePosition: {
    current: number;
    total: number;
    estimatedYear: number;
    estimatedYearRange: number;
  };
  aiInsights: {
    keyInfluencers: Influencer[];
    recommendation: string;
  };
  profileCompleteness: {
    score: number;
    missingItems: string[];
  };
}

export interface Influencer {
  factor: string;
  effect: 'positive' | 'negative' | 'neutral';
  description: string;
  impact: number;
}

// Package Types
export interface HajjPackage {
  id: string;
  name: string;
  provider: string;
  price: number;
  matchScore: number;
  imageUrl: string;
  highlights: string[];
  duration: number;
  hotelRating: number;
  airline: string;
  distanceFromHaram: number;
  inclusions: string[];
  category: 'economy' | 'standard' | 'premium' | 'luxury';
}

export interface PackageFilters {
  priceRange: [number, number];
  hotelRating: number[];
  airline: string[];
  category: string[];
  specialNeeds: string[];
}

// Finance Types
export interface FinanceData {
  tabungHajiAccount: {
    accountNumber: string;
    balance: number;
    monthlyContribution: number;
  };
  transactions: Transaction[];
  savingsGoal: {
    target: number;
    current: number;
    monthlyTarget: number;
    targetYear: number;
  };
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'payment' | 'refund';
  status: 'completed' | 'pending' | 'failed';
  reference?: string;
}

// Component Props Types
export interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  progress?: {
    value: number;
    max: number;
    showPercentage?: boolean;
  };
  className?: string;
  onClick?: () => void;
}

export interface DataTableColumn<T> {
  key: keyof T;
  header: string;
  cell?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export interface PackageCardProps {
  packageData: HajjPackage;
  onSelect?: (pkg: HajjPackage) => void;
  onViewDetails?: (pkg: HajjPackage) => void;
  className?: string;
}

// Store Types
export interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export interface FiltersStore {
  packageFilters: PackageFilters;
  updateFilters: (filters: Partial<PackageFilters>) => void;
  resetFilters: () => void;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: 'success' | 'error';
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Navigation Types
export interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  children?: NavItem[];
}
