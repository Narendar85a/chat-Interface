"use client";

import { useState } from "react";
import ChatProfiles from "@/components/chat/ChatProfiles";
import ChatWindow from "@/components/chat/profileChats/ChatWindow";
import CoderChat from "@/components/chat/profileChats/CoderChat";
import Friend1Chat from "@/components/chat/profileChats/Friend1Chat";
import Friend2Chat from "@/components/chat/profileChats/Friend2Chat";
import avatarsData from "@/data/avatar_data.json";

export default function Chat() {
  const [activeChat, setActiveChat] = useState(avatarsData.avatars[0]); 

  const renderActiveChat = () => {
    if (activeChat.chat_key === "tour-guide") {
      return <ChatWindow activeUser={activeChat} />;
    } else if (activeChat.chat_key === "coder") {
      return <CoderChat activeUser={activeChat} />;
    } else if (activeChat.chat_key === "friend1") {
      return <Friend1Chat activeUser={activeChat} />;
    } else if (activeChat.chat_key === "friend2") {
      return <Friend2Chat activeUser={activeChat} />;
    } else {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a chat to start messaging
        </div>
      );
    }
  };

  return (
    <div className="flex h-[calc(100vh-3rem)]">
      {/* Sidebar */}
      <div className="w-1/4 border-r">
        <ChatProfiles
          activeChat={activeChat.chat_key}
          onSelectChat={(chatId) => {
            const user = avatarsData.avatars.find((u) => u.chat_key === chatId);
            if (user) setActiveChat(user);
          }}
        />
      </div>

      {/* Active Chat */}
      <div className="flex-1">{renderActiveChat()}</div>
    </div>
  );
}
