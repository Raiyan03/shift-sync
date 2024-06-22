import Link from "next/link"
import { MdSupervisedUserCircle } from "react-icons/md"
export default function Cards({employees}) {
  return (
    <Link href={"/dashboard/users"}>
    <div className="flex bg-bgSoft p-5 rounded-[10px] gap-5 cursor-pointer w-full transition-all duration-700 ease-in">
        <MdSupervisedUserCircle size={32}/>
        <div className="flex flex-col gap-5">
            <span className="text-xl">Total Employees</span>
            <span className="text-2xl font-500 text-center">{employees}</span>
        </div>
    </div>
    </Link>
  )
}
