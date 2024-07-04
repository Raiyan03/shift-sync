import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function  Home() {
  const session = await auth();
  if (session.user) {
    if (session.user?.role === "employee") {
      redirect("/employee");
    } else {
      redirect("/manager/dashboard");
  }
}
  return (
    <div>
      <div>Homepage</div>
   </div>
  );
}
