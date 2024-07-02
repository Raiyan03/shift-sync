"use client"

import { MdDashboard, MdOutlineSupervisedUserCircle, MdSchedule, MdGasMeter, MdLogout } from "react-icons/md";
import NavLinks from "@/components/manager/nav-links";
import Link from "next/link";
import UserBatch from "@/components/manager/user";
import { getUser, logOutUser } from "@/action/actions.ts";
import { useEffect, useState } from "react";

const navbarItems = {
  list: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <MdDashboard />,
    },
    {
      title: "Employees",
      path: "/dashboard/users",
      icon: <MdOutlineSupervisedUserCircle />,
    },
    {
      title: "Employee Preferences",
      path: "/dashboard/schedule",
      icon: <MdSchedule />,
    },
    {
      title: "Generate Schedule",
      path: "/dashboard/getSchedule",
      icon: <MdGasMeter />,
    },
  ],
};

export default function SideBar({ isToggle }) {
  const [load, setLoad] = useState(false);

  useEffect(() => setLoad(true), [])

  return (
    <div className={`sm:hidden md:block sm:w-1/4 md:w-full text-black bg-secondary shadow-lg rounded-md p-4 sticky top-0 h-screen`}>
      <UserBatch />
      <ul className="flex flex-col gap-5 overflow-auto">
        {navbarItems.list.map((item) => (
          <li key={item.title} className="block">
            <NavLinks item={item} />
          </li>
        ))}
      </ul>
      <form action={logOutUser} className="absolute bottom-0 w-full pb-1 font-bold text-logOutButton gap-2">
        <button className="flex items-center gap-2" type="submit">
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
}
