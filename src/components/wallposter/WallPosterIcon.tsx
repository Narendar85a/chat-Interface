"use client";

import { useState } from "react";
import { ThumbsUp, MessageCircle, Info } from "lucide-react";

export default function WallPosterIcon() {
    const [liked, setLiked] = useState(false)

  return (
    <div className="flex justify-evenly items-center border-t mt-3 pt-2 text-gray-600 dark:text-gray-300">
      <button
          onClick={() => setLiked(!liked)}
       className="flex-1 flex justify-center py-2 text-[#00a67e] border-r last:border-none">
        <ThumbsUp 
         className="w-5 h-5 cursor-pointer"
         fill={liked ? "currentColor" : "none"} 
         strokeWidth={liked ? 0 : 2}
        />
      </button>

      <button className="flex-1 flex justify-center py-2 text-[#00a67e] border-r last:border-none">
        <MessageCircle className="w-5 h-5 cursor-pointer" />
      </button>

      <button className="flex-1 flex justify-center py-2 text-[#00a67e] ">
        <Info className="w-5 h-5 cursor-pointer" />
      </button>
    </div>
  );
}
