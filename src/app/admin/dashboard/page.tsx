"use client";

import { AdminKpiCard } from "@/components/admin/charts/admin-kpi-card";
import { AdminDataTable } from "@/components/admin/tables/admin-data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  DollarSign, 
  Clock, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Package,
  Activity,
  Calendar,
  MapPin,
  Eye
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for dashboard
const kpiData = [
  {
    title: "Total Active Pilgrims",
    value: "12,847",
    change: { value: 8.2, period: "last month", trend: "up" as const },
    icon: <Users className="h-5 w-5" />,
    status: "normal" as const
  },
  {
    title: "Queue Processing Rate",
    value: "1,245",
    change: { value: -2.1, period: "last month", trend: "down" as const },
    icon: <Activity className="h-5 w-5" />,
    status: "warning" as const
  },
  {
    title: "Total Revenue",
    value: "RM 89.2M",
    change: { value: 12.5, period: "last month", trend: "up" as const },
    icon: <DollarSign className="h-5 w-5" />,
    status: "normal" as const
  },
  {
    title: "Average Wait Time",
    value: "4.2 years",
    change: { value: -0.3, period: "last quarter", trend: "down" as const },
    icon: <Clock className="h-5 w-5" />,
    status: "normal" as const
  },
  {
    title: "System Performance",
    value: "99.8%",
    change: { value: 0.1, period: "last week", trend: "up" as const },
    icon: <TrendingUp className="h-5 w-5" />,
    status: "normal" as const
  },
  {
    title: "Critical Alerts",
    value: "3",
    change: { value: 50.0, period: "last day", trend: "up" as const },
    icon: <AlertTriangle className="h-5 w-5" />,
    status: "critical" as const
  }
];

const pilgrimTrendData = [
  { month: 'Jan', applications: 1200, processed: 980, revenue: 12.5 },
  { month: 'Feb', applications: 1350, processed: 1100, revenue: 15.2 },
  { month: 'Mar', applications: 1180, processed: 1250, revenue: 18.7 },
  { month: 'Apr', applications: 1420, processed: 1150, revenue: 16.8 },
  { month: 'May', applications: 1650, processed: 1380, revenue: 22.1 },
  { month: 'Jun', applications: 1580, processed: 1450, revenue: 25.3 }
];

const demographicData = [
  { name: 'Age 25-35', value: 35, fill: '#3B82F6' },
  { name: 'Age 36-45', value: 28, fill: '#10B981' },
  { name: 'Age 46-55', value: 22, fill: '#F59E0B' },
  { name: 'Age 56-65', value: 12, fill: '#EF4444' },
  { name: 'Age 65+', value: 3, fill: '#8B5CF6' }
];

const stateDistributionData = [
  { state: 'Selangor', pilgrims: 2845 },
  { state: 'Kuala Lumpur', pilgrims: 2156 },
  { state: 'Johor', pilgrims: 1893 },
  { state: 'Perak', pilgrims: 1456 },
  { state: 'Penang', pilgrims: 1234 },
  { state: 'Kedah', pilgrims: 987 }
];

const recentAlerts = [
  {
    id: "1",
    type: "financial",
    severity: "high",
    title: "Unusual Transaction Pattern",
    description: "Multiple large transactions detected from same region",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    status: "active"
  },
  {
    id: "2",
    type: "system",
    severity: "medium",
    title: "Database Performance",
    description: "Query response time increased by 15%",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    status: "acknowledged"
  },
  {
    id: "3",
    type: "compliance",
    severity: "low",
    title: "Document Review",
    description: "Weekly compliance check completed",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "resolved"
  }
];

const recentActivities = [
  {
    id: "1",
    pilgrimName: "Ahmad bin Abdullah",
    icNumber: "850123-10-1234",
    action: "Document Submitted",
    status: "pending",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    location: "Selangor"
  },
  {
    id: "2",
    pilgrimName: "Siti Nurhaliza",
    icNumber: "920456-08-5678",
    action: "Payment Completed",
    status: "completed",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    location: "Kuala Lumpur"
  },
  {
    id: "3",
    pilgrimName: "Mohammad Razak",
    icNumber: "780912-05-9876",
    action: "Queue Position Updated",
    status: "completed",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    location: "Johor"
  }
];

