"use client"
import { getUser, logOutUser } from "@/action/actions";
import { getShiftDataForTheUser } from "@/data/shift";
import { getUserData } from "@/data/user";
import { useEffect, useState } from "react";
import ShiftTable from "@/components/employee/shiftPref/shif-table";
import ShiftPref from "@/components/employee/shiftPref/shiftPref"
const Page = () => {
  // Contains personal employee information
  const [userData, setUserData] = useState();
  // Contains shift and schedule information for employee
  const [data, setData] = useState();

  const fetch = async () => {
    const token = await getUser();
    if (token) {
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
    <div className="flex min-h-screen flex-col gap-3">
      { data && <ShiftTable schedule={data} />}
      { userData && <ShiftPref id={userData?.id} />}
    </div>
  );
};

export default Page;