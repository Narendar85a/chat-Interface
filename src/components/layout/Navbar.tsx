"use client";

import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `flex items-center gap-2 px-2 py-1 rounded-md transition-colors 
     ${pathname === path ? "text-[#80F2B0]" : "text-gray-800 dark:text-gray-200 hover:text-[#80F2B0]"}`;

  return (
    <div className="w-[10%] min-h-screen bg-gray-100 dark:bg-gray-900 border-r p-4 flex flex-col gap-3 mt-12">
      <Link href="/" className={linkClasses("/")}>
        <Home className="w-5 h-5" />
        <span>Home</span>
      </Link>

      <Link href="/chat" className={linkClasses("/chat")}>
        <MessageCircle className="w-5 h-5" />
        <span>Chat</span>
      </Link>
    </div>
  );
}
