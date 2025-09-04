'use client'

import React from 'react'
import { 
  Home, 
  MapPin, 
  CreditCard, 
  Package, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/portal/dashboard',
    icon: Home,
  },
  {
    title: 'My Hajj Journey',
    href: '/portal/my-journey',
    icon: MapPin,  },
  {
    title: 'My Finances',
    href: '/portal/finances',
    icon: CreditCard,
  },
  {
    title: 'Hajj Packages',
    href: '/portal/packages',
    icon: Package,
  },
  {
    title: 'Settings',
    href: '/portal/settings',
    icon: Settings,
  },
  {
    title: 'Help & Support',
    href: '/portal/help',
    icon: HelpCircle,
  },
]

export function PortalSidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar } = useUIStore()

  return (
    <div className={cn(
      'fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out',
      sidebarCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PH</span>
            </div>
            <span className="font-semibold text-gray-900">Poket Hajj</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="h-8 w-8 p-0"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className={cn('flex-shrink-0', sidebarCollapsed ? 'h-5 w-5' : 'h-4 w-4')} />
              {!sidebarCollapsed && <span>{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      {!sidebarCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">PH</span>
            </div>
            <div>
              <div className="font-medium">Smart Hajj Ecosystem</div>
              <div>Powered by IntelliLabs</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
