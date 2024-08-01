"use client";
import { useState, useEffect } from "react";
import { getUser } from "@/action/actions";
import Evaluation from "@/components/manager/evaluation/evaluation";
import UserTable from "@/components/manager/employees/employees";
import { getEmployeesDataFromDB } from "@/server/calls";

export default function Employees() {
    const [employeeData, setEmployeeData] = useState();
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
      setLoading(true);
      const userData = await getUser();
      const employees = await getEmployeesDataFromDB(userData.id);
      console.log(employees);
      const data = {
        employees,
      };
      setEmployeeData(data);
      setLoading(false);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
    
    return (
        <div className="flex flex-col gap-3">
            <UserTable employeeData={employeeData} setEmployeeData={setEmployeeData} Loading={loading} fetch={fetchData} />
            <div className="flex flex-col bg-secondary shadow-md border rounded-md p-4">
                <h1 className="text-xl font-bold mb-4">Evaluation</h1>
                <Evaluation />
            </div>
        </div>
    );
}
