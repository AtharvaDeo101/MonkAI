"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Music, Home, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/80 backdrop-blur-md border-b border-[#26282B]"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#5F85DB] to-[#5F85DB] rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-[#FAF7F0]" />
            </div>
            <span className="text-xl font-bold text-[#FAF7F0]">MusicAI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-[#FAF7F0]/60 hover:text-[#FAF7F0] transition-colors">
              <Home className="w-5 h-5" />
            </Link>
            <Link href="/dashboard" className="text-[#FAF7F0]/60 hover:text-[#FAF7F0] transition-colors">
              Dashboard
            </Link>
            <Link href="/generate" className="text-[#FAF7F0]/60 hover:text-[#FAF7F0] transition-colors">
              Generate
            </Link>
            <Link href="/tracks" className="text-[#FAF7F0]/60 hover:text-[#FAF7F0] transition-colors">
              Tracks
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-[#FAF7F0]/60 hover:text-[#FAF7F0]">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#5F85DB] to-[#5F85DB] hover:from-[#5F85DB]/90 hover:to-[#5F85DB]/90"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
