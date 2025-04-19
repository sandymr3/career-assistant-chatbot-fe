import { EmailForm } from "@/components/email-form"

export default function WelcomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold">Welcome to Career Assistant Chatbot</h1>
        <p className="text-lg text-muted-foreground">Your AI-powered guide to navigating tech career paths</p>
      </div>
      <div className="mb-8 max-w-md text-center">
        <p className="mb-4">This assistant helps you:</p>
        <ul className="space-y-2 text-left">
          <li className="flex items-center">
            <span className="mr-2 text-primary">•</span>
            Navigate tech career paths
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-primary">•</span>
            Choose and refine your tech stack
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-primary">•</span>
            Get tailored advice based on your background and goals
          </li>
        </ul>
      </div>
      <EmailForm />
    </main>
  )
}
