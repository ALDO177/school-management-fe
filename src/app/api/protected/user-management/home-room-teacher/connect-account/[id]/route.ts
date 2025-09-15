import { forwardApiGet } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : { params: Promise<{ id: number }>}){

    const { id } = await params;

    try{
        const result = await forwardApiGet(`user-management/home-room-teacher/connect-account/${id}`);
        return NextResponse.json(result);

    }catch(err: any){
        return NextResponse.json({...err?.response?.data }, { status: 400 });
    }
}