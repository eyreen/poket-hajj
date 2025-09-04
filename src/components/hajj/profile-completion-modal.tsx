'use client'

import React, { useState } from 'react'
import { 
  User, 
  FileText, 
  Users, 
  Phone, 
  CheckCircle,
  Upload,
  X,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAuthStore } from '@/lib/store'

interface ProfileCompletionModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

interface ProfileStep {
  id: string
  title: string
  icon: React.ReactNode
  completed: boolean
}

export function ProfileCompletionModal({ 
  isOpen, 
  onClose, 
  onComplete 
}: ProfileCompletionModalProps) {
  const { user, updateUser } = useAuthStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: user?.name || '',
      icNumber: '',
      dateOfBirth: '',
      address: '',
      city: '',
      state: '',
      postcode: '',
    },
    healthCertificate: {
      uploaded: false,
      fileName: '',
      expiryDate: '',
    },
    nextOfKin: {
      name: '',
      relationship: '',
      phone: '',
      email: '',
      address: '',
    },
    emergencyContact: {
      name: '',
      phone: '',
      relationship: '',
      address: '',
    },
  })

  const steps: ProfileStep[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: <User className="h-5 w-5" />,
      completed: false,
    },
    {
      id: 'health',
      title: 'Health Certificate',
      icon: <FileText className="h-5 w-5" />,
      completed: formData.healthCertificate.uploaded,
    },
    {
      id: 'nextofkin',
      title: 'Next of Kin',
      icon: <Users className="h-5 w-5" />,
      completed: false,
    },
    {
      id: 'emergency',
      title: 'Emergency Contact',
      icon: <Phone className="h-5 w-5" />,
      completed: false,
    },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        healthCertificate: {
          ...prev.healthCertificate,
          uploaded: true,
          fileName: file.name,
        }
      }))
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete profile
      updateUser({
        ...user,
        profileComplete: true,
      })
      onComplete()
      onClose()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.personalInfo.fullName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="icNumber">IC Number</Label>
                <Input
                  id="icNumber"
                  value={formData.personalInfo.icNumber}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, icNumber: e.target.value }
                  }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.personalInfo.city}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, city: e.target.value }
                  }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.personalInfo.address}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, address: e.target.value }
                }))}
              />
            </div>
          </div>
        )
      
      case 1:
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {formData.healthCertificate.uploaded ? (
                <div className="space-y-2">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                  <p className="text-sm font-medium">{formData.healthCertificate.fileName}</p>
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    Uploaded Successfully
                  </Badge>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-600">Upload your health certificate</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="health-cert-upload"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById('health-cert-upload')?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              )}
            </div>
            {formData.healthCertificate.uploaded && (
              <div>
                <Label htmlFor="expiryDate">Certificate Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.healthCertificate.expiryDate}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    healthCertificate: { ...prev.healthCertificate, expiryDate: e.target.value }
                  }))}
                />
              </div>
            )}
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nextOfKinName">Full Name</Label>
                <Input
                  id="nextOfKinName"
                  value={formData.nextOfKin.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    nextOfKin: { ...prev.nextOfKin, name: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="relationship">Relationship</Label>
                <Input
                  id="relationship"
                  value={formData.nextOfKin.relationship}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    nextOfKin: { ...prev.nextOfKin, relationship: e.target.value }
                  }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nextOfKinPhone">Phone Number</Label>
                <Input
                  id="nextOfKinPhone"
                  value={formData.nextOfKin.phone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    nextOfKin: { ...prev.nextOfKin, phone: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="nextOfKinEmail">Email</Label>
                <Input
                  id="nextOfKinEmail"
                  type="email"
                  value={formData.nextOfKin.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    nextOfKin: { ...prev.nextOfKin, email: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyName">Full Name</Label>
                <Input
                  id="emergencyName"
                  value={formData.emergencyContact.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    emergencyContact: { ...prev.emergencyContact, name: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="emergencyRelationship">Relationship</Label>
                <Input
                  id="emergencyRelationship"
                  value={formData.emergencyContact.relationship}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    emergencyContact: { ...prev.emergencyContact, relationship: e.target.value }
                  }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="emergencyPhone">Phone Number</Label>
              <Input
                id="emergencyPhone"
                value={formData.emergencyContact.phone}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  emergencyContact: { ...prev.emergencyContact, phone: e.target.value }
                }))}
              />
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  const progressPercentage = ((currentStep + 1) / steps.length) * 100

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Complete Your Profile</span>
            <Badge variant="outline">{currentStep + 1} of {steps.length}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="w-full" />
          </div>

          {/* Steps Navigator */}
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center space-y-2 flex-1 ${
                  index <= currentStep ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    index <= currentStep
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <span className="text-xs font-medium text-center">{step.title}</span>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {steps[currentStep].icon}
                <span>{steps[currentStep].title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
              {currentStep === steps.length - 1 ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Profile
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
