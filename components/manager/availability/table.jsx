"use client"
import { getUser } from "@/action/actions";
import { useState, useEffect } from "react";
import TableData from "@/components/manager/availability/table-data";
import { getUserPreferencesForTheBackend } from "@/server/calls";
import Loader from "@/components/loader";
export default function Table() {
    const [schedule, setSchedule] = useState();
    const [loading, setLoading] = useState(true);
    const fetchAndLogData = async () => {
      const userData = await getUser();
      const userId = userData.id
      const scheduleData = await getUserPreferencesForTheBackend(userId);
      scheduleData !== null? setSchedule(scheduleData) : ""
      setLoading(false);
    };
  
    useEffect(() => {
      fetchAndLogData();
    }, []);
    return (
    loading ? 
    <div className=" flex items-center justify-center border shadow-md rounded-lg h-80">
        <Loader />
    </div> :
        <div className="flex flex-col bg-secondary border shadow-md rounded-lg p-4">
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