"use client"
import { getUserFromDB } from '@/data/user'
import { stringToTime } from '@/lib/utilities'
import React from 'react'

const Page = () => {

    const onClickTest = async ()=>{
      console.log(await getUserFromDB("Ace -946100", "123456"))
    }
  return (
    <div>
        <button className='flex p-4 font-bold bg-green-600 m-3 rounded-md h-3 text-center items-center' onClick={onClickTest}>Test</button>
    </div>      
  )
}

export default Page