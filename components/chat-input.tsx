"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SendIcon } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>
  isLoading: boolean
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    await onSendMessage(message)
    setMessage("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-end gap-2 border-t bg-background p-4">
      <Textarea
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-[60px] flex-1 resize-none"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
          }
        }}
      />
      <Button type="submit" size="icon" disabled={isLoading || !message.trim()}>
        <SendIcon className="h-4 w-4" />
      </Button>
    </form>
  )
}
