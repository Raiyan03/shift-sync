"use client"
import { getUser, logOutUser } from "@/action/actions";
import { getShiftDataForTheUser } from "@/data/shift";
import { useEffect, useState } from "react";


const Page = () => {
  // Contains personal employee information
  const [userData, setUserData] = useState();
  // Contains shift and schedule information for employee
  const [data, setData] = useState();

  const fetchScheduleData = async () => {
    // Current best practice to store shifts
    const shiftData = await getShiftDataForTheUser(userData?.id);
    setData(shiftData);
    console.log("Logging shift data imported: ");
    console.log(shiftData);
    console.log("logging shift data held: ");
    console.log(data);
  };

  const fetch = async () => {
    const token = await getUser();
    if (token) {
      setUserData(token);
      console.log(userData);
      console.log("Got to fetch, userData is set");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="flex h-screen">
      hello world
    </div>
  );
};

export default Page;