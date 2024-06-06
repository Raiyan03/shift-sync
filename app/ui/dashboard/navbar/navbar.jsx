import styles from "@/app/ui/dashboard/navbar/navbar.module.css";

import { MdDashboard, MdGasMeter, MdLogout, MdOutlineSupervisedUserCircle, MdSchedule, MdSupervisedUserCircle } from "react-icons/md";
import NavLinks from "./navLinks/navLinks";
import Link from "next/link";
import User from "./user/user";

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

  return (
    <div className={styles.container}>
      <ul className={styles.navItems}>
        <li className="flex absolute left-20 " key={navbarItems.title}><Link href="/dashboard">{navbarItems.title}</Link></li>

        {navbarItems.list.map((cat) => (
          <li key={cat.title}>
            <NavLinks item = {cat} ket={cat.title}/>
          </li> 
        ))}

        <li className="flex absolute justify-end align-middle items-end right-24">
          <User />
        </li>

        <button className={styles.logout}>
          <MdLogout />
          Logout</button>

      </ul>
    </div>
  );
}
