"use client";
import React, { useEffect, useState } from "react";
import { getUser } from "@/action/actions";
import { newConvertTimeStamp } from "@/lib/utilities";
import { getShiftData } from "@/data/shift";


export default function Shifts({ day, setPreference }) {
  const [schedule, setSchedule] = useState();
  const [pref, setPref] = useState();

  const fetchAndLogData = async () => {
    // const res = await fetch("api/getPreference");
    // if (!res.ok) {
    //   throw new Error("HTTP error");
    // }

    // const scheduleData = await res.json();
    const user = await getUser();

    if(user){

      const scheduleData = await getShiftData(user.id);
      setSchedule(scheduleData);
    }


  };

  useEffect(() => {
    fetchAndLogData();
  }, []);

  return (
    <select
      name={day}
      value={pref}
      className="bg-transparent border-2 border-primary rounded-xl p-3 text-black mt-3"
      onChange={(e) => {setPreference(e.target.value)}}
      required
    >
      <option value="any" className="" disabled selected>
        Select your shift preference
      </option>
      <option value="any">Any Shift</option>
        {console.log(schedule)}

      {schedule? 
        schedule.shifts?.map((value, index) => {
          return <option value={`${day}-${index}`}>{newConvertTimeStamp(value)}</option>;
        }): ""}
        {/* <option value="NA">Not Available</option> */}
    </select>
  );
}