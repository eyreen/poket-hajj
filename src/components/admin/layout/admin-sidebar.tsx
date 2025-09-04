"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Package, 
  BarChart3, 
  Shield, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  AlertTriangle,
  TrendingUp,
  FileText,
  UserCheck,
  Activity
} from "lucide-react";

interface AdminSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  children?: NavItem[];
  permissions?: string[];
}

const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    permissions: ["dashboard.view"]
  },
  {
    title: "Pilgrim",
    href: "/admin/pilgrims",
    icon: <Users className="h-5 w-5" />,
    badge: "2.4k",
    children: [
      {
        title: "All Pilgrims",
        href: "/admin/pilgrims",
        icon: <Users className="h-4 w-4" />
      },
      {
        title: "Queue Management",
        href: "/admin/pilgrims/queue",
        icon: <Activity className="h-4 w-4" />,
        badge: "156"
      },
      {
        title: "Document Verification",
        href: "/admin/pilgrims/documents",
        icon: <UserCheck className="h-4 w-4" />,
        badge: "23"
      }
    ],
    permissions: ["pilgrims.view"]
  },
  {
    title: "Document Processing",
    href: "/admin/documents",
    icon: <FileText className="h-5 w-5" />,
    badge: "47",
    children: [
      {
        title: "Processing Center",
        href: "/admin/documents",
        icon: <FileText className="h-4 w-4" />
      },
      {
        title: "Pending Review",
        href: "/admin/documents/pending",
        icon: <UserCheck className="h-4 w-4" />,
        badge: "23"
      },
      {
        title: "Flagged Documents",
        href: "/admin/documents/flagged",
        icon: <AlertTriangle className="h-4 w-4" />,
        badge: "4"
      },
      {
        title: "AI Training",
        href: "/admin/documents/training",
        icon: <Activity className="h-4 w-4" />
      }
    ],
    permissions: ["documents.view"]
  },
  {
    title: "Financial Operations",
    href: "/admin/finances",
    icon: <DollarSign className="h-5 w-5" />,
    children: [
      {
        title: "Overview",
        href: "/admin/finances",
        icon: <TrendingUp className="h-4 w-4" />
      },
      {
        title: "Transactions",
        href: "/admin/finances/transactions",
        icon: <Activity className="h-4 w-4" />
      },
      {
        title: "Reports",
        href: "/admin/finances/reports",
        icon: <FileText className="h-4 w-4" />
      }
    ],
    permissions: ["finances.view"]
  },
  {
    title: "Package Management",
    href: "/admin/packages",
    icon: <Package className="h-5 w-5" />,
    permissions: ["packages.view"]
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
    children: [
      {
        title: "Performance Metrics",
        href: "/admin/analytics",
        icon: <BarChart3 className="h-4 w-4" />
      },
      {
        title: "Predictive Analytics",
        href: "/admin/analytics/predictive",
        icon: <TrendingUp className="h-4 w-4" />
      },
      {
        title: "Anomaly Detection",
        href: "/admin/analytics/anomalies",
        icon: <AlertTriangle className="h-4 w-4" />,
        badge: "3"
      }
    ],
    permissions: ["analytics.view"]
  },
  {
    title: "Compliance",
    href: "/admin/compliance",
    icon: <Shield className="h-5 w-5" />,
    children: [
      {
        title: "Audit Trail",
        href: "/admin/compliance/audit",
        icon: <FileText className="h-4 w-4" />
      },
      {
        title: "Compliance Reports",
        href: "/admin/compliance/reports",
        icon: <Shield className="h-4 w-4" />
      }
    ],
    permissions: ["compliance.view"]
  },
  {
    title: "System Settings",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
    permissions: ["settings.view"]
  }
];

export function AdminSidebar({ open, onOpenChange }: AdminSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const isExpanded = (href: string) => {
    return expandedItems.includes(href) || 
           navigationItems.find(item => item.href === href)?.children?.some(child => isActive(child.href));
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const active = isActive(item.href);
    const expanded = isExpanded(item.href);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.href} className="space-y-1">
        <div className="relative">
          {hasChildren ? (
            <button
              onClick={() => toggleExpanded(item.href)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                level > 0 && "ml-4",
                active
                  ? "bg-blue-100 text-blue-900 border-r-2 border-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                {open && (
                  <>
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge 
                        variant={active ? "default" : "secondary"} 
                        className={cn(
                          "text-xs",
                          active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </div>
              {open && hasChildren && (
                <ChevronRight 
                  className={cn(
                    "h-4 w-4 transition-transform",
                    expanded && "transform rotate-90"
                  )} 
                />
              )}
            </button>
          ) : (
            <Link
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                level > 0 && "ml-4",
                active
                  ? "bg-blue-100 text-blue-900 border-r-2 border-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              {item.icon}
              {open && (
                <>
                  <span>{item.title}</span>
                  {item.badge && (
                    <Badge 
                      variant={active ? "default" : "secondary"} 
                      className={cn(
                        "ml-auto text-xs",
                        active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          )}
        </div>

        {/* Children */}
        {hasChildren && expanded && open && (
          <div className="space-y-1">
            {item.children?.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col",
      open ? "w-64" : "w-16"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {open && (
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Admin Portal</h2>
              <p className="text-xs text-gray-500">Tabung Haji</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onOpenChange(!open)}
          className="hover:bg-gray-100"
        >
          {open ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Alert Center */}
      {open && (
        <div className="p-4 border-b border-gray-200">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Active Alerts</span>
              <Badge variant="destructive" className="text-xs">5</Badge>
            </div>
            <p className="text-xs text-orange-600 mt-1">3 high priority items need attention</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navigationItems.map(item => renderNavItem(item))}
      </nav>

      {/* System Status */}
      {open && (
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">System Status</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Last Updated</span>
              <span className="text-gray-700">2 min ago</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
