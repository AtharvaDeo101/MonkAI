"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import {
  Search,
  Play,
  Pause,
  Download,
  Share2,
  Heart,
  MoreHorizontal,
  Filter,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/layout/header"
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

interface Track {
  id: string
  title: string
  artist: string
  duration: string
  cover: string
  tags: string[]
  plays: string
  color: string
  audioUrl: string
  attribution: { required: boolean; text: string; link: string }
}

export default function TracksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [tracks, setTracks] = useState<Track[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Fetch tracks from Jamendo API via Next.js API route
  useEffect(() => {
    async function fetchTracks() {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/tracks?q=${encodeURIComponent(searchQuery)}&limit=20`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
        }
        const data = await response.json()
        if (!data.tracks) {
          throw new Error("No tracks found in response")
        }
        setTracks(data.tracks)
      } catch (err: any) {
        const errorMessage = err.message || "Unknown error occurred"
        console.error("Fetch tracks error:", {
          message: errorMessage,
          query: searchQuery,
          stack: err.stack,
        })
        setError(`Failed to load tracks: ${errorMessage}. Please try again or contact support.`)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTracks()
  }, [searchQuery])

  // Update progress bar
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setCurrentTime(audio.currentTime)
      setDuration(audio.duration)
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateProgress)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateProgress)
    }
  }, [])

  // Handle play/pause for tracks
  const handlePlay = (trackId: string, audioUrl: string) => {
    if (playingTrack === trackId) {
      audioRef.current?.pause()
      setPlayingTrack(null)
    } else {
      if (audioRef.current) {
        audioRef.current.src = audioUrl
        audioRef.current.play().catch((err) => console.error("Playback error:", err))
      }
      setPlayingTrack(trackId)
    }
  }

  // Handle seeking
  const handleSeek = (trackId: string, value: number) => {
    if (playingTrack === trackId && audioRef.current) {
      audioRef.current.currentTime = value
      setCurrentTime(value)
    }
  }

  // Format time for display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Filter tracks based on search query
  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      <audio ref={audioRef} />
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
              <span className="text-sm text-[#FAF7F0]/80 tracking-wide">Royalty-Free Music Library</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FAF7F0] via-[#5F85DB] to-[#FF6B6B] mb-4">
              Discover Amazing Tracks
            </h1>
            <p className="text-[#FAF7F0]/60 text-lg max-w-2xl mx-auto">
              Explore thousands of high-quality, royalty-free tracks
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
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-[#FAF7F0]/60 text-lg">Loading tracks...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-[#FF6B6B] text-lg">{error}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery(searchQuery)} // Trigger refetch
              >
                Retry
              </Button>
            </motion.div>
          ) : (
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
                        {/* Album Cover */}
                        <div className="relative">
                          <img
                            src={track.cover || "/placeholder.svg?height=80&width=80"}
                            alt={track.title}
                            className="w-20 h-20 rounded-lg"
                          />
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${track.color} opacity-20 rounded-lg group-hover:opacity-40 transition-opacity`}
                          ></div>
                          <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Play className="w-6 h-6 text-[#FAF7F0]" />
                          </div>
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
                          </div>
                          {track.attribution?.required && (
                            <p className="text-[#FAF7F0]/40 text-xs mt-1">
                              {track.attribution.text} |{" "}
                              <a
                                href={track.attribution.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-[#5F85DB]"
                              >
                                Jamendo
                              </a>
                            </p>
                          )}
                          {playingTrack === track.id && (
                            <div className="mt-2">
                              <div className="flex items-center gap-2 text-sm text-[#FAF7F0]/60">
                                <span>{formatTime(currentTime)}</span>
                                <input
                                  type="range"
                                  min="0"
                                  max={duration || 100}
                                  value={currentTime}
                                  onChange={(e) => handleSeek(track.id, Number(e.target.value))}
                                  className="w-full h-1 bg-[#FAF7F0]/20 rounded-full appearance-none cursor-pointer"
                                  style={{
                                    background: `linear-gradient(to right, #5F85DB 0%, #5F85DB ${(currentTime / (duration || 1)) * 100}%, #26282B ${(currentTime / (duration || 1)) * 100}%, #26282B 100%)`
                                  }}
                                />
                                <span>{formatTime(duration)}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handlePlay(track.id, track.audioUrl)}
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
                            onClick={() => window.location.href = track.audioUrl}
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
          )}

          {filteredTracks.length === 0 && !isLoading && !error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-[#FAF7F0]/60 text-lg">No tracks found matching your search.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}