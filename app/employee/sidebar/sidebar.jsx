import React, { useState, useEffect } from "react";
import { MdDashboard, MdTableChart, MdOutlineRoomPreferences, MdLogout } from "react-icons/md";
import { logOutUser } from "@/action/actions";

/*
Added toggle sidebar and custom tailwind for hamburger menu
must add link to the a href for the dashboard, full schedule, and preferences
Added hover over animation that was implemented in the sidebar
imported icons from Md to match the manager sidebar
*/

const navbarItems = [
  // added name of path so when u add those pages u just insert the name of the path
  {
    title: "Dashboard",
    path: "/employee/(name of path)",
    icon: <MdDashboard />,
  },
  {
    title: "Full Schedule",
    path: "/employee/(name of path)",
    icon: <MdTableChart />,
  },
  {
    title: "Preferences",
    path: "/manager/(name of path)",
    icon: <MdOutlineRoomPreferences />,
  }
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => setIsOpen(true), []);

  return (
    <div className={`flex flex-col h-full bg-white p-4 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} sm:w-64`}>
      <button 
        className="block sm:hidden mb-4" 
        onClick={toggleSidebar}
      >
        <div className="w-6 h-6 flex flex-col justify-between items-center">
          <span className="block w-full h-0.5 bg-black"></span>
          <span className="block w-full h-0.5 bg-black"></span>
          <span className="block w-full h-0.5 bg-black"></span>
        </div>
      </button>
      <ul className={`flex flex-col gap-5 overflow-auto mt-5 ${isOpen ? 'block' : 'hidden'} sm:block`}>
        {navbarItems.map((item) => (
          <li key={item.title} className="block">
            <a href={item.path} className="flex items-center gap-2 text-lg p-2 rounded-md hover:bg-gray-300 transition-colors duration-300">
              {item.icon}
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      <form action={logOutUser} className={`mt-auto ${isOpen ? 'block' : 'hidden'} sm:block`}>
        <button className="flex items-center gap-2 bg-red-500 text-white w-full py-2 mt-5 rounded-md hover:bg-red-600 transition-colors duration-300" type="submit">
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
};

export default Sidebar;