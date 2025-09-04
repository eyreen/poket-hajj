"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminSettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">Configure admin preferences and system options</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Admin Preferences</CardTitle>
          <CardDescription>Set your preferred language, theme, and notification settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Language</span>
              <select className="border rounded px-2 py-1">
                <option value="en">English</option>
                <option value="ms">Bahasa Malaysia</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span>Theme</span>
              <select className="border rounded px-2 py-1">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Push Notifications</span>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>Manage system-wide settings and integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Enable Maintenance Mode</span>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span>API Access</span>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Data Export</span>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}