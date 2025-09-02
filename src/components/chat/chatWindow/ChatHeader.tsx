"use client";
import { ChatHeaderProps } from "@/types";

export default function ChatHeader({ userName, avatar }: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-3 p-3 border-b shadow-sm bg-gray-100 dark:bg-gray-800">
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
