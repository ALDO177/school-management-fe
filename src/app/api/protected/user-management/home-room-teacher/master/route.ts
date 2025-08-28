import { forwardApiGet } from "@forwards/server/forward.post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {

    try {
        const params  = Object.fromEntries(_req.nextUrl.searchParams.entries());
        const result  = await forwardApiGet('user-management/home-room-teacher/master', params);
        return NextResponse.json(result);

    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ ...err }, { status: 400 });
    }
}
