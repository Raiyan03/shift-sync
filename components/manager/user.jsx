"use client"
import { getUser } from "@/action/actions"
import Image from "next/image"
import { useEffect, useState } from "react"
export default function UserBatch (){
    const [name, setName] = useState()
    const [position, setPosition] = useState()
    
    const fetch = async ()=>{
        const user = await getUser()
        if(user?.id !== undefined){
            setName(user.name)
            setPosition(user.role)
        }
    }
    useEffect(()=>{
        fetch()
    },[])

    return (
        <div className=" flex 
        items-center 
        gap-3 cursor-pointer 
        hover:border-background 
        p-3 
        transition
        ease-in-out 
        duration-150
        hover:border-1
        hover:rounded-lg 
        hover:shadow-sm 
        active:shadow-md active:bg-gray-200">
            <Image src={"/user.png"} width={50} height={80} alt={"user icon"} />
            <div>
                <h1 className="text-xl font-semibold"> {name? `${name.charAt(0).toUpperCase() + name.slice(1)}`: ""} </h1>
                <p className="text-accent1">
                    Position : {position? `${position.charAt(0).toUpperCase() + position.slice(1)}`: ""}
                </p>
            </div>
        </div>
    )
}