/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'

import { forwardApiGet } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const params = Object.fromEntries(req.nextUrl.searchParams.entries());
        const result = await forwardApiGet("user-management", params);
        return NextResponse.json(result);

    } catch (err: any) {
        console.log(err?.response?.data);
        return NextResponse.json({ ...err?.response?.data }, { status: 400 })
    }
}