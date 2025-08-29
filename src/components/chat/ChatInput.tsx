"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChatInputProps } from "@/types"


export default function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue(""); 
  };

  return (
    <div className="flex justify-evenly gap-5 rounded-2xl p-2">
      <Input
        className="flex-1 shadow-[0_0_6px_#80F2B0] focus:shadow-[0_0_10px_#80F2B0] focus:outline-none transition-shadow"
        placeholder="Type your message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <Button
        onClick={handleSend}
        className="cursor-pointer bg-[#80F2B0] text-black hover:bg-[#6cd49a] transition-colors"
      >
        Send
      </Button>
    </div>
  );
}
