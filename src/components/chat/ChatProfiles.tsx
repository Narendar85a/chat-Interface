"use client";

import { Virtuoso } from "react-virtuoso";
import avatarsData from "@/data/avatar_data.json";
import { ChatProfilesProps } from "@/types";

export default function ChatProfiles({ activeChat, onSelectChat }: ChatProfilesProps) {
  return (
    <div className="p-2 sm:p-4 flex flex-col h-full gap-4">
      <h2 className="text-base sm:text-lg font-semibold pb-2 border-b border-gray-400 text-[#00a67e]">
        Chats
      </h2>

      <div className="flex-1">
        <Virtuoso
          data={avatarsData.avatars}
          className="h-full"
          itemContent={(index, user) => {
            const isActive = activeChat === user.chat_key;
            return (
              <button
                key={user.user_id}
                onClick={() => onSelectChat(user.chat_key)}
                className={`flex items-center gap-3 px-4 py-2 w-full text-left
                  ${
                    isActive
                      ? "bg-gray-300 dark:bg-gray-700 shadow-[0_2px_2px_0px_#00a67e]"
                      : "hover:bg-gray-200 dark:hover:bg-gray-800"
                  }
                `}
              >
                <img
                  src={user.user_avatar}
                  alt={user.user_name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
                />
                <span className="font-medium text-sm sm:text-base truncate">
                  {user.user_name}
                </span>
              </button>
            );
          }}
        />
      </div>
    </div>
  );
}
