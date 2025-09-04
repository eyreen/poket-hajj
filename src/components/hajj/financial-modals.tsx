'use client'

import React, { useState } from 'react'
import { 
  ArrowUpRight, 
  CreditCard, 
  Building, 
  Calendar,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Lock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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

interface TransferModalProps {
  isOpen: boolean
  onClose: () => void
  currentBalance: number
  onTransferComplete: (transferData: any) => void
}

export function TransferModal({ 
  isOpen, 
  onClose, 
  currentBalance,
  onTransferComplete 
}: TransferModalProps) {
  const [formData, setFormData] = useState({
    amount: '',
    sourceAccount: '',
    purpose: '',
    reference: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const sourceAccounts = [
    { id: 'maybank-123', name: 'Maybank Savings - ****3456', balance: 15000 },
    { id: 'cimb-456', name: 'CIMB Current - ****7890', balance: 8500 },
    { id: 'public-789', name: 'Public Bank - ****1234', balance: 12000 },
  ]

  const purposes = [
    'Monthly Contribution',
    'Additional Savings',
    'Hajj Package Payment',
    'Document Fees',
    'Other',
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount'
    }
    
    if (!formData.sourceAccount) {
      newErrors.sourceAccount = 'Please select a source account'
    }
    
    if (!formData.purpose) {
      newErrors.purpose = 'Please select a purpose'
    }

    const selectedAccount = sourceAccounts.find(acc => acc.id === formData.sourceAccount)
    if (selectedAccount && parseFloat(formData.amount) > selectedAccount.balance) {
      newErrors.amount = 'Insufficient balance in selected account'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsProcessing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const transferData = {
      id: `TXN${Date.now()}`,
      amount: parseFloat(formData.amount),
      sourceAccount: formData.sourceAccount,
      purpose: formData.purpose,
      reference: formData.reference || `TH-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'completed',
    }
    
    onTransferComplete(transferData)
    setIsProcessing(false)
    onClose()
    
    // Reset form
    setFormData({
      amount: '',
      sourceAccount: '',
      purpose: '',
      reference: '',
    })
  }

  const selectedAccount = sourceAccounts.find(acc => acc.id === formData.sourceAccount)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ArrowUpRight className="h-5 w-5 text-green-600" />
            <span>Transfer to TH Account</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current TH Balance */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current TH Balance</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(currentBalance)}
                  </p>
                </div>
                <Building className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          {/* Transfer Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Transfer Amount *</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className={errors.amount ? 'border-red-500' : ''}
              />
              {errors.amount && (
                <p className="text-sm text-red-500 mt-1">{errors.amount}</p>
              )}
            </div>

            <div>
              <Label htmlFor="sourceAccount">From Account *</Label>
              <Select 
                value={formData.sourceAccount} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, sourceAccount: value }))}
              >
                <SelectTrigger className={errors.sourceAccount ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select source account" />
                </SelectTrigger>
                <SelectContent>
                  {sourceAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      <div className="flex flex-col">
                        <span>{account.name}</span>
                        <span className="text-xs text-gray-500">
                          Balance: {formatCurrency(account.balance)}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.sourceAccount && (
                <p className="text-sm text-red-500 mt-1">{errors.sourceAccount}</p>
              )}
            </div>

            {selectedAccount && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-700">Available Balance:</span>
                    <span className="font-medium text-blue-800">
                      {formatCurrency(selectedAccount.balance)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            <div>
              <Label htmlFor="purpose">Purpose *</Label>
              <Select 
                value={formData.purpose} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, purpose: value }))}
              >
                <SelectTrigger className={errors.purpose ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  {purposes.map((purpose) => (
                    <SelectItem key={purpose} value={purpose}>
                      {purpose}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.purpose && (
                <p className="text-sm text-red-500 mt-1">{errors.purpose}</p>
              )}
            </div>

            <div>
              <Label htmlFor="reference">Reference (Optional)</Label>
              <Input
                id="reference"
                placeholder="Enter reference note"
                value={formData.reference}
                onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
              />
            </div>
          </div>

          {/* Transfer Summary */}
          {formData.amount && selectedAccount && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Transfer Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Transfer Amount:</span>
                  <span className="font-medium">{formatCurrency(parseFloat(formData.amount))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Transfer Fee:</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total Amount:</span>
                  <span>{formatCurrency(parseFloat(formData.amount))}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Notice */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <Lock className="h-4 w-4" />
            <span>This transfer is secured with bank-grade encryption</span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Transfer Now
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface AutoDepositModalProps {
  isOpen: boolean
  onClose: () => void
  onSetupComplete: (setupData: any) => void
}

export function AutoDepositModal({ 
  isOpen, 
  onClose, 
  onSetupComplete 
}: AutoDepositModalProps) {
  const [formData, setFormData] = useState({
    amount: '',
    frequency: '',
    sourceAccount: '',
    startDate: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const frequencies = [
    { value: 'weekly', label: 'Weekly', description: 'Every Friday' },
    { value: 'monthly', label: 'Monthly', description: 'Every 1st of the month' },
    { value: 'bi-monthly', label: 'Bi-Monthly', description: 'Every 1st and 15th' },
  ]

  const sourceAccounts = [
    { id: 'maybank-123', name: 'Maybank Savings - ****3456' },
    { id: 'cimb-456', name: 'CIMB Current - ****7890' },
    { id: 'public-789', name: 'Public Bank - ****1234' },
  ]

  const handleSubmit = async () => {
    setIsProcessing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const setupData = {
      id: `AD${Date.now()}`,
      amount: parseFloat(formData.amount),
      frequency: formData.frequency,
      sourceAccount: formData.sourceAccount,
      startDate: formData.startDate,
      status: 'active',
      nextTransfer: formData.startDate,
    }
    
    onSetupComplete(setupData)
    setIsProcessing(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span>Setup Auto-Deposit</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Deposit Amount *</Label>
              <Input
                id="amount"
                type="number"
                placeholder="500.00"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="frequency">Frequency *</Label>
              <Select 
                value={formData.frequency} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((freq) => (
                    <SelectItem key={freq.value} value={freq.value}>
                      <div className="flex flex-col">
                        <span>{freq.label}</span>
                        <span className="text-xs text-gray-500">{freq.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sourceAccount">From Account *</Label>
              <Select 
                value={formData.sourceAccount} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, sourceAccount: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source account" />
                </SelectTrigger>
                <SelectContent>
                  {sourceAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Preview */}
          {formData.amount && formData.frequency && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-4">
                <h3 className="font-semibold text-green-800 mb-2">Auto-Deposit Preview</h3>
                <div className="space-y-1 text-sm text-green-700">
                  <p>{formatCurrency(parseFloat(formData.amount))} will be transferred {formData.frequency}</p>
                  <p>Annual total: {formatCurrency(parseFloat(formData.amount) * (formData.frequency === 'weekly' ? 52 : formData.frequency === 'monthly' ? 12 : 24))}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={isProcessing || !formData.amount || !formData.frequency || !formData.sourceAccount || !formData.startDate}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Setting Up...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Setup Auto-Deposit
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
