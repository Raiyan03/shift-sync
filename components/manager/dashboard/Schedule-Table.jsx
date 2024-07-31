"use client";

import Image from "next/image";
import Link from "next/link";
import { getUser } from "@/action/actions";
import { convertTimeStamps, filterShifts } from "@/lib/utilities";
import Table from "@/components/manager/dashboard/table";
import { ClipLoader, MoonLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { deleteGeneratedScheduleFromDB, getStoredScheduleDataFromDB, getUserPreferencesForTheBackend, storeGeneratedScheduleToDB } from "@/server/calls";
import { toast } from "sonner";
const ScheduleTable = ({ Schedule, Loading, setLoading, setSchedule }) => {
  const [hoursRemaining, setHoursRemaining] = useState();
  const [userId, setUserId] = useState();
  const [rawData, setRawData] = useState();
  const [shiftsData, setShiftsData] = useState();
  const [message, setMessage] = useState();
  const [scheduleExists, setScheduleExists] = useState(false);

  const publishSchedule = async () => {
    const user = await getUser();
    if (user) {
      toast.promise( storeGeneratedScheduleToDB(user.id, shiftsData),{
        loading: "Publishing schedule...",
        success: () => {
            return 'Schedule published!';
        },
        error: (err) => {
            return "Someting went wrong";
        },
    })
    setScheduleExists(true);
    }
  };

  const onLoadDataRender = async () => {
    const currentUser = await getUser();
    setUserId(currentUser?.id);
    const alreadyExistingData = await getStoredScheduleDataFromDB(currentUser?.id);
    if (alreadyExistingData !== null) {
      const data = await getUserPreferencesForTheBackend(currentUser.id);

      const shifts = filterShifts(alreadyExistingData);
      setSchedule(shifts);
      setRawData(data);
      setShiftsData(alreadyExistingData);
      setHoursRemaining(shifts.remaining_hours);
      setScheduleExists(true);
      setLoading(false);
    } else {
      setScheduleExists(false);
    }
  };

  const fetchAndLogData = async () => {
    setLoading(true);
    const currentUser = await getUser();

    const data = await getUserPreferencesForTheBackend(currentUser.id);
    const res = await fetch("/api/schedule", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const scheduleData = await res.json();
    setRawData(data);
    const shifts = filterShifts(scheduleData);
    setSchedule(shifts);
    setShiftsData(scheduleData);
    setHoursRemaining(shifts.remaining_hours);
    setLoading(false);
  };

  const deleteSchedule = async () => {
    if (!scheduleExists) {
      setSchedule(null);
      toast.success("Schedule deleted!", {
        duration: 800,
      });
      return;
    }

    toast.promise( deleteGeneratedScheduleFromDB(userId),{
      loading: "Deleting shceule...",
      success: () => {
          return 'Schedule deleted!';
      },
      error: (err) => {
          return "Something went wrong";
      },
      duration: 800
  })
    setSchedule(null);
    setScheduleExists(false);
  };

  useEffect(() => {
    onLoadDataRender();
  }, []);
  // fetchAndLogData();
  return Schedule ? (
    <div className=" flex flex-col bg-secondary border shadow-md rounded-lg p-4">
      <div className="flex flex-row justify-between mt-2">
        <h1 className="text-xl text-accent1 py-3">Schedule for this week</h1>
        <div
          className={`rounded-3xl px-4 h-10 flex justify-center items-center align-middle font-bold mr-36 transition-all duration-1000 delay-150 ease-linear ${
            message?.status ? "visible scale-100" : "invisible"
          } `}
        >
          {message?.text}
        </div>

        <button
          className="bg-primary text-white rounded-md p-2 w-30 flex h-10 items-center justify-center mr-10"
          onClick={deleteSchedule}
        >
          Delete Schedule
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className=" ">
            <td className="p-2">Name</td>
            <td className="p-2">Monday</td>
            <td className="p-2">Tuesday</td>
            <td className="p-2">Wednesday</td>
            <td className="p-2">Thursday</td>
            <td className="p-2">Friday</td>
            <td className="p-2">Saturday</td>
            <td className="p-2">Sunday</td>
            <td className="p-2">Total hours</td>
          </tr>
        </thead>
        <tbody>
          <Table
            scheduleData={Schedule}
            options={rawData}
            shiftData={shiftsData}
            setFinalData={setShiftsData}
          />
        </tbody>
      </table>
      <div className="ml-3 mt-2">
        *<span className="text-green-800 font-bold">Green</span>: Shift was
        requested and is fulfilled
      </div>
      <div className="flex flex-row justify-between mt-2">
        <div className="flex text-lg justify-center align-middle items-center">
          Remaining Hours:
          <span className="text-red-500 font-bold"> {hoursRemaining}</span>
        </div>
        <div className="flex">
          <button
            onClick={publishSchedule}
            className="bg-primary text-white rounded-md p-2 w-30 mr-10"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex p-3 items-center justify-between bg-secondary border shadow-md rounded-md">
      <h1>There is no schedule for this week!</h1>
      <div
        className={`rounded-3xl px-4 h-10 flex justify-center items-center align-middle font-bold mr-36 transition-all duration-700 delay-150 ease-linear ${
          message?.status ? "visible scale-100" : "invisible"
        } `}
      >
        {message?.text}
      </div>
      <button
        className={`bg-primary ${
          Loading ? "disabled" : null
        } text-white rounded-md p-2 w-30`}
        onClick={fetchAndLogData}
      >
        {Loading ? (
          <div>
            <ClipLoader size={20} color="white" />
          </div>
        ) : (
          "Generate"
        )}
      </button>
    </div>
  );
};
export default ScheduleTable;
