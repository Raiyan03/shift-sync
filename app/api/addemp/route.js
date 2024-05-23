import { addEmployee } from "@/app/lib/util";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const data = await req.json();
        const name = data?.name;

        await addEmployee(name);
        return new NextResponse(JSON.stringify({ message: "Success" }),{
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