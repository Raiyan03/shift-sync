"use client";
import React from "react";
import Navbar from "../Employee/comps/navbar";
import { AuthProvider, useAuth } from "@/app/components/Auth-Context";
import { redirect } from "next/navigation";

const ManagerSide = () => {

  const {userLoggedIn} = useAuth();

  return (
    <AuthProvider>
        {userLoggedIn
          ? <></>
          : redirect("/")}
    </AuthProvider>
  );
};

export default ManagerSide;
