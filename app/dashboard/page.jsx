"use client"
import { useEffect, useState } from "react";
import { getScheduleData } from "../lib/utilities";
import Cards from "../ui/dashboard/cards/cards";
import styles from "../ui/dashboard/dashboard.module.css";
import Info from "../ui/dashboard/info/info";

export default function DashboardPage() {
  const [schedule, setSchedule] = useState();

  const fetchData = async () => {
    // const res = await fetch("api/getPreference");
    // if (!res.ok) {
    //   throw new Error("HTTP error");
    // }

    // const scheduleData = await res.json();

    const scheduleData = await getScheduleData("Ace Liquor");

    setSchedule(scheduleData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.wrapper && "flex flex-col p-10 m-auto justify-center items-center align-middle"}>
      <div className=" justify-center text-3xl font-bold m-5">Welcome to Shift Sync</div>
      <div className={styles.main && ""}>
        {schedule &&
        <Cards employees={schedule.employees.length} />
      }
      {!schedule &&
       <Cards employees="10" />}
      </div>
      <div className={styles.info}>
        <Info />
      </div>
    </div>
  );
}
