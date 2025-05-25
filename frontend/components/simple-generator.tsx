"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Download, Share2, Music, Loader2, Save, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { MusicPlayer } from "@/components/music-player"

export function SimpleGenerator() {
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState([180]) // 3 minutes default
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedMusic, setGeneratedMusic] = useState<any>(null)

  const handleGenerate = async () => {
    if (!description.trim()) return

    setIsGenerating(true)
    // Simulate AI music generation
    setTimeout(() => {
      setGeneratedMusic({
        title: "AI Generated Track",
        description: description,
        duration: formatDuration(duration[0]),
        genre: "AI Generated",
        mood: "Creative",
        audioUrl: "/placeholder-audio.mp3",
        createdAt: new Date().toISOString(),
      })
      setIsGenerating(false)
    }, 3000)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSave = () => {
    // Mock save functionality
    console.log("Saving track:", generatedMusic)
    // In a real app, this would save to user's library
  }

  const handleShare = () => {
    // Mock share functionality
    if (navigator.share) {
      navigator.share({
        title: generatedMusic.title,
        text: `Check out this AI-generated music: ${generatedMusic.description}`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleDownload = () => {
    // Mock download functionality
    const link = document.createElement("a")
    link.href = generatedMusic.audioUrl
    link.download = `${generatedMusic.title}.mp3`
    link.click()
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Generate Music</h1>
        <p className="text-gray-400 text-lg">Describe your music and let AI create it for you</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Input Section */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Music className="w-5 h-5" />
                Music Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Describe your music</label>
                <Textarea
                  placeholder="e.g., 'A peaceful piano melody with soft strings, perfect for relaxation and meditation'"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-32 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Duration: {formatDuration(duration[0])}
                </label>
                <Slider value={duration} onValueChange={setDuration} min={30} max={600} step={30} className="w-full" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>30s</span>
                  <span>10min</span>
                </div>
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Quick suggestions</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Relaxing piano",
                    "Upbeat electronic",
                    "Classical orchestra",
                    "Jazz ensemble",
                    "Ambient soundscape",
                    "Rock guitar",
                  ].map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-purple-500/20 border-purple-500/50 text-purple-300"
                      onClick={() => setDescription(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!description.trim() || isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Music...
                  </>
                ) : (
                  <>
                    <Music className="mr-2 h-5 w-5" />
                    Generate Music
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Output Section */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          {isGenerating ? (
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <Loader2 className="w-16 h-16 animate-spin text-purple-500 mx-auto mb-6" />
                  <h3 className="text-white text-xl font-semibold mb-2">Creating your music...</h3>
                  <p className="text-gray-400">This may take a few moments</p>
                  <div className="mt-4 w-64 bg-white/10 rounded-full h-2 mx-auto">
                    <div className="bg-purple-500 h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : generatedMusic ? (
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-xl mb-2">{generatedMusic.title}</CardTitle>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                        {generatedMusic.genre}
                      </Badge>
                      <Badge variant="outline" className="border-blue-500/50 text-blue-300">
                        {generatedMusic.duration}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-2">Description</h4>
                  <p className="text-gray-400 text-sm">{generatedMusic.description}</p>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Audio Player</h4>
                  <MusicPlayer audioUrl={generatedMusic.audioUrl} />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button onClick={handleSave} variant="outline" className="border-white/20 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleShare} variant="outline" className="border-white/20 text-white">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button onClick={handleDownload} variant="outline" className="border-white/20 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-gray-500 text-xs">
                    Created on {new Date(generatedMusic.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <Music className="w-16 h-16 text-gray-500 mx-auto mb-6" />
                  <h3 className="text-white text-xl font-semibold mb-2">Ready to create music?</h3>
                  <p className="text-gray-400">Describe what you want to hear and click generate</p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}
