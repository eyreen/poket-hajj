"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  ArrowRight, 
  Home, 
  DollarSign, 
  BarChart3, 
  Settings,
  Clock,
  CheckCircle,
  Star,
  Globe,
  Zap,
  Lock,
  TrendingUp,
  Award
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Smart Hajj Ecosystem</h1>
                <p className="text-sm text-gray-500">Tabung Haji</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                System Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-center">
              <div className="bg-white/10 p-6 rounded-full backdrop-blur-sm">
                <Home className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Smart Hajj
              <span className="block text-blue-200">Ecosystem</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Your journey to Hajj made simple, smart & secure with advanced technology and personalized guidance from Tabung Haji
            </p>
            <div className="flex justify-center space-x-4 pt-4">
              <div className="flex items-center space-x-2 text-blue-200">
                <CheckCircle className="h-5 w-5" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200">
                <Lock className="h-5 w-5" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200">
                <Award className="h-5 w-5" />
                <span>Trusted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Selection */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Choose Your Portal
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access the appropriate dashboard based on your role and needs
            </p>
          </div>

          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Pilgrim Portal */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10 text-center space-y-6 pt-8">
                <div className="flex justify-center">
                  <div className="bg-green-100 p-6 rounded-2xl group-hover:bg-green-200 transition-colors duration-300">
                    <Users className="h-10 w-10 text-green-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-2xl text-gray-900">Pilgrim Portal</CardTitle>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Personal Dashboard
                  </Badge>
                </div>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Access your personal Hajj journey, track savings, monitor queue position, and explore AI-recommended packages
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6 pb-8">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center space-x-3 text-gray-700 p-3 rounded-lg bg-gray-50 group-hover:bg-white/60 transition-colors">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Track queue position & estimated year</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700 p-3 rounded-lg bg-gray-50 group-hover:bg-white/60 transition-colors">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Monitor savings progress & contributions</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700 p-3 rounded-lg bg-gray-50 group-hover:bg-white/60 transition-colors">
                    <Star className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Browse AI-recommended packages</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700 p-3 rounded-lg bg-gray-50 group-hover:bg-white/60 transition-colors">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Get personalized journey insights</span>
                  </div>
                </div>
                
                <Button 
                  asChild 
                  className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base group/btn"
                >
                  <Link href="/portal/dashboard" className="flex items-center justify-center space-x-2">
                    <span>Enter Pilgrim Portal</span>
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Admin Portal */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10 text-center space-y-6 pt-8">
                <div className="flex justify-center">
                  <div className="bg-blue-100 p-6 rounded-2xl group-hover:bg-blue-200 transition-colors duration-300">
                    <Shield className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-2xl text-gray-900">Admin Portal</CardTitle>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Management Dashboard
                  </Badge>
                </div>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Comprehensive dashboard for Tabung Haji administrators to manage operations, analytics, and compliance
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6 pb-8">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center space-x-3 text-gray-700 p-3 rounded-lg bg-gray-50 group-hover:bg-white/60 transition-colors">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Real-time analytics & KPI monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700 p-3 rounded-lg bg-gray-50 group-hover:bg-white/60 transition-colors">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Pilgrim queue & financial management</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700 p-3 rounded-lg bg-gray-50 group-hover:bg-white/60 transition-colors">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">AI-powered insights & anomaly detection</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700 p-3 rounded-lg bg-gray-50 group-hover:bg-white/60 transition-colors">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Compliance & audit tools</span>
                  </div>
                </div>
                
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white h-12 text-base group/btn"
                >
                  <Link href="/admin/dashboard" className="flex items-center justify-center space-x-2">
                    <span>Enter Admin Portal</span>
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h3 className="text-3xl font-bold text-gray-900">
              Ecosystem Features
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the powerful capabilities that make your Hajj journey seamless and intelligent
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <Card className="text-center group hover:shadow-lg transition-all duration-300 border-0 bg-white">
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-6">
                  <div className="bg-green-100 p-4 rounded-2xl group-hover:bg-green-200 transition-colors">
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Smart Financial Management</h4>
                <p className="text-gray-600 leading-relaxed">
                  Automated savings tracking, intelligent budgeting, and seamless payment processing with real-time insights
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center group hover:shadow-lg transition-all duration-300 border-0 bg-white">
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-6">
                  <div className="bg-blue-100 p-4 rounded-2xl group-hover:bg-blue-200 transition-colors">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Analytics</h4>
                <p className="text-gray-600 leading-relaxed">
                  Advanced data insights, predictive modeling, and personalized recommendations for optimal journey planning
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center group hover:shadow-lg transition-all duration-300 border-0 bg-white">
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-6">
                  <div className="bg-purple-100 p-4 rounded-2xl group-hover:bg-purple-200 transition-colors">
                    <Settings className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Management</h4>
                <p className="text-gray-600 leading-relaxed">
                  End-to-end journey management from registration to return with complete administrative oversight
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-12">Trusted by Thousands</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">12,847</div>
                <div className="text-sm text-gray-600">Active Pilgrims</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-600">RM 89.2M</div>
                <div className="text-sm text-gray-600">Total Savings</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-purple-600">99.8%</div>
                <div className="text-sm text-gray-600">System Uptime</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-orange-600">4.2</div>
                <div className="text-sm text-gray-600">Avg Wait Time (Years)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
            </div>
            <h4 className="text-xl font-semibold">Smart Hajj Ecosystem</h4>
            <p className="text-gray-400 max-w-md mx-auto">
              Empowering your sacred journey with technology and faith
            </p>
            <div className="flex justify-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">Malaysia</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">Bank Negara Licensed</span>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
              <p>© 2025 Tabung Haji. All rights reserved. | Privacy Policy | Terms of Service</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
