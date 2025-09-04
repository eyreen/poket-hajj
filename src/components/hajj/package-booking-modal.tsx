'use client'

import React, { useState } from 'react'
import { 
  User, 
  CreditCard, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Plane,
  Shield,
  Lock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatCurrency } from '@/lib/utils'
import { HajjPackage } from '@/types'

interface PackageBookingModalProps {
  isOpen: boolean
  onClose: () => void
  packageData: HajjPackage | null
  onBookingComplete: (bookingData: any) => void
}

interface BookingStep {
  id: string
  title: string
  icon: React.ReactNode
  completed: boolean
}

interface PassengerData {
  fullName: string
  icNumber: string
  passportNumber: string
  dateOfBirth: string
  phone: string
  email: string
  emergencyContact: string
  emergencyPhone: string
}

export function PackageBookingModal({ 
  isOpen, 
  onClose, 
  packageData,
  onBookingComplete 
}: PackageBookingModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const [passengerData, setPassengerData] = useState<PassengerData>({
    fullName: '',
    icNumber: '',
    passportNumber: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    emergencyContact: '',
    emergencyPhone: '',
  })

  const [paymentData, setPaymentData] = useState({
    method: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
  })

  if (!packageData) return null

  const steps: BookingStep[] = [
    {
      id: 'passenger',
      title: 'Passenger Details',
      icon: <User className="h-5 w-5" />,
      completed: false,
    },
    {
      id: 'payment',
      title: 'Payment Method',
      icon: <CreditCard className="h-5 w-5" />,
      completed: false,
    },
    {
      id: 'confirmation',
      title: 'Confirmation',
      icon: <CheckCircle className="h-5 w-5" />,
      completed: false,
    },
  ]

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Process booking
      setIsProcessing(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const bookingData = {
        id: `BK${Date.now()}`,
        package: packageData,
        passenger: passengerData,
        payment: paymentData,
        totalAmount: packageData.price,
        bookingDate: new Date().toISOString(),
        status: 'confirmed',
      }
      
      onBookingComplete(bookingData)
      setIsProcessing(false)
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
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={passengerData.fullName}
                  onChange={(e) => setPassengerData(prev => ({
                    ...prev,
                    fullName: e.target.value
                  }))}
                  placeholder="As per IC/Passport"
                />
              </div>
              <div>
                <Label htmlFor="icNumber">IC Number *</Label>
                <Input
                  id="icNumber"
                  value={passengerData.icNumber}
                  onChange={(e) => setPassengerData(prev => ({
                    ...prev,
                    icNumber: e.target.value
                  }))}
                  placeholder="123456-78-9012"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="passportNumber">Passport Number *</Label>
                <Input
                  id="passportNumber"
                  value={passengerData.passportNumber}
                  onChange={(e) => setPassengerData(prev => ({
                    ...prev,
                    passportNumber: e.target.value
                  }))}
                  placeholder="A12345678"
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={passengerData.dateOfBirth}
                  onChange={(e) => setPassengerData(prev => ({
                    ...prev,
                    dateOfBirth: e.target.value
                  }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={passengerData.phone}
                  onChange={(e) => setPassengerData(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))}
                  placeholder="+60123456789"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={passengerData.email}
                  onChange={(e) => setPassengerData(prev => ({
                    ...prev,
                    email: e.target.value
                  }))}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                <Input
                  id="emergencyContact"
                  value={passengerData.emergencyContact}
                  onChange={(e) => setPassengerData(prev => ({
                    ...prev,
                    emergencyContact: e.target.value
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                <Input
                  id="emergencyPhone"
                  value={passengerData.emergencyPhone}
                  onChange={(e) => setPassengerData(prev => ({
                    ...prev,
                    emergencyPhone: e.target.value
                  }))}
                  placeholder="+60123456789"
                />
              </div>
            </div>
          </div>
        )
      
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="paymentMethod">Payment Method *</Label>
              <Select 
                value={paymentData.method} 
                onValueChange={(value) => setPaymentData(prev => ({ ...prev, method: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="online-banking">Online Banking</SelectItem>
                  <SelectItem value="installment">Installment Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentData.method === 'credit-card' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Input
                    id="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={(e) => setPaymentData(prev => ({
                      ...prev,
                      cardNumber: e.target.value
                    }))}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="expiryMonth">Expiry Month *</Label>
                    <Select 
                      value={paymentData.expiryMonth}
                      onValueChange={(value) => setPaymentData(prev => ({ ...prev, expiryMonth: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                            {String(i + 1).padStart(2, '0')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="expiryYear">Expiry Year *</Label>
                    <Select 
                      value={paymentData.expiryYear}
                      onValueChange={(value) => setPaymentData(prev => ({ ...prev, expiryYear: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem key={i} value={String(new Date().getFullYear() + i)}>
                            {new Date().getFullYear() + i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      value={paymentData.cvv}
                      onChange={(e) => setPaymentData(prev => ({
                        ...prev,
                        cvv: e.target.value
                      }))}
                      placeholder="123"
                      maxLength={3}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cardholderName">Cardholder Name *</Label>
                  <Input
                    id="cardholderName"
                    value={paymentData.cardholderName}
                    onChange={(e) => setPaymentData(prev => ({
                      ...prev,
                      cardholderName: e.target.value
                    }))}
                    placeholder="Name as per card"
                  />
                </div>
              </div>
            )}

            {paymentData.method === 'installment' && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Available Installment Plans</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">6 Months Plan</div>
                        <div className="text-sm text-gray-600">
                          {formatCurrency(packageData.price / 6)}/month
                        </div>
                      </div>
                      <Badge>0% Interest</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">12 Months Plan</div>
                        <div className="text-sm text-gray-600">
                          {formatCurrency(packageData.price / 12)}/month
                        </div>
                      </div>
                      <Badge>0% Interest</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>Your payment information is secured with 256-bit SSL encryption</span>
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-6">
            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Package:</span>
                  <span className="font-medium">{packageData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Provider:</span>
                  <span>{packageData.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span>Passenger:</span>
                  <span>{passengerData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{packageData.duration} days</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                  <span>Total Amount:</span>
                  <span>{formatCurrency(packageData.price)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Full payment is required to confirm your booking</p>
                  <p>• Cancellation charges apply as per terms</p>
                  <p>• Valid passport with minimum 6 months validity required</p>
                  <p>• Health certificate and vaccinations mandatory</p>
                  <p>• All prices are subject to currency fluctuations</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="rounded" required />
              <label htmlFor="terms" className="text-sm">
                I agree to the terms and conditions and privacy policy
              </label>
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
            <span>Book Hajj Package</span>
            <Badge variant="outline">{currentStep + 1} of {steps.length}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Booking Progress</span>
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
                  {step.icon}
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
            <Button 
              onClick={handleNext} 
              className="bg-green-600 hover:bg-green-700"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing...
                </>
              ) : currentStep === steps.length - 1 ? (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Confirm Booking
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
