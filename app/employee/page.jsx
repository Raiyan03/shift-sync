"use client"
import { getUser, logOutUser } from "@/action/actions"
import { getShiftDataForTheUser } from "@/data/shift"
import { useEffect, useState } from "react"

const page = () => {
  const [userData, setUserData] = useState()

  const fetchScheduleData = async()=>{
    await getShiftDataForTheUser(userData.id)
  }

  const fetch = async ()=>{
    const token = await getUser()
    if(token){
      setUserData(token)
    }
  }

  useEffect(()=>{fetch()},[])

  return (
    <div>
        <div>
            Employee
        </div>
        <form action={logOutUser}>
            <button type="submit">
                Logout
            </button>
        </form>
        <div>
          {userData && (
            <button onClick={fetchScheduleData}> 
              GetScheduleData
            </button>
          )}

        </div>
        {/* <button onClick={logOutUser}>Logout</button> */}
    </div>
  )
}

export default page