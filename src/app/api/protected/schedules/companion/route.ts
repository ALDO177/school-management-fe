import { forwardApiDelete, forwardApiPost } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    
    const body = await req.json();

    try {
        const result = await forwardApiPost("mentoring-schedule/companion", body);
        return NextResponse.json(result);

    } catch (err: any) {

        console.log(err);
        return NextResponse.json(err, { status: 400 });
    }
}

export async function DELETE(req: NextRequest) {

    const body = await req.json();

    try {
       const removed = await forwardApiDelete('mentoring-schedule/companion', body);
       return NextResponse.json(removed);

    } catch (err: any) {
        console.log(err)
        return NextResponse.json(err, { status: 400 });
    }
}