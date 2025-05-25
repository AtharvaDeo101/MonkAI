"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Music,
  Scissors,
  Upload,
  Download,
  Save,
  AudioWaveformIcon as Waveform,
  Volume2,
  Clock,
  Loader2,
  Share2,
  Copy,
  RotateCcw,
} from "lucide-react"
import { motion } from "framer-motion"
import { MusicPlayer } from "@/components/music-player"

export function AdvancedComposer() {
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState([240]) // 4 minutes default
  const [currentTrack, setCurrentTrack] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Audio editing states
  const [tempo, setTempo] = useState([120])
  const [pitch, setPitch] = useState([0])
  const [volume, setVolume] = useState([80])
  const [trimStart, setTrimStart] = useState([0])
  const [trimEnd, setTrimEnd] = useState([100])
  const [fadeIn, setFadeIn] = useState([0])
  const [fadeOut, setFadeOut] = useState([0])

  const handleGenerate = async () => {
    if (!description.trim()) return

    setIsGenerating(true)
    setTimeout(() => {
      setCurrentTrack({
        title: "AI Composed Track",
        description: description,
        duration: formatDuration(duration[0]),
        audioUrl: "/placeholder-audio.mp3",
        originalDuration: duration[0],
        createdAt: new Date().toISOString(),
      })
      setIsGenerating(false)
    }, 2000)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setCurrentTrack({
        title: file.name.replace(/\.[^/.]+$/, ""),
        description: "Uploaded audio file",
        duration: "Unknown",
        audioUrl: url,
        originalDuration: 0,
        createdAt: new Date().toISOString(),
      })
    }
  }

  const applyEffect = (effectName: string) => {
    console.log(`Applying ${effectName} effect`)
    // In a real app, this would apply the actual audio effect
  }

  const resetSettings = () => {
    setTempo([120])
    setPitch([0])
    setVolume([80])
    setTrimStart([0])
    setTrimEnd([100])
    setFadeIn([0])
    setFadeOut([0])
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Compose & Edit Studio</h1>
        <p className="text-gray-400 text-lg">Generate music and edit it with professional tools</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Generation Panel */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Music className="w-5 h-5" />
                Generate Music
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Music Description</label>
                <Textarea
                  placeholder="Describe your music composition..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-24 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Duration: {formatDuration(duration[0])}
                </label>
                <Slider value={duration} onValueChange={setDuration} min={30} max={600} step={30} />
              </div>

              <div className="flex flex-wrap gap-2">
                {["Orchestral", "Ambient", "Cinematic", "Lo-fi", "Synthwave", "Jazz"].map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-purple-500/20 border-purple-500/50 text-purple-300"
                    onClick={() => setDescription((prev) => prev + (prev ? ", " : "") + tag.toLowerCase())}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!description.trim() || isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Music className="mr-2 h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>

              <div className="relative">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button variant="outline" className="w-full border-white/20 text-white">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Audio File
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={resetSettings} variant="outline" size="sm" className="w-full border-white/20 text-white">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset All Settings
              </Button>
              <Button variant="outline" size="sm" className="w-full border-white/20 text-white">
                <Copy className="w-4 h-4 mr-2" />
                Duplicate Track
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Audio Editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Waveform className="w-5 h-5" />
                Audio Editor
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentTrack ? (
                <Tabs defaultValue="player" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4 bg-white/10">
                    <TabsTrigger value="player" className="text-white">
                      Player
                    </TabsTrigger>
                    <TabsTrigger value="edit" className="text-white">
                      Edit
                    </TabsTrigger>
                    <TabsTrigger value="effects" className="text-white">
                      Effects
                    </TabsTrigger>
                    <TabsTrigger value="export" className="text-white">
                      Export
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="player" className="space-y-4">
                    <div className="text-center mb-4">
                      <h3 className="text-white text-lg font-semibold">{currentTrack.title}</h3>
                      <p className="text-gray-400 text-sm">{currentTrack.description}</p>
                      <div className="flex justify-center gap-2 mt-2">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                          {currentTrack.duration}
                        </Badge>
                      </div>
                    </div>
                    <MusicPlayer audioUrl={currentTrack.audioUrl} />
                  </TabsContent>

                  <TabsContent value="edit" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-white text-sm font-medium mb-2 block flex items-center gap-2">
                            <Scissors className="w-4 h-4" />
                            Trim Audio
                          </label>
                          <div className="space-y-3">
                            <div>
                              <label className="text-gray-400 text-xs">Start: {trimStart[0]}%</label>
                              <Slider
                                value={trimStart}
                                onValueChange={setTrimStart}
                                max={100}
                                step={1}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-gray-400 text-xs">End: {trimEnd[0]}%</label>
                              <Slider value={trimEnd} onValueChange={setTrimEnd} max={100} step={1} className="mt-1" />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="text-white text-sm font-medium mb-2 block flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Tempo: {tempo[0]} BPM
                          </label>
                          <Slider value={tempo} onValueChange={setTempo} min={60} max={200} step={1} />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-white text-sm font-medium mb-2 block">
                            Pitch: {pitch[0] > 0 ? "+" : ""}
                            {pitch[0]} semitones
                          </label>
                          <Slider value={pitch} onValueChange={setPitch} min={-12} max={12} step={1} />
                        </div>

                        <div>
                          <label className="text-white text-sm font-medium mb-2 block flex items-center gap-2">
                            <Volume2 className="w-4 h-4" />
                            Volume: {volume[0]}%
                          </label>
                          <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">Fade In: {fadeIn[0]}s</label>
                        <Slider value={fadeIn} onValueChange={setFadeIn} max={10} step={0.5} />
                      </div>
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">Fade Out: {fadeOut[0]}s</label>
                        <Slider value={fadeOut} onValueChange={setFadeOut} max={10} step={0.5} />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="effects" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-white font-medium mb-3">Audio Effects</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            onClick={() => applyEffect("reverb")}
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white"
                          >
                            Reverb
                          </Button>
                          <Button
                            onClick={() => applyEffect("echo")}
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white"
                          >
                            Echo
                          </Button>
                          <Button
                            onClick={() => applyEffect("chorus")}
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white"
                          >
                            Chorus
                          </Button>
                          <Button
                            onClick={() => applyEffect("distortion")}
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white"
                          >
                            Distortion
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-3">Processing</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            onClick={() => applyEffect("normalize")}
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white"
                          >
                            Normalize
                          </Button>
                          <Button
                            onClick={() => applyEffect("compress")}
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white"
                          >
                            Compress
                          </Button>
                          <Button
                            onClick={() => applyEffect("eq")}
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white"
                          >
                            EQ
                          </Button>
                          <Button
                            onClick={() => applyEffect("limiter")}
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white"
                          >
                            Limiter
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-3">Effect Chain</h4>
                      <div className="bg-white/5 rounded-lg p-4 min-h-20 border-2 border-dashed border-white/20">
                        <p className="text-gray-400 text-sm text-center">Drag effects here to create a chain</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="export" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-white font-medium mb-3">Export Settings</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="text-gray-400 text-sm">Format</label>
                            <select className="w-full mt-1 bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white">
                              <option value="mp3">MP3</option>
                              <option value="wav">WAV</option>
                              <option value="flac">FLAC</option>
                              <option value="aac">AAC</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">Quality</label>
                            <select className="w-full mt-1 bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white">
                              <option value="320">320 kbps (High)</option>
                              <option value="256">256 kbps</option>
                              <option value="192">192 kbps</option>
                              <option value="128">128 kbps</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-3">Actions</h4>
                        <div className="space-y-2">
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            <Save className="w-4 h-4 mr-2" />
                            Save Project
                          </Button>
                          <Button variant="outline" className="w-full border-white/20 text-white">
                            <Download className="w-4 h-4 mr-2" />
                            Export Audio
                          </Button>
                          <Button variant="outline" className="w-full border-white/20 text-white">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share Project
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-12">
                  <Music className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-2">No audio loaded</h3>
                  <p className="text-gray-400">Generate or upload music to start editing</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
