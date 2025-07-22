"use client"

import { motion } from "framer-motion"
import { Play, Pause, Music, TrendingUp, Clock, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/layout/header"
import { useState } from "react"
import DashboardSlideshow from "@/components/dashboard-slideshow"
import { cn } from "@/lib/utils"

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Dashboard() {
  const [playingTrack, setPlayingTrack] = useState<number | null>(null)

  const recentTracks = [
    {
      id: 1,
      title: "Ambient Dreams",
      duration: "2:34",
      cover: "/placeholder.svg?height=60&width=60",
      color: "from-[#FF6B6B] to-[#FF8E53]",
    },
    {
      id: 2,
      title: "Electronic Pulse",
      duration: "3:12",
      cover: "/placeholder.svg?height=60&width=60",
      color: "from-[#4ECDC4] to-[#44A08D]",
    },
    {
      id: 3,
      title: "Jazz Fusion",
      duration: "4:05",
      cover: "/placeholder.svg?height=60&width=60",
      color: "from-[#FFD93D] to-[#FF6B6B]",
    },
  ]

  const popularGenres = [
    {
      name: "Electronic",
      image: "/placeholder.svg?height=120&width=120",
      tracks: 1240,
      color: "from-[#5F85DB] to-[#7B68EE]",
    },
    {
      name: "Ambient",
      image: "/placeholder.svg?height=120&width=120",
      tracks: 890,
      color: "from-[#4ECDC4] to-[#44A08D]",
    },
    { name: "Jazz", image: "/placeholder.svg?height=120&width=120", tracks: 650, color: "from-[#FF6B6B] to-[#FF8E53]" },
    {
      name: "Rock",
      image: "/placeholder.svg?height=120&width=120",
      tracks: 1100,
      color: "from-[#FFD93D] to-[#FF6B6B]",
    },
  ]

  const stats = [
    { label: "Tracks Generated", value: "24", icon: Music, color: "from-[#5F85DB] to-[#7B68EE]" },
    { label: "Total Plays", value: "1.2K", icon: Play, color: "from-[#FF6B6B] to-[#FF8E53]" },
    { label: "Hours Created", value: "8.5", icon: Clock, color: "from-[#4ECDC4] to-[#44A08D]" },
    { label: "Favorites", value: "16", icon: Heart, color: "from-[#FFD93D] to-[#FF6B6B]" },
  ]

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#5F85DB]/[0.08] via-[#FF6B6B]/[0.05] to-[#4ECDC4]/[0.08] blur-3xl" />

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={400}
          height={100}
          rotate={12}
          gradient="from-[#5F85DB]/[0.15]"
          className="left-[-5%] top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={300}
          height={80}
          rotate={-15}
          gradient="from-[#FF6B6B]/[0.12]"
          className="right-[-5%] top-[60%]"
        />
        <ElegantShape
          delay={0.4}
          width={200}
          height={60}
          rotate={-8}
          gradient="from-[#4ECDC4]/[0.10]"
          className="left-[10%] bottom-[15%]"
        />
        <ElegantShape
          delay={0.6}
          width={150}
          height={50}
          rotate={25}
          gradient="from-[#FFD93D]/[0.12]"
          className="right-[15%] top-[10%]"
        />
      </div>

      <Header />

      <div className="relative z-10 pt-20 px-4 pb-8">
        <div className="container mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#5F85DB]/10 to-[#FF6B6B]/10 border border-[#5F85DB]/20 mb-4">
              <Sparkles className="w-5 h-5 text-[#FFD93D]" />
              <span className="text-sm text-[#FAF7F0]/80 tracking-wide">Welcome back to MonkAI</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FAF7F0] via-[#5F85DB] to-[#FF6B6B] mb-2">
              Your Creative Dashboard
            </h1>
          </motion.div>

          {/* Slideshow Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <DashboardSlideshow />
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm hover:bg-[#26282B]/70 transition-all duration-300 group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <stat.icon className="w-6 h-6 text-[#FAF7F0]" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#FAF7F0]">{stat.value}</p>
                        <p className="text-sm text-[#FAF7F0]/60">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Tracks */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#FAF7F0] flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#5F85DB] to-[#7B68EE] rounded-lg flex items-center justify-center">
                      <Music className="w-5 h-5 text-[#FAF7F0]" />
                    </div>
                    Recent Creations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentTracks.map((track, index) => (
                    <div
                      key={track.id}
                      className="flex items-center gap-4 p-3 rounded-lg bg-[#26282B]/30 hover:bg-[#26282B]/50 transition-colors group"
                    >
                      <div className="relative">
                        <img
                          src={track.cover || "/placeholder.svg"}
                          alt={track.title}
                          className="w-12 h-12 rounded-lg"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${track.color} opacity-20 rounded-lg group-hover:opacity-40 transition-opacity`}
                        ></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-[#FAF7F0] font-medium">{track.title}</p>
                        <p className="text-[#FAF7F0]/60 text-sm">{track.duration}</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => setPlayingTrack(playingTrack === track.id ? null : track.id)}
                        className={`bg-gradient-to-r ${track.color} hover:opacity-90`}
                      >
                        {playingTrack === track.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Popular Genres */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#FAF7F0] flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-[#FAF7F0]" />
                    </div>
                    Popular Genres
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {popularGenres.map((genre, index) => (
                      <motion.div
                        key={genre.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="text-center p-4 rounded-lg bg-[#26282B]/30 hover:bg-[#26282B]/50 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="relative mb-3">
                          <img
                            src={genre.image || "/placeholder.svg"}
                            alt={genre.name}
                            className="w-16 h-16 rounded-lg mx-auto"
                          />
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${genre.color} opacity-20 rounded-lg group-hover:opacity-40 transition-opacity`}
                          ></div>
                        </div>
                        <p className="text-[#FAF7F0] font-medium text-sm">{genre.name}</p>
                        <p className="text-[#FAF7F0]/60 text-xs">{genre.tracks} tracks</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
