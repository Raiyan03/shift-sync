import React from 'react'

export default function Pagination() {
  return (
    <div className='p-2 flex justify-around'>
        <button className='px-2 py-2 rounded-sm bg-orange-400 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-black' disabled>Previous</button>
        <button className='px-2 py-2 rounded-sm bg-orange-400 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-black'>Next</button>
    </div>
  )
}
