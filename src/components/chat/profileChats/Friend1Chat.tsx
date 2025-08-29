"use client";

import { Virtuoso } from "react-virtuoso";
import { useMemo, useRef, useEffect } from "react";
import messagesData from "@/data/mock_conversation_data.json";
import ChatHeader from "../ChatHeader";
import ChatInput from "../ChatInput";
import {FlatMessage, ChatWindowProps} from "@/types"

export default function Friend1Chat({ activeUser }: ChatWindowProps) {
  const virtuosoRef = useRef<Virtuoso>(null);

  // 📌 Flatten user_message + ai_response into a single list
  const messages: FlatMessage[] = useMemo(() => {
    const rows: FlatMessage[] = [];
    messagesData.messages.forEach((m: any, idx: number) => {
      if (m.user_message) {
        rows.push({ id: `${idx}-u`, sender: "user", text: m.user_message });
      }
      if (m.ai_response) {
        rows.push({ id: `${idx}-a`, sender: "ai", text: m.ai_response });
      }
    });
    return rows;
  }, []);

  // 📌 Auto-scroll to bottom when messages update
  useEffect(() => {
    if (virtuosoRef.current) {
      virtuosoRef.current.scrollToIndex({
        index: messages.length - 1,
        align: "end",
        behavior: "smooth",
      });
    }
  }, [messages.length]);

  return (
    <div className="flex flex-col h-[calc(100vh-3rem)] w-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex-shrink-0 border-b">
        <ChatHeader userName={activeUser.user_name} avatar={activeUser.user_avatar}/>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <Virtuoso
          ref={virtuosoRef}
          data={messages}
          overscan={200}
          itemContent={(index, msg) => {
            const isUser = msg.sender === "user";
            return (
              <div className="px-3 py-2">
                <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`px-4 py-2 rounded-2xl break-words whitespace-pre-wrap
                      max-w-[80%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%]
                      ${isUser
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-[0_0_8px_#EBDD63]"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-[0_0_8px_#80F2B0]"
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t">
        <ChatInput />
      </div>
    </div>
  );
}
