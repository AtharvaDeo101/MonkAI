"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, Music, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { MusicPlayer } from "@/components/music-player"

export function MusicGenerator() {
  const [description, setDescription] = useState("")
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
        duration: "3:24",
        genre: "Electronic",
        mood: "Uplifting",
        audioUrl: "/placeholder-audio.mp3", // This would be the generated audio
      })
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Describe Your Music</h2>
          <p className="text-gray-400 text-lg">Tell us what kind of music you want, and we'll create it for you</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  Music Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Describe the music you want... e.g., 'A relaxing piano melody with soft strings, perfect for studying'"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-32 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />

                <div className="flex flex-wrap gap-2">
                  {["Relaxing", "Upbeat", "Classical", "Electronic", "Jazz", "Rock"].map((tag) => (
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
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
                    <p className="text-white">Creating your music...</p>
                    <p className="text-gray-400 text-sm">This may take a few moments</p>
                  </div>
                </CardContent>
              </Card>
            ) : generatedMusic ? (
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">{generatedMusic.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                      {generatedMusic.genre}
                    </Badge>
                    <Badge variant="outline" className="border-blue-500/50 text-blue-300">
                      {generatedMusic.mood}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-400 text-sm">{generatedMusic.description}</p>

                  <MusicPlayer audioUrl={generatedMusic.audioUrl} />

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Music className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Your generated music will appear here</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
