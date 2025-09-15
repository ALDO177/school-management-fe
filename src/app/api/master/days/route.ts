import { forwardApiGet } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest){

    try{
        const result = await forwardApiGet("mentoring-schedule/days/master");
        return NextResponse.json(result);

    }catch(err: any){

        return NextResponse.json({...err?.response?.data}, { status: 400})
    }
}