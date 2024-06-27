"use client";
import Schedule from "@/app/ui/schedule/scheduleTable/scheduleTable";
import { useState } from "react";
import Evaluation from "@/app/ui/dashboard/evaluation/evaluation";

export default function getSchedulePage() {
  const [schedule, setSchedule] = useState();
  const [hourDetail, setHourDetail] = useState();
  return (
    <div className="p-14 justify-center align-middle items-center flex flex-col h-full">
      <h1 className="text-xl font-extrabold">Generate Schedule</h1>
      <Schedule
        schedule={schedule}
        setSchedule={setSchedule}
        hourDetail={hourDetail}
        setHourDetail={setHourDetail}
      />
      {schedule && <Evaluation scheduleData={hourDetail} />}
    </div>
  );
}
