"use client";
import React, { useState } from 'react';
import ShiftTable from './components/shift-table';
// Notes: Month doesnt change. Fix employee to shifts assign?

// Created Calendar, that uses employee name and shifts, used chatgpt to fill the rest. But manually set a date as it is not auto
const Calendar = () => {
  const daysInMonth = 31;  // Example for May
  const firstDayIndex = new Date(2024, 4, 1).getDay();  // May 2024 starts on a Wednesday (index 3)
  const [employees, setEmployees] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [shift, setShift] = useState('');
  const [shiftHours, setShiftHours] = useState({
    A: '9am - 5pm',
    B: '5pm - 12am',
    C: '1am - 8am'
  });

  const addEmployee = (e) => {
    e.preventDefault();
    if (employeeName && shift) {
      setEmployees([...employees, { name: employeeName, shift }]);
      setEmployeeName('');
      setShift('');
    }
  };

  const handleHoursChange = (shift, newHours) => {
    setShiftHours({
      ...shiftHours,
      [shift]: newHours
    });
  };

  // This is to create days for employees but may find another way to assign employees to days (ask)
  const createDayCell = (day) => {
    if (!day) return <td key={day} className="border p-2 h-32"></td>;

    return (
      <td key={day} className="border p-2 h-32 align-top">
        <div className="font-bold">{day}</div>
        <div className="mt-1 text-sm p-1 rounded bg-blue-500 text-white">{shiftHours.A}</div>
        <div className="mt-1 text-sm p-1 rounded bg-green-500 text-white">{shiftHours.B}</div>
        <div className="mt-1 text-sm p-1 rounded bg-red-500 text-white">{shiftHours.C}</div>
        {employees.map((employee, index) => (
          <div key={index} className="mt-1 text-sm p-1 rounded bg-gray-500 text-white">
            {employee.name} - Shift {employee.shift}
          </div>
        ))}
      </td>
    );
  };

  const generateCalendar = () => {
    const rows = [];
    let cells = [];
    let day = 1;
    // Used chatgpt to create the basic calendar Java iteration loop
    // Create rows and cells for each day of the month using the outer loop and inner loop
    for (let i = 0; i < 6; i++)  {
      for (let j = 0; j < 7; j++) {
        // Placeholder to loop 7 times for each day of the week
        if (i === 0 && j < firstDayIndex) {
          // I added this creates empty cell for the days before the first week
          cells.push(createDayCell(null));
        } else if (day > daysInMonth) {
          // Also added the last day remaining cells to be filled with empty cell
          cells.push(createDayCell(null));
        } else {
          cells.push(createDayCell(day));
          day++;
        }
      }
      rows.push(<tr key={i}>{cells}</tr>);
      cells = [];
    }
    return rows;
  };

  return (
    <main className="flex-1 p-12 bg-slate-500">
      <div className="p-2">
        <header className="flex justify-between items-center mb-2">
          <button id="prevMonth" className="p-1 bg-gray-300 rounded">&lt;</button>
          <h1 className="text-sm font-bold">May 2024</h1>
          <button id="nextMonth" className="p-1 bg-gray-300 rounded">&gt;</button>
        </header>
        {/* Created Buttons for 3 shifts and filled the rest with chatgpt */}
        <form className="mb-4" onSubmit={addEmployee}>
          <input
            type="text"
            className="border p-2 mr-2 text-black"
            placeholder="Employee Name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
          <button
            type="button"
            className={`p-2 mr-2 ${shift === 'A' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => setShift('A')}
          >
            Shift A
          </button>
          <button
            type="button"
            className={`p-2 mr-2 ${shift === 'B' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
            onClick={() => setShift('B')}
          >
            Shift B
          </button>
          <button
            type="button"
            className={`p-2 mr-2 ${shift === 'C' ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
            onClick={() => setShift('C')}
          >
            Shift C
          </button>
          <button type="submit" className="p-2 bg-gray-500 text-white">Add Employee</button>
        </form>
        <div className="mb-4">
          <h2 className="text-sm font-bold mb-2">Manage Shift Hours</h2>
          <div className="mb-2">
            <label className="mr-2">Shift A:</label>
            <input
              type="text"
              className="border p-2 text-black"
              value={shiftHours.A}
              onChange={(e) => handleHoursChange('A', e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="mr-2">Shift B:</label>
            <input
              type="text"
              className="border p-2 text-black"
              value={shiftHours.B}
              onChange={(e) => handleHoursChange('B', e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="mr-2">Shift C:</label>
            <input
              type="text"
              className="border p-2 text-black"
              value={shiftHours.C}
              onChange={(e) => handleHoursChange('C', e.target.value)}
            />
          </div>
        </div>
        <table className="w-full border-collapse bg-white text-xs">
          <thead>
            <tr>
              <th className="border p-2 text-black">Sun</th>
              <th className="border p-2 text-black">Mon</th>
              <th className="border p-2 text-black">Tue</th>
              <th className="border p-2 text-black">Wed</th>
              <th className="border p-2 text-black">Thu</th>
              <th className="border p-2 text-black">Fri</th>
              <th className="border p-2 text-black">Sat</th>
            </tr>
          </thead>
          <tbody>
            {generateCalendar()}
          </tbody>
        </table>
        <ShiftTable />
      </div>
    </main>
  );
};

export default Calendar;
