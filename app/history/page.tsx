"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import { getChatHistory, deleteChatHistory, type ChatMessage as ChatMessageType } from "@/lib/api"
import { ChatMessage } from "@/components/chat-message"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TrashIcon } from "lucide-react"

export default function HistoryPage() {
  const { email } = useUser()
  const router = useRouter()
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!email) {
      router.push("/")
      return
    }

    const fetchChatHistory = async () => {
      setIsLoading(true)
      try {
        const history = await getChatHistory(email)
        setChatHistory(history)
      } catch (err) {
        console.error(err)
        setError("Failed to load chat history")
      } finally {
        setIsLoading(false)
      }
    }

    fetchChatHistory()
  }, [email, router])

  const handleDeleteHistory = async () => {
    if (!email) return

    try {
      await deleteChatHistory(email)
      setChatHistory([])
    } catch (err) {
      console.error(err)
      setError("Failed to delete chat history")
    }
  }

  if (!email) {
    return null
  }

  return (
    <>
      <Navbar />
      <div className="container py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Chat History</h1>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={chatHistory.length === 0}>
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete History
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your entire chat history.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteHistory}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <p>Loading chat history...</p>
          </div>
        ) : error ? (
          <div className="flex h-64 items-center justify-center">
            <p className="text-destructive">{error}</p>
          </div>
        ) : chatHistory.length === 0 ? (
          <div className="flex h-64 items-center justify-center">
            <p className="text-muted-foreground">No chat history found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {chatHistory.map((msg, index) => (
              <ChatMessage key={index} message={msg.message} isUser={msg.role === "user"} timestamp={msg.timestamp} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
