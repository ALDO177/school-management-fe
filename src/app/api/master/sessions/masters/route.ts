
import { forwardApiGet } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try{
        const result = await forwardApiGet('mentoring-schedule/sessions/master');
        return NextResponse.json(result);

    }catch(err: any){
        return NextResponse.json({...err}, { status: 400 })
    }
}