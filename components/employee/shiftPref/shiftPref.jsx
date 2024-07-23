"use client";
import { getUser } from "@/action/actions";
import { getShiftData, getShiftDataForTheUser } from "@/data/shift";
import { convertTimeStamp, newConvertTimeStamp, timeStampConversion, updateShiftForUser } from "@/lib/utilities";
import { use, useEffect, useState } from "react";
import Shift from "@/components/employee/shiftPref/shift"

function ShiftPref() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [mon, setMon] = useState("any");
  const [tue, setTue] = useState("any");
  const [thu, setThu] = useState("any");
  const [wed, setWed] = useState("any");
  const [fri, setFri] = useState("any");
  const [sat, setSat] = useState("any");
  const [sun, setSun] = useState("any");
  const [userData, setUserData] = useState();
  const [shiftData, setShiftData] = useState();
  const [scheduleData, setScheduleData] = useState();

  const updateShift = async (data) => {
    const ret = await updateShiftForUser(userData?.id, data);
    // console.log(data)
  };


  const handleSubmit = async (e)=>{
    e.preventDefault();
    const splitMean = (string) => {
      if (string == "any") return string;
      const myArray = string.split("-");
      const shiftArray = myArray[1];
      return shiftArray;
    };

    const data = {
      mon: splitMean(mon),
      tue: splitMean(tue),
      wed: splitMean(wed),
      thu: splitMean(thu),
      fri: splitMean(fri),
      sat: splitMean(sat),
      sun: splitMean(sun),
    };
    updateShift(data)
  }

  const fetch = async () => {
    const token = await getUser();
    if (token) {
      setUserData(token);
    }
    const data = await getShiftData(token.id);
    setShiftData(data);
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
      {days.map((day, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-lg font-semibold m-2">{day}</label>
              <Shift shiftData={shiftData} day={day} setPreference={eval(`set${day}`)} />
            </div>
          ))}
      <button
          type="submit"
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full sm:w-auto m-4 w-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ShiftPref;
