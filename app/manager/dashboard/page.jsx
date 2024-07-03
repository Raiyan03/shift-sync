"use client";
import { useState, useEffect } from "react";
import Cards from "@/components/manager/dashboard/cards";
import ScheduleTable from "@/components/manager/dashboard/Schedule-Table"
import Evaluation from "@/components/manager/evaluation/evaluation";
import ShiftConfig from "@/components/manager/dashboard/shift-config";
import { getUser } from "@/action/actions";
import { getScheduleData } from "@/lib/utilities";

export default function Page() {
    const [schedule, setSchedule] = useState();
    const [userId, setUserId] = useState();
    const [shift, setShift] = useState();
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
      // const res = await fetch("api/getPreference");
      // if (!res.ok) {
      //   throw new Error("HTTP error");
      // }
  
      // const scheduleData = await res.json();
      
      const userData = await getUser();
      const scheduleData = await getScheduleData(userData.id);
  
      setUserId(userData.id)
      setShift(scheduleData);
    };

    useEffect(() => {
      fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-3">
          <ShiftConfig id={userId} />
          <ScheduleTable Schedule={schedule} setSchedule={setSchedule} Loading={loading} setLoading={setLoading} />
          <div>
            {/* { schedule && (
              <Evaluation schedule={schedule} />
            ) } */}
          </div>
        </div>
  );
}
