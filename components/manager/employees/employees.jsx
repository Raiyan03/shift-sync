"use client"
import Image from 'next/image';
import Link from 'next/link';
import { getUser } from '@/action/actions';
import { useState, useEffect } from 'react';
import SearchBar from "@/components/manager/employees/search"
import { deleteEmployee, getEmployeeData } from '@/lib/utilities';
import { redirect } from 'next/navigation';
const UserTable = ({ employeeData, setEmployeeData }) => {
  console.log(employeeData);
    const [data, setData] = useState(employeeData);
    console.log(data);
    return (
        <div className="mt-4 flex flex-col bg-secondary shadow-md border rounded-md p-4">
            <SearchBar placeholder="Search for user" employeeData={employeeData} setData={setData} location="users" />
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="p-2 font-bold">Id</td>
                        <td className="p-2 font-bold">Name</td>
                        <td className="p-2 font-bold">Email</td>
                        {/* <td className="p-2 font-bold">Joined on</td> */}
                        <td className="p-2 font-bold">Status</td>
                        <td className="p-2 font-bold text-center">Action</td>
                    </tr>
                </thead>
                <tbody>
        {employeeData &&
          employeeData?.employees.map((value, index) => {
            return(
              <tr key={index} className="border-solid ">
                <td className="p-2 ">{value.id}</td>
                <td className="p-2 ">{value.name}</td>
                <td className="p-2 ">{value.email}</td>
                {/* <td>
                  {value.createdAt ? new Date(value.createdAt).toLocaleDateString() : "Unknown"}
                </td> */}
                <td className="p-2">
                  {value.status ? "Full Time" : "Part Time"}
                </td>
                <td className="p-2 ">
                  <div className="flex gap-2 justify-around">
                    <Link href={`/manager/employees/${value.Id}`}>
                      <button className="px-1 py-2 bg-emerald-500 text-text border-none  rounded-md cursor-pointer ">
                        View
                      </button>
                    </Link>
                      <button className="px-1 py-2 bg-accent2 text-text border-none  rounded-md cursor-pointer " onClick={async ()=> {const userData = await getUser(); await deleteEmployee(userData.id, value.id);redirect('/manager/employees')}}>
                        Delete
                      </button>
                  </div>
                </td>
            </tr>
            )
            
          })}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
