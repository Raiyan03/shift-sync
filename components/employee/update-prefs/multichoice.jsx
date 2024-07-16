import React, { useState } from 'react';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const MultiChoiceDrop = () => {
  const [selectedDays, setSelectedDays] = useState([]);

  const handleSelectChange = (event, day) => {
    const { options } = event.target;
    const selectedDays = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedDays(selectedDays);
  };

  return (
    <div>
      {daysOfWeek.map((day) => (
        <div key={day}>
          <label htmlFor={day}>{day}</label>
          <select
            id={day}
            multiple
            onChange={(e) => handleSelectChange(e, day)}
            value={selectedDays}
          >
            <option value="Option 1">Shift 1</option>
            <option value="Option 2">Shift 2</option>
            <option value="Option 3"><Shift></Shift> 3</option>
            {/* Add more options as needed */}
          </select>
        </div>
      ))}
    </div>
  );
};

export default MultiChoiceDrop;
