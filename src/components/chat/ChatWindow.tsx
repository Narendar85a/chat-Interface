"use client";

import { useEffect, useMemo, useRef, useCallback } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import messagesData from "@/data/mock_conversation_data.json";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

type FlatMessage = {
  id: string;
  sender: "user" | "ai";
  text: string;
};

export default function ChatWindow() {
  const listRef = useRef<List>(null);

  // 👉 Only map user_message + ai_response into flat list
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

  // 📌 Estimate row height from text length
  const getItemSize = useCallback(
    (index: number) => {
      const msg = messages[index];
      const base = 56;
      const estimated = base + Math.ceil(msg.text.length * 0.25);
      return Math.max(64, Math.min(estimated, 240)); // clamp
    },
    [messages]
  );

  // Stable key for react-window
  const itemKey = useCallback((index: number) => messages[index].id, [messages]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (listRef.current && messages.length > 0) {
      listRef.current.scrollToItem(messages.length - 1, "end");
    }
  }, [messages.length]);

  return (
    <div className="flex flex-col h-[calc(100vh-3rem)] w-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex-shrink-0 border-b">
        <ChatHeader />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={listRef}
              height={height}
              width={width}
              itemCount={messages.length}
              itemSize={getItemSize}
              itemKey={itemKey}
              overscanCount={6}
            >
              {({ index, style }) => {
                const msg = messages[index];
                const isUser = msg.sender === "user";

                return (
                  <div style={style} className="px-3 py-2">
                    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`px-4 py-2 rounded-2xl shadow-sm break-words whitespace-pre-wrap
                          max-w-[80%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%]
                          ${isUser
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              }}
            </List>
          )}
        </AutoSizer>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t">
        <ChatInput />
      </div>
    </div>
  );
}
