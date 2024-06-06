import React from 'react'
import Shifts from './shifts/shifts'

export default function Preferences() {
  return (
    <div className="flex flex-col justify-center items-center align-middle gap-3 w-full mr-20">
        <h2 className="m-5 font-bold text-2xl">Preferences</h2>
          <label className="text-textSoft text-md ">Monday</label>
          <Shifts />
          <label className="text-textSoft text-md ">Tuesday</label>
          <Shifts />
          <label className="text-textSoft text-md ">Wednesday</label>
          <Shifts />
          <label className="text-textSoft text-md ">Thursday</label>
          <Shifts />
          <label className="text-textSoft text-md ">Friday</label>
          <Shifts />
          <label className="text-textSoft text-md ">Saturday</label>
          <Shifts />
          <label className="text-textSoft text-md ">Sunday</label>
          <Shifts />
          <button type="submit" className="bg-red-600 h-7 w-20 rounded-lg">
            Send
          </button>
        </div>
  )
}
