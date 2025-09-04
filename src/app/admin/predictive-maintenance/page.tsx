"use client";

import PredictiveMaintenanceCenter from "@/components/admin/predictive-maintenance-center";

export default function PredictiveMaintenancePage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Predictive Maintenance Center</h1>
        <p className="text-gray-600 mt-1">
          AI-powered infrastructure monitoring and predictive maintenance management
        </p>
      </div>
      
      <PredictiveMaintenanceCenter />
    </div>
  );
}
