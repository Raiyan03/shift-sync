"use client";
import { useState, useEffect } from "react";
import { getUser } from "@/action/actions";
import UserTable from "@/components/manager/employees/employees"
import { getEmployeesDataFromDB } from "@/server/calls";
export default function Employees() {
    const [employeeData, setEmployeeData] = useState();
    const fetchData = async () => {
      const userData = await getUser();
      const employees = await getEmployeesDataFromDB(userData.id);
      const data = {
        employees,
      };
      setEmployeeData(data);
    };
    useEffect(() => {
      fetchData();
    }, []);
    return (
        
        <div>
            <UserTable employeeData={employeeData} setEmployeeData={setEmployeeData}/>
            {/* <div className="flex flex-col bg-secondary shadow-md border rounded-md p-4">
                <h1 className="text-xl font-bold mb-4">Evaluation</h1>
                <Evaluation />
            </div> */}
        </div>
    )
}