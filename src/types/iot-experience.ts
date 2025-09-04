/**
 * IoT Experience Management System Types
 * Hyper-Personalized Real-Time Pilgrim Experience with IoT Integration
 */

// Core IoT Data Types
export interface IoTSensorData {
  sensorId: string;
  deviceType: 'wearable' | 'environmental' | 'location' | 'infrastructure';
  timestamp: Date;
  data: Record<string, any>;
  batteryLevel?: number;
  signalStrength?: number;
}

export interface LocationData {
  pilgrimId: string;
  coordinates: {
    latitude: number;
    longitude: number;
    altitude?: number;
  };
  accuracy: number;
  timestamp: Date;
  zone: HajjZone;
  indoor: boolean;
  floorLevel?: number;
}

export interface VitalSigns {
  heartRate?: number;
  bodyTemperature?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  oxygenSaturation?: number;
  stepsCount?: number;
  caloriesBurned?: number;
  sleepQuality?: number;
  stressLevel?: number;
  hydrationLevel?: number;
}

// Pilgrim Experience Types
export interface PilgrimProfile {
  id: string;
  personalInfo: {
    name: string;
    age: number;
    gender: 'male' | 'female';
    nationality: string;
    medicalConditions: string[];
    emergencyContacts: EmergencyContact[];
  };
  preferences: {
    language: string;
    accessibility: AccessibilityNeeds;
    dietary: DietaryRestrictions;
    communication: CommunicationPreference;
    privacy: PrivacySettings;
  };
  groupInfo: {
    groupId: string;
    groupLeaderId: string;
    roommates: string[];
    travelCompanions: string[];
  };
  devices: ConnectedDevice[];
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
  email?: string;
  isLocal: boolean;
}

export interface AccessibilityNeeds {
  mobility: 'none' | 'wheelchair' | 'walker' | 'assistance';
  vision: 'none' | 'glasses' | 'low-vision' | 'blind';
  hearing: 'none' | 'hearing-aid' | 'deaf';
  cognitive: 'none' | 'memory-assistance' | 'language-support';
}

export interface DietaryRestrictions {
  allergies: string[];
  medical: string[];
  preferences: string[];
  specialRequirements: string[];
}

export interface CommunicationPreference {
  primaryChannel: 'push' | 'sms' | 'email' | 'voice';
  frequency: 'minimal' | 'important' | 'regular' | 'all';
  quietHours: {
    start: string;
    end: string;
  };
}

export interface PrivacySettings {
  shareLocation: boolean;
  shareHealthData: boolean;
  allowGroupTracking: boolean;
  dataRetention: 'minimal' | 'standard' | 'extended';
}

// Connected Devices
export interface ConnectedDevice {
  deviceId: string;
  type: DeviceType;
  brand: string;
  model: string;
  batteryLevel: number;
  lastSync: Date;
  capabilities: DeviceCapability[];
  isActive: boolean;
}

export type DeviceType = 
  | 'smartwatch'
  | 'fitness-tracker'
  | 'smartphone'
  | 'smart-ring'
  | 'medical-device'
  | 'gps-tracker'
  | 'smart-badge';

export type DeviceCapability = 
  | 'heart-rate'
  | 'gps'
  | 'temperature'
  | 'step-counter'
  | 'sleep-tracking'
  | 'blood-pressure'
  | 'fall-detection'
  | 'emergency-button'
  | 'nfc'
  | 'bluetooth'
  | 'cellular';

// Real-Time Experience Management
export interface RealTimeNotification {
  id: string;
  pilgrimId: string;
  type: NotificationType;
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  actionRequired: boolean;
  actions?: NotificationAction[];
  location?: LocationData;
  expiryTime?: Date;
  category: NotificationCategory;
  customData?: Record<string, any>;
}

export type NotificationType = 
  | 'logistics'
  | 'health'
  | 'safety'
  | 'ritual'
  | 'social'
  | 'emergency'
  | 'information'
  | 'reminder';

