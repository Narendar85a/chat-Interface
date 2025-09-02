"use client";

import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { ChatInputProps } from "@/types";

export default function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="flex items-center gap-2 sm:gap-4 p-2 sm:p-3 border-t bg-gray-50 dark:bg-gray-900">
      <Input
        className="flex-1 text-sm sm:text-base rounded-xl shadow-[0_0_6px_#00a67e] focus:shadow-[0_0_10px_#00a67e] focus:outline-none transition-shadow"
        placeholder="Type your message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <Button
        onClick={handleSend}
        className="px-3 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base rounded-xl bg-[#00a67e] text-black hover:bg-[#80F2B0] transition-colors"
      >
        Send
      </Button>
    </div>
  );
}
