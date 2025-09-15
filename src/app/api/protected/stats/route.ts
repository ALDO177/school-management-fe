import { forwardApiGet } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){

    try{
        const result = await forwardApiGet("dashboard-management/stats");
        return NextResponse.json(result);

    }catch(err){
        return NextResponse.json(err, { status: 400 })
    }
}