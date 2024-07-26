import { NextResponse } from "next/server";
import {setEmployeeData} from "@/lib/utilities"

export async function POST(request){
    try {
        const requestData = await request.json();
        const setEmployeeResponse = await setEmployeeData(requestData.collId, requestData.data, requestData.data.Id)
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