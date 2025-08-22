"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "Create AI-Generated Music",
    description: "Unleash your creativity with our cutting-edge AI music tools",
    image: "/images/ai-music-generation.jpg",
    gradient: "from-[#5F85DB]/20 to-[#5F85DB]/30",
  },
  {
    id: 2,
    title: "Copyright-Free Music Library",
    description: "Access a vast collection of royalty-free tracks for your projects",
    image: "/images/copyright-free-music.jpg",
    gradient: "from-[#5F85DB]/15 to-[#5F85DB]/25",
  },
  {
    id: 3,
    title: "AI-Powered Soundscapes",
    description: "Generate unique, copyright-free soundscapes with AI precision",
    image: "/images/ai-soundscapes.jpg",
    gradient: "from-[#5F85DB]/10 to-[#5F85DB]/20",
  },
]

export default function DashboardSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-64 rounded-xl overflow-hidden bg-[#26282B]/50 border border-[#26282B] backdrop-blur-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].gradient}`} />
          <img
            src={slides[currentSlide].image || "/placeholder.svg"}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center text-center p-8">
            <div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-[#FAF7F0] mb-4"
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[#FAF7F0]/80 text-lg"
              >
                {slides[currentSlide].description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="sm"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FAF7F0]/60 hover:text-[#FAF7F0] hover:bg-[#26282B]/50"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#FAF7F0]/60 hover:text-[#FAF7F0] hover:bg-[#26282B]/50"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? "bg-[#FAF7F0]" : "bg-[#FAF7F0]/40"}`}
          />
        ))}
      </div>
    </div>
  )
}