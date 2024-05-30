import React from 'react';

const DateButton = ({ currentDate, handlePrevMonth, handleNextMonth }) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <button id="prevMonth" className="p-1 bg-gray-300 rounded" onClick={handlePrevMonth}>&lt;</button>
      {/*Current date*/}
      <h1 className="text-sm font-bold">{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h1>
      <button id="nextMonth" className="p-1 bg-gray-300 rounded" onClick={handleNextMonth}>&gt;</button>
    </div>
  );
};

export default DateButton;
