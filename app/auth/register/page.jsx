import { registerUser } from "@/action/actions";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="bg-white flex flex-col gap-10 rounded-lg sm:w-1/2 md:w-[30%] border shadow-xl text-primary items-center justify-center p-4">
      <h1 className="text-2xl font-bold text-center">
        Welcome to Shift-Sync!{" "}
      </h1>
      <form action={registerUser} className=" flex flex-col gap-y-8">
        <h2 className="text-xl font-bold text-center">Register</h2>
        <div className="flex gap-4">
          <input
            type="text"
            name="fname"
            className="p-2 border-2 border-primary rounded-lg bg-inherit text-black"
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lname"
            className="p-2 border-2 border-primary rounded-lg bg-inherit text-black"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          type="text"
          name="team"
          className="p-2 border-2 border-primary rounded-lg bg-inherit text-black"
          placeholder="Organization Name"
          required
        />
        <input
          type="text"
          name="email"
          className="p-2 border-2 border-primary rounded-lg bg-inherit text-black"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          className="p-2 border-2 border-primary rounded-lg bg-inherit text-black"
          placeholder="Password"
          required
        />
        <button type="submit" className="bg-primary p-3 text-white rounded-lg">
          Register
        </button>
      </form>
      <Link href="/auth/login" className=" underline">
        Already have an account?
      </Link>
    </div>
  );
}
