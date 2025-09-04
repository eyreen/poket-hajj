"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, EyeOff, AlertTriangle } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
        if (!showMFA) {
        // First factor authentication successful
        setShowMFA(true);
      } else {
        // Complete authentication with MFA
        window.location.href = "/admin/dashboard";
      }
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-white/10 p-3 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-blue-100">Smart Hajj Ecosystem - Tabung Haji</p>
        </div>

        {/* Security Notice */}
        <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4 flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-orange-100">
            <p className="font-medium">Authorized Personnel Only</p>
            <p>This system requires multi-factor authentication and logs all access attempts.</p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="bg-white/5 border-white/20 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-white flex items-center space-x-2">
              <Lock className="h-5 w-5" />
              <span>{showMFA ? "Two-Factor Authentication" : "Administrator Login"}</span>
            </CardTitle>
            <CardDescription className="text-blue-100">
              {showMFA 
                ? "Enter the 6-digit code from your authenticator app"
                : "Enter your administrator credentials to access the portal"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {!showMFA ? (
                <>
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@tabunghaji.gov.my"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* MFA Code Field */}
                  <div className="space-y-2">
                    <Label htmlFor="mfa" className="text-white">Authentication Code</Label>
                    <Input
                      id="mfa"
                      type="text"
                      placeholder="000000"
                      maxLength={6}
                      value={mfaCode}
                      onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 text-center text-lg tracking-widest"
                      required
                    />
                  </div>

                  {/* Back to Login */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowMFA(false);
                      setMfaCode("");
                    }}
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    Back to Login
                  </Button>
                </>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || (!showMFA && (!email || !password)) || (showMFA && mfaCode.length !== 6)}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {isLoading ? "Authenticating..." : showMFA ? "Verify & Login" : "Continue to MFA"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Role Badges */}
        <div className="text-center space-y-2">
          <p className="text-blue-100 text-sm">Available Roles:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="border-white/20 text-blue-100">Super Admin</Badge>
            <Badge variant="outline" className="border-white/20 text-blue-100">Operations Manager</Badge>
            <Badge variant="outline" className="border-white/20 text-blue-100">Financial Officer</Badge>
            <Badge variant="outline" className="border-white/20 text-blue-100">Customer Service</Badge>
            <Badge variant="outline" className="border-white/20 text-blue-100">Compliance Officer</Badge>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-blue-200 text-xs space-y-1">
          <p>© 2025 Tabung Haji. All rights reserved.</p>
          <p>This system is monitored for security purposes.</p>
        </div>
      </div>
    </div>
  );
}
