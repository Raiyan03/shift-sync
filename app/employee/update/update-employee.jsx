//Standardized imports
import React, {useState, useEffect} from 'react';
import { db } from "@/lib/firebase";

//Allow employee to make request to change day preferences
const EmployeeUpdateForm = ({ employeeID }) => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const [mon, setMon] = useState("any");
    const [tue, setTue] = useState("any");
    const [thu, setThu] = useState("any");
    const [wed, setWed] = useState("any");
    const [fri, setFri] = useState("any");
    const [sat, setSat] = useState("any");
    const [sun, setSun] = useState("any");
    //Unsure of necessity here
    /*
    const [status, setStatus] = useState();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState();
    */

    useEffect(() => {
        //Fetch existing employees information when component mounts
        const fetchEmployeeData = async () => {
            try {
                //At the moment, this will immediately change the contents of an employees preferences.
                // After completion, THIS component should create a request with all the appropriate
                // information for a preference change, and the existing code can be used manager side once
                // once the request is accepted, forcibly updating the employee document 
                // AND the request document (employee preferences are updated, and request status aswell)
                const doc = await db.collection('employees').doc(employeeID).get();
                //May want to run additional verification of employee login token
                //Right now only checks if employee exists
                if (doc.exists) {
                    const {mon, tue, wed, thu, fri, sat, sun} = doc.data();
                    setMon(mon);
                    setTue(tue);
                    setWed(wed);
                    setThu(thu);
                    setFri(fri);
                    setSat(sat);
                    setSun(sun);//Unsure of necessity here
    
                } else {
                    console.log('Error finding employee and information');
                }
            } catch (error) {
                console.error('Error fetching employee: ', error);
            }
        };

    }, [employeeID]);

    //Typical form handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            //Update employee in Firestore
            await db.collection('employees').doc(employeeID).update({
                mon,
                tue,
                wed,
                thu,
                fri,
                sat,
                sun
            });
            console.log('Employee updated correctly');
        } catch (error) {
            console.error('Error updating employee: ', error);
        }
    };

    //Render component is borrowed
    //ALMOST CERTAINLY WON'T WORK WITH EXISTING BUILD, 
    //AMRIT OR JAYDEN WOULD LOVE SOME HELP WITH THIS
    return (
    <div className=" flex flex-wrap gap-6">
        {days.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
                <label className="text-lg font-semibold mb-2">{day}</label>
                    <Shifts day={day} setPreference={eval(`set${day}`)} />
            </div>
        ))}
    </div>
    );

    
};

export default EmployeeUpdateForm;