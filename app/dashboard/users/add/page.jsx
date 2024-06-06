import React from 'react'

export default function AddUser() {
  return (
    <div className='bg-bgSoft p-5 rounded-md mt-5 h-full items-center justify-center'>
      <h2 className='m-4 font-bold text-2xl'>Add User</h2>
      <form action="" className='flex flex-wrap gap-4 justify-between items-center flex-col'>
        <input type="text" name="name" placeholder='Name' className='p-8 w-1/6 h-1.5 bg-transparent text-text rounded-md mb-3 border-2 border-teal-700' required/>
        <input type="email" name="email" placeholder='Email' className='p-8 w-1/6 h-1.5 bg-transparent text-text rounded-md mb-3 border-2 border-teal-700' required/>
        <input type="password" name="password" placeholder='Password' className='p-8 w-1/6 h-1.5 bg-transparent text-text rounded-md mb-3 border-2 border-teal-700' required/>
        <button type='submit' className='bg-red-600 h-8 w-20 rounded-lg'>Submit</button>
      </form>
    </div>
  )
}
