"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import messagesData from "@/data/mock_conversation_data.json";
import ChatHeader from "../ChatHeader";
import ChatInput from "../ChatInput";
import { FlatMessage, ChatWindowProps } from "@/types";

export default function ChatWindow({ activeUser }: ChatWindowProps) {
  const listRef = useRef<List>(null);

  // state for messages
  const [messages, setMessages] = useState<FlatMessage[]>(() => {
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
  });

  // 📌 Add a new message from ChatInput
  const handleSendMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `${prev.length}-u`, sender: "user", text },
    ]);
  };

  // 📌 Estimate row height
  const getItemSize = useCallback(
    (index: number) => {
      const msg = messages[index];
      const base = 56;
      const estimated = base + Math.ceil(msg.text.length * 0.25);
      return Math.max(64, Math.min(estimated, 500));
    },
    [messages]
  );

  // Stable key
  const itemKey = useCallback((index: number) => messages[index].id, [messages]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (listRef.current && messages.length > 0) {
      listRef.current.scrollToItem(messages.length - 1, "end");
    }
  }, [messages.length]);

  return (
    <div className="flex flex-col h-[calc(100vh-3rem)] w-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex-shrink-0 border-b">
        <ChatHeader userName={activeUser.user_name} avatar={activeUser.user_avatar} />
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
            </List>
          )}
        </AutoSizer>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
