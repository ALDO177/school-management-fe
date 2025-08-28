import { forwardApiGet, forwardApiPost } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();

    try {
       const create = await forwardApiPost('mentoring-schedule/activies', Array.isArray(body) ? { items: body } : { items: [body]});
       return NextResponse.json(create);

    } catch (err: any) {
        return NextResponse.json({ ...err }, { status: 400 })
    }
}

export async function GET(req: NextRequest) {

    try {
        const result = await forwardApiGet("mentoring-schedule/activies/master");
        return NextResponse.json(result)

    } catch (err: any) {
        return NextResponse.json({ ...err }, { status: 400 })
    }
}