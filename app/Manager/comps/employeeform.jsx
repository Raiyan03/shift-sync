// comps/EmployeeForm.jsx
import React from 'react';

const EmployeeForm = ({ employeeName, setEmployeeName, shift, setShift, addEmployee }) => {
  return (
    <form className="mb-4" onSubmit={addEmployee}>
      <input
        type="text"
        className="border p-2 mr-2 text-black rounded"
        placeholder="Employee Name"
        value={employeeName}
        onChange={(e) => setEmployeeName(e.target.value)}
      />
      <button
        type="button"
        className={`p-2 mr-2 rounded ${shift === 'A' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        onClick={() => setShift('A')}
      >
        Shift A
      </button>
      <button
        type="button"
        className={`p-2 mr-2 rounded ${shift === 'B' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
        onClick={() => setShift('B')}
      >
        Shift B
      </button>
      <button
        type="button"
        className={`p-2 mr-2 rounded ${shift === 'C' ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
        onClick={() => setShift('C')}
      >
        Shift C
      </button>
      <button type="submit" className="p-2 rounded bg-gray-500 text-white">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;
