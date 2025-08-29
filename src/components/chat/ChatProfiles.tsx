"use client";

import avatarsData from "@/data/avatar_data.json";
import {ChatProfilesProps} from "@/types"

export default function ChatProfiles({ activeChat, onSelectChat }: ChatProfilesProps) {
  return (
    <div className="p-4 flex flex-col gap-2">
      <h2 className="text-lg font-semibold pb-1 border-b-2 border-gray-400 text-[#80F2B0]">Chats</h2>

      {avatarsData.avatars.map((user) => {
        const isActive = activeChat === user.chat_key;
        return (
          <button
            key={user.user_id}
            onClick={() => onSelectChat(user.chat_key)}
            className={`flex items-center gap-3 p-2 rounded-lg text-left transition-colors
              ${isActive ? "bg-gray-300 dark:bg-gray-700 shadow-[0_0_6px_1px_#80F2B0]" : "hover:bg-gray-200 dark:hover:bg-gray-800"}
            `}
          >
            <img
              src={user.user_avatar}
              alt={user.user_name}
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium">{user.user_name}</span>
          </button>
        );
      })}
    </div>
  );
}
