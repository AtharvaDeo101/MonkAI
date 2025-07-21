"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Search, Play, Pause, Download, Share2, Heart, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/layout/header"
import MusicVisualizer from "@/components/music-visualizer"
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

export default function TracksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [playingTrack, setPlayingTrack] = useState<number | null>(null)

  const tracks = [
    {
      id: 1,
      title: "Midnight Synthwave",
      artist: "Digital Dreams",
      duration: "3:24",
      cover: "/placeholder.svg?height=80&width=80",
      tags: ["Electronic", "Synthwave", "Retro"],
      plays: "12.5K",
    },
    {
      id: 2,
      title: "Forest Ambience",
      artist: "Nature Sounds",
      duration: "5:12",
      cover: "/placeholder.svg?height=80&width=80",
      tags: ["Ambient", "Nature", "Relaxing"],
      plays: "8.2K",
    },
    {
      id: 3,
      title: "Urban Jazz Fusion",
      artist: "City Collective",
      duration: "4:33",
      cover: "/placeholder.svg?height=80&width=80",
      tags: ["Jazz", "Fusion", "Urban"],
      plays: "15.7K",
    },
    {
      id: 4,
      title: "Epic Orchestral",
      artist: "Symphony AI",
      duration: "6:45",
      cover: "/placeholder.svg?height=80&width=80",
      tags: ["Orchestral", "Epic", "Cinematic"],
      plays: "22.1K",
    },
  ]

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#5F85DB]/[0.05] via-transparent to-[#5F85DB]/[0.08] blur-3xl" />

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={450}
          height={110}
          rotate={10}
          gradient="from-[#5F85DB]/[0.10]"
          className="left-[-10%] top-[30%]"
        />
        <ElegantShape
          delay={0.5}
          width={320}
          height={85}
          rotate={-18}
          gradient="from-[#5F85DB]/[0.10]"
          className="right-[-8%] top-[70%]"
        />
        <ElegantShape
          delay={0.4}
          width={220}
          height={65}
          rotate={-5}
          gradient="from-[#5F85DB]/[0.10]"
          className="left-[8%] bottom-[10%]"
        />
      </div>

      <Header />

      <div className="relative z-10 pt-20 px-4 pb-8">
        <div className="container mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-[#FAF7F0] mb-4">Copyright-Free Music Library</h1>
            <p className="text-[#FAF7F0]/60 text-lg max-w-2xl mx-auto">
              Discover thousands of high-quality, royalty-free tracks for your projects
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FAF7F0]/40 w-5 h-5" />
              <Input
                placeholder="Search tracks, artists, or genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#26282B]/30 border-[#26282B]/50 text-[#FAF7F0] placeholder:text-[#FAF7F0]/40 h-12"
              />
            </div>
          </motion.div>

          {/* Tracks Grid */}
          <div className="grid gap-4">
            {filteredTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm hover:bg-[#26282B]/70 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Album Cover with Visualizer */}
                      <div className="relative">
                        <img
                          src={track.cover || "/placeholder.svg"}
                          alt={track.title}
                          className="w-20 h-20 rounded-lg"
                        />
                        {playingTrack === track.id ? (
                          <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                            <MusicVisualizer isPlaying={true} />
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Play className="w-6 h-6 text-[#FAF7F0]" />
                          </div>
                        )}
                      </div>

                      {/* Track Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[#FAF7F0] font-semibold text-lg truncate">{track.title}</h3>
                        <p className="text-[#FAF7F0]/60 mb-2">{track.artist}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {track.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-[#26282B]/50 text-[#FAF7F0]/80 text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-[#FAF7F0]/60">
                          <span>{track.duration}</span>
                          <span>{track.plays} plays</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => setPlayingTrack(playingTrack === track.id ? null : track.id)}
                          className="bg-gradient-to-r from-[#5F85DB] to-[#5F85DB] hover:from-[#5F85DB]/90 hover:to-[#5F85DB]/90"
                        >
                          {playingTrack === track.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>

                        <Button size="sm" variant="ghost" className="text-[#FAF7F0]/60 hover:text-[#FAF7F0]">
                          <Heart className="w-4 h-4" />
                        </Button>

                        <Button size="sm" variant="ghost" className="text-[#FAF7F0]/60 hover:text-[#FAF7F0]">
                          <Download className="w-4 h-4" />
                        </Button>

                        <Button size="sm" variant="ghost" className="text-[#FAF7F0]/60 hover:text-[#FAF7F0]">
                          <Share2 className="w-4 h-4" />
                        </Button>

                        <Button size="sm" variant="ghost" className="text-[#FAF7F0]/60 hover:text-[#FAF7F0]">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredTracks.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-[#FAF7F0]/60 text-lg">No tracks found matching your search.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
