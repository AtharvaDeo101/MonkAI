"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, LogIn, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export default function Header() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Failed to logout:", error)
    }
  }

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
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/images/monkai-logo.png" alt="MonkAI Logo" className="w-10 h-10" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FAF7F0] to-[#5F85DB]">
              MonkAI
            </span>
          </Link>

          {user && !loading && (
            <nav className="flex justify-center items-center gap-8">
              <Link href="/" className="text-[#FAF7F0]/60 hover:text-[#5F85DB] transition-colors flex items-center gap-2">
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <Link href="/dashboard" className="text-[#FAF7F0]/60 hover:text-[#FF6B6B] transition-colors">
                Dashboard
              </Link>
              <Link href="/generate" className="text-[#FAF7F0]/60 hover:text-[#4ECDC4] transition-colors">
                Generate
              </Link>
              <Link href="/tracks" className="text-[#FAF7F0]/60 hover:text-[#FFD93D] transition-colors">
                Tracks
              </Link>
            </nav>
          )}

          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-20 h-8 bg-[#26282B]/50 rounded animate-pulse" />
            ) : user ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-[#FAF7F0]/60 hover:text-[#FF6B6B] hover:bg-[#FF6B6B]/10"
                aria-label="Log out"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#FAF7F0]/60 hover:text-[#5F85DB] hover:bg-[#5F85DB]/10"
                    aria-label="Log in"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-[#5F85DB] to-[#7B68EE] hover:from-[#5F85DB]/90 hover:to-[#7B68EE]/90 shadow-lg shadow-[#5F85DB]/25"
                    aria-label="Sign up"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}
