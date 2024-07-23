"use client";
import { getUser } from "@/action/actions";
import {
  getEmployeeData,
  saltAndHashPassword,
  setEmployeeData,
} from "@/app/lib/utilities";
import Shifts from "@/app/ui/users/preferences/shifts/shifts";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AddUser() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [mon, setMon] = useState("any");
  const [tue, setTue] = useState("any");
  const [thu, setThu] = useState("any");
  const [wed, setWed] = useState("any");
  const [fri, setFri] = useState("any");
  const [sat, setSat] = useState("any");
  const [sun, setSun] = useState("any");
  const [status, setStatus] = useState();
  const [jobRole, setJobRole] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const { push } = useRouter();

  const addEmp = async (data) => {
    const userData = await getUser();

    const ret = await setEmployeeData(userData.id, data, data.Id);
    if (typeof ret != Boolean) {
      setError(true);
      setSuccess(false);
      setErrorMsg(ret);
    //   push("/manager/employee");
    }
    if (typeof ret == Boolean || ret == true) {
      setError(false);
      setSuccess(true);
      push("/manager/employees");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await getUser();
    const id = Math.floor(Math.random() * 100000);

    let realId = `${userData.id.slice(0, 4)}-${9}${id}`;

    realId = realId.replace(/\s+/g, '')

    const splitMean = (string) => {
      if (string == "any") return string;
      const myArray = string.split("-");
      const shiftArray = myArray[1];
      return shiftArray;
    };

    const hashedPass = await saltAndHashPassword(password);

    const data = {
      name: name,
      Id: realId,
      mon: splitMean(mon),
      tue: splitMean(tue),
      wed: splitMean(wed),
      thu: splitMean(thu),
      fri: splitMean(fri),
      sat: splitMean(sat),
      sun: splitMean(sun),
      email: email,
      status: status,
      password: hashedPass,
      role: jobRole,
    };
    addEmp(data);
  };

  return (
    <div className="max-w-full mx-auto px-4 py-6 bg-white shadow-lg rounded-lg">
      {error && (
        <div className="text-white bg-red-500 rounded-md p-4 text-center">
          {errorMsg}
        </div>
      )}

      {success && (
        <div className="text-white bg-green-500 rounded-md p-4 text-center">
          User Added Successfully
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input p-3 border-2 border-black rounded-md w-full sm:w-1/3"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input p-3 border-2 border-black rounded-md w-full sm:w-1/3"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input p-3 border-2 border-black rounded-md w-full sm:w-1/3"
            required
          />
        </div>

        <div className="flex gap-10">
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value === "true")}
            className="form-select p-3 border-2 border-black rounded-md w-1/4"
            required
          >
            <option disabled selected>
              Employment Status
            </option>
            <option value={true}>Full Time</option>
            <option value={false}>Part Time</option>
          </select>

          <select
            name="jobRole"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="form-select p-3 border-2 border-black rounded-md w-1/4"
            required
          >
            <option disabled selected>
              Job Role
            </option>
            <option value="employee">Employee</option>
            <option value="supervisor">Supervisor</option>
          </select>
        </div>

        <div className=" flex flex-wrap gap-6">
          {days.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <label className="text-lg font-semibold mb-2">{day}</label>
              <Shifts day={day} setPreference={eval(`set${day}`)} />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full sm:w-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
