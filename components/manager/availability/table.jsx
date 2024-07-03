"use client"
import { getUser } from "@/action/actions";
import { getScheduleData } from "@/lib/utilities";
import { useState, useEffect } from "react";
import TableData from "@/components/manager/availability/table-data";
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
        <div className="mt-4 flex flex-col bg-secondary border shadow-md rounded-lg p-4">
        <h1 className='text-xl text-accent1 py-3'>
            Employee preferences
        </h1>
        <table className="w-full">
            <thead>
                <tr className=" ">
                    <td className="p-2 font-bold">Name</td>
                    <td className="p-2 font-bold">Monday</td>
                    <td className="p-2 font-bold">Tuesday</td>
                    <td className="p-2 font-bold">Wednesday</td>
                    <td className="p-2 font-bold">Thursday</td>
                    <td className="p-2 font-bold">Friday</td>
                    <td className="p-2 font-bold">Saturday</td>
                    <td className="p-2 font-bold">Sunday</td>
                </tr>
            </thead>
            <tbody>
                {
                    schedule && (
                        <TableData scheduleData={schedule} />
                    )
                }
            </tbody>
        </table>
    </div>
    )
}