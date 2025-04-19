"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ProfileSetupForm } from "@/components/profile-setup-form"
import { useUser } from "@/context/user-context"

export default function ProfileSetupPage() {
  const { email } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!email) {
      router.push("/")
    }
  }, [email, router])

  if (!email) {
    return null
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Set Up Your Profile</h1>
        <p className="text-muted-foreground">Tell us about your background so we can provide personalized advice</p>
      </div>
      <ProfileSetupForm />
    </main>
  )
}
