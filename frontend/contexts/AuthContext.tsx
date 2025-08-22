"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { User, onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface UserData {
  name?: string
  email?: string
  photoURL?: string
  tracksGenerated?: number
  totalPlays?: number
  hoursCreated?: number
  favorites?: string[]
}

interface AuthContextType {
  user: User | null
  userData: UserData | null
  loading: boolean
  logout: () => Promise<void>
  refreshUserData: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  logout: async () => {},
  refreshUserData: async () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUserData = useCallback(async (user: User) => {
    try {
      // Check localStorage first
      const cachedData = localStorage.getItem(`userData_${user.uid}`)
      if (cachedData) {
        setUserData(JSON.parse(cachedData))
        setLoading(false)
        return
      }

      // Use displayName from Firebase Auth if available
      if (user.displayName) {
        const data = {
          name: user.displayName,
          email: user.email || "",
          photoURL: user.photoURL || "",
          tracksGenerated: 0,
          totalPlays: 0,
          hoursCreated: 0,
          favorites: [],
        }
        setUserData(data)
        localStorage.setItem(`userData_${user.uid}`, JSON.stringify(data))
        setLoading(false)
        return
      }

      // Fallback to Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid))
      if (userDoc.exists()) {
        const data = userDoc.data() as UserData
        setUserData(data)
        localStorage.setItem(`userData_${user.uid}`, JSON.stringify(data))
      } else {
        const fallbackData = {
          name: user.email?.split('@')[0] || "User",
          email: user.email || "",
          photoURL: user.photoURL || "",
          tracksGenerated: 0,
          totalPlays: 0,
          hoursCreated: 0,
          favorites: [],
        }
        setUserData(fallbackData)
        localStorage.setItem(`userData_${user.uid}`, JSON.stringify(fallbackData))
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      const fallbackData = {
        name: user.displayName || user.email?.split('@')[0] || "User",
        email: user.email || "",
        photoURL: user.photoURL || "",
        tracksGenerated: 0,
        totalPlays: 0,
        hoursCreated: 0,
        favorites: [],
      }
      setUserData(fallbackData)
      localStorage.setItem(`userData_${user.uid}`, JSON.stringify(fallbackData))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      if (user) {
        fetchUserData(user)
      } else {
        setUserData(null)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [fetchUserData])

  const logout = async () => {
    try {
      await signOut(auth)
      setUserData(null)
      localStorage.clear() // Clear cached user data
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const refreshUserData = async () => {
    if (user) {
      localStorage.removeItem(`userData_${user.uid}`)
      await fetchUserData(user)
    }
  }

  const value = {
    user,
    userData,
    loading,
    logout,
    refreshUserData,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
