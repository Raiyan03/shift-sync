"use client";
import React, { useEffect, useState } from "react";
import TableData from "./table-data/tableData";
import { getScheduleData } from "@/app/lib/utilities";
import { getUser } from "@/action/actions";

export default function Table() {
  const [schedule, setSchedule] = useState();

  const fetchAndLogData = async () => {
    // const res = await fetch("api/getPreference");
    // if (!res.ok) {
    //   throw new Error("HTTP error");
    // }

    // const scheduleData = await res.json();
    const userData = await getUser();
    const temp = userData.id
    console.log(temp)
    const scheduleData = await getScheduleData(temp);

    if(scheduleData !== null){
      setSchedule(scheduleData);
    }

  };

  useEffect(() => {
    fetchAndLogData();
  }, []);

  return (
    <div className="flex w-3/4 h-auto m-auto items-center justify-center justify-items-center">
      {schedule && (
        <div>
            <h1 className="flex justify-center m-4 text-xl font-extrabold">Employee Preferences</h1>
          <table className="w-full table-fixed bg-bgSoft">
            <thead>
              <tr className="border-solid border-2">
                <th className="p-2 border-x-2 w-2/12">Name</th>
                <th className="p-2 border-x-2 w-2/12">Monday</th>
                <th className="p-2 border-x-2 w-2/12">Tuesday</th>
                <th className="p-2 border-x-2 w-2/12">Wednesday</th>
                <th className="p-2 border-x-2 w-2/12">Thursday</th>
                <th className="p-2 border-x-2 w-2/12">Friday</th>
                <th className="p-2 border-x-2 w-2/12">Saturday</th>
                <th className="p-2 border-x-2 w-2/12">Sunday</th>
              </tr>
            </thead>
            <tbody>
              <TableData scheduleData={schedule} />
            </tbody>
          </table>
        </div>
      )}
      {!schedule &&

        <div>...Loading</div>
        //     <button className='bg-bgSoft rounded-md p-3 text-white' onClick={fetchAndLogData}>
        //     Get Preferences
        // </button>
        }
    </div>
  );
}
