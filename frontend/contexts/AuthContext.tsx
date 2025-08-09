// contexts/AuthContext.tsx
"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { User, onAuthStateChanged, signOut } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

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

  const fetchUserData = async (user: User) => {
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid))
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData)
      } else {
        // Fallback user data if document doesn't exist
        setUserData({
          name: user.displayName || user.email?.split('@')[0] || "User",
          email: user.email || "",
          photoURL: user.photoURL || "",
          tracksGenerated: 0,
          totalPlays: 0,
          hoursCreated: 0,
          favorites: []
        })
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      // Fallback to basic user data
      setUserData({
        name: user.displayName || user.email?.split('@')[0] || "User",
        email: user.email || "",
        photoURL: user.photoURL || "",
        tracksGenerated: 0,
        totalPlays: 0,
        hoursCreated: 0,
        favorites: []
      })
    }
  }

  const refreshUserData = async () => {
    if (user) {
      await fetchUserData(user)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      if (user) {
        await fetchUserData(user)
      } else {
        setUserData(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const logout = async () => {
    try {
      await signOut(auth)
      setUserData(null)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const value = {
    user,
    userData,
    loading,
    logout,
    refreshUserData,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}