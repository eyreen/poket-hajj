import IoTExperienceCenter from '@/components/admin/iot-experience-center';

export default function IoTLocationPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Real-Time Location Tracking</h1>
          <p className="text-gray-600 mt-2">
            Monitor pilgrim locations and crowd density across Hajj zones
          </p>
        </div>
      </div>
      
      {/* This will focus on the location tab */}
      <IoTExperienceCenter />
    </div>
  );
}