export type NotificationCategory =
  | 'transport'
  | 'accommodation'
  | 'medical'
  | 'crowd-management'
  | 'ritual-guidance'
  | 'weather'
  | 'group-coordination'
  | 'facility-info';

export interface NotificationAction {
  id: string;
  label: string;
  type: 'navigation' | 'call' | 'confirm' | 'share' | 'schedule';
  data?: Record<string, any>;
}

// Location and Navigation
export type HajjZone = 
  | 'makkah'
  | 'madinah'
  | 'mina'
  | 'arafah'
  | 'muzdalifah'
  | 'jamarat'
  | 'haram'
  | 'hotel'
  | 'airport'
  | 'transport'
  | 'medical'
  | 'shopping';

export interface HajjLocation {
  id: string;
  name: string;
  zone: HajjZone;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  type: LocationType;
  capacity: number;
  currentOccupancy: number;
  facilities: Facility[];
  accessibility: AccessibilityFeature[];
  languages: string[];
}

export type LocationType = 
  | 'mosque'
  | 'hotel'
  | 'restaurant'
  | 'hospital'
  | 'pharmacy'
  | 'atm'
  | 'toilet'
  | 'water-station'
  | 'bus-stop'
  | 'prayer-area'
  | 'rest-area'
  | 'information-center';

export interface Facility {
  type: string;
  available: boolean;
  capacity?: number;
  currentUsage?: number;
  openingHours?: {
    start: string;
    end: string;
  };
}

export interface AccessibilityFeature {
  type: 'wheelchair' | 'elevator' | 'ramp' | 'braille' | 'audio-guide';
  available: boolean;
  description?: string;
}

// Crowd Management
export interface CrowdData {
  locationId: string;
  timestamp: Date;
  density: CrowdDensity;
  estimatedCount: number;
  capacity: number;
  utilizationRate: number;
  predictedPeakTime?: Date;
  alternativeLocations?: string[];
  waitTime?: number;
}

export type CrowdDensity = 'low' | 'medium' | 'high' | 'critical' | 'dangerous';

export interface CrowdPrediction {
  locationId: string;
  timeSlot: Date;
  predictedDensity: CrowdDensity;
  confidence: number;
  factors: string[];
  recommendations: string[];
}

// Health Monitoring
export interface HealthAlert {
  id: string;
  pilgrimId: string;
  type: HealthAlertType;
  severity: 'info' | 'warning' | 'critical' | 'emergency';
  timestamp: Date;
  vitalSigns: VitalSigns;
  location: LocationData;
  recommendation: string;
  autoResponse: boolean;
  responseActions: HealthResponse[];
  acknowledged: boolean;
}

export type HealthAlertType = 
  | 'heart-rate-abnormal'
  | 'temperature-high'
  | 'dehydration'
  | 'exhaustion'
  | 'fall-detected'
  | 'panic-button'
  | 'medication-reminder'
  | 'checkup-due';

export interface HealthResponse {
  type: 'notification' | 'medical-dispatch' | 'group-alert' | 'family-notification';
  recipient: string;
  message: string;
  priority: number;
  automated: boolean;
}

// Journey Optimization
export interface JourneyOptimization {
  pilgrimId: string;
  currentLocation: LocationData;
  destination: HajjLocation;
  optimizedRoute: RouteStep[];
  estimatedDuration: number;
  alternatives: AlternativeRoute[];
  considerations: JourneyConsideration[];
  realTimeUpdates: boolean;
}

export interface RouteStep {
  stepNumber: number;
  instruction: string;
  location: HajjLocation;
  estimatedTime: number;
  mode: TransportMode;
  distance: number;
  considerations?: string[];
}

export type TransportMode = 'walking' | 'bus' | 'metro' | 'taxi' | 'group-transport';

