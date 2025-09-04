'use client'

import React, { useState, useCallback } from 'react'
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  X, 
  RefreshCw,
  Eye,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { uploadDocument, processDocument } from '@/lib/document-processing-api'
import { DocumentData } from '@/types/document-processing'

interface DocumentUploadModalProps {
  pilgrimId: string
  onUploadComplete?: (document: DocumentData) => void
}

interface UploadStatus {
  file: File
  progress: number
  status: 'uploading' | 'processing' | 'completed' | 'error'
  result?: DocumentData
  error?: string
}

const documentTypes = [
  { value: 'ic', label: 'Identity Card (IC)' },
  { value: 'passport', label: 'Passport' },
  { value: 'health_certificate', label: 'Health Certificate' },
  { value: 'financial_statement', label: 'Financial Statement' },
  { value: 'visa', label: 'Visa Document' },
  { value: 'other', label: 'Other Document' }
]

export function DocumentUploadModal({ pilgrimId, onUploadComplete }: DocumentUploadModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string>('')
  const [uploads, setUploads] = useState<UploadStatus[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleFiles = async (files: File[]) => {
    if (!selectedType) {
      alert('Please select a document type first')
      return
    }

    for (const file of files) {
      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
        alert('Please upload only images or PDF files')
        continue
      }

      const uploadStatus: UploadStatus = {
        file,
        progress: 0,
        status: 'uploading'
      }

      setUploads(prev => [...prev, uploadStatus])

      try {
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploads(prev => prev.map(upload => 
            upload.file === file && upload.progress < 90
              ? { ...upload, progress: upload.progress + 10 }
              : upload
          ))
        }, 200)

        // Upload document
        const uploadResult = await uploadDocument(file, selectedType, pilgrimId)
        
        clearInterval(progressInterval)
        
        setUploads(prev => prev.map(upload => 
          upload.file === file 
            ? { ...upload, progress: 100, status: 'processing' }
            : upload
        ))

        // Process document with AI
        const processResult = await processDocument(uploadResult.id)
        
        setUploads(prev => prev.map(upload => 
          upload.file === file 
            ? { ...upload, status: 'completed', result: processResult }
            : upload
        ))

        onUploadComplete?.(processResult)

      } catch (error) {
        setUploads(prev => prev.map(upload => 
          upload.file === file 
            ? { ...upload, status: 'error', error: error instanceof Error ? error.message : 'Upload failed' }
            : upload
        ))
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const removeUpload = (file: File) => {
    setUploads(prev => prev.filter(upload => upload.file !== file))
  }

  const getStatusIcon = (status: UploadStatus['status']) => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <RefreshCw className="h-4 w-4 animate-spin" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusBadge = (upload: UploadStatus) => {
    switch (upload.status) {
      case 'uploading':
        return <Badge variant="secondary">Uploading...</Badge>
      case 'processing':
        return <Badge variant="secondary">Processing with AI...</Badge>
      case 'completed':
        const confidence = upload.result?.confidence || 0
        if (confidence >= 0.95) {
          return <Badge variant="default" className="bg-green-100 text-green-800">Auto-Verified</Badge>
        } else if (confidence >= 0.85) {
          return <Badge variant="secondary">Pending Review</Badge>
        } else {
          return <Badge variant="destructive">Needs Manual Review</Badge>
        }
      case 'error':
        return <Badge variant="destructive">Error</Badge>
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Documents
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Documents for AI Processing</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Document Type Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Document Type</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Drop files here or click to upload
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">
                    Supports: JPG, PNG, PDF (Max 10MB per file)
                  </span>
                </label>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileInput}
                  disabled={!selectedType}
                />
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {uploads.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Upload Progress</h3>
              {uploads.map((upload) => (
                <Card key={upload.file.name}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(upload.status)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {upload.file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(upload.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(upload)}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeUpload(upload.file)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {upload.status === 'uploading' && (
                      <Progress value={upload.progress} className="mt-2" />
                    )}

                    {upload.status === 'completed' && upload.result && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between text-xs">
                          <span>AI Confidence: {(upload.result.confidence * 100).toFixed(1)}%</span>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        {upload.result.confidence < 0.85 && (
                          <p className="text-xs text-orange-600 mt-1">
                            This document will require manual review by our officers.
                          </p>
                        )}
                      </div>
                    )}

                    {upload.status === 'error' && (
                      <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-600">
                        {upload.error}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* AI Processing Info */}
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900">AI-Powered Processing</p>
                  <p className="text-blue-700 mt-1">
                    Our advanced AI system will automatically extract and verify information from your documents. 
                    Documents with high confidence scores (95%+) are auto-approved, while others are queued for quick human review.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
