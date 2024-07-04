"use client";
import { getUser } from "@/action/actions";
import { updateShifts } from "@/lib/utilities";
import { getUserData } from "@/data/shift";
import React, { useEffect, useState } from "react";
import { MdApps } from "react-icons/md";

function ShiftConfig({ id }) {
  const [shifts, setShifts] = useState([{ shiftStart: "", shiftClose: "" }]);
  const [openTime, setOpenTime] = useState();
  const [closeTime, setCloseTime] = useState();
  const [opens24, setOpen24] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hoursOfOperation, setHoursOfOperation] = useState();
  const [hoursOfOperationP, setHoursOfOperationP] = useState();

  const getAndLogShiftData = async () => {
    const user = await getUser();
    const shiftData = await getUserData(user.id);
    console.log(shiftData);
    setHoursOfOperationP(shiftData.hour_bank);

    shiftData.shifts.map((shift, index) => {
      let [start, end] = shift.split(",");

      const startDate = new Date(parseInt(start, 10));

      let startHours = startDate.getHours();
      let startMin = parseInt("0" + startDate.getMinutes(), 10);

      const startformattedHours =
        startHours < 10 ? "0" + startHours : startHours;
      const startformattedMinutes = startMin < 10 ? "0" + startMin : startMin;

      let startTime =
        startformattedHours + ":" + startformattedMinutes.substr(-2);


        const endDate = new Date(parseInt(end, 10));

        let endHours = endDate.getHours();
        let endMin = parseInt("0" + endDate.getMinutes(), 10);
  
        const endformattedHours =
          endHours < 10 ? "0" + endHours : endHours;
        const endformattedMinutes = endMin < 10 ? "0" + endMin : endMin;
  
        let endTime =
        endformattedHours + ":" + endformattedMinutes.substr(-2);

        const newShift = [...shifts];
      if (newShift[index]) {
        newShift[index][`shiftStart`] = startTime;
        newShift[index][`shiftClose`] = endTime;
      }else{
        newShift[index] = {
          ['shiftStart']: startTime,
          ['shiftClose']: endTime
        }

      }
      setShifts(newShift);
    });
  };

  useEffect(() => {
    getAndLogShiftData();
  }, []);

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
  };

  const timeStamp = (time) => {
    const dateObj = new Date();

    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    dateObj.setMinutes(minutes);
    dateObj.setHours(hours);

    return dateObj.valueOf();
  };

  const SubmitShifts = async () => {
    const finalArray = [];

    shifts.map((shift, index) => {
      finalArray.push(
        `${timeStamp(shift.shiftStart)},${timeStamp(shift.shiftClose)}`
      );
    });
    await updateShifts(id, finalArray, parseInt(hoursOfOperation));
  };

  return (
    <div className="flex flex-col border shadow-md p-5 rounded-lg gap-2.5 ">
      <div className="flex gap-3">
        <MdApps size={32} />
        <h2 className="text-xl">Shift Config</h2>
      </div>
      <div>
        <h2>Configure the required shifts:</h2>
        <span className="flex gap-2 justify-center">
          <label>Hour Bank:</label>
          <input
            value={hoursOfOperation}
            onChange={(e) => setHoursOfOperation(e.target.value)}
            type="number"
            className="bg-transparent border-primary border-2 rounded-md w-28"
            placeholder={hoursOfOperationP}
          />
        </span>
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
                className="bg-transparent border-primary border-2 rounded-md w-28"
              />
            </span>
            <span className="flex gap-2 justify-around">
              <label>Close Time:</label>
              <input
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                type="time"
                className="bg-transparent border-primary border-2 rounded-md w-28"
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
          className="flex  transition-transform delay-900 bg-primary text-white items-center justify-center m-auto p-[3px] rounded-md"
          onClick={addShifts}
        >
          Add Shift
        </button>
        {/* {error && setInterval(()=>setError(false),3000) && (
          <div className="text-center justify-center items-center mb-3 bg-red-600 py-2 mx-auto w-[300px] rounded-xl transition ease-in-out delay-150 duration-100">
            Invalid Shifts
          </div>
        )} */}
        {success && setInterval(() => setSuccess(false), 3000) && (
          <div className="text-center justify-center items-center mb-3 bg-green-600 py-2 mx-auto w-[300px] rounded-xl transition ease-in-out delay-150 duration-100">
            Shifts Updated Successfully
          </div>
        )}
        {shifts.map((shift, index) => (
          <div
            key={index}
            className="transition-all items delay-500 duration-1000 border p-4 rounded-2xl border-primary"
          >
            <h2 className="text-lg text-center">Shift: {index + 1}</h2>
            <div className="flex justify-around space-x-4 pb-4 pt-2">
              <span className="flex gap-2 justify-around">
                <label>Shift Start:</label>
                <input
                  value={shift.shiftStart}
                  name={`shiftStart`}
                  onChange={(e) => handleChanges(e, index)}
                  type="time"
                  className="bg-transparent border-primary border-2 rounded-md w-28"
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
                  className="bg-transparent border-primary border-2 rounded-md w-28"
                  step="1800"
                  required
                />
              </span>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeShift(index)}
                  className="justify-center items-center align-middle bg-primary text-white p-3 rounded-md hover:bg-red-500 transition duration-100 ease-in"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          className="flex transition-transform delay-900 bg-primary text-white items-center justify-center m-auto p-2 rounded-md"
          onClick={SubmitShifts}
        >
          Submit Shifts
        </button>
      </div>
    </div>
  );
}

export default ShiftConfig;