"use client"
import { AuthProvider, useAuth } from "@/app/components/Auth-Context";
import Layout from "./layout";
import { redirect } from "next/navigation";
const Employee = () => {
  const { userLoggedIn } = useAuth();

  return (
    <AuthProvider>
      <>
        {userLoggedIn
          ? redirect("/pages/Employee/pages/Schedule")
          : redirect("/")}
      </>
    </AuthProvider>
  );
};

export default Employee;
