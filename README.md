# Career Assistant Chatbot

A Next.js application that connects to a FastAPI backend to provide personalized career advice for tech professionals.

## Features

- Welcome page with email-based authentication
- Profile setup for new users
- Interactive chat interface with AI-powered responses
- Chat history management
- Responsive design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- FastAPI backend running (see backend repository)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/career-assistant-chatbot.git
cd career-assistant-chatbot
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a `.env.local` file based on the provided `.env.example`:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update the `NEXT_PUBLIC_API_URL` in `.env.local` to point to your FastAPI backend.

### Running the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js App Router pages
- `components/` - Reusable UI components
- `context/` - React context for state management
- `lib/` - Utility functions and API client

## Deployment

This project can be easily deployed on Vercel:

\`\`\`bash
npm run build
\`\`\`

For more information, see the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
