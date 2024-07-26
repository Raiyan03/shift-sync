import { NextResponse } from "next/server";
import {deleteEmployee} from "@/lib/utilities"

export async function POST(request){
    try {
        const requestData = await request.json();
        const deleteEmployeeRes = await deleteEmployee(requestData.collId, requestData.userId)
        return new NextResponse(JSON.stringify(deleteEmployeeRes),{
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