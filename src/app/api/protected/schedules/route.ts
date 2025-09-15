
import { forwardApiDelete, forwardApiPost } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();

    try{
        const result = await forwardApiPost('mentoring-schedule', body);
        return NextResponse.json(result);

    }catch(err: any){
        console.log(err)
        return NextResponse.json({ ...err?.response?.data}, { status: 400 })
    }
}

export async function GET(req: NextRequest) {
    
}


export async function PATCH(req: NextRequest){

}

export async function DELETE(req: NextRequest){

    const body = await req.json();

    try{
        const result = await forwardApiDelete("mentoring-schedule", body);
        return NextResponse.json(result);

    }catch(err: any){

        console.log(err)
        return NextResponse.json({...err?.response?.data }, { status: 400 })
    }
}