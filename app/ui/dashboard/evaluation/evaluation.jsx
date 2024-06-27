import React, { useState } from 'react';
/*
 This code generated by CHATGPT 4.0
 passed in the entire code to GPT to read the json object efficiently
*/
import './evaluation.css';
export default function Evaluation({ scheduleData}) {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [totalHours, setTotalHours] = useState(0);

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
    setTotalHours(0);
  };

  const handleDaySelection = (day) => {
    setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
    setTotalHours(0);
  };

  const calculateShiftHours = () => {
    let hours = 0;
    selectedDays.forEach(day => {
      scheduleData.schedule[day].shifts.forEach(shift => {
        if (shift.employee === selectedEmployee) {
          hours += shift.hours;
        }
      });
    });
    setTotalHours(hours);
  };

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="container">
      <div className="box">
        <div className="inputGroup">
          <label htmlFor="employeeName">Employee Name:</label>
          <select id="employeeName" value={selectedEmployee} onChange={handleEmployeeChange}>
            <option value="">Select an employee</option>
            {/* Using Set to ensure unique employee names and mapping to options */}
            {[...new Set(scheduleData.schedule.flatMap(day => day.shifts.map(shift => shift.employee)))].map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className="checkboxGroup">
          <label>Select Days:</label>
          {weekDays.map((day, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`day${index}`}
                checked={selectedDays.includes(index)}
                onChange={() => handleDaySelection(index)}
              />
              <label className=' m-2' htmlFor={`day${index}`}>{day}</label>
            </div>
          ))}
        </div>
        <button className="calculateButton" onClick={calculateShiftHours}>
          Calculate Shift Hours
        </button>
      </div>
      {totalHours > 0 && (
        <div className="resultBox">
          <h2>Employee Hours</h2>
          <p>Employee: {selectedEmployee}</p>
          <p>Total Hours: {totalHours}</p>
        </div>
      )}
    </div>
  );
  
}
