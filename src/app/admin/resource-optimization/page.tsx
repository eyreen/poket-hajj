"use client";

import { ResourceOptimizationCenter } from "@/components/admin/resource-optimization-center";

export default function ResourceOptimizationPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Resource Optimization Center</h1>
        <p className="text-gray-600 mt-1">
          AI-powered resource allocation and logistics optimization for maximum efficiency
        </p>
      </div>
      
      <ResourceOptimizationCenter />
    </div>
  );
}
