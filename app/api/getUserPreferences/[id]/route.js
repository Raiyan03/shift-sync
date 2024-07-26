import { getScheduleData } from "@/app/lib/utilities";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    const {id} = params

    try{
        const response = await getScheduleData(id);
        return new NextResponse(JSON.stringify(response),{
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });        
    }
    catch(e){
        console.log(e);
        return new NextResponse(JSON.stringify({ message: "Error" }),{
            headers: {
                code: 500,
                "Content-Type": "application/json",
            },
        });
    }
}