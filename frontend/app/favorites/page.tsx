"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  Search,
  Play,
  Pause,
  Download,
  Share2,
  Heart,
  MoreHorizontal,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  Trash2,
} from "lucide-react"
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

export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [playingTrack, setPlayingTrack] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [sortBy, setSortBy] = useState<"name" | "artist" | "date" | "duration">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedTracks, setSelectedTracks] = useState<number[]>([])
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false)

  const favoriteTracks = [
    {
      id: 1,
      title: "Midnight Synthwave",
      artist: "Digital Dreams",
      duration: "3:24",
      cover: "/placeholder.svg?height=80&width=80",
      tags: ["Electronic", "Synthwave", "Retro"],
      plays: "12.5K",
      dateAdded: "2024-01-15",
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
      dateAdded: "2024-01-14",
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
      dateAdded: "2024-01-13",
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
      dateAdded: "2024-01-12",
      color: "from-[#FFD93D] to-[#FF6B6B]",
    },
    {
      id: 5,
      title: "Lo-Fi Study Beats",
      artist: "Chill Vibes",
      duration: "2:58",
      cover: "/placeholder.svg?height=80&width=80",
      tags: ["Lo-Fi", "Study", "Chill"],
      plays: "18.3K",
      dateAdded: "2024-01-11",
      color: "from-[#9B59B6] to-[#8E44AD]",
    },
    {
      id: 6,
      title: "Cyberpunk Action",
      artist: "Future Bass",
      duration: "3:47",
      cover: "/placeholder.svg?height=80&width=80",
      tags: ["Electronic", "Cyberpunk", "Action"],
      plays: "9.8K",
      dateAdded: "2024-01-10",
      color: "from-[#E67E22] to-[#D35400]",
    },
    {
      id: 7,
      title: "Acoustic Serenity",
      artist: "Peaceful Strings",
      duration: "4:21",
      cover: "/placeholder.svg?height=80&width=80",
      tags: ["Acoustic", "Peaceful", "Guitar"],
      plays: "14.2K",
      dateAdded: "2024-01-09",
      color: "from-[#27AE60] to-[#229954]",
    },
    {
      id: 8,
      title: "Retro Gaming",
      artist: "8-Bit Masters",
      duration: "2:15",
      cover: "/placeholder.svg?height=80&width=80",
      tags: ["Chiptune", "Gaming", "Retro"],
      plays: "11.7K",
      dateAdded: "2024-01-08",
      color: "from-[#3498DB] to-[#2980B9]",
    },
  ]

  const filteredTracks = favoriteTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const sortedTracks = [...filteredTracks].sort((a, b) => {
    let comparison = 0
    switch (sortBy) {
      case "name":
        comparison = a.title.localeCompare(b.title)
        break
      case "artist":
        comparison = a.artist.localeCompare(b.artist)
        break
      case "date":
        comparison = new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        break
      case "duration":
        const aDuration = Number.parseInt(a.duration.split(":")[0]) * 60 + Number.parseInt(a.duration.split(":")[1])
        const bDuration = Number.parseInt(b.duration.split(":")[0]) * 60 + Number.parseInt(b.duration.split(":")[1])
        comparison = aDuration - bDuration
        break
    }
    return sortOrder === "asc" ? comparison : -comparison
  })

  const toggleTrackSelection = (trackId: number) => {
    setSelectedTracks((prev) => (prev.includes(trackId) ? prev.filter((id) => id !== trackId) : [...prev, trackId]))
  }

  const selectAllTracks = () => {
    setSelectedTracks(sortedTracks.map((track) => track.id))
  }

  const clearSelection = () => {
    setSelectedTracks([])
  }

  const removeFromFavorites = (trackIds: number[]) => {
    // Implementation for removing tracks from favorites
    console.log("Removing tracks:", trackIds)
    setSelectedTracks([])
  }

  const totalDuration = favoriteTracks.reduce((total, track) => {
    const [minutes, seconds] = track.duration.split(":").map(Number)
    return total + minutes * 60 + seconds
  }, 0)

  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

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
          gradient="from-[#FF6B6B]/[0.12]"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF6B6B]/10 to-[#5F85DB]/10 border border-[#FF6B6B]/20 mb-4">
              <Heart className="w-5 h-5 text-[#FF6B6B]" />
              <span className="text-sm text-[#FAF7F0]/80 tracking-wide">Your Music Collection</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FAF7F0] via-[#FF6B6B] to-[#5F85DB] mb-4">
              My Favorites
            </h1>
            <p className="text-[#FAF7F0]/60 text-lg max-w-2xl mx-auto">
              {favoriteTracks.length} tracks in your collection
            </p>
          </motion.div>

          {/* Controls Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FAF7F0]/40 w-4 h-4" />
                    <Input
                      placeholder="Search your favorites..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-[#26282B]/30 border-[#26282B]/50 text-[#FAF7F0] placeholder:text-[#FAF7F0]/40 focus:border-[#FF6B6B]/50"
                    />
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2">
                    {/* Sort */}
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                        className="text-[#FAF7F0]/60 hover:text-[#FAF7F0]"
                      >
                        {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                      </Button>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-[#26282B]/50 border border-[#26282B]/50 text-[#FAF7F0] text-sm rounded px-2 py-1"
                      >
                        <option value="date">Date Added</option>
                        <option value="name">Name</option>
                        <option value="artist">Artist</option>
                        <option value="duration">Duration</option>
                      </select>
                    </div>

                    {/* View Mode */}
                    <div className="flex items-center gap-1 bg-[#26282B]/30 rounded-lg p-1">
                      <Button
                        size="sm"
                        variant={viewMode === "list" ? "default" : "ghost"}
                        onClick={() => setViewMode("list")}
                        className="w-8 h-8 p-0"
                      >
                        <List className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        onClick={() => setViewMode("grid")}
                        className="w-8 h-8 p-0"
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Bulk Actions */}
                    {selectedTracks.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#FAF7F0]/60">{selectedTracks.length} selected</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromFavorites(selectedTracks)}
                          className="text-[#FF6B6B] hover:text-[#FF6B6B]/80"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={clearSelection}
                          className="text-[#FAF7F0]/60 hover:text-[#FAF7F0]"
                        >
                          Clear
                        </Button>
                      </div>
                    )}

                    <Button
                      size="sm"
                      onClick={selectedTracks.length === sortedTracks.length ? clearSelection : selectAllTracks}
                      className="bg-gradient-to-r from-[#5F85DB] to-[#7B68EE] hover:opacity-90"
                    >
                      {selectedTracks.length === sortedTracks.length ? "Deselect All" : "Select All"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tracks Display */}
          {viewMode === "list" ? (
            <div className="space-y-4">
              {sortedTracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm hover:bg-[#26282B]/70 transition-all duration-300 group">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {/* Selection Checkbox */}
                        <input
                          type="checkbox"
                          checked={selectedTracks.includes(track.id)}
                          onChange={() => toggleTrackSelection(track.id)}
                          className="w-4 h-4 rounded border-[#26282B]/50 bg-[#26282B]/30 text-[#FF6B6B] focus:ring-[#FF6B6B]/50"
                        />

                        {/* Album Cover with Visualizer */}
                        <div className="relative">
                          <img
                            src={track.cover || "/placeholder.svg"}
                            alt={track.title}
                            className="w-16 h-16 rounded-lg"
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
                              <Play className="w-5 h-5 text-[#FAF7F0]" />
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
                            <span>Added {new Date(track.dateAdded).toLocaleDateString()}</span>
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
                            className="text-[#FF6B6B] hover:text-[#FF6B6B]/80 hover:bg-[#FF6B6B]/10"
                          >
                            <Heart className="w-4 h-4 fill-current" />
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
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {sortedTracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm hover:bg-[#26282B]/70 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-4">
                      {/* Selection Checkbox */}
                      <div className="flex justify-between items-start mb-3">
                        <input
                          type="checkbox"
                          checked={selectedTracks.includes(track.id)}
                          onChange={() => toggleTrackSelection(track.id)}
                          className="w-4 h-4 rounded border-[#26282B]/50 bg-[#26282B]/30 text-[#FF6B6B] focus:ring-[#FF6B6B]/50"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[#FF6B6B] hover:text-[#FF6B6B]/80 w-6 h-6 p-0"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </Button>
                      </div>

                      {/* Album Cover */}
                      <div className="relative mb-4">
                        <img
                          src={track.cover || "/placeholder.svg"}
                          alt={track.title}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${track.color} opacity-20 rounded-lg group-hover:opacity-40 transition-opacity`}
                        ></div>
                        {playingTrack === track.id ? (
                          <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                            <MusicVisualizer isPlaying={true} />
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              size="sm"
                              onClick={() => setPlayingTrack(playingTrack === track.id ? null : track.id)}
                              className={`bg-gradient-to-r ${track.color} hover:opacity-90 w-12 h-12 rounded-full`}
                            >
                              <Play className="w-5 h-5" />
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Track Info */}
                      <div className="text-center">
                        <h3 className="text-[#FAF7F0] font-semibold text-sm truncate mb-1">{track.title}</h3>
                        <p className="text-[#FAF7F0]/60 text-xs mb-2 truncate">{track.artist}</p>
                        <div className="flex justify-between text-xs text-[#FAF7F0]/60">
                          <span>{track.duration}</span>
                          <span>{track.plays}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {filteredTracks.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#FAF7F0]" />
              </div>
              <p className="text-[#FAF7F0]/60 text-lg mb-2">No favorites found</p>
              <p className="text-[#FAF7F0]/40 text-sm">
                {searchQuery ? "Try adjusting your search terms" : "Start adding tracks to your favorites!"}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
