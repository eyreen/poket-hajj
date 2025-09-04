'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  Bot, 
  Send, 
  User, 
  Loader2,
  HelpCircle,
  MessageSquare,
  X,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatRelativeTime } from '@/lib/utils'

interface Message {
  id: string
  content: string
  type: 'user' | 'assistant'
  timestamp: Date
  suggestions?: string[]
}

interface AiAssistantModalProps {
  isOpen: boolean
  onClose: () => void
  userContext?: {
    queuePosition?: number
    savingsAmount?: number
    profileCompleteness?: number
  }
}

export function AiAssistantModal({ 
  isOpen, 
  onClose,
  userContext 
}: AiAssistantModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! I'm your Hajj Assistant. I can help you with questions about your Hajj journey, queue position, savings goals, and more. How can I assist you today?`,
      type: 'assistant',
      timestamp: new Date(),
      suggestions: [
        "How can I improve my queue position?",
        "What documents do I need?",
        "Help me set savings goals",
        "Show me suitable packages"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickQuestions = [
    {
      category: "Queue & Registration",
      questions: [
        "How can I improve my queue position?",
        "When will I likely get selected?",
        "What factors affect my queue position?",
        "How do I update my registration details?"
      ]
    },
    {
      category: "Savings & Finance",
      questions: [
        "How much should I save monthly?",
        "What are the package price ranges?",
        "Can I set up automatic savings?",
        "What payment methods are accepted?"
      ]
    },
    {
      category: "Documents & Requirements",
      questions: [
        "What documents do I need for Hajj?",
        "How do I upload my health certificate?",
        "Passport validity requirements",
        "Vaccination requirements"
      ]
    },
    {
      category: "Packages & Travel",
      questions: [
        "Show me packages within my budget",
        "What's included in hajj packages?",
        "Best time to book a package",
        "How to compare different packages"
      ]
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAiResponse = async (userMessage: string): Promise<Message> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    let response = ''
    let suggestions: string[] = []

    // Simple rule-based responses based on keywords
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes('queue') || lowerMessage.includes('position')) {
      response = `Based on your current queue position (#${userContext?.queuePosition?.toLocaleString() || '153,238'}), here are ways to improve your standing:

1. **Complete your profile** - You're currently at ${userContext?.profileCompleteness || 70}% completion
2. **Maintain consistent savings** - Regular contributions show commitment
3. **Update health documents** - Keep all certificates current
4. **Ensure all information is accurate** - Any discrepancies can affect your position

Your estimated departure year is around 2040, but this can improve with consistent savings and complete documentation.`
      
      suggestions = [
        "How do I complete my profile?",
        "Set up automatic savings",
        "What documents am I missing?",
        "Show me savings goals"
      ]
    } else if (lowerMessage.includes('savings') || lowerMessage.includes('money') || lowerMessage.includes('budget')) {
      response = `Great question about savings! Here's your financial overview:

**Current Savings:** RM ${userContext?.savingsAmount?.toLocaleString() || '24,500'}
**Recommended Monthly Savings:** RM 500-800

**Tips to reach your goal faster:**
- Set up auto-deposit to avoid missed payments
- Consider TH investment products for better returns
- Track your progress with our savings calculator
- Join the savings challenge for extra motivation

Package prices typically range from RM 25,000 (Economy) to RM 80,000 (Luxury).`
      
      suggestions = [
        "Setup auto-deposit",
        "Show me investment options",
        "Calculate my savings timeline",
        "Find packages in my budget"
      ]
    } else if (lowerMessage.includes('document') || lowerMessage.includes('certificate') || lowerMessage.includes('passport')) {
      response = `Here are the essential documents you'll need for Hajj:

**Required Documents:**
✅ Valid Passport (minimum 6 months validity)
✅ Health Certificate from approved clinic
✅ Vaccination certificates (Meningitis, COVID-19)
✅ IC copy and photos
✅ Next of kin details

**Pro Tips:**
- Upload documents as soon as possible
- Ensure all names match exactly across documents
- Keep digital copies for backup
- Check expiry dates regularly

Would you like me to guide you through uploading any specific document?`
      
      suggestions = [
        "Upload health certificate",
        "Check passport validity",
        "Complete next of kin details",
        "Download document checklist"
      ]
    } else if (lowerMessage.includes('package') || lowerMessage.includes('travel') || lowerMessage.includes('booking')) {
      response = `I can help you find the perfect Hajj package! Here's what to consider:

**Package Categories:**
- **Economy (RM 25k-35k):** Basic accommodation, group transport
- **Standard (RM 35k-50k):** Good hotels, more amenities
- **Premium (RM 50k-70k):** 4-5 star hotels, premium services
- **Luxury (RM 70k+):** Top-tier accommodation and services

**What's typically included:**
✅ Return flights ✅ Accommodation ✅ Transport in Saudi
✅ Experienced guide ✅ Group meals ✅ Visa processing

Based on your savings of RM ${userContext?.savingsAmount?.toLocaleString() || '24,500'}, I'd recommend looking at packages in the RM 35k-45k range.`
      
      suggestions = [
        "Show me recommended packages",
        "Compare package features",
        "Check package availability",
        "Book a consultation call"
      ]
    } else {
      response = `I understand you're asking about "${userMessage}". I'm here to help with all aspects of your Hajj journey!

I can assist you with:
- Queue position and registration updates
- Savings goals and financial planning  
- Document requirements and uploads
- Package recommendations and bookings
- Travel preparations and requirements

What specific area would you like to explore? Feel free to ask me anything!`
      
      suggestions = [
        "Check my queue status",
        "Review my savings plan", 
        "See required documents",
        "Browse hajj packages"
      ]
    }

    return {
      id: Date.now().toString(),
      content: response,
      type: 'assistant',
      timestamp: new Date(),
      suggestions
    }
  }

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputValue.trim()
    if (!messageToSend) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      type: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Generate AI response
    try {
      const aiResponse = await generateAiResponse(messageToSend)
      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        type: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <span>Hajj AI Assistant</span>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              Online
            </Badge>
          </DialogTitle>
        </DialogHeader>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4 border rounded-lg bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-white border'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'assistant' && (
                    <Bot className="h-4 w-4 text-blue-600 mt-1 shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {formatRelativeTime(message.timestamp)}
                    </p>
                  </div>
                </div>
                
                {/* Suggestions */}
                {message.suggestions && (
                  <div className="mt-3 space-y-1">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto p-2 bg-blue-50 border-blue-200 hover:bg-blue-100"
                        onClick={() => handleSendMessage(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-blue-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <details className="shrink-0">
          <summary className="flex items-center space-x-2 text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-800">
            <HelpCircle className="h-4 w-4" />
            <span>Quick Questions</span>
            <ChevronDown className="h-4 w-4" />
          </summary>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3 max-h-32 overflow-y-auto">
            {quickQuestions.map((category) => (
              <Card key={category.category} className="p-2">
                <p className="text-xs font-medium text-gray-700 mb-1">{category.category}</p>
                <div className="space-y-1">
                  {category.questions.slice(0, 2).map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 text-xs justify-start"
                      onClick={() => handleSendMessage(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </details>

        {/* Input Area */}
        <div className="shrink-0 flex space-x-2">
          <Input
            placeholder="Ask me anything about your Hajj journey..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTyping}
          />
          <Button 
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
