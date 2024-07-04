import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function  Home() {
  const session = await auth();
  if (session !== null) {
    if (session.user?.role === "employee") {
      redirect("/employee");
    } else {
      redirect("/manager/dashboard");
  }
}
else{
  redirect("/auth/login")
}
  return (
    <div>
      <div>Homepage</div>
   </div>
  );
}
