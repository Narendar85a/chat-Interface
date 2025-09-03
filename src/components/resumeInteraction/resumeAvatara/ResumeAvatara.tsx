"use client";

import { useState, useEffect } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import avatarItems from "@/data/avatar_data.json";
import ResumeAvatara2 from "./ResumeAvatara2";
import { Button } from "@/components/ui/button";
import Macha from "./Macha";

export default function ResumeAvatara() {
  const [selected, setSelected] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"avatars" | "macha">("avatars");

  // 👉 On first render, default to first avatar item
  useEffect(() => {
    if (avatarItems["avatar-items"].length > 0) {
      setSelected(avatarItems["avatar-items"][0].item_id);
    }
  }, []);

  return (
    <div className="p-4 bg-transparent border-t">

      <div className="flex border-b justify-start items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => setActiveTab("avatars")}
          className={`text-sm cursor-pointer text-[#00a67e] relative 
            ${
              activeTab === "avatars"
                ? "after:content-[''] after:block after:w-full after:h-[2px] after:bg-[#00a67e] after:absolute after:-bottom-[1px] after:left-0"
                : ""
            }`}
        >
          Avatars
        </Button>

        <Button
          variant="ghost"
          onClick={() => setActiveTab("macha")}
          className={`text-sm cursor-pointer text-[#00a67e] relative 
            ${
              activeTab === "macha"
                ? "after:content-[''] after:block after:w-full after:h-[2px] after:bg-[#00a67e] after:absolute after:-bottom-[1px] after:left-0"
                : ""
            }`}
        >
          Macha
        </Button>
      </div>

      {activeTab === "avatars" && (
        <>
          <VirtuosoGrid
            style={{ height: 150 }}
            totalCount={avatarItems["avatar-items"].length}
            listClassName="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-15 mt-5 gap-2"
            itemContent={(index) => {
              const item = avatarItems["avatar-items"][index];
              const isSelected = selected === item.item_id;

              return (
                <Button
                  key={item.item_id}
                  onClick={() => setSelected(item.item_id)}
                  className={`w-full flex items-center justify-center p-3 rounded-lg
                             backdrop-blur-sm shadow-sm transition cursor-pointer 
                             text-xs font-medium text-center
                             ${
                               isSelected
                                 ? "text-white bg-[#00a67e] hover:bg-[#00a67e] active:bg-[#008f6b]"
                                 : "bg-white/20 dark:bg-gray-600/20 text-gray-800 dark:text-gray-200 hover:bg-[#00a67e] hover:text-white active:bg-[#008f6b] active:text-white"
                             }`}
                >
                  {item.item_name}
                </Button>
              );
            }}
          />
          {selected && <ResumeAvatara2 selected={selected} />}
        </>
      )}

      {activeTab === "macha" && <Macha />}
    </div>
  );
}
