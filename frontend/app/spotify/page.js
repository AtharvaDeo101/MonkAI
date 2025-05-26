"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Search,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Plus,
  Shuffle,
  Repeat,
  Music,
  TrendingUp,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockTracks = [
  {
    id: 1,
    name: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    duration: "2:54",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: "3:23",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    name: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    duration: "2:58",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 5,
    name: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    album: "F*CK LOVE 3",
    duration: "2:21",
    image: "/placeholder.svg?height=60&width=60",
  },
]

const mockPlaylists = [
  { id: 1, name: "Today's Top Hits", tracks: 50, image: "/placeholder.svg?height=120&width=120" },
  { id: 2, name: "RapCaviar", tracks: 65, image: "/placeholder.svg?height=120&width=120" },
  { id: 3, name: "Pop Rising", tracks: 80, image: "/placeholder.svg?height=120&width=120" },
  { id: 4, name: "Chill Hits", tracks: 100, image: "/placeholder.svg?height=120&width=120" },
]

export default function Spotify() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentTrack, setCurrentTrack] = useState(mockTracks[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800 px-6">
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Spotify Integration
            </h1>
            <p className="text-gray-400 text-sm">Discover and play millions of songs</p>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-900 via-gray-900 to-green-700/20">
          <div className="p-6 space-y-6">
            {/* Search Bar */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search for songs, artists, or albums..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <Tabs defaultValue="discover" className="space-y-6">
              <TabsList className="bg-gray-800/50 border-gray-700">
                <TabsTrigger value="discover" className="data-[state=active]:bg-gray-700">
                  Discover
                </TabsTrigger>
                <TabsTrigger value="playlists" className="data-[state=active]:bg-gray-700">
                  Playlists
                </TabsTrigger>
                <TabsTrigger value="search" className="data-[state=active]:bg-gray-700">
                  Search Results
                </TabsTrigger>
              </TabsList>

              <TabsContent value="discover" className="space-y-6">
                {/* Featured Playlists */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-400" />
                        Featured Playlists
                      </CardTitle>
                      <CardDescription className="text-gray-400">Popular playlists curated for you</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {mockPlaylists.map((playlist, index) => (
                          <motion.div
                            key={playlist.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                          >
                            <div className="relative overflow-hidden rounded-lg bg-gray-700/30 p-4 transition-all duration-300 hover:bg-gray-700/50">
                              <div className="aspect-square mb-3 overflow-hidden rounded-md bg-gray-600">
                                <img
                                  src={playlist.image || "/placeholder.svg"}
                                  alt={playlist.name}
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                              </div>
                              <h3 className="font-semibold text-white truncate">{playlist.name}</h3>
                              <p className="text-sm text-gray-400">{playlist.tracks} tracks</p>
                              <Button
                                size="icon"
                                className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-green-500 hover:bg-green-600"
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Trending Tracks */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Music className="h-5 w-5 text-purple-400" />
                        Trending Now
                      </CardTitle>
                      <CardDescription className="text-gray-400">Most popular tracks this week</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockTracks.map((track, index) => (
                          <motion.div
                            key={track.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors cursor-pointer group"
                          >
                            <div className="relative">
                              <img
                                src={track.image || "/placeholder.svg"}
                                alt={track.name}
                                className="h-12 w-12 rounded-md object-cover"
                              />
                              <Button
                                size="icon"
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70"
                                onClick={() => {
                                  setCurrentTrack(track)
                                  setIsPlaying(true)
                                }}
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-white truncate">{track.name}</p>
                              <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                            </div>
                            <div className="text-sm text-gray-400">{track.duration}</div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="playlists">
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Your Playlists</CardTitle>
                    <CardDescription className="text-gray-400">Manage your personal music collections</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">Connect your Spotify account to view your playlists</p>
                      <Button className="mt-4 bg-green-600 hover:bg-green-700">Connect Spotify</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="search">
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Search Results</CardTitle>
                    <CardDescription className="text-gray-400">
                      {searchQuery ? `Results for "${searchQuery}"` : "Enter a search term to find music"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {searchQuery ? (
                      <div className="space-y-3">
                        {mockTracks
                          .filter(
                            (track) =>
                              track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              track.artist.toLowerCase().includes(searchQuery.toLowerCase()),
                          )
                          .map((track, index) => (
                            <motion.div
                              key={track.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors cursor-pointer"
                            >
                              <img
                                src={track.image || "/placeholder.svg"}
                                alt={track.name}
                                className="h-12 w-12 rounded-md object-cover"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-white">{track.name}</p>
                                <p className="text-sm text-gray-400">{track.artist}</p>
                              </div>
                              <Badge variant="secondary" className="bg-gray-600 text-gray-300">
                                {track.duration}
                              </Badge>
                            </motion.div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">Start typing to search for music</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Now Playing Bar */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 p-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <img
                  src={currentTrack.image || "/placeholder.svg"}
                  alt={currentTrack.name}
                  className="h-12 w-12 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <p className="font-medium text-white truncate">{currentTrack.name}</p>
                  <p className="text-sm text-gray-400 truncate">{currentTrack.artist}</p>
                </div>
                <Button size="icon" variant="ghost">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <Shuffle className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button size="icon" onClick={togglePlayback} className="bg-white text-black hover:bg-gray-200">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button size="icon" variant="ghost">
                  <SkipForward className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Repeat className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 flex-1 justify-end">
                <Volume2 className="h-4 w-4 text-gray-400" />
                <Slider value={volume} onValueChange={setVolume} max={100} min={0} step={1} className="w-24" />
              </div>
            </div>
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
