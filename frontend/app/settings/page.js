"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { User, Bell, Shield, Music, Download, Trash2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Settings() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800 px-6">
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-gray-400 text-sm">Customize your SoundForge experience</p>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 bg-gradient-to-br from-gray-900 via-gray-900 to-pink-900/20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-6">
            {/* Profile Settings */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-400" />
                  Profile Settings
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your account information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-gray-300">Display Name</Label>
                    <Select>
                      <SelectTrigger className="mt-2 bg-gray-700/50 border-gray-600 text-white">
                        <SelectValue placeholder="John Doe" />
                      </SelectTrigger>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-300">Email</Label>
                    <Select>
                      <SelectTrigger className="mt-2 bg-gray-700/50 border-gray-600 text-white">
                        <SelectValue placeholder="john@example.com" />
                      </SelectTrigger>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Audio Settings */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Music className="h-5 w-5 text-pink-400" />
                  Audio Settings
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure audio quality and generation preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-gray-300">Default Quality</Label>
                    <Select>
                      <SelectTrigger className="mt-2 bg-gray-700/50 border-gray-600 text-white">
                        <SelectValue placeholder="High (48kHz)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (22kHz)</SelectItem>
                        <SelectItem value="medium">Medium (44kHz)</SelectItem>
                        <SelectItem value="high">High (48kHz)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-300">Default Format</Label>
                    <Select>
                      <SelectTrigger className="mt-2 bg-gray-700/50 border-gray-600 text-white">
                        <SelectValue placeholder="MP3" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mp3">MP3</SelectItem>
                        <SelectItem value="wav">WAV</SelectItem>
                        <SelectItem value="flac">FLAC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Default Duration: 30 seconds</Label>
                  <Slider defaultValue={[30]} max={300} min={10} step={5} className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Auto-save generations</Label>
                    <p className="text-sm text-gray-400">Automatically save generated music to your library</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="h-5 w-5 text-yellow-400" />
                  Notifications
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Generation complete</Label>
                    <p className="text-sm text-gray-400">Get notified when your music is ready</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">New features</Label>
                    <p className="text-sm text-gray-400">Stay updated on new SoundForge features</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Weekly summary</Label>
                    <p className="text-sm text-gray-400">Receive a weekly summary of your activity</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  Privacy & Security
                </CardTitle>
                <CardDescription className="text-gray-400">Manage your privacy and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Make compositions public</Label>
                    <p className="text-sm text-gray-400">Allow others to discover your music</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Analytics tracking</Label>
                    <p className="text-sm text-gray-400">Help us improve by sharing usage data</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                    Download my data
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Storage & Data */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Download className="h-5 w-5 text-blue-400" />
                  Storage & Data
                </CardTitle>
                <CardDescription className="text-gray-400">Manage your storage usage and data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Storage Used</span>
                    <span className="text-white">2.4 GB / 10 GB</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: "24%" }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                    <Download className="h-4 w-4 mr-2" />
                    Export All
                  </Button>
                  <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/10">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cache
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="bg-red-900/20 border-red-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-red-400">Danger Zone</CardTitle>
                <CardDescription className="text-gray-400">
                  Irreversible actions that affect your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-red-800 rounded-lg bg-red-900/10">
                  <div>
                    <Label className="text-red-400">Delete Account</Label>
                    <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
