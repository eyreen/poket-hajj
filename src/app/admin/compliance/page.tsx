"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminKpiCard } from "@/components/admin/charts/admin-kpi-card";
import { AdminDataTable } from "@/components/admin/tables/admin-data-table";
import { Input } from "@/components/ui/input";
import { 
  FileCheck,
  AlertTriangle,
  Clock,
  Download,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  FileText,
  Scale
} from "lucide-react";

// Mock data
const complianceOverview = {
  totalAudits: 156,
  pendingReviews: 23,
  complianceScore: 96.8,
  documentsProcessed: 8942,
  violationsFound: 4,
  resolvedIssues: 145
};

const auditTrails = [
  {
    id: "AUDIT-001",
    userId: "ADM-123",
    userName: "Ahmad Rahman",
    action: "Updated pilgrim queue position",
    entityType: "Pilgrim",
    entityId: "PLG-789",
    timestamp: "2025-01-15 09:30:15",
    ipAddress: "192.168.1.100",
    result: "success",
    details: "Queue position changed from 1,234 to 1,156"
  },
  {
    id: "AUDIT-002", 
    userId: "ADM-456",
    userName: "Siti Aminah",
    action: "Processed refund request",
    entityType: "Transaction",
    entityId: "TXN-456",
    timestamp: "2025-01-15 08:45:22",
    ipAddress: "192.168.1.101",
    result: "success",
    details: "Refund of RM 5,000 processed for cancelled package"
  },
  {
    id: "AUDIT-003",
    userId: "ADM-789",
    userName: "Hassan Abdullah",
    action: "Login attempt failed",
    entityType: "Authentication",
    entityId: "AUTH-321",
    timestamp: "2025-01-15 07:20:45",
    ipAddress: "192.168.1.102",
    result: "failed",
    details: "Multiple failed login attempts detected"
  },
  {
    id: "AUDIT-004",
    userId: "ADM-234",
    userName: "Mariam Kassim",
    action: "Exported financial report",
    entityType: "Report",
    entityId: "RPT-678",
    timestamp: "2025-01-14 16:30:00",
    ipAddress: "192.168.1.103",
    result: "success",
    details: "Monthly financial report exported to PDF"
  }
];

const complianceChecks = [
  {
    id: "COMP-001",
    checkName: "Document Verification Completeness",
    category: "Documentation",
    status: "passed",
    lastChecked: "2025-01-15 06:00:00",
    score: 98.5,
    issues: 0,
    requirement: "PDPA Compliance",
    nextCheck: "2025-01-16 06:00:00"
  },
  {
    id: "COMP-002",
    checkName: "Financial Transaction Audit",
    category: "Financial",
    status: "warning",
    lastChecked: "2025-01-15 06:00:00",
    score: 94.2,
    issues: 3,
    requirement: "BNM Guidelines",
    nextCheck: "2025-01-16 06:00:00"
  },
  {
    id: "COMP-003",
    checkName: "Data Retention Policy",
    category: "Data Protection",
    status: "passed",
    lastChecked: "2025-01-15 06:00:00",
    score: 100,
    issues: 0,
    requirement: "PDPA Requirements",
    nextCheck: "2025-01-22 06:00:00"
  },
  {
    id: "COMP-004",
    checkName: "User Access Control",
    category: "Security",
    status: "failed",
    lastChecked: "2025-01-15 06:00:00",
    score: 87.1,
    issues: 12,
    requirement: "ISO 27001",
    nextCheck: "2025-01-15 18:00:00"
  }
];

const violations = [
  {
    id: "VIO-001",
    type: "Data Access",
    description: "Unauthorized access attempt to sensitive pilgrim data",
    severity: "high",
    userId: "ADM-999",
    userName: "Unknown User",
    detectedAt: "2025-01-14 23:45:00",
    status: "investigating",
    regulation: "PDPA",
    impact: "Data privacy concern"
  },
  {
    id: "VIO-002",
    type: "Financial Process",
    description: "Transaction processed without proper authorization",
    severity: "medium",
    userId: "ADM-567",
    userName: "Ali Hassan",
    detectedAt: "2025-01-13 14:30:00",
    status: "resolved",
    regulation: "BNM Guidelines",
    impact: "Process deviation"
  },
  {
    id: "VIO-003",
    type: "Document Handling",
    description: "Document retention period exceeded",
    severity: "low",
    userId: "SYS-AUTO",
    userName: "System",
    detectedAt: "2025-01-12 08:00:00",
    status: "resolved",
    regulation: "Internal Policy",
    impact: "Storage optimization"
  }
];

