"use client"
import Link from 'next/link';
import { doSignOut } from '@/app/components/auth';


const Navbar = () => {

  function SignOut(){
    doSignOut();
  }

  return (
    <nav className="bg-gray-500 p-4 flex justify-between items-center">
      <div className="text-black text-lg font-bold">
        <Link href="/">Shift Sync</Link>
      </div>
      <div>
        <button className="text-white bg-red-500 px-4 py-2 rounded" onClick={SignOut}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;