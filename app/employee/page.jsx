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
    <div>
        <div>
          Employee
        </div>
        <p>Profile name: {userData?.name}</p>
        <p>Employee ID: {userData?.id}</p>
        <p>Employee status: {userData?.role}</p>
        <form action={logOutUser}>
            <button type="submit">Logout</button>
        </form>
        <div>
          {userData && (
            <button onClick={fetchScheduleData}> 
              GetScheduleData
            </button>
          )}
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <td>Shift Day</td>
                <td>Shift Time</td>
                <td>Shift Length</td>
                <td>Request Approval</td>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{value.day}</td>
                      <TimeStampComp shiftStamp={value.shift.shift}/>
                      <td>{value.shift.hours}</td>
                      <td>{value.shift.requested.toString()}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
        {/* <button onClick={logOutUser}>Logout</button> */}
    </div>
  )
}

export default page

//convertTimeStamp( (value.shift.shift[0]) , (value.shift.shift[1])) 
