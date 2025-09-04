import IoTExperienceCenter from '@/components/admin/iot-experience-center';

export default function IoTAlertsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Real-Time Alert Management</h1>
          <p className="text-gray-600 mt-2">
            Monitor and respond to system alerts and emergency notifications
          </p>
        </div>
      </div>
      
      {/* This will focus on the alerts tab */}
      <IoTExperienceCenter />
    </div>
  );
}
