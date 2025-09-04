// Dynamic Resource Allocation & Logistics Optimization Types
export interface ResourceData {
  id: string;
  type: 'flight_seat' | 'hotel_room' | 'transport' | 'visa' | 'guide';
  provider: string;
  capacity: {
    total: number;
    allocated: number;
    available: number;
    reserved: number;
  };
  pricing: {
    basePrice: number;
    dynamicPricing: boolean;
    currentPrice: number;
    priceHistory: PricePoint[];
  };
  schedule: {
    startDate: Date;
    endDate: Date;
    flexibility: 'fixed' | 'flexible' | 'highly_flexible';
  };
  location: {
    origin?: string;
    destination?: string;
    region: string;
  };
  quality: {
    rating: number;
    category: 'economy' | 'standard' | 'premium' | 'luxury';
    amenities: string[];
  };
  constraints: {
    minimumBooking: number;
    maximumBooking: number;
    restrictions: string[];
  };
  metadata: {
    lastUpdated: Date;
    source: 'api' | 'manual' | 'partner';
    reliability: number; // 0-1 score
  };
}

export interface PricePoint {
  timestamp: Date;
  price: number;
  demand: number;
  availability: number;
}

export interface ResourceBrain {
  dataIngestion: {
    pilgrimNumbers: PilgrimDemandData;
    airlineCapacity: AirlineCapacityData[];
    hotelAvailability: HotelAvailabilityData[];
    visaQuotas: VisaQuotaData[];
    geopoliticalEvents: GeopoliticalEvent[];
  };
  optimization: {
    demandForecasting: DemandForecast[];
    capacityOptimization: CapacityOptimization[];
    priceOptimization: PriceOptimization[];
    routeOptimization: RouteOptimization[];
  };
  automation: {
    packageGeneration: AutoPackageGeneration[];
    allocationRules: AllocationRule[];
    escalationTriggers: EscalationTrigger[];
  };
}

export interface PilgrimDemandData {
  totalRegistered: number;
  activeApplications: number;
  readyToPay: number;
  demographicBreakdown: {
    ageGroups: AgeGroupDemand[];
    regions: RegionalDemand[];
    budgetRanges: BudgetRangeDemand[];
  };
  seasonalTrends: SeasonalTrend[];
  projectedGrowth: number;
}

export interface AgeGroupDemand {
  ageRange: string;
  count: number;
  averageBudget: number;
  preferences: string[];
}

export interface RegionalDemand {
  region: string;
  count: number;
  popularDestinations: string[];
  averageSpend: number;
}

export interface BudgetRangeDemand {
  range: string;
  count: number;
  packagePreferences: string[];
}

export interface AirlineCapacityData {
  airline: string;
  route: string;
  aircraft: string;
  capacity: {
    economy: number;
    business: number;
    firstClass: number;
  };
  schedule: FlightSchedule[];
  pricing: FlightPricing;
  availability: {
    confirmed: number;
    tentative: number;
    waitlisted: number;
  };
  restrictions: string[];
}

export interface FlightSchedule {
  departureDate: Date;
  returnDate: Date;
  duration: number;
  frequency: 'daily' | 'weekly' | 'charter';
  seasonality: 'peak' | 'normal' | 'off_peak';
}

export interface FlightPricing {
  basePrice: number;
  fuelSurcharge: number;
  taxes: number;
  seasonalMultiplier: number;
  groupDiscounts: GroupDiscount[];
}

export interface GroupDiscount {
  minimumSize: number;
  discountPercentage: number;
  conditions: string[];
}

export interface HotelAvailabilityData {
  hotel: string;
  location: string;
  distanceFromHaram: number; // in meters
  category: 'economy' | 'standard' | 'premium' | 'luxury';
  rooms: {
    type: string;
    capacity: number;
    available: number;
    pricePerNight: number;
  }[];
  amenities: string[];
  rating: number;
  contractTerms: {
    minimumStay: number;
    maximumStay: number;
    cancellationPolicy: string;
    paymentTerms: string;
  };
  availability: DateRange[];
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
  available: boolean;
  rate: number;
}

export interface VisaQuotaData {
  country: string;
  totalQuota: number;
  allocated: number;
  remaining: number;
  processingTime: number; // in days
  requirements: string[];
  fees: number;
  validityPeriod: number; // in days
  restrictions: string[];
}

export interface GeopoliticalEvent {
  id: string;
  type: 'travel_restriction' | 'political_tension' | 'economic_change' | 'health_advisory';
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedRegions: string[];
  impactOnTravel: string;
  startDate: Date;
  estimatedEndDate?: Date;
  mitigationStrategies: string[];
}

export interface DemandForecast {
  period: string;
  predictedDemand: number;
  confidence: number;
  factors: ForecastFactor[];
  scenarios: {
    optimistic: number;
    realistic: number;
    pessimistic: number;
  };
}

export interface ForecastFactor {
  factor: string;
  impact: number; // -1 to 1
  confidence: number;
  description: string;
}

