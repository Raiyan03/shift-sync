"use client";
import { getScheduleData } from "@/app/lib/utilities";
import React, { useEffect, useState } from "react";

export default function Shifts() {
  const [schedule, setSchedule] = useState();

  const fetchAndLogData = async () => {
    // const res = await fetch("api/getPreference");
    // if (!res.ok) {
    //   throw new Error("HTTP error");
    // }

    // const scheduleData = await res.json();

    const scheduleData = await getScheduleData("Ace Liquor");

    setSchedule(scheduleData);
  };

  useEffect(() => {
    fetchAndLogData();
  }, []);

  return (
    <div>
      <select
        name="shifts"
        id="shifts"
        className="bg-bg border-none p-3 rounded-md text-text"
      >
        <option value="general" className="" disabled selected>
          Select your shift preference
        </option>

        {schedule &&
          schedule.shifts.map((value, index) => {
            return <option value={value}>{value}</option>;
          })}
          <option value="Any Shift">Any Shift</option>
      </select>
    </div>
  );
}
