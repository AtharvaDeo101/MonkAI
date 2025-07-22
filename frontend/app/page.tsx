"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import Link from "next/link"
import {
  Music,
  Wand2,
  Library,
  Download,
  Zap,
  Shield,
  Play,
  ArrowRight,
  Twitter,
  Instagram,
  Youtube,
  Github,
} from "lucide-react"
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
      color: "from-[#5F85DB] to-[#7B68EE]",
    },
    {
      icon: Library,
      title: "Copyright-Free Tracks",
      description: "Access thousands of royalty-free music tracks",
      color: "from-[#FF6B6B] to-[#FF8E53]",
    },
    {
      icon: Download,
      title: "High-Quality Export",
      description: "Download your creations in WAV format",
      color: "from-[#4ECDC4] to-[#44A08D]",
    },
  ]

  const stats = [
    { number: "50K+", label: "Tracks Generated", color: "text-[#5F85DB]" },
    { number: "10K+", label: "Happy Users", color: "text-[#FF6B6B]" },
    { number: "99.9%", label: "Uptime", color: "text-[#4ECDC4]" },
    { number: "24/7", label: "Support", color: "text-[#FFD93D]" },
  ]

  return (
    <div className="min-h-screen bg-[#000000]">
      <Header />

      {/* Hero Section */}
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5F85DB]/[0.05] via-transparent to-[#FF6B6B]/[0.05] blur-3xl" />

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
            gradient="from-[#FF6B6B]/[0.12]"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          />
          <ElegantShape
            delay={0.4}
            width={300}
            height={80}
            rotate={-8}
            gradient="from-[#4ECDC4]/[0.10]"
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#5F85DB]/10 to-[#FF6B6B]/10 border border-[#5F85DB]/20 mb-8"
            >
              <Music className="w-5 h-5 text-[#5F85DB]" />
              <span className="text-sm text-[#FAF7F0]/80 tracking-wide">AI-Powered Music Creation</span>
              <div className="w-2 h-2 bg-[#4ECDC4] rounded-full animate-pulse"></div>
            </motion.div>

            <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#FAF7F0] to-[#FAF7F0]/80">
                  Create Music with
                </span>
                <br />
                <span
                  className={cn(
                    "bg-clip-text text-transparent bg-gradient-to-r from-[#5F85DB] via-[#FF6B6B] to-[#4ECDC4]",
                    pacifico.className,
                  )}
                >
                  AI Magic
                </span>
              </h1>
            </motion.div>

            <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
              <p className="text-lg md:text-xl text-[#FAF7F0]/60 mb-8 leading-relaxed max-w-2xl mx-auto">
                Transform your ideas into beautiful music. Generate unique tracks from text descriptions and explore our
                copyright-free music library with advanced AI technology.
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
                  className="bg-gradient-to-r from-[#5F85DB] to-[#7B68EE] hover:from-[#5F85DB]/90 hover:to-[#7B68EE]/90 px-8 shadow-lg shadow-[#5F85DB]/25"
                >
                  <Wand2 className="w-5 h-5 mr-2" />
                  Start Creating
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/tracks">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#FAF7F0]/20 text-[#FAF7F0] hover:bg-[#FAF7F0]/10 bg-transparent backdrop-blur-sm"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Listen to Demo
                </Button>
              </Link>
            </motion.div>

            {/* Hero Image */}
            <motion.div custom={4} variants={fadeUpVariants} initial="hidden" animate="visible" className="relative">
              <div className="relative mx-auto max-w-2xl">
                <img
                  src="/placeholder.svg?height=300&width=600&text=MusicAI+Dashboard+Preview"
                  alt="MusicAI Dashboard"
                  className="rounded-xl shadow-xl border border-[#26282B]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/30 to-transparent rounded-xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-20 px-4 bg-gradient-to-r from-[#26282B]/20 to-[#26282B]/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                <div className="text-[#FAF7F0]/60 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
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
              Everything you need to create, discover, and share amazing music with cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="bg-[#26282B]/50 border-[#26282B] backdrop-blur-sm hover:bg-[#26282B]/70 transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-8 h-8 text-[#FAF7F0]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#FAF7F0] mb-3">{feature.title}</h3>
                    <p className="text-[#FAF7F0]/60 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-6"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#FFD93D] to-[#FF6B6B] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-8 h-8 text-[#000000]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#FAF7F0] mb-2">Lightning Fast</h3>
                <p className="text-[#FAF7F0]/60">
                  Generate music in seconds, not hours. Our AI processes your requests instantly.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-6"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#4ECDC4] to-[#5F85DB] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-[#FAF7F0]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#FAF7F0] mb-2">100% Original</h3>
                <p className="text-[#FAF7F0]/60">
                  Every track is unique and copyright-free. Use them anywhere without worry.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 px-4 bg-gradient-to-r from-[#5F85DB]/10 via-[#FF6B6B]/5 to-[#4ECDC4]/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#FAF7F0] mb-6">Ready to Create Amazing Music?</h2>
            <p className="text-xl text-[#FAF7F0]/60 mb-8">
              Join thousands of creators and start generating unique, copyright-free music today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#5F85DB] to-[#7B68EE] hover:from-[#5F85DB]/90 hover:to-[#7B68EE]/90 px-8 shadow-lg shadow-[#5F85DB]/25"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/tracks">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#FAF7F0]/20 text-[#FAF7F0] hover:bg-[#FAF7F0]/10 bg-transparent"
                >
                  Explore Library
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-[#26282B]/30 border-t border-[#26282B]">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img src="/images/monkai-logo.png" alt="MonkAI Logo" className="w-10 h-10" />
                </div>
                <span className="text-2xl font-bold text-[#FAF7F0]">MonkAI</span>
              </Link>
              <p className="text-[#FAF7F0]/60 mb-6 leading-relaxed">
                Create amazing music with the power of AI. Transform your ideas into beautiful compositions with MonkAI.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-[#26282B]/50 rounded-lg flex items-center justify-center hover:bg-[#5F85DB]/20 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-[#FAF7F0]/60" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#26282B]/50 rounded-lg flex items-center justify-center hover:bg-[#FF6B6B]/20 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-[#FAF7F0]/60" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#26282B]/50 rounded-lg flex items-center justify-center hover:bg-[#4ECDC4]/20 transition-colors"
                >
                  <Youtube className="w-5 h-5 text-[#FAF7F0]/60" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#26282B]/50 rounded-lg flex items-center justify-center hover:bg-[#FFD93D]/20 transition-colors"
                >
                  <Github className="w-5 h-5 text-[#FAF7F0]/60" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-[#FAF7F0] font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/generate" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] transition-colors">
                    AI Generator
                  </Link>
                </li>
                <li>
                  <Link href="/tracks" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] transition-colors">
                    Music Library
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] transition-colors">
                    Mobile App
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-[#FAF7F0] font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-[#FAF7F0] font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] transition-colors">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#26282B] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#FAF7F0]/60 text-sm">© 2024 MonkAI. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
