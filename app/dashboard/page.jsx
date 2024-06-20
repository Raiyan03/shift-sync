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

  useEffect(() => {
    if (user)
        firestore().collection("users").where("role", "==", (user?.role === "Employee" ? "Manager" : "Employee"))
            .onSnapshot(users => {
                if (!users.empty) {
                    const USERS = []

                    users.forEach(user => {
                        USERS.push(user.data())
                    })

                    setUsers(USERS)
                }
            })
}, [user])

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
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
