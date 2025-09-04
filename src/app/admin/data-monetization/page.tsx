"use client";

import DataMonetizationCenter from "@/components/admin/data-monetization-center";

export default function DataMonetizationPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Data Monetization Platform</h1>
        <p className="text-gray-600 mt-1">
          B2B Data SaaS platform for strategic insights and revenue generation
        </p>
      </div>
      
      <DataMonetizationCenter />
    </div>
  );
}
