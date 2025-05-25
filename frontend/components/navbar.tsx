"use client"

import { Button } from "@/components/ui/button"
import { Music, Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import type React from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10 relative"
    >
      <Link href="/" className="flex items-center space-x-2">
        <Music className="w-8 h-8 text-purple-500" />
        <span className="text-white font-medium text-xl">MusicAI</span>
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/generate">Generate</NavLink>
        <NavLink href="/compose">Compose & Edit</NavLink>
        <NavLink href="/spotify">Spotify</NavLink>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <Button variant="ghost" className="text-white hover:text-purple-400">
          Sign In
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
      </div>

      <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-white/10 md:hidden"
        >
          <div className="flex flex-col space-y-4 px-6 py-4">
            <NavLink href="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink href="/generate" onClick={() => setIsMenuOpen(false)}>
              Generate
            </NavLink>
            <NavLink href="/compose" onClick={() => setIsMenuOpen(false)}>
              Compose & Edit
            </NavLink>
            <NavLink href="/spotify" onClick={() => setIsMenuOpen(false)}>
              Spotify
            </NavLink>
            <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
              <Button variant="ghost" className="text-white hover:text-purple-400 justify-start">
                Sign In
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white justify-start">Get Started</Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <Link href={href} onClick={onClick} className="text-gray-300 hover:text-white transition-colors relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
    </Link>
  )
}
