"use client";
//GPT 4.0 via POE
import React, { useState, useEffect } from 'react';
import QrCodeComponent from './qr-code';
import scheduleData from '../../../components/manager/evaluation/scheduleData.json';
import './loader.css';

export default function QrGenerate() {
  const [qrValue, setQrValue] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [timer, setTimer] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeNotFound, setEmployeeNotFound] = useState(false); // State to track employee not found

  const handleEmployeeChange = (event) => {
    const selectedEmployeeName = event.target.value;

    // Check if selectedEmployeeName exists in scheduleData
    const isValidEmployee = isEmployeeValid(selectedEmployeeName);

    if (isValidEmployee) {
      setSelectedEmployee(selectedEmployeeName);
      setQrValue(''); // Clear QR value when the selected employee changes
      setTimer(10); // Reset timer when the selected employee changes
      setIsLoading(true); // Start loading
      setEmployeeNotFound(false); // Reset employee not found state

      setTimeout(() => {
        setIsLoading(false); // End loading after verification
      }, 1000); // Simulate a delay for verification
    } else {
      // Handle case where selected employee is not valid
      console.log(`Employee '${selectedEmployeeName}' is not in scheduleData.`);
      setSelectedEmployee('');
      setQrValue('');
      setTimer(10);
      setIsLoading(false);
      setEmployeeNotFound(true); // Set employee not found state to true
    }
  };

  const generateQrValue = (employee) => {
    return `Welcome ${employee}`;
  };

  const handleGenerateClick = () => {
    if (selectedEmployee) {
      const newQrValue = generateQrValue(selectedEmployee);
      setQrValue(newQrValue);
      setTimer(10); // Reset timer
    }
  };

  useEffect(() => {
    let intervalId;

    if (selectedEmployee) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            const newQrValue = generateQrValue(selectedEmployee);
            setQrValue(newQrValue);
            return 10; // Reset timer
          }
          return prevTimer - 1;
        });
      }, 1000); // Decrease timer every second
    }

    return () => clearInterval(intervalId); // Cleanup on unmount or when selectedEmployee changes
  }, [selectedEmployee]);

  const isEmployeeValid = (employeeName) => {
    const employeeNames = Array.from(new Set( // Use Set to ensure uniqueness
      scheduleData.schedule.flatMap(day => day.shifts.map(shift => shift.employee))
    ));
    return employeeNames.includes(employeeName);
  };

  // Extract unique employee names from scheduleData
  const employeeNames = Array.from(new Set(
    scheduleData.schedule.flatMap(day => day.shifts.map(shift => shift.employee))
  ));

  return (
    <div className="flex flex-col items-center mt-8">
      <select
        value={selectedEmployee}
        onChange={handleEmployeeChange}
        className="bg-white border border-gray-300 p-2 rounded mb-4"
      >
        <option value="" disabled>Select an employee</option>
        {employeeNames.map((name, index) => (
          <option key={index} value={name}>{name}</option>
        ))}
      </select>
      {employeeNotFound && ( // Display message if employee not found
        <p className="text-red-500 mb-2">Employee not found</p>
      )}
      {isLoading ? (
        <div className="loader mb-4"></div>
      ) : (
        <button
          onClick={handleGenerateClick}
          className="bg-blue-500 text-white p-2 rounded mb-4"
          disabled={!selectedEmployee}
        >
          Generate QR Code
        </button>
      )}
      {qrValue && (
        <div className="flex flex-col items-center">
          <QrCodeComponent value={qrValue} />
          <p className="text-gray-700 mt-4">{qrValue}</p>
          <p className="text-gray-500 mt-2">Next refresh in: {timer} seconds</p>
        </div>
      )}
    </div>
  );
}
