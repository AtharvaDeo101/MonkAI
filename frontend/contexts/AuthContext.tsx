"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { User, onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface UserData {
  name: string
  email: string
  photoURL?: string
  tracksGenerated: number
  totalPlays: number
  hoursCreated: number
  favorites: string[]
  createdAt: string
  lastLoginAt?: string
  provider?: string
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

      // Check Firestore for user profile
      const userDoc = await getDoc(doc(db, "users", user.uid))
      let data: UserData

      if (userDoc.exists()) {
        data = userDoc.data() as UserData
      } else {
        // Create a new profile if it doesn't exist
        data = {
          name: user.displayName || user.email?.split('@')[0] || "User",
          email: user.email || "",
          photoURL: user.photoURL || "",
          tracksGenerated: 0,
          totalPlays: 0,
          hoursCreated: 0,
          favorites: [],
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          provider: user.providerData[0]?.providerId || "email",
        }
        await setDoc(doc(db, "users", user.uid), data)
      }

      // Update lastLoginAt
      await setDoc(doc(db, "users", user.uid), { lastLoginAt: new Date().toISOString() }, { merge: true })

      setUserData(data)
      localStorage.setItem(`userData_${user.uid}`, JSON.stringify(data))
    } catch (error) {
      console.error("Error fetching/creating user data:", error)
      const fallbackData: UserData = {
        name: user.displayName || user.email?.split('@')[0] || "User",
        email: user.email || "",
        photoURL: user.photoURL || "",
        tracksGenerated: 0,
        totalPlays: 0,
        hoursCreated: 0,
        favorites: [],
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        provider: user.providerData[0]?.providerId || "email",
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
        localStorage.clear()
      }
    })

    return () => unsubscribe()
  }, [fetchUserData])

  const logout = async () => {
    try {
      await signOut(auth)
      setUserData(null)
      localStorage.clear()
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