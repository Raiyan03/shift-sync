"use client"
import { getUser, logOutUser } from "@/action/actions"
import { getShiftDataForTheUser } from "@/data/shift"
import { useEffect, useState } from "react"

const page = () => {
  const [userData, setUserData] = useState()

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
        <div>{}</div>
        {/* <button onClick={logOutUser}>Logout</button> */}
    </div>
  )
}

export default page