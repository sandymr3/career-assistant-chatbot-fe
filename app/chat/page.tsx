"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import { sendChatMessage, type ChatMessage as ChatMessageType } from "@/lib/api"
import { ChatMessage } from "@/components/chat-message"
import { ChatInput } from "@/components/chat-input"
import { ProfileDisplay } from "@/components/profile-display"
import { Navbar } from "@/components/navbar"

export default function ChatPage() {
  const { email, profile, setProfile } = useUser()
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!email || !profile) {
      router.push("/")
    }
  }, [email, profile, router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (message: string) => {
    if (!email) return

    setIsLoading(true)
    const newUserMessage: ChatMessageType = {
      role: "user",
      message,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newUserMessage])

    try {
      const response = await sendChatMessage(email, message)

      const newAssistantMessage: ChatMessageType = {
        role: "assistant",
        message: response.response,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, newAssistantMessage])
      // console.log(JSON.stringify(response, null, 2))
      if (response.profile) {
        setProfile(response.profile)
      }
    } catch (error) {
      console.error("Error sending message:", error)

      const errorMessage: ChatMessageType = {
        role: "assistant",
        message: "Sorry, there was an error processing your request. Please try again.",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  if (!email || !profile) {
    return null
  }

  return (
    <>
      <Navbar />
      <div className="container grid h-[calc(100vh-3.5rem)] grid-cols-1 md:grid-cols-4">
        <div className="hidden border-r p-4 md:col-span-1 md:block">
          <ProfileDisplay profile={profile} />
        </div>
        <div className="flex flex-col md:col-span-3">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center">
                <p className="text-center text-muted-foreground">Start a conversation with your career assistant</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <ChatMessage key={index} message={msg.message} isUser={msg.role === "user"} timestamp={msg.timestamp} />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </>
  )
}
