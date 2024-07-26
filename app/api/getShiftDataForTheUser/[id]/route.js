import { NextResponse } from "next/server";
import {getShiftDataForTheUser} from "@/data/shift"

export async function GET(req, {params}){

    const {id} = params

    try { 
        const data = await getShiftDataForTheUser(id)
        return new NextResponse(JSON.stringify(data),{
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        }); 
        
    } catch (error) {
        console.log(e)
        return new NextResponse(JSON.stringify({message: "Error"}),{
            headers:{
                code: 500,
                "Content-Type": "application/json",
            },
        });
    }
    
}