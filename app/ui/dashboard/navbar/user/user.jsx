import { getUser } from "@/action/actions";
import { useEffect, useState } from "react";

export default function User() {
  const [user, setUser] = useState({});

  const fetch = async ()=>{
    const userData = await getUser();
    const temp = userData;
    setUser(temp)
  }

  useEffect(()=>{fetch()},[])

  return (
    <div className="justify-center flex m-auto gap-5 rounded-[10px] p-[5px] text-compUser">
      <div className="flex flex-col m-auto">
        <span className="font-bold text-x text-black"> {user.name} </span>
        <span className=""> {(user.role)} </span>
      </div>
      <div>
        <span className="items-center align-middle"></span>
      </div>
    </div>
  );
}
