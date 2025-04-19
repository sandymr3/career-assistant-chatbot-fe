"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Profile } from "@/lib/api"

interface UserContextType {
  email: string
  setEmail: (email: string) => void
  profile: Profile | null
  setProfile: (profile: Profile) => void
  isAuthenticated: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string>("")
  const [profile, setProfile] = useState<Profile | null>(null)

  const isAuthenticated = !!email

  return (
    <UserContext.Provider
      value={{
        email,
        setEmail,
        profile,
        setProfile,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
