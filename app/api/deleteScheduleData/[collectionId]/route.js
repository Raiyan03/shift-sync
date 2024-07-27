import { NextResponse } from "next/server";
import {deleteScheduleData} from "@/data/shift" 

export async function GET(req, {params}){

    const {collectionId} = params

    try { 
        const data = await deleteScheduleData(collectionId)
        return new NextResponse(JSON.stringify(data),{
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
        
    } catch (error) {

        return new NextResponse(JSON.stringify({message: "Error"}),{
            headers:{
                code: 500,
                "Content-Type": "application/json",
            },
        });
    }
    
}