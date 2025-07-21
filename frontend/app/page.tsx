"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import Link from "next/link"
import { Music, Wand2, Library, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/layout/header"
import { cn } from "@/lib/utils"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
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

export default function LandingPage() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  const features = [
    {
      icon: Wand2,
      title: "AI Music Generation",
      description: "Transform text descriptions into unique musical compositions",
    },
    {
      icon: Library,
      title: "Copyright-Free Tracks",
      description: "Access thousands of royalty-free music tracks",
    },
    {
      icon: Download,
      title: "High-Quality Export",
      description: "Download your creations in WAV format",
    },
  ]

  return (
    <div className="min-h-screen bg-[#000000]">
      <Header />

      {/* Hero Section */}
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5F85DB]/[0.05] via-transparent to-[#5F85DB]/[0.08] blur-3xl" />

        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-[#5F85DB]/[0.15]"
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          />
          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-[#5F85DB]/[0.12]"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          />
          <ElegantShape
            delay={0.4}
            width={300}
            height={80}
            rotate={-8}
            gradient="from-[#5F85DB]/[0.10]"
            className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8"
            >
              <Music className="w-5 h-5 text-[#5F85DB]" />
              <span className="text-sm text-[#FAF7F0]/60 tracking-wide">AI-Powered Music Creation</span>
            </motion.div>

            <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#FAF7F0] to-[#FAF7F0]/80">
                  Create Music with
                </span>
                <br />
                <span
                  className={cn(
                    "bg-clip-text text-transparent bg-gradient-to-r from-[#5F85DB] via-[#FAF7F0]/90 to-[#5F85DB]",
                    pacifico.className,
                  )}
                >
                  AI Magic
                </span>
              </h1>
            </motion.div>

            <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
              <p className="text-lg md:text-xl text-[#FAF7F0]/40 mb-8 leading-relaxed max-w-2xl mx-auto">
                Transform your ideas into beautiful music. Generate unique tracks from text descriptions and explore
                copyright-free music library.
              </p>
            </motion.div>

            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link href="/generate">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#5F85DB] to-[#5F85DB] hover:from-[#5F85DB]/90 hover:to-[#5F85DB]/90 px-8"
                >
                  <Wand2 className="w-5 h-5 mr-2" />
                  Start Creating
                </Button>
              </Link>
              <Link href="/tracks">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-[#FAF7F0] hover:bg-white/10 bg-transparent"
                >
                  <Library className="w-5 h-5 mr-2" />
                  Browse Tracks
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#FAF7F0] mb-4">Powerful Features</h2>
            <p className="text-[#FAF7F0]/60 text-lg max-w-2xl mx-auto">
              Everything you need to create, discover, and share amazing music
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm hover:bg-[#26282B]/70 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#5F85DB] to-[#5F85DB] rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-[#FAF7F0]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#FAF7F0] mb-2">{feature.title}</h3>
                    <p className="text-[#FAF7F0]/60">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
