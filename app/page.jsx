import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div>
    {redirect("/dashboard")}
   <div>Homepage</div>
   </div>
  );
}
