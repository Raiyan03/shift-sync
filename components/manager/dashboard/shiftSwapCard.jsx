"use client";
import { stringToTime, timeStampConversion } from "@/lib/utilities";
import { useEffect, useState } from "react";

function ShiftSwapCard({
  shift,
  scheduleData,
  required,
  id,
  day,
  shiftData,
  empName,
  setFinalData,
  totalHours,
  setTotalHours
}) {
  const [requested, setRequested] = useState();
  const [rawData, setRawData] = useState();
  const [shiftTemp, setShiftTemp] = useState();

  useEffect(() => {
    setRequested(required);
    setRawData(scheduleData);
  }, []);

  const changingShift = (e) => {
    setRequested(false);
    setShiftTemp(e);
    const foundShift = shiftData.schedule
      .find((schedule) => schedule.day === day)
      ?.shifts.find((shift) => shift.id === id);
    if (e !== "NA") {
      if (foundShift === undefined) {
        const newShiftData = shiftData;
        const timeStampShift = stringToTime(e);
        const [startTime, endTime] = timeStampShift;
        const hours = (parseInt(endTime) - parseInt(startTime)) / 3600000;
        newShiftData.schedule[day].shifts.push({
          id: id,
          employee: empName.name,
          requested: false,
          hours: hours,
          shift: timeStampShift,
          custom: true
        });
        setFinalData(newShiftData);
      } else {
        if (e == "") {
          e = shift?.shift;
        }
        const newShiftData = shiftData;
        const timeStampShift = stringToTime(e);
        const [startTime, endTime] = timeStampShift;
        const hours = (parseInt(endTime) - parseInt(startTime)) / 3600000;
        newShiftData.schedule[day].shifts.find(
          (shift) => shift.id == id
        ).shift = timeStampShift;
        newShiftData.schedule[day].shifts.find(
          (shift) => shift.id == id
        ).custom = true;
        newShiftData.schedule[day].shifts.find(
          (shift) => shift.id == id
        ).hours = hours;
        setFinalData(newShiftData);
      }

    }else{
      if(foundShift !== undefined){
        const newShiftData = shiftData;
        const index = newShiftData.schedule[day].shifts.findIndex(obj => obj.id === id)
        if(index !== -1){
          newShiftData.schedule[day].shifts.splice(index, 1);
        } 
        setFinalData(newShiftData)
      }
    }
    //     {
    //         val.shifts.map((shiftVal, x)=>{
    //            if(shiftVal.id == id){
    //               console.log()
    //            }else{
    //             const newArray = [...new Set(val.shifts.filter(i => i.id == id))]
    //             if(newArray.length == 0){
    //               console.log(e)
    //             }
    //            }

    //         })
    //     }
    // })
  };

  return (
    <div>
      {/* <div className="p-2 bg-[#50C878] rounded">{shift?.shift || shift}</div> */}
      <select
        name="shiftSelected"
        value={shiftTemp}
        className={
          requested ? `p-2 bg-[#50C878] rounded text-white w-full` : "p-2 rounded w-full"
        }
        id=""
        onChange={(e) => {
          changingShift(e.target.value);
        }}
      >
        <option value={shift?.shift == "Not Working" ? "NA" : ""}>
          {shift?.shift || shift}
        </option>

        {rawData?.shifts
          ?.filter((val) => timeStampConversion(val) !== shift?.shift)
          .map((shift, index) => {
            return (
              <option key={index} value={timeStampConversion(shift)}>
                {timeStampConversion(shift)}
              </option>
            );
          })}
        {shift?.shift !== "Not Working" ? (
          <option value={"NA"}>Not Working</option>
        ) : (
          ""
        )}
      </select>
    </div>
  );
}

export default ShiftSwapCard;
