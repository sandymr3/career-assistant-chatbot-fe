"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/user-context"
import { cn } from "@/lib/utils"
import { MessageSquareIcon, HistoryIcon, LogOutIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const pathname = usePathname()
  const { email, setEmail, setProfile } = useUser()

  const handleLogout = () => {
    setEmail("")
    setProfile(null)
  }

  if (!email) return null

  return (
    <nav className="border-b bg-background">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">Career Assistant</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center gap-4">
            <Link href="/chat">
              <Button
                variant={pathname === "/chat" ? "default" : "ghost"}
                size="sm"
                className={cn("gap-1", pathname === "/chat" ? "bg-primary" : "")}
              >
                <MessageSquareIcon className="h-4 w-4" />
                <span>Chat</span>
              </Button>
            </Link>
            <Link href="/history">
              <Button
                variant={pathname === "/history" ? "default" : "ghost"}
                size="sm"
                className={cn("gap-1", pathname === "/history" ? "bg-primary" : "")}
              >
                <HistoryIcon className="h-4 w-4" />
                <span>History</span>
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOutIcon className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
