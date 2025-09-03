"use client";

import { Card } from "@/components/ui/card";

export default function Macha() {
  return (
    <div className="p-8">
      <Card className="flex flex-col md:flex-row items-center gap-20 p-6 shadow-md rounded-xl bg-white dark:bg-gray-900">
        <img
          src="/macha.png"
          alt="Macha"
          className="w-75 h-75 object-cover rounded-lg"
        />

        <div className="flex flex-col gap-6">
          <h2 className="text-lg font-semibold text-[#00a67e] mb-2">Macha</h2>
          <p className="text-sm text-gray-900 dark:text-gray-300 leading-relaxed">
            I am a Frontend Developer with experience building scalable and efficient
            web applications using modern frameworks like React.js and Next.js.
            Proficient in JavaScript, TypeScript, and creating responsive,
            user-friendly designs. I thrive in dynamic environments, working on
            impactful projects, and solving complex problems through innovation
            and teamwork. My journey includes successful collaborations on diverse
            projects, improving web performance, and mastering full-stack
            development principles.
          </p>
        </div>
      </Card>
    </div>
  );
}
