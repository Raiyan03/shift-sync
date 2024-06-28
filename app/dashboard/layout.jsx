import { redirect } from "next/navigation";
import { getSession } from "../lib/getSession";
import Navbar from "../ui/dashboard/navbar/navbar";

export default async function Layout({ children }) {
  
  const session = await getSession();
  const user = session?.user;

  if(!user) return redirect("/login")

  return (  
    <div>
      <div className="flex-4">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
