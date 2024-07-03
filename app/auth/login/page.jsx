import {loginUser} from "@/action/actions"
import Link from "next/link"
export default function LoginPage() {
  return (
    <div className="bg-white flex flex-col gap-10 rounded-lg sm:w-1/2 md:w-[30%] border shadow-xl text-primary items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-center">Welcome to Shift sync!</h1>
        <form action={ loginUser } className=" flex flex-col gap-y-8">
            <h2 className="text-xl font-bold text-center">
                Login
            </h2>
            <input type="text" name="email" className="p-2 border-2 border-primary rounded-lg bg-inherit text-black" placeholder="Email"/>
            <input type="password" name="password" className="p-2 border-2 border-primary rounded-lg bg-inherit text-black" placeholder="Password"/>
            <button type="submit" className='bg-primary p-3 text-white rounded-lg'>Log In</button>
        </form>
        <Link href="/auth/register" className=" underline">
            Don't have an account?
        </Link>
    </div>
  )
}
