"use client";
import { useState, useEffect } from "react";
import ScheduleTable from "@/components/manager/dashboard/Schedule-Table";
import ShiftConfig from "@/components/manager/dashboard/shift-config";
import { getUser } from "@/action/actions";
import { getUserPreferencesForTheBackend } from "@/server/calls";
import { ClipLoader } from "react-spinners";

export default function Page() {
  const [schedule, setSchedule] = useState();
  const [userId, setUserId] = useState();
  const [shift, setShift] = useState();
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    const userData = await getUser();
    if(userData !== undefined){
      const scheduleData = await getUserPreferencesForTheBackend(userData.id);
      setShift(scheduleData);
      setUserId(userData.id);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {userId? (<ShiftConfig id={userId} />):(<div className="text-xl font-bold text-center justify-center items-center align-middle">Loading  <ClipLoader size={20} color="black" /> </div>)}
      <ScheduleTable
        Schedule={schedule}
        setSchedule={setSchedule}
        Loading={loading}
        setLoading={setLoading}
      />
      <div>
        {/* { schedule && (
              <Evaluation schedule={schedule} />
            ) } */}
      </div>
    </div>
  );
}
