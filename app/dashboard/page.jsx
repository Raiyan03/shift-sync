"use client";

import { useEffect, useState } from "react";
import { getScheduleData } from "../lib/utilities";
import Cards from "../ui/dashboard/cards/cards";
import Info from "../ui/dashboard/info/info";
import ShiftConfig from "../ui/dashboard/shiftConfig/shiftConfig";
import Link from "next/link";
import { getUser } from "@/action/actions.ts";
import Evaluation from '../../components/manager/evaluation/evaluation'; // Import the Evaluation component

export default function DashboardPage() {
  const [schedule, setSchedule] = useState();
  const [load, setLoad] = useState(false);
  const [userId, setUserId] = useState();

  const fetchData = async () => {
    const userData = await getUser();
    const scheduleData = await getScheduleData(userData.id);

    setUserId(userData.id);
    setSchedule(scheduleData);
  };

  useEffect(() => {
    fetchData();
    setLoad(true);
  }, []);

  return (
    <div className={`m-10 transition-all duration-500 delay-75 ease-in ${load ? "visible scale-100" : "invisible translate-y-20"}`}>
      <div className={`flex justify-center text-3xl font-bold m-5 transition ease-in-out delay-150 duration-500 ${load ? "" : "scale-0"}`}>
        Welcome to Shift Sync
      </div>
      <div className="flex p-10 justify-around">
        <div className={`flex flex-col p-10 transition-all duration-75`}>
          <div className="flex p-5 gap-5 ">
            {schedule && <Cards employees={schedule.employees.length} />}
            {!schedule && <Cards employees=" " />}
          </div>
          <div className="p-5 flex">
            {/* <Info /> */}
          </div>
        </div>
        <div className="p-5 flex justify-center items-center">
          <ShiftConfig id={userId} />
        </div>
      </div>
      {schedule && <Evaluation scheduleData={schedule} />} {/* Add the Evaluation component here */}
    </div>
  );
}
