import Link from "next/link";

export default function NavLinks({ item }) {
  return (
    <Link href={item.path}
      className="flex 
      flex-row 
      items-center 
      gap-2 
      px-2 
      py-1 
      text-neutral-700 
      transition 
      duration-150 
      ease-in-out 
      hover:border-b-2
      hover:border-accent1 
      hover:shadow-lg 
      active:shadow-inner 
      active:bg-accent1 
      hover:rounded-md 
      hover:text-black">
      {item.icon}
      {item.title}
    </Link>
  )
}
