"use client";

import React, { useState } from 'react';
import './evaluation.css';

/*
 This code generated by CHATGPT 4.0
 Then made edits to correspond with css
*/

export default function Evaluation({ scheduleData }) {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [totalHours, setTotalHours] = useState(0);

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
    setTotalHours(0);
  };

  const handleDaySelection = (dayIndex) => {
    setSelectedDays(prev => 
      prev.includes(dayIndex) ? prev.filter(d => d !== dayIndex) : [...prev, dayIndex]
    );
    setTotalHours(0);
  };

  const calculateShiftHours = () => {
    let hours = 0;
    selectedDays.forEach(day => {
      scheduleData.schedule[weekDays[day]].shifts.forEach(shift => {
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
              <button
                type="button"
                className={selectedDays.includes(index) ? 'selected' : ''}
                onClick={() => handleDaySelection(index)}
              >
                {day.slice(0, 3)}
              </button>
            </div>
          ))}
        </div>
        <button className="calculateButton" onClick={calculateShiftHours}>
          Calculate Shift
Hours
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