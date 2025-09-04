"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/admin-layout";
import { AdminDataTable } from "@/components/admin/tables/admin-data-table";
import { AdminKpiCard } from "@/components/admin/charts/admin-kpi-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  Edit,
  Mail,
  Phone,
  MapPin,
  FileText,
  DollarSign,
  Calendar,
  Filter,
  Download,
  UserPlus
} from "lucide-react";

// Mock pilgrim data
const pilgrimData = [
  {
    id: "P001",
    name: "Ahmad bin Abdullah",
    icNumber: "850123-10-1234",
    email: "ahmad.abdullah@email.com",
    phone: "+60123456789",
    state: "Selangor",
    queuePosition: 1245,
    estimatedYear: 2028,
    financialStatus: "On Track",
    documentStatus: "Completed",
    packageType: "Premium",
    totalSavings: 45000,
    targetAmount: 55000,
    joinDate: "2022-03-15",
    lastActivity: "2025-01-15"
  },
  {
    id: "P002",
    name: "Siti Nurhaliza binti Ahmad",
    icNumber: "920456-08-5678",
    email: "siti.nurhaliza@email.com",
    phone: "+60198765432",
    state: "Kuala Lumpur",
    queuePosition: 2156,
    estimatedYear: 2029,
    financialStatus: "Behind",
    documentStatus: "Pending",
    packageType: "Standard",
    totalSavings: 28000,
    targetAmount: 45000,
    joinDate: "2021-08-22",
    lastActivity: "2025-01-10"
  },
  {
    id: "P003",
    name: "Mohammad Razak bin Hassan",
    icNumber: "780912-05-9876",
    email: "m.razak@email.com",
    phone: "+60172345678",
    state: "Johor",
    queuePosition: 856,
    estimatedYear: 2027,
    financialStatus: "Ahead",
    documentStatus: "Completed",
    packageType: "Premium Plus",
    totalSavings: 68000,
    targetAmount: 75000,
    joinDate: "2020-11-10",
    lastActivity: "2025-01-14"
  },
  {
    id: "P004",
    name: "Fatimah binti Ibrahim",
    icNumber: "650730-12-3456",
    email: "fatimah.ibrahim@email.com",
    phone: "+60134567890",
    state: "Penang",
    queuePosition: 445,
    estimatedYear: 2026,
    financialStatus: "On Track",
    documentStatus: "Under Review",
    packageType: "Standard",
    totalSavings: 42000,
    targetAmount: 50000,
    joinDate: "2019-06-05",
    lastActivity: "2025-01-12"
  },
  {
    id: "P005",
    name: "Ali bin Omar",
    icNumber: "881205-14-7890",
    email: "ali.omar@email.com",
    phone: "+60156789012",
    state: "Perak",
    queuePosition: 3421,
    estimatedYear: 2030,
    financialStatus: "Critical",
    documentStatus: "Incomplete",
    packageType: "Basic",
    totalSavings: 15000,
    targetAmount: 35000,
    joinDate: "2023-01-20",
    lastActivity: "2024-12-28"
  }
];

const kpiData = [
  {
    title: "Total Pilgrims",
    value: "12,847",
    change: { value: 3.2, period: "last month", trend: "up" as const },
    icon: <Users className="h-5 w-5" />,
    status: "normal" as const
  },
  {
    title: "Queue Average Wait",
    value: "4.2 years",
    change: { value: -0.1, period: "last quarter", trend: "down" as const },
    icon: <Clock className="h-5 w-5" />,
    status: "normal" as const
  },
  {
    title: "Documents Complete",
    value: "9,234",
    change: { value: 5.8, period: "last month", trend: "up" as const },
    icon: <CheckCircle className="h-5 w-5" />,
    status: "normal" as const
  },
  {
    title: "Critical Cases",
    value: "156",
    change: { value: 12.3, period: "last week", trend: "up" as const },
    icon: <AlertTriangle className="h-5 w-5" />,
    status: "warning" as const
  }
];

const columns = [
  {
    key: "name" as keyof typeof pilgrimData[0],
    header: "Pilgrim Name",
    sortable: true,
    render: (value: unknown, row: typeof pilgrimData[0]) => (
      <div>
        <div className="font-medium">{String(value)}</div>
        <div className="text-sm text-gray-500">{row.icNumber}</div>
      </div>
    )
  },
  {
    key: "state" as keyof typeof pilgrimData[0],
    header: "State",
    render: (value: unknown) => (
      <div className="flex items-center space-x-1">
        <MapPin className="h-3 w-3 text-gray-500" />
        <span>{String(value)}</span>
      </div>
    )
  },
  {
    key: "queuePosition" as keyof typeof pilgrimData[0],
    header: "Queue Position",
    sortable: true,
    render: (value: unknown, row: typeof pilgrimData[0]) => (
      <div>
        <div className="font-medium">#{String(value)}</div>
        <div className="text-sm text-gray-500">Est. {row.estimatedYear}</div>
      </div>
    )
  },
  {
    key: "financialStatus" as keyof typeof pilgrimData[0],
    header: "Financial Status",
    render: (value: unknown, row: typeof pilgrimData[0]) => (
      <div>
        <Badge variant={
          value === 'Ahead' ? 'default' :
          value === 'On Track' ? 'secondary' :
          value === 'Behind' ? 'outline' :
          'destructive'
        }>
          {String(value)}
        </Badge>
        <div className="text-sm text-gray-500 mt-1">
          RM {row.totalSavings.toLocaleString()} / RM {row.targetAmount.toLocaleString()}
        </div>
      </div>
    )
  },
  {
    key: "documentStatus" as keyof typeof pilgrimData[0],
    header: "Documents",
    render: (value: unknown) => (
      <Badge variant={
        value === 'Completed' ? 'default' :
        value === 'Under Review' ? 'secondary' :
        value === 'Pending' ? 'outline' :
        'destructive'
      }>
        {String(value)}
      </Badge>
    )
  },
  {
    key: "packageType" as keyof typeof pilgrimData[0],
    header: "Package",
    render: (value: unknown) => (
      <Badge variant="outline">
        {String(value)}
      </Badge>
    )
  },
  {
    key: "lastActivity" as keyof typeof pilgrimData[0],
    header: "Last Activity",
    render: (value: unknown) => {
      const date = new Date(String(value));
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return (
        <div className="text-sm">
          {diffDays === 1 ? 'Today' : 
           diffDays === 2 ? 'Yesterday' : 
           `${diffDays} days ago`}
        </div>
      );
    }
  }
];

