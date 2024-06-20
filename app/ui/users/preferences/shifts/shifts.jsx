"use client";
import { getScheduleData } from "@/app/lib/utilities";
import React, { useEffect, useState } from "react";

export default function Shifts({day, setPreference}) {
  const [schedule, setSchedule] = useState();

  const [pref, setPref] = useState()

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
      <select
        name={day}
        value={pref}
        className="bg-bg border-2 border-teal-700 rounded-xl p-3 text-text mt-3"
        onChange={(e)=>setPreference(e.target.value)}
        required
      >
        <option value="Any Shift" className="" disabled selected>
          Select your shift preference
        </option>

        {schedule &&
          schedule.shifts.map((value, index) => {
            return <option value={`${day}-${index}`}>{value}</option>;
          })}
          <option value="any" >Any Shift</option>
      </select>
  );
}
