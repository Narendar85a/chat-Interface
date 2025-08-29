"use client";

import { useRef, useEffect, useMemo } from "react";
import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import messagesData from "@/data/mock_conversation_data.json";
import ChatHeader from "../ChatHeader";
import ChatInput from "../ChatInput";
import {FlatMessage, ChatWindowProps} from "@/types"


export default function CoderChat({ activeUser }: ChatWindowProps) {
  const listRef = useRef<List>(null);

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

  // 📌 Cache for dynamic heights
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 64, // fallback height
    })
  );

  // 📌 Scroll to bottom when messages update
  useEffect(() => {
    if (listRef.current && messages.length > 0) {
      listRef.current.scrollToRow(messages.length - 1);
    }
  }, [messages.length]);

  return (
    <div className="flex flex-col h-[calc(100vh-3rem)] w-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex-shrink-0 border-b">
        <ChatHeader  userName={activeUser.user_name} avatar={activeUser.user_avatar}/>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={listRef}
              width={width}
              height={height}
              rowCount={messages.length}
              deferredMeasurementCache={cache.current}
              rowHeight={cache.current.rowHeight}
              overscanRowCount={6}
              rowRenderer={({ index, key, style, parent }) => {
                const msg = messages[index];
                const isUser = msg.sender === "user";

                return (
                  <CellMeasurer
                    key={key}
                    cache={cache.current}
                    parent={parent}
                    columnIndex={0}
                    rowIndex={index}
                  >
                    <div style={style} className="px-3 py-2">
                      <div
                        className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`px-4 py-2 rounded-2xl  break-words whitespace-pre-wrap
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
                  </CellMeasurer>
                );
              }}
            />
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
