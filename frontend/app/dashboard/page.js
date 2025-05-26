"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Music, Headphones, Sparkles, TrendingUp, Clock, Play, Download, Heart } from "lucide-react"
import Link from "next/link"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Dashboard() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800 px-6">
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-400 text-sm">Welcome back to SoundForge</p>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            {/* Stats Cards */}
            <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Compositions</CardTitle>
                  <Music className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">127</div>
                  <p className="text-xs text-gray-400">
                    <span className="text-green-400">+12%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Hours Generated</CardTitle>
                  <Clock className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">24.7</div>
                  <p className="text-xs text-gray-400">
                    <span className="text-green-400">+8%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Favorites</CardTitle>
                  <Heart className="h-4 w-4 text-red-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">89</div>
                  <p className="text-xs text-gray-400">
                    <span className="text-green-400">+23%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Downloads</CardTitle>
                  <Download className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">342</div>
                  <p className="text-xs text-gray-400">
                    <span className="text-green-400">+18%</span> from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                  <CardDescription className="text-gray-400">
                    Get started with your music creation journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                  <Link href="/composition">
                    <Button className="w-full h-20 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                      <div className="flex flex-col items-center gap-2">
                        <Sparkles className="h-6 w-6" />
                        <span>Generate Music</span>
                      </div>
                    </Button>
                  </Link>

                  <Link href="/spotify">
                    <Button
                      variant="outline"
                      className="w-full h-20 border-gray-600 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Headphones className="h-6 w-6" />
                        <span>Browse Spotify</span>
                      </div>
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    className="w-full h-20 border-gray-600 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <TrendingUp className="h-6 w-6" />
                      <span>View Analytics</span>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity & Usage */}
            <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Recent Compositions</CardTitle>
                  <CardDescription className="text-gray-400">Your latest musical creations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Ethereal Dreams", genre: "Ambient", duration: "3:42" },
                    { name: "Neon Nights", genre: "Synthwave", duration: "4:15" },
                    { name: "Forest Whispers", genre: "Nature", duration: "5:23" },
                    { name: "Urban Pulse", genre: "Electronic", duration: "3:58" },
                  ].map((track, index) => (
                    <motion.div
                      key={track.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                          <Play className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{track.name}</p>
                          <p className="text-sm text-gray-400">{track.genre}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">{track.duration}</div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Usage Statistics</CardTitle>
                  <CardDescription className="text-gray-400">Your monthly generation usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Generations Used</span>
                      <span className="text-white">127 / 500</span>
                    </div>
                    <Progress value={25.4} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Storage Used</span>
                      <span className="text-white">2.4 GB / 10 GB</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <h4 className="font-medium text-white mb-3">Popular Genres</h4>
                    <div className="space-y-2">
                      {[
                        { genre: "Ambient", count: 34 },
                        { genre: "Electronic", count: 28 },
                        { genre: "Cinematic", count: 22 },
                        { genre: "Jazz", count: 18 },
                      ].map((item) => (
                        <div key={item.genre} className="flex justify-between items-center">
                          <span className="text-gray-400">{item.genre}</span>
                          <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                            {item.count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features Overview */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Platform Features</CardTitle>
                  <CardDescription className="text-gray-400">Explore what SoundForge has to offer</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-3">
                  <div className="text-center space-y-3">
                    <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-white">AI Generation</h3>
                    <p className="text-sm text-gray-400">
                      Create unique music from text descriptions using advanced AI models
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                      <Music className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-white">Music Editing</h3>
                    <p className="text-sm text-gray-400">
                      Fine-tune your compositions with our intuitive editing tools
                    </p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Headphones className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-white">Spotify Integration</h3>
                    <p className="text-sm text-gray-400">
                      Access millions of tracks and discover new music inspiration
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
