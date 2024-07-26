"use client";
import { useState, useEffect } from "react";
import { getUser } from "@/action/actions";
import { getScheduleData } from "@/app/lib/utilities";
import { getShiftDataFromDB } from "@/data/shift";

export default function Evaluation({ scheduleData }) {
  const [employeeData, setEmployeeData] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [totalHours, setTotalHours] = useState(null);
  //   const [selectedDays, setSelectedDays] = useState({
  //     Monday: false,
  //     Tuesday: false,
  //     Wednesday: false,
  //     Thursday: false,
  //     Friday: false,
  //     Saturday: false,
  //     Sunday: false,
  //   });
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();
        // const schedule = await getScheduleData(userData.id);
        const data = await getShiftDataFromDB(userData?.id);
        setEmployeeData(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
    setTotalHours(null);
  };

  const handleDayToggle = (day) => {
    setSelectedDays((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  const handleDaySelection = (day) => {
    setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
    setTotalHours(0);
  };

  const calculateShiftHours = () => {
    if (!selectedEmployee) return;
    let hours = 0;
    selectedDays.forEach((day) => {
        employeeData.schedule[day].shifts.forEach((shift) => {
        if (shift.employee === selectedEmployee) {
          hours += shift.hours;
        }
      });
    });
    setTotalHours(hours);

    // if (employee) {
    //   const total = Object.keys(selectedDays).reduce((acc, day) => {
    //     if (selectedDays[day] && employee.shiftPref[day]) {
    //       const shift = employee.shiftPref[day];
    //       const [start, end] = shift.split(",");
    //       const startDate = new Date(`1970-01-01T${start}:00`);
    //       const endDate = new Date(`1970-01-01T${end}:00`);
    //       const hours = (endDate - startDate) / 3600000;
    //       return acc + hours;
    //     }
    //     return acc;
    //   }, 0);
    //   setTotalHours(total);
    // } else {
    //   setTotalHours(0);
    // }
  };
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Select Employee</h2>
        <select
          value={selectedEmployee}
          onChange={handleEmployeeChange}
          className="p-2 border rounded-md"
        >
          <option value="" disabled>
            Select an employee
          </option>
          {/* {employeeData.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                            {employee.name}
                        </option>
                    ))} */}
          {employeeData
            ? [
                ...new Set(
                  employeeData.schedule.flatMap((day) =>
                    day.shifts.map((shift) => shift.employee)
                  )
                ),
              ].map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))
            : " "}
        </select>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Select Days</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {weekDays.map((day, x) => (
            // <button
            //   key={day}
            //   onClick={() => handleDayToggle(day)}
            //   className={`px-4 py-2 border rounded-lg ${
            //     selectedDays[day]
            //       ? "bg-green-500 text-white"
            //       : "bg-white text-black"
            //   }`}
            // >
            //   {day}
            // </button>
            <div key={x}>
            <input type="checkbox" id={`day${x}`} checked={selectedDays.includes(x)} onChange={()=> handleDaySelection(x)} />
            <label className="m-2" htmlFor={`day${x}`}>{day}</label>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={calculateShiftHours}
        className="px-4 py-2 bg-blue-500 text-white border-none rounded-md"
      >
        Calculate Shift Hours
      </button>
      {totalHours > 0 && (
        <div className="mt-4">
          <h2 >Employee Hours</h2>
          <p>Employee: <span className="text-blue-500"></span></p>
          <p>Total Hours: <span className="text-blue-500">{totalHours}</span></p>
        </div>
      )}
      {/* {totalHours !== null && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Total Hours</h2>
          <div>{totalHours.toFixed(2)}</div>
        </div>
      )} */}
    </div>
  );
}
