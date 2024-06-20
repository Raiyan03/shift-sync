"use client";
import { updateShifts } from "@/app/lib/utilities";
import React, { useEffect, useState } from "react";
import { MdApps } from "react-icons/md";

function ShiftConfig() {
  const [shifts, setShifts] = useState([{}]);
  const [openTime, setOpenTime] = useState();
  const [closeTime, setCloseTime] = useState();
  const [opens24, setOpen24] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hoursOfOperation, setHoursOfOperation] = useState();

  const addShifts = () => {
    setShifts([...shifts, {}]);
  };
  const removeShift = (index) => {
    const newShifts = shifts.filter((_, i) => i !== index);
    setShifts(newShifts);
  };

  const handleChanges = (e, index) => {
    const newShifts = [...shifts];
    newShifts[index][e.target.name] = e.target.value;
    setShifts(newShifts);
    console.log(shifts);
  };

  const convert12 = (time) => {
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    // Determine the period (AM or PM)
    const period = hours >= 12 ? "AM" : "PM";

    // Adjust the hours for 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0, set it to 12

    // Format the hours and minutes to be always two digits
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // Return the formatted time
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  const SubmitShifts = async () => {
    const finalArray = [];

    shifts.map((shift, index) => {
      finalArray.push(
        `${convert12(shift.shiftStart)} - ${convert12(shift.shiftClose)}`
      );
    });

    updateShifts("Ace Liquor", finalArray);
  };

  return (
    <div className="flex flex-col bg-bgSoft p-5 rounded-lg gap-2.5">
      <div className="flex gap-3">
        <MdApps size={32} />
        <h2 className="text-xl">Shift Config</h2>
      </div>
      <div>
        <h2>Configure the required shifts:</h2>
      </div>
      <div className="flex flex-col p-[10px] gap-2">
        {/* <span className="flex gap-2 justify-around">
          <label>Does Your Store Operates for 24 Hours ?:</label>
          <input
            type="checkbox"
            value={opens24}
            onChange={(e) => {
              if (e.target.checked) {
                setOpen24("on");
              } else {
                setOpen24("off");
              }
            }}
          />
        </span> */}
        {opens24 == null ? null : (
          <>
            <span className="flex gap-2 justify-around">
              <label>Open Time:</label>
              <input
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
                type="time"
                className="bg-transparent border-bg border-2 rounded-xl w-28"
              />
            </span>
            <span className="flex gap-2 justify-around">
              <label>Close Time:</label>
              <input
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                type="time"
                className="bg-transparent border-bg border-2 rounded-xl w-28"
              />
            </span>
          </>
        )}
        {/* <span className="flex gap-2 justify-around">
          <label>Hours of Operation:</label>
          <input
            type="number"
            className="bg-transparent border-bg border-2 rounded-xl w-20"
            max={24}
            min={0}
          />
        </span> */}

        <button
          className="flex hover:bg-teal-700 transition-transform delay-900 bg-teal-900 w-20 items-center justify-center m-auto p-[3px] rounded-[13px]"
          onClick={addShifts}
        >
          Add Shift
        </button>
        {/* {error && setInterval(()=>setError(false),3000) && (
          <div className="text-center justify-center items-center mb-3 bg-red-600 py-2 mx-auto w-[300px] rounded-xl transition ease-in-out delay-150 duration-100">
            Invalid Shifts
          </div>
        )} */}
        {
        success && setInterval(() => setSuccess(false), 3000) && 
        (
          <div className="text-center justify-center items-center mb-3 bg-green-600 py-2 mx-auto w-[300px] rounded-xl transition ease-in-out delay-150 duration-100">
            Shifts Updated Successfully
          </div>
        )}
        {shifts.map((shift, index) => (
          <div
            key={index}
            className="transition-all delay-500 duration-1000 border p-4 rounded-2xl border-teal-900"
          >
            <h2 className="text-lg text-center">Shift: {index + 1}</h2>
            <div className="flex items-end space-x-4 pb-4 pt-2">
              <span className="flex gap-2 justify-around">
                <label>Shift Start:</label>
                <input
                  value={shift.shiftStart}
                  name={`shiftStart`}
                  onChange={(e) => handleChanges(e, index)}
                  type="time"
                  className="bg-transparent border-bg border-2 rounded-xl w-28"
                  step="1800"
                  required
                />
              </span>
              <span className="flex gap-2 justify-around">
                <label>Shift Close:</label>
                <input
                  name={`shiftClose`}
                  value={shift.closeTime}
                  onChange={(e) => handleChanges(e, index)}
                  type="time"
                  min={shift.shiftStart}
                  className="bg-transparent border-bg border-2 rounded-xl w-28"
                  step="1800"
                  required
                />
              </span>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeShift(index)}
                  className="justify-center items-center align-middle bg-teal-900 p-1 rounded-md hover:bg-red-700 transition duration-100"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          className="flex  hover:bg-teal-700 transition-transform delay-900 bg-teal-900 items-center justify-center m-auto p-2 rounded-[13px]"
          onClick={SubmitShifts}
        >
          Submit Shifts
        </button>
      </div>
    </div>
  );
}

export default ShiftConfig;
