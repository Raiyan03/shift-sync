import styles from "@/app/ui/dashboard/navbar/navbar.module.css";

import { MdDashboard, MdGasMeter, MdLogout, MdOutlineSupervisedUserCircle, MdSchedule, MdSupervisedUserCircle } from "react-icons/md";
import Link from "next/link";
import NavLinks from "./NavLinks";
// import User from "./user/user";

const navbarItems = {
  title: "Shift Sync",
  list: [
    {
      title: "Dashboard",
      path: "/employee/dashboard",
      icon: <MdDashboard />,
    },
    {
      title: "Schedule",
      path: "/employee/schedule",
      icon: <MdOutlineSupervisedUserCircle />,
    },
    {
      title: "Set Preferences",
      path: "/dashboard/preferences",
      icon: <MdSchedule />,
    },
  ],
};

export default function Navbar() {

  return (
    <div className="text-text bg-bgSoft rounded-[50px] p-[20px] sticky">
      <ul className="flex flex-row items-center justify-center gap-[20px]">
        <li className="flex absolute left-20 " key={navbarItems.title}><Link href="/dashboard">{navbarItems.title}</Link></li>

        {navbarItems.list.map((cat) => (
          <li key={cat.title}>
            <NavLinks item = {cat} ket={cat.title}/>
          </li> 
        ))}

        {/* <li className="flex absolute justify-end align-middle items-end right-24">
          <User />
        </li> */}

        <button className="flex font-extrabold text-red-400 absolute items-center gap-[5px] right-4">
          <MdLogout />
          Logout</button>

      </ul>
    </div>
  );
}
