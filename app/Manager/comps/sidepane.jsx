// /app/Manager/comps/sidepane.js
"use client";
import React from "react";
import Link from "next/link";

const SidePane = () => {
  return (
    <div className="w-64 bg-gray-400 p-4 text-black h-full">
      <nav>
        <ul>
          <li className="mb-4">
            <Link href="/pages/Employee/pages/Schedule">
              <div className="block text-white hover:bg-gray-500 py-2 px-4 rounded">Schedule</div>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/pages/Employee/pages/Preference">
              <div className="block text-white hover:bg-gray-500 py-2 px-4 rounded">Preferences</div>
            </Link>
          </li>
          <li>
            <Link href="/pages/Employee/pages/Info">
              <div className="block text-white hover:bg-gray-500 py-2 px-4 rounded">Info</div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidePane;
