
'use server'

import { forwardApiDelete, forwardApiGet, forwardApiPatch, forwardApiPost } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        const params = Object.fromEntries(req.nextUrl.searchParams.entries());
        const result = await forwardApiGet('user-management/guidence-conselor', params);
        return NextResponse.json(result);

    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ ...err }, { status: 400 })
    }
}

export async function POST(req: NextRequest) {

    const body = await req.json();

    try {
        const create = await forwardApiPost("user-management/guidence-conselor", Array.isArray(body) ? { items: body } : { items: [body]})
        return NextResponse.json(create);

    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ ...err }, { status: 400 });
    }
}

export async function PATCH(req: NextRequest) {

    const body = await req.json();

    try {
        const update  = await forwardApiPatch(`user-management/guidence-conselor/${body?.id}`, body);
        return NextResponse.json(update);

    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ ...err }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest) {

    const body = await req.json();

    try {
        const remove = await forwardApiDelete("user-management/guidence-conselor", body);
        return NextResponse.json(remove);

    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ ...err }, { status: 400 });
    }
}

