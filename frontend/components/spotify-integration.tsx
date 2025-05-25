"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Music,
  Search,
  Play,
  Heart,
  Plus,
  ExternalLink,
  Download,
  Share2,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react"
import { motion } from "framer-motion"

export function SpotifyIntegration() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<any>(null)

  // Mock Spotify data
  const mockPlaylists = [
    { id: 1, name: "My AI Creations", tracks: 12, image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Chill Vibes", tracks: 25, image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Electronic Mix", tracks: 18, image: "/placeholder.svg?height=100&width=100" },
  ]

  const mockTracks = [
    { id: 1, title: "AI Symphony No. 1", artist: "MusicAI", album: "Generated Classics", duration: "3:24" },
    { id: 2, title: "Digital Dreams", artist: "MusicAI", album: "Electronic Moods", duration: "4:12" },
    { id: 3, title: "Ambient Journey", artist: "MusicAI", album: "Peaceful Sounds", duration: "5:45" },
  ]

  const handleConnect = () => {
    // Mock Spotify connection
    setIsConnected(true)
  }

  const handleAddToPlaylist = (track: any) => {
    // Mock adding to Spotify playlist
    console.log("Adding to playlist:", track)
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Spotify Integration</h1>
        <p className="text-gray-400 text-lg">Connect with Spotify to manage your AI-generated music</p>
      </motion.div>

      {!isConnected ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-md mx-auto"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Connect to Spotify</h3>
              <p className="text-gray-400 mb-6">
                Link your Spotify account to save your AI-generated music directly to your playlists
              </p>
              <Button onClick={handleConnect} className="bg-green-500 hover:bg-green-600 text-white w-full">
                Connect with Spotify
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Search & Library */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Spotify
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search songs, artists, albums..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Button size="icon" variant="outline" className="border-white/20">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Your Playlists</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockPlaylists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-purple-500/20 rounded flex items-center justify-center">
                      <Music className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{playlist.name}</p>
                      <p className="text-gray-400 text-sm">{playlist.tracks} tracks</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Tabs defaultValue="library" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 bg-white/10">
                <TabsTrigger value="library" className="text-white">
                  Your Library
                </TabsTrigger>
                <TabsTrigger value="generated" className="text-white">
                  AI Generated
                </TabsTrigger>
                <TabsTrigger value="player" className="text-white">
                  Now Playing
                </TabsTrigger>
              </TabsList>

              <TabsContent value="library">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Tracks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockTracks.map((track) => (
                        <div key={track.id} className="flex items-center gap-4 p-3 rounded hover:bg-white/5">
                          <Button size="icon" variant="ghost" className="text-green-500">
                            <Play className="w-4 h-4" />
                          </Button>
                          <div className="flex-1">
                            <p className="text-white font-medium">{track.title}</p>
                            <p className="text-gray-400 text-sm">
                              {track.artist} • {track.album}
                            </p>
                          </div>
                          <span className="text-gray-400 text-sm">{track.duration}</span>
                          <div className="flex gap-1">
                            <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white">
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-gray-400 hover:text-white"
                              onClick={() => handleAddToPlaylist(track)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="generated">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">AI Generated Music</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockTracks.map((track) => (
                        <div key={track.id} className="flex items-center gap-4 p-4 border border-white/10 rounded-lg">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Music className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold">{track.title}</h4>
                            <p className="text-gray-400 text-sm">Generated by MusicAI</p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                                AI Generated
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-white/20 text-white">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Open in Spotify
                            </Button>
                            <Button size="sm" className="bg-green-500 hover:bg-green-600">
                              <Plus className="w-4 h-4 mr-2" />
                              Add to Playlist
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="player">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="text-center mb-6">
                      <div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <Music className="w-24 h-24 text-white" />
                      </div>
                      <h3 className="text-white text-xl font-semibold">AI Symphony No. 1</h3>
                      <p className="text-gray-400">MusicAI • Generated Classics</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-4">
                        <Button size="icon" variant="ghost" className="text-white">
                          <Shuffle className="w-5 h-5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-white">
                          <SkipBack className="w-6 h-6" />
                        </Button>
                        <Button size="icon" className="bg-green-500 hover:bg-green-600 w-12 h-12">
                          <Play className="w-6 h-6" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-white">
                          <SkipForward className="w-6 h-6" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-white">
                          <Heart className="w-5 h-5" />
                        </Button>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 border-white/20 text-white">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" className="flex-1 border-white/20 text-white">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      )}
    </div>
  )
}
