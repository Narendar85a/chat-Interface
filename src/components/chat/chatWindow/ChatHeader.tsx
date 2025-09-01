"use client";
import { ChatHeaderProps } from "@/types";

export default function ChatHeader({
  userName,
  avatar,
  onBack, // optional callback for mobile
}: ChatHeaderProps & { onBack?: () => void }) {
  return (
    <div className="flex items-center gap-3 p-3 border-b shadow-sm bg-gray-100 dark:bg-gray-800">
      {/* Back arrow for mobile */}
      {onBack && (
        <button
          onClick={onBack}
          className="md:hidden p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800 dark:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      <img
        src={avatar}
        alt={userName}
        className="w-10 h-10 rounded-full object-cover"
      />
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
        {userName}
      </h2>
    </div>
  );
}