const actions = [
  {
    label: "View Details",
    icon: <Eye className="mr-2 h-4 w-4" />,
    onClick: (row: typeof pilgrimData[0]) => {
      console.log("View pilgrim:", row.id);
    }
  },
  {
    label: "Edit Profile",
    icon: <Edit className="mr-2 h-4 w-4" />,
    onClick: (row: typeof pilgrimData[0]) => {
      console.log("Edit pilgrim:", row.id);
    }
  },
  {
    label: "Send Message",
    icon: <Mail className="mr-2 h-4 w-4" />,
    onClick: (row: typeof pilgrimData[0]) => {
      console.log("Message pilgrim:", row.id);
    }
  },
  {
    label: "Call",
    icon: <Phone className="mr-2 h-4 w-4" />,
    onClick: (row: typeof pilgrimData[0]) => {
      console.log("Call pilgrim:", row.id);
    }
  }
];

const bulkActions = [
  {
    label: "Export Selected",
    icon: <Download className="mr-2 h-4 w-4" />,
    onClick: (selectedRows: typeof pilgrimData) => {
      console.log("Export:", selectedRows.length, "pilgrims");
    }
  },
  {
    label: "Send Notification",
    icon: <Mail className="mr-2 h-4 w-4" />,
    onClick: (selectedRows: typeof pilgrimData) => {
      console.log("Notify:", selectedRows.length, "pilgrims");
    }
  },
  {
    label: "Update Status",
    icon: <Edit className="mr-2 h-4 w-4" />,
    onClick: (selectedRows: typeof pilgrimData) => {
      console.log("Update:", selectedRows.length, "pilgrims");
    }
  }
];

const filters = [
  {
    key: "state",
    label: "State",
    type: "select" as const,
    options: [
      { label: "Selangor", value: "Selangor" },
      { label: "Kuala Lumpur", value: "Kuala Lumpur" },
      { label: "Johor", value: "Johor" },
      { label: "Penang", value: "Penang" },
      { label: "Perak", value: "Perak" }
    ]
  },
  {
    key: "financialStatus",
    label: "Financial Status",
    type: "select" as const,
    options: [
      { label: "Ahead", value: "Ahead" },
      { label: "On Track", value: "On Track" },
      { label: "Behind", value: "Behind" },
      { label: "Critical", value: "Critical" }
    ]
  },
  {
    key: "documentStatus",
    label: "Document Status",
    type: "select" as const,
    options: [
      { label: "Completed", value: "Completed" },
      { label: "Under Review", value: "Under Review" },
      { label: "Pending", value: "Pending" },
      { label: "Incomplete", value: "Incomplete" }
    ]
  },
  {
    key: "packageType",
    label: "Package Type",
    type: "select" as const,
    options: [
      { label: "Basic", value: "Basic" },
      { label: "Standard", value: "Standard" },
      { label: "Premium", value: "Premium" },
      { label: "Premium Plus", value: "Premium Plus" }
    ]
  }
];

const exportOptions = [
  {
    format: "csv" as const,
    label: "Export as CSV",
    onClick: () => console.log("Export as CSV")
  },
  {
    format: "excel" as const,
    label: "Export as Excel",
    onClick: () => console.log("Export as Excel")
  },
  {
    format: "pdf" as const,
    label: "Export as PDF",
    onClick: () => console.log("Export as PDF")
  }
];

export default function PilgrimsPage() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pilgrim Management</h1>
            <p className="text-gray-600 mt-1">Manage and monitor all registered pilgrims</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
            <Button size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Pilgrim
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <AdminKpiCard key={index} {...kpi} />
          ))}
        </div>

        {/* Main Data Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>All Pilgrims</span>
              <Badge variant="secondary">{pilgrimData.length.toLocaleString()}</Badge>
            </CardTitle>
            <CardDescription>
              Complete list of registered pilgrims with their current status and information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminDataTable
              data={pilgrimData}
              columns={columns}
              actions={actions}
              bulkActions={bulkActions}
              filters={filters}
              exportOptions={exportOptions}
              pagination={{
                page: 1,
                pageSize: 10,
                total: 12847
              }}
              sorting={{
                key: "queuePosition",
                direction: "asc"
              }}
            />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Queue Management</h3>
              <p className="text-sm text-gray-600 mb-4">Manage pilgrim queue positions and processing</p>
              <Button variant="outline" size="sm">
                Manage Queue
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Document Review</h3>
              <p className="text-sm text-gray-600 mb-4">Review and verify pilgrim documents</p>
              <Button variant="outline" size="sm">
                Review Documents
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="bg-orange-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Financial Tracking</h3>
              <p className="text-sm text-gray-600 mb-4">Monitor pilgrim savings and payments</p>
              <Button variant="outline" size="sm">
                View Finances
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
