"use client";

import Link from "next/link";
import { Home, MessageCircle, Image } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `flex items-center justify-start gap-1.5 px-3 py-2 rounded-md transition-colors 
     ${
       pathname === path
         ? "text-[#00a67e]"
         : "text-gray-800 dark:text-gray-200 hover:text-[#00a67e]"
     }`;

  return (
    <>
      <div className="hidden md:flex fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64 bg-gray-100 dark:bg-gray-900 border-r p-4 flex-col gap-3">
        <Link href="/" className={linkClasses("/")}>
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link href="/wallposter" className={linkClasses("/wallposter")}>
          <Image className="w-5 h-5" />
          <span>Wallposter</span>
        </Link>

        <Link href="/chat" className={linkClasses("/chat")}>
          <MessageCircle className="w-5 h-5" />
          <span>Chat</span>
        </Link>
      </div>
    </>
  );
}
