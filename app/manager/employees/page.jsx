"use client";
import { useState, useEffect } from "react";
import { getUser } from "@/action/actions";
import { getEmployeeData } from "@/lib/utilities";

import UserTable from "@/components/manager/employees/employees"
export default function Employees() {
    const [employeeData, setEmployeeData] = useState();
    const fetchData = async () => {
      const userData = await getUser();
      const employees = await getEmployeeData(userData.id);
      const data = {
        employees,
      };
      setEmployeeData(data);
      // console.log(data);
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