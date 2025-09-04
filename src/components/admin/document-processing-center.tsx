'use client'

import React, { useState, useEffect } from 'react'
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Eye,
  Download,
  RefreshCw,
  Filter,
  Search,
  MoreHorizontal
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  DocumentData, 
  DocumentProcessingStats,
  SuspiciousDocument 
} from '@/types/document-processing'
import { 
  getDocumentStats,
  getPendingDocuments,
  getFlaggedDocuments,
  approveDocument,
  rejectDocument,
  requestManualReview
} from '@/lib/document-processing-api'

interface DocumentProcessingCenterProps {
  className?: string
}

export function DocumentProcessingCenter({ className }: DocumentProcessingCenterProps) {
  const [stats, setStats] = useState<DocumentProcessingStats | null>(null)
  const [pendingDocuments, setPendingDocuments] = useState<DocumentData[]>([])
  const [flaggedDocuments, setFlaggedDocuments] = useState<SuspiciousDocument[]>([])
  const [activeTab, setActiveTab] = useState<'pending' | 'flagged' | 'approved'>('pending')
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [statsData, pendingData, flaggedData] = await Promise.all([
        getDocumentStats(),
        getPendingDocuments(50, 0),
        getFlaggedDocuments()
      ])
      
      setStats(statsData)
      setPendingDocuments(pendingData.documents)
      setFlaggedDocuments(flaggedData)
    } catch (error) {
      console.error('Failed to load document data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (documentId: string) => {
    try {
      await approveDocument(documentId, 'current-officer', 'Approved via AI processing center')
      await loadData() // Refresh data
    } catch (error) {
      console.error('Failed to approve document:', error)
    }
  }

  const handleReject = async (documentId: string, reason: string) => {
    try {
      await rejectDocument(documentId, 'current-officer', reason)
      await loadData() // Refresh data
    } catch (error) {
      console.error('Failed to reject document:', error)
    }
  }

  const handleManualReview = async (documentId: string) => {
    try {
      await requestManualReview(documentId, 'current-officer', 'normal')
      await loadData() // Refresh data
    } catch (error) {
      console.error('Failed to request manual review:', error)
    }
  }

  const getStatusBadge = (confidence: number, fraudPatterns?: any[]) => {
    if (fraudPatterns && fraudPatterns.length > 0) {
      return <Badge variant="destructive">Flagged</Badge>
    }
    if (confidence >= 0.95) {
      return <Badge variant="default" className="bg-green-100 text-green-800">Auto-Approved</Badge>
    }
    if (confidence >= 0.85) {
      return <Badge variant="secondary">Ready for Review</Badge>
    }
    return <Badge variant="outline">Needs Review</Badge>
  }

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case 'ic':
        return <FileText className="h-4 w-4" />
      case 'passport':
        return <FileText className="h-4 w-4" />
      case 'health_certificate':
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalDocuments || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.processedToday || 0} processed today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automation Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((stats?.automationRate || 0) * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Avg processing: {stats?.averageProcessingTime || 0}s
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pendingReview || 0}</div>
            <p className="text-xs text-muted-foreground">
              Requires human review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Documents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats?.flaggedDocuments || 0}</div>
            <p className="text-xs text-muted-foreground">
              Suspicious patterns detected
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant={activeTab === 'pending' ? 'default' : 'outline'}
            onClick={() => setActiveTab('pending')}
          >
            Pending ({pendingDocuments.length})
          </Button>
          <Button
            variant={activeTab === 'flagged' ? 'default' : 'outline'}
            onClick={() => setActiveTab('flagged')}
          >
            Flagged ({flaggedDocuments.length})
          </Button>
          <Button
            variant={activeTab === 'approved' ? 'default' : 'outline'}
            onClick={() => setActiveTab('approved')}
          >
            Recently Approved
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[250px]"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={loadData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {activeTab === 'pending' && 'Pending Documents'}
            {activeTab === 'flagged' && 'Flagged Documents'}
            {activeTab === 'approved' && 'Recently Approved'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Pilgrim</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeTab === 'pending' && pendingDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="flex items-center space-x-2">
                    {getDocumentTypeIcon(doc.type)}
                    <span className="font-medium">Document #{doc.id.slice(-6)}</span>
                  </TableCell>
                  <TableCell>Pilgrim #{doc.id.slice(0, 6)}</TableCell>
                  <TableCell className="capitalize">{doc.type.replace('_', ' ')}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded">
                        <div 
                          className={`h-2 rounded ${
                            doc.confidence >= 0.9 ? 'bg-green-500' : 
                            doc.confidence >= 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${doc.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-sm">{(doc.confidence * 100).toFixed(1)}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(doc.confidence)}
                  </TableCell>
                  <TableCell>
                    {new Date(doc.metadata.uploadDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleApprove(doc.id)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleManualReview(doc.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Manual Review
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleReject(doc.id, 'Quality issues')}
                          className="text-red-600"
                        >
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}

              {activeTab === 'flagged' && flaggedDocuments.map((flagged) => (
                <TableRow key={flagged.documentId} className="bg-red-50">
                  <TableCell className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="font-medium">Document #{flagged.documentId.slice(-6)}</span>
                  </TableCell>
                  <TableCell>Pilgrim #{flagged.pilgrimId.slice(0, 6)}</TableCell>
                  <TableCell>
                    {flagged.suspiciousPatterns.map(pattern => pattern.type).join(', ')}
                  </TableCell>
                  <TableCell>
                    <Badge variant="destructive">
                      {flagged.suspiciousPatterns[0]?.severity || 'High'} Risk
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{flagged.status.replace('_', ' ')}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(flagged.flaggedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Investigate
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
