'use server'

import { forwardApiDelete, forwardApiGet, forwardApiPatch, forwardApiPost } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();
        const body_add = Array.isArray(body) ? { items: body } : [{ items: body }];
        const res = await forwardApiPost("user-management/student", body_add);
        return NextResponse.json(res);

    } catch (err: any) {
        return NextResponse.json({ ...err }, { status: 400 })
    }
}

export async function DELETE(req: NextRequest) {

    try {

        const body = await req.json();
        const body_add = Array.isArray(body) ? body : [body];
        const result = await forwardApiDelete("user-management/student", body_add);

        return NextResponse.json(result);

    } catch (err: any) {
        return NextResponse.json({ ...err }, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    try {

        const urlSeacrhParam = req.nextUrl.searchParams;
        const { data } =  await forwardApiGet('user-management/student', Object.fromEntries(urlSeacrhParam))
        return NextResponse.json(data, { status: 200 });

    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ ...err }, { status: 400 })
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body   = await req.json();
        const result = await forwardApiPatch(`user-management/student/${body?.id}`, body);
        return NextResponse.json(result);

    } catch (err: any) {
        return NextResponse.json({ ...err }, { status: 400 });
    }
}