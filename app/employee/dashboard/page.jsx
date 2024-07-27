"use client"
import { getUser, logOutUser } from "@/action/actions";
import { getShiftDataForTheUser } from "@/data/shift";
import { getUserData } from "@/data/user";
import { useEffect, useState } from "react";
import ShiftTable from "@/components/employee/shiftPref/shif-table";

const Page = () => {
  // Contains personal employee information
  const [userData, setUserData] = useState();
  // Contains shift and schedule information for employee
  const [data, setData] = useState();

  const fetchScheduleData = async () => {

  };

  const fetch = async () => {
    const token = await getUser();
    if (token) {
      console.log("Logging token: ", token);
      setUserData(token);
      const shiftData = await getShiftDataForTheUser(token?.id);
      const pref = await getUserData(token?.id);
      setData(shiftData);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="flex h-screen flex-col">
      { data && <ShiftTable schedule={data} />}
    </div>
  );
};

export default Page;