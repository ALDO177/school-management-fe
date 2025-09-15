import { forwardApiGet } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {

    try{
        const result = await forwardApiGet("parent-collaboration/message-parent")
        return NextResponse.json(result);

    }catch(err: any){
        console.log(err)
        return NextResponse.json({ ...err?.response?.data}, { status: 400 });
    }
}