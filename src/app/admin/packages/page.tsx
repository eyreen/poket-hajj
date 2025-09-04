"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminKpiCard } from "@/components/admin/charts/admin-kpi-card";
import { AdminDataTable } from "@/components/admin/tables/admin-data-table";
import { PackagePlus, Edit, TrendingUp, Users, Star, Search, Filter, Download, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data
const packageOverview = {
  totalPackages: 18,
  totalProviders: 7,
  totalBookings: 3200,
  mostPopular: "Premium Maktab 5",
};

const packages = [
  {
    id: "PKG-001",
    name: "Economy Maktab 1",
    provider: "TH Travel",
    price: 18900,
    bookings: 1200,
    rating: 4.2,
    status: "active",
  },
  {
    id: "PKG-002",
    name: "Premium Maktab 5",
    provider: "TH Global",
    price: 28900,
    bookings: 1500,
    rating: 4.8,
    status: "active",
  },
  {
    id: "PKG-003",
    name: "Standard Maktab 3",
    provider: "TH Express",
    price: 21900,
    bookings: 500,
    rating: 4.0,
    status: "inactive",
  },
];

const packageColumns = [
  { key: "id" as keyof typeof packages[0], header: "Package ID", sortable: true },
  { key: "name" as keyof typeof packages[0], header: "Name", sortable: true },
  { key: "provider" as keyof typeof packages[0], header: "Provider", sortable: true },
  { key: "price" as keyof typeof packages[0], header: "Price (RM)", render: (value: unknown) => `RM ${Number(value).toLocaleString()}` },
  { key: "bookings" as keyof typeof packages[0], header: "Bookings", sortable: true },
  { key: "rating" as keyof typeof packages[0], header: "Rating", render: (value: unknown) => <Badge>{Number(value).toFixed(1)} ★</Badge> },
  { key: "status" as keyof typeof packages[0], header: "Status", render: (value: unknown) => {
    const status = value as string;
    return <Badge className={status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>{status}</Badge>;
  } },
];

const packageActions = [
  {
    label: "Edit",
    icon: <Edit className="h-4 w-4" />,
    onClick: (row: typeof packages[0]) => {
      console.log("Edit package:", row.id);
    },
    variant: "default" as const,
  },
  {
    label: "View Bookings",
    icon: <Users className="h-4 w-4" />,
    onClick: (row: typeof packages[0]) => {
      console.log("View bookings for:", row.id);
    },
  },
];

export default function AdminPackagesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("catalog");
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Package Management</h1>
          <p className="text-gray-600 mt-1">Manage Hajj packages, providers, and bookings</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <PackagePlus className="h-4 w-4" />
            <span>Add Package</span>
          </Button>
        </div>
      </div>

      {/* Package KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminKpiCard
          title="Total Packages"
          value={packageOverview.totalPackages}
          change={{ value: 2, period: "new this month", trend: "up" }}
          icon={<PackagePlus className="h-5 w-5" />}
          status="normal"
        />
        <AdminKpiCard
          title="Total Providers"
          value={packageOverview.totalProviders}
          change={{ value: 1, period: "new this month", trend: "up" }}
          icon={<Users className="h-5 w-5" />}
          status="normal"
        />
        <AdminKpiCard
          title="Total Bookings"
          value={packageOverview.totalBookings}
          change={{ value: 5.6, period: "vs last month", trend: "up" }}
          icon={<TrendingUp className="h-5 w-5" />}
          status="normal"
        />
        <AdminKpiCard
          title="Most Popular"
          value={packageOverview.mostPopular}
          icon={<Star className="h-5 w-5" />}
          status="normal"
        />
      </div>

      {/* Package Management Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="catalog">Catalog</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search packages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
            <Button className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>

          {/* Packages Table */}
          <Card>
            <CardHeader>
              <CardTitle>Package Catalog</CardTitle>
              <CardDescription>All available Hajj packages</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminDataTable
                data={packages}
                columns={packageColumns}
                actions={packageActions}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Economy Packages</span>
                    <span className="font-semibold">+8.2% (YoY)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Premium Packages</span>
                    <span className="font-semibold">+12.5% (YoY)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Standard Packages</span>
                    <span className="font-semibold">+5.6% (YoY)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Provider Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>TH Travel</span>
                    <span className="font-semibold text-green-600">4.5 ★</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>TH Global</span>
                    <span className="font-semibold text-green-600">4.8 ★</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>TH Express</span>
                    <span className="font-semibold text-green-600">4.0 ★</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
