import React, { useState, useEffect } from "react";
import styles from "./evaluation.css";
import employeeData from "./employees.json"; // Adjust the path to your JSON file
// Reference: CHAT GPT
export default function Evaluation() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedDays, setSelectedDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });
  const [totalHours, setTotalHours] = useState(0); // Initialize with 0 instead of null
  const [showResult, setShowResult] = useState(false); // State to control result box visibility

  const handleEmployeeChange = (e) => {
    setSelectedEmployeeId(e.target.value);
    setTotalHours(0); // Reset total hours when employee changes
    setShowResult(false); // Hide result box when employee changes
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedDays((prevDays) => ({
      ...prevDays,
      [name]: checked,
    }));
    setTotalHours(0); // Reset total hours when checkboxes change
    setShowResult(false); // Hide result box when checkboxes change
  };

  const calculateShiftHours = () => {
    const daysSelected = Object.keys(selectedDays).filter(day => selectedDays[day]);
    const employee = employeeData.find(emp => emp.id === parseInt(selectedEmployeeId));
    if (employee) {
      const totalHours = daysSelected.reduce((total, day) => total + (employee.hoursWorked[day] || 0), 0);
      setTotalHours(totalHours); // Store total hours in state
      setShowResult(true); // Show result box
    } else {
      setTotalHours(0); // Reset total hours if employee not found
      setShowResult(false); // Hide result box
    }
  };

  // Effect to reset total hours and hide result box on employee change
  useEffect(() => {
    setTotalHours(0);
    setShowResult(false);
  }, [selectedEmployeeId]);

  return (
    <div className="">
      <div className="container">
        <div className="box">
          <div className="inputGroup">
            <label htmlFor="employeeName">Employee Name:</label>
            <select id="employeeName" value={selectedEmployeeId} onChange={handleEmployeeChange}>
              <option value="" disabled>Select an employee</option>
              {employeeData.map(employee => (
                <option key={employee.id} value={employee.id}>{employee.name}</option>
              ))}
            </select>
          </div>
          <div className="checkboxGroup">
            <label>Select Days:</label>
            {Object.keys(selectedDays).map((day) => (
              <div key={day}>
                <input
                  type="checkbox"
                  id={day}
                  name={day}
                  checked={selectedDays[day]}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={day}>{day}</label>
              </div>
            ))}
          </div>
          <button className="calculateButton" onClick={calculateShiftHours}>
            Calculate Shift Hours
          </button>
        </div>
        {/* Conditional rendering of result box */}
        {showResult && (
          <div className="resultBox">
            <h2>Employee Hours</h2>
            <p>Employee: {employeeData.find(emp => emp.id === parseInt(selectedEmployeeId))?.name}</p>
            <p>Total Hours: {totalHours}</p>
            <p>Employment Type: {employeeData.find(emp => emp.id === parseInt(selectedEmployeeId))?.employmentType}</p>
          </div>
        )}
      </div>
    </div>
  );
}
