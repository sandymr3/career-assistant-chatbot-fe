import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"

interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp?: string
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={cn("flex w-full gap-2 p-4", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-2 rounded-lg p-4",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
        )}
      >
        <p className="text-sm">{message}</p>
        {timestamp && <p className="text-xs opacity-70">{format(new Date(timestamp), "h:mm a")}</p>}
      </div>
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
