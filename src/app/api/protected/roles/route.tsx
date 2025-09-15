import { forwardApiGet, forwardApiPost } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
    try {
        const result = await forwardApiGet("role/role-permissions");
        return NextResponse.json(result);

    } catch (err: any) {
        return NextResponse.json({ ...err?.response?.data }, { status: 400 })
    }
}