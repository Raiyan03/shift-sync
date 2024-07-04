"use client";
import { getScheduleData } from "@/lib/utilities";
import React, { useEffect, useState } from "react";

export default function Shifts({ day, setPreference }) {
  const [schedule, setSchedule] = useState();
  const [pref, setPref] = useState();


  const timeStampConversion = (data) =>{
    if(!data){
      return
    }
    let [start, end] = [data[0], data[1]];
  
    const startDate = new Date(parseInt(start, 10));
  
    let startHours = startDate.getHours();
    let startMin = parseInt("0" + startDate.getMinutes(), 10);
  
    const period = startHours <= 12 ? "AM" : "PM";
  
    // Adjust the hours for 12-hour format
    startHours = startHours % 12;
    startHours = startHours ? startHours : 12; // If hours is 0, set it to 12
  
    // Format the hours and minutes to be always two digits
    const startformattedHours = startHours < 10 ? "0" + startHours : startHours;
    const startformattedMinutes = startMin < 10 ? "0" + startMin : startMin;
  
    const endDate = new Date(parseInt(end, 10));
  
    let endHours = endDate.getHours();
    let endMins = parseInt("0" + endDate.getMinutes(), 10);
  
    const period2 = endHours <= 12 ? "AM" : "PM";
  
    // Adjust the hours for 12-hour format
    endHours = endHours % 12;
    endHours = endHours ? endHours : 12; // If hours is 0, set it to 12
  
    // Format the hours and minutes to be always two digits
    const endformattedHours = endHours < 10 ? "0" + endHours : endHours;
    const endformattedMinutes = endMins < 10 ? "0" + endMins : endMins;
    
    // Return the formatted time
    return `${startformattedHours}:${startformattedMinutes} ${period} - ${endformattedHours}:${endformattedMinutes} ${period2}`;
  };


  const fetchAndLogData = async () => {
    // const res = await fetch("api/getPreference");
    // if (!res.ok) {
    //   throw new Error("HTTP error");
    // }

    // const scheduleData = await res.json();

    const scheduleData = await getScheduleData("Ace Liquor");

    console.log(scheduleData)

    setSchedule(scheduleData);
  };

  useEffect(() => {
    fetchAndLogData();
  }, []);

  return (
    <select
      name={day}
      value={pref}
      className=" border-2 border-primary rounded-xl p-3 text-primary mt-3"
      onChange={(e) => {setPreference(e.target.value); console.log(e.target.value)}}
      required
    >
      <option value="any" className="" disabled selected>
        Select your shift preference
      </option>

      {schedule &&
        schedule.shifts.map((value, index) => {
          return <option value={`${day}-${index}`}>{timeStampConversion(value)}</option>;
        })}
      <option value="any">Any Shift</option>
    </select>
  );
}