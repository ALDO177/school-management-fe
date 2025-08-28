import { forwardApiDelete, forwardApiGet, forwardApiPatch, forwardApiPost } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        const params = req.nextUrl.searchParams;
        const result = await forwardApiGet("user-management/home-room-assigment", Object.fromEntries(params.entries()));
        return NextResponse.json(result);

    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ ...err }, { status: 400 })
    }
}

export async function POST(req: NextRequest) {

    const body = await req.json();
    try {
        const create = await forwardApiPost("user-management/home-room-assigment", Array.isArray(body) ? { items: body } : { items: [body] })
        return NextResponse.json(create);

    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ ...err }, { status: 400 })
    }
};

export async function PATCH(req: NextRequest) {

    const body = await req.json();
    
    try {

        const updated = await forwardApiPatch(`user-management/home-room-assigment/${body?.id}`, body);
        return NextResponse.json(updated);

    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ ...err }, { status: 400 })
    }
};

export async function DELETE(req: NextRequest) {

    const body = await req.json();
    try {
        const deleted = await forwardApiDelete("user-management/home-room-assigment", body);
        return NextResponse.json(deleted);

    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ ...err }, { status: 400 })
    }
};