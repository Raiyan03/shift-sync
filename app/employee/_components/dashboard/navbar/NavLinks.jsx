"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavLinks({item}) {

  const pathname = usePathname()

  return (
    <Link href={item.path} className={`"flex flex-row gap-[5px] p-[5px] items-center" ${pathname == item.path && "bg-textSoft text-black p-[5px] rounded-[20px]"}`}>
        {item.icon}
        {item.title}
    </Link >
  )
}
