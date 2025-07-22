"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Search, Play, Pause, Download, Share2, Heart, MoreHorizontal, Filter, Sparkles } from "lucide-react"
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
      color: "from-[#5F85DB] to-[#7B68EE]",
    },
    {
      id: 2,
      title: "Forest Ambience",
      artist: "Nature Sounds",
      duration: "5:12",
      cover: "/placeholder.svg?height=80&width=80",
      tags: ["Ambient", "Nature", "Relaxing"],
      plays: "8.2K",
      color: "from-[#4ECDC4] to-[#44A08D]",
    },
    {
      id: 3,
      title: "Urban Jazz Fusion",
      artist: "City Collective",
      duration: "4:33",
      cover: "/placeholder.svg?height=80&width=80",
      tags: ["Jazz", "Fusion", "Urban"],
      plays: "15.7K",
      color: "from-[#FF6B6B] to-[#FF8E53]",
    },
    {
      id: 4,
      title: "Epic Orchestral",
      artist: "Symphony AI",
      duration: "6:45",
      cover: "/placeholder.svg?height=80&width=80",
      tags: ["Orchestral", "Epic", "Cinematic"],
      plays: "22.1K",
      color: "from-[#FFD93D] to-[#FF6B6B]",
    },
  ]

  const genres = [
    { name: "Electronic", count: 1240, color: "bg-gradient-to-r from-[#5F85DB] to-[#7B68EE]" },
    { name: "Ambient", count: 890, color: "bg-gradient-to-r from-[#4ECDC4] to-[#44A08D]" },
    { name: "Jazz", count: 650, color: "bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]" },
    { name: "Rock", count: 1100, color: "bg-gradient-to-r from-[#FFD93D] to-[#FF6B6B]" },
  ]

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#5F85DB]/[0.08] via-[#FF6B6B]/[0.05] to-[#4ECDC4]/[0.08] blur-3xl" />

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={450}
          height={110}
          rotate={10}
          gradient="from-[#5F85DB]/[0.12]"
          className="left-[-10%] top-[30%]"
        />
        <ElegantShape
          delay={0.5}
          width={320}
          height={85}
          rotate={-18}
          gradient="from-[#FF6B6B]/[0.10]"
          className="right-[-8%] top-[70%]"
        />
        <ElegantShape
          delay={0.4}
          width={220}
          height={65}
          rotate={-5}
          gradient="from-[#4ECDC4]/[0.10]"
          className="left-[8%] bottom-[10%]"
        />
        <ElegantShape
          delay={0.6}
          width={180}
          height={55}
          rotate={22}
          gradient="from-[#FFD93D]/[0.12]"
          className="right-[15%] top-[15%]"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#5F85DB]/10 to-[#FF6B6B]/10 border border-[#5F85DB]/20 mb-4">
              <Sparkles className="w-5 h-5 text-[#FFD93D]" />
              <span className="text-sm text-[#FAF7F0]/80 tracking-wide">Copyright-Free Music Library</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FAF7F0] via-[#5F85DB] to-[#FF6B6B] mb-4">
              Discover Amazing Tracks
            </h1>
            <p className="text-[#FAF7F0]/60 text-lg max-w-2xl mx-auto">
              Explore thousands of high-quality, royalty-free tracks for your projects
            </p>
          </motion.div>

          {/* Genre Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-3 justify-center mb-6"
          >
            {genres.map((genre, index) => (
              <Button
                key={genre.name}
                variant="outline"
                size="sm"
                className={`${genre.color} border-transparent text-[#FAF7F0] hover:opacity-80`}
              >
                {genre.name} ({genre.count})
              </Button>
            ))}
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
                className="pl-10 pr-12 bg-[#26282B]/30 border-[#26282B]/50 text-[#FAF7F0] placeholder:text-[#FAF7F0]/40 h-12 focus:border-[#5F85DB]/50"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#FAF7F0]/60 hover:text-[#FAF7F0]"
              >
                <Filter className="w-4 h-4" />
              </Button>
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
                <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm hover:bg-[#26282B]/70 transition-all duration-300 group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Album Cover with Visualizer */}
                      <div className="relative">
                        <img
                          src={track.cover || "/placeholder.svg"}
                          alt={track.title}
                          className="w-20 h-20 rounded-lg"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${track.color} opacity-20 rounded-lg group-hover:opacity-40 transition-opacity`}
                        ></div>
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
                          {track.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className={`bg-gradient-to-r ${track.color} bg-opacity-20 text-[#FAF7F0]/80 text-xs border-transparent`}
                            >
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
                          className={`bg-gradient-to-r ${track.color} hover:opacity-90`}
                        >
                          {playingTrack === track.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[#FAF7F0]/60 hover:text-[#FF6B6B] hover:bg-[#FF6B6B]/10"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[#FAF7F0]/60 hover:text-[#4ECDC4] hover:bg-[#4ECDC4]/10"
                        >
                          <Download className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[#FAF7F0]/60 hover:text-[#5F85DB] hover:bg-[#5F85DB]/10"
                        >
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
