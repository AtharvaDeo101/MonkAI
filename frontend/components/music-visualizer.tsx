"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface MusicVisualizerProps {
  isPlaying: boolean
  className?: string
}

export default function MusicVisualizer({ isPlaying, className = "" }: MusicVisualizerProps) {
  const [bars] = useState(Array.from({ length: 20 }, (_, i) => i))

  return (
    <div className={`flex items-end justify-center gap-1 h-8 ${className}`}>
      {bars.map((bar) => (
        <motion.div
          key={bar}
          className="bg-gradient-to-t from-[#5F85DB] to-[#5F85DB] w-1 rounded-full"
          animate={
            isPlaying
              ? {
                  height: [4, Math.random() * 24 + 8, Math.random() * 32 + 4, Math.random() * 16 + 8],
                }
              : { height: 4 }
          }
          transition={{
            duration: 0.5,
            repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
            delay: bar * 0.05,
          }}
        />
      ))}
    </div>
  )
}
