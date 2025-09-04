import IoTExperienceCenter from '@/components/admin/iot-experience-center';

export default function IoTDevicesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Device Health Monitoring</h1>
          <p className="text-gray-600 mt-2">
            Monitor and manage connected IoT devices across all pilgrims
          </p>
        </div>
      </div>
      
      {/* This will focus on the devices tab */}
      <IoTExperienceCenter />
    </div>
  );
}
