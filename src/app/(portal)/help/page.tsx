'use client'

import React, { useState } from 'react'
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageCircle,
  Book,
  FileText,
  Download,
  Search,
  ChevronRight,
  Bot,
  Clock,
  MapPin,
  CreditCard,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { AiAssistantModal } from '@/components/hajj/ai-assistant-modal'

const faqData = [
  {
    category: "Registration & Queue",
    questions: [
      {
        question: "How can I check my current queue position?",
        answer: "You can check your queue position on the Dashboard or My Hajj Journey page. Your position is updated in real-time and shows your estimated departure year."
      },
      {
        question: "What factors affect my queue position?",
        answer: "Your queue position is influenced by: completion of your profile, consistent savings contributions, up-to-date health certificates, and accurate documentation."
      },
      {
        question: "Can I improve my queue position?",
        answer: "Yes! Complete your profile 100%, maintain regular savings contributions, keep your health certificates current, and ensure all documentation is accurate and up-to-date."
      },
      {
        question: "When will I likely be selected for Hajj?",
        answer: "Your estimated departure year is calculated based on your current queue position, savings rate, and profile completeness. Check the My Hajj Journey page for your personalized forecast."
      }
    ]
  },
  {
    category: "Savings & Finances",
    questions: [
      {
        question: "How much should I save monthly for Hajj?",
        answer: "The recommended monthly savings amount depends on your target departure year and chosen package type. Our AI assistant can help calculate the optimal amount based on your goals."
      },
      {
        question: "What payment methods are accepted?",
        answer: "We accept bank transfers, online banking, credit/debit cards, and you can set up automatic monthly deposits from your bank account."
      },
      {
        question: "Can I change my savings goal?",
        answer: "Yes, you can adjust your savings target anytime. Visit the Finances page to update your monthly contribution amount and target timeline."
      },
      {
        question: "What happens if I miss a monthly payment?",
        answer: "Missing payments may affect your queue position slightly. We recommend setting up auto-deposit to ensure consistent contributions. Contact support if you're facing financial difficulties."
      }
    ]
  },
  {
    category: "Packages & Travel",
    questions: [
      {
        question: "How do I choose the right Hajj package?",
        answer: "Use our AI-powered package recommender that analyzes your budget, preferences, and requirements to suggest the most suitable packages. You can also compare packages manually."
      },
      {
        question: "What's included in the Hajj packages?",
        answer: "Packages typically include flights, accommodation, transportation in Saudi Arabia, meals, experienced guides, visa processing, and travel insurance. Specific inclusions vary by package type."
      },
      {
        question: "Can I customize my Hajj package?",
        answer: "While packages have standard inclusions, you can often add optional services like room upgrades, extended stays, or additional tours. Contact our travel consultants for customization options."
      },
      {
        question: "When should I book my Hajj package?",
        answer: "We recommend booking as early as possible, ideally 1-2 years before your intended departure year. Early booking ensures better availability and pricing."
      }
    ]
  },
  {
    category: "Documents & Requirements",
    questions: [
      {
        question: "What documents do I need for Hajj?",
        answer: "Required documents include: valid passport (min. 6 months validity), health certificate from approved clinic, vaccination certificates (Meningitis, COVID-19), and completed Hajj application forms."
      },
      {
        question: "How do I upload my health certificate?",
        answer: "You can upload your health certificate in the Profile Completion section. Ensure the certificate is from a government-approved clinic and clearly shows all required vaccinations."
      },
      {
        question: "What vaccinations are required?",
        answer: "Required vaccinations include Meningococcal (ACWY), Yellow Fever (if coming from endemic areas), and COVID-19. Seasonal flu vaccination is also recommended. Check with approved clinics for the latest requirements."
      },
      {
        question: "How often do I need to update my health certificate?",
        answer: "Health certificates are typically valid for 1 year. You'll need to renew and upload updated certificates annually to maintain your active status in the queue."
      }
    ]
  }
]

const quickActions = [
  {
    title: "Chat with AI Assistant",
    description: "Get instant answers to your Hajj questions",
    icon: Bot,
    action: "ai-chat",
    color: "bg-blue-50 border-blue-200 text-blue-700"
  },
  {
    title: "Check Queue Status",
    description: "View your current position and estimates",
    icon: Clock,
    action: "queue-status",
    color: "bg-green-50 border-green-200 text-green-700"
  },
  {
    title: "Financial Help",
    description: "Get help with savings and payments",
    icon: CreditCard,
    action: "financial-help",
    color: "bg-yellow-50 border-yellow-200 text-yellow-700"
  },
  {
    title: "Travel Guidance",
    description: "Learn about packages and requirements",
    icon: MapPin,
    action: "travel-guide",
    color: "bg-purple-50 border-purple-200 text-purple-700"
  }
]

