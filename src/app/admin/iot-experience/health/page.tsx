import IoTExperienceCenter from '@/components/admin/iot-experience-center';

export default function IoTHealthPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Health Monitoring System</h1>
          <p className="text-gray-600 mt-2">
            Real-time health monitoring and medical alert management for pilgrims
          </p>
        </div>
      </div>
      
      {/* This will focus on the health tab */}
      <IoTExperienceCenter />
    </div>
  );
}
