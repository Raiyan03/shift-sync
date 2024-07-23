"use client"

import { getShiftData, getShiftDataForTheUser } from '@/data/shift'
import { getUserFromDB, stringToTime } from '@/lib/utilities'
import React from 'react'

const Page = () => {

    const onClickTest = async ()=>{
      console.log(await stringToTime("03:00 PM - 11:00 PM"))
    }
  return (
    <div>
        <button className='flex p-4 font-bold bg-green-600 m-3 rounded-md h-3 text-center items-center' onClick={onClickTest}>Test</button>
    </div>      
  )
}

export default Page