"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Music, Wand2, Edit3, Share2, Download, Headphones } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Wand2 className="w-8 h-8 text-purple-500" />,
      title: "AI Music Generation",
      description:
        "Transform text descriptions into beautiful, original music compositions using advanced AI technology.",
    },
    {
      icon: <Edit3 className="w-8 h-8 text-blue-500" />,
      title: "Advanced Editing",
      description: "Professional audio editing tools including trim, cut, tempo adjustment, and pitch modification.",
    },
    {
      icon: <Music className="w-8 h-8 text-green-500" />,
      title: "Multiple Genres",
      description:
        "Generate music across various genres from classical to electronic, jazz to rock, and everything in between.",
    },
    {
      icon: <Headphones className="w-8 h-8 text-pink-500" />,
      title: "High-Quality Audio",
      description: "Professional-grade audio output with customizable duration, tempo, and audio quality settings.",
    },
    {
      icon: <Share2 className="w-8 h-8 text-orange-500" />,
      title: "Easy Sharing",
      description:
        "Share your creations instantly with friends, social media, or integrate directly with Spotify playlists.",
    },
    {
      icon: <Download className="w-8 h-8 text-cyan-500" />,
      title: "Export Options",
      description: "Download your music in various formats including MP3, WAV, and FLAC for any use case.",
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Powerful Features</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Everything you need to create, edit, and share amazing music with the power of artificial intelligence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
