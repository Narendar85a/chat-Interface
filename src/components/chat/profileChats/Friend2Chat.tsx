"use client";

import { useRef, useEffect, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import messagesData from "@/data/mock_conversation_data.json";
import ChatHeader from "../ChatHeader";
import ChatInput from "../ChatInput";
import {FlatMessage, ChatWindowProps} from "@/types"


export default function Friend2Chat({ activeUser }: ChatWindowProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  // 📌 Flatten user_message + ai_response into a single array
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

  // 📌 Virtualizer
  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80, // average message height
    overscan: 5,
  });

  // 📌 Scroll to bottom when messages update
  useEffect(() => {
    if (messages.length > 0) {
      rowVirtualizer.scrollToIndex(messages.length - 1, { align: "end" });
    }
  }, [messages.length]);

  return (
    <div className="flex flex-col h-[calc(100vh-3rem)] w-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex-shrink-0 border-b">
        <ChatHeader userName={activeUser.user_name} avatar={activeUser.user_avatar}/>
      </div>

      {/* Messages */}
      <div ref={parentRef} className="flex-1 overflow-auto">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const msg = messages[virtualRow.index];
            const isUser = msg.sender === "user";

            return (
              <div
                key={msg.id}
                ref={virtualRow.measureElement} // allow dynamic height measuring
                className="absolute left-0 right-0 px-3 py-2"
                style={{ transform: `translateY(${virtualRow.start}px)` }}
              >
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
          })}
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t">
        <ChatInput />
      </div>
    </div>
  );
}
