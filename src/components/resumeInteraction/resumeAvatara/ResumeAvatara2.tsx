"use client";

import { VirtuosoGrid } from "react-virtuoso";
import personsData from "@/data/wallposter_data.json";
import { useState, useEffect } from "react";
import {Props} from "@/types"

export default function ResumeAvatara2({selected}: Props) {
    const[shuffled, setShuffled] = useState(personsData.persons)

    useEffect(() => {
        if(selected){
            const shuffledData = [...personsData.persons]
            .sort(() => Math.random() - 0.5) //shuffle array
            .slice(0.6);  // pick 6 random items (adjust as needed)

            setShuffled(shuffledData)
        }

    },[selected])

  return (
    <div className="p-6 border-t">
      <VirtuosoGrid
        style={{ height: 600 }}
        totalCount={personsData.persons.length}
        listClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6"
        itemContent={(index) => {
          const person = shuffled[index];
          return (
            <div
              key={person.person_id}
              className="flex flex-col items-center text-center rounded-xl shadow-md bg-white dark:bg-gray-900 p-4 h-full"
            >
              <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded-lg">
                <img
                  src={person.person_avatar}
                  alt={person.person_name}
                  className="w-30 h-30 object-cover rounded-lg"
                />
              </div>

              <h3 className="mt-3 text-base font-semibold text-gray-900 dark:text-white line-clamp-1">
                {person.person_name}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                {person.description}
              </p>
            </div>
          );
        }}
      />
    </div>
  );
}
