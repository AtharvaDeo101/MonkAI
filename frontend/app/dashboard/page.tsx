"use client"

import { motion } from "framer-motion"
import { Play, Pause, Music, TrendingUp, Sparkles, Zap, Wand2, Library, Heart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Header from "@/components/layout/header"
import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { collection, query, orderBy, limit, getDocs, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

const DashboardSlideshow = dynamic(() => import("@/components/dashboard-slideshow"), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-[#26282B]/50 rounded animate-pulse" />,
})

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

export default function Dashboard() {
  const { user, userData, loading, refreshUserData } = useAuth()
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)
  const [recentTracks, setRecentTracks] = useState<any[]>([])
  const [popularGenres, setPopularGenres] = useState<any[]>([])
  const router = useRouter()
  const audioRef = useRef<HTMLAudioElement>(null)

  // Fetch popular genres from API
  useEffect(() => {
    const fetchPopularGenres = async () => {
      try {
        const response = await fetch("/api/genres");
        const data = await response.json();
        if (response.ok) {
          setPopularGenres(data);
        } else {
          console.error("Error fetching genres:", data.error);
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchPopularGenres();
  }, []);

  // Record play event in Firestore
  const recordPlay = async (track: any) => {
    if (user) {
      try {
        await addDoc(collection(db, `users/${user.uid}/plays`), {
          trackId: track.id,
          title: track.title,
          artist: track.artist || "Unknown Artist",
          cover: track.cover,
          duration: track.duration,
          color: track.color,
          audioUrl: track.audioUrl,
          timestamp: serverTimestamp(),
        })
      } catch (error) {
        console.error("Error recording play:", error)
      }
    }
  }

  // Handle play/pause for tracks
  const handlePlay = (trackId: string, audioUrl: string, track: any) => {
    if (playingTrack === trackId) {
      audioRef.current?.pause()
      setPlayingTrack(null)
    } else {
      if (audioRef.current) {
        audioRef.current.src = audioUrl
        audioRef.current.play().catch((err) => console.error("Playback error:", err))
      }
      setPlayingTrack(trackId)
      recordPlay(track) // Record the play event
    }
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchRecentPlays = async () => {
      if (user) {
        try {
          const q = query(
            collection(db, `users/${user.uid}/plays`),
            orderBy("timestamp", "desc"),
            limit(3)
          )
          const snapshot = await getDocs(q)
          const plays = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          setRecentTracks(plays)
        } catch (error) {
          console.error("Error fetching recent plays:", error)
        }
      }
    }

    if (user) {
      fetchRecentPlays()
    }
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="w-64 h-8 bg-[#26282B]/50 rounded animate-pulse" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      <audio ref={audioRef} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#5F85DB]/[0.08] via-[#FF6B6B]/[0.05] to-[#4ECDC4]/[0.08] blur-3xl" />

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={400}
          height={100}
          rotate={12}
          gradient="from-[#5F85DB]/[0.15]"
          className="left-[-5%] top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={300}
          height={80}
          rotate={-15}
          gradient="from-[#FF6B6B]/[0.12]"
          className="right-[-5%] top-[60%]"
        />
        <ElegantShape
          delay={0.4}
          width={200}
          height={60}
          rotate={-8}
          gradient="from-[#4ECDC4]/[0.10]"
          className="left-[10%] bottom-[15%]"
        />
        <ElegantShape
          delay={0.6}
          width={150}
          height={50}
          rotate={25}
          gradient="from-[#FFD93D]/[0.12]"
          className="right-[15%] top-[10%]"
        />
      </div>

      <Header />

      <div className="relative z-10 pt-20 px-4 pb-8">
        <div className="container mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#5F85DB]/10 to-[#FF6B6B]/10 border border-[#5F85DB]/20 mb-4">
              <Sparkles className="w-5 h-5 text-[#FFD93D]" />
              <span className="text-sm text-[#FAF7F0]/80 tracking-wide">
                Welcome to MonkAI 
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FAF7F0] via-[#5F85DB] to-[#FF6B6B] mb-2">
              {userData?.name || "User"}'s Creative Dashboard 
            </h1>
          </motion.div>

          {/* Slideshow Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <DashboardSlideshow />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Tracks */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#FAF7F0] flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#5F85DB] to-[#7B68EE] rounded-lg flex items-center justify-center">
                      <Music className="w-5 h-5 text-[#FAF7F0]" />
                    </div>
                    Recent Listens
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentTracks.length === 0 ? (
                    <p className="text-[#FAF7F0]/60 text-center">No recent listens yet</p>
                  ) : (
                    recentTracks.map((track: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 rounded-lg bg-[#26282B]/30 hover:bg-[#26282B]/50 transition-colors group"
                      >
                        <div className="relative">
                          <img
                            src={track.cover || "/placeholder.svg"}
                            alt={track.title}
                            className="w-12 h-12 rounded-lg"
                          />
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${track.color} opacity-20 rounded-lg group-hover:opacity-40 transition-opacity`}
                          ></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-[#FAF7F0] font-medium">{track.title}</p>
                          <p className="text-[#FAF7F0]/60 text-sm">{track.artist || "Unknown Artist"}</p>
                          <p className="text-[#FAF7F0]/60 text-sm">{track.duration}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handlePlay(track.id, track.audioUrl, track)}
                          className={`bg-gradient-to-r ${track.color} hover:opacity-90`}
                        >
                          {playingTrack === track.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Popular Genres */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#FAF7F0] flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-[#FAF7F0]" />
                    </div>
                    Popular Genres
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {popularGenres.length === 0 ? (
                    <p className="text-[#FAF7F0]/60 text-center">Loading genres...</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {popularGenres.map((genre, index) => (
                        <motion.div
                          key={genre.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                          className="text-center p-4 rounded-lg bg-[#26282B]/30 hover:bg-[#26282B]/50 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="relative mb-3">
                            <img
                              src={genre.image || "/placeholder.svg"}
                              alt={genre.name}
                              className="w-16 h-16 rounded-lg mx-auto"
                            />
                            <div
                              className={`absolute inset-0 bg-gradient-to-r ${genre.color} opacity-20 rounded-lg group-hover:opacity-40 transition-opacity`}
                            ></div>
                          </div>
                          <p className="text-[#FAF7F0] font-medium text-sm">{genre.name}</p>
                          <p className="text-[#FAF7F0]/60 text-xs">{genre.tracks} tracks</p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8"
          >
            <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#FAF7F0] flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#5F85DB] to-[#7B68EE] rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#FAF7F0]" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Generate Music",
                      description: "Create new tracks",
                      icon: Wand2,
                      color: "from-[#5F85DB] to-[#7B68EE]",
                      href: "/generate",
                    },
                    {
                      title: "Browse Library",
                      description: "Explore tracks",
                      icon: Library,
                      color: "from-[#4ECDC4] to-[#44A08D]",
                      href: "/tracks",
                    },
                    {
                      title: "My Favorites",
                      description: "Saved tracks",
                      icon: Heart,
                      color: "from-[#FF6B6B] to-[#FF8E53]",
                      href: "/favorites",
                    },
                  ].map((action, index) => (
                    <Link key={action.title} href={action.href}>
                      <Card className="bg-[#26282B]/30 border-[#26282B]/50 backdrop-blur-sm hover:bg-[#26282B]/50 transition-all duration-300 cursor-pointer group h-full">
                        <CardContent className="p-4 text-center">
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                          >
                            <action.icon className="w-6 h-6 text-[#FAF7F0]" />
                          </div>
                          <h3 className="text-[#FAF7F0] font-medium text-sm mb-1">{action.title}</h3>
                          <p className="text-[#FAF7F0]/60 text-xs">{action.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Music Creation Tips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-8"
          >
            <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#FAF7F0] flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#FAF7F0]" />
                  </div>
                  Music Creation Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Be Specific with Descriptions",
                      tip: "Instead of 'happy music', try 'upbeat pop song with guitar and drums, perfect for a summer commercial'",
                      icon: "💡",
                    },
                    {
                      title: "Experiment with Genres",
                      tip: "Mix different styles like 'jazz-electronic fusion' or 'ambient rock' for unique results",
                      icon: "🎵",
                    },
                    {
                      title: "Consider Your Use Case",
                      tip: "Mention if it's for background music, intro/outro, or main content to get better results",
                      icon: "🎯",
                    },
                    {
                      title: "Use Mood Keywords",
                      tip: "Include emotional descriptors like 'energetic', 'melancholic', 'mysterious', or 'triumphant'",
                      icon: "🎭",
                    },
                  ].map((tip, index) => (
                    <div key={index} className="p-4 rounded-lg bg-[#26282B]/30 border border-[#26282B]/50">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{tip.icon}</span>
                        <div>
                          <h4 className="text-[#FAF7F0] font-medium mb-2">{tip.title}</h4>
                          <p className="text-[#FAF7F0]/70 text-sm leading-relaxed">{tip.tip}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}