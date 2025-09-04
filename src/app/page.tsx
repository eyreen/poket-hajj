"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, ArrowRight, Home, DollarSign, BarChart3, Settings } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-700">
      {/* Header */}
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="text-center space-y-4 mb-16">
          <div className="flex justify-center">
            <div className="bg-white/10 p-4 rounded-full">
              <Home className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Smart Hajj Ecosystem
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Your journey to Hajj made simple, smart & secure with Tabung Haji
          </p>
        </div>

        {/* Portal Selection */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-white text-center mb-8">
            Choose Your Portal
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pilgrim Portal */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group">
              <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="bg-green-500/20 p-4 rounded-full group-hover:bg-green-500/30 transition-colors">
                    <Users className="h-8 w-8 text-green-400" />
                  </div>
                </div>
                <CardTitle className="text-white text-2xl">Pilgrim Portal</CardTitle>
                <CardDescription className="text-blue-100 text-base">
                  Access your personal Hajj journey, track savings, queue position, and explore packages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-blue-100">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Track your queue position & estimated year</span>
                  </div>
                  <div className="flex items-center space-x-3 text-blue-100">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Monitor savings progress & contributions</span>
                  </div>
                  <div className="flex items-center space-x-3 text-blue-100">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Browse & book AI-recommended packages</span>
                  </div>
                  <div className="flex items-center space-x-3 text-blue-100">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Get personalized journey insights</span>
                  </div>
                </div>
                
                <Button 
                  asChild 
                  className="w-full bg-green-600 hover:bg-green-700 text-white group"
                >
                  <Link href="/portal/dashboard" className="flex items-center justify-center space-x-2">
                    <span>Enter Pilgrim Portal</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Admin Portal */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group">
              <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="bg-orange-500/20 p-4 rounded-full group-hover:bg-orange-500/30 transition-colors">
                    <Shield className="h-8 w-8 text-orange-400" />
                  </div>
                </div>
                <CardTitle className="text-white text-2xl">Admin Portal</CardTitle>
                <CardDescription className="text-blue-100 text-base">
                  Comprehensive dashboard for Tabung Haji administrators to manage operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-blue-100">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Real-time analytics & KPI monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3 text-blue-100">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Pilgrim queue & financial management</span>
                  </div>
                  <div className="flex items-center space-x-3 text-blue-100">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>AI-powered insights & anomaly detection</span>
                  </div>
                  <div className="flex items-center space-x-3 text-blue-100">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Compliance & audit tools</span>
                  </div>
                </div>
                
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/10 group"
                >
                  <Link href="/admin/dashboard" className="flex items-center justify-center space-x-2">
                    <span>Enter Admin Portal</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-20 max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold text-white text-center mb-12">
            Ecosystem Features
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-white/10 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
              <h4 className="text-lg font-medium text-white">Smart Financial Management</h4>
              <p className="text-blue-100 text-sm">
                Automated savings tracking, intelligent budgeting, and seamless payment processing
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-white/10 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
              </div>
              <h4 className="text-lg font-medium text-white">AI-Powered Analytics</h4>
              <p className="text-blue-100 text-sm">
                Advanced data insights, predictive modeling, and personalized recommendations
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-white/10 p-3 rounded-full">
                  <Settings className="h-6 w-6 text-white" />
                </div>
              </div>
              <h4 className="text-lg font-medium text-white">Comprehensive Management</h4>
              <p className="text-blue-100 text-sm">
                End-to-end journey management from registration to return
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-blue-200 text-sm space-y-2">
          <p>© 2025 Tabung Haji. All rights reserved.</p>
          <p>Empowering your sacred journey with technology and faith.</p>
        </div>
      </div>
    </div>
  );
}