export interface CapacityOptimization {
  resourceType: string;
  currentUtilization: number;
  optimalUtilization: number;
  recommendations: OptimizationRecommendation[];
  expectedImpact: {
    revenueIncrease: number;
    costReduction: number;
    satisfactionImprovement: number;
  };
}

export interface OptimizationRecommendation {
  action: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  expectedImpact: number;
  implementationCost: number;
  timeframe: string;
  dependencies: string[];
}

export interface PriceOptimization {
  resourceId: string;
  currentPrice: number;
  optimalPrice: number;
  elasticity: number;
  demandSensitivity: number;
  competitorPricing: CompetitorPrice[];
  recommendations: PricingRecommendation[];
}

export interface CompetitorPrice {
  competitor: string;
  price: number;
  quality: number;
  marketShare: number;
}

export interface PricingRecommendation {
  scenario: string;
  price: number;
  expectedDemand: number;
  expectedRevenue: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface RouteOptimization {
  route: string;
  currentEfficiency: number;
  optimizedRoute: string;
  improvements: RouteImprovement[];
  costSavings: number;
  timeSavings: number;
  qualityImpact: number;
}

export interface RouteImprovement {
  type: 'routing' | 'scheduling' | 'capacity' | 'pricing';
  description: string;
  impact: number;
  implementation: string;
}

export interface AutoPackageGeneration {
  id: string;
  trigger: PackageTrigger;
  generatedPackage: GeneratedPackage;
  targetAudience: TargetAudience;
  marketingStrategy: MarketingStrategy;
  performance: PackagePerformance;
  status: 'draft' | 'active' | 'paused' | 'expired';
  createdAt: Date;
  expiresAt: Date;
}

export interface PackageTrigger {
  type: 'surplus_capacity' | 'demand_spike' | 'competitor_action' | 'seasonal_opportunity';
  description: string;
  urgency: 'low' | 'medium' | 'high';
  expiryTime: Date;
  resources: string[]; // Resource IDs that triggered this
}

export interface GeneratedPackage {
  name: string;
  description: string;
  components: PackageComponent[];
  pricing: {
    basePrice: number;
    discountPercentage: number;
    finalPrice: number;
    competitiveAdvantage: string;
  };
  availability: {
    totalSlots: number;
    minimumBooking: number;
    maximumBooking: number;
  };
  terms: {
    cancellationPolicy: string;
    paymentTerms: string;
    validityPeriod: number;
  };
}

export interface PackageComponent {
  resourceId: string;
  type: string;
  quantity: number;
  allocation: string;
  alternatives: string[];
}

export interface TargetAudience {
  criteria: AudienceCriteria;
  estimatedSize: number;
  conversionProbability: number;
  segments: AudienceSegment[];
}

export interface AudienceCriteria {
  queuePosition: { min: number; max: number };
  savingsAmount: { min: number; max: number };
  region: string[];
  ageGroup: string[];
  preferences: string[];
}

export interface AudienceSegment {
  name: string;
  size: number;
  characteristics: string[];
  messagingStrategy: string;
}

export interface MarketingStrategy {
  channels: MarketingChannel[];
  messaging: MarketingMessage[];
  timeline: MarketingTimeline[];
  budget: number;
  expectedReach: number;
}

export interface MarketingChannel {
  channel: 'app_notification' | 'email' | 'sms' | 'social_media' | 'web_banner';
  priority: number;
  cost: number;
  expectedEngagement: number;
}

export interface MarketingMessage {
  audience: string;
  headline: string;
  description: string;
  callToAction: string;
  urgency: boolean;
}

export interface MarketingTimeline {
  phase: string;
  startTime: Date;
  duration: number; // in hours
  activities: string[];
}

export interface PackagePerformance {
  views: number;
  clicks: number;
  bookings: number;
  revenue: number;
  conversionRate: number;
  customerSatisfaction: number;
  feedback: PackageFeedback[];
}

export interface PackageFeedback {
  rating: number;
  comment: string;
  category: string;
  timestamp: Date;
}

export interface AllocationRule {
  id: string;
  name: string;
  condition: string;
  action: AllocationAction;
  priority: number;
  active: boolean;
  performance: RulePerformance;
}

export interface AllocationAction {
  type: 'allocate' | 'reserve' | 'release' | 'escalate';
  parameters: Record<string, any>;
  constraints: string[];
}

export interface RulePerformance {
  executionCount: number;
  successRate: number;
  averageImpact: number;
  lastExecuted: Date;
}

export interface EscalationTrigger {
  id: string;
  condition: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  escalateTo: string[];
  action: string;
  timeframe: number; // in minutes
}

export interface LogisticsAlert {
  id: string;
  type: 'capacity_shortage' | 'price_spike' | 'quality_issue' | 'system_failure';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  affectedResources: string[];
  recommendedActions: string[];
  timestamp: Date;
  acknowledged: boolean;
  resolvedAt?: Date;
}

export interface ResourceOptimizationStats {
  totalResources: number;
  utilizationRate: number;
  revenueOptimization: number;
  costSavings: number;
  customerSatisfaction: number;
  automationRate: number;
  packagesGenerated: number;
  activeAllocations: number;
}
