"use client"
import Image from "next/image"
export default function UserBatch (){

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
                <h1 className="text-xl font-semibold"> Admin manager </h1>
                <p className="text-accent1">
                    Organization: xyz store
                </p>
            </div>
        </div>
    )
}