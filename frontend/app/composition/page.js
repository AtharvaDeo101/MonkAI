"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Play,
  Pause,
  Square,
  Download,
  Share,
  AudioWaveformIcon as Waveform,
  Volume2,
  Clock,
  Sparkles,
  Settings,
  Save,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function Composition() {
  const [description, setDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState([30])
  const [tempo, setTempo] = useState([120])
  const [volume, setVolume] = useState([75])

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false)
    }, 3000)
  }

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
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Music Composition
            </h1>
            <p className="text-gray-400 text-sm">Create and edit your musical masterpieces</p>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 bg-gradient-to-br from-gray-900 via-gray-900 to-pink-900/20">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Generation Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    AI Music Generation
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Describe the music you want to create and let AI bring it to life
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="description" className="text-gray-300">
                      Music Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your music... e.g., 'A peaceful ambient track with soft piano melodies and nature sounds, perfect for meditation'"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-2 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 min-h-[120px]"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-gray-300">Genre</Label>
                      <Select>
                        <SelectTrigger className="mt-2 bg-gray-700/50 border-gray-600 text-white">
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ambient">Ambient</SelectItem>
                          <SelectItem value="electronic">Electronic</SelectItem>
                          <SelectItem value="classical">Classical</SelectItem>
                          <SelectItem value="jazz">Jazz</SelectItem>
                          <SelectItem value="rock">Rock</SelectItem>
                          <SelectItem value="cinematic">Cinematic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-gray-300">Mood</Label>
                      <Select>
                        <SelectTrigger className="mt-2 bg-gray-700/50 border-gray-600 text-white">
                          <SelectValue placeholder="Select mood" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="peaceful">Peaceful</SelectItem>
                          <SelectItem value="energetic">Energetic</SelectItem>
                          <SelectItem value="melancholic">Melancholic</SelectItem>
                          <SelectItem value="uplifting">Uplifting</SelectItem>
                          <SelectItem value="mysterious">Mysterious</SelectItem>
                          <SelectItem value="dramatic">Dramatic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Duration: {duration[0]} seconds</Label>
                      <Slider
                        value={duration}
                        onValueChange={setDuration}
                        max={300}
                        min={10}
                        step={5}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-300">Tempo: {tempo[0]} BPM</Label>
                      <Slider value={tempo} onValueChange={setTempo} max={200} min={60} step={5} className="mt-2" />
                    </div>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={!description.trim() || isGenerating}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Generating...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Generate Music
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Audio Player & Waveform */}
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Waveform className="h-5 w-5 text-blue-400" />
                    Audio Player & Editor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Waveform Visualization */}
                  <div className="h-32 bg-gray-700/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="flex items-end gap-1 h-20">
                      {Array.from({ length: 50 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="bg-gradient-to-t from-purple-500 to-pink-500 w-2 rounded-sm"
                          style={{ height: `${Math.random() * 100}%` }}
                          animate={{
                            height: isPlaying ? `${Math.random() * 100}%` : `${Math.random() * 100}%`,
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                            repeatType: "reverse",
                          }}
                        />
                      ))}
                    </div>
                    {!isGenerating && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-gray-400">Generate music to see waveform</p>
                      </div>
                    )}
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={togglePlayback}
                        className="border-gray-600 hover:bg-gray-700"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button size="icon" variant="outline" className="border-gray-600 hover:bg-gray-700">
                        <Square className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-2 ml-4">
                        <Volume2 className="h-4 w-4 text-gray-400" />
                        <Slider value={volume} onValueChange={setVolume} max={100} min={0} step={1} className="w-20" />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700">
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="text-sm text-gray-400 flex justify-between">
                    <span>0:00</span>
                    <span>0:30</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Settings & History Panel */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="h-5 w-5 text-green-400" />
                    Advanced Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Quality</Label>
                    <Select>
                      <SelectTrigger className="mt-2 bg-gray-700/50 border-gray-600 text-white">
                        <SelectValue placeholder="High Quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (22kHz)</SelectItem>
                        <SelectItem value="medium">Medium (44kHz)</SelectItem>
                        <SelectItem value="high">High (48kHz)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-300">Format</Label>
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

                  <div className="pt-4 border-t border-gray-700">
                    <h4 className="font-medium text-white mb-3">Quick Presets</h4>
                    <div className="space-y-2">
                      {["Meditation", "Workout", "Study", "Sleep"].map((preset) => (
                        <Button
                          key={preset}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start border-gray-600 hover:bg-gray-700"
                        >
                          {preset}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-400" />
                    Recent Generations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Ethereal Dreams", time: "2 min ago", genre: "Ambient" },
                    { name: "Neon Nights", time: "15 min ago", genre: "Synthwave" },
                    { name: "Forest Whispers", time: "1 hour ago", genre: "Nature" },
                    { name: "Urban Pulse", time: "2 hours ago", genre: "Electronic" },
                  ].map((track, index) => (
                    <motion.div
                      key={track.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors cursor-pointer"
                    >
                      <div>
                        <p className="font-medium text-white text-sm">{track.name}</p>
                        <p className="text-xs text-gray-400">{track.time}</p>
                      </div>
                      <Badge variant="secondary" className="bg-gray-600 text-gray-300 text-xs">
                        {track.genre}
                      </Badge>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
