"use client";
import Layout from "@/app/pages/Employee/layout";
import DayCard from "../../comps/dayCard";
import { useAuth } from "@/app/components/Auth-Context";
import { useRouter } from "next/navigation";
import Pref from "@/app/pages/Employee/pages/Preference/data";

const Preferences = () => {

  const { userLoggedIn } = useAuth();
  const { push } = useRouter();

  return <div className="text-black">{userLoggedIn ? <Pref /> : push("/")}</div>;
};

export default Preferences;
