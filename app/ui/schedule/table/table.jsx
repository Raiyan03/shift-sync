"use client";
import React, { useEffect, useState } from "react";
import TableData from "./table-data/tableData";
import styles from "./table.module.css";
import { getScheduleData } from "@/app/lib/utilities";
import calculateShifts from "@/app/shiftconfig/calculateShifts";

export default function Table() {
  const [schedule, setSchedule] = useState();
  const [shifts, setShifts] = useState();

  const fetchScheduleData = async () => {
    const scheduleData = await getScheduleData("Ace Liquor");
    console.log(scheduleData);
    setSchedule(scheduleData);
  };

  const calculateAndLogShifts = () => {
    if (schedule) {
      const shiftsData = calculateShifts(schedule, shifts);
      console.log(shiftsData);
      setShifts(shiftsData);
    }
  };

  useEffect(() => {
    fetchScheduleData();
  }, []);

  return (
    <div className={styles.container}>
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
          <div className="flex justify-center m-4">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={calculateAndLogShifts}
            >
              Calculate Shifts
            </button>
          </div>
        </div>
      )}
      {!schedule && <div>...Loading</div>}
    </div>
  );
}