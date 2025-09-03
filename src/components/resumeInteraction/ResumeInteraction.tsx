"use client";

import { useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import personsData from "@/data/wallposter_data.json";

export default function ResumeInteraction() {
  const [showAll, setShowAll] = useState(false);

  const personsToShow = showAll
    ? personsData.persons
    : personsData.persons.slice(0, 7);

  return (
    <div className="p-2 bg-transparent">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#00a67e]">
        Resume Interactions
      </h2>

      <div className="relative w-full p-8">
        <VirtuosoGrid
          style={{ height: showAll ? 200 : 200 }} 
          totalCount={personsToShow.length}
          listClassName="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 p-1 sm:p-2"
          itemContent={(index) => {
            const person = personsToShow[index];
            return (
              <div
                key={person.person_id}
                className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg
                           bg-white/20 dark:bg-gray-900 backdrop-blur-sm
                           shadow-sm hover:shadow-md transition w-full"
              >
                <img
                  src={person.person_avatar}
                  alt={person.person_name}
                  className=" h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl object-cover mb-2"
                />
                <p className="text-[10px] sm:text-xs md:text-xs font-medium text-gray-800 dark:text-gray-200 text-center truncate w-full">
                  {person.person_name}
                </p>
              </div>
            );
          }}
        />

        {/* Button inside the container */}
        {personsData.persons.length > 7 && (
          <div className="absolute bottom-2 right-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-2 sm:px-3 py-1 rounded-md bg-white/30 dark:bg-gray-800/50 
                         text-[#00a67e] text-xs sm:text-sm font-medium 
                         hover:bg-[#00a67e] hover:text-white transition"
            >
              {showAll ? "Less ↑" : "More ↓"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