const alertColumns = [
  {
    key: "type" as keyof typeof recentAlerts[0],
    header: "Type",
    render: (value: unknown) => (
      <Badge variant={
        value === 'financial' ? 'destructive' :
        value === 'system' ? 'secondary' :
        'default'
      }>
        {String(value)}
      </Badge>
    )
  },
  {
    key: "title" as keyof typeof recentAlerts[0],
    header: "Alert",
    sortable: true
  },
  {
    key: "severity" as keyof typeof recentAlerts[0],
    header: "Severity",
    render: (value: unknown) => (
      <Badge variant={
        value === 'high' ? 'destructive' :
        value === 'medium' ? 'secondary' :
        'default'
      }>
        {String(value)}
      </Badge>
    )
  },
  {
    key: "timestamp" as keyof typeof recentAlerts[0],
    header: "Time",
    render: (value: unknown) => {
      const date = value as Date;
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}m ago`;
    }
  }
];

const activityColumns = [
  {
    key: "pilgrimName" as keyof typeof recentActivities[0],
    header: "Pilgrim",
    sortable: true
  },
  {
    key: "icNumber" as keyof typeof recentActivities[0],
    header: "IC Number"
  },
  {
    key: "action" as keyof typeof recentActivities[0],
    header: "Action"
  },
  {
    key: "status" as keyof typeof recentActivities[0],
    header: "Status",
    render: (value: unknown) => (
      <Badge variant={value === 'completed' ? 'default' : 'secondary'}>
        {String(value)}
      </Badge>
    )
  },
  {
    key: "location" as keyof typeof recentActivities[0],
    header: "Location",
    render: (value: unknown) => (
      <div className="flex items-center space-x-1">
        <MapPin className="h-3 w-3 text-gray-500" />
        <span>{String(value)}</span>
      </div>
    )
  }
];

const alertActions = [
  {
    label: "View Details",
    icon: <Eye className="mr-2 h-4 w-4" />,
    onClick: (row: typeof recentAlerts[0]) => {
      console.log("View alert:", row.id);
    }
  },
  {
    label: "Acknowledge",
    icon: <CheckCircle className="mr-2 h-4 w-4" />,
    onClick: (row: typeof recentAlerts[0]) => {
      console.log("Acknowledge alert:", row.id);
    }
  }
];

const activityActions = [
  {
    label: "View Pilgrim",
    icon: <Eye className="mr-2 h-4 w-4" />,
    onClick: (row: typeof recentActivities[0]) => {
      console.log("View pilgrim:", row.id);
    }
  }
];

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time overview of Smart Hajj Ecosystem operations</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 days
          </Button>
          <Button size="sm">
            Generate Report
          </Button>
        </div>
      </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {kpiData.map((kpi, index) => (
            <AdminKpiCard key={index} {...kpi} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pilgrim Applications Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Pilgrim Applications Trend</CardTitle>
              <CardDescription>Monthly applications and processing rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={pilgrimTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name="Applications"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="processed" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Processed"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Growth */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Growth</CardTitle>
              <CardDescription>Monthly revenue in millions (RM)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={pilgrimTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Demographics */}
          <Card>
            <CardHeader>
              <CardTitle>Age Demographics</CardTitle>
              <CardDescription>Distribution of pilgrims by age group</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={demographicData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {demographicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* State Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>State Distribution</CardTitle>
              <CardDescription>Pilgrims by state</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stateDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pilgrims" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <span>Recent Alerts</span>
                <Badge variant="destructive">3 Active</Badge>
              </CardTitle>
              <CardDescription>System alerts requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminDataTable
                data={recentAlerts}
                columns={alertColumns}
                actions={alertActions}
              />
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-500" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>Latest pilgrim activities and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminDataTable
                data={recentActivities}
                columns={activityColumns}
                actions={activityActions}
              />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used administrative functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Users className="h-6 w-6" />
                <span className="text-xs">Manage Pilgrims</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <DollarSign className="h-6 w-6" />
                <span className="text-xs">Financial Reports</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Package className="h-6 w-6" />
                <span className="text-xs">Package Setup</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Activity className="h-6 w-6" />
                <span className="text-xs">Queue Management</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <AlertTriangle className="h-6 w-6" />
                <span className="text-xs">Alert Center</span>
              </Button>              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <TrendingUp className="h-6 w-6" />
                <span className="text-xs">Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}
