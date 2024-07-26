"use client"
import { newConvertTimeStamp } from "@/lib/utilities";
import React, { useState } from "react";

function Shift({ shiftData, setPreference, day }) {
  const [pref, setPref] = useState();
  return (
    <select
      className="w-1/12"
      name={day}
      value={pref}
      onChange={(e) => {
        setPreference(e.target.value);
      }}
      required
    >
      <option value="any" className="" disabled selected>
        Select your shift preference
      </option>
      <option value="any">Any Shift</option>
      {shiftData?.shifts?.map((val, x) => {
        return (
          <option value={`${day}-${x}`}>{newConvertTimeStamp(val)}</option>
        );
      })}
      <option value="NA">Not Available</option>
    </select>
  );
}

export default Shift;
