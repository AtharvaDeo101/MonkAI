"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Wand2, Play, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
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

export default function GeneratePage() {
  const [description, setDescription] = useState("")
  const [fileName, setFileName] = useState("")
  const [duration, setDuration] = useState([15])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTrack, setGeneratedTrack] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!description.trim()) return

    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setGeneratedTrack(`${fileName || "generated-track"}.wav`)
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#5F85DB]/[0.05] via-transparent to-[#5F85DB]/[0.08] blur-3xl" />

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={350}
          height={90}
          rotate={15}
          gradient="from-[#5F85DB]/[0.12]"
          className="left-[-8%] top-[25%]"
        />
        <ElegantShape
          delay={0.5}
          width={280}
          height={70}
          rotate={-12}
          gradient="from-[#5F85DB]/[0.12]"
          className="right-[-6%] top-[65%]"
        />
        <ElegantShape
          delay={0.4}
          width={180}
          height={50}
          rotate={8}
          gradient="from-[#5F85DB]/[0.12]"
          className="left-[15%] bottom-[20%]"
        />
      </div>

      <Header />

      <div className="relative z-10 pt-20 px-4 pb-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-[#FAF7F0] mb-4">Generate Music with AI</h1>
            <p className="text-[#FAF7F0]/60 text-lg">Describe your musical vision and let AI bring it to life</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#FAF7F0] flex items-center gap-2">
                    <Wand2 className="w-5 h-5" />
                    Music Description
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="description" className="text-[#FAF7F0]/80 mb-2 block">
                      Describe your music
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="e.g., Upbeat electronic dance music with synthesizers and a driving beat, perfect for a workout playlist..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-[#26282B]/30 border-[#26282B]/50 text-[#FAF7F0] placeholder:text-[#FAF7F0]/40 min-h-[120px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="duration" className="text-[#FAF7F0]/80 mb-3 block">
                      Duration: {duration[0]} seconds
                    </Label>
                    <Slider
                      id="duration"
                      min={5}
                      max={30}
                      step={1}
                      value={duration}
                      onValueChange={setDuration}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-[#FAF7F0]/60 mt-1">
                      <span>5s</span>
                      <span>30s</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="filename" className="text-[#FAF7F0]/80 mb-2 block">
                      File Name (optional)
                    </Label>
                    <Input
                      id="filename"
                      placeholder="my-awesome-track"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      className="bg-[#26282B]/30 border-[#26282B]/50 text-[#FAF7F0] placeholder:text-[#FAF7F0]/40"
                    />
                    <p className="text-sm text-[#FAF7F0]/60 mt-1">Will be saved as .wav format</p>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={!description.trim() || isGenerating}
                    className="w-full bg-gradient-to-r from-[#5F85DB] to-[#5F85DB] hover:from-[#5F85DB]/90 hover:to-[#5F85DB]/90"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generate Music
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Output Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#FAF7F0]">Generated Track</CardTitle>
                </CardHeader>
                <CardContent>
                  {isGenerating ? (
                    <div className="text-center py-12">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-16 h-16 border-4 border-[#5F85DB]/30 border-t-[#5F85DB] rounded-full mx-auto mb-4"
                      />
                      <p className="text-[#FAF7F0]/60">Creating your music...</p>
                    </div>
                  ) : generatedTrack ? (
                    <div className="space-y-4">
                      <div className="bg-[#26282B]/30 rounded-lg p-4">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-[#5F85DB] to-[#5F85DB] rounded-lg flex items-center justify-center">
                            <Wand2 className="w-8 h-8 text-[#FAF7F0]" />
                          </div>
                          <div>
                            <p className="text-[#FAF7F0] font-medium">{generatedTrack}</p>
                            <p className="text-[#FAF7F0]/60 text-sm">{duration[0]} seconds</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <Play className="w-4 h-4 mr-2" />
                            Play
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 text-[#FAF7F0] hover:bg-white/10 bg-transparent"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-[#26282B]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Wand2 className="w-8 h-8 text-[#FAF7F0]/40" />
                      </div>
                      <p className="text-[#FAF7F0]/60">Your generated music will appear here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
