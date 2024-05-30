"use client"
import Link from "next/link"
import styles from "./navLinks.module.css"
import { usePathname } from "next/navigation"

export default function NavLinks({item}) {

  const pathname = usePathname()

  console.log(pathname)

  return (
    <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
        {item.icon}
        {item.title}
    </Link >
  )
}
