"use client";

/**
 * After adding a new employee upon hirement the manager sits one on one to add them
 * Employee asks for emp side access on their phone:
 * 
 * Relocate to QR code component on sidebar 
 * ...
 * - Fetches employee data from the backend on mount.
 * - Allows the user to select an employee from a dropdown.
 * - Validates the selected employee and updates the QR code value.
 *   ^ this is to make sure that the employee is in the system after adding a new employee
 * - Generates a QR code with a unique URL and message.
 * - Refreshes the QR code every 60 seconds. (qr code will only change if a unique identifier is enlisted on the domain (example.com/{randomString}) etc...)
 * - QR code will take the emp to the emp side or any domain
 */

import React, { useState, useEffect } from 'react';
import QrCodeComponent from './qr-code';
import './loader.css';
import { getUser } from "@/action/actions";
import { getEmployeeData } from "@/lib/utilities";

export default function QrGenerate() {
  const [qrValue, setQrValue] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [timer, setTimer] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeNotFound, setEmployeeNotFound] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeNames, setEmployeeNames] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const userData = await getUser();
      const employees = await getEmployeeData(userData.id);
      const employeeNames = employees.map(employee => employee.name);
      setEmployeeNames(employeeNames);
    };

    fetchEmployees();
  }, []);

  const handleEmployeeChange = (event) => {
    const selectedEmployeeName = event.target.value;

    // Validate selectedEmployeeName in employeeNames
    // add loading state to show that the employee is being validated
    // if employee is not in system, console.log employee is not in employee list
    const isValidEmployee = isEmployeeValid(selectedEmployeeName);

    if (isValidEmployee) {
      setSelectedEmployee(selectedEmployeeName);
      setEmployeeName(selectedEmployeeName);
      setQrValue('');
      setTimer(60);
      setIsLoading(true);
      setEmployeeNotFound(false);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      console.log(`Employee '${selectedEmployeeName}' is not in the employee list.`);
      setSelectedEmployee('');
      setEmployeeName('');
      setQrValue('');
      setTimer(60);
      setIsLoading(false);
      setEmployeeNotFound(true);
    }
  };

  // Generate a random string to append to the QR code value?
  // May change if the QR is being hosted on a domain etc...
  const generateRandomString = () => {
    return Math.random().toString(36).substring(7);
  };

  const generateQrValue = (employee) => {
    const randomString = generateRandomString();
    const url = `https://www.example.com/}`; //https://www.example.com/{randomString} (this changes the qr code symbol if a unique id is needed)
    return `${url}?message=Welcome%20${encodeURIComponent(employee)}`;
  };

  const handleGenerateClick = () => {
    if (selectedEmployee) {
      const newQrValue = generateQrValue(selectedEmployee);
      setQrValue(newQrValue);
      setTimer(60);
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
            return 60;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [selectedEmployee]);

  const isEmployeeValid = (employeeName) => {
    return employeeNames.includes(employeeName);
  };

  return (
    <div className="flex flex-col items-center mt-2">
      <select
        value={selectedEmployee}
        onChange={handleEmployeeChange}
        className="bg-white border border-white-300 p-2 rounded mb-2"
      >
        <option value="" disabled>Select an employee</option>
        {employeeNames.map((name, index) => (
          <option key={index} value={name}>{name}</option>
        ))}
      </select>
      {employeeNotFound && (
        // emp not found
        // 
        <p className="text-red-500 mb-2">Employee not found</p>
      )}
      {isLoading ? (
        <div className="loader mb-4"></div>
      ) : (
        <button
          onClick={handleGenerateClick}
          className="bg-blue-500 text-white p-2 rounded mt-4 mb-6"
          disabled={!selectedEmployee}
        >
          Generate QR Code
        </button>
      )}
      {qrValue && (
        <div className="flex flex-col items-center">
          <div className="border-2 border-black p-2 rounded">
            <QrCodeComponent value={qrValue} />
          </div>
          <p className="text-blue-500 mt-6">Welcome {employeeName}</p>
          <p className="text-gray-500 mt-2">Scan the QR Code to get Started!</p>
          <p className="text-gray-500 mt-2">Next refresh in: {timer} seconds</p>
        </div>
      //    <p className="text-gray-700 mt-4">Welcome to Shift Sync{employeeName}!</p>
      //    <p className="text-gray-700 mt-2">Scan the QR Code to get Started!</p>
      //    <p className="text-gray-700 mt-2">Next refresh in: {timer} seconds</p>
      //  </div>
      )}
    </div>
  );
}
