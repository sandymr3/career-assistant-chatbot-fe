"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { initializeProfile } from "@/lib/api"
import { useUser } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function ProfileSetupForm() {
  const [domain, setDomain] = useState("")
  const [techStack, setTechStack] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { email, setProfile } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await initializeProfile(email, domain, techStack)
      setProfile(result.profile)
      router.push("/chat")
    } catch (err) {
      setError("Failed to set up profile. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Set Up Your Profile</CardTitle>
        <CardDescription>Tell us about your background to get personalized career advice</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="domain">Your Domain</Label>
              <Input
                id="domain"
                placeholder="e.g., data science, web development"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                What field or industry are you working in or interested in?
              </p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tech-stack">Your Tech Stack</Label>
              <Textarea
                id="tech-stack"
                placeholder="e.g., Python, React, SQL"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                required
                className="min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">
                List the technologies, languages, and tools you're familiar with
              </p>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Setting Up..." : "Complete Setup"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
