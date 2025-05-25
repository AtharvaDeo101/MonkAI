"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Music, Scissors, Upload, Download, Save, AudioWaveformIcon as Waveform, Volume2, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { MusicPlayer } from "@/components/music-player"

export function ComposeStudio() {
  const [description, setDescription] = useState("")
  const [currentTrack, setCurrentTrack] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Audio editing states
  const [tempo, setTempo] = useState([120])
  const [pitch, setPitch] = useState([0])
  const [volume, setVolume] = useState([80])
  const [trimStart, setTrimStart] = useState([0])
  const [trimEnd, setTrimEnd] = useState([100])

  const handleGenerate = async () => {
    if (!description.trim()) return

    setIsGenerating(true)
    setTimeout(() => {
      setCurrentTrack({
        title: "Composed Track",
        description: description,
        duration: "4:32",
        audioUrl: "/placeholder-audio.mp3",
      })
      setIsGenerating(false)
    }, 2000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setCurrentTrack({
        title: file.name,
        description: "Uploaded audio file",
        duration: "Unknown",
        audioUrl: url,
      })
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Music Compose Studio</h1>
        <p className="text-gray-400 text-lg">Create, edit, and perfect your musical compositions</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Generation Panel */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Music className="w-5 h-5" />
                Generate Music
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe your music composition..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-24 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />

              <div className="flex flex-wrap gap-2">
                {["Orchestral", "Ambient", "Cinematic", "Lo-fi", "Synthwave"].map((tag) => (
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
                {isGenerating ? "Generating..." : "Generate"}
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
                  <TabsList className="grid w-full grid-cols-3 bg-white/10">
                    <TabsTrigger value="player" className="text-white">
                      Player
                    </TabsTrigger>
                    <TabsTrigger value="edit" className="text-white">
                      Edit
                    </TabsTrigger>
                    <TabsTrigger value="effects" className="text-white">
                      Effects
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="player" className="space-y-4">
                    <div className="text-center mb-4">
                      <h3 className="text-white text-lg font-semibold">{currentTrack.title}</h3>
                      <p className="text-gray-400 text-sm">{currentTrack.description}</p>
                    </div>
                    <MusicPlayer audioUrl={currentTrack.audioUrl} />
                  </TabsContent>

                  <TabsContent value="edit" className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block flex items-center gap-2">
                          <Scissors className="w-4 h-4" />
                          Trim Audio
                        </label>
                        <div className="space-y-2">
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <label className="text-gray-400 text-xs">Start (%)</label>
                              <Slider
                                value={trimStart}
                                onValueChange={setTrimStart}
                                max={100}
                                step={1}
                                className="mt-1"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="text-gray-400 text-xs">End (%)</label>
                              <Slider value={trimEnd} onValueChange={setTrimEnd} max={100} step={1} className="mt-1" />
                            </div>
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

                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">
                          Pitch: {pitch[0] > 0 ? "+" : ""}
                          {pitch[0]} semitones
                        </label>
                        <Slider value={pitch} onValueChange={setPitch} min={-12} max={12} step={1} />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="effects" className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block flex items-center gap-2">
                          <Volume2 className="w-4 h-4" />
                          Volume: {volume[0]}%
                        </label>
                        <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="border-white/20 text-white">
                          Add Reverb
                        </Button>
                        <Button variant="outline" className="border-white/20 text-white">
                          Add Echo
                        </Button>
                        <Button variant="outline" className="border-white/20 text-white">
                          Normalize
                        </Button>
                        <Button variant="outline" className="border-white/20 text-white">
                          Fade In/Out
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <div className="flex gap-2 pt-4 border-t border-white/10">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Project
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </Tabs>
              ) : (
                <div className="text-center py-12">
                  <Music className="w-16 h-16 text-gray-500 mx-auto mb-4" />
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
