"use client";
import { timeStampConversion } from "@/lib/utilities";
import { useEffect, useState } from "react";

function ShiftSwapCard({ shift, scheduleData, required, id, day, shiftData }) {
  const [requested, setRequested] = useState();
  const [rawData, setRawData] = useState();
  const [shiftTemp, setShiftTemp] = useState("") 

  useEffect(() => {
    setRequested(required);
    setRawData(scheduleData)
  }, []);

  const changingShift = (e)=>{
    setRequested(false)
    setShiftTemp(e)
    shiftData.schedule.map((val, index)=>{
        if(val.day == day){
            val.shifts.map((shiftVal, x)=>{
               if(shiftVal.id == id){
               }else{
                console.log()
               }
               
            })
        }
    })
  }

  return (
    <div>
        
      {/* <div className="p-2 bg-[#50C878] rounded">{shift?.shift || shift}</div> */}
      <select
        name="shiftSelected"
        value={shiftTemp}
        className={
          requested ?
           `p-2 bg-[#50C878] rounded text-white` :
            "p-2 rounded"
        }
        id=""
        onChange={(e)=>{changingShift(e.target.value)}}
      >
        <option value={shift}>
          {shift?.shift || shift}
        </option>
        {rawData?.shifts
          ?.filter((val) => timeStampConversion(val) !== shift?.shift)
          .map((shift, index) => {
            return (
              <option value={timeStampConversion(shift)}>
                {timeStampConversion(shift)}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default ShiftSwapCard;
