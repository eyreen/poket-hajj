"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminKpiCard } from "@/components/admin/charts/admin-kpi-card";
import { AdminDataTable } from "@/components/admin/tables/admin-data-table";
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  AlertCircle, 
  Download,
  Search,
  Filter,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data
const financialOverview = {
  totalRevenue: 2450000000,
  monthlyGrowth: 12.5,
  totalTransactions: 156789,
  averageTransactionValue: 15623,
  pendingTransactions: 234,
  failedTransactions: 12
};

const recentTransactions = [
  {
    id: "TXN-001",
    pilgrimName: "Ahmad Bin Ali",
    amount: 5000,
    type: "Monthly Contribution",
    status: "completed",
    date: "2025-01-15",
    paymentMethod: "Online Banking"
  },
  {
    id: "TXN-002", 
    pilgrimName: "Siti Fatimah",
    amount: 25000,
    type: "Package Payment",
    status: "pending",
    date: "2025-01-14",
    paymentMethod: "Credit Card"
  },
  {
    id: "TXN-003",
    pilgrimName: "Rahman Abdullah",
    amount: 3000,
    type: "Top-up",
    status: "failed",
    date: "2025-01-14",
    paymentMethod: "Debit Card"
  },
  {
    id: "TXN-004",
    pilgrimName: "Mariam Binti Hassan",
    amount: 8000,
    type: "Monthly Contribution", 
    status: "completed",
    date: "2025-01-13",
    paymentMethod: "Auto Debit"
  },
  {
    id: "TXN-005",
    pilgrimName: "Ismail Kassim",
    amount: 45000,
    type: "Package Payment",
    status: "completed",
    date: "2025-01-13",
    paymentMethod: "Bank Transfer"
  }
];

const flaggedTransactions = [
  {
    id: "FLAG-001",
    pilgrimName: "Hassan Ibrahim",
    amount: 75000,
    reason: "Unusual large amount",
    riskLevel: "high",
    date: "2025-01-15",
    status: "under_review"
  },
  {
    id: "FLAG-002",
    pilgrimName: "Aminah Yusof",
    amount: 15000,
    reason: "Multiple failed attempts",
    riskLevel: "medium",
    date: "2025-01-14",
    status: "resolved"
  }
];

