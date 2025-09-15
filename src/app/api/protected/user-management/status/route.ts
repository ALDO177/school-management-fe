import { forwardApiPost } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

    const body = await req.json();
    try{
        const result = await forwardApiPost('user-management/set-status', body);
        return NextResponse.json(result);
    }catch(err: any){
        return NextResponse.json({ ...err?.response?.json })
    }
}