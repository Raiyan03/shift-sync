"use client";
import { getUser } from "@/action/actions";
import { getEmployeeData, saltAndHashPassword, setEmployeeData } from "@/app/lib/utilities";
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
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const {push} = useRouter();

  const addEmp = async (data) => {
    const userData = await getUser();

    const ret = await setEmployeeData(userData.id, data, data.Id);
    if (typeof ret != Boolean) {
      setError(true);
      setSuccess(false);
      setErrorMsg(ret);
      push("/dashboard/users")
    }
    if (typeof ret == Boolean || ret == true) {
      setError(false);
      setSuccess(true);
      push("/dashboard/users")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await getUser();
    const id = Math.floor(Math.random() * 100000);

    const realId = `${userData.id.slice(0,4)}-${9}${id}`;

    const splitMean = (string) => {
      if (string == "any") return string;
      const myArray = string.split("-");
      const shiftArray = myArray[1];
      return shiftArray;
    };

    const hashedPass = await saltAndHashPassword(password)

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
    };
    addEmp(data);
  };

  return (
    // <div className='bg-bgSoft p-5 rounded-md mt-5 h-full items-center justify-center'>
    <div className="flex w-11/12 mx-auto mt-20 p-6 rounded-3xl flex-col border-4 border-teal-800">
      <h2 className="mb-6 flex font-bold text-2xl justify-center items-center">
        Add User
      </h2>
      {error && (
        <div className="text-center justify-center items-center mb-3 bg-red-500 py-2 mx-auto w-[600px] rounded-2xl">
          {errorMsg}
        </div>
      )}

      {success && (
        <div className="text-center justify-center items-center mb-3 bg-green-600 py-2 mx-auto w-[600px] rounded-2xl">
          User Added Successfully
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 justify-center items-center flex-col"
      >
        <div className="flex w-full justify-center m-auto items-center">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-8 w-1/6 h-1.5 mx-2 bg-transparent text-text rounded-md mb-3 border-2 border-teal-700"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-8 w-1/6 h-1.5 mx-2 bg-transparent text-text rounded-md mb-3 border-2 border-teal-700"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-8 w-1/6 h-1.5 mx-2 bg-transparent text-text rounded-md mb-3 border-2 border-teal-700"
            required
          />
          <select
            name={"status"}
            value={status}
            className="bg-bg border-2 border-teal-700 rounded-xl p-5 w-1/6 mx-2 mb-3  text-text"
            onChange={(e) => e.target.value == "true"? setStatus(true) : setStatus(false)}
            required
          >
            <option disabled selected>
              Employment Status
            </option>
            <option value={true}>
              Full Time
            </option>
            <option value={false}>Part Time</option>
          </select>
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-3 w-5/6 mb-5">
          {days.map((day, index) => {
            switch (day) {
              case "Mon":
                return (
                  <div className="flex flex-col items-center">
                    <label className="text-xl">Monday</label>
                    <Shifts day={day} setPreference={setMon} />
                  </div>
                );
                break;
              case "Tue":
                return (
                  <div className="flex flex-col items-center">
                    <label className="text-xl">Tuesday</label>
                    <Shifts day={day} setPreference={setTue} />
                  </div>
                );
                break;
              case "Wed":
                return (
                  <div className="flex flex-col items-center">
                    <label className="text-xl">Wednesday</label>
                    <Shifts day={day} setPreference={setWed} />
                  </div>
                );
              case "Thu":
                return (
                  <div className="flex flex-col items-center">
                    <label className="text-xl">Thursday</label>
                    <Shifts day={day} setPreference={setThu} />
                  </div>
                );
              case "Fri":
                return (
                  <div className="flex flex-col items-center">
                    <label className="text-xl">Friday</label>
                    <Shifts day={day} setPreference={setFri} />
                  </div>
                );
              case "Sat":
                return (
                  <div className="flex flex-col items-center">
                    <label className="text-xl">Saturday</label>
                    <Shifts day={day} setPreference={setSat} />
                  </div>
                );
              case "Sun":
                return (
                  <div className="flex flex-col items-center">
                    <label className="text-xl">Sunday</label>
                    <Shifts day={day} setPreference={setSun} />
                  </div>
                );
            }
          })}
        </div>
        <button
          type="submit"
          className="bg-red-600 px-6 py-4 rounded-lg  hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
    // </div>
  );
}
