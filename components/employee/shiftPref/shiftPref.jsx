"use client";
import { getUser } from "@/action/actions";
import { getShiftData, getShiftDataForTheUser } from "@/data/shift";
import { convertTimeStamp, newConvertTimeStamp, timeStampConversion, updateShiftForUser } from "@/lib/utilities";
import { use, useEffect, useState } from "react";
import Shift from "@/components/employee/shiftPref/shift"
import DayCard from "@/components/employee/shiftPref/daycard"
import { getUserData } from "@/data/user";

const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']; 

const EmployeePreferences = ({id}) => {
    const [preferences, setPreferences] = useState();
    const handlePreferenceChange = (day, value) => {
        setPreferences(prev => ({ ...prev, [day]: value }));
    };

    const handleSubmit = () => {
        console.log('Submitted Preferences:', preferences);
    };
    console.log("Preferences: ", preferences);
    return (
        <div className=" border rounded-lg p-2">
            <div className="flex flex-wrap  md:justify-center ">
                { daysOfWeek.map(day => (
                    <DayCard key={day} day={day} preferences={preferences} />
                ))}
            </div>
            <button
                className="mt-4 bg-primary hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}
            >
                Submit Preferences
            </button>
        </div>
    );
};

export default EmployeePreferences;