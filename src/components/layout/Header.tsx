"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, MessageCircle, Image, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { ToggleTheme } from "../theme/ToggleTheme";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition-colors 
     ${
       pathname === path
         ? "text-[#00a67e]"
         : "text-gray-800 dark:text-gray-200 hover:text-[#00a67e]"
     }`;

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full flex items-center justify-between 
                   px-4 sm:px-6 py-2 sm:py-3 
                   shadow-md bg-gray-50 dark:bg-gray-900 dark:shadow-lg z-50"
      >
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-700 dark:text-gray-200"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#00a67e] truncate">
            Chat Interface
          </h3>
        </div>

        <ToggleTheme />
      </header>

      {/* Mobile Navbar */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />

          <div className="absolute top-0 left-0 h-full w-64 bg-gray-100 dark:bg-gray-900 p-4 shadow-lg flex flex-col gap-3">
            <button
              className="self-end mb-4 p-2 text-gray-700 dark:text-gray-200"
              onClick={() => setMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            <Link href="/" className={linkClasses("/")} onClick={() => setMenuOpen(false)}>
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>

            <Link href="/wallposter" className={linkClasses("/wallposter")} onClick={() => setMenuOpen(false)}>
              <Image className="w-5 h-5" />
              <span>Wallposter</span>
            </Link>

            <Link href="/chat" className={linkClasses("/chat")} onClick={() => setMenuOpen(false)}>
              <MessageCircle className="w-5 h-5" />
              <span>Chat</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
