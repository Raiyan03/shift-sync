import { NextResponse } from "next/server";

export async function POST(req){
    
    try {
        const data = await req.json()
        const res = await storeShiftToDB(data.id, data);

        return new NextResponse(JSON.stringify(res),{
            status: response.status,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ message: "Error" }),{
            headers: {
                code: 500,
                "Content-Type": "application/json",
            },
        });
    }

}