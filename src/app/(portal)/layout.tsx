'use client'

import React from 'react'
import { PortalSidebar } from '@/components/portal/sidebar'
import { PortalTopbar } from '@/components/portal/topbar'
import { useUIStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { sidebarCollapsed } = useUIStore()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block">
        <PortalSidebar />
      </div>

      {/* Topbar */}
      <PortalTopbar />

      {/* Main Content */}
      <main 
        className={cn(
          'transition-all duration-300 pt-16',
          sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
        )}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
