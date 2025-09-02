"use client";

import { useState } from "react";
import ChatProfiles from "@/components/chat/ChatProfiles";
import ChatWindow from "@/components/chat/chatWindow/ChatWindow";
import avatarsData from "@/data/avatar_data.json";
import mockConversation from "@/data/mock_conversation_data.json";

// 🔹 Convert JSON messages into user + AI bubbles
const mapJsonMessages = (jsonMessages: any[]) => {
  let result: any[] = [];
  jsonMessages.forEach((m) => {
    if (m.user_message) {
      result.push({
        id: m.message_id + "_user",
        sender: "user",
        text: m.user_message,
        timestamp: new Date(m.timestamp).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: m.status,
      });
    }
    if (m.ai_response) {
      result.push({
        id: m.message_id + "_ai",
        sender: "ai",
        text: m.ai_response,
        timestamp: new Date(m.timestamp).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: m.status,
      });
    }
  });
  return result;
};

export default function Chat() {
  const initialMessages: Record<string, any[]> = {
    "tour-guide": mapJsonMessages(mockConversation.messages),
    coder: mapJsonMessages(mockConversation.messages),
    friend1: mapJsonMessages(mockConversation.messages),
    friend2: mapJsonMessages(mockConversation.messages),
  };

  const [activeChat, setActiveChat] = useState(avatarsData.avatars[0]);
  const [messagesByChat, setMessagesByChat] = useState(initialMessages);
  const [showProfiles, setShowProfiles] = useState(true); //  mobile toggle

  const handleSend = (chatKey: string, text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "delivered",
    };

    setMessagesByChat((prev) => ({
      ...prev,
      [chatKey]: [...(prev[chatKey] || []), newMessage],
    }));
  };

  return (
    <div className="flex h-[calc(100vh-3rem)]">
      {/* Desktop layout: sidebar + chat window */}
      <div className="hidden md:block w-1/4 border-r">
        <ChatProfiles
          activeChat={activeChat.chat_key}
          onSelectChat={(chatId) => {
            const user = avatarsData.avatars.find((u) => u.chat_key === chatId);
            if (user) setActiveChat(user);
          }}
        />
      </div>

      <div className="hidden md:flex flex-1 mt-au">
        <ChatWindow
          activeUser={activeChat}
          messages={messagesByChat[activeChat.chat_key] || []}
          onSend={(text) => handleSend(activeChat.chat_key, text)}
        />
      </div>

      {/* Mobile layout: toggle between profiles and chat */}
      <div className="md:hidden flex-1">
        {showProfiles ? (
          <ChatProfiles
            activeChat={activeChat.chat_key}
            onSelectChat={(chatId) => {
              const user = avatarsData.avatars.find((u) => u.chat_key === chatId);
              if (user) setActiveChat(user);
              setShowProfiles(false); // go to chat after selecting
            }}
          />
        ) : (
          <ChatWindow
            activeUser={activeChat}
            messages={messagesByChat[activeChat.chat_key] || []}
            onSend={(text) => handleSend(activeChat.chat_key, text)}
          />
        )}

        {/* Mobile toggle button */}
        <div className="fixed bottom-16 right-4 md:hidden">
          <button
            onClick={() => setShowProfiles((prev) => !prev)}
            className="px-4 py-2 rounded-full bg-[#00a67e] text-white shadow-lg"
          >
            {showProfiles ? "Go to Chat" : "Back to Chats"}
          </button>
        </div>
      </div>
    </div>
  );
}
