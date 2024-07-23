import React, { useState } from "react";
import { logOutUser } from "@/action/actions";
/*
Added toggle sidebar and custom tailwind for hamburger menu
must add link to the a href for the dashboard, full schedule, and preferences
Added hover over animation that was implemented in the sidebar
*/

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex flex-col h-full bg-gray-200 p-4 ${isOpen ? 'w-1/4' : 'w-16'} transition-width duration-300`}>
      <button 
        className="block md:hidden mb-4" 
        onClick={toggleSidebar}
      >
        <div className="w-6 h-6 flex flex-col justify-between items-center">
          <span className="block w-full h-0.5 bg-black"></span>
          <span className="block w-full h-0.5 bg-black"></span>
          <span className="block w-full h-0.5 bg-black"></span>
        </div>
      </button>
      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <a href="#" className="block w-full bg-white p-2 mb-2 border border-black transform transition-transform duration-300 hover:bg-gray-300 hover:scale-105">Dashboard</a>
        <a href="#" className="block w-full bg-white p-2 mb-2 border border-black transform transition-transform duration-300 hover:bg-gray-300 hover:scale-105">Full Schedule</a>
        <a href="#" className="block w-full bg-white p-2 mb-2 border border-black transform transition-transform duration-300 hover:bg-gray-300 hover:scale-105">Preferences</a>
      </div>
      <form action={logOutUser} className={`mt-auto ${isOpen ? 'block' : 'hidden'} md:block`}>
        <button className="bg-red-500 text-white w-full py-2 border border-black transform transition-transform duration-300 hover:bg-red-600 hover:scale-105" type="submit">Logout</button>
      </form>
    </div>
  );
};

export default Sidebar;