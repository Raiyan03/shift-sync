"use client"
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { MdMenu, MdNotifications, MdOutlineChat, MdPublic, MdSearch } from 'react-icons/md'

export default function Navbar({ toggleSidebar }) {
  const pathName = usePathname()
  return (
    <div className="flex justify-between items-center bg-secondary border shadow-md rounded-md p-2">
        <button className=' sm:visible md:hidden'>
            <MdMenu size={20} onClick={toggleSidebar} />
        </button>
        <div className="text-black font-bold capitalize">
          {pathName.split('/').pop()}
        </div>
        <div className="flex gap-2 items-center">
          {/* <div className="flex gap-1 items-center rounded-md bg-[#2e374a] p-1 flex-grow">
            <MdSearch size={20}/>
            <input type="text" placeholder='Search' className="w-full bg-transparent text-white text-lg rounded-md p-2 focus:outline-none"/>
          </div> */}
          <div className="flex gap-2 flex-grow items-center">
            <MdOutlineChat size={20} />
            <MdNotifications size={20} />
            <MdPublic size={20} />
          </div>
        </div>
    </div>
  )
}
