// comps/ShiftHoursForm.jsx
import React from 'react';

const ShiftHoursForm = ({ shiftHours, handleHoursChange }) => {
  return (
    <div className="mb-4">
      <h2 className="text-sm font-bold mb-2">Manage Shift Hours</h2>
      <div className="mb-2">
        <label className="mr-2">Shift A:</label>
        <input
          type="text"
          className="border p-2 text-black rounded"
          value={shiftHours.A}
          onChange={(e) => handleHoursChange('A', e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="mr-2">Shift B:</label>
        <input
          type="text"
          className="border p-2 text-black rounded"
          value={shiftHours.B}
          onChange={(e) => handleHoursChange('B', e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="mr-2">Shift C:</label>
        <input
          type="text"
          className="border p-2 text-black rounded"
          value={shiftHours.C}
          onChange={(e) => handleHoursChange('C', e.target.value)}
        />
      </div>
    </div>
  );
};

export default ShiftHoursForm;
