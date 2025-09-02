"use client";

import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `flex items-center justify-center md:justify-start gap-1.5 px-3 py-2 rounded-md transition-colors 
     ${pathname === path 
        ? "text-[#00a67e]" 
        : "text-gray-800 dark:text-gray-200 hover:text-[#00a67e]"}`;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-100% min-h-screen bg-gray-100 dark:bg-gray-900 border-r p-4 flex-col gap-3 mt-auto">
        <Link href="/" className={linkClasses("/")}>
          <Home className="w-5 h-5" />
          <span className="hidden md:inline">Home</span>
        </Link>

        <Link href="/chat" className={linkClasses("/chat")}>
          <MessageCircle className="w-5 h-5" />
          <span className="hidden md:inline">Chat</span>
        </Link>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-100 dark:bg-gray-900 border-t flex justify-around py-2 z-50">
        <Link href="/" className={linkClasses("/")}>
          <Home className="w-6 h-6" />
        </Link>

        <Link href="/chat" className={linkClasses("/chat")}>
          <MessageCircle className="w-6 h-6" />
        </Link>
      </div>
    </>
  );
}
