"use client";
import Schedule from "@/app/ui/schedule/scheduleTable/scheduleTable";
import React from "react";

export default function getSchedulePage() {
  return (
    <div className="mt-5 justify-center align-middle items-center flex flex-col m-auto">
        <h1 className="text-2xl font-bold">Generate Schedule</h1>
      <Schedule />
    </div>
  );
}