export interface AlternativeRoute {
  id: string;
  description: string;
  estimatedDuration: number;
  crowdLevel: CrowdDensity;
  accessibility: boolean;
  cost?: number;
  advantages: string[];
  disadvantages: string[];
}

export interface JourneyConsideration {
  type: 'health' | 'accessibility' | 'crowd' | 'weather' | 'ritual-timing';
  impact: 'positive' | 'neutral' | 'negative';
  description: string;
  recommendation?: string;
}

// Ritual Guidance
export interface RitualGuidance {
  id: string;
  pilgrimId: string;
  ritualType: RitualType;
  currentStep: RitualStep;
  nextSteps: RitualStep[];
  personalization: RitualPersonalization;
  progress: RitualProgress;
  reminders: RitualReminder[];
}

export type RitualType = 
  | 'umrah'
  | 'hajj'
  | 'tawaf'
  | 'saee'
  | 'waqfa'
  | 'rami'
  | 'qurban'
  | 'tahallul';

export interface RitualStep {
  stepNumber: number;
  name: string;
  description: string;
  location: HajjLocation;
  estimatedDuration: number;
  prerequisites: string[];
  instructions: RitualInstruction[];
  validation?: RitualValidation;
}

export interface RitualInstruction {
  type: 'text' | 'audio' | 'video' | 'interactive';
  content: string;
  language: string;
  accessibility?: string[];
}

export interface RitualValidation {
  type: 'location' | 'time' | 'sequence' | 'manual';
  criteria: Record<string, any>;
  autoValidate: boolean;
}

export interface RitualPersonalization {
  school: 'hanafi' | 'maliki' | 'shafii' | 'hanbali';
  language: string;
  pace: 'slow' | 'normal' | 'fast';
  groupPreference: 'individual' | 'small-group' | 'large-group';
  accessibility: AccessibilityNeeds;
}

export interface RitualProgress {
  completedSteps: number;
  totalSteps: number;
  currentPhase: string;
  estimatedCompletion: Date;
  validationStatus: 'pending' | 'verified' | 'requires-attention';
}

export interface RitualReminder {
  id: string;
  stepId: string;
  triggerTime: Date;
  triggerLocation?: string;
  message: string;
  priority: number;
  sent: boolean;
}

// Environmental Monitoring
export interface EnvironmentalData {
  locationId: string;
  timestamp: Date;
  temperature: number;
  humidity: number;
  airQuality: AirQualityData;
  noiseLevel: number;
  visibility: number;
  weather: WeatherCondition;
  uvIndex: number;
  windSpeed: number;
  windDirection: number;
}

export interface AirQualityData {
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
  aqi: number;
  category: 'good' | 'moderate' | 'unhealthy-sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous';
}

export interface WeatherCondition {
  condition: 'clear' | 'cloudy' | 'rainy' | 'stormy' | 'sandstorm' | 'foggy';
  description: string;
  visibility: number;
  precipitation: number;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  timestamp: Date;
  temperature: number;
  condition: string;
  precipitation: number;
  windSpeed: number;
}

// Group Coordination
export interface GroupCoordination {
  groupId: string;
  leaderId: string;
  members: GroupMember[];
  currentActivity: GroupActivity;
  meetingPoint: HajjLocation;
  communication: GroupCommunication;
  safety: GroupSafety;
}

export interface GroupMember {
  pilgrimId: string;
  name: string;
  role: 'leader' | 'co-leader' | 'member' | 'dependent';
  status: MemberStatus;
  location: LocationData;
  lastSeen: Date;
  contactInfo: EmergencyContact;
}

export type MemberStatus = 'present' | 'nearby' | 'distant' | 'missing' | 'emergency';

export interface GroupActivity {
  id: string;
  name: string;
  type: RitualType | 'meal' | 'rest' | 'travel' | 'shopping' | 'medical';
  startTime: Date;
  endTime?: Date;
  location: HajjLocation;
  participants: string[];
  status: 'planned' | 'active' | 'completed' | 'cancelled';
}

