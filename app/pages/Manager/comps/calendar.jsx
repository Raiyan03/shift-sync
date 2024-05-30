// comps/Calendar.jsx
import React, { useState } from 'react';
import DateButton from './datebutton';
import EmployeeForm from './EmployeeForm';
import ShiftHoursForm from './ShiftHoursForm';
import CalendarTable from './CalendarTable';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 4));
  const [employees, setEmployees] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [shift, setShift] = useState('');
  const [shiftHours, setShiftHours] = useState({
    A: '9am - 5pm',
    B: '5pm - 12am',
    C: '1am - 8am'
  });

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

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

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <main className="flex-1 p-12 bg-slate-500">
      <div className="p-2">
        <DateButton
          currentDate={currentDate}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
        />
        <EmployeeForm
          employeeName={employeeName}
          setEmployeeName={setEmployeeName}
          shift={shift}
          setShift={setShift}
          addEmployee={addEmployee}
        />
        <ShiftHoursForm
          shiftHours={shiftHours}
          handleHoursChange={handleHoursChange}
        />
        <CalendarTable
          daysInMonth={daysInMonth}
          firstDayIndex={firstDayIndex}
          employees={employees}
          shiftHours={shiftHours}
        />
      </div>
    </main>
  );
};

export default Calendar;
