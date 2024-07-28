import { useEffect, useState } from "react";
import ShiftSwapCard from "./shiftSwapCard";
const Table = ({ scheduleData, options, shiftData, setFinalData }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return scheduleData.result.map((employee, index) => {
    const [totalHours, setTotalHours] = useState(0);
    var temp = 0
    employee.shifts.map((val,x)=>{
      temp += parseInt(val?.hours)
    })
    return (
      <tr key={index} className="bg-white">
        <td className="px-3 py-2">{employee.name}</td>
        {employee?.shifts?.map((shift, index) => {
          return shift.requested ? (
            // Applying larger margins and a subtle shadow for separation and emphasis
            <td key={index} className=" m-1 ">
              <ShiftSwapCard
                shift={shift}
                required={shift.requested}
                scheduleData={options}
                id={shift?.id}
                day={index}
                shiftData={shiftData}
                empName={employee}
                setFinalData={setFinalData}
                totalHours={totalHours}
                setTotalHours={setTotalHours}
              />
            </td>
          ) : (
            // Consistent padding and margin for non-working cells
            <td key={index} className=" py-2 m-1">
              <ShiftSwapCard
                shift={shift}
                required={shift.requested}
                scheduleData={options}
                id={shift?.id}
                day={index}
                shiftData={shiftData}
                empName={employee}
                setFinalData={setFinalData}
                totalHours={totalHours}
                setTotalHours={setTotalHours}
              />
            </td>
          );
        })}
        <td className="px-3 py-2 text-center">{temp}</td>
      </tr>
    );
  });
};

export default Table;
