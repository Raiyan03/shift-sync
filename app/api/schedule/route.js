import { NextResponse } from "next/server";

export async function POST(req){

    try{
        const data = await req.json();
        const response = await fetch('http://127.0.0.1:8000/schedule', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = await response.json();
        return new NextResponse(JSON.stringify(res),{
            status: response.status,
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