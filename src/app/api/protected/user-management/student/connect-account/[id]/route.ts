import { forwardApiGet } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: number}>}){

    const { id } = await params;

    try{
        const result = await forwardApiGet(`user-management/student/connect-account/${id}`);
        return NextResponse.json(result);

    }catch(err: any){
        
        console.log(err);
        return NextResponse.json({ ...err?.response?.json }, { status: 400 })
    }
}