import { deleteEmployee, getEmployeeData } from "@/app/lib/utilities";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Table() {
  const [employeeData, setEmployeeData] = useState();

  const fetchData = async () => {
    const employees = await getEmployeeData("Ace Liquor");

    const data = {
      employees,
    };

    setEmployeeData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, [employeeData]);

  return (
    <table className="p-2 bg-bgSoft">
      <thead>
        <tr className="border-solid border-2">
          <td className="p-2 w-1/6 border-x-2 font-bold">Name</td>
          <td className="p-2 w-1/6 border-x-2 font-bold">Email</td>
          <td className="p-2 w-1/6 border-x-2 font-bold">Status</td>
          <td className="p-2 w-1/6 border-x-2 font-bold">Actions</td>
        </tr>
      </thead>
      <tbody>
        {employeeData &&
          employeeData.employees.map((value, index) => {
            return(
              <tr className="border-solid border-2">
              <td className="p-2 border-x-2">{value.name}</td>
              <td className="p-2 border-x-2">{value.email}</td>
              <td className="p-2 border-x-2">
                {value.status ? "Full Time" : "Part Time"}
              </td>
              <td className="p-2 border-x-2">
                <div className="flex gap-2 justify-around">
                  <Link href={`/dashboard/users/${value.Id}`}>
                    <button className="px-1 py-2 bg-teal-700 text-text border-none border rounded-md cursor-pointer ">
                      View
                    </button>
                  </Link>
                    <button className="px-1 py-2 bg-red-600 text-text border-none border rounded-md cursor-pointer " onClick={async ()=> {await deleteEmployee("Ace Liquor", value.Id);}}>
                      Delete
                    </button>
                </div>
              </td>
            </tr>
            )
            
          })}
        {!employeeData && (
          <tr className="border-solid border-2">
            <td className="p-2 border-x-2">None</td>
            <td className="p-2 border-x-2">none</td>
            <td className="p-2 border-x-2">Active</td>
            <td className="p-2 border-x-2">
              <div className="flex gap-2 justify-around">
                <Link href={"/"}>
                  <button className="px-1 py-2 bg-teal-700 text-text border-none border rounded-md cursor-pointer ">
                    View
                  </button>
                </Link>
                <Link href={"/"}>
                  <button className="px-1 py-2 bg-red-600 text-text border-none border rounded-md cursor-pointer ">
                    Delete{" "}
                  </button>
                </Link>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
