import { forwardApiGet } from "@forwards/server/forward.post";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const result = await forwardApiGet('parent-collaboration/parental-involvement');
        return NextResponse.json(result);

    }catch(err: any){
        return NextResponse.json({ ...err?.response?.json }, { status: 400 })
    }

}