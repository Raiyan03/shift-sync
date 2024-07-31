"use client"
import Image from 'next/image';
import Link from 'next/link';
import { getUser } from '@/action/actions';
import { useState, useEffect } from 'react';
import SearchBar from "@/components/manager/employees/search"
import { getEmployeeData } from '@/lib/utilities';
import Loader from '@/components/loader';
import { redirect, useRouter } from 'next/navigation';
import { IoEyeSharp } from "react-icons/io5";
import { MdBuild, MdOutlineRemoveCircleOutline, MdPreview, MdViewCompact } from 'react-icons/md';
import { deleteEmployeeFromDB } from '@/server/calls';
import { toast } from 'sonner';
const UserTable = ({ employeeData, setEmployeeData, Loading, fetch }) => {
    const [data, setData] = useState(employeeData);
    const {push} = useRouter()

    const UpdateEmpList= async (id)=>{
      await fetch();
    }

    return (
      Loading ? 
      <div className='flex shadow-md border rounded-md h-60 items-center justify-center'>
        <Loader />
      </div> 

      :

      <div className=" flex flex-col bg-secondary shadow-md border rounded-md p-4">
            <SearchBar placeholder="Search for user" employeeData={employeeData} setData={setData} location="users" />
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="p-2 font-bold">Id</td>
                        <td className="p-2 font-bold">Name</td>
                        <td className="p-2 font-bold">Email</td>
                        <td className="p-2 font-bold">Role</td>
                        {/* <td className="p-2 font-bold">Joined on</td> */}
                        <td className="p-2 font-bold">Status</td>
                        <td className="p-2 font-bold text-center">Action</td>
                    </tr>
                </thead>
                <tbody>
        {employeeData &&
          employeeData?.employees?.map((value, index) => {
            return(
              <tr key={index} className="border-solid ">
                <td className="p-2 ">{value.id}</td>
                <td className="p-2 ">{value.name}</td>
                <td className="p-2 ">{value.email}</td>
                <td className="p-2 ">{value.role? `${value.role.charAt(0).toUpperCase() + value.role.slice(1)}`: ""}</td>
                {/* <td>
                  {value.createdAt ? new Date(value.createdAt).toLocaleDateString() : "Unknown"}
                </td> */}
                <td className="p-2">
                  {value.status ? "Full Time" : "Part Time"}
                </td>
                <td className="p-2 ">
                  <div className="flex gap-10 justify-center">
                    <Link href={`/manager/employees/${value.id}`}>
                      <button className="px-1 py-2 bg-primary text-text border-none  rounded-md cursor-pointer ">
                        <IoEyeSharp size={30} />
                      </button>
                    </Link>
                      <button 
                      className="px-1 py-2 bg-primary text-text border-none  rounded-md cursor-pointer " 
                      onClick={async ()=> {
                        const userData = await getUser(); 
                        // await deleteEmployeeFromDB(userData.id, value.id);
                        toast.promise( deleteEmployeeFromDB(userData.id, value.id),{
                            loading: "Deleting Employee...",
                            success: () => {
                                return 'Employee Deleted';
                            },
                            error: (err) => {
                                return "Something went wrong";
                            }
                        })
                        await UpdateEmpList(value.id)
                        }
                      }>
                        <MdOutlineRemoveCircleOutline size={30}/>
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
