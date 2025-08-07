"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
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
  TrendingUp,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardContent as CardContent2 } from "@/components/ui/card"
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

export default function TracksClient({
  initialTracks,
  initialGenres,
  initialPlaylists,
  initialCharts,
}: {
  initialTracks: any[];
  initialGenres: any[];
  initialPlaylists: any[];
  initialCharts: { mostPopular: any[]; trendingNow: any[] };
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [playingTrack, setPlayingTrack] = useState<number | null>(null)

  const filteredTracks = initialTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  useEffect(() => {
    if (playingTrack) {
      const track = filteredTracks.find(t => t.id === playingTrack);
      if (track?.audioUrl) {
        const audio = new Audio(track.audioUrl);
        audio.play().catch(error => console.error("Audio playback error:", error));
        return () => {
          audio.pause();
          audio.currentTime = 0;
        };
      }
    }
  }, [playingTrack, filteredTracks]);

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
            {initialGenres.map((genre: any, index: number) => (
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
            {filteredTracks.map((track: any, index: number) => (
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
                          {track.tags.map((tag: string, tagIndex: number) => (
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
                        {track.attribution?.required && (
                          <p className="text-[#FAF7F0]/50 text-xs mt-1">
                            <a href={track.attribution.link} target="_blank" rel="noopener noreferrer">
                              {track.attribution.text}
                            </a>
                          </p>
                        )}
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

      {/* Featured Playlists */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#FAF7F0] mb-8 text-center">Featured Playlists</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {initialPlaylists.map((playlist: any, index: number) => (
            <motion.div
              key={playlist.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm hover:bg-[#26282B]/70 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <img
                      src={playlist.cover || "/placeholder.svg"}
                      alt={playlist.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${playlist.color} opacity-20 rounded-lg group-hover:opacity-40 transition-opacity`}
                    ></div>
                    <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-12 h-12 text-[#FAF7F0]" />
                    </div>
                  </div>
                  <h3 className="text-[#FAF7F0] font-semibold text-lg mb-2">{playlist.title}</h3>
                  <p className="text-[#FAF7F0]/60 text-sm mb-3 leading-relaxed">{playlist.description}</p>
                  <div className="flex justify-between text-sm text-[#FAF7F0]/60">
                    <span>{playlist.trackCount} tracks</span>
                    <span>{playlist.duration}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Top Charts */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#FAF7F0] mb-8 text-center">Top Charts This Week</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#FAF7F0] flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-[#5F85DB]" />
                Most Popular
              </CardTitle>
            </CardHeader>
            <CardContent2>
              <div className="space-y-4">
                {initialCharts.mostPopular.map((track: any) => (
                  <div
                    key={track.rank}
                    className="flex items-center gap-4 p-3 rounded-lg bg-[#26282B]/30 hover:bg-[#26282B]/50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-[#5F85DB] to-[#7B68EE] rounded-lg flex items-center justify-center text-[#FAF7F0] font-bold text-sm">
                      {track.rank}
                    </div>
                    <div className="flex-1">
                      <p className="text-[#FAF7F0] font-medium">{track.title}</p>
                      <p className="text-[#FAF7F0]/60 text-sm">{track.plays} plays</p>
                    </div>
                    <div className="text-[#4ECDC4] text-sm font-medium">{track.trend}</div>
                  </div>
                ))}
              </div>
            </CardContent2>
          </Card>

          <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#FAF7F0] flex items-center gap-2">
                <Zap className="w-6 h-6 text-[#FFD93D]" />
                Trending Now
              </CardTitle>
            </CardHeader>
            <CardContent2>
              <div className="space-y-4">
                {initialCharts.trendingNow.map((track: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg bg-[#26282B]/30 hover:bg-[#26282B]/50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-[#FFD93D] to-[#FF6B6B] rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-[#000000]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#FAF7F0] font-medium">{track.title}</p>
                      <p className="text-[#FAF7F0]/60 text-sm">{track.genre}</p>
                    </div>
                    <div className="text-[#FFD93D] text-sm font-medium">{track.growth}</div>
                  </div>
                ))}
              </div>
            </CardContent2>
          </Card>
        </div>
      </motion.div>

      {/* Music Categories */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#FAF7F0] mb-8 text-center">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {initialGenres.map((category: any, index: number) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="cursor-pointer group"
            >
              <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm hover:bg-[#26282B]/70 transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-xl">{category.icon}</span>
                  </div>
                  <h3 className="text-[#FAF7F0] font-medium text-sm mb-1">{category.name}</h3>
                  <p className="text-[#FAF7F0]/60 text-xs">{category.count} tracks</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}