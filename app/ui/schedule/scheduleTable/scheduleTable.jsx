import React, { useState } from "react";
import { convertTimeStamps, getScheduleData } from "@/app/lib/utilities";
import { filterShifts } from "@/app/lib/utilities";
import Table from "./table";
import { getUser } from "@/action/actions";

const Schedule = ({ schedule, setSchedule, hourDetail, setHourDetail }) => {
  // const [schedule, setSchedule] = useState();
  const [remaining, setRemaining] = useState()

  const fetchAndLogData = async () => {
    const currentUser = await getUser();

    const data = await getScheduleData(currentUser.id);
    const res = await fetch("/api/schedule", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }



    const scheduleData = await res.json();
    // console.log(JSON.stringify(scheduleData));
    console.log(scheduleData)
    setHourDetail(scheduleData);
    const filteredSchedule = filterShifts(scheduleData);
    console.log(filteredSchedule)
    setSchedule(filteredSchedule);

    var temp = 0;

    const totalHA = Object.values(scheduleData.total_hours_per_employee)

    totalHA.forEach((val)=>{
      temp += val
    })

    setRemaining(parseInt(data.hour_bank) - temp)


  };

  return (
    <div className="flex w-3/4 h-auto m-auto items-center justify-center p-2 mt-2">
      {schedule && (
        <div>
          <table className="w-full table-fixed bg-bgSoft">
            <thead>
              <tr className="border-2 border-solid">
                <td className="p-2 w-2/12 border-x-2">Name</td>
                <td className="p-2 w-2/12 border-x-2">Monday</td>
                <td className="p-2 w-2/12 border-x-2">Tuesday</td>
                <td className="p-2 w-2/12 border-x-2">Wednesday</td>
                <td className="p-2 w-2/12 border-x-2">Thursday</td>
                <td className="p-2 w-2/12 border-x-2">Friday</td>
                <td className="p-2 w-2/12 border-x-2">Saturday</td>
                <td className="p-2 w-2/12 border-x-2">Sunday</td>
                <td className="p-2 w-2/12 border-x-2">Total Hours</td>
              </tr>
            </thead>
            <tbody>
              <Table scheduleData={schedule} />
            </tbody>
          </table>
          <div className="text-xl m-4"> Remaining Hours: <span className="text-red-500">{remaining}</span></div>
          </div>
      )}

      {!schedule && (
        <button
          className="flex bg-green-500 p-3 rounded-md"
          onClick={fetchAndLogData}
        >
          Generate
        </button>
      )}
    </div>
  );
};

export default Schedule;
