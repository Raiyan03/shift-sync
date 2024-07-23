"use client"
import { getUser, logOutUser } from "@/action/actions"
import { getShiftData, getShiftDataForTheUser } from "@/data/shift"
import { useEffect, useState } from "react"
import ShiftPref from "@/components/employee/shiftPref/shiftPref" 

const page = () => {
  const [userData, setUserData] = useState()
  const [shiftData, setShiftData] = useState()
  const [scheduleData, setScheduleData] = useState()


  const fetch = async ()=>{
    const token = await getUser()
    if(token){
      setUserData(token)
    }
    const data = await getShiftDataForTheUser(token.id)
    setShiftData(data)
  }

  useEffect(()=>{fetch()},[])

  return (
    <div>
        <div>
            Employee
        </div>
        {userData?.name}
        <form action={logOutUser}>
            <button type="submit">
                Logout
            </button>
        </form>
        <div>
          {/* {userData && (
            <button onClick={fetchScheduleData}> 
              GetScheduleData
            </button>
          )} */}
          <ShiftPref userId={userData} shiftData={shiftData}/>
        </div>
        {/* <button onClick={logOutUser}>Logout</button> */}
    </div>
  )
}

export default page