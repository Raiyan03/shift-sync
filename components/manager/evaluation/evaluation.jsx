"use client";
import { useState, useEffect } from "react";
import { getUser } from "@/action/actions";
import { getScheduleData } from "@/app/lib/utilities";

export default function Evaluation({ scheduleData }) {
    const [employeeData, setEmployeeData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [totalHours, setTotalHours] = useState(null);
    const [selectedDays, setSelectedDays] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUser();
                const schedule = await getScheduleData(userData.id);
                setEmployeeData(schedule.employees);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSelectChange = (event) => {
        setSelectedEmployee(event.target.value);
        setTotalHours(null); // Reset total hours when a new employee is selected
    };

    const handleDayToggle = (day) => {
        setSelectedDays(prevState => ({
            ...prevState,
            [day]: !prevState[day]
        }));
    };

    const calculateShiftHours = () => {
        if (!selectedEmployee) return;

        const employee = employeeData.find(emp => emp.id === selectedEmployee);
        if (employee) {
            const total = Object.keys(selectedDays).reduce((acc, day) => {
                if (selectedDays[day] && employee.shiftPref[day]) {
                    const shift = employee.shiftPref[day];
                    const [start, end] = shift.split(" - ");
                    const startDate = new Date(`1970-01-01T${start}:00`);
                    const endDate = new Date(`1970-01-01T${end}:00`);
                    const hours = (endDate - startDate) / 3600000;
                    return acc + hours;
                }
                return acc;
            }, 0);
            setTotalHours(total);
        } else {
            setTotalHours(0);
        }
    };

    return (
        <div className="flex flex-col bg-secondary shadow-md border rounded-md p-4">
            <h1 className="text-xl font-bold mb-4">Evaluation</h1>
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Select Employee</h2>
                <select value={selectedEmployee} onChange={handleSelectChange} className="p-2 border rounded-md">
                    <option value="" disabled>Select an employee</option>
                    {employeeData.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                            {employee.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Select Days</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                    {Object.keys(selectedDays).map(day => (
                        <button
                            key={day}
                            onClick={() => handleDayToggle(day)}
                            className={`px-4 py-2 border rounded-lg ${selectedDays[day] ? 'bg-green-500 text-white' : 'bg-white text-black'}`}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>
            <button
                onClick={calculateShiftHours}
                className="px-4 py-2 bg-blue-500 text-white border-none rounded-md"
            >
                Calculate Shift Hours
            </button>
            {totalHours !== null && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Total Hours</h2>
                    <div>{totalHours.toFixed(2)}</div>
                </div>
            )}
        </div>
    );
}