const documents = [
  {
    id: "DOC-001",
    pilgrimName: "Ahmad Bin Ali",
    documentType: "Passport",
    uploadDate: "2025-01-10",
    verificationStatus: "verified",
    expiryDate: "2028-05-15",
    verifiedBy: "ADM-123",
    issues: 0
  },
  {
    id: "DOC-002",
    pilgrimName: "Siti Fatimah",
    documentType: "Medical Certificate",
    uploadDate: "2025-01-08",
    verificationStatus: "pending",
    expiryDate: "2025-12-31",
    verifiedBy: null,
    issues: 1
  },
  {
    id: "DOC-003",
    pilgrimName: "Rahman Abdullah",
    documentType: "Visa Application",
    uploadDate: "2025-01-05",
    verificationStatus: "rejected",
    expiryDate: "N/A",
    verifiedBy: "ADM-456",
    issues: 3
  }
];

export default function AdminCompliancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");

  const auditColumns = [
    {
      key: "userName" as keyof typeof auditTrails[0],
      header: "User",
      sortable: true
    },
    {
      key: "action" as keyof typeof auditTrails[0],
      header: "Action",
      sortable: true
    },
    {
      key: "entityType" as keyof typeof auditTrails[0],
      header: "Entity Type",
      render: (value: unknown) => {
        const type = value as string;
        const variants = {
          Pilgrim: "bg-blue-100 text-blue-800",
          Transaction: "bg-green-100 text-green-800",
          Authentication: "bg-red-100 text-red-800",
          Report: "bg-purple-100 text-purple-800",
          Package: "bg-orange-100 text-orange-800"
        };
        return (
          <Badge className={variants[type as keyof typeof variants] || "bg-gray-100 text-gray-800"}>
            {type}
          </Badge>
        );
      }
    },
    {
      key: "result" as keyof typeof auditTrails[0],
      header: "Result",
      render: (value: unknown) => {
        const result = value as string;
        const variants = {
          success: "bg-green-100 text-green-800",
          failed: "bg-red-100 text-red-800",
          warning: "bg-yellow-100 text-yellow-800"
        };
        return (
          <Badge className={variants[result as keyof typeof variants]}>
            {result}
          </Badge>
        );
      }
    },
    {
      key: "timestamp" as keyof typeof auditTrails[0],
      header: "Timestamp",
      sortable: true
    },
    {
      key: "ipAddress" as keyof typeof auditTrails[0],
      header: "IP Address",
      sortable: true
    }
  ];

  const complianceColumns = [
    {
      key: "checkName" as keyof typeof complianceChecks[0],
      header: "Compliance Check",
      sortable: true
    },
    {
      key: "category" as keyof typeof complianceChecks[0],
      header: "Category",
      render: (value: unknown) => {
        const category = value as string;
        const variants = {
          Documentation: "bg-blue-100 text-blue-800",
          Financial: "bg-green-100 text-green-800",
          "Data Protection": "bg-purple-100 text-purple-800",
          Security: "bg-red-100 text-red-800"
        };
        return (
          <Badge className={variants[category as keyof typeof variants]}>
            {category}
          </Badge>
        );
      }
    },
    {
      key: "status" as keyof typeof complianceChecks[0],
      header: "Status",
      render: (value: unknown) => {
        const status = value as string;
        const variants = {
          passed: "bg-green-100 text-green-800",
          warning: "bg-yellow-100 text-yellow-800",
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
      key: "score" as keyof typeof complianceChecks[0],
      header: "Score (%)",
      render: (value: unknown) => `${value}%`
    },
    {
      key: "issues" as keyof typeof complianceChecks[0],
      header: "Issues",
      render: (value: unknown) => {
        const issues = Number(value);
        return (
          <span className={issues > 0 ? "text-red-600 font-medium" : "text-green-600"}>
            {issues}
          </span>
        );
      }
    },
    {
      key: "requirement" as keyof typeof complianceChecks[0],
      header: "Requirement",
      sortable: true
    }
  ];

  const violationColumns = [
    {
      key: "type" as keyof typeof violations[0],
      header: "Type",
      render: (value: unknown) => {
        const type = value as string;
        const variants = {
          "Data Access": "bg-red-100 text-red-800",
          "Financial Process": "bg-orange-100 text-orange-800",
          "Document Handling": "bg-blue-100 text-blue-800"
        };
        return (
          <Badge className={variants[type as keyof typeof variants]}>
            {type}
          </Badge>
        );
      }
    },
    {
      key: "description" as keyof typeof violations[0],
      header: "Description",
      sortable: true
    },
    {
      key: "severity" as keyof typeof violations[0],
      header: "Severity",
      render: (value: unknown) => {
        const severity = value as string;
        const variants = {
          high: "bg-red-100 text-red-800",
          medium: "bg-yellow-100 text-yellow-800",
          low: "bg-green-100 text-green-800"
        };
        return (
          <Badge className={variants[severity as keyof typeof variants]}>
            {severity}
          </Badge>
        );
      }
    },
    {
      key: "userName" as keyof typeof violations[0],
      header: "User",
      sortable: true
    },
    {
      key: "regulation" as keyof typeof violations[0],
      header: "Regulation",
      sortable: true
    },
    {
      key: "status" as keyof typeof violations[0],
      header: "Status",
      render: (value: unknown) => {
        const status = value as string;
        const variants = {
          investigating: "bg-yellow-100 text-yellow-800",
          resolved: "bg-green-100 text-green-800",
          escalated: "bg-red-100 text-red-800"
        };
        return (
          <Badge className={variants[status as keyof typeof variants]}>
            {status}
          </Badge>
        );
      }
    }
  ];

  const documentColumns = [
    {
      key: "pilgrimName" as keyof typeof documents[0],
      header: "Pilgrim Name",
      sortable: true
    },
    {
      key: "documentType" as keyof typeof documents[0],
      header: "Document Type",
      render: (value: unknown) => {
        const type = value as string;
        const variants = {
          Passport: "bg-blue-100 text-blue-800",
          "Medical Certificate": "bg-green-100 text-green-800",
          "Visa Application": "bg-purple-100 text-purple-800"
        };
        return (
          <Badge className={variants[type as keyof typeof variants]}>
            {type}
          </Badge>
        );
      }
    },
    {
      key: "verificationStatus" as keyof typeof documents[0],
      header: "Status",
      render: (value: unknown) => {
        const status = value as string;
        const variants = {
          verified: "bg-green-100 text-green-800",
          pending: "bg-yellow-100 text-yellow-800",
          rejected: "bg-red-100 text-red-800"
        };
        return (
          <Badge className={variants[status as keyof typeof variants]}>
            {status}
          </Badge>
        );
      }
    },
    {
      key: "uploadDate" as keyof typeof documents[0],
      header: "Upload Date",
      sortable: true
    },
    {
      key: "expiryDate" as keyof typeof documents[0],
      header: "Expiry Date",
      sortable: true
    },
    {
      key: "issues" as keyof typeof documents[0],
      header: "Issues",
      render: (value: unknown) => {
        const issues = Number(value);
        return (
          <span className={issues > 0 ? "text-red-600 font-medium" : "text-green-600"}>
            {issues}
          </span>
        );
      }
    }
  ];

  const auditActions = [
    {
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: (row: typeof auditTrails[0]) => {
        console.log("View audit:", row.id);
      }
    }
  ];

  const complianceActions = [
    {
      label: "View Report",
      icon: <FileText className="h-4 w-4" />,
      onClick: (row: typeof complianceChecks[0]) => {
        console.log("View compliance:", row.id);
      }
    },
    {
      label: "Run Check",
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: (row: typeof complianceChecks[0]) => {
        console.log("Run check:", row.id);
      }
    }
  ];

  const violationActions = [
    {
      label: "Investigate",
      icon: <Eye className="h-4 w-4" />,
      onClick: (row: typeof violations[0]) => {
        console.log("Investigate:", row.id);
      }
    },
    {
      label: "Resolve",
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: (row: typeof violations[0]) => {
        console.log("Resolve:", row.id);
      },
      variant: "default" as const
    }
  ];

  const documentActions = [
    {
      label: "Review",
      icon: <Eye className="h-4 w-4" />,
      onClick: (row: typeof documents[0]) => {
        console.log("Review document:", row.id);
      }
    },
    {
      label: "Verify",
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: (row: typeof documents[0]) => {
        console.log("Verify document:", row.id);
      },
      variant: "default" as const
    },
    {
      label: "Reject",
      icon: <XCircle className="h-4 w-4" />,
      onClick: (row: typeof documents[0]) => {
        console.log("Reject document:", row.id);
      },
      variant: "destructive" as const
    }
  ];
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compliance & Audit Center</h1>
          <p className="text-gray-600 mt-1">Regulatory compliance, audit trails, and document verification</p>
        </div>        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <FileCheck className="h-4 w-4" />
            <span>Run Audit</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Compliance KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminKpiCard
          title="Compliance Score"
          value={`${complianceOverview.complianceScore}%`}
          change={{
            value: 1.2,
            period: "vs last month",
            trend: "up"
          }}
          icon={<Scale className="h-5 w-5" />}
          status="normal"
        />
        
        <AdminKpiCard
          title="Documents Processed"
          value={complianceOverview.documentsProcessed.toLocaleString()}
          change={{
            value: 234,
            period: "this month",
            trend: "up"
          }}
          icon={<FileCheck className="h-5 w-5" />}
          status="normal"
        />

        <AdminKpiCard
          title="Pending Reviews"
          value={complianceOverview.pendingReviews}
          change={{
            value: -18.5,
            period: "vs last week",
            trend: "down"
          }}
          icon={<Clock className="h-5 w-5" />}
          status={complianceOverview.pendingReviews > 50 ? "warning" : "normal"}
        />

        <AdminKpiCard
          title="Active Violations"
          value={complianceOverview.violationsFound}
          change={{
            value: -2,
            period: "vs last month",
            trend: "down"
          }}
          icon={<AlertTriangle className="h-5 w-5" />}
          status={complianceOverview.violationsFound > 10 ? "critical" : "normal"}
        />
      </div>

      {/* Compliance Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audits">Audit Trails</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Checks</TabsTrigger>
          <TabsTrigger value="violations">Violations</TabsTrigger>
          <TabsTrigger value="documents">Document Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Compliance Status */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Regulatory Compliance Status</CardTitle>
                <CardDescription>Current compliance with various regulations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">PDPA Compliance</p>
                        <p className="text-sm text-gray-600">Personal Data Protection Act</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">98.5%</Badge>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium">BNM Guidelines</p>
                        <p className="text-sm text-gray-600">Bank Negara Malaysia</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">94.2%</Badge>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">ISO 27001</p>
                        <p className="text-sm text-gray-600">Information Security</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">96.8%</Badge>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-3">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium">Hajj Regulations</p>
                        <p className="text-sm text-gray-600">Ministry of Hajj and Umrah</p>
                      </div>
                    </div>
                    <Badge className="bg-red-100 text-red-800">87.1%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Compliance Activity</CardTitle>
                <CardDescription>Latest compliance checks and findings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Document verification completed</p>
                    <p className="text-xs text-gray-600">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">BNM audit findings addressed</p>
                    <p className="text-xs text-gray-600">6 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">PDPA compliance check passed</p>
                    <p className="text-xs text-gray-600">1 day ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Security violation detected</p>
                    <p className="text-xs text-gray-600">2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Total Audits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{complianceOverview.totalAudits}</div>
                <p className="text-xs text-gray-600">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Resolved Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{complianceOverview.resolvedIssues}</div>
                <p className="text-xs text-gray-600">Total resolved</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Avg. Resolution Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">4.2</div>
                <p className="text-xs text-gray-600">Days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Compliance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">↗ +1.2%</div>
                <p className="text-xs text-gray-600">This month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audits" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search audit trails..."
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

          <Card>
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
              <CardDescription>Complete audit trail of all system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminDataTable
                data={auditTrails}
                columns={auditColumns}
                actions={auditActions}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Monitoring</CardTitle>
              <CardDescription>Automated compliance checks and their results</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminDataTable
                data={complianceChecks}
                columns={complianceColumns}
                actions={complianceActions}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="violations" className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800">Compliance Violations</h3>
                <p className="text-sm text-red-700 mt-1">
                  These violations require immediate attention and may result in regulatory action if not addressed.
                </p>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Violations</CardTitle>
              <CardDescription>Detected compliance violations requiring investigation</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminDataTable
                data={violations}
                columns={violationColumns}
                actions={violationActions}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Verification Queue</CardTitle>
              <CardDescription>Pilgrim documents awaiting verification</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminDataTable
                data={documents}
                columns={documentColumns}
                actions={documentActions}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
