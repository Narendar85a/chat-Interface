"use client";

import personsData from "@/data/wallposter_data.json";
import { Card, CardContent } from "@/components/ui/card";
import WallPosterIcon from "./WallPosterIcon";

export default function WallPoster1() {
  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {personsData.persons.map((person) => (
          <Card
            key={person.person_id}
            className="flex flex-col shadow-md hover:shadow-lg transition rounded-xl overflow-hidden"
          >
            <div className="flex flex-row items-start gap-6 p-5">
              <div className="flex-shrink-0">
                <img
                  src={person.person_avatar}
                  alt={person.person_name}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-md"
                />
              </div>

              <CardContent className="p-0">
                <h3 className="text-base sm:text-xl font-semibold">
                  {person.person_name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-4">
                  {person.description}
                </p>
              </CardContent>
            </div>

            <WallPosterIcon />
          </Card>
        ))}
      </div>
    </div>
  );
}
