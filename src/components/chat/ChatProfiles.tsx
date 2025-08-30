"use client";

import avatarsData from "@/data/avatar_data.json";
import { ChatProfilesProps } from "@/types";

export default function ChatProfiles({ activeChat, onSelectChat }: ChatProfilesProps) {
  return (
    <div className="p-2 sm:p-4 flex flex-col gap-2 h-full">
      <h2 className="text-base sm:text-lg font-semibold pb-2 border-b border-gray-400 text-[#00a67e]">
        Chats
      </h2>

      <div className="flex flex-col gap-1 overflow-y-auto">
        {avatarsData.avatars.map((user) => {
          const isActive = activeChat === user.chat_key;
          return (
            <button
              key={user.user_id}
              onClick={() => onSelectChat(user.chat_key)}
              className={`flex items-center gap-3 p-2 rounded-lg text-left transition-colors w-full
                ${
                  isActive
                    ? "bg-gray-300 dark:bg-gray-700 shadow-[0_0_6px_1px_#00a67e]"
                    : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }
              `}
            >
              <img
                src={user.user_avatar}
                alt={user.user_name}
                className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full"
              />
              <span className="font-medium text-sm sm:text-base truncate">
                {user.user_name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
