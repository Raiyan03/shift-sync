"use client";
import { useAuth } from "@/app/components/Auth-Context";
import AddEmployeeForm from "./data";
import { redirect } from "next/navigation";

const AddUsers = () => {
  const { userLoggedIn } = useAuth();
  return <div className="text-black">{userLoggedIn ? <AddEmployeeForm /> : redirect("/")}</div>;
};

export default AddUsers;
