import Preferences from "@/app/ui/users/preferences/preferences";
import Link from "next/link";
import React from "react";
import { Md6K, MdArrowBack } from "react-icons/md";

export default function SingleUserPage({params}) {
  const {id} = params;

  return (
    <div className="bg-bgSoft p-5 rounded-md mt-5 h-full">
      {console.log(id)}
      <div>
        <Link href="/dashboard/users/">
          <MdArrowBack size={24} />
        </Link>
      </div>
      <div id="info">
        <h2 className="m-5 font-bold text-2xl">John Doe</h2>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col justify-center items-center align-middle w-full gap-3">
          <label className="text-textSoft text-md ">Username</label>
          <input
            type="text"
            name="Username"
            className="p-8 w-1/3 h-1.5 bg-transparent text-text rounded-md mb-3 border-2 border-teal-700"
            placeholder="John Doe"
          />
          <label>Email</label>
          <input
            type="email"
            name="Email"
            className="p-8 w-1/3 h-1.5 bg-transparent text-text rounded-md mb-3 border-2 border-teal-700"
            placeholder="abc@email.com"
          />
          <label>Password</label>
          <input
            type="password"
            name="Password"
            className="p-8 w-1/3 h-1.5 bg-transparent text-text rounded-md mb-3 border-2 border-teal-700"
            placeholder="*******"
          />
          <button type="submit" className="bg-red-600 h-7 w-20 rounded-lg">
            Submit
          </button>
        </div>
        <Preferences/>
      </div>
    </div>
  );
}
