"use client";
import { useAuth } from "@/app/components/Auth-Context";
import { getOrganization } from "@/app/lib/util";
import Layout from "@/app/pages/Employee/layout";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const Schedule = () => {
  const { userLoggedIn } = useAuth();
  const { push } = useRouter();
  
  getOrganization("Ace Liquor");

  return (
    <div>
      {userLoggedIn ? (
        <h1 className="text-2xl font-bold mb-4 text-black">Your Schedule</h1>
      ) : (
        push("/")
      )}
    </div>
  );
};

export default Schedule;
