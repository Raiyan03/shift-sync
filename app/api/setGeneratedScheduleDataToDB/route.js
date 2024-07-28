import { NextResponse } from "next/server";
import {storeShiftToDB} from "@/data/shift"

export async function POST(request){
    try {
        const requestData = await request.json();
        const setEmployeeResponse = await storeShiftToDB(requestData.userId, requestData.data)
        return new NextResponse(JSON.stringify(setEmployeeResponse),{
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
        
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({message: "Error"}),{
            headers:{
                code: 500,
                "Content-Type": "application/json",
            },
        });
    }
    
}