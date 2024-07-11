"use client"

import { MdDashboard, MdOutlineSupervisedUserCircle, MdSchedule, MdGasMeter, MdLogout, MdEvent, MdQrCodeScanner, MdSwapCalls } from "react-icons/md";
import NavLinks from "@/components/manager/nav-links";
import Link from "next/link";
import UserBatch from "@/components/manager/user";
import { getUser, logOutUser } from "@/action/actions.ts";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const navbarItems = {
  list: [
    {
      title: "Dashboard",
      path: "/manager/dashboard",
      icon: <MdDashboard />,
    },
    {
      title: "Employees",
      path: "/manager/employees",
      icon: <MdOutlineSupervisedUserCircle />,
    },
    {
      title: "Availability",
      path: "/manager/availability",
      icon: <MdSchedule />,
    },
    {
      title: "QR Code",
      path: "/manager/qr-code",
      icon: <MdQrCodeScanner />,
    },
    {
      title: "Shift Swap",
      path: "/manager/shift-swap",
      icon: <MdSwapCalls />,
    }
    // {
    //   title: "Generate Schedule",
    //   path: "/dashboard/getSchedule",
    //   icon: <MdGasMeter />,
    // },
  ],
};

export default function SideBar({ isToggle }) {
  const [load, setLoad] = useState(false);

  useEffect(() => setLoad(true), [])

  const router = useRouter()

  return (
    <div className={`sm:hidden md:block sm:w-1/4 md:w-full text-black bg-secondary shadow-lg rounded-md p-4 sticky top-0 h-screen`}>
      <UserBatch />
      <ul className="flex flex-col gap-5 overflow-auto mt-5">
        {navbarItems.list.map((item) => (
          <li key={item.title} className="block">
            <NavLinks item={item} />
          </li>
        ))}
      </ul>
      <form action={logOutUser} className="absolute bottom-7 left-14 w-full pb-2 font-bold text-logOutButton gap-2 text-xl">
        <button onClick={()=>{router.push('/')}} className="flex items-center gap-2" type="submit">
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
}