export interface GroupCommunication {
  channels: CommunicationChannel[];
  activeChannel: string;
  emergencyProtocol: EmergencyProtocol;
  languageSupport: string[];
}

export interface CommunicationChannel {
  type: 'voice' | 'text' | 'location-share' | 'emergency';
  active: boolean;
  participants: string[];
  lastUsed: Date;
}

export interface EmergencyProtocol {
  triggerConditions: string[];
  responseTeam: string[];
  escalationSteps: EscalationStep[];
  communicationPlan: CommunicationPlan[];
}

export interface EscalationStep {
  level: number;
  timeThreshold: number;
  actions: string[];
  contacts: string[];
}

export interface CommunicationPlan {
  scenario: string;
  recipients: string[];
  message: string;
  channels: string[];
}

export interface GroupSafety {
  checkInInterval: number;
  lastGroupCheckIn: Date;
  missingMembers: string[];
  safetyAlerts: SafetyAlert[];
  emergencyContacts: EmergencyContact[];
}

export interface SafetyAlert {
  id: string;
  type: 'member-missing' | 'group-separated' | 'emergency' | 'health-concern';
  memberIds: string[];
  timestamp: Date;
  location: LocationData;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'escalated';
  response: string[];
}

// AI Analytics and Insights
export interface ExperienceAnalytics {
  pilgrimId: string;
  period: AnalyticsPeriod;
  metrics: ExperienceMetrics;
  insights: PersonalInsight[];
  recommendations: PersonalRecommendation[];
  comparisons: BenchmarkComparison[];
}

export type AnalyticsPeriod = 'daily' | 'weekly' | 'journey' | 'historical';

export interface ExperienceMetrics {
  stepsCount: number;
  caloriesBurned: number;
  sleepQuality: number;
  stressLevel: number;
  ritualCompletion: number;
  socialEngagement: number;
  healthScore: number;
  satisfactionScore: number;
}

export interface PersonalInsight {
  category: 'health' | 'spiritual' | 'social' | 'logistics';
  insight: string;
  confidence: number;
  actionable: boolean;
  priority: number;
}

export interface PersonalRecommendation {
  id: string;
  type: 'health' | 'ritual' | 'social' | 'logistics' | 'safety';
  title: string;
  description: string;
  priority: number;
  estimatedImpact: 'low' | 'medium' | 'high';
  timeFrame: string;
  actions: RecommendationAction[];
}

export interface RecommendationAction {
  action: string;
  deadline?: Date;
  reminder: boolean;
  trackProgress: boolean;
}

export interface BenchmarkComparison {
  metric: string;
  userValue: number;
  averageValue: number;
  percentile: number;
  category: string;
}

// System Configuration
export interface IoTSystemConfig {
  dataCollection: {
    frequency: number;
    batchSize: number;
    retentionPeriod: number;
  };
  notifications: {
    maxPerHour: number;
    priorityThresholds: Record<string, number>;
    channelPreferences: Record<string, string[]>;
  };
  privacy: {
    dataAnonymization: boolean;
    shareAggregatedData: boolean;
    userConsent: ConsentLevel[];
  };
  performance: {
    responseTime: number;
    availability: number;
    accuracy: number;
  };
}

export type ConsentLevel = 'location' | 'health' | 'behavior' | 'communication' | 'analytics';

// API Response Types
export interface IoTExperienceResponse<T = any> {
  success: boolean;
  data: T;
  metadata: {
    timestamp: Date;
    pilgrimId?: string;
    deviceId?: string;
    location?: LocationData;
  };
  error?: {
    code: string;
    message: string;
  };
}

export interface RealtimeUpdate {
  type: 'location' | 'health' | 'notification' | 'group' | 'environment';
  pilgrimId: string;
  data: any;
  timestamp: Date;
  priority: number;
}
