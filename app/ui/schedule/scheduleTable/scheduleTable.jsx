import React, { useState } from "react";
import { getScheduleData } from "@/app/lib/utilities";
import { filterShifts } from "@/app/lib/utilities";
import Table from "./table";

const Schedule = () => {
  const [schedule, setSchedule] = useState();

  const fetchAndLogData = async () => {
    const data = await getScheduleData("Ace Liquor");
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
    console.log(JSON.stringify(scheduleData));
    const filteredSchedule = filterShifts(scheduleData);
    setSchedule(filteredSchedule);
  };

  return (
    <div className="p-2 mt-2">
      {schedule && (
        <div>
          <table className="w-full table-fixed">
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
              </tr>
            </thead>
            <tbody>
              <Table scheduleData={schedule} />
            </tbody>
          </table>
          <button
            className="flex bg-green-500 p-3 rounded-md"
            onClick={fetchAndLogData}
          >
            Regenerate
          </button>
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
