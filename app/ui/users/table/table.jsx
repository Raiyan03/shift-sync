import Link from "next/link";
import React from "react";

export default function Table() {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-solid border-2">
          <td className="p-2 border-x-2 font-bold">Name</td>
          <td className="p-2 border-x-2 font-bold">Email</td>
          <td className="p-2 border-x-2 font-bold">Status</td>
          <td className="p-2 border-x-2 font-bold">Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr className="border-solid border-2">
          <td className="p-2 border-x-2">John Doe</td>
          <td className="p-2 border-x-2">fake@email.com</td>
          <td className="p-2 border-x-2">Active</td>
          <td className="p-2 border-x-2">
            <div className="flex gap-2 justify-around">
            <Link href={"/dashboard/users/test"}>
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
      </tbody>
    </table>
  );
}
