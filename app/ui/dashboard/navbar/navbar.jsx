"use client"
import { MdDashboard, MdGasMeter, MdLogout, MdOutlineSupervisedUserCircle, MdSchedule, MdSupervisedUserCircle } from "react-icons/md";
import NavLinks from "./navLinks/navLinks";
import Link from "next/link";
import User from "./user/user";
import { useEffect, useState } from "react";
const navbarItems = {
  title: "Shift Sync",
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

export default function Navbar() {

  const[load, setLoad] = useState(false);

  useEffect(()=>setLoad(true) ,[])

  return (
    <div className={`text-text bg-bgSoft p-7 sticky transition-all delay-75 duration-500 ease-in ${load?"" :"-translate-y-20 opacity-0"} `}>
      <ul className="flex flex-row items-center justify-center gap-5">
        <li className="flex absolute left-20" key={navbarItems.title}><Link href="/dashboard">{navbarItems.title}</Link></li>

        {navbarItems.list.map((cat) => (
          <li key={cat.title} className="hidden md:block">
            <NavLinks item = {cat} ket={cat.title}/>
          </li> 
        ))}

        <li className="flex absolute justify-end align-middle items-end right-24">
          <User />
        </li>

        <button className="flex font-bold text-logOutButton absolute items-center gap-[5px] right-[14px]">
          <MdLogout />
          Logout</button>

      </ul>
    </div>
  );
}
