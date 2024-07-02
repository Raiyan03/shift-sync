"use client";
import { useState } from "react";
import SideBar from "@/components/manager/side-bar";
import Navbar from "@/components/manager/nav-bar";

const ManagerLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => { 
        console.log("Sidebar toggle clicked");
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex bg-background min-h-screen text-black">
            <div className={`fixed bg-white  inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
                            md:relative md:translate-x-0 ${isOpen ? 'translate-x-0 ' : '-translate-x-full '} sm:hidden md:block sm:w-1/4 md:w-[400px]`}>
                <SideBar isToggle={isOpen} />
            </div>
            <div className={`fixed inset-0 bg-black opacity-50 z-20 transition-opacity ${
            isOpen ? 'block' : 'hidden'
            } md:hidden`} onClick={() => setIsOpen(false)}></div>
            <div className="flex flex-col w-full p-3 gap-3">
                <Navbar className=" fixed" toggleSidebar={toggleSidebar} />
                <main className=" ">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default ManagerLayout;