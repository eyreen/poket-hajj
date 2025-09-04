/**
 * IoT Experience Management API
 * Real-time IoT data processing and experience management for Smart Hajj
 */

import { 
  IoTSensorData, 
  LocationData, 
  VitalSigns, 
  PilgrimProfile,
  RealTimeNotification,
  CrowdData,
  HealthAlert,
  JourneyOptimization,
  RitualGuidance,
  EnvironmentalData,
  GroupCoordination,
  ExperienceAnalytics,
  HajjLocation,
  IoTExperienceResponse,
  RealtimeUpdate,
  ConnectedDevice,
  CrowdPrediction,
  HajjZone
} from '@/types/iot-experience';

const API_BASE = '/api/iot-experience';

// Core IoT Data Management
export const iotExperienceApi = {
  // Real-time Data Collection
  async ingestSensorData(data: IoTSensorData[]): Promise<IoTExperienceResponse<{ processed: number; errors: string[] }>> {
    const response = await fetch(`${API_BASE}/sensors/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sensorData: data })
    });
    return response.json();
  },

  async updatePilgrimLocation(pilgrimId: string, location: LocationData): Promise<IoTExperienceResponse<LocationData>> {
    const response = await fetch(`${API_BASE}/location/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pilgrimId, location })
    });
    return response.json();
  },

  async updateVitalSigns(pilgrimId: string, vitals: VitalSigns): Promise<IoTExperienceResponse<HealthAlert[]>> {
    const response = await fetch(`${API_BASE}/health/vitals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pilgrimId, vitals })
    });
    return response.json();
  },

  // Pilgrim Profile Management
  async getPilgrimProfile(pilgrimId: string): Promise<IoTExperienceResponse<PilgrimProfile>> {
    const response = await fetch(`${API_BASE}/pilgrims/${pilgrimId}/profile`);
    return response.json();
  },

  async updatePilgrimProfile(pilgrimId: string, profile: Partial<PilgrimProfile>): Promise<IoTExperienceResponse<PilgrimProfile>> {
    const response = await fetch(`${API_BASE}/pilgrims/${pilgrimId}/profile`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    return response.json();
  },

  async registerDevice(pilgrimId: string, device: ConnectedDevice): Promise<IoTExperienceResponse<ConnectedDevice>> {
    const response = await fetch(`${API_BASE}/pilgrims/${pilgrimId}/devices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(device)
    });
    return response.json();
  },

  async getConnectedDevices(pilgrimId: string): Promise<IoTExperienceResponse<ConnectedDevice[]>> {
    const response = await fetch(`${API_BASE}/pilgrims/${pilgrimId}/devices`);
    return response.json();
  },

  // Real-time Notifications
  async sendNotification(notification: Omit<RealTimeNotification, 'id'>): Promise<IoTExperienceResponse<RealTimeNotification>> {
    const response = await fetch(`${API_BASE}/notifications/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notification)
    });
    return response.json();
  },

  async getPilgrimNotifications(pilgrimId: string, since?: Date): Promise<IoTExperienceResponse<RealTimeNotification[]>> {
    const params = new URLSearchParams();
    if (since) params.append('since', since.toISOString());
    
    const response = await fetch(`${API_BASE}/pilgrims/${pilgrimId}/notifications?${params}`);
    return response.json();
  },

  async markNotificationRead(notificationId: string): Promise<IoTExperienceResponse<void>> {
    const response = await fetch(`${API_BASE}/notifications/${notificationId}/read`, {
      method: 'POST'
    });
    return response.json();
  },

  // Location & Navigation
  async getHajjLocations(zone?: HajjZone): Promise<IoTExperienceResponse<HajjLocation[]>> {
    const params = new URLSearchParams();
    if (zone) params.append('zone', zone);
    
    const response = await fetch(`${API_BASE}/locations?${params}`);
    return response.json();
  },

  async getNearbyLocations(
    coordinates: { latitude: number; longitude: number },
    radius: number = 1000,
    types?: string[]
  ): Promise<IoTExperienceResponse<HajjLocation[]>> {
    const params = new URLSearchParams({
      lat: coordinates.latitude.toString(),
      lng: coordinates.longitude.toString(),
      radius: radius.toString()
    });
    
    if (types?.length) {
      params.append('types', types.join(','));
    }
    
    const response = await fetch(`${API_BASE}/locations/nearby?${params}`);
    return response.json();
  },

  async optimizeJourney(
    pilgrimId: string,
    destinationId: string,
    preferences?: {
      avoidCrowds?: boolean;
      accessibility?: boolean;
      fastestRoute?: boolean;
    }
  ): Promise<IoTExperienceResponse<JourneyOptimization>> {
    const response = await fetch(`${API_BASE}/navigation/optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pilgrimId, destinationId, preferences })
    });
    return response.json();
  },

  // Crowd Management
  async getCrowdData(locationIds: string[]): Promise<IoTExperienceResponse<CrowdData[]>> {
    const response = await fetch(`${API_BASE}/crowd/current`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locationIds })
    });
    return response.json();
  },

  async getCrowdPredictions(
    locationId: string,
    timeRange: { start: Date; end: Date }
  ): Promise<IoTExperienceResponse<CrowdPrediction[]>> {
    const params = new URLSearchParams({
      locationId,
      start: timeRange.start.toISOString(),
      end: timeRange.end.toISOString()
    });
    
    const response = await fetch(`${API_BASE}/crowd/predictions?${params}`);
    return response.json();
  },

  async reportCrowdIncident(
    locationId: string,
    incident: {
      type: 'overcrowding' | 'emergency' | 'safety-concern';
      description: string;
      severity: 'low' | 'medium' | 'high' | 'critical';
    }
  ): Promise<IoTExperienceResponse<void>> {
    const response = await fetch(`${API_BASE}/crowd/incident`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locationId, ...incident })
    });
    return response.json();
  },

  // Health Monitoring
  async getHealthAlerts(pilgrimId: string, active?: boolean): Promise<IoTExperienceResponse<HealthAlert[]>> {
    const params = new URLSearchParams();
    if (active !== undefined) params.append('active', active.toString());
    
    const response = await fetch(`${API_BASE}/pilgrims/${pilgrimId}/health/alerts?${params}`);
    return response.json();
  },

  async acknowledgeHealthAlert(alertId: string): Promise<IoTExperienceResponse<void>> {
    const response = await fetch(`${API_BASE}/health/alerts/${alertId}/acknowledge`, {
      method: 'POST'
    });
    return response.json();
  },

  async triggerEmergency(
    pilgrimId: string,
    emergency: {
      type: 'medical' | 'safety' | 'lost' | 'panic';
      description?: string;
      location: LocationData;
    }
  ): Promise<IoTExperienceResponse<{ emergencyId: string; responseTime: number }>> {
    const response = await fetch(`${API_BASE}/emergency/trigger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pilgrimId, ...emergency })
    });
    return response.json();
  },

  // Ritual Guidance
  async getRitualGuidance(pilgrimId: string): Promise<IoTExperienceResponse<RitualGuidance>> {
    const response = await fetch(`${API_BASE}/pilgrims/${pilgrimId}/ritual/guidance`);
    return response.json();
  },

  async updateRitualProgress(
    pilgrimId: string,
    stepId: string,
    completion: {
      completed: boolean;
      location?: LocationData;
      timestamp?: Date;
      notes?: string;
    }
  ): Promise<IoTExperienceResponse<RitualGuidance>> {
    const response = await fetch(`${API_BASE}/pilgrims/${pilgrimId}/ritual/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stepId, ...completion })
    });
    return response.json();
  },

  async getPersonalizedRitualInstructions(
    pilgrimId: string,
    ritualType: string,
    language?: string
  ): Promise<IoTExperienceResponse<any>> {
    const params = new URLSearchParams({ ritualType });
    if (language) params.append('language', language);
    
    const response = await fetch(`${API_BASE}/pilgrims/${pilgrimId}/ritual/instructions?${params}`);
    return response.json();
  },

  // Environmental Data
  async getEnvironmentalData(locationIds: string[]): Promise<IoTExperienceResponse<EnvironmentalData[]>> {
    const response = await fetch(`${API_BASE}/environment/current`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locationIds })
    });
    return response.json();
  },

  async getWeatherForecast(
    coordinates: { latitude: number; longitude: number },
    hours: number = 24
  ): Promise<IoTExperienceResponse<any>> {
    const params = new URLSearchParams({
      lat: coordinates.latitude.toString(),
      lng: coordinates.longitude.toString(),
      hours: hours.toString()
    });
    
    const response = await fetch(`${API_BASE}/weather/forecast?${params}`);
    return response.json();
  },

  // Group Coordination
  async getGroupCoordination(groupId: string): Promise<IoTExperienceResponse<GroupCoordination>> {
    const response = await fetch(`${API_BASE}/groups/${groupId}/coordination`);
    return response.json();
  },

  async updateGroupLocation(
    groupId: string,
    memberId: string,
    location: LocationData
  ): Promise<IoTExperienceResponse<void>> {
    const response = await fetch(`${API_BASE}/groups/${groupId}/members/${memberId}/location`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location })
    });
    return response.json();
  },

  async sendGroupMessage(
    groupId: string,
    senderId: string,
    message: {
      type: 'text' | 'location' | 'emergency' | 'meeting-point';
      content: string;
      priority: 'low' | 'medium' | 'high';
      data?: any;
    }
  ): Promise<IoTExperienceResponse<void>> {
    const response = await fetch(`${API_BASE}/groups/${groupId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senderId, ...message })
    });
    return response.json();
  },

  async setMeetingPoint(
    groupId: string,
    location: HajjLocation,
    time: Date,
    message?: string
  ): Promise<IoTExperienceResponse<void>> {
    const response = await fetch(`${API_BASE}/groups/${groupId}/meeting-point`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location, time, message })
    });
    return response.json();
  },

  // Analytics and Insights
  async getExperienceAnalytics(
    pilgrimId: string,
    period: 'daily' | 'weekly' | 'journey'
  ): Promise<IoTExperienceResponse<ExperienceAnalytics>> {
    const response = await fetch(`${API_BASE}/pilgrims/${pilgrimId}/analytics/${period}`);
    return response.json();
  },

  async getPersonalRecommendations(pilgrimId: string): Promise<IoTExperienceResponse<any[]>> {
    const response = await fetch(`${API_BASE}/pilgrims/${pilgrimId}/recommendations`);
    return response.json();
  },

  async trackRecommendationAction(
    pilgrimId: string,
    recommendationId: string,
    actionId: string,
    completed: boolean
  ): Promise<IoTExperienceResponse<void>> {
    const response = await fetch(`${API_BASE}/pilgrims/${pilgrimId}/recommendations/${recommendationId}/actions/${actionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    return response.json();
  },

  // Real-time Updates (WebSocket-like functionality)
  async subscribeToUpdates(
    pilgrimId: string,
    types: ('location' | 'health' | 'notification' | 'group' | 'environment')[]
  ): Promise<IoTExperienceResponse<{ subscriptionId: string }>> {
    const response = await fetch(`${API_BASE}/pilgrims/${pilgrimId}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ types })
    });
    return response.json();
  },

  async getRealtimeUpdates(
    subscriptionId: string,
    since?: Date
  ): Promise<IoTExperienceResponse<RealtimeUpdate[]>> {
    const params = new URLSearchParams({ subscriptionId });
    if (since) params.append('since', since.toISOString());
    
    const response = await fetch(`${API_BASE}/updates/poll?${params}`);
    return response.json();
  },

  // System Management
  async getSystemHealth(): Promise<IoTExperienceResponse<{
    status: 'healthy' | 'degraded' | 'down';
    services: Record<string, 'up' | 'down' | 'degraded'>;
    metrics: Record<string, number>;
    lastUpdate: Date;
  }>> {
    const response = await fetch(`${API_BASE}/system/health`);
    return response.json();
  },

  async getDataPrivacyReport(pilgrimId: string): Promise<IoTExperienceResponse<{
    dataTypes: string[];
    retentionPeriods: Record<string, string>;
    sharingPreferences: Record<string, boolean>;
    downloadUrl: string;
  }>> {
    const response = await fetch(`${API_BASE}/pilgrims/${pilgrimId}/privacy/report`);
    return response.json();
  },

  async updatePrivacySettings(
    pilgrimId: string,
    settings: Record<string, boolean>
  ): Promise<IoTExperienceResponse<void>> {
    const response = await fetch(`${API_BASE}/pilgrims/${pilgrimId}/privacy/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    return response.json();
  }
};

// Utility functions for real-time data processing
export const iotUtils = {
  // Location utilities
  calculateDistance(
    point1: { latitude: number; longitude: number },
    point2: { latitude: number; longitude: number }
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (point2.latitude - point1.latitude) * Math.PI / 180;
    const dLon = (point2.longitude - point1.longitude) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.latitude * Math.PI / 180) * Math.cos(point2.latitude * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c * 1000; // Return distance in meters
  },

  // Health utilities
  isVitalSignAbnormal(vital: VitalSigns, pilgrimAge: number): boolean {
    if (vital.heartRate) {
      if (pilgrimAge > 65) {
        return vital.heartRate < 50 || vital.heartRate > 100;
      } else {
        return vital.heartRate < 60 || vital.heartRate > 100;
      }
    }
    
    if (vital.bodyTemperature) {
      return vital.bodyTemperature < 36.1 || vital.bodyTemperature > 37.8;
    }
    
    if (vital.oxygenSaturation) {
      return vital.oxygenSaturation < 95;
    }
    
    return false;
  },

  // Crowd utilities
  getCrowdDensityLevel(count: number, capacity: number): string {
    const ratio = count / capacity;
    if (ratio < 0.5) return 'low';
    if (ratio < 0.7) return 'medium';
    if (ratio < 0.9) return 'high';
    if (ratio < 1.0) return 'critical';
    return 'dangerous';
  },

  // Notification utilities
  prioritizeNotifications(notifications: RealTimeNotification[]): RealTimeNotification[] {
    const priorityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
    return notifications.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
  },

  // Time utilities
  getTimeSlotString(date: Date): string {
    const hour = date.getHours();
    if (hour < 6) return 'dawn';
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    if (hour < 22) return 'evening';
    return 'night';
  },

  // Data validation
  validateSensorData(data: IoTSensorData): boolean {
    return !!(
      data.sensorId &&
      data.deviceType &&
      data.timestamp &&
      data.data &&
      typeof data.data === 'object'
    );
  },

  validateLocationData(data: LocationData): boolean {
    return !!(
      data.pilgrimId &&
      data.coordinates &&
      typeof data.coordinates.latitude === 'number' &&
      typeof data.coordinates.longitude === 'number' &&
      data.coordinates.latitude >= -90 &&
      data.coordinates.latitude <= 90 &&
      data.coordinates.longitude >= -180 &&
      data.coordinates.longitude <= 180 &&
      data.timestamp &&
      data.zone
    );
  }
};
