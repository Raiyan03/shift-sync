"use client";
import { getUserFromDB } from "@/data/user";
import { stringToTime } from "@/lib/utilities";
import React from "react";

const Page = () => {
  const onClickTest = async () => {
    const response = await fetch(`/api/setEmployeeData`, {
      method: "POST",
      body: JSON.stringify(
        {
          collId: "shift-587045",
          data:{
            name: "test",
            Id: "12345",
            mon: 0,
            tue: 1,
            wed: 0,
            thu: 0,
            fri: "any",
            sat: 0,
            sun: 1,
            email: "ad@gmail.com",
            status: true,
            password: "1234",
            role: "employee",
          },
        },),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <div>
      <button
        className="flex p-4 font-bold bg-green-600 m-3 rounded-md h-3 text-center items-center"
        onClick={onClickTest}
      >
        Test
      </button>
    </div>
  );
};

export default Page;
