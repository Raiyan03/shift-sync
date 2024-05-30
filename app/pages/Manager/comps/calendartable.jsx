import React from 'react';

const CalendarTable = ({ daysInMonth, firstDayIndex, employees, shiftHours }) => {
  const createDayCell = (day) => {
    if (!day) return <td key={day} className="border p-2 h-32"></td>;

    return (
        // shift hours and employees
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
    for (let i = 1; i < 2; i++)  {
      // Loop 6 can be 7 rows
      for (let j = 0; j < 7; j++) {
        // Loop 7 times for each day of the week (7 days for 1 week)
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
  );
};

export default CalendarTable;
