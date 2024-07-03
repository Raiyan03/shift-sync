"use client"

import Image from 'next/image';
import Link from 'next/link';
import { getUser } from '@/action/actions';
import { convertTimeStamps, filterShifts, getScheduleData } from "@/lib/utilities";
import Table from "@/components/manager/dashboard/table"
import { ClipLoader, MoonLoader } from 'react-spinners';
const ScheduleTable = ({Schedule, Loading, setLoading, setSchedule}) => {
    const fetchAndLogData = async () => {
        setLoading(true);
        const currentUser = await getUser();
        
        const data = await getScheduleData(currentUser.id);
        console.log(data);
        const res = await fetch("/api/schedule", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const scheduleData = await res.json();
        console.log(scheduleData)
        const shifts = filterShifts(scheduleData);
        setSchedule(shifts);
        console.log(shifts);
        setLoading(false);
    };
        // fetchAndLogData();
    return (
        Schedule ? (
        <div className=" flex flex-col bg-secondary border shadow-md rounded-lg p-4">
            <h1 className='text-xl text-accent1 py-3'>
                Schedule for this week
            </h1>
            <table className="w-full">
                <thead>
                    <tr className=" ">
                        <td className="p-2">Name</td>
                        <td className="p-2">Monday</td>
                        <td className="p-2">Tuesday</td>
                        <td className="p-2">Wednesday</td>
                        <td className="p-2">Thursday</td>
                        <td className="p-2">Friday</td>
                        <td className="p-2">Saturday</td>
                        <td className="p-2">Sunday</td>
                        <td className="p-2">Total hours</td>
                    </tr>
                </thead>
                {/* <tbody>
                    {users.map((user) => (
                        <tr className="bg-white border-b" key={user.id}>
                            <td className="p-2">
                                <div className="flex items-center gap-2">
                                    <Image 
                                        className="w-12 h-12 rounded-full" 
                                        src={user.img || "/noavatar.png"} 
                                        width={50}
                                        height={50} 
                                        alt='User' 
                                    />
                                    <span>{user.username}</span>
                                </div>
                            </td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{ user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}</td>
                            <td className="p-2">{user.isAdmin ? "Admin" : "Client"}</td>
                            <td className="p-2">{user.isActive ? "Active" : "Passive"}</td>
                            <td className="p-2">
                                <div className="flex gap-2">
                                    <Link href={`/dashboard/users/${user.id}`}>
                                        <button className="bg-teal-500 text-white py-1 px-2 rounded-md">
                                            View
                                        </button>
                                    </Link>
                                    <button className="bg-red-500 text-white py-1 px-2 rounded-md">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody> */}
                <tbody>
                    <Table scheduleData={Schedule} />
                </tbody>
            </table>
        </div>
        )
        :
        (
        <div className='flex p-3 items-center justify-between bg-secondary border shadow-md rounded-md'>
            <h1>
                There is no schedule for this week!
            </h1>
            <button className={`bg-primary ${Loading ? 'disabled' : null} text-white rounded-md p-2 w-30`} onClick={fetchAndLogData}>
                {Loading ? 
                <div >
                    <ClipLoader size={20} color='white' an /> 
                </div>
                : 
                'Generate'}
            </button>
        </div>
        )
    );
}
export default ScheduleTable;
