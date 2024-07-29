"use client";
import { getShiftData } from "@/data/shift";
import { useEffect, useState } from "react";
import DayCard from "@/components/employee/shiftPref/daycard"
import { getUserData } from "@/data/user";
import { filterPrefValue } from "@/lib/employeeHelper";
import { updateShiftForUser } from "@/lib/utilities";
import { toast } from "sonner";

const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']; 

const EmployeePreferences = ({id}) => {
    const [preferences, setPreferences] = useState();
    const [shiftList, setShifts] = useState();
    useEffect(() => {
        (async () => {
            if (!id){
                return ;
            }
            const shifts = await getShiftData(id);
            const pref = await getUserData(id);
            setShifts(shifts?.shifts);
            setPreferences(pref?.shiftPref);
        })();
    }, []);

    const handlePreferenceChange = (day, value) => {
        const newValue = filterPrefValue(value, shiftList);
        setPreferences(prev => ({ ...prev, [day]: newValue }));
    };

    const handleSubmit = async () => {
        if (!id || !preferences) {
            return;
        }

        /*
        * This is a toast.promise function that is used to display a loading Link: https://sonner.emilkowal.ski/
        * toast.promise is a function that takes a promise and an object containing
        * three functions: loading, success, and error. The loading function is called
        * when the promise is pending, the success function is called when the promise
        * resolves, and the error function is called when the promise rejects.
        */

        toast.promise( updateShiftForUser(id, preferences),{
            loading: "Updating preferences...",
            success: () => {
                return 'Preferences updated';
            },
            error: (err) => {
                return "Someting went wrong";
            }
        })
    };
    return (
        shiftList 
        && 
        <div className=" flex flex-col border rounded-lg p-2">
            <h1 className="text-xl text-accent1">Shift Preferences</h1>
            <div className="flex flex-wrap  md:justify-center ">
                { daysOfWeek.map(day => (
                    <DayCard key={day} day={day} preferences={preferences} shiftList={shiftList} handlePreferenceChange={handlePreferenceChange} />
                ))}
            </div>
            <button
                className=" self-end w-fit bg-primary hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}
            >
                Update Preferences
            </button>
        </div>
    );
};

export default EmployeePreferences;