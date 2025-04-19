const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://career-assistant-chatbot-fe.vercel.app"

export interface Profile {
  tech_stack: string[]
  background: string[]
}

export interface ChatMessage {
  role: "user" | "assistant"
  message: string
  timestamp: string
}

export async function checkProfile(email: string): Promise<{ exists: boolean; profile?: Profile }> {
  const response = await fetch(`${API_URL}/check-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
  if (!response.ok) {
    throw new Error("Failed to check profile")
  }
  return response.json()
}

export async function initializeProfile(
  email: string,
  domain: string,
  tech_stack: string,
): Promise<{ profile: Profile }> {
  const response = await fetch(`${API_URL}/initialize-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, domain, tech_stack }),
  })

  if (!response.ok) {
    throw new Error("Failed to initialize profile")
  }

  return response.json()
}

export async function sendChatMessage(email: string, message: string): Promise<{ response: string; profile: Profile }> {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, message }),
  })

  if (!response.ok) {
    throw new Error("Failed to send message")
  }

  return response.json()
}

export async function getChatHistory(email: string): Promise<ChatMessage[]> {

  const response = await fetch(`${API_URL}/chats/${email}`)
  if (!response.ok) {
    throw new Error("Failed to get chat history")
  }

  return response.json()
}

export async function deleteChatHistory(email: string): Promise<{ success: boolean }> {
  const response = await fetch(`${API_URL}/chats/${email}`, {method: "DELETE",})

  if (!response.ok) {
    throw new Error("Failed to delete chat history")
  }

  return response.json()
}