const contactMethods = [
  {
    title: "Phone Support",
    description: "Speak directly with our support team",
    detail: "+60 3-2123-4567",
    hours: "Mon-Fri: 9 AM - 6 PM",
    icon: Phone,
    action: "tel:+60321234567"
  },
  {
    title: "Email Support",
    description: "Send us your questions via email",
    detail: "support@pokethajj.com",
    hours: "Response within 24 hours",
    icon: Mail,
    action: "mailto:support@pokethajj.com"
  },
  {
    title: "Live Chat",
    description: "Chat with our support agents",
    detail: "Available now",
    hours: "Mon-Fri: 9 AM - 6 PM",
    icon: MessageCircle,
    action: "live-chat"
  }
]

const resources = [
  {
    title: "Hajj Guide 2025",
    description: "Complete guide to Hajj pilgrimage",
    type: "PDF",
    size: "2.4 MB",
    icon: Book
  },
  {
    title: "Document Checklist",
    description: "Printable checklist of required documents",
    type: "PDF",
    size: "156 KB",
    icon: FileText
  },
  {
    title: "Savings Calculator",
    description: "Excel template for planning your savings",
    type: "Excel",
    size: "45 KB",
    icon: Download
  },
  {
    title: "Health Requirements",
    description: "Medical and vaccination requirements",
    type: "PDF",
    size: "890 KB",
    icon: FileText
  }
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false)
  const [filteredFAQs, setFilteredFAQs] = useState(faqData)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setFilteredFAQs(faqData)
      return
    }

    const filtered = faqData.map(category => ({
      ...category,
      questions: category.questions.filter(q => 
        q.question.toLowerCase().includes(query.toLowerCase()) ||
        q.answer.toLowerCase().includes(query.toLowerCase())
      )
    })).filter(category => category.questions.length > 0)

    setFilteredFAQs(filtered)
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'ai-chat':
        setAiAssistantOpen(true)
        break
      case 'queue-status':
        window.location.href = '/my-journey'
        break
      case 'financial-help':
        window.location.href = '/finances'
        break
      case 'travel-guide':
        window.location.href = '/packages'
        break
      default:
        break
    }
  }

  const handleContactAction = (action: string) => {
    if (action.startsWith('tel:') || action.startsWith('mailto:')) {
      window.location.href = action
    } else if (action === 'live-chat') {
      // Open live chat widget
      console.log('Opening live chat...')
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-gray-600 mt-2">
            Find answers to your questions or get in touch with our support team
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search for help topics..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.action)}
                className={`p-4 rounded-lg border-2 text-left hover:shadow-md transition-shadow ${action.color}`}
              >
                <action.icon className="h-6 w-6 mb-2" />
                <h3 className="font-medium mb-1">{action.title}</h3>
                <p className="text-sm opacity-80">{action.description}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5" />
                <span>Frequently Asked Questions</span>
              </CardTitle>
              {searchQuery && (
                <p className="text-sm text-gray-500">
                  {filteredFAQs.reduce((total, category) => total + category.questions.length, 0)} results found
                </p>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredFAQs.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {category.category}
                    </h3>
                    <Accordion type="single" collapsible className="space-y-2">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem 
                          key={faqIndex} 
                          value={`${categoryIndex}-${faqIndex}`}
                          className="border rounded-lg px-4"
                        >
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 pb-4">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
                
                {filteredFAQs.length === 0 && (                  <div className="text-center py-8">
                    <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No results found for &ldquo;{searchQuery}&rdquo;</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Try different keywords or contact our support team
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact & Resources */}
        <div className="space-y-6">
          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactMethods.map((method, index) => (
                <button
                  key={index}
                  onClick={() => handleContactAction(method.action)}
                  className="w-full p-4 border rounded-lg hover:bg-gray-50 text-left transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <method.icon className="h-5 w-5 text-gray-600 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium">{method.title}</h4>
                      <p className="text-sm text-gray-600">{method.description}</p>
                      <p className="text-sm font-medium text-green-600 mt-1">{method.detail}</p>
                      <p className="text-xs text-gray-500">{method.hours}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Helpful Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {resources.map((resource, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <resource.icon className="h-5 w-5 text-gray-600" />
                    <div>
                      <h4 className="font-medium text-sm">{resource.title}</h4>
                      <p className="text-xs text-gray-600">{resource.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {resource.type}
                        </Badge>
                        <span className="text-xs text-gray-500">{resource.size}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-700 mb-3">
                For urgent matters during your Hajj journey, contact our 24/7 emergency hotline:
              </p>
              <Button 
                variant="outline" 
                className="w-full border-red-300 text-red-700 hover:bg-red-100"
                onClick={() => window.location.href = 'tel:+60321234999'}
              >
                <Phone className="h-4 w-4 mr-2" />
                +60 3-2123-4999
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        userContext={{
          queuePosition: 153238,
          savingsAmount: 25000,
          profileCompleteness: 70,
        }}
      />
    </div>
  )
}
