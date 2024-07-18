"use client"
import { stringToTime } from '@/lib/utilities'
import React from 'react'

const Page = () => {

    const onClickTest = ()=>{
        stringToTime("11:00 AM - 05:00 PM")
    }
  return (
    <div>
        <button className='flex p-4 font-bold bg-green-600 m-3 rounded-md h-3 text-center items-center' onClick={onClickTest}>Test</button>
    </div>      
  )
}

export default Page