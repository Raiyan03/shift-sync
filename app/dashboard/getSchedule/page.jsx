"use client";
import Schedule from "@/app/ui/schedule/scheduleTable/scheduleTable";
import React from "react";

export default function getSchedulePage() {
  return (
    <div className="p-14 justify-center align-middle items-center flex flex-col h-full">
        <h1 className="text-xl font-extrabold">Generate Schedule</h1>
      <Schedule />
    </div>
  );
}
