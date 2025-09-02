"use client";

import { useEffect, useRef } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { ChatWindowProps } from "@/types";

export default function ChatWindow({ activeUser, messages, onSend }: ChatWindowProps) {
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (!messages || messages.length === 0) return;
    const raf = requestAnimationFrame(() => {
      virtuosoRef.current?.scrollToIndex({
        index: messages.length - 1,
        align: "end",
        behavior: "smooth",
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [messages.length, activeUser?.chat_key]);

  return (
    <div className="flex flex-col w-full h-[calc(100vh-3rem)] bg-gray-50 dark:bg-gray-900">

      <div className="flex-shrink-0 border-b">
        <ChatHeader userName={activeUser.user_name} avatar={activeUser.user_avatar} />
      </div>

      <div className="flex-1 overflow-hidden">
        <Virtuoso
          ref={virtuosoRef}
          key={activeUser?.chat_key ?? "default"}
          style={{ height: "100%" }}
          data={messages}
          followOutput="auto"
          computeItemKey={(index, item) => item.id}
          increaseViewportBy={{ top: 200, bottom: 200 }}
         itemContent={(index, msg) => {
          const isUser = msg.sender === "user";
            return (
               <div className={`px-3 py-2 ${index !== messages.length - 1 ? "mb-2" : ""}`}>
                <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`relative px-4 py-3 rounded-2xl break-words whitespace-pre-wrap
                            max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[55%]
                    ${isUser
                          ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-[0_0_6px_#EBDD63]"
                        : "bg-[#00a67e] dark:bg-gray-700 text-white shadow-[0_0_6px_#00a67e]"
                 }`}
                >
              <div className="text-sm sm:text-base">{msg.text}</div>

              <div className="flex items-center justify-end gap-1 mt-1 text-[11px] sm:text-[12px] text-gray-500 dark:text-gray-400">
                <span className="whitespace-nowrap">{msg.timestamp}</span>
                {isUser && <span className="text-white-600">✔</span>}
              </div>
            </div>
          </div>
          </div>
          );
          }}
        />
      </div>

      <div className="flex-shrink-0 border-t">
        <ChatInput onSend={onSend} />
      </div>
    </div>
  );
}
