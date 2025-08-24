"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Wand2, Play, Download, Loader2, Sparkles, Zap, Music2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import Header from "@/components/layout/header"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { doc, collection, addDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

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
  const { user, userData, loading: authLoading, refreshUserData } = useAuth()
  const router = useRouter()
  const [description, setDescription] = useState("")
  const [fileName, setFileName] = useState("")
  const [duration, setDuration] = useState([15])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTrack, setGeneratedTrack] = useState<{
    fileName: string
    audioUrl: string
    title: string
  } | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!authLoading && !user) {
      console.log("User not authenticated, redirecting to login")
      router.push("/login")
    }
  }, [user, authLoading, router])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="text-[#FAF7F0] text-lg">Loading...</div>
      </div>
    )
  }

  if (!user) return null

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError("Please enter a description for the music.")
      return
    }
    if (description.length > 500) {
      setError("Description is too long (max 500 characters).")
      return
    }
    if (fileName && !/^[a-zA-Z0-9_-]+$/.test(fileName)) {
      setError("File name can only contain letters, numbers, underscores, or hyphens.")
      return
    }

    setIsGenerating(true)
    setError("")
    try {
      console.log("Generating music with:", { description, duration: duration[0], fileName })
      const response = await fetch("http://localhost:8000/generate_music", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, duration: duration[0], fileName }),
      })
      const data = await response.json()
      if (response.ok) {
        console.log("Music generated successfully:", data)
        const trackTitle = description.substring(0, 50) + (description.length > 50 ? "..." : "")
        
        // Store metadata in Firestore
        const tracksCollection = collection(db, `users/${user.uid}/generatedTracks`)
        await addDoc(tracksCollection, {
          fileName: data.fileName,
          description,
          duration: duration[0],
          title: trackTitle,
          cover: "/placeholder.svg?height=60&width=60",
          color: "from-[#5F85DB] to-[#7B68EE]",
          createdAt: new Date().toISOString(),
          audioUrl: data.audioUrl,
        })

        // Update user stats
        const userDocRef = doc(db, "users", user.uid)
        await updateDoc(userDocRef, {
          tracksGenerated: (userData?.tracksGenerated || 0) + 1,
          hoursCreated: (userData?.hoursCreated || 0) + duration[0] / 3600,
        })

        await refreshUserData()

        setGeneratedTrack({
          fileName: data.fileName,
          audioUrl: data.audioUrl,
          title: trackTitle,
        })
      } else {
        console.error("Generation error:", data.detail)
        setError(`Error: ${data.detail}`)
      }
    } catch (error: any) {
      console.error("Fetch error:", error)
      setError("Failed to connect to the backend. Ensure it is running.")
    } finally {
      setIsGenerating(false)
    }
  }

  const suggestions = [
    { text: "Upbeat electronic dance music", color: "from-[#5F85DB] to-[#7B68EE]" },
    { text: "Relaxing ambient soundscape", color: "from-[#4ECDC4] to-[#44A08D]" },
    { text: "Energetic rock anthem", color: "from-[#FF6B6B] to-[#FF8E53]" },
    { text: "Smooth jazz melody", color: "from-[#FFD93D] to-[#FF6B6B]" },
  ]

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#5F85DB]/[0.08] via-[#FF6B6B]/[0.05] to-[#4ECDC4]/[0.08] blur-3xl" />

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={350}
          height={90}
          rotate={15}
          gradient="from-[#5F85DB]/[0.15]"
          className="left-[-8%] top-[25%]"
        />
        <ElegantShape
          delay={0.5}
          width={280}
          height={70}
          rotate={-12}
          gradient="from-[#FF6B6B]/[0.12]"
          className="right-[-6%] top-[65%]"
        />
        <ElegantShape
          delay={0.4}
          width={180}
          height={50}
          rotate={8}
          gradient="from-[#4ECDC4]/[0.12]"
          className="left-[15%] bottom-[20%]"
        />
        <ElegantShape
          delay={0.6}
          width={120}
          height={40}
          rotate={-20}
          gradient="from-[#FFD93D]/[0.10]"
          className="right-[20%] top-[15%]"
        />
      </div>

      <Header />

      <div className="relative z-10 pt-20 px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#5F85DB]/10 to-[#FF6B6B]/10 border border-[#5F85DB]/20 mb-4">
              <Sparkles className="w-5 h-5 text-[#FFD93D]" />
              <span className="text-sm text-[#FAF7F0]/80 tracking-wide">AI Music Generation</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FAF7F0] via-[#5F85DB] to-[#FF6B6B] mb-4">
              Generate Music with AI
            </h1>
            <p className="text-[#FAF7F0]/60 text-lg">Describe your musical vision and let AI bring it to life</p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-md bg-red-500/10 border border-red-500/20 flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

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
                    <div className="w-8 h-8 bg-gradient-to-r from-[#5F85DB] to-[#7B68EE] rounded-lg flex items-center justify-center">
                      <Wand2 className="w-5 h-5 text-[#FAF7F0]" />
                    </div>
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
                      className="bg-[#26282B]/30 border-[#26282B]/50 text-[#FAF7F0] placeholder:text-[#FAF7F0]/40 min-h-[120px] focus:border-[#5F85DB]/50"
                      maxLength={500}
                    />
                    <p className="text-sm text-[#FAF7F0]/60 mt-1">{description.length}/500 characters</p>
                  </div>

                  <div>
                    <Label className="text-[#FAF7F0]/80 mb-3 block">Quick suggestions</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => setDescription(suggestion.text)}
                          className={`bg-gradient-to-r ${suggestion.color} bg-opacity-10 border-transparent text-[#FAF7F0]/80 hover:bg-opacity-20 text-xs`}
                        >
                          {suggestion.text}
                        </Button>
                      ))}
                    </div>
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
                      className="bg-[#26282B]/30 border-[#26282B]/50 text-[#FAF7F0] placeholder:text-[#FAF7F0]/40 focus:border-[#5F85DB]/50"
                    />
                    <p className="text-sm text-[#FAF7F0]/60 mt-1">Will be saved as .wav format</p>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={!description.trim() || isGenerating}
                    className="w-full bg-gradient-to-r from-[#5F85DB] to-[#7B68EE] hover:from-[#5F85DB]/90 hover:to-[#7B68EE]/90 shadow-lg shadow-[#5F85DB]/25"
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
                        <Zap className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#FAF7F0] flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-lg flex items-center justify-center">
                      <Music2 className="w-5 h-5 text-[#FAF7F0]" />
                    </div>
                    Generated Track
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isGenerating ? (
                    <div className="text-center py-12">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-16 h-16 border-4 border-[#5F85DB]/30 border-t-[#5F85DB] rounded-full mx-auto mb-4"
                      />
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-[#FFD93D]" />
                        <p className="text-[#FAF7F0]/80 font-medium">Creating your music...</p>
                      </div>
                      <p className="text-[#FAF7F0]/60 text-sm">This may take a few moments</p>
                    </div>
                  ) : generatedTrack ? (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-[#26282B]/50 to-[#26282B]/30 rounded-lg p-6 border border-[#5F85DB]/20">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] rounded-xl flex items-center justify-center">
                            <Music2 className="w-8 h-8 text-[#FAF7F0]" />
                          </div>
                          <div>
                            <p className="text-[#FAF7F0] font-medium text-lg">{generatedTrack.title}</p>
                            <p className="text-[#FAF7F0]/60 text-sm">{duration[0]} seconds • High Quality</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <audio controls className="w-full">
                            <source src={generatedTrack.audioUrl} type="audio/wav" />
                            Your browser does not support the audio element.
                          </audio>
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] hover:opacity-90"
                            asChild
                          >
                            <a href={generatedTrack.audioUrl} download={generatedTrack.fileName}>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#26282B]/50 to-[#26282B]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Music2 className="w-8 h-8 text-[#FAF7F0]/40" />
                      </div>
                      <p className="text-[#FAF7F0]/60 mb-2">Your generated music will appear here</p>
                      <p className="text-[#FAF7F0]/40 text-sm">Start by describing your musical idea above</p>
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