import Link from "next/link"
import { Home, MessageCircle } from "lucide-react"

export default function Navbar() {
  return (
    <div className="w-[10%] min-h-screen bg-gray-100 dark:bg-gray-900 border-r p-4 flex flex-col gap-6 mt-12">
      <Link href="/" className="flex items-center gap-2 hover:text-blue-500">
        <Home className="w-5 h-5" />
        <span>Home</span>
      </Link>

      <Link href="/chat" className="flex items-center gap-2 hover:text-blue-500">
        <MessageCircle className="w-5 h-5" />
        <span>Chat</span>
      </Link>
    </div>
  )
}
