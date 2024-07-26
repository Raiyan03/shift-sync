"use client";
import { updateUserData } from "@/action/actions";
import Preferences from "@/components/manager/employees/preference";
import { getUserData } from "@/data/user";
import React, { use, useEffect, useState } from "react";
import { Md6K, MdArrowBack } from "react-icons/md";

export default function SingleUserPage({ params }) {
  const { id } = params;
  const [data, setData] = useState();
  const [userStatus, setUserStatus] = useState();
  const [userRole, setUserRole] = useState();

  const fetchUserData = async () => {
    const userData = await getUserData(id);
    setData(userData);
    setUserStatus(userData.status);
    setUserRole(userData.role)
    console.log(userData);
  };

  const handleEmployeeStatus = (e) => {
    const newData = data;
    newData.status = e;
    setData(newData);
    setUserStatus(e);
  };

  const handleEmployeeRole = (e) => {
    const newData = data;
    newData.role = e;
    setData(newData);
    setUserRole(e);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="bg-secondary p-5 rounded-md mt-4">
      <div id="info">
        <h2 className="m-5 font-bold text-2xl">
          {data?.name
            ? data?.name.charAt(0).toUpperCase() + data?.name.slice(1)
            : ""}
        </h2>
      </div>
      <form action={updateUserData}>
        <div className="flex flex-col justify-center items-center align-middle w-full gap-3">
          <div className="flex flex-row w-full justify-center gap-20 mb-5">
            <div className="flex flex-col">
              <label className="text-primary text-md ">Username</label>
              <input
                type="text"
                name="id"
                className="p-8 w-full h-1.5 text-center rounded-md mb-3 border-2 border-primary text-red-950 font-bold"
                value={id}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="p-8 w-full h-1.5 text-center text-black rounded-md mb-3 border-2 border-primary"
                placeholder={data?.email}
              />
            </div>
          </div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="p-8 w-1/6 h-1.5 text-center text-black rounded-md mb-3 border-2 border-primary"
            placeholder={data?.name}
            minLength={4}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="p-8 w-1/6 h-1.5 text-center text-black rounded-md mb-3 border-2 border-primary"
            placeholder="*******"
            minLength={6}
          />
          <div className="flex flex-row w-full justify-center gap-20 mb-5">
            <div className="flex flex-col">
              <label>Employee Status</label>
              <select
                name="status"
                placeholder={userStatus}
                value={userStatus}
                className="p-8 w-full border-primary rounded-md border-2"
                onChange={(e) => handleEmployeeStatus(e.target.value)}
              >
                <option value={"Full Time"}>Full Time</option>
                <option value={"Part Time"}>Part Time</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label>Job Role</label>
              <select
                name="role"
                placeholder={userRole}
                value={userRole}
                className="p-8 w-full border-primary rounded-md border-2"
                onChange={(e) => handleEmployeeRole(e.target.value)}
              >
                <option value={"supervisor"}>Supervisor</option>
                <option value={"employee"}>Employee</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-black text-white h-10 w-36 rounded-lg"
          >
            Update
          </button>

          {/* <Preferences /> */}
        </div>
      </form>
    </div>
  );
}
