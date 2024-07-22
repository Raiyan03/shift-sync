"use client";

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
      const employeeNames = employees.map(employee => employee.name); // Adjust based on the actual structure of the employee data
      setEmployeeNames(employeeNames);
    };

    fetchEmployees();
  }, []);

  const handleEmployeeChange = (event) => {
    const selectedEmployeeName = event.target.value;

    // Validate selectedEmployeeName in employeeNames
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

  const generateRandomString = () => {
    return Math.random().toString(36).substring(7);
  };

  const generateQrValue = (employee) => {
    const randomString = generateRandomString();
    const url = `https://www.example.com/}`;
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
        className="bg-white border border-gray-300 p-2 rounded mb-2"
      >
        <option value="" disabled>Select an employee</option>
        {employeeNames.map((name, index) => (
          <option key={index} value={name}>{name}</option>
        ))}
      </select>
      {employeeNotFound && (
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
          <div className="border-2 border-black p-2 rounded">
            <QrCodeComponent value={qrValue} />
          </div>
          <p className="text-gray-500 mt-2">Welcome {employeeName}</p>
          <p className="text-gray-500 mt-2">Scan the QR Code to get Started!</p>
          <p className="text-gray-500 mt-2">Next refresh in: {timer} seconds</p>
        </div>
      )}
    </div>
  );
}