export default function AdminFinancesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");

  const transactionColumns = [
    {
      key: "id" as keyof typeof recentTransactions[0],
      header: "Transaction ID",
      sortable: true
    },
    {
      key: "pilgrimName" as keyof typeof recentTransactions[0],
      header: "Pilgrim Name",
      sortable: true
    },
    {
      key: "amount" as keyof typeof recentTransactions[0],
      header: "Amount (RM)",
      render: (value: unknown) => `RM ${Number(value).toLocaleString()}`
    },
    {
      key: "type" as keyof typeof recentTransactions[0],
      header: "Type",
      sortable: true
    },
    {
      key: "status" as keyof typeof recentTransactions[0],
      header: "Status",
      render: (value: unknown) => {
        const status = value as string;
        const variants = {
          completed: "bg-green-100 text-green-800",
          pending: "bg-yellow-100 text-yellow-800", 
          failed: "bg-red-100 text-red-800"
        };
        return (
          <Badge className={variants[status as keyof typeof variants]}>
            {status}
          </Badge>
        );
      }
    },
    {
      key: "date" as keyof typeof recentTransactions[0],
      header: "Date",
      sortable: true
    }
  ];

  const flaggedColumns = [
    {
      key: "id" as keyof typeof flaggedTransactions[0],
      header: "Flag ID",
      sortable: true
    },
    {
      key: "pilgrimName" as keyof typeof flaggedTransactions[0],
      header: "Pilgrim Name",
      sortable: true
    },
    {
      key: "amount" as keyof typeof flaggedTransactions[0],
      header: "Amount (RM)",
      render: (value: unknown) => `RM ${Number(value).toLocaleString()}`
    },
    {
      key: "reason" as keyof typeof flaggedTransactions[0],
      header: "Reason",
      sortable: true
    },
    {
      key: "riskLevel" as keyof typeof flaggedTransactions[0],
      header: "Risk Level",
      render: (value: unknown) => {
        const risk = value as string;
        const variants = {
          high: "bg-red-100 text-red-800",
          medium: "bg-yellow-100 text-yellow-800",
          low: "bg-green-100 text-green-800"
        };
        return (
          <Badge className={variants[risk as keyof typeof variants]}>
            {risk}
          </Badge>
        );
      }
    },
    {
      key: "status" as keyof typeof flaggedTransactions[0],
      header: "Status",
      render: (value: unknown) => {
        const status = value as string;
        const variants = {
          under_review: "bg-orange-100 text-orange-800",
          resolved: "bg-green-100 text-green-800",
          escalated: "bg-red-100 text-red-800"
        };
        return (
          <Badge className={variants[status as keyof typeof variants]}>
            {status.replace('_', ' ')}
          </Badge>
        );
      }
    }
  ];

  const transactionActions = [
    {
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: (row: typeof recentTransactions[0]) => {
        console.log("View transaction:", row.id);
      }
    },
    {
      label: "Verify",
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: (row: typeof recentTransactions[0]) => {
        console.log("Verify transaction:", row.id);
      },
      variant: "default" as const
    }
  ];

  const flaggedActions = [
    {
      label: "Investigate", 
      icon: <Search className="h-4 w-4" />,
      onClick: (row: typeof flaggedTransactions[0]) => {
        console.log("Investigate:", row.id);
      }
    },
    {
      label: "Approve",
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: (row: typeof flaggedTransactions[0]) => {
        console.log("Approve:", row.id);
      },
      variant: "default" as const
    },
    {
      label: "Reject",
      icon: <XCircle className="h-4 w-4" />,
      onClick: (row: typeof flaggedTransactions[0]) => {
        console.log("Reject:", row.id);
      },
      variant: "destructive" as const
    }
  ];
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Operations</h1>
          <p className="text-gray-600 mt-1">Monitor transactions, revenue, and financial health</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminKpiCard
          title="Total Revenue"
          value={`RM ${(financialOverview.totalRevenue / 1000000).toFixed(1)}M`}
          change={{
            value: financialOverview.monthlyGrowth,
            period: "vs last month",
            trend: "up"
          }}
          icon={<DollarSign className="h-5 w-5" />}
          status="normal"
        />
        
        <AdminKpiCard
          title="Total Transactions"
          value={financialOverview.totalTransactions.toLocaleString()}
          change={{
            value: 8.2,
            period: "vs last month", 
            trend: "up"
          }}
          icon={<CreditCard className="h-5 w-5" />}
          status="normal"
        />

        <AdminKpiCard
          title="Average Transaction"
          value={`RM ${financialOverview.averageTransactionValue.toLocaleString()}`}
          change={{
            value: 3.1,
            period: "vs last month",
            trend: "up"
          }}
          icon={<TrendingUp className="h-5 w-5" />}
          status="normal"
        />

        <AdminKpiCard
          title="Pending Reviews"
          value={financialOverview.pendingTransactions}
          change={{
            value: -15.2,
            period: "vs last week",
            trend: "down"
          }}
          icon={<Clock className="h-5 w-5" />}
          status={financialOverview.pendingTransactions > 200 ? "warning" : "normal"}
        />
      </div>

      {/* Financial Management Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="flagged">Flagged Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Revenue Breakdown */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Revenue by transaction type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Monthly Contributions</p>
                      <p className="text-sm text-gray-600">65% of total revenue</p>
                    </div>
                    <p className="text-lg font-semibold">RM 1.59B</p>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Package Payments</p>
                      <p className="text-sm text-gray-600">30% of total revenue</p>
                    </div>
                    <p className="text-lg font-semibold">RM 735M</p>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium">Top-ups & Others</p>
                      <p className="text-sm text-gray-600">5% of total revenue</p>
                    </div>
                    <p className="text-lg font-semibold">RM 122M</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-semibold">98.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Failed Transactions</span>
                  <span className="font-semibold text-red-600">{financialOverview.failedTransactions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Processing Time</span>
                  <span className="font-semibold">2.3s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fraud Detection Rate</span>
                  <span className="font-semibold text-green-600">99.2%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search transactions..."
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
          </div>

          {/* Recent Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest financial transactions requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminDataTable
                data={recentTransactions}
                columns={transactionColumns}
                actions={transactionActions}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flagged" className="space-y-4">
          {/* Flagged Transactions Alert */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-orange-800">Flagged Transactions</h3>
                <p className="text-sm text-orange-700 mt-1">
                  These transactions have been flagged by our AI fraud detection system and require manual review.
                </p>
              </div>
            </div>
          </div>

          {/* Flagged Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Transactions Requiring Review</CardTitle>
              <CardDescription>AI-flagged transactions for manual verification</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminDataTable
                data={flaggedTransactions}
                columns={flaggedColumns}
                actions={flaggedActions}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Online Banking</span>
                    <span className="font-semibold">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Auto Debit</span>
                    <span className="font-semibold">30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Credit Card</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bank Transfer</span>
                    <span className="font-semibold">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Transaction Volume</span>
                    <span className="font-semibold text-green-600">↗ +12.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Value</span>
                    <span className="font-semibold text-green-600">↗ +3.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Success Rate</span>
                    <span className="font-semibold text-blue-600">→ 98.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Fraud Detection</span>
                    <span className="font-semibold text-green-600">↗ +0.3%</span>
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
