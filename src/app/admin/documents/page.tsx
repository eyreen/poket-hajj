'use client'

import React from 'react'
import { DocumentProcessingCenter } from '@/components/admin/document-processing-center'
import { AIProcessingStats } from '@/components/admin/ai-processing-stats'

export default function DocumentProcessingPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document Processing Center</h1>
          <p className="text-muted-foreground">
            AI-powered document verification and processing system
          </p>
        </div>
      </div>

      {/* AI Processing Statistics */}
      <AIProcessingStats />

      {/* Main Document Processing Center */}
      <DocumentProcessingCenter />
    </div>
  )
}
