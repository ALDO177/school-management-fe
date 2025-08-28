'use server'

import { forwardApiGet, forwardApiPost } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();
    try {

        const create = await forwardApiPost("mentoring-schedule/sessions", Array.isArray(body) ? body : [body]);
        return NextResponse.json(create);

    } catch (err: any) {
        return NextResponse.json({ ...err }, { status: 400 })
    }
}

export async function GET(req: NextRequest) {
    
    try {
        const result = await forwardApiGet("mentoring-schedule/sessions/get-with-schedule");
        return NextResponse.json(result);

    } catch (err: any) {
        return NextResponse.json({ ...err }, { status: 400 })
    }
}