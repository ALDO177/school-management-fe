import { forwardApiGet } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try{
        const result = await forwardApiGet("permission/master");
        return NextResponse.json(result);

    }catch(err: any){
        console.log(err?.response?.data)
        return NextResponse.json({ ...err?.response?.data}, { status: 400 })
    }
}