//Standard imports
import React from "react";
//import { convertTimeStamp } from "../lib/utilities"
import { getShiftData } from "../../../data/shift"

const AvbSelector = ({ options, value, onChange }) => {
    return (
      <select value={value} onChange={onChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

export default AvbSelector
//Takes on:
//Day value (0 = Mon, 6 = Sun)
//Will set value back to 'int' based on shifts
//shiftData = getShiftData(empID) 
//shiftData.shifts.size is amount of options
//converTimeStamp(shiftData.shifts[0]) and so on for each option