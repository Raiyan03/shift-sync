"use client"
import { getEmployeeData } from "@/app/lib/utilities";
import Pagination from "@/app/ui/users/pagination/pagination";
import Table from "@/app/ui/users/table/table";
import Link from "next/link";

export default function Users() {
  return (
    <div className=" mt-3 p-4 gap-1 justify-center items-center align-middle rounded-xl">
      <div className="flex flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-[700]">Employee List</h1>
        <Link href={"/dashboard/users/add"}>
          <button className="p-3 bg-buttonColor text-text border-none border rounded-md cursor-pointer">
            Add Employee
          </button>
        </Link>
      </div>
      <div className="flex flex-col m-10 items-center h-full">
        <Table />
        {/* <Pagination /> */}
      </div>
    </div>
  );
}
