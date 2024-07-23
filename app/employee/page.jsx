"use client"
import { getUser, logOutUser } from "@/action/actions"
import { getShiftData, getShiftDataForTheUser } from "@/data/shift"
import { useEffect, useState } from "react"
import { convertTimeStamp } from "@/lib/utilities.jsx"
import TimeStampComp from "./timestamper"

const page = () => {
  //Contains personal employee information
  const [userData, setUserData] = useState()
  //Contains shift and schedule information for employee
  const [data, setData] = useState()

  const fetchScheduleData = async() => {
    //Current best practice to store shifts
    const shiftData = await getShiftDataForTheUser(userData?.id)
    setData(shiftData)
    console.log("Logging shift data imported: ")
    console.log(shiftData)
    console.log("logging shift data held: ")
    console.log(data)
  }

  const fetch = async ()=>{
    const token = await getUser()
    if(token){
      setUserData(token)
      console.log(userData)
      console.log("Got to fetch, userData is set")
    }
  }

  useEffect(()=>{fetch()},[])

  return (
    <div className="flex h-screen">
        <div className="w-1/4 bg-gray-200 p-4 flex flex-col items-center">
          <div className="">
            <img src="/images/placeholder.png" alt="Profile" className="bg-gray-400 rounded-full w-24 h-24 mb-4 object-cover" />
          </div>
          <p className="text-center mb-2">Profile name: {userData?.name}</p>
          <p className="text-center mb-2">Employee ID: {userData?.id}</p>
          <p className="text-center mb-4">Employee status: {userData?.role}</p>
          <button className="bg-yellow-400 w-3/4 py-2 mb-2 rounded" type="submit">Edit Profile</button>
              {userData && (
            <button className="bg-green-500 text-white py-2 px-4zzz rounded mb-4" onClick={fetchScheduleData}> 
              GetScheduleData
            </button>
          )}
          <form action={logOutUser} className="w-full flex flex-col items-center">
            <button className="bg-red-500 w-3/4 py-2 mb-2 rounded" type="submit">Logout</button>
          </form>
        </div>
        <div className="w-3/4 bg-white p-4">
          <div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <td className="p-2">Shift Day</td>
                  <td className="p-2">Shift Time</td>
                  <td className="p-2">Shift Length</td>
                  <td className="p-2">Request Approval</td>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data?.map((value, index) => {
                    return (
                      <tr key={index} className="bg-gray-300 rounded-lg p-4 mb-4 flex items-center">
                        <td className="p-2">{value.day}</td>
                        <TimeStampComp shiftStamp={value.shift.shift}/>
                        <td className="p-2">{value.shift.hours}</td>
                        <td className="p-2">{value.shift.requested.toString()}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
            
          </div>
        </div>
        {/* <button onClick={logOutUser}>Logout</button> */}
    </div>
  )
}

export default